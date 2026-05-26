"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FaPaw } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const { name, email, image, password, confirmPassword } = Object.fromEntries(formData);

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password needs at least one uppercase letter!");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password needs at least one lowercase letter!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image: image || "https://i.pravatar.cc/150",
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed. Try again.");
    } else {
      toast.success("Account generated successfully!");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50/50 px-4 py-12">
      <Card className="w-full max-w-md p-6 shadow-md border border-gray-100 bg-white rounded-2xl">
        <Card.Header className="flex flex-col items-center gap-2 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <FaPaw className="text-2xl text-blue-600" />
          </div>
          <Card.Title className="text-2xl font-bold text-gray-900">Create An Account</Card.Title>
          <Card.Description className="text-sm text-gray-500">Join KindredPaws to start adopting</Card.Description>
        </Card.Header>

        <Card.Content>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm text-gray-900"
                placeholder="John Doe"
              />
            </div>

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
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL (Optional)</label>
              <input
                type="url"
                name="image"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm text-gray-900"
                placeholder="https://example.com/avatar.jpg"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
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
              Sign Up
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="flex justify-center border-t border-gray-100 pt-4 mt-6 text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}