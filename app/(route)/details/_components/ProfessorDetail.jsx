import { Button } from '@/components/ui/button'
import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import BookAppointment from './BookAppointment';


function extractTextFromContent(content) {
    return content
      .map(block => block.children.map(child => child.text).join(' '))
      .join(' ');
  }

function ProfessorDetail({professor}) {
const aboutText = Array.isArray(professor.attributes.About)
    ? extractTextFromContent(professor.attributes.About)
    : professor.attributes.About;

  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
    {/*Professor image */}
    <div>
      <Image src={professor.attributes?.Image?.data?.attributes?.url}
      width={200} height={200} alt='professor-img' className='rounded-lg w-full h-[280px] object-cover'/>
    </div>
    {/*Professor informations */}
    <div className='col-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline'>
        <h2 className='font-bold text-2xl'>{professor.attributes?.Name}</h2>
        <h2 className='flex gap-2 text-gray-500 text-md'>
            <GraduationCap/>
            <span>{professor.attributes?.YearsOfExperience}</span>
        </h2>
        <h2 className='text-md flex gap-2 text-gray-500'>
            <MapPin/>
            <span>{professor.attributes.Address}</span>
        </h2>
        <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>{professor.attributes?.categories.data[0].attributes?.Name}</h2>
        <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>{professor.attributes?.categories.data[1].attributes?.Name}</h2>
        <BookAppointment professor={professor}/>
    </div>

    {/*About professor */}
    
  </div>
  <div className='p-3 border-[1px] rounded-lg mt-5'>
  <h2 className='font-bold text-[20px]'>
      About Me
  </h2>
  <p className='text-gray-500 tracking-wide mt-2'>{aboutText}</p>
</div>

</>
  )
}

export default ProfessorDetail;
