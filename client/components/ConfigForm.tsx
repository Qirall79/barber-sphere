"use client";

import { UPDATE_USER } from "@/lib/queries";
import { revalidate } from "@/lib/revalidate";
import { useMutation } from "@apollo/client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { InputField } from "./ui/InputField";
import { useForm } from "react-hook-form";

export const ConfigForm = ({ type }: { type: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateUser, { loading }] = useMutation(UPDATE_USER());
  const router = useRouter();

  const onSubmit = async (formData: any) => {
    await updateUser({
      variables: {
        updateUserInput: formData,
      },
    });
    revalidate("/");
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 w-full max-w-[400px]"
      autoComplete="off"
    >
      {type && type == "shop" && (
        <>
          <InputField
            errors={errors}
            label="Shop Name"
            name="shopName"
            register={register}
            errorMessage="shop name is required"
          />
          <InputField
            errors={errors}
            label="Location"
            name="location"
            register={register}
            errorMessage="location is required"
          />
        </>
      )}
      <InputField
        errors={errors}
        label="Picture"
        name="picture"
        register={register}
        errorMessage="picture is required"
      />
      <Button isLoading={loading} type="submit" color="primary">
        Submit
      </Button>
    </form>
  );
};
