import React from 'react';
import { abbreviateNumber } from 'js-abbreviation-number';
import { Link } from 'react-router-dom';
import { BsFillCheckCircleFill } from "react-icons/bs";
import VideoLength from '../shared/VideoLength';

function VideoCard({ video }) {
  return (
    <Link to={`/video/${video.videoId}`}>
      <div className='flex flex-col mb-8'>
        <div className='relative h-48 md:h-40 md:rounded-xl overflow-hidden'>
          <img src={video.thumbnails[0].url} alt="" className='rounded-t-lg'  />
          {video.lengthSeconds && <VideoLength time={video.lengthSeconds} />}
        </div>
      </div>
    </Link>
  )
}

export default VideoCard;