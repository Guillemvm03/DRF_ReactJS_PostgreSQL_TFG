import { SearchIcon } from "@heroicons/react/outline";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [page, setPage] = useState(1);
  const { searchUsers } = useAuth();
  const nav = useNavigate();

  const handleInputChange = useCallback((event) => {
    setSearch(event.target.value);
    setPage(1);
    setResults([]);
    setNextPage(null);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { users, nextPage } = await searchUsers(search, page);
        setResults(users);  
        setNextPage(nextPage); 
      } catch (error) {
        console.error("Error during user search:", error);
        setResults([]);
        setNextPage(null);
      }
    };

    fetchUsers();
  }, [search, page, searchUsers]); 

  const loadMoreUsers = async () => {
    if (nextPage) {
      try {
        const newPage = page + 1;
        const { users, nextPage: newNextPage } = await searchUsers(search, newPage);
        setResults(prevResults => [...prevResults, ...users]);
        setNextPage(newNextPage);
        setPage(newPage); 
      } catch (error) {
        console.error("Error loading more users:", error);
      }
    }
  };

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="sticky top-0 py-1.5 bg-white z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-gray-200 p-3 rounded-full relative">
          <SearchIcon className="text-gray-800 h-5 z-50" />
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            className="bg-transparent placeholder-gray-800 outline-none mt-2 text-black absolute inset-0 pl-11 border border-transparent w-full focus:outline-none rounded-full focus:shadow-lg"
            placeholder="Search on Trailblaze"
          />
        </div>
      </div>
      <div className="text-black space-y-3 bg-gray-100 pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-xl px-4">Results</h4>
        {results.length > 0 ? (
          results.map(user => (
            <div key={user.id} 
                 className="hover:bg-gray-200 px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
                 onClick={() => nav(`/explore/${user.username}`)}>
              <img
                src={user.avatar || "https://via.placeholder.com/50"}
                alt={user.username}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4 leading-5 group">
                <h4 className="font-bold group-hover:underline">{user.username}</h4>
                <h5 className="text-gray-800 text-[15px]">{user.email}</h5>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 px-4">No users found.</p>
        )}
        {nextPage && (
          <button onClick={loadMoreUsers} className="hover:bg-gray-200 px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-gray-800 font-light">
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
