"use client";

import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { HTTP_BACKEND } from "@/lib/config";


export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const handleAuth = async () => {
    try {
      const endpoint = isSignin ? "auth/signin" : "auth/signup";
      const requestData = isSignin
        ? { username, password }
        : { name, username, password };

      console.log("Request ", requestData);

      const response = await axios.post(
        `${HTTP_BACKEND}/${endpoint}`,
        isSignin ? { username, password } : { name, username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response : ", response.data);

      if (isSignin) {
        localStorage.setItem("AuthToken", response.data.token);
        toast.success("Login Successful");
        router.push("/createRoom");
      } else {
        toast.success("Signup Successful! Please Sign In.");
        router.push("/signin");
      }
    } catch (error) {
      console.error("Error : ", error);
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center dark:bg-black dark:text-white">
      <div className="w-full max-w-md p-8 m-2 bg-slate-800 rounded-xl shadow-lg shadow-gray-800">
        <h2 className="text-center text-2xl font-semibold mb-6 text-white">
          {isSignin ? "Sign In" : "Sign Up"}
        </h2>

        {!isSignin && (
          <div className="mb-4 flex justify-center">
            <Input
              className="p-2 dark:text-white bg-slate-700 border-gray-600 focus:ring-blue-400 focus:ring-2"
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="mb-4 flex justify-center">
          <Input
            className="p-2 dark:text-white bg-slate-700 border-gray-600 focus:ring-blue-400 focus:ring-2"
            placeholder="Email"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6 flex justify-center">
          <Input
            className="p-2 dark:text-white bg-slate-700 border-gray-600 focus:ring-blue-400 focus:ring-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="pt-4 flex justify-center">
          <Button className="px-10 py-3" onClick={handleAuth}>
            {isSignin ? "Sign In" : "Sign Up"}
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={isSignin ? "/signup" : "/signin"}
              className="text-blue-500 hover:text-blue-600"
            >
              {isSignin ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
