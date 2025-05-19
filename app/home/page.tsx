'use client';
import NavBar from "@/components/home/NavBar";
import AnimatedImageCircle from "@/components/home/AnimatedImageCircle"
import { Footer } from "@/components/home/Footer";
import { useRouter } from "next/navigation";

export default function Root({searchParams}: SearchParamProps) {
  //const isAdmin = searchParams.admin === 'true';
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between mt-20">
      {/* Navbar */}
      

      {/* Hero Section */}
      <main className="flex-1 flex flex-col px-6 gap-y-4 mt-4 md:flex-row md:mx-10  md:items-center md:justify-between ">

        <div className="">
          <div className="">
            <img src="/assets/images/prayer.png" alt="logo" className="w-20 h-20 md:w-32 md:h-32" />
          </div>

          <h2 className="text-4xl font-bold text-white mb-4 mt-10">Call To Prayer</h2>
          <p className="text-white mb-6">Let's praying whenever it's calling</p>
          <button 
            className="bg-green-500 text-white px-6 py-3 rounded-full shadow hover:bg-green-600"
            onClick={() => {router.push('/priere')}}
            >
            Submit Prayer
          </button>
        </div>
        <AnimatedImageCircle/>
      </main>

    
    </div>
  );
}
