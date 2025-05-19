"use client"
import Header from "@/components/dashboard/Header";
import PrayerCard from "@/components/dashboard/PrayerCard";
import { api } from "@/convex/_generated/api";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";


const page = () => {
    const {isLoaded, isSignedIn, user} = useUser();
    const prayers = useQuery(api.prayer.getPrayerByUser, {"userId": user?.id? user.id.toString(): "none"} );
    const [categorie, setCategorie] = useState("all");
    const [filteredPrayer, setFilteredPrayer] = useState(prayers)

    
    return (
        <>
        <Header setCategorie={setCategorie} selected={categorie}/>
        <div className='flex flex-wrap justify-center gap-3 bg-white opacity-100 mx-5 my-3 sm:min-h-screen shadow-white shadow-2xl rounded-2xl' >
            
            
            {
                categorie == 'all'?
                    prayers?.map((prayer) => <PrayerCard prayer={prayer} key={prayer._id}/>)
                    :
                    prayers?.
                            filter((prayer)=> prayer.state == categorie).
                            map((prayer) => <PrayerCard prayer={prayer} key={prayer._id}/>)
            }
        </div>
        </>
        
    )
}

export default page;