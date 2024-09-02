"use client";

import { useFetchUserQuery } from "@/redux/features/authApiSlice";

export default function AddProfilePic() {
  const fetchUser = useFetchUserQuery();
  if (fetchUser.isLoading) return <p>Loading</p>;
  return (
    <div>
      <div className="flex flex-col items-center ">
        <img width="200" src="/media/user.png" />
        <p className="font-bold capitalize text-xl gap-2">
          {`${fetchUser.data?.first_name} ${fetchUser.data?.last_name}`}
        </p>
      </div>
    </div>
  );
}
