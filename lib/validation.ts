import { z } from "zod";


export const CommentValidation = z.object({
  comment: z.string().min(6, 'Too short')
})


export const PrayerFormValidation= z.object({
  name: z
    .string()
    .max(50, "Name must be at most 50 characters")
    .optional(),
  email: z.optional(
    z.string()
    //.email("Invalid email address")
    ),
  phone: z
    .optional(
    z.string()
    //.refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number")
    )
    ,
  subject: z
    .string()
    .min(5),
  subjectType: z
      .string()
      .optional()
});

export const SignInFormValidation = z.object({
  email: z
    .string()
    .email('This email is invalid')
    ,
  password: z.
    string()
    .min(6, 'Too short')
    .max(15, 'Too long')
  ,
  type: z.enum(["Membre", "Intercesseur", "Responsable"])
})

export const SignUpFormValidation = z.object({
  firstName: z.string().min(2, "Name Too Short"),
  lastName: z.string(),
  email: z
    .string()
    .email('This email is invalid')
    ,
  
  password: z.
    string()
    .min(6, 'Too short')
    .max(15, 'Too long')
  ,
  passwordConfirm: z.
    string()
    .min(6, 'Too short')
    .max(15, 'Too long')
  ,

  phone: z
    .optional(
    z.string()),
  type: z.enum(["Membre", "Intercesseur", "Responsable"])
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Password don't match",
  path: ["passwordConfirm"]
})
