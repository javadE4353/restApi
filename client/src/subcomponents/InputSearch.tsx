import { useState } from "react";

//module external
import { HiMagnifyingGlass } from "react-icons/hi2";

//component
const InputSearch = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="ml-2 hidden md:block">
      <form className="flex items-center">
        {/* <button
          type="submit"
          className="p-2.5 ml-2 hidden md:block text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={()=>setOpen(true)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">سرچ</span>
        </button> */}
        <label form="simple-search" className="sr-only">
          سرچ
        </label>
        <div className={`relative w-full transition-all`}>
          <input
            type="text"
            id="simple-search"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition ease-in-out ${
              open ? "w-full" : "w-0"
            } duration-700`}
            placeholder="جستجو"
            required
            onFocus={() => setOpen(!open)}
            onBlur={() => setOpen(!open)}
          />
        </div>
      </form>
    </div>
  );
};

export default InputSearch;
