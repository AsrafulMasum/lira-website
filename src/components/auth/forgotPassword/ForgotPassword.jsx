"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.svg";
import { toast } from "sonner";
import { apiRequest } from "@/helpers/apiRequest";

const ForgotPassword = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Sending code...", {
      id: "send-code",
    });
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    try {
      const res = await apiRequest("/auth/forget-password", {
        method: "POST",
        body: { email },
      });

      if (res?.success) {
        toast.success("Code sent to your email.", { id: "send-code" });
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      toast.error("Something went wrong. Please try again.");
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
          <Card className="py-16 w-full bg-transparent xl:px-[100px] shadow-none border-none">
            <CardHeader className="text-center">
              <figure className="flex justify-center mb-7">
                <Image src={logo} alt="logo" height={85} />
              </figure>
              <CardTitle className="text-2xl whitespace-nowrap">
                Forgot password ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
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

                    {/* submit button */}
                    <Button type="submit" className="w-full mt-5 h-10">
                      Send Code
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

export default ForgotPassword;
