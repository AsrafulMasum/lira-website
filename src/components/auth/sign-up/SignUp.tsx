"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logo from "@/assets/logo.svg";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { apiRequest } from "@/helpers/apiRequest";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [selectedState, setSelectedState] = useState("");
  const router = useRouter();
  const redirect = "/verify-email";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Singing up...", {
      id: "signUp",
    });
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const terms = formData.get("terms");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const payload = {
      name: formData.get("userName"),
      email: formData.get("email"),
      password,
      agreeWithTerms: terms === "on" ? true : false,
      referralCode: formData.get("referralCode"),
      state: selectedState,
    };

    try {
      const res = await apiRequest("/users/register", {
        method: "POST",
        body: payload,
      });
      if (res?.success) {
        toast.success("Sign up successful", { id: "signUp" });
        const params = new URLSearchParams({
          from: "register",
          email: typeof payload.email === "string" ? payload.email : "",
        });
        router.push(`${redirect}?${params.toString()}`);
      } else {
        toast.error(res?.message, { id: "signUp" });
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      toast.error("Sign up failed", { id: "signUp" });
    }
  };

  return (
    <div
      className={cn(
        "max-h-screen flex items-center justify-center lg:overflow-hidden"
      )}
    >
      <div className="w-full lg:w-1/2 min-h-screen p-6">
        <Card className="h-full py-10 xl:px-[100px] shadow-none border-none">
          <CardHeader className="text-center">
            <figure className="flex justify-center mb-7">
              <Image src={logo} alt="logo" height={65} />
            </figure>
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription className="py-4 text-[#5C5C5C]">
              Please fill-up your account information
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-6">
                  {/* userName */}
                  <div className="grid gap-2">
                    <Label htmlFor="userName">User Name</Label>
                    <Input
                      id="userName"
                      name="userName"
                      type="text"
                      placeholder="Md. Atik"
                      required
                      className="bg-white shadow-none h-10"
                    />
                  </div>

                  {/* email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="me@example.com"
                      required
                      className="bg-white shadow-none h-10"
                    />
                  </div>

                  {/* passwords */}
                  <div className="flex justify-center items-center gap-4">
                    {/* password */}
                    <div className="grid gap-2 w-1/2">
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
                    <div className="grid gap-2 w-1/2">
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
                  </div>

                  {/* referral code & states */}
                  <div className="flex justify-center items-center gap-4">
                    {/* referral code */}
                    <div className="grid gap-2 w-1/2">
                      <Label htmlFor="referralCode">Referral Code</Label>
                      <Input
                        id="referralCode"
                        name="referralCode"
                        type="text"
                        placeholder="SAND868617"
                        className="bg-white shadow-none h-9 w-full"
                      />
                    </div>

                    {/* States */}
                    <div className="grid gap-2 w-1/2">
                      <Label htmlFor="state">State</Label>
                      <Select
                        value={selectedState}
                        onValueChange={setSelectedState}
                        required
                      >
                        <SelectTrigger className="bg-white shadow-none h-10 w-full">
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {US_STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* remember checkbox */}
                  <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        required
                        name="terms"
                        id="terms"
                        className="size-5 border-primary"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree with terms of service and privacy policy
                      </label>
                    </div>
                  </div>

                  {/* submit button */}
                  <Button type="submit" className="w-full mt-4 h-10">
                    Sign Up
                  </Button>
                </div>

                {/* social button */}
                <div className="flex justify-center items-center gap-4 md:mt-10">
                  <Button
                    className="bg-transparent hover:bg-transparent h-10 px-5 shadow-none"
                    style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)" }}
                  >
                    <FcGoogle />
                    <span className="text-[#606060]">Continue with Google</span>
                  </Button>
                </div>

                <div className="flex justify-center items-center gap-3">
                  <Separator className={`!w-[145px]`} />
                  <p>OR</p>
                  <Separator className={`!w-[145px]`} />
                </div>

                {/* link to sign up */}
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary hover:underline underline-offset-4"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
