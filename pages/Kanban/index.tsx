"use client";
import Search from "@/components/Search";
import { useState } from "react";

const Kanban = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div className="flex flex-col bg-gray-400 p-8 sm:p-24 sm:pt-8 w-full min-h-full">
      <div className="flex flex-row justify-end w-full">
        <div className="flex w-[60%]">
          <Search setSearch={setSearch} search={search} />
        </div>
        <button className="bg-indigo-600 px-6 min-w-[120px] h-[45px] rounded-full ml-6 sm:ml-10">
          Add New
        </button>
      </div>
    </div>
  );
};

export default Kanban;
