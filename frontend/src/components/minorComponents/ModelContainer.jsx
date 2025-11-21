import React, { Children } from "react";

function ModelContainer({ children, title, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99]">
      <div className="  shadow absolute bg-surface  dark:bg-surface-dark border-1 border-border-color p-[40px] rounded-[20px]  w-[500px] max-w-[90vw]">
        <span className="flex flex-row justify-between items-center ">
          <h2 className="text-xl font-semibold mb-4 ">{title}</h2>
          <button className="cursor-pointer" onClick={() => onClose()}>
            X
          </button>
        </span>
        {children}
      </div>
    </div>
  );
}

export default ModelContainer;
