"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Button } from "@heroui/react";
import { FaPaw, FaMapMarkerAlt, FaChevronRight, FaInfoCircle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function AllPetsPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/pets")
            .then((res) => {
                if (!res.ok) throw new Error("Server data error");
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) setPets(data);
            })
            .catch((err) => {
                console.error("Error reading data:", err);
                toast.error("Failed to sync up with database listings.");
            })
            .finally(() => setLoading(false));
    }, []);

    const handleAdoptNowClick = (e, petName) => {
        e.preventDefault();
        if (!session) {
            toast.error(`Please login to complete your adoption for ${petName}!`);
            router.push("/login");
        } else {
            toast.success(`Application submitted to owner for ${petName}!`);
            router.push("/my-requests");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-gray-200 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-md uppercase tracking-wider mb-2">
                            <FaPaw /> Public Directory
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">All Available Pets</h1>
                        <p className="text-gray-500 mt-1">Browse open pet profiles uploaded by our verified community network.</p>
                    </div>
                    <div className="text-sm font-semibold text-gray-500 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm self-start md:self-auto">
                        Showing <span className="text-blue-600 font-bold">{pets.length}</span> global records
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((idx) => (
                            <div key={idx} className="h-107 rounded-2xl bg-gray-200 animate-pulse border border-gray-100" />
                        ))}
                    </div>
                ) : pets.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
                        <FaPaw className="text-5xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-800">No Listings Recorded</h3>
                        <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">There are currently no pets stored inside the cluster collection databases.</p>
                        <Button as={Link} href="/add-pet" className="mt-5 bg-blue-600 text-white font-bold px-5 py-2 text-xs rounded-xl shadow-sm">
                            Create First Profile
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pets.map((pet) => (
                            <Card key={pet._id} className="border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-2xl overflow-hidden flex flex-col group">

                                <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                                    <div className="relative h-64 w-full bg-gray-100">
                                        <Image
                                            src={pet.image}
                                            alt={pet.name}
                                            width={500}
                                            height={300}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?q=80&w=500";
                                            }}
                                        />
                                    </div>
                                    <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-md shadow-sm">
                                        {pet.species}
                                    </div>
                                    <div className="absolute bottom-3 right-3 bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-lg shadow-md">
                                        {pet.adoptionFee > 0 ? `$${pet.adoptionFee}` : "Free Adoption"}
                                    </div>
                                </div>

                                <div className="p-5 grow flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">{pet.name}</h2>
                                            <span className="text-[11px] font-bold text-gray-500 bg-gray-100 border border-gray-200/50 px-2 py-0.5 rounded-md uppercase tracking-wider">{pet.gender}</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-gray-500">
                                            <p>Breed: <span className="text-gray-700">{pet.breed}</span></p>
                                            <span className="text-gray-300">•</span>
                                            <p>Age: <span className="text-gray-700">{pet.age}</span></p>
                                        </div>

                                        <p className="text-xs font-medium text-gray-500 flex items-center gap-1 pt-0.5">
                                            <FaMapMarkerAlt className="text-red-400 text-[10px]" /> {pet.location}
                                        </p>

                                        <p className="text-sm text-gray-600 line-clamp-2 pt-2 border-t border-gray-100">
                                            {pet.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 pt-2">
                                        <Button
                                            as={Link}
                                            href={`/pets/${pet._id}`}
                                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1 border border-gray-200/30"
                                        >
                                            <FaInfoCircle className="text-[11px]" /> Details
                                        </Button>
                                        <Button
                                            onPress={(e) => handleAdoptNowClick(e, pet.name)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1 shadow-sm shadow-blue-200"
                                        >
                                            Adopt Now <FaChevronRight className="text-[9px]" />
                                        </Button>
                                    </div>
                                </div>

                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}