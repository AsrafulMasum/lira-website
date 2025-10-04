

import { Share2, ThumbsDown, ThumbsUp, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Card() {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border bg-card p-6 shadow-sm">
      {/* Header with avatar and user info */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
          F
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">Firas128</span>
          <span className="text-muted-foreground">1h</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="mb-3 text-xl font-semibold leading-tight">Predict the Bitcoin price on New Year's eve.</h2>

      {/* Engagement metrics */}
      <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <ThumbsUp className="h-4 w-4" />
          <span>134</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MessageSquare className="h-4 w-4 " />
          <span>52</span>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm text-muted-foreground">
        I'm really excited about BTC hitting the moon on New Year's Eve!
      </p>

      {/* Action bar */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
            <Share2 className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
            <ThumbsDown className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-white hover:text-white bg-primary hover:bg-primary/90 cursor-pointer"
          >
            <ThumbsUp className="size-4 fill-current" />
          </Button>
        </div>
        <Button className="bg-primary hover:bg-primary/90 cursor-pointer">Live now</Button>
      </div>
    </div>
  )
}
