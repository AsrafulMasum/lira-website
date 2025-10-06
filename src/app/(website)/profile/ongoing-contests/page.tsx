import AllOngoingContests from "@/components/profile/ongoingContests/AllOngoingContests";
import { OngoingContests } from "@/components/profile/ongoingContests/OngoingContests";
import { apiRequest } from "@/helpers/apiRequest";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

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

const page = async () => {
  const ongoingContestsRes = await apiRequest(
    `/orders/my-orders?limit=3&page=${page}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const { data: ongoingAnalytics } = await apiRequest(`/orders/analysis`, {
    method: "GET",
  });

  return (
    <section>
      <ContainerLayout>
        <AllOngoingContests
          meta={ongoingContestsRes?.meta}
          contestData={ongoingContestsRes?.data}
          ongoingAnalytics={ongoingAnalytics}
        />
      </ContainerLayout>
    </section>
  );
};

export default page;
