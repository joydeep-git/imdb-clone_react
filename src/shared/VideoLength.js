import React from "react";
import moment from "moment";

const VideoLength = ({ time }) => {
    const videoLengthInSeconds = moment()
        ?.startOf("day")
        ?.seconds(time)
        ?.format("H:mm:ss");
    return (
        <span className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-white px-2 py-1 text-sm" >
            {videoLengthInSeconds}
        </span>
    );
};

export default VideoLength;