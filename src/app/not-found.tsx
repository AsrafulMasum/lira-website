"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-h-[calc(100vh-64px)] h-[calc(100vh-64px)] bg-bg flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 text-center space-y-8 border-0 shadow-none">
        {/* Large 404 Number */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-primary animate-pulse">404</h1>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground text-balance">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Don't
            worry, let's get you back on track!
          </p>
        </div>

        {/* Illustration Placeholder */}
        <div>
          <div className="w-48 h-48 mx-auto bg-secondary/20 rounded-full flex items-center justify-center">
            <Search className="w-24 h-24 text-muted-foreground" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="min-w-[160px]">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[160px] bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            <Link href="" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
