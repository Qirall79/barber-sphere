'use client';

import { UPDATE_USER } from '@/lib/queries';
import { revalidate } from '@/lib/revalidate';
import { useMutation } from '@apollo/client';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { InputField } from './ui/InputField';
import { useForm } from 'react-hook-form';
import { MapInput } from './MapInput';
import { useState } from 'react';

export const ConfigForm = ({ type }: { type: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateUser, { loading }] = useMutation(UPDATE_USER());
  const [position, setPosition] = useState([]);
  const router = useRouter();

  const onSubmit = async (formData: any) => {
    formData.location = `${position[0]}, ${position[1]}`;
    await updateUser({
      variables: {
        updateUserInput: formData,
      },
    });
    revalidate('/');
    router.push('/');
  };

  return (
    <div className='w-full flex flex-col space-y-8'>
      <h1 className='text-3xl font-semibold'>Create Shop</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col space-y-4 w-full'
        autoComplete='off'
      >
        {((type && type == 'shop') || true) && (
          <>
            <InputField
              errors={errors}
              label='Shop Name'
              name='shopName'
              register={register}
              errorMessage='shop name is required'
            />
          </>
        )}
        <InputField
          errors={errors}
          label='Picture'
          name='picture'
          register={register}
          errorMessage='picture is required'
        />
        <MapInput setPosition={setPosition} />
        <Button isLoading={loading} type='submit' color='primary'>
          Submit
        </Button>
      </form>
    </div>
  );
};
