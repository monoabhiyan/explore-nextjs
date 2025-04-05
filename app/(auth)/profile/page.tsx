// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import axios from "axios";

import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import ProfileForm from "@/components/profile-form";
import {authOptions} from "@/lib/nextAuth";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin?callbackUrl=/profile');
  }
  const data = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
    headers: {
      Authorization: `Bearer ${session.accessToken}`
    }
  });


  return (
    <div>
      <p>Profile of user:</p>
      <pre>
        {
          JSON.stringify(data.data, null, 4)
        }
      </pre>
      <ProfileForm user={data.data}/>
    </div>
  );
};

export default ProfilePage;
