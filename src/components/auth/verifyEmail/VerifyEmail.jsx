"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Logging in...", {
      id: "login",
    });
    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(payload);

    try {
      //! perform your api call here..

      toast.success("Login successful", { id: "login" });
      router.push(`/change-password?email=${encodeURIComponent(email)}`);
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
      <div className="w-full lg:w-1/2 h-screen p-6">
        <div
          className="h-full flex justify-center items-center rounded-xl"
        >
          <Card className="py-16 bg-transparent xl:px-[100px] shadow-none border-none">
            <CardHeader className="text-center mb-10">
              <figure className="flex justify-center mb-7">
                <Image src={logo} alt="logo" height={85} />
              </figure>
              <CardTitle className="text-2xl">Verification code</CardTitle>
              <CardDescription className="pt-4 text-[#5C5C5C]">
                We sent a reset link to {email} enter 5 digit code that is
                mentioned in the email
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-6">
                    <div className="flex flex-col items-center justify-center gap-1 mb-10">
                      <InputOTP
                        maxLength={5}
                        pattern={REGEXP_ONLY_DIGITS}
                        //   {...field}
                      >
                        <InputOTPGroup className="w-full justify-center gap-2 md:gap-6">
                          <InputOTPSlot
                            className={`shadow-none border w-[55px] h-[50px] rounded-md`}
                            style={{
                              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                            }}
                            index={0}
                          />
                          <InputOTPSlot
                            className={`shadow-none border w-[55px] h-[50px] rounded-md`}
                            style={{
                              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                            }}
                            index={1}
                          />
                          <InputOTPSlot
                            className={`shadow-none border w-[55px] h-[50px] rounded-md`}
                            style={{
                              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                            }}
                            index={2}
                          />
                          <InputOTPSlot
                            className={`shadow-none border w-[55px] h-[50px] rounded-md`}
                            style={{
                              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                            }}
                            index={3}
                          />
                          <InputOTPSlot
                            className={`shadow-none border w-[55px] h-[50px] rounded-md`}
                            style={{
                              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                            }}
                            index={4}
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    {/* submit button */}
                    <Button type="submit" className="w-full h-10">
                      Verify Code
                    </Button>
                  </div>

                  {/* resend otp */}
                  <div className="text-center text-sm mt-10">
                    You have not received the email?{" "}
                    <Link
                      href="#"
                      className="font-medium text-primary hover:underline underline-offset-4"
                    >
                      Resend
                    </Link>
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

export default VerifyEmail;
