"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const formData = { email, password };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return alert(data.msg);
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-6">
      <div className="container">
        <h1 className="text-center">
          <Link href="/" className="font-bold text-4xl">
            EKRYLY
          </Link>
        </h1>
        <div className="m-auto max-w-md">
          <form
            onSubmit={handleForm}
            className="mt-6 flex gap-3 flex-col shadow-md border rounded-md p-6"
          >
            <h1 className="mb-2 text-2xl font-medium">Sign in</h1>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="border p-2 rounded outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="border p-2 rounded outline-none"
            />
            <input
              type="submit"
              value="Continue"
              className="p-2 rounded bg-blue-600 text-white cursor-pointer duration-300 hover:bg-blue-800"
            />
            <span className="text-sm">
              By continuing, you agree to Ekryly's{" "}
              <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-600">
                Conditions of Use
              </span>{" "}
              and{" "}
              <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-600">
                Privacy Notice.
              </span>
            </span>
            <hr className="my-4" />
            <span className="text-blue-600 text-sm cursor-pointer">Forgot your password?</span>
          </form>

          <div className="relative">
            <div className="text-center mt-4 relative z-30 bg-white px-2 w-fit m-auto text-sm text-slate-400">
              New to Ekryly?
            </div>
            <span className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-400 -z-10"></span>
          </div>

          <Link
            href="signup"
            className="w-full mt-4 text-center shadow-md text-sm p-2 rounded border duration-300 hover:shadow-inner block"
          >
            Create your Ekryly account
          </Link>
        </div>
      </div>
    </div>
  );
}
