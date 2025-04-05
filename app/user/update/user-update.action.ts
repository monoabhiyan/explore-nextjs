// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use server';
import {z} from 'zod';
import {authActionClient} from "@/lib/actions";
import axios from "axios";

const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
});

export const updateUserAction = authActionClient
  .schema(UpdateUserSchema)
  .action(async ({parsedInput: {id, name, email}, ctx: {user}}) => {

    if (String(user?.id) !== String(id)) {
      throw new Error('You are not allowed to update this user');
    }

    const {data} = await axios.put(`https://api.escuelajs.co/api/v1/users/114`, {
      name,
      email,
    });

    return data;
  });
