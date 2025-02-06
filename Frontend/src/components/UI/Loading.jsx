import React from 'react'

export const LoadingAnimation = () => {
  return (
    <div className='inline-block w-5 h-5 border-2 border-r-transparent border-white rounded-full animate-spin'>
    </div>
  )
}
export const Loading =() => {
  return (
    <div className='h-screen w-screen flex justify-center items-center  '>
        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-red-600'></div>
    </div>
  )
}

