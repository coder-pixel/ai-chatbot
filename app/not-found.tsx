"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();

  const [timer, setTimer] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000); // Redirect after 3 seconds

    setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg mt-2">
        Redirecting to homepage in {timer} seconds...
      </p>
    </div>
  );
}
