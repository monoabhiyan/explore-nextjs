'use client';
import {useSuspenseQuery} from "@tanstack/react-query";
import {usersQueryOptions} from "@/queryOptions/usersQueryOptions";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const UsersCard = () => {
  const payload = useSuspenseQuery(usersQueryOptions);
  console.log(payload)
  return (
    <main className="pt-10">
      {
        payload.data?.length > 0 && payload.data.map((user: User) => (
          <div key={user.id} className="flex items-center justify-between p-4 my-2 bg-white rounded-lg shadow-md">
            <div className="flex items-center">
              <img src={user.avatar} alt="avatar" className="w-12 h-12 rounded-full"/>
              <div className="ml-2">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md">Follow</button>
          </div>
        ))
      }
    </main>
  );
};

export default UsersCard;
