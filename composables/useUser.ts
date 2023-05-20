export const useUser = () => {
  const session = useAuth();
  return session.data.value?.user.id;
}
