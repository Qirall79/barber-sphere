'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

export const FileInput = ({
  handleChange,
  multiple,
  inputRef,
  isInvalid,
}: {
  handleChange: any;
  multiple: boolean;
  inputRef: any;
  isInvalid?: boolean;
}) => {
  return (
    <div className='space-y-4'>
      <label htmlFor='file-input' className='sr-only'>
        Choose file
      </label>
      <input
        onChange={handleChange}
        ref={inputRef}
        multiple={multiple}
        type='file'
        name='file-input'
        id='file-input'
        accept='image/*'
        className={`block w-full border border-gray-200 ${
          isInvalid ? 'border-[#F31260] border-2' : ''
        } shadow-sm rounded-xl text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400`}
      />
      {isInvalid && (
        <span className='text-xs text-[#F31260]'>
          At least 1 image is required
        </span>
      )}
    </div>
  );
};
