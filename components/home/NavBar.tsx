"use client";
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AlignJustify, CircleX, X } from 'lucide-react';
import { motion } from "framer-motion";
import { UserButton, useUser, useClerk } from '@clerk/nextjs';
interface pathNameProps{
    pathName: string;
    isCurrent: boolean;
  }


const NavBarLink = ({pathName, isCurrent}: pathNameProps) => {


    return (
        <a 
            href={pathName.toLowerCase()}
            className={cn("pb-3 px-3 text-xl text-white hover:text-blue-500 ", 
                        isCurrent && "border-b-2 border-orange-600") }>
            {pathName}
        </a>
    )
}

const ToggleNavBarLink = ({pathName, isCurrent}: pathNameProps) => {


    return (
        <a 
            href={pathName.toLowerCase()}
            className={cn("w-full text-center  pb-3 px-3 text-xl border-b border-gray-50 hover:text-blue-500 ", 
                        isCurrent? "text-orange-600": "") }>
            {pathName}
        </a>
    )
}
const NavBar = () => {

    const pathname = usePathname();
    const router = useRouter();
    const pathNames = ["Home", "About", "Dashboard"];
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menuVariants = {
        open: {
          opacity: 1,
          height: "auto", // Expand to fit content
          transition: {
            duration: 0.5, // Slow appearance
          },
        },
        closed: {
          opacity: 0,
          height: 0, // Collapse to nothing
          transition: {
            duration: 0.5, // Slow disappearance
          },
        },
      };

      const { 
        isLoaded, 
        isSignedIn, 
        user 
      } = useUser();

      const { signOut } = useClerk();

    const handleSignOut = async () => {
        await signOut();
        // Optionally redirect manually if not using redirectUrl prop
        window.location.href = '/';
    };

  return (
    <nav className="flex  justify-between items-center px-5 py-5 md:mx-3">



        {
            !isOpen && 
            <div className='flex w-full  justify-between'>
                <h1 className="text-2xl font-extrabold  text-white md:text-5xl">Prayer Room</h1>

                <AlignJustify color="#ffffff" size={32} className={cn('md:hidden hover:cursor-pointer')} 
                    onClick={()=> toggleMenu()}/>
            </div>
        }
        


        <motion.div 
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={menuVariants}
             className={cn("w-full bg-transparent overflow-hidden z-30", !isOpen && 'absolute top-0 left-0 ')}>
            <div className='w-full flex justify-end border-b border-gray-50'>
                <X color="white" size={32} className=' hover:cursor-pointer mx-3 my-1' onClick={()=> toggleMenu()}/>
            </div>
            
            
            <ul className="flex flex-col w-full justify-between  text-white ">

            {
                pathNames.map((path:string, index) => (
                    <li className='w-full flex items-center justify-center' key={index}>
                        <ToggleNavBarLink pathName={path} isCurrent={pathname == '/'+path.toLowerCase()}/>
                    </li>
                ))
            }
            <li className='flex flex-col w-full'>
                    {
                        isSignedIn ?

                        <button 
                            onClick={handleSignOut}
                            className="border-2 border-blue-900 text-white font-bold px-4 py-2 rounded  hover:text-blue-500 ">
                            Log out
                        </button>
                        
                        :
                    <button 
                        onClick={()=> router.push('/sign-in')}
                        className="border-2 border-blue-900 text-white font-bold px-4 py-2 rounded  hover:text-blue-500 ">
                        Login 
                    </button>
                    }
            </li>

            </ul>
        </motion.div>

        
        
        <ul className=" hidden space-x-6 text-gray-600 items-center md:visible md:flex">

            {   
                pathNames.map((path:string, index) => (
                    <li key={index}>
                        <NavBarLink pathName={path} isCurrent={pathname == '/'+path.toLowerCase()}/>
                    </li>
                ))
            }
            <li>
                {
                    isSignedIn ?
                    <UserButton />
                    :
                    <button 
                        onClick={()=> router.push('/sign-in')}
                        className="border-2 border-blue-900 text-white font-bold px-4 py-2 rounded  hover:text-blue-50">
                        Login
                    </button>
                }
            </li>
        </ul>
    
    </nav>
  )
}

export default NavBar