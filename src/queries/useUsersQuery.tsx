import { useInfiniteQuery } from "@tanstack/react-query";
import { User } from "./useUserQuery";

const useUsersQuery = () =>
  useInfiniteQuery({
    queryKey: ["users"],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `http://localhost:8888/users/?offset=${pageParam}`,
      );
      const json = await response.json();
      return json as { users: User[] };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage.users.length === 10 ? lastPageParam + 1 : null,
  });

export default useUsersQuery;
