"use client";
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import ProfessorDetail from '../_components/ProfessorDetail';
import ProfessorSuggestionList from '../_components/ProfessorSuggestionList';

function Details({ params }) {
  const [professor, setProfessor] = useState();

  useEffect(() => {
    getProfessorById();
  }, []);

  const getProfessorById = () => {
    GlobalApi.getProfessorById(params.recordId).then(resp => {
      setProfessor(resp.data.data);
    });
  };

  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold text-[22px]'>Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
        {/* Professor detail */}
        <div className='col-span-3'>
          {professor && <ProfessorDetail professor={professor} />}
        </div>
        <div className='col-span-2'>
          {professor && <ProfessorSuggestionList currentProfessor={professor} />}
        </div>
      </div>
    </div>
  );
}

export default Details;
