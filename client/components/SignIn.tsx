"use client";

import { createSession } from "@/lib/actions";
import {
  emailSignIn,
  emailSignUp,
  extractErrorMessage,
  facebookSignIn,
  googleSignIn,
} from "@/lib/firebase";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { useMutation } from "@apollo/client";
import { CREATE_USER, UPSERT_USER } from "@/lib/queries";
import { revalidate } from "@/lib/revalidate";
import { useForm } from "react-hook-form";
import { InputField } from "./ui/InputField";

const signUpFields = [
  {
    name: "firstName",
    label: "First Name",
    errorMessage: "First Name is required",
  },
  {
    name: "lastName",
    label: "Last Name",
    errorMessage: "First Name is required",
  },
];

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createUser] = useMutation(CREATE_USER(), {});
  const [upsertUser, { error, data }] = useMutation(UPSERT_USER(), {});

  const router = useRouter();
  const [operation, setOperation] = useState<"signIn" | "signUp">("signIn");
  const [type, setType] = useState<"shop" | "user">("user");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const socialSignIn = async (provider: "google" | "facebook") => {
    try {
      setIsLoading(true);
      let idToken: string | undefined;
      if (provider === "facebook") idToken = await facebookSignIn();
      else idToken = await googleSignIn();
      await createSession(idToken as string);
      await upsertUser({
        variables: {
          upsertUserInput: {
            type,
          },
        },
      });
      setIsLoading(false);
      revalidate("/");
      router.push("/");
    } catch (error) {
      console.log("Error signing in with " + provider);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (formData: any) => {
    setIsLoading(true);
    try {
      let idToken: string | undefined;
      if (operation == "signIn")
        idToken = await emailSignIn(formData.email, formData.password);
      else idToken = await emailSignUp(formData.email, formData.password);
      const session = await createSession(idToken as string);

      if (operation == "signUp" && session.status == "success")
        await createUser({
          variables: {
            createUserNameInput: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              type,
            },
          },
        });
      setIsLoading(false);
      revalidate("/");
      router.push("/");
    } catch (error: any) {
      if (error instanceof FirebaseError)
        toast.error(extractErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const changeType = () => {
    if (type === "shop") setType("user");
    else setType("shop");
  };

  return (
    <div className="w-full max-w-[500px] flex flex-col space-y-6">
      <div className="w-full flex flex-col border border-slate-500 p-8 rounded-md space-y-4">
        <h2 className="text-3xl mb-4">
          {operation == "signIn" ? "Sign In" : "Sign Up"}
        </h2>
        {operation == "signUp" && (
          <div className="w-full flex items-center border-b-1 border-slate-500">
            <p
              onClick={changeType}
              className={`w-1/2 py-3 text-center border-emerald-400 cursor-pointer hover:bg-slate-900 transition ${
                type === "shop"
                  ? "border-b-3 bg-slate-800 rounded-tl-md"
                  : "border-b-3 border-slate-950"
              }`}
            >
              Shop
            </p>
            <p
              onClick={changeType}
              className={`w-1/2 py-3 text-center border-emerald-400 cursor-pointer hover:bg-slate-900 transition ${
                type === "user"
                  ? "border-b-3 bg-slate-800 rounded-tr-md"
                  : "border-b-3 border-slate-950"
              }`}
            >
              User
            </p>
          </div>
        )}

        <form
          className="flex flex-col space-y-4"
          autoComplete="off"
          onSubmit={handleSubmit(handleEmailSignUp)}
        >
          {operation == "signUp" &&
            signUpFields.map((f) => {
              return (
                <InputField
                  key={f.name}
                  name={f.name}
                  label={f.label}
                  register={register}
                  errors={errors}
                  errorMessage={f.errorMessage}
                />
              );
            })}

          <Input
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            type="email"
            label="Email"
            variant="bordered"
            errorMessage={<>{errors.email?.message}</>}
            isInvalid={!!errors.email}
          />
          <Input
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
            errorMessage={<>{errors.password?.message}</>}
            isInvalid={!!errors.password}
            label="Password"
            variant="bordered"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IoIosEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Button
            type="submit"
            variant="ghost"
            color="warning"
            isDisabled={isLoading}
          >
            Sign Up
          </Button>
        </form>

        <hr />

        <Button
          variant="ghost"
          color="danger"
          isDisabled={isLoading}
          onClick={() => {
            socialSignIn("google");
          }}
        >
          Continue with Google
        </Button>
        <Button
          variant="ghost"
          color="primary"
          isDisabled={isLoading}
          onClick={() => {
            socialSignIn("facebook");
          }}
        >
          Continue with Facebook
        </Button>
        <p>
          Don&apos;t have an account ?
          <span
            className="font-bold cursor-pointer text-teal-600"
            onClick={() => {
              setOperation((state) =>
                state === "signIn" ? "signUp" : "signIn"
              );
            }}
          >
            {operation === "signIn" ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
};
