"use client"
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from './_components/BookingList'
import GlobalApi from '@/app/_utils/GlobalApi'

function MyBooking() {
  const [user, setUser] = useState();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    const getKindeSession = async () => {
      const res = await fetch("/api/kindeSession");
      const data = await res.json();
      setUser(data.user);
      console.log("User fetched:", data.user);
    };
    getKindeSession();
  }, []);

  useEffect(() => {
    if (user) {
      console.log("Fetching bookings for user:", user.email);
      getUserBookingList();
    }
  }, [user]);

  const getUserBookingList = () => {
    GlobalApi.getUserBookingList(user?.email)
      .then(resp => {
        console.log("Bookings fetched:", resp.data.data);
        setBookingList(resp.data.data);
      })
      .catch(error => {
        console.error("Error fetching user bookings:", error);
      });
  };

  /**
   * filtering user booking
   * @param {} type 
   * @returns 
   */

  const filterUserBooking=(type)=>{
    const result=bookingList.filter(item=>
        
        type=='upcoming'?new Date(item.attributes.Date)>=new Date()
        :new Date(item.attributes.Date)<=new Date()
    )
    console.log(result)
    return result;
  }

  return (
    <div className='px-4 sm:px-10 mt-10'>
      <h2 className='font-bold text-2xl'>My Classes</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList bookingList={filterUserBooking('upcoming')}
          updateRecord={()=>getUserBookingList()}
          expired={false}/>
        </TabsContent>
        <TabsContent value="expired">
          <BookingList bookingList={filterUserBooking('expired')}
          updateRecord={()=>getUserBookingList()}
          expired={true}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;
