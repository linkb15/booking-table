'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, UsersIcon, ClockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string({ required_error: 'Please select a time.' }),
  partySize: z.string({ required_error: 'Please select a party size.' }),
  specialRequests: z.string().optional(),
});

export default function BookingForm() {
  const [date, setDate] = useState<Date>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    // Here you would typically send this data to your backend
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Book a Table
      </h2>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name')}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={`w-full justify-start text-left font-normal ${
                !date && 'text-muted-foreground'
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? date.toDateString() : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                setValue('date', newDate);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="time">Time</Label>
        <Select onValueChange={(value) => setValue('time', value)}>
          <SelectTrigger id="time">
            <SelectValue placeholder="Select a time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="18:00">6:00 PM</SelectItem>
            <SelectItem value="19:00">7:00 PM</SelectItem>
            <SelectItem value="20:00">8:00 PM</SelectItem>
            <SelectItem value="21:00">9:00 PM</SelectItem>
          </SelectContent>
        </Select>
        {errors.time && (
          <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="partySize">Party Size</Label>
        <Select onValueChange={(value) => setValue('partySize', value)}>
          <SelectTrigger id="partySize">
            <SelectValue placeholder="Select party size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 person</SelectItem>
            <SelectItem value="2">2 people</SelectItem>
            <SelectItem value="3">3 people</SelectItem>
            <SelectItem value="4">4 people</SelectItem>
            <SelectItem value="5+">5+ people</SelectItem>
          </SelectContent>
        </Select>
        {errors.partySize && (
          <p className="text-red-500 text-sm mt-1">
            {errors.partySize.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="specialRequests">Special Requests</Label>
        <Textarea id="specialRequests" {...register('specialRequests')} />
      </div>

      <Button type="submit" className="w-full">
        Book Table
      </Button>
    </form>
  );
}
