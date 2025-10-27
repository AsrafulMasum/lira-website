import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

const contestData = [
  {
    id: 1,
    title: "Predict the BTC price on July 1 at 9:00 PM",
    prize: "Win a Rolex Daytona",
    prizePool: "$2,845.50",
    entries: 8,
    timeLeft: "2d 3h 20m",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
  },
  {
    id: 2,
    title: "Predict the BTC price on July 1 at 9:00 PM",
    prize: "Win a Rolex Daytona",
    prizePool: "$2,845.50",
    entries: 8,
    timeLeft: "2d 3h 20m",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
  },
  {
    id: 3,
    title: "Predict the BTC price on July 1 at 9:00 PM",
    prize: "Win a Rolex Daytona",
    prizePool: "$2,845.50",
    entries: 8,
    timeLeft: "2d 3h 20m",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
  },
  {
    id: 4,
    title: "Predict the BTC price on July 1 at 9:00 PM",
    prize: "Win a Rolex Daytona",
    prizePool: "$2,845.50",
    entries: 8,
    timeLeft: "2d 3h 20m",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
  },
  {
    id: 5,
    title: "Predict the BTC price on July 1 at 9:00 PM",
    prize: "Win a Rolex Daytona",
    prizePool: "$2,845.50",
    entries: 8,
    timeLeft: "2d 3h 20m",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
  },
  {
    id: 6,
    title: "Predict the BTC price on July 1 at 9:00 PM",
    prize: "Win a Rolex Daytona",
    prizePool: "$2,845.50",
    entries: 8,
    timeLeft: "2d 3h 20m",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
  },
  {
    id: 7,
    title: "Predict the BTC price on July 1 at 9:00 PM",
    prize: "Win a Rolex Daytona",
    prizePool: "$2,845.50",
    entries: 8,
    timeLeft: "2d 3h 20m",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
  },
  {
    id: 8,
    title: "Predict the BTC price on July 1 at 9:00 PM",
    prize: "Win a Rolex Daytona",
    prizePool: "$2,845.50",
    entries: 8,
    timeLeft: "2d 3h 20m",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
  },
];

const Pagination = ({ meta }: any) => {
  const page = meta?.page;
  const updateSearchParams = useUpdateSearchParams();
  const itemsPerPage = 3;

  // Calculate indexes
  const indexOfLast = page * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const totalPages = meta?.totalPage;

  return (
    <div className="flex items-center justify-between px-6">
      <div className="text-sm text-gray-500 !w-60">
        <p className="flex gap-0.5">
          <span className="hidden lg:block">Showing </span> {indexOfFirst + 1}{" "}
          to{" "}
          {indexOfLast > contestData.length ? contestData.length : indexOfLast}{" "}
          of {contestData.length}{" "}
          <span className="hidden lg:block">contests</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400"
          onClick={() =>
            updateSearchParams({
              page: page > 1 ? `${page - 1}` : page,
            })
          }
          disabled={page === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {Array.from({ length: totalPages }, (_, idx) => (
          <Button
            key={idx + 1}
            size="sm"
            className={`${
              page === idx + 1
                ? "bg-dark-primary text-white hover:bg-primary cursor-pointer"
                : "bg-white text-gray-600 border hover:text-white hover:bg-primary cursor-pointer"
            }`}
            onClick={() => updateSearchParams({ page: `${idx + 1}` })}
          >
            {idx + 1}
          </Button>
        ))}

        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400"
          onClick={() =>
            updateSearchParams({
              page: page < totalPages ? `${page + 1}` : page,
            })
          }
          disabled={page === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
