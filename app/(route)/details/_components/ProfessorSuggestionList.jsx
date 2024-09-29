"use client";
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap } from 'lucide-react';

function ProfessorSuggestionList({ currentProfessor }) {
  const [professorList, setProfessorList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getProfessorList();
  }, []);

  const getProfessorList = () => {
    GlobalApi.getProfessorList().then(resp => {
      console.log(resp.data.data);
      const filteredProfessors = resp.data.data.filter(professor => professor.id !== currentProfessor.id);
      const sortedProfessors = filteredProfessors.sort((a, b) => {
        const aHasSameCategory = a.attributes.categories.data.some(category =>
          currentProfessor.attributes.categories.data.some(
            currentCategory => currentCategory.id === category.id
          )
        );
        const bHasSameCategory = b.attributes.categories.data.some(category =>
          currentProfessor.attributes.categories.data.some(
            currentCategory => currentCategory.id === category.id
          )
        );

        return bHasSameCategory - aHasSameCategory;
      });
      setProfessorList(sortedProfessors);
    });
  };

  const handleProfessorClick = (professor) => {
    router.push(`/details/${professor.id}`);
  };

  return (
    <div className='mt-5 p-4 border-[1px] rounded-lg'>
      <h2 className='mb-2 font-bold'>Suggested Professors</h2>
      <div className='h-80 overflow-y-auto overflow-x-auto'>
        {professorList.map((professor, index) => (
          <div 
            key={index}
            className='mb-4 p-3 shadow-sm w-full cursor-pointer hover:bg-slate-100 rounded-lg flex items-center gap-3'
            onClick={() => handleProfessorClick(professor)}
          >
            <Image 
              src={professor.attributes?.Image?.data?.attributes?.url}
              width={70} 
              height={70} 
              alt='professor-img' 
              className='rounded-full w-[70px] h-[70px] object-cover'
            />
            <div className='flex-col'>
              <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>
                {professor.attributes?.categories.data[0].attributes?.Name}
              </h2>
              <h2 className='text-primary'>{professor.attributes?.Name}</h2>
              <h2 className='flex gap-2 text-gray-500 text-sm'>
                <GraduationCap className='w-4 h-4'/>
                {professor.attributes?.YearsOfExperience} 
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfessorSuggestionList;
