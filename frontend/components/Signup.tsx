'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { toast, Toaster } from 'sonner';
import Cookies from 'js-cookie';

interface TeamColor {
    name: string;
    shortName: string;
    color: string;
    logo: string;
}

interface FormData {
    name: string;
    email: string;
    password: string;
    color: string;
}
const IPL_TEAM_COLORS: Record<string, TeamColor> = {
    red: {
        name: 'Royal Challengers Bangalore',
        shortName: 'RCB',
        color: '#ff0000',
        logo: 'https://example.com/rcb-logo.png',
    },
    blue: {
        name: 'Mumbai Indians',
        shortName: 'MI',
        color: '#004ba0',
        logo: 'https://example.com/mi-logo.png',
    },
    yellow: {
        name: 'Chennai Super Kings',
        shortName: 'CSK',
        color: '#ffff00',
        logo: 'https://example.com/csk-logo.png',
    },
    orange: {
        name: 'Sunrisers Hyderabad',
        shortName: 'SRH',
        color: '#ff9933',
        logo: 'https://example.com/srh-logo.png',
    },
    pink: {
        name: 'Rajasthan Royals',
        shortName: 'RR',
        color: '#ff66b3',
        logo: 'https://example.com/rr-logo.png',
    },
    purple: {
        name: 'Kolkata Knight Riders',
        shortName: 'KKR',
        color: '#800080',
        logo: 'https://example.com/kkr-logo.png',
    },
    green: {
        name: 'Lucknow Super Giants',
        shortName: 'LSG',
        color: '#00ff00',
        logo: 'https://example.com/lsg-logo.png',
    },
    teal: {
        name: 'Delhi Capitals',
        shortName: 'DC',
        color: '#008080',
        logo: 'https://example.com/dc-logo.png',
    },
    maroon: {
        name: 'Punjab Kings',
        shortName: 'PBKS',
        color: '#800000',
        logo: 'https://example.com/pbks-logo.png',
    },
    navy: {
        name: 'Gujarat Titans',
        shortName: 'GT',
        color: '#003366',
        logo: 'https://example.com/gt-logo.png',
    },
};

const Signup: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (user && token) {
            router.push('/');
        }
    }, [router]);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        color: '',
    });

    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTeamSelect = (color: string) => {
        setFormData(prev => ({
            ...prev,
            color,
        }));
        setIsTeamModalOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, email, password, color } = formData;
        if (!name || !email || !password || !color) {
            toast.error("Please fill all fields!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/signup', {
                name,
                email,
                password,
                color,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.msg === "User account created successfully") {
                // Store token in localStorage and cookies
                const token = response.data.token;
                localStorage.setItem('token', token);
                Cookies.set('token', token, { expires: 7 }); 

                localStorage.setItem('user', JSON.stringify(response.data.user));

                localStorage.setItem('signupComplete', 'true');
                localStorage.setItem('showSignupConfetti', 'true');

                toast.success(response.data.msg);
                
                setTimeout(() => {
                    toast(`${response.data.user.team} assigned successfully`);
                }, 2000);

                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = "/";
                }, 2500);
            }
        } catch (error: any) {
            if (error.response) {
                const errors = error.response.data.errors || [];
                errors.forEach((err: any) => {
                    toast.error(err.message);
                });

                if (errors.length === 0) {
                    toast.error(error.response.data.msg || "Signup failed");
                }
            } else {
                toast.error("Network error. Please try again.");
            }
            console.error("Signup ERROR:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full blur-3xl opacity-50"></div>
            
            <Image
                src="/cricket.jpg"
                alt="IPL Merchandise Store"
                fill
                className="absolute inset-0 object-cover object-center filter brightness-50 opacity-20"
                priority
            />

            <div className="relative bg-transparent rounded border-s-2 border-t-2 border-slate-800 bg-opacity-50 backdrop-blur-md p-8 rounded-xl shadow-2xl w-96">
                <h2 className="text-2xl flex justify-center font-mono font-bold text-center text-white mb-6">
                    Signup
                    <Image src="/logo.png" alt="logo" width={50} height={10} />
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm text-gray-300 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <button
                            type="button"
                            onClick={() => setIsTeamModalOpen(true)}
                            className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                                formData.color
                                    ? `bg-[${IPL_TEAM_COLORS[formData.color].color}] text-white`
                                    : 'bg-gray-800 text-gray-300 border-gray-600'
                            }`}
                        >
                            {formData.color
                                ? `${IPL_TEAM_COLORS[formData.color].name}`
                                : 'Choose Your Favorite Team'}
                        </button>
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-2 mt-4 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Signup
                    </Button>
                </form>

                {isTeamModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
                            <h3 className="text-xl font-bold text-white mb-4 text-center">
                                Choose Your IPL Team
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(IPL_TEAM_COLORS).map(([colorKey, teamInfo]) => (
                                    <button
                                        key={colorKey}
                                        onClick={() => handleTeamSelect(colorKey)}
                                        className={`
                                            flex flex-col items-center justify-center 
                                            p-4 rounded-lg 
                                            border-2 transition-all duration-300
                                            ${formData.color === colorKey
                                                ? 'border-white ring-4 ring-purple-500'
                                                : 'border-transparent hover:border-gray-700'}
                                            bg-gray-800 hover:bg-gray-700
                                        `}
                                    >
                                        <div
                                            className="w-16 h-16 rounded-full mb-2 shadow-lg"
                                            style={{ backgroundColor: teamInfo.color }}
                                        />
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setIsTeamModalOpen(false)}
                                className="w-full mt-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                <p className="text-white pt-2 text-center">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-500 hover:text-blue-700 underline transition-colors duration-200"
                    >
                        Login
                    </Link>
                </p>
            </div>

            <Toaster />
        </div>
    );
};

export default Signup;