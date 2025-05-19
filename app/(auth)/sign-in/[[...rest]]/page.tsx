import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
    return (
     <SignIn 
        path='/sign-in'
        signUpUrl='/sign-up'
        
     />
    )
}

export default page
