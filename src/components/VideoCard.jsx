import React, { useState } from 'react';
import { abbreviateNumber } from 'js-abbreviation-number';
import { Link } from 'react-router-dom';
import { BsFillCheckCircleFill } from "react-icons/bs";
import VideoLength from '../shared/VideoLength';

function VideoCard({ video }) {
  const [imageSrc, setImageSrc] = useState(video?.thumbnails?.[0].url);

  const handleMouseOver = () => {
    if (video?.movingThumbnails?.length > 0) {
      setImageSrc(video?.movingThumbnails[0].url);
    }
  };

  const handleMouseOut = () => {
    setImageSrc(video?.thumbnails[0]?.url);
  };

  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className='relative flex flex-col mb-8 gap-5'>

        <div className='relative h-48 md:h-40 rounded-tl-xl rounded-tr-xl overflow-hidden'>
          <img
            src={imageSrc}
            alt='Thumbnail'
            className="w-full h-full object-cover"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
          {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
        </div>

        <div className='flex flex-row'>

          <div className='rounded-full h-6 w-6 md:h-12 md:w-12 overflow-hidden'>
            <img src={video?.author?.avatar[0]?.url} alt="" className='rounded-full' />
          </div>

          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-xs font-bold line-clamp-2 text-white">
              {video?.title}
            </span>
            <span className="text-[16px] font-semibold mt-2 text-white/[0.7] flex items-center">
              {video?.author?.title}
              {video?.author?.badges[0]?.type ===
                "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-white/[0.5] text-[14px] ml-1" />
                )}
            </span>
            <div className="flex text-[14px] font-semibold text-white/[0.7] truncate overflow-hidden">
              <span>{`${abbreviateNumber(
                video?.stats?.views,
                2
              )} views`}</span>
              <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                .
              </span>
              <span className="truncate">
                {video?.publishedTimeText}
              </span>
            </div>
          </div>

        </div>

      </div>

    </Link>
  )
}

export default VideoCard;