"use client";

import { apolloClient } from "@/lib/apolloClient";
import { UPDATE_USER } from "@/lib/queries";
import { revalidate } from "@/lib/revalidate";
import { useMutation } from "@apollo/client";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ConfigForm = ({ type }: { type: string }) => {
  const [updateUser, { loading }] = useMutation(UPDATE_USER());
  const [formData, setFormData] = useState({
    shopName: "",
    location: "",
    picture: "",
  });
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 w-full max-w-[400px]"
      autoComplete="off"
    >
      {type && type == "shop" && (
        <>
          <Input
            onChange={(e) => handleChange("shopName", e.target.value)}
            variant="bordered"
            label="Shop Name"
          />
          <Input
            onChange={(e) => handleChange("location", e.target.value)}
            variant="bordered"
            label="Location"
          />
        </>
      )}
      <Input
        onChange={(e) => handleChange("picture", e.target.value)}
        variant="bordered"
        label="Picture"
      />
      <Button isLoading={loading} type="submit" color="primary">
        Submit
      </Button>
    </form>
  );
};
