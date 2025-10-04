import React from "react";
import Card from "./Card";

const Ideas = () => {
  return (
    <div className="space-y-4 pt-5 pb-10">
      {[0, 1, 2, 3].map((item) => (
        <Card key={item} />
      ))}
    </div>
  );
};

export default Ideas;
