"use client"
import ProfessorList from '@/app/_components/ProfessorList';
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'

function Search({params}) {

  const [professorList, setProfessorList]=useState([]);
  useEffect(()=>{
    console.log(params.cname)
    getProfessors();
  },[])

  const getProfessors=()=>{
    GlobalApi.getProfessorByCategory(params.cname).then(resp=>{
      setProfessorList(resp.data.data);

    })
  }

  return (
    <div className='mt-5'>
      <ProfessorList heading={params.cname}
      professorList={professorList}/>
    </div>
  )
}

export default Search
