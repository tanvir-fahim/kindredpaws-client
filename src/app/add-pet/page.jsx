"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FaPaw, FaMapMarkerAlt, FaFileAlt, FaDollarSign } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function AddPetPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Access denied. Please log in first.");
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataInstance = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formDataInstance.entries());

    const petPayload = {
      ...formValues,
      ownerEmail: session.user.email,
      createdAt: new Date()
    };

    try {
      const response = await fetch("http://localhost:5000/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petPayload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Pet listing added successfully!");
        router.push("/my-listings");
      } else {
        toast.error(data.message || "Failed to submit pet data.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error: Could not reach server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm">
        
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FaPaw className="text-xl" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Add Pet (Dashboard Layout)</h1>
          <p className="text-sm text-gray-500">Provide verified pet info to create an immutable database record.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Pet Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g., Max"
                className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all font-medium text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Species *</label>
              <select
                name="species"
                required
                className="w-full h-11 px-3 text-sm bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all font-semibold text-gray-700"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Breed *</label>
              <input
                type="text"
                name="breed"
                required
                placeholder="e.g., Golden Retriever"
                className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all font-medium text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Age *</label>
              <input
                type="text"
                name="age"
                required
                placeholder="e.g., 2 Years / 3 Months"
                className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all font-medium text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Gender *</label>
              <select
                name="gender"
                required
                className="w-full h-11 px-3 text-sm bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all font-semibold text-gray-700"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Adoption Fee ($) *</label>
              <div className="relative">
                <FaDollarSign className="absolute left-4 top-3.5 text-gray-400 text-xs" />
                <input
                  type="number"
                  name="adoptionFee"
                  required
                  min="0"
                  placeholder="0 for free adoption"
                  className="w-full h-11 pl-9 pr-4 text-sm bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all font-medium text-gray-800"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Health Status *</label>
              <input
                type="text"
                name="healthStatus"
                required
                placeholder="e.g., Perfect / Minor Allergy"
                className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all font-medium text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Vaccination Status *</label>
              <select
                name="vaccinationStatus"
                required
                className="w-full h-11 px-3 text-sm bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all font-semibold text-gray-700"
              >
                <option value="Fully Vaccinated">Fully Vaccinated</option>
                <option value="Partially Vaccinated">Partially Vaccinated</option>
                <option value="Not Vaccinated">Not Vaccinated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Location *</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g., Dallas, TX"
                  className="w-full h-11 pl-10 pr-4 text-sm bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all font-medium text-gray-800"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Image URL *</label>
              <input
                type="url"
                name="image"
                required
                placeholder="https://something.com/..."
                className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all font-medium text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Owner Email</label>
            <input
              type="email"
              readOnly
              value={session.user.email}
              className="w-full h-11 px-4 text-sm bg-gray-100 border border-gray-200 text-gray-500 rounded-xl outline-none cursor-not-allowed select-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Description *</label>
            <div className="relative">
              <FaFileAlt className="absolute left-4 top-3.5 text-gray-400 text-sm" />
              <textarea
                name="description"
                required
                rows="3"
                placeholder="Describe the pet's temperament, habits, history..."
                className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all font-medium text-gray-800 resize-none"
              />
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full h-12 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors text-sm mt-2"
          >
            Publish Pet Profile
          </Button>
        </form>
      </div>
    </div>
  );
}