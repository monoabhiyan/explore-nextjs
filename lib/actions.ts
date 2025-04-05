// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {createMiddleware, createSafeActionClient} from 'next-safe-action';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/nextAuth";
import { ZodError } from "zod";

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
