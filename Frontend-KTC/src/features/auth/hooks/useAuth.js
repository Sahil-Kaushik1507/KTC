import useAuthStore from "../store/authStore.js";

const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;