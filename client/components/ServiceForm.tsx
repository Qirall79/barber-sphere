'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { FileInput } from './ui/FileInput';
import { InputField } from './ui/InputField';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';

export const ServiceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState<any[]>([]);
  const inputRef = useRef<any>(null);

  const handleChange = (e: any) => {
    const newFiles: any[] = [...inputRef.current?.files];
    inputRef.current.value = '';
    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (e: any) => {
    let target = e.target;

    if (target.nodeName === 'path') target = target.parentElement;

    const id = target.getAttribute('id');
    const newFiles = files.filter((f, i) => i != id);
    setFiles([...newFiles]);
  };

  const onSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <div>
      <form
        className='w-full max-w-[600px] flex flex-col space-y-4'
        method='POST'
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          name='serviceName'
          register={register}
          errors={errors}
          errorMessage='Service name is required'
          label='Service Name'
        />
        <Input
          {...register('price', {
            required: {
              value: true,
              message: 'Price is required',
            },
          })}
          size='lg'
          variant='bordered'
          type='number'
          placeholder='0.00'
          startContent={
            <div className='pointer-events-none flex items-center'>
              <span className='text-default-400 text-small'>$</span>
            </div>
          }
          errorMessage={<>{errors.price?.message}</>}
          isInvalid={!!errors.price}
        />
        <div>
          <div className='flex flex-wrap justify-start items-end gap-2'>
            {files.length != 0 &&
              files.map((f, i) => {
                const src = URL.createObjectURL(f);
                return (
                  <div
                    key={i}
                    className='w-[200px] h-[200px] border flex justify-center items-center relative'
                  >
                    <span className='absolute top-2 right-2 z-50 cursor-pointer text-pink-700'>
                      <IoMdCloseCircle id={`${i}`} onClick={handleDelete} />
                    </span>
                    <Image height={200} width={200} alt='service' src={src} />
                  </div>
                );
              })}
          </div>
          <FileInput
            handleChange={handleChange}
            multiple
            inputRef={inputRef}
          />
        </div>
        <Button type='submit' className='bg-[#020617]' color='primary'>
          Create
        </Button>
      </form>
    </div>
  );
};
