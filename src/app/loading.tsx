"use client"

export default function Loading() {
  return (
    <div className="max-h-[calc(100vh-64px)] h-[calc(100vh-64px)] bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-border rounded-full animate-spin border-t-primary"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-accent"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground animate-pulse">Loading...</h2>
          <p className="text-muted-foreground text-sm">Please wait a moment</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full animate-pulse"
            style={{
              animation: "loading-progress 2s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}
