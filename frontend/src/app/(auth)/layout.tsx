"use client";
import Navbar from "@/components/Navbar";
import "../globals.css";
import { useLoggedIn } from "@/hooks/useLoggedIn";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn, loading } = useLoggedIn();
  if (loading) return <>Loading...</>;
  if (isLoggedIn) redirect("/home");
  console.log(isLoggedIn);
  return (
    <>
      <Navbar loggedIn={false} />
      <div className="mx-12 lg:mx-16">{children}</div>;
    </>
  );
}
