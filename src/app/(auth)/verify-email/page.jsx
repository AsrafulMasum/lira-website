"use server"

import VerifyEmail from '@/components/auth/verifyEmail/VerifyEmail'
import React, { Suspense } from 'react'

 const page = () => {
  return (
    <div> 
      <Suspense> 
        <VerifyEmail />
      </Suspense>
    </div>
  )
} 

export default page;
