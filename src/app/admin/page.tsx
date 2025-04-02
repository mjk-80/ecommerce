"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPanel = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      router.push("/login"); // اگر لاگین نکرده، هدایت به لاگین
    }
  }, []);

  return (
    <div>
      <h1>🎯 پنل مدیریت</h1>
    </div>
  );
};

export default AdminPanel;
