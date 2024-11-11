"use client"
import React, {useEffect, useState} from 'react'
import GlobalApi from '@/app/_utils/GlobalApi';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function CategoryList() {
    const [categoryList, setCategoryList]=useState([]);
    const params=usePathname();
    const category=params.split('/')[2];

    useEffect(()=>{
        getCategoryList();
    },[])

    const getCategoryList=()=>{
        GlobalApi.getCategory().then(resp=>{
            console.log('Received categories:', resp.data.data);
            setCategoryList(resp.data.data);
        })
    }

    return (
        <div className='h-screen sticky mt-5 flex flex-col'>
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="overflow-visible">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {categoryList && categoryList.map((item, index) => (
                            <Link href={'/search/' + item?.attributes?.Name} key={index} className={`p-2 flex gap-2 text-[14px] text-blue-600 items-center rounded-md cursor-pointer w-full ${category == item.attributes.Name && 'bg-blue-100'}`}>
                                <CommandItem>
                                    <Image src={item.attributes?.Icon?.data.attributes?.url} alt='icon' width={25} height={25} />
                                    <label>{item.attributes.Name}</label>
                                </CommandItem>
                            </Link>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    )
}

export default CategoryList;
