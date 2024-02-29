import { queryOptions, useQuery } from "@tanstack/react-query";

export type User = {
  id: string;
  name: string;
};

export const UserQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["users", userId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8888/users/${userId}`);
      const json = await response.json();
      return json as User;
    },
    staleTime: 1000 * 60 * 5,
  });

const useUserQuery = (userId: string) => useQuery(UserQueryOptions(userId));

export default useUserQuery;
