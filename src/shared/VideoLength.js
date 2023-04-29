import React from "react";
import moment from "moment";

const VideoLength = ({ time }) => {
    const videoLengthInSeconds = moment()
        ?.startOf("day")
        ?.seconds(time)
        ?.format("mm:ss");

    return (
        <div className='absolute bottom-2 right-2 left-auto bg-black/[0.5] text-white p-1 rounded-[5px] items-center justify-center'>
            {videoLengthInSeconds}
        </div>
    );
};

export default VideoLength;
