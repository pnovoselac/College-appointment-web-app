"use client"
import { Button } from '../../components/ui/button';
import Image from 'next/image'
import Link from 'next/link';
import { Popover,PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { use } from 'react';
import { useEffect, useState } from "react";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/server";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/server";
import {NextResponse} from "next/server";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs"; 
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
function Header() {
    const Menu=[
    {
        id: 1,
        name:'Home',
        path:'/'
    },
    {
        id: 2,
        name:'Explore',
        path:'/explore'
    },
];

    const [user, setUser] = useState();
    const [authStatus, setAuthStatus] = useState(null);
  
    console.log(user);
  
    useEffect(() => {
      const getKindeSession = async () => {
        const res = await fetch("/api/kindeSession");
        const data = await res.json();
        setUser(data.user);
        setAuthStatus(data.authenticated);
      };
  
      getKindeSession();
    }, []);


  return (
    <div className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-10'>
            <Image src='/logo.svg' alt='logo' width={180} height={80}/>
            <ul className='md:flex gap-8 hidden'>
                {Menu.map((item,index)=>(
                    <li key={item.id}>
                        <Link href={item.path} legacyBehavior>
                            <a className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>{item.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        {user?
        <Popover>
        <PopoverTrigger><Image src={user?.picture} alt='profile-image' width={50} height={50} className='rounded-full'/>
        </PopoverTrigger>
        <PopoverContent className='w-44'>
            <ul className='flex flex-col gap-2'>
                <Link href={'/my-booking'} className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>
                    My classes
                </Link>
                <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>
                <LogoutLink>Logout</LogoutLink>
                </li>
            </ul>
        </PopoverContent>
        </Popover>
        : 
        <LoginLink><Button>Sign in</Button></LoginLink>
   
        }
        
    </div>
  )
}

export default Header
