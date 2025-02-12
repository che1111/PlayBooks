import React from "react";

function RadioOptions({ options, handleSelect, selectedId }) {
  return (
    <div className="flex items-center mt-2 overflow-hidden w-fit">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={(e) => handleSelect(option)}
          className={`${
            selectedId === option.id
              ? "!bg-white !text-blue-500 border-blue-500"
              : "text-gray-500 bg-gray-50 border-gray-200"
          } p-2 text-sm hover:bg-gray-100 cursor-pointer transition-all rounded border`}>
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default RadioOptions;
