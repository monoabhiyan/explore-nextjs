'use client';
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useSearchParams} from 'next/navigation'

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  async function $signIn(formData: FormData) {
    try {
      if (!formData.get('email')) return;
      const response = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
        callbackUrl,
      });
      if (response?.ok && !response?.error) {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.log({error});
    }
  }

  return (
    <form action={$signIn}>
      <input style={{display: 'block'}} defaultValue="john@mail.com" name="email" type="email" placeholder="Email"/>
      <input style={{display: 'block'}} defaultValue="changeme" name="password" type="password" placeholder="Password"/>
      <button type="submit">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
