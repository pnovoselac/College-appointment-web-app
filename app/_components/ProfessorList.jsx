import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProfessorList({professorList, heading='Favourite Professors'}) {
  return (
    <div className='mb-10 px-8'>
      <h2 className='font-bold text-xl'>{heading}</h2>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 
        gap-7 mt-4
        lg:grid-cols-4'>
            {professorList.length>0?professorList.map((professor, index)=>(
                <div key={index} className='border-[1px] rounded-lg p-3
                cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out' 
                >
                    <Image src={professor.attributes?.Image?.data?.attributes?.url}
                    alt='professor'
                    width={500}
                    height={200}
                    className='h-[200px] w-full object-cover rounded-lg' />
                    <div className='mt-3 items-baseline flex flex-col gap-2'>
                        <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>{professor.attributes?.categories.data[0].attributes?.Name}</h2>
                        <h2 className='font-bold'>{professor.attributes.Name}</h2>
                        <h2 className='text-primary text-sm'>{professor.attributes?.YearsOfExperience}</h2>
                        <h2 className='text-gray-500 text-sm'>{professor.attributes?.Address}</h2>
                      <Link href={'/details/'+professor?.id} className='w-full'>
                        <h2 className='p-2 px-3 border-[1px] border-primary text-primary rounded-full w-full 
                        text-center text-[11px] mt-2 cursor-pointer hover:bg-primary hover:text-white'>Get Your Termin</h2>
                      </Link>
                    </div>
                </div>  
            ))
        :
        //Skeleton effect
        [1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className='h-[220px] bg-slate-200 w-full rounded-lg animate-pulse'>

            </div>
        ))
        }
        </div>
    </div>
  )
}

export default ProfessorList
