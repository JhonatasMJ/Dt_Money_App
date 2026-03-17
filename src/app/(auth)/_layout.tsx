import { Slot, Redirect } from "expo-router";
import { useAuthContext } from "@/context/auth.context";
import { useState } from "react";
import Loading from "../loading";

export default function AuthLayout() {
  const { token, user } = useAuthContext();
  const isAuthenticated = !!token && !!user;
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading setLoading={setLoading} />;
  }

  if (isAuthenticated) {
    return <Redirect href="/home" />;
  }

  return <Slot />;
}
