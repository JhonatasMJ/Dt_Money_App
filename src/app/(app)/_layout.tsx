import { Redirect, Slot } from "expo-router";
import { useAuthContext } from "@/context/auth.context";

export default function AppLayout() {
  const { token, user } = useAuthContext();
  const isAuthenticated = !!token && !!user;

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }
  return <Slot />;
}