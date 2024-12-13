import RegisterForm from '@/components/RegisterForm'
import React from 'react'

function page() {
  return (
    <div className='flex justify-center items-center pb-4 bg-primary-light'>
      <div className='w-full max-w-xl'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default page