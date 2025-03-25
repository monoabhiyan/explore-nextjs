import UsersCard from "@/components/users-card";
import {Suspense} from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <UsersCard/>
      </Suspense>
    </div>
  );
}
