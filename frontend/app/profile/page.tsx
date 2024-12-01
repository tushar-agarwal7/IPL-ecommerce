'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, ShieldCheck, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

interface Theme {
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
}

interface TeamColor {
  name: string;
  color: string;
}

interface UserData {
  name: string;
  email: string;
  team: string;
  id: string;
}
const IPL_TEAM_COLORS: Record<string, TeamColor> = {
    red: { name: 'RCB', color: '#ff0000' },
    blue: { name: 'MI', color: '#004ba0' },
    yellow: { name: 'CSK', color: '#ffff00' },
    orange: { name: 'SRH', color: '#ff9933' },
    pink: { name: 'RR', color: '#ff66b3' },
    purple: { name: 'KKR', color: '#800080' },
    green: { name: 'LSG', color: '#00ff00' },
    teal: { name: 'DC', color: '#008080' },
    maroon: { name: 'PBKS', color: '#7C0A02' }, // Punjab Kings
    navy: { name: 'GT', color: '#002147' },      // Gujarat Titans
  };
  
  interface Theme {
    backgroundColor: string;
    textColor: string;
    primaryColor: string;
  }
export default function ProfilePage() {
  const { theme, setTheme } = useTheme() as any
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!userStr || !token) {
          toast.error('Please log in again');
          return;
        }

        const user: UserData = JSON.parse(userStr);
        const colorKey =
          Object.keys(IPL_TEAM_COLORS).find(
            (color) => IPL_TEAM_COLORS[color].name === user.team
          ) || '';
        setUserData(user);
        setSelectedColor(colorKey);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  const handleTeamChange = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found');
        return;
      }

      const response = await axios.put(
        'http://localhost:8080/api/v1/user/update-team',
        { color: selectedColor },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUserData(response.data.user);
        toast.success('Team updated successfully!');
        setTimeout(() => {
            window.location.reload();

        },1500);

      
      } else {
        toast.error('Failed to update team');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.response?.data || error.message);
      }
      toast.error('Failed to update team');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
          <Navbar/>

    <div
      className="min-h-screen flex flex-col justify-center items-center p-8"
      style={{
        backgroundColor: theme ? `${theme.backgroundColor}50` : 'white',
        color: theme?.textColor || 'black',
      }}
    >
         <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-50"></div>
    <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full blur-3xl opacity-50"></div>
    <Image
        src="/cricket.jpg"
        alt="IPL Merchandise Store"
        fill
        className="absolute inset-0 object-cover object-center  filter brightness-50 opacity-20"
        priority
    />
        <Toaster/>
      <Card
        className="max-w-2xl w-full bg-white/60 shadow-xl backdrop-blur-lg rounded-lg overflow-hidden"
        style={{
          border: theme ? `2px solid ${theme.primaryColor}` : '1px solid #e0e0e0',
        }}
      >
        <CardHeader
          className="text-center py-6"
          style={{
            background: theme
              ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.textColor})`
              : 'linear-gradient(135deg, #6a11cb, #2575fc)',
            color: theme ? theme.textColor : 'white',
          }}
        >
          <CardTitle className="text-3xl font-bold uppercase tracking-wide">
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <User className="h-7 w-7 text-purple-600" />
                <span className="font-semibold text-lg">Name: {userData.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-7 w-7 text-blue-600" />
                <span className="font-semibold text-lg">Email: {userData.email}</span>
              </div>
              <div className="flex items-center space-x-4">
                <ShieldCheck className="h-7 w-7 text-green-600" />
                <span className="font-semibold text-lg">
                  Current Team: {userData.team}
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Update Your Team</h3>
              <Select
                value={selectedColor}
                onValueChange={(value) => setSelectedColor(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent className='bg-zinc-700 opacity-100 text-white'>
                  {Object.entries(IPL_TEAM_COLORS).map(([key, { name }]) => (
                    <SelectItem key={key} value={key}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="mt-6 w-full"
                onClick={handleTeamChange}
                disabled={
                  isLoading ||
                  selectedColor ===
                    Object.keys(IPL_TEAM_COLORS).find(
                      (color) => IPL_TEAM_COLORS[color].name === userData.team
                    )
                }
              >
                {isLoading ? <RefreshCcw className="animate-spin" /> : 'Update Team'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>         

              </>

  );
}
