import UsersCard from "@/components/users-card";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {getQueryClient} from "@/app/get-query-client";
import {usersQueryOptions} from "@/queryOptions/usersQueryOptions";

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(usersQueryOptions)
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersCard/>
      </HydrationBoundary>
    </div>
  );
}
