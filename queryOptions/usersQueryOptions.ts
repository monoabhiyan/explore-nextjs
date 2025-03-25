import {queryOptions} from "@tanstack/react-query";
import axios from 'axios';

export const usersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: async () => {
    const path = '/api/users';
    const response = await axios.get(path, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    return response.data
  },
})
