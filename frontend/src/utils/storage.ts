export const saveToken = (token: string | null) => {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
};
