import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col mt-5 ml-1 w-[190px] h-10 bg-slate-200 px-2 py-2">
      <p className="font-semibold text-black text-md">Search Graduates</p>
      <input
        type="text"
        placeholder="Name,keywords,techstacks"
        className="w-[190px] rounded-lg border-none focus:ring-0 shadow-md px-9 py-2 mt-3 -ml-1"
      />
      <button
        type="search"
        className="rounded-lg w-[190px] bg-blue-700 p-2 -ml-2"
      >
        Search
      </button>
    </div>
  );
};

export default Sidebar;
