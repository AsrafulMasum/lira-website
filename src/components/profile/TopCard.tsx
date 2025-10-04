"use client";

import React, { useRef } from "react";
import { toast } from "sonner";

const TopCard = () => {

  const textRef = useRef<HTMLSpanElement>(null);

  const handleCopy = () => {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      textRef.current
    ) {
      navigator.clipboard
        .writeText(textRef.current.innerText)
        .then(() => {
          toast(`Copied: ${textRef.current?.innerText}`, {
            position: "top-right",
            duration: 1000,
          });
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast("Failed to copy: ", err);
        });
    }
  };
  return (
    <div className="mt-12 bg-[#007A3914] p-2 rounded-3xl flex flex-col lg:flex-row items-center gap-2">
      <div className="w-full lg:w-[320px] flex justify-between items-center bg-[#FAFFFC] py-6 pl-8 pr-6 rounded-2xl">
        <div>
          <h4 className="text-primary text-3xl font-semibold pb-2">2,845</h4>
          <p className="flex items-center gap-1 text-gray-text text-sm font-semibold">
            Credits balance{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
            >
              <path
                d="M8.9625 14C9.225 14 9.447 13.9093 9.6285 13.7278C9.81 13.5463 9.9005 13.3245 9.9 13.0625C9.8995 12.8005 9.809 12.5785 9.6285 12.3965C9.448 12.2145 9.226 12.124 8.9625 12.125C8.699 12.126 8.47725 12.2168 8.29725 12.3973C8.11725 12.5778 8.0265 12.7995 8.025 13.0625C8.0235 13.3255 8.11425 13.5475 8.29725 13.7285C8.48025 13.9095 8.702 14 8.9625 14ZM8.2875 11.1125H9.675C9.675 10.7 9.722 10.375 9.816 10.1375C9.91 9.9 10.1755 9.575 10.6125 9.1625C10.9375 8.8375 11.1938 8.528 11.3813 8.234C11.5688 7.94 11.6625 7.587 11.6625 7.175C11.6625 6.475 11.4062 5.9375 10.8938 5.5625C10.3813 5.1875 9.775 5 9.075 5C8.3625 5 7.7845 5.1875 7.341 5.5625C6.8975 5.9375 6.588 6.3875 6.4125 6.9125L7.65 7.4C7.7125 7.175 7.85325 6.93125 8.07225 6.66875C8.29125 6.40625 8.6255 6.275 9.075 6.275C9.475 6.275 9.775 6.3845 9.975 6.6035C10.175 6.8225 10.275 7.063 10.275 7.325C10.275 7.575 10.2 7.8095 10.05 8.0285C9.9 8.2475 9.7125 8.4505 9.4875 8.6375C8.9375 9.125 8.6 9.49375 8.475 9.74375C8.35 9.99375 8.2875 10.45 8.2875 11.1125ZM9 17C7.9625 17 6.9875 16.8033 6.075 16.4098C5.1625 16.0163 4.36875 15.4818 3.69375 14.8063C3.01875 14.1308 2.4845 13.337 2.091 12.425C1.6975 11.513 1.5005 10.538 1.5 9.5C1.4995 8.462 1.6965 7.487 2.091 6.575C2.4855 5.663 3.01975 4.86925 3.69375 4.19375C4.36775 3.51825 5.1615 2.984 6.075 2.591C6.9885 2.198 7.9635 2.001 9 2C10.0365 1.999 11.0115 2.196 11.925 2.591C12.8385 2.986 13.6323 3.52025 14.3063 4.19375C14.9803 4.86725 15.5148 5.661 15.9098 6.575C16.3048 7.489 16.5015 8.464 16.5 9.5C16.4985 10.536 16.3015 11.511 15.909 12.425C15.5165 13.339 14.9823 14.1328 14.3063 14.8063C13.6303 15.4798 12.8365 16.0143 11.925 16.4098C11.0135 16.8053 10.0385 17.002 9 17ZM9 15.5C10.675 15.5 12.0938 14.9188 13.2563 13.7563C14.4187 12.5938 15 11.175 15 9.5C15 7.825 14.4187 6.40625 13.2563 5.24375C12.0938 4.08125 10.675 3.5 9 3.5C7.325 3.5 5.90625 4.08125 4.74375 5.24375C3.58125 6.40625 3 7.825 3 9.5C3 11.175 3.58125 12.5938 4.74375 13.7563C5.90625 14.9188 7.325 15.5 9 15.5Z"
                fill="#96A39C"
              />
            </svg>
          </p>
        </div>
        <button className="py-3 px-4 border border-border-color bg-bg rounded-xl text-dark-primary text-sm font-bold cursor-pointer">
          Buy credits
        </button>
      </div>

      <div className="flex-1 bg-[#FAFFFC] py-6 px-8 rounded-2xl h-full flex flex-col lg:flex-row justify-between lg:items-center gap-4 border border-primary lg:border-0">
        <div>
          <h4 className="text-dark-primary text-2xl font-semibold pb-2.5">
            Invite friends and earn rewards!
          </h4>
          <p className="text-sm text-primary font-semibold">
            Share your link and get +10 credits for every friend who joins.
          </p>
        </div>

        <button className="py-4 pl-5 pr-4 border border-border-color bg-white rounded-xl text-[#002913] text-sm font-bold flex justify-between items-center gap-5">
          <span ref={textRef}>/firas420</span>
          <div
            onClick={handleCopy}
            className="bg-bg border border-border-color size-8 flex justify-center items-center rounded-lg cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M7.5 15C7.04167 15 6.64944 14.8369 6.32333 14.5108C5.99722 14.1847 5.83389 13.7922 5.83333 13.3333V3.33332C5.83333 2.87499 5.99667 2.48277 6.32333 2.15666C6.65 1.83055 7.04222 1.66721 7.5 1.66666H15C15.4583 1.66666 15.8508 1.82999 16.1775 2.15666C16.5042 2.48332 16.6672 2.87555 16.6667 3.33332V13.3333C16.6667 13.7917 16.5036 14.1842 16.1775 14.5108C15.8514 14.8375 15.4589 15.0005 15 15H7.5ZM7.5 13.3333H15V3.33332H7.5V13.3333ZM4.16667 18.3333C3.70833 18.3333 3.31611 18.1703 2.99 17.8442C2.66389 17.518 2.50056 17.1255 2.5 16.6667V5.83332C2.5 5.59721 2.58 5.39943 2.74 5.23999C2.9 5.08055 3.09778 5.00055 3.33333 4.99999C3.56889 4.99943 3.76694 5.07943 3.9275 5.23999C4.08806 5.40055 4.16778 5.59832 4.16667 5.83332V16.6667H12.5C12.7361 16.6667 12.9342 16.7467 13.0942 16.9067C13.2542 17.0667 13.3339 17.2644 13.3333 17.5C13.3328 17.7355 13.2528 17.9336 13.0933 18.0942C12.9339 18.2547 12.7361 18.3344 12.5 18.3333H4.16667Z"
                fill="#004721"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TopCard;
