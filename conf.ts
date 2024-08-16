export const ROUTES = {
  home: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    facebook: "/auth/facebook",
    google: "/auth/google",
    resetPassword: "/password-reset",
  },
  echoHunt: "/echo-hunt",
  echoVerse: "/echoverse",
  chat: "/chat",
};

export const PUBLIC_ROUTES = [
  ROUTES.home,
  ROUTES.auth.login,
  ROUTES.auth.register,
  ROUTES.auth.facebook,
  ROUTES.auth.google,
  ROUTES.auth.resetPassword,
];
