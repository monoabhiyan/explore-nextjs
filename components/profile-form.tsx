// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';

import {updateUserAction} from "@/app/user/update/user-update.action";

const ProfileForm = ({user}: { user: never }) => {
  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    const result = await updateUserAction({
      id: String(user.id),
      name,
      email,
    })

    // If result?.data is defined, the action is successful
    if (result?.data) {
      alert('The user has been updated');
      console.log({
        result,
      })
      // router.push('/users');
      return;
    }

    // If result?.serverError is defined, the action failed
    if (result?.serverError) {
      alert(result.serverError ?? 'Error updating user');
      return;
    }
  }

  return (
    <form action={handleSubmit}>
      <input style={{ display: 'block' }} name="name" defaultValue={user.name}/>
      <input style={{ display: 'block' }} name="email" type="email" defaultValue={user.email}/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileForm;
