"use client"
import { Button } from '../components/ui/button';
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import ProfessorList from "./_components/ProfessorList";
import GlobalApi from "./_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Home() {

  const[professorList, setProfessorList]=useState([]);

  useEffect(()=>{
    getProfessorList();
  },[])
  const getProfessorList=()=>{
    GlobalApi.getProfessorList().then(resp=>{
      console.log(resp.data.data);
      setProfessorList(resp.data.data);
    })
  }
  return (
    <div>
      {/* Hero Section*/}
      <Hero/>

      {/*Search bar + Categories */}
      <CategorySearch/>

      {/*Popular Professor List*/}
      <ProfessorList professorList={professorList}/>
    </div>
  );
}
