'use client'

import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryStreamedHydration} from "@tanstack/react-query-next-experimental";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {getQueryClient} from "@/app/get-query-client";

export function Providers(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}
