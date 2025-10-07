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
import logo from "@/assets/logo.svg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { apiRequest } from "@/helpers/apiRequest";
import Cookies from "js-cookie";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const from = searchParams.get("from");

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 4) {
      toast.error("Please enter 4 digit code");
      return;
    }

    toast.loading("Verifying code...", { id: "verify" });

    try {
      const payload = {
        email,
        oneTimeCode: Number(otp),
      };

      const res = await apiRequest("/auth/verify-email", {
        method: "POST",
        body: payload,
      });
      if (res?.success) {
        toast.success("Verification successful", { id: "verify" });
        Cookies.set("accessToken", res?.data?.accessToken);
        router.push(
          from === "register"
            ? "/"
            : `/change-password?token=${encodeURIComponent(
                res?.data?.verifyToken
              )}`
        );
      } else {
        toast.error(res?.message, { id: "verify" });
      }
    } catch (error) {
      toast.error("Verification failed", { id: "verify" });
      console.error("Error verifying email:", error);
    }
  };

  const handleResend = async () => {
    toast.loading("Sending code...", { id: "resend-code" });
    try {
      const res = await apiRequest("/auth/resend-otp", {
        method: "POST",
        body: { email },
      });
      if (res?.success) {
        toast.success("Code sent successfully", { id: "resend-code" });
      } else {
        toast.error(res?.message || "Failed to send code", {
          id: "resend-code",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={cn(
        "max-h-screen flex items-center justify-center overflow-hidden"
      )}
    >
      <div className="w-full lg:w-1/2 h-screen p-6">
        <div className="h-full flex justify-center items-center rounded-xl">
          <Card className="py-16 bg-transparent xl:px-[100px] shadow-none border-none">
            <CardHeader className="text-center mb-10">
              <figure className="flex justify-center mb-7">
                <Image src={logo} alt="logo" height={85} />
              </figure>
              <CardTitle className="text-2xl">Verification code</CardTitle>
              <CardDescription className="pt-4 text-[#5C5C5C]">
                We sent an email to {email}. Please enter the 4 digit code that
                is mentioned in the email.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="flex flex-col items-center justify-center gap-1 mb-10">
                    <InputOTP
                      maxLength={4}
                      pattern={REGEXP_ONLY_DIGITS}
                      value={otp}
                      onChange={setOtp}
                    >
                      <InputOTPGroup className="w-full justify-center gap-2 md:gap-6">
                        {[0, 1, 2, 3].map((i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="shadow-none border w-[55px] h-[50px] rounded-md"
                            style={{
                              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                            }}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <Button type="submit" className="w-full h-10">
                    Verify Code
                  </Button>
                </div>
              </form>

              <div className="text-center text-sm mt-10">
                You have not received the email?{" "}
                <button
                  onClick={handleResend}
                  className="font-medium text-primary hover:underline underline-offset-4 cursor-pointer"
                >
                  Resend
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
