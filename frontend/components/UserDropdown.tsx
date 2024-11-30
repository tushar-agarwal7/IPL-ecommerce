'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";

interface iAppProps {
  email: string;
  name: string;
  userImage: string;
}


export function UserDropdown({ email, name, userImage }: iAppProps) {
  const [isLoading, setIsLoading] = useState(false); 
  const router=useRouter()

  const handleLogout=()=>{
    setIsLoading(true); 
    try{
      localStorage.removeItem('token');
        localStorage.removeItem('user');

        toast.success("Logout successful!", {
            duration: 2000,
            icon: "✅",
        });

        setTimeout(() => {
            setIsLoading(false); 
            router.push("/login"); 
        }, 2000);
    } catch (error) {
        console.error("Error logging out:", error);
        toast.error("Logout failed. Please try again.", {
            duration: 3000,
            icon: "❌",
        });
    } finally {
        setIsLoading(false); 
    }
    }
  
  
  return (
    <DropdownMenu>
            <Toaster />

      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userImage} alt="User Image" />
            <AvatarFallback>{name.slice(0, 3)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-white bg-black" align="end" forceMount>
        <DropdownMenuLabel className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-xs leading-none text-muted-foreground">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
         <Button className="bg-black text-white" onClick={handleLogout}>Logout</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
