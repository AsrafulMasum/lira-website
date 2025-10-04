"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const SearchFilter = () => {
  return (
    <div className="flex items-center gap-2 w-full max-w-2xl mx-auto mt-5">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input type="text" placeholder="Search" className="pl-10 h-12 bg-background border-input rounded-xl shadow-none focus:ring-0" />
      </div>

      {/* New Dropdown Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-12 w-24 gap-4 font-medium bg-background rounded-xl shadow-none hover:bg-white cursor-pointer">
            New
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>New</DropdownMenuItem>
          <DropdownMenuItem>Popular</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SearchFilter
