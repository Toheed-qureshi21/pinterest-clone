import React, { useContext } from 'react'
import { PinContext } from '../context/PinContext'
import { Loading } from '../UI/Loading';
import PinCard from '../UI/PinCard';

const Home = () => {
  const {pins,loading} = useContext(PinContext);

  
  return (
    <main className="h-screen w-screen max-md:h-auto ">
      {
        loading ?(<Loading/>) :(
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='px-4 py-6 sm:px-0'>
            <ul className='flex flex-wrap m-4'>
              { 
                  pins && pins.length>0 ? pins.map((pin)=> <PinCard key={pin._id} pin={pin}/>) : <p>No pins yet</p>
              }
            </ul>
          </div>
        </div>
        )
      }
    </main>
  )
}

export default Home
