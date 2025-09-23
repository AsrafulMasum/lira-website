import React, { useState } from "react";
import { OngoingContests } from "./OngoingContests";

const MyContests = () => {
  return (
    <section className="mt-6 grid grid-cols-3 gap-6">
      <div className="col-span-2 bg-bg rounded-3xl p-2">
        <OngoingContests viewAll={false} />
      </div>
      <div className="col-span-1 bg-bg rounded-3xl p-2">Past</div>
    </section>
  );
};

export default MyContests;
