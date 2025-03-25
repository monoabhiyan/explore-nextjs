import {isServer, queryOptions} from "@tanstack/react-query";

export const usersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: async () => {
    if (!isServer) {
      return ''
    }
    const path = 'http://localhost:3000/api/users'
    return await (
      await fetch(path, {
        cache: 'no-store'
      })
    ).json()
  }
})
