"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
} from "@/components/ui/form"
import SubmitButton from "../other/SubmitButton"
import { useRef, useState } from "react"
import { PrayerFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import PrayerFormContent from "./PrayerFormContent"
import { useUser } from '@clerk/nextjs';






export default function Priere() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null)

  const { 
    isLoaded, 
    isSignedIn, 
    user 
  } = useUser();

  // 1. Define your form. 
  const form = useForm<z.infer<typeof PrayerFormValidation>>({
    resolver: zodResolver(PrayerFormValidation),
    defaultValues: {
      name: user?.firstName ? user.firstName :  "" ,
      email: user?.emailAddresses? user.emailAddresses.toString() : "",
      phone: "",
      subject: "",
      subjectType: ""
    },
  })
  const addPrayerFunction = useMutation(api.prayer.addPrayer);

  async function onSubmit(formData: z.infer<typeof PrayerFormValidation>){
    setIsLoading(true);
    
    try {
        const prayerId = await addPrayerFunction({
            name: formData.name as string,
            subject: formData.subject as string,
            email: formData.email as string,
            phone: formData.phone as string,
            sujectType: formData.subjectType as string,
            userId: user?.id
        });

        if (prayerId){
          router.push(`priere/${prayerId}/success`)
        }
          
    }catch(err){
        console.log(err);
    }

    setIsLoading(false);
  }


  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        
        <section className=" mb-3 md:mb-12 space-y-4">
          <p className="text-gray-700">Bienvenue sur la plateforme de prière. Veuillez soumettre votre sujet</p>
        </section>
        
        <PrayerFormContent form={form} />
        
        <SubmitButton isLoading={isLoading}> 
          Get Started
        </SubmitButton>
       
      </form>
    </Form>
  )
}
