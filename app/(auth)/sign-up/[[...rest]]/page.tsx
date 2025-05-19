import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
    return (
     <SignUp 
        path='/sign-up'
        signInUrl='/sign-in'
        
     />
    )
}

export default page
