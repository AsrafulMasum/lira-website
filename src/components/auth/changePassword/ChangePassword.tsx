"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import logo from "@/assets/logo.svg";
import { toast } from "sonner";
import { apiRequest } from "@/helpers/apiRequest";

const ChangePassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const redirect = useSearchParams().get("redirect");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Resetting password...", {
      id: "reset",
    });
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const payload = {
      newPassword: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    try {
      const res = await apiRequest("/auth/reset-password", {
        method: "POST",
        body: payload,
        token: `${token}`,
      });
      
      if (res?.success) {
        toast.success("Password reset successful", { id: "reset" });
        router.push(redirect || "/");
      } else {
        toast.error(res?.message, { id: "reset" });
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div
      className={cn(
        "max-h-screen flex items-center justify-center overflow-hidden"
      )}
    >
      <div className="lg:w-1/2 h-screen w-full p-6">
        <div className="h-full flex justify-center items-center rounded-xl">
          <Card className="py-16 w-full bg-transparent xl:px-[100px] shadow-none border-none">
            <CardHeader className="text-center">
              <figure className="flex justify-center mb-7">
                <Image src={logo} alt="logo" height={85} />
              </figure>
              <CardTitle className="text-2xl">Set a new password</CardTitle>
              <CardDescription className="py-4 text-[#5C5C5C]">
                Create a new password. Ensure it differs from <br /> previous
                ones for security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    {/* password */}
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={`${isPasswordVisible ? "text" : "password"}`}
                          placeholder="Enter password"
                          required
                          className="bg-white shadow-none h-10"
                        />
                        <span
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                          className="text-slate-400 absolute right-5 top-1.5 cursor-pointer"
                        >
                          {!isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                        </span>
                      </div>
                    </div>

                    {/* confirmPassword */}
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                      </div>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={`${
                            isConfirmPasswordVisible ? "text" : "password"
                          }`}
                          placeholder="Enter password"
                          required
                          className="bg-white shadow-none h-10"
                        />
                        <span
                          onClick={() =>
                            setIsConfirmPasswordVisible(
                              !isConfirmPasswordVisible
                            )
                          }
                          className="text-slate-400 absolute right-5 top-1.5 cursor-pointer"
                        >
                          {!isConfirmPasswordVisible ? (
                            <EyeOffIcon />
                          ) : (
                            <EyeIcon />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* submit button */}
                    <Button type="submit" className="w-full mt-5 h-10">
                      Change Password
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
