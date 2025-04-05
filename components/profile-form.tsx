// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';

import {updateUserAction} from "@/app/user/update/user-update.action";
import {isActionSuccessful, resolveActionResult} from "@/lib/actions";
import {useMutation} from "@tanstack/react-query";

const ProfileForm = ({user}: { user: never }) => {

  const mutation = useMutation({
    mutationFn: async (props: { id, email: string; name: string }) => {
      return resolveActionResult(
        updateUserAction(props)
      );
    },
    onError: (error) => {
      alert('use mutation:', error);
    },
    onSuccess: (data) => {
      alert('use mutation: The user has been updated');
      console.log({
        data
      })
      // router.push('/users');
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    // tanstack query:
    mutation.mutate({
      id: String(user.id),
      name,
      email,
    });

    // next-safe-action:

    // const result = await updateUserAction({
    //   id: String(user.id),
    //   name,
    //   email,
    // })
    //
    // // If result?.data is defined, the action is successful
    // if (result?.data) {
    //   alert('The user has been updated');
    //   console.log({
    //     result,
    //   })
    //   // router.push('/users');
    //   return;
    // }
    //
    // if (!isActionSuccessful(result)) {
    //   alert(result.serverError ?? 'Error updating user');
    //   return;
    // }
    //
    // alert('The user has been updated');
  }

  return (
    <form action={handleSubmit}>
      <input style={{display: 'block'}} name="name" defaultValue={user.name}/>
      <input style={{display: 'block'}} name="email" type="email" defaultValue={user.email}/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileForm;
