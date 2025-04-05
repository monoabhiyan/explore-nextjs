// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import axios from "axios";

import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

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
    </div>
  );
};

export default ProfilePage;
