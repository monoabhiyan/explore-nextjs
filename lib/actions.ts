// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {createMiddleware, createSafeActionClient, SafeActionResult} from 'next-safe-action';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/nextAuth";
import {ZodError} from "zod";

export class ActionError extends Error {
}

// middleware to handle errors
export const authenticationMiddleware = createMiddleware().define(async ({next}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new ActionError('Unauthorized');
  }
  return next({
    ctx: {
      user: session.user,
    },
  })
})


export const VALIDATION_ERROR_MESSAGE = "An error occurred validating your input.";
export const DEFAULT_SERVER_ERROR_MESSAGE = "Something went wrong while executing the operation.";

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof ZodError) {
      console.error(e.message);
      return VALIDATION_ERROR_MESSAGE;
    } else if (error instanceof ActionError) {
      return error.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(authenticationMiddleware);

/**
 * Determines if a server action is successful or not
 * A server action is successful if it has a data property and no serverError property
 *
 * @param action Return value of a server action
 * @returns A boolean indicating if the action is successful
 */
export const isActionSuccessful = <T extends z.ZodType>(
  action?: SafeActionResult<string, T, readonly [], any, any>
): action is { data: T; serverError: undefined; validationError: undefined } => {
  if (!action) {
    return false;
  }

  if (action.serverError) {
    return false;
  }

  if (action.validationErrors) {
    return false;
  }

  return true;
};

/**
 * Converts an action result to a promise that resolves to false
 *
 * @param action Return value of a server action
 * @returns A promise that resolves to false
 */
export const resolveActionResult = async <T extends z.ZodType>(
  action: Promise<SafeActionResult<string, T, readonly [], any, any> | undefined>
): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await action;

      if (isActionSuccessful(result)) {
        resolve(result.data);
      } else {
        reject(new ActionError(result?.serverError ?? 'Something went wrong'));
      }
    } catch (error) {
      reject(error);
    }
  });
};
