import { ServiceForm } from '@/components/ServiceForm';
import { MuiFileInput } from 'mui-file-input';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <main className='w-full flex flex-col flex-grow space-y-4 p-12 bg-slate-100 rounded-md'>
      <h1 className='text-3xl font-semibold'>Services</h1>
      <Link className='text-blue-600' href={'/services/create'}>Create Service</Link>
    </main>
  );
}
