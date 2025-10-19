import AllPastContests from "@/components/profile/pastContests/AllPastContests";
import { apiRequest } from "@/helpers/apiRequest";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

const page = async () => {
  const pastContestsRes = await apiRequest(
    `/orders/past-orders?limit=3&page=${page}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const { data: pastAnalytics } = await apiRequest(
    `/orders/past-order-analysis`,
    {
      method: "GET",
    }
  );

  const statsData = [
    { value: pastAnalytics?.totalEntries, label: "Entries" },
    {
      value: pastAnalytics?.totalContest,
      label: "Contests",
      value2: pastAnalytics?.totalWon,
      label2: "Won",
    },
    {
      value: `$ ${pastAnalytics?.totalWin}`,
      label: "Earnings",
    },
  ];

  console.log(pastContestsRes?.data);
  const contestDataForViewAll = [
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

  return (
    <section>
      <ContainerLayout>
        <AllPastContests
          statsData={statsData}
          allPastContests={pastContestsRes?.data}
        />
      </ContainerLayout>
    </section>
  );
};

export default page;
