"use client"
import { api } from "@/convex/_generated/api";
import { Button } from "../ui/button";
import { CommentValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { Form } from "../ui/form";
import CustomFormField from "../forms/CustomFormField";
import { FormFieldType } from "@/constants";
import Comment from "./Comment";
import { CheckCheck, Hourglass, MessageSquareQuote, Pyramid, ShieldX, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


interface CardProps {
    prayer: Doc<"prayer">;
  }

type Status = 'pending' | 'success' | 'failed';
  

const PrayerCard = ({prayer}: CardProps) => {
    const {isLoaded, isSignedIn, user} = useUser();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showComment, setShowComment] = useState<boolean>(false);
    const addCommentFunction = useMutation(api.comment.addComment);
    const [selectedOption, setSelectedOption] = useState<Status>(prayer.state);
    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            comment: ""
        }
    })
    const changePrayerState = useMutation(api.prayer.changeState);

    function renderPrayerState(state: string) {
        switch (state) {
          case "pending":
            return <Hourglass color="gray"/>;
          case "success":
            return <CheckCheck color="green" />;
          case "failed":
            return <X color="red" />;
          default:
            return null;
        }
      }
    const comments = useQuery(api.comment.getCommentByPrayer, {"prayerId": prayer._id});
    
    const onChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        setSelectedOption(event.target.value as Status)
    }
    async function onSubmit(formData: z.infer<typeof CommentValidation>){
        setIsLoading(true);
        try {
            const commentId = await addCommentFunction({
                content: formData.comment,
                userId: user?.id ? user?.id.toString() : "",
                username: user?.fullName ? user?.fullName.toString() : "",
                prayerId: prayer._id
            })
        }
        catch(err){
            console.log(err);
        }
    
        setIsLoading(false);
    }
    return (
        <div className="">
            <div className="bg-[url('/assets/images/prayerCard2.jpg')] opacity-100 w-100 h-64  bg-cover bg-center flex items-center justify-center">
                <p>{prayer.subject}</p>
            </div>

            <div>
                {
                    showComment?
                    <div>
                        <div className="max-h-32 overflow-scroll border my-2">
                            {
                                comments?.map((comment) => <Comment id={comment.userID} key={comment._id} name={comment.username} content={comment.content}/>)
                            }
                        </div>
                        <Form {...form}>
                            <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                                <CustomFormField
                                    type={FormFieldType.TEXT_AREA}
                                    control={form.control}
                                    name="comment"
                                    label=""
                                    disabled
                                    />
                                <div className="flex justify-between">
                                    <Button onClick={() => {setShowComment(false)}}>
                                        Annuler
                                    </Button>
                                    <Button type={"submit"}> 
                                        Soumettre
                                    </Button>
                                    
                                </div>
                            </form>
                        </Form>
                        
                    </div>
                    :
                    
                    <div className="flex justify-end gap-3">                         
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                        {
                           renderPrayerState(prayer.state)
                        }
                    </DropdownMenuTrigger>
                    <DropdownMenuContent >
                        <DropdownMenuLabel>Réponse</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-green-800" onSelect={(event) => {changePrayerState({id: prayer._id, state: "success"})}}>Success</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-800" onSelect={(event) => {changePrayerState({id: prayer._id, state: "failed"})}}>Failed</DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-400" onSelect={(event) => {changePrayerState({id: prayer._id, state: "pending"})}}>Pending</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                        <Button onClick={() => {setShowComment(true)}}>
                            <MessageSquareQuote />
                        </Button>
                    </div>

                }
               

                
            </div>

        </div>
    )

}

export default PrayerCard;