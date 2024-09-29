import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from 'lucide-react';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

function BookAppointment({ professor }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [inputNote, setInputNote] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    getTime();
    const getKindeSession = async () => {
      const res = await fetch("/api/kindeSession");
      const data = await res.json();
      setUser(data.user);
    };
    getKindeSession();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 7; i <= 12; i++) {
      timeList.push({ time: i + ':00 AM' });
      timeList.push({ time: i + ':30 AM' });
    }
    for (let i = 1; i <= 8; i++) {
      timeList.push({ time: i + ':00 PM' });
      timeList.push({ time: i + ':30 PM' });
    }
    setTimeSlot(timeList);
  };

  const savedBooking = async () => {
    const data = {
      data: {
        UserName: user ? `${user.given_name} ${user.family_name}` : '',
        Email: user ? user.email : '',
        Time: selectedTimeSlot,
        Date: date.toISOString(),
        professor: professor.id,
        Note: [
          {
            type: 'paragraph',
            children: [
              {
                text: inputNote,
                type: 'text'  // Osiguravamo da je tip čvora 'text'
              }
            ]
          }
        ]
      }
    };

    console.log('Sending booking data:', data);

    try {
      const resp = await GlobalApi.bookAppointment(data);
      console.log('Booking response:', resp);
      if (resp.status === 200) {
        GlobalApi.sendEmail(data).then(resp=>{
          console.log(resp)
        })
        toast("Your classes are booked, you'll receive an Email!");
      } else {
        toast.error("Failed to book your classes. Please try again.");
      }
    } catch (error) {
      console.error('Error booking appointment:', error.response?.data || error.message);
      toast.error("Failed to book your classes. Please try again.");
    }
  };

  const isPastDay = (day) => {
    return day < new Date();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="px-2 mt-3 rounded-full">Get Your Classes</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get Your Additional Classes</DialogTitle>
          <DialogDescription>
            <div>
              <div className='grid grid-cols-1 md:grid-cols-2 mt-3'>
                {/* Calendar */}
                <div className='flex flex-col gap-3 items-baseline'>
                  <h2 className='flex gap-2 items-center mb-5'>
                    <CalendarDays className='text-primary h-5 w-5' />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className="rounded-md border"
                  />
                </div>
                {/* Time slot */}
                <div className='mt-3 md:mt-0'>
                  <h2 className='flex gap-2 items-center'>
                    <Clock className='text-primary h-5 w-5' />
                    Select Time Slot
                  </h2>
                  <div className='grid grid-cols-3 gap-2 border rounded-lg p-5'>
                    {timeSlot?.map((item, index) => (
                      <h2
                        key={index}
                        onClick={() => setSelectedTimeSlot(item.time)}
                        className={`p-2 border text-center hover:bg-primary hover:text-white cursor-pointer rounded-full
                        ${item.time == selectedTimeSlot && 'bg-primary text-white'}`}
                      >
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <Input
                  placeholder="Add Note"
                  className="mt-3"
                  value={inputNote}
                  onChange={(e) => setInputNote(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <>
              <Button type="button" className="text-red-500 border-red-500" variant="outline">
                Close
              </Button>
              <Button type="button" disabled={!(date && selectedTimeSlot)}
                onClick={() => savedBooking()}
              >
                Submit
              </Button>
            </>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookAppointment;
