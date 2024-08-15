import { Input } from "@nextui-org/react";
import { ReactNode } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export const InputField = ({
  placeholder,
  label,
  name,
  register,
  errorMessage,
  errors,
}: {
  register: UseFormRegister<any>;
  placeholder?: string;
  label?: string;
  name: string;
  errorMessage: string;
  errors: FieldErrors<any>;
}) => {
  return (
    <Input
      variant="bordered"
      label={label}
      placeholder={placeholder}
      {...register(name, {
        required: {
          value: !!errorMessage,
          message: errorMessage,
        },
      })}
      errorMessage={<>{errors[name]?.message}</>}
      isInvalid={!!errors[name]}
    />
  );
};
