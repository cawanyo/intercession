'use client'
import { Button } from '@/components/ui/button';
import { SubjectType } from '@/constants';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { formatDateTime } from '@/lib/utils';
import { useQuery } from 'convex/react';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = ({params: {prayerId}, searchParams} : SearchParamProps) => {

  
  const prayer = useQuery(api.prayer.getPrayer, {_id: prayerId as Id<"prayer">});
  const subjectType = SubjectType.find((element) => element.name === prayer?.subjectType);
  const image = subjectType? subjectType.image : SubjectType[SubjectType.length-1].image;
  const date = new Date(prayer?._creationTime!);
  
  return (
    <div className='flex justify-center items-center mx-5 my-3'>
    <div className=' flex  bg-white opacity-90 p-[5%] rounded-3xl items-center justify-center'>

        <div className='success-img'>
            


            <section className='flex flex-col items-center'>
              <Image
                src={"/assets/gifs/success.gif"}
                height={300}
                width={280}
                alt='success'
              />

              <h2 className='header mb-6 max-w-[600px] text-center'>
                  Vos <span className='text-green-500'>sujets de prières</span> ont été bien transmis!
              </h2>

              <p>
                Si vous avez transmis vos contacts, nous prendrons contact avec vous si nécessaire.
              </p>
            </section>

           
            <section className='request-details m-5' >
              <p>Catégorie: <span className=' text-green-800 italic'> {prayer?.subjectType? prayer?.subjectType : "Autre"} </span></p>


              <div className='flex gap-2'>
                <Image
                  src={"/assets/icons/calendar.svg"}
                  height={24}
                  width={24}
                  alt='calendar'
                />

                <p>{formatDateTime(date.toDateString()).dateTime}</p>
              </div>
            </section>

            <Button variant={"outline"} className='shad-primary-btn bg-green-800 '  asChild>
              <Link href={`/priere`}>
                Soumettre un nouveau sujet de prière
              </Link>
            </Button>
            
        </div>     
    </div>
    </div>
  )
}

export default Success
