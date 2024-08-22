"use client";

import { UPDATE_USER } from "@/lib/queries";
import { revalidate } from "@/lib/revalidate";
import { useMutation } from "@apollo/client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { InputField } from "./ui/InputField";
import { useForm } from "react-hook-form";
import { MapInput } from "./MapInput";
import { useRef, useState } from "react";
import { FileInput } from "./ui/FileInput";
import { IoMdCloseCircle } from "react-icons/io";
import Image from "next/image";
import uploadFile from "@/lib/uploadFile";
import { useSession } from "@/hooks/useSession";

export const ConfigForm = ({ user }: { user: IUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateUser, { loading }] = useMutation(UPDATE_USER());
  const [position, setPosition] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [file, setFile] = useState<any>();
  const inputRef = useRef<any>(null);
  const router = useRouter();

  const onSubmit = async (formData: any) => {
    if (!file) {
      setIsInvalid(true);
      return;
    }

    formData.location = `${position[0]}, ${position[1]}`;
    setIsLoading(true);
    const imageUrl = await uploadFile([file], user.picture);

    formData.picture = imageUrl;
    await updateUser({
      variables: {
        updateUserInput: formData,
      },
    });
    revalidate("/");
    router.push("/");
    setIsLoading(false);
  };

  const handleFileChange = (e: any) => {
    const newFile: any = inputRef.current?.files[0];
    inputRef.current.value = "";
    setFile(newFile);
    setIsInvalid(false);
  };

  const handleDelete = (e: any) => {
    setFile(null);
    setIsInvalid(true);
  };

  return (
    <div className="w-full flex flex-col space-y-8">
      <h1 className="text-3xl font-semibold">
        {user.type === "shop" ? "Create Shop" : "Add Profile Picture"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 w-full max-w-[650px]"
        autoComplete="off"
      >
        {user.type && user.type == "shop" && (
          <>
            <InputField
              errors={errors}
              label="Shop Name"
              name="shopName"
              register={register}
              errorMessage="shop name is required"
            />
            <MapInput setPosition={setPosition} />
          </>
        )}
        {file && (
          <div className="w-[200px] h-[200px] border flex justify-center items-center relative rounded-md">
            <span className="absolute top-2 right-2 z-50 cursor-pointer text-white bg-black rounded-full">
              <IoMdCloseCircle onClick={handleDelete} />
            </span>

            <Image
              className="rounded-md"
              height={200}
              width={200}
              alt="service"
              src={URL.createObjectURL(file)}
            />
          </div>
        )}
        <FileInput
          inputRef={inputRef}
          handleChange={handleFileChange}
          multiple={false}
          isInvalid={isInvalid}
        />
        <Button
          isLoading={loading || isLoading}
          type="submit"
          color="primary"
          className="bg-slate-950"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
