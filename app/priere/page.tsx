import Priere from '@/components/forms/Priere'
import { Footer } from '@/components/home/Footer'
import NavBar from '@/components/home/NavBar'
import React from 'react'

const page = () => {
  return (
    <div className=' flex-1 min-h-screen'>

         <main className='flex flex-col items-center'>
        
            
         <div className="  h-auto  flex flex-col-reverse items-center md:w-[80%] md:flex-row md:items-center md:justify-between">

            <div className='mt-3 md:mt-0'>
              <p className=' text-base text-white italic max-w-48'> Tout ce que vous demanderez dans votre prière avec foi, vous l'obtiendrez</p>
              <p className='text-green-800 text-2xl italic'>Matthieu 21. 22</p>
            </div>
            <div className=' p-5 md:p-10 md:w-[60%]  bg-white shadow-xl rounded-lg'>
                <Priere />
            </div>
            
        </div>
         </main>

         <Footer />
    </div>
  )
}

export default page
