import { ServiceForm } from '@/components/ServiceForm';
import React from 'react';

export default function page() {
  return (
    <main className='w-full flex flex-col flex-grow space-y-8 p-12 bg-slate-100 rounded-md'>
      <h1 className='text-3xl font-semibold'>Create Service</h1>
      <ServiceForm />
    </main>
  );
}