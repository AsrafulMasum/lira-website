"use client";

import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial values from URL params (if any)
  const initialQuery = searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter") || "New";

  const [query, setQuery] = useState(initialQuery);
  const [selected, setSelected] = useState(initialFilter);

  // Update URL when search or filter changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (query) params.set("q", query);
    else params.delete("q");

    if (selected) params.set("filter", selected);
    else params.delete("filter");

    router.replace(`?${params.toString()}`);
  }, [query, selected, router, searchParams]);

  return (
    <div className="flex items-center gap-2 w-full max-w-2xl mx-auto mt-5">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 bg-background border-input rounded-xl shadow-none focus:ring-0"
        />
      </div>

      {/* Dropdown Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-12 w-28 gap-4 font-medium bg-background rounded-xl shadow-none hover:bg-white cursor-pointer"
          >
            {selected}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => setSelected("New")}>
            New
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelected("Trending")}>
            Trending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchFilter;
