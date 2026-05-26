"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FaPaw, FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid credentials. Please try again.");
    } else {
      toast.success("Welcome back to KindredPaws!");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50/50 px-4 py-12">
      <Card className="w-full max-w-md p-6 shadow-md border border-gray-100 bg-white rounded-2xl">
        <Card.Header className="flex flex-col items-center gap-2 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <FaPaw className="text-2xl text-blue-600" />
          </div>
          <Card.Title className="text-2xl font-bold text-gray-900">Welcome Back</Card.Title>
          <Card.Description className="text-sm text-gray-500">Log in to manage your pet adoptions</Card.Description>
        </Card.Header>

        <Card.Content>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm text-gray-900"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm text-gray-900"
                placeholder="••••••••"
              />
            </div>

            <Button 
              type="submit" 
              isLoading={loading}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 font-medium py-2.5 rounded-xl transition-colors shadow-sm mt-2"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-4">
            <div className="relative flex py-2 items-center">
              <div className="grow border-t border-gray-200"></div>
              <span className="shrink mx-4 text-gray-400 text-xs uppercase tracking-wider">Or continue with</span>
              <div className="grow border-t border-gray-200"></div>
            </div>

            <Button 
              type="button"
              onPress={handleGoogleSignIn}
              className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2 bg-white shadow-sm"
            >
              <FaGoogle className="text-red-500" />
              Google Sign In
            </Button>
          </div>
        </Card.Content>

        <Card.Footer className="flex justify-center border-t border-gray-100 pt-4 mt-6 text-sm text-gray-600">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 font-medium hover:underline">
              Register here
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}