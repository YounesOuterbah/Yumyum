"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const formData = { fullName, email, password };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password != confirmPassword) {
      return alert("password dont match");
    }
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
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
            <h1 className="mb-2 text-2xl font-medium">Sign up</h1>
            <label>Your Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="First and last name"
              className="border p-2 rounded outline-none"
            />
            <label>Mobile number or email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded outline-none"
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="border p-2 rounded outline-none"
            />
            <label>Re-enter password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-2 rounded outline-none"
            />
            <input
              type="submit"
              value="Continue"
              className="p-2 rounded bg-blue-600 text-white cursor-pointer duration-300 hover:bg-blue-800"
            />
            <span className="text-sm">
              By creating an account, you agree to Ekryly's{" "}
              <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-600">
                Conditions of Use
              </span>{" "}
              and{" "}
              <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-600">
                Privacy Notice.
              </span>
            </span>
            <hr className="my-4" />
            <Link href="signin" className="text-blue-600 text-sm cursor-pointer">
              Already have an account?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
