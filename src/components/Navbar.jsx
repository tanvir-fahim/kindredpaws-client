"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Dropdown,
    Avatar
} from "@heroui/react";
import { FaPaw, FaBars, FaTimes } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    // console.log(user);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const handleLogout = async() => {
        setIsMobileMenuOpen(false);
        await authClient.signOut();
    };

    const getLinkClass = (path) => {
        return pathname === path 
            ? "text-blue-600 font-bold transition-colors" 
            : "hover:text-blue-600 transition-colors";
    };

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/70 backdrop-blur-lg">
            <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors focus:outline-none"
                        aria-label="Toggle navigation menu"
                    >
                        {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                    </button>

                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <FaPaw className="text-2xl text-blue-600" />
                        <p className="font-bold text-xl">KindredPaws</p>
                    </Link>
                </div>

                <ul className="hidden sm:flex items-center gap-6 font-medium text-gray-700">
                    <li>
                        <Link href="/" className={getLinkClass("/")}>Home</Link>
                    </li>
                    <li>
                        <Link href="/pets" className={getLinkClass("/pets")}>All Pets</Link>
                    </li>

                    {user && (
                        <>
                            <li>
                                <Link href="/my-requests" className={getLinkClass("/my-requests")}>My Requests</Link>
                            </li>
                            <li>
                                <Link href="/add-pet" className={getLinkClass("/add-pet")}>Add Pet</Link>
                            </li>
                        </>
                    )}
                </ul>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {user ? (
                        <Dropdown>
                            <Dropdown.Trigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer">
                                <Avatar>
                                    <Avatar.Image
                                        src={user.image || "https://i.pravatar.cc/150"}
                                        alt={user.name}
                                    />
                                    <Avatar.Fallback>{user.name?.charAt(0) || "U"}</Avatar.Fallback>
                                </Avatar>
                            </Dropdown.Trigger>
                            <Dropdown.Popover>
                                <Dropdown.Menu aria-label="Profile Actions">
                                    <Dropdown.Item id="profile" className="h-14 gap-2">
                                        <p className="font-semibold text-gray-500">Signed in as</p>
                                        <p className="font-bold">{user.email}</p>
                                    </Dropdown.Item>
                                    <Dropdown.Item id="dashboard">
                                        <Link href="/dashboard" className="w-full block">Dashboard</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item id="logout" className="text-red-500" onPress={handleLogout}>
                                        Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={`px-3 py-2 text-sm sm:text-base font-medium ${getLinkClass("/login")}`}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-colors shadow-sm"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </header>

            {isMobileMenuOpen && (
                <div className="sm:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-1 shadow-inner animate-fade-in">
                    <Link
                        href="/"
                        className={`block py-2.5 font-medium ${getLinkClass("/")}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/pets"
                        className={`block py-2.5 font-medium ${getLinkClass("/pets")}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        All Pets
                    </Link>

                    {user && (
                        <>
                            <Link
                                href="/my-requests"
                                className={`block py-2.5 font-medium ${getLinkClass("/my-requests")}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                My Requests
                            </Link>
                            <Link
                                href="/add-pet"
                                className={`block py-2.5 font-medium ${getLinkClass("/add-pet")}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Add Pet
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}