import React, { useContext, useEffect } from "react";
import LeftNav from "./LeftNav";
import { Context } from "../context/contextApi";

import VideoCard from "./VideoCard";

const Feed = () => {

    const { loading, searchResults } = useContext(Context);

    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h")
    },[])

    return (
        <div className="h-[calc(100%-56px)] flex flex-row">
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] overflow-y-auto bg-[#0f0f0f] ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5 ">
                    {
                        !loading && searchResults.map((item) => {
                            if (item.type !== "video") return false;
                            return (
                                <VideoCard
                                    key={item?.video?.movingThumbnails?.[0]?.url}
                                    video={item?.video}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Feed;