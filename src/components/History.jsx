import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useFirebaseContext } from '../context/FirebaseContext';
import fetchVideoDetails from '../utils/VideoAPI';

import { Context } from '../context/contextApi';

import { FaTrash } from "react-icons/fa";

const History = () => {

    const { setMobileMenu } = useContext(Context);

    const [videoDetails, setVideoDetails] = useState([]);
    const { authenticated, googleSignIn, videoIds, deleteHistory } = useFirebaseContext();

    useEffect(() => {
        const fetchDetailsForVideoIds = async () => {
            const detailsPromises = videoIds.map((videoId) => fetchVideoDetails(videoId));
            const allDetails = await Promise.all(detailsPromises);
            setVideoDetails(allDetails);
        };
        fetchDetailsForVideoIds();
    }, [videoIds]);

    const handleCloseMenu = () => {
        setMobileMenu(false);
    }

    return (
        <div className="flex-grow flex w-full m-auto text-white bg-[#0f0f0f]">
            {!authenticated ? (
                <div className="flex flex-col w-full items-center p-4 gap-3">
                    <h1 className="text-2xl">You need to sign in first to see history</h1>
                    <button
                        onClick={googleSignIn}
                        className="border text-xl px-2 rounded-xl hover:bg-white hover:text-black"
                    >
                        SIGN IN
                    </button>
                </div>
            ) : (
                videoIds.length === 0
                    ? <div
                        className='text-white text-2xl text-center m-auto p-4'
                    > You have no videos in history, <br />
                        <Link to="/" className='text-green-500 cursor-pointer hover:text-blue-700'
                        >Go to video page</Link></div>
                    : (
                        <div className="p-4">
                            <h1 className="text-2xl font-bold mb-4">Watch History</h1>
                            <div className='flex flex-row flex-wrap'>
                                {videoDetails.map((video) => (
                                    <div
                                        key={video?.id}
                                        className='max-w-[17rem] border broder-white p-1 m-4 rounded-xl flex flex-col items-center justify-between'>

                                        <Link to={`/video/${video?.id}`} onClick={handleCloseMenu}>
                                            <div className='w-[16.5rem] rounded-xl h-auto object-cover top-0'>
                                                <img src={video?.snippet?.thumbnails?.maxres?.url}
                                                    alt={video?.snippet?.title}
                                                    className=' h-auto rounded-xl top-0' />
                                            </div>

                                            <div>
                                                <h1 >{video?.snippet?.title}</h1>
                                            </div>
                                        </Link>

                                        <button onClick={() => deleteHistory(video?.id)} className='text-red-600 hover:text-blue-500 mt-2 ' >
                                            <FaTrash />
                                        </button>

                                    </div>

                                ))}
                            </div>
                        </div>
                    )
            )}
        </div>
    );
};

export default History;