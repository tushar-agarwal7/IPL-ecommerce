'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { toast, Toaster } from 'sonner';


const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const router = useRouter();

    // Add useEffect here to check authentication on component mount
    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
    
        if (user && token) {
            router.push('/');
            return;
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const BACKEND_URL=process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            toast.error("Please fill all fields!");
            return;
        }

        console.log("form", formData);
 
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                email: formData.email,
                password: formData.password,
            });
            console.log(response);

            if (response.data.msg === "Signin successful") {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                toast.success(response.data.msg);
                
                // Immediate redirect
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            }
        } catch (e: any) {
            console.error("Signin error:", e);

            if (e.response && e.response.data.msg) {
                toast.error(e.response.data.msg);
            } else {
                toast.error("Something went wrong during signin!");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full blur-3xl opacity-50"></div>
            <Image
                src="/cricket.jpg"
                alt="IPL Merchandise Store"
                fill
                className="absolute inset-0 object-cover object-center  filter brightness-50 opacity-20"
                priority
            />
            <div className="relative bg-transparent rounded border-s-2 border-t-2 border-slate-800 bg-opacity-50 backdrop-blur-md p-8 rounded-xl shadow-2xl w-96">
                <h2 className="text-2xl flex justify-center font-mono font-bold text-center text-white mb-6">Signin
                    <Image src="/logo.png" alt="logo" width={50} height={10} />
                </h2>
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                <form onSubmit={handleSubmit}>
                  
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
                  
                    <Button
                        type="submit"
                        className="w-full py-2 mt-4 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Signin
                    </Button>
                </form>

                
                <p className="text-white  pt-2 ">
                  New User?{" "}
                    <Link
                        href="/signup"
                        className="text-blue-500 hover:text-blue-700 underline transition-colorsduration-200"
                    >
                        Click here
                    </Link>
                </p>

            </div>
            <Toaster />


        </div>
    );
};

export default Signin;