import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import CancelAppointment from './CancelAppointment'
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

function BookingList({ bookingList,expired,updateRecord }) {
    const onDeleteBooking=(item)=>{
        console.log(item)
        GlobalApi.deleteBooking(item.id).then(resp=>{
            console.log(resp);
            if(resp){
                toast('Classes successfully deleted!');
                updateRecord()
            }
        })
    }
  return (
    <div>
      {bookingList && bookingList.map((item, index) => {
        console.log("Booking item:", item);
        const professor = item.attributes.professor?.data[0]?.attributes;
        const imageUrl = professor?.Image?.data?.attributes?.url;
        const name = professor?.Name;
        const address = professor?.Address;
        const date = item.attributes?.Date;
        const time = item.attributes?.Time;

        return (
          <div key={index} className="flex gap-4 items-center p-5 border rounded-lg m-3">
            {imageUrl ? (
              <Image
                src={imageUrl}
                className='rounded-full h-[70px] w-[70px] object-cover'
                width={100}
                height={100}
                alt='professor-image'
              />
            ) : (
              <p>No Image Available</p>
            )}
            <div className='flex flex-col gap-2 w-full'>
                <h2 className="font-bold text-[18px] items-center flex justify-between">{name}
                {!expired&&<CancelAppointment onContinueClick={()=>onDeleteBooking(item)}/>}
                </h2>
                <h2 className="flex gap-2 text-gray-500"><MapPin className='text-primary h-5 w-5'/>{address}</h2>
                <h2 className="flex gap-2"><Calendar className='text-primary h-5 w-5' /> Appointment on: {moment(date).format('DD-MMM-YYYY')}</h2>
                <h2 className="flex gap-2"><Clock className='text-primary h-5 w-5'/> Time: {time}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookingList;
