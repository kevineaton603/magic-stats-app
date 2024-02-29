import { useMemo } from "react";
import useUserQuery from "../queries/useUserQuery";
import { Link } from "@tanstack/react-router";
import UserRoute from "../routes/user/UserRoute";

const UserIcon: React.FC<{ userId: string }> = ({ userId }) => {
  const { data } = useUserQuery(userId);
  const initials = useMemo(
    () =>
      data?.name
        .split(" ")
        .reduce((acc, val) => acc + val.charAt(0), "")
        .slice(0, 2),
    [data],
  );
  return (
    <Link
      to={UserRoute.to}
      params={{ userId: userId }}
      className="rounded-full p-3 bg-emerald-700 hover:bg-emerald-600 text-white text-center box-border h-12 w-12"
    >
      {initials}
    </Link>
  );
};

export default UserIcon;
