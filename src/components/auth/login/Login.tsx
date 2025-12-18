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
import { useEffect, useState } from "react";
import logo from "@/assets/logo.svg";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { apiRequest } from "@/helpers/apiRequest";
import Cookies from "js-cookie";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  // Load saved data on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      if (auth?.email && auth?.password) {
        setEmail(auth.email);
        setPassword(auth.password);
        setRemember(true);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Logging in...", { id: "login" });

    const payload = { email, password };

    try {
      const res = await apiRequest("/auth/login", {
        method: "POST",
        body: payload,
      });

      if (res?.success) {
        if (remember) {
          localStorage.setItem("auth", JSON.stringify(payload));
        } else {
          localStorage.removeItem("auth");
        }
        toast.success("Login successful", { id: "login" });
        Cookies.set("accessToken", res?.data?.accessToken);
        Cookies.set("refreshToken", res?.data?.refreshToken);
        router.push("/");
      } else {
        toast.error(res?.message, { id: "login" });
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleGoogle = async () => {
    router.push(`https://www.api.liramarkets.com/api/v1/auth/google`);
  };

  return (
    <div className={cn("flex items-center justify-center overflow-hidden")}>
      <div className="w-full lg:w-1/2 min-h-screen md:p-6">
        <Card className="h-full xl:py-16 xl:px-[100px] shadow-none border-none">
          <CardHeader className="text-center">
            <figure className="flex justify-center mb-7">
              <Image priority src={logo} alt="logo" height={85} />
            </figure>
            <CardTitle className="text-2xl">Log in to your account</CardTitle>
            <CardDescription className="py-6 text-[#5C5C5C]">
              Please enter your email and password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white shadow-none h-10"
                  />
                </div>

                {/* password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white shadow-none h-10"
                    />
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="text-slate-400 absolute right-5 top-1.5 cursor-pointer"
                    >
                      {!isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </div>

                {/* remember checkbox */}
                <div className="flex justify-between gap-2 items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      name="remember"
                      checked={remember}
                      onCheckedChange={(val) =>
                        setRemember(val === "indeterminate" ? false : val)
                      }
                      className="size-5 border-primary"
                    />
                    <label
                      htmlFor="remember"
                      className="text-xs md:text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-nowrap"
                    >
                      Remember Password
                    </label>
                  </div>
                  <Link
                    href="forgot-password"
                    className="text-xs md:text-sm text-[#FF4040] font-medium underline-offset-4 hover:underline text-nowrap"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* submit button */}
                <Button
                  type="submit"
                  className="w-full mt-5 h-10 cursor-pointer"
                >
                  Log In
                </Button>
              </div>
            </form>
            {/* social buttons */}
            <div className="flex justify-center items-center gap-4 mt-4 md:mt-10">
              <Button
                onClick={handleGoogle}
                className="bg-transparent hover:bg-transparent h-12 !px-10 shadow-none cursor-pointer border"
                style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)" }}
              >
                <FcGoogle />
                <span className="text-[#606060]">Continue with Google</span>
              </Button>
            </div>

            <div className="flex justify-center items-center gap-3 mt-4 md:mt-10 mb-4">
              <Separator className="!w-[145px]" />
              <p>OR</p>
              <Separator className="!w-[145px]" />
            </div>

            {/* link to sign up */}
            <div className="text-center text-sm">
              Don&apos;t have any account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
