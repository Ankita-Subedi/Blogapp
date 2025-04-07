import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function useLoggedIn() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Simulate authentication check (replace this with actual authentication check)
  useEffect(() => {
    const user = localStorage.getItem("token");
    console.log("User from localStorage:", user); // Debugging line
    setIsLoggedIn(!!user);
    setLoading(false);
  }, []);
  const logout = () => {
    localStorage.removeItem("token"); // or any other authentication logic
    setIsLoggedIn(false); // Ensure the state updates
    redirect("/login");
  };
  return {
    isLoggedIn,
    loading,
    logout,
  };
}

export { useLoggedIn };
