
import { SearchIcon } from "@heroicons/react/outline";

const Search = () => {
    return (
      <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
        <div className="sticky top-0 py-1.5 bg-white z-50 w-11/12 xl:w-9/12">
          <div className="flex items-center bg-gray-200 p-3 rounded-full relative">
            <SearchIcon className="text-gray-800 h-5 z-50" />
            <input
              type="text"
              className="bg-transparent placeholder-gray-800 outline-none mt-2 text-black absolute inset-0 pl-11 border border-transparent w-full focus:outline-none rounded-full focus:shadow-lg"
              placeholder="Search on Trailblaze"
            />
          </div>
        </div>
  
        <div className="text-black space-y-3 bg-gray-100 pt-2 rounded-xl w-11/12 xl:w-9/12">
          <h4 className="font-bold text-xl px-4">Who to follow</h4>
          <div
            className="hover:bg-gray-200 px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
          >
            <img
              src="https://avatars.githubusercontent.com/u/128723799?v=4"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold group-hover:underline">
                Guillem
              </h4>
              <h5 className="text-gray-800 text-[15px]">
              </h5>
            </div>
          </div>
  
          <button className="hover:bg-gray-200 px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-gray-800 font-light">
            Show more
          </button>
        </div>
      </div>
    )
  }
  
  export default Search;