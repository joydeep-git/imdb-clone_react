import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../utils/api';
import { Context } from '../context/contextApi';
import LeftNav from './LeftNav';
import { v4 as uuidv4 } from 'uuid';
import SearchResultVideoCard from './SearchResultVideoCard';

function SearchResult() {

  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    fetchSearchResults();
    document.getElementById("root").classList.remove("custom-h");
  }, [ searchQuery ])

  const fetchSearchResults = () => {
    setLoading(true);

    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      setLoading(false);
      console.log(res);
      setResult(res?.contents);
    })
  }

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-[#0f0f0f]">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item) => {
            if (item?.type !== "video") return false;
            let video = item.video;
            return (
              <SearchResultVideoCard
                key={uuidv4()}
                video={video}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchResult;