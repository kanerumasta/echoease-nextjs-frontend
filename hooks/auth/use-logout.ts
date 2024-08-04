import { useLogoutUserMutation } from "@/redux/features/authApiSlice";

export default function useLogout() {
  const [logoutUser] = useLogoutUserMutation();
  const logout = () => {
    logoutUser()
      .unwrap()
      .then((res) => window.location.reload())
      .catch((err) => console.error(err));
  };
  return {
    logout,
  };
}
