import { useRouter } from "next/router";
import React, { useState } from 'react';
import requests from '../utils/requests';
import requestsTV from '../utils/requestsTV';

function Genres({ type, genre }) {
    const router = useRouter();
    const [activeGenre, setActiveGenre] = useState(genre);
    const requestObject = type === 'movies' ? requests : requestsTV;
    const genreRoute = (key) => {
        setActiveGenre(key);
        router.push(`${type}/${key}/1`);
    }

    return (
        <div>
            <nav className="relative">
                <div className="flex px-10 p-2 sm:px-20 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide">
                    {Object.entries(requestObject).map(([key, {title}]) => (
                        <h2 key={key} onClick={() => genreRoute(key)} className={`last:pr-10 cursor-pointer transition duration-100 transform hover:scale-125 text-white active:text-red-500 ${activeGenre === key ? 'text-red-500' : 'hover:text-red-400'}`}>{title}</h2>
                    ))}
                </div>
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#202F3B] h-10 w-1/12" />
            </nav>
            <p className='font-bold text-white text-4xl lg:text-5xl mx-8 xl:mx-10 my-6 text-center md:text-left'>{requestObject[genre].title}</p>
        </div>
    );
}

export default Genres;