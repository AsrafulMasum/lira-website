"use client";
import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";

interface SelectedItem {
  _id: string;
  price: number;
  value: number;
}

const SelectedValueSheet = ({
  selectedItems,
  customValue,
}: {
  selectedItems: SelectedItem[];
  customValue: string | undefined;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [items, setItems] = React.useState<SelectedItem[]>(selectedItems);
  const [customValues, setCustomValues] = React.useState<number[]>([]);

  // ✅ Convert "522,455" → [522, 455]
  React.useEffect(() => {
    if (customValue) {
      const parsed = customValue
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v !== "")
        .map((v) => Number(v));
      setCustomValues(parsed);
    } else {
      setCustomValues([]);
    }
  }, [customValue]);

  React.useEffect(() => {
    setItems(selectedItems);
  }, [selectedItems]);

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAll = () => {
    setItems([]);
    setCustomValues([]);
  };

  return (
    <SheetContent
      className="w-full h-[75%] lg:h-full sm:max-w-md px-6 rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl pt-10 bg-[#FAFFFC] flex flex-col overflow-y-auto scrollbar-hide"
      side={isMobile ? "bottom" : "right"}
    >
      <SheetHeader className="space-y-0 p-0 pb-6">
        <SheetTitle className="text-2xl font-semibold text-[#002913]">
          Your list
        </SheetTitle>
      </SheetHeader>

      {/* ✅ Items List */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-6 scrollbar-hide">
        {/* Selected Items */}
        {items.length > 0 &&
          items.map((item, index) => (
            <div
              key={item._id || index}
              className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3"
            >
              <span className="text-dark-primary font-medium">
                {item.value}
              </span>
              <button onClick={() => removeItem(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM14.3 14.3C14.2075 14.3927 14.0976 14.4663 13.9766 14.5164C13.8557 14.5666 13.726 14.5924 13.595 14.5924C13.464 14.5924 13.3343 14.5666 13.2134 14.5164C13.0924 14.4663 12.9825 14.3927 12.89 14.3L10 11.41L7.11 14.3C6.92302 14.487 6.66943 14.592 6.405 14.592C6.14057 14.592 5.88698 14.487 5.7 14.3C5.51302 14.113 5.40798 13.8594 5.40798 13.595C5.40798 13.4641 5.43377 13.3344 5.48387 13.2135C5.53398 13.0925 5.60742 12.9826 5.7 12.89L8.59 10L5.7 7.11C5.51302 6.92302 5.40798 6.66943 5.40798 6.405C5.40798 6.14057 5.51302 5.88698 5.7 5.7C5.88698 5.51302 6.14057 5.40798 6.405 5.40798C6.66943 5.40798 6.92302 5.51302 7.11 5.7L10 8.59L12.89 5.7C12.9826 5.60742 13.0925 5.53398 13.2135 5.48387C13.3344 5.43377 13.4641 5.40798 13.595 5.40798C13.7259 5.40798 13.8556 5.43377 13.9765 5.48387C14.0975 5.53398 14.2074 5.60742 14.3 5.7C14.3926 5.79258 14.466 5.90249 14.5161 6.02346C14.5662 6.14442 14.592 6.27407 14.592 6.405C14.592 6.53593 14.5662 6.66558 14.5161 6.78654C14.466 6.90751 14.3926 7.01742 14.3 7.11L11.41 10L14.3 12.89C14.68 13.27 14.68 13.91 14.3 14.3Z"
                    fill="#004721"
                  />
                </svg>
              </button>
            </div>
          ))}

        {/* Custom Values */}
        {customValues.length > 0 &&
          customValues.map((val, index) => (
            <div
              key={`custom-${index}`}
              className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3"
            >
              <span className="text-dark-primary font-medium">{val}</span>
              <span className="text-sm text-gray-500">(Custom)</span>
            </div>
          ))}

        {items.length === 0 && customValues.length === 0 && (
          <p className="text-gray-500 text-center py-8">No items selected</p>
        )}
      </div>

      {/* ✅ Summary Section */}
      <div
        className="bg-white p-2 rounded-2xl mb-6"
        style={{ boxShadow: "0 0 48px 0 rgba(45, 51, 48, 0.20)" }}
      >
        <div className="flex items-center justify-between pl-4">
          <div className="flex items-center gap-2">
            <span className="text-dark-primary text-lg font-semibold">
              {items.length + customValues.length}
            </span>
            <button onClick={handleRemoveAll}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM12.225 12.225C12.1556 12.2945 12.0732 12.3497 11.9825 12.3873C11.8917 12.425 11.7945 12.4443 11.6962 12.4443C11.598 12.4443 11.5008 12.425 11.41 12.3873C11.3193 12.3497 11.2369 12.2945 11.1675 12.225L9 10.0575L6.8325 12.225C6.69227 12.3652 6.50207 12.444 6.30375 12.444C6.10543 12.444 5.91523 12.3652 5.775 12.225C5.63477 12.0848 5.55598 11.8946 5.55598 11.6962C5.55598 11.5981 5.57533 11.5008 5.6129 11.4101C5.65048 11.3194 5.70556 11.2369 5.775 11.1675L7.9425 9L5.775 6.8325C5.63477 6.69227 5.55598 6.50207 5.55598 6.30375C5.55598 6.10543 5.63477 5.91523 5.775 5.775C5.91523 5.63477 6.10543 5.55598 6.30375 5.55598C6.50207 5.55598 6.69227 5.63477 6.8325 5.775L9 7.9425L11.1675 5.775C11.2369 5.70556 11.3194 5.65048 11.4101 5.6129C11.5008 5.57533 11.5981 5.55598 11.6962 5.55598C11.7944 5.55598 11.8917 5.57533 11.9824 5.6129C12.0731 5.65048 12.1556 5.70556 12.225 5.775C12.2944 5.84444 12.3495 5.92687 12.3871 6.01759C12.4247 6.10832 12.444 6.20555 12.444 6.30375C12.444 6.40195 12.4247 6.49918 12.3871 6.58991C12.3495 6.68063 12.2944 6.76306 12.225 6.8325L10.0575 9L12.225 11.1675C12.51 11.4525 12.51 11.9325 12.225 12.225Z"
                  fill="#717A75"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-primary font-semibold text-lg pr-4">
              {/* Total of selected item prices only */}
              {items.reduce((acc, cur) => acc + cur.price, 0)}
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  );
};

export default SelectedValueSheet;
