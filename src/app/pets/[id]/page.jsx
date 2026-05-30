"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { FaPaw, FaMapMarkerAlt, FaHeart, FaChevronLeft, FaShieldAlt, FaBriefcaseMedical, FaUser } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function PetDetailsPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/pets/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Listing lookup failed.");
        return res.json();
      })
      .then((data) => {
        setPet(data);
      })
      .catch((err) => {
        console.error("Fetch details error:", err);
        toast.error("Could not load pet details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <FaPaw className="text-5xl text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-800">Profile Not Found</h2>
        <p className="text-gray-500 mt-1">The requested pet record may have been removed or adopted.</p>
        <Button as={Link} href="/pets" className="mt-4 bg-blue-600 text-white font-bold rounded-xl text-sm">
          Return to Directory
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        
        <Link href="/pets" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors mb-6 group">
          <FaChevronLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" /> Back to All Pets
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          <div className="relative h-80 md:h-112 w-full bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
            <Image
              src={pet.image}
              alt={pet.name}
              width={600}
              height={450}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?q=80&w=500";
              }}
            />
            <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-lg">
              {pet.species}
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              <div className="border-b border-gray-100 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight">{pet.name}</h1>
                  <span className="text-xs font-bold bg-blue-50 border border-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wider">
                    {pet.gender}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-red-400 text-xs" /> {pet.location}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 bg-gray-50/50 border border-gray-100 shadow-none rounded-xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Breed</p>
                  <p className="text-sm font-bold text-gray-800 truncate mt-0.5">{pet.breed}</p>
                </Card>
                <Card className="p-3 bg-gray-50/50 border border-gray-100 shadow-none rounded-xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Age</p>
                  <p className="text-sm font-bold text-gray-800 truncate mt-0.5">{pet.age}</p>
                </Card>
              </div>

              <div className="space-y-2.5 bg-gray-50/40 border border-gray-200/40 rounded-2xl p-4">
                <div className="flex items-start gap-3 text-sm">
                  <FaBriefcaseMedical className="text-emerald-500 text-sm mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Health Status</p>
                    <p className="font-semibold text-gray-700 text-xs sm:text-sm mt-0.5">{pet.healthStatus}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm pt-2 border-t border-gray-100">
                  <FaShieldAlt className="text-blue-500 text-sm mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Vaccination Log</p>
                    <p className="font-semibold text-gray-700 text-xs sm:text-sm mt-0.5">{pet.vaccinationStatus}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">About {pet.name}</p>
                <p className="text-sm text-gray-600 leading-relaxed font-medium bg-gray-50/20 border border-gray-100 rounded-2xl p-4">
                  {pet.description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Adoption Fee</p>
                <p className="text-xl font-black text-blue-600 mt-0.5">
                  {pet.adoptionFee > 0 ? `$${pet.adoptionFee}` : "Free Adoption"}
                </p>
              </div>
              <Button
                onPress={() => {
                  if (!session) {
                    toast.error(`Please log in to apply for adoption.`);
                    router.push("/login");
                  } else {
                    toast.success(`Application submitted for ${pet.name}!`);
                    router.push("/my-requests");
                  }
                }}
                className="grow max-w-60 h-12 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <FaHeart className="text-xs" /> Adopt Now
              </Button>
            </div>

          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-400 bg-white border border-gray-100 py-2 rounded-xl shadow-sm max-w-sm mx-auto">
          <FaUser className="text-[10px]" /> Listing Managed By: <span className="text-gray-600 font-bold">{pet.ownerEmail}</span>
        </div>

      </div>
    </div>
  );
}