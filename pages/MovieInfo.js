import {useRouter} from "next/router";
import React, {useState} from 'react';
import Image from "next/image";
import {
    HomeIcon,
    BookmarkIcon,
    ThumbUpIcon,
    PlayIcon,
    PlusCircleIcon,
    FilmIcon,
} from '@heroicons/react/outline';
import PeriLogo from '../public/peri.png';
import HeaderItem from '../components/HeaderItem';
import Cast from "../components/Cast";
import FlipMove from "react-flip-move";

function MovieInfo() {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    const router = useRouter();
    const movie = router.query;

    const [cast, setCast] = useState([]);
    const searchCast = async () => {
        const castReq = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
        if(castReq.cast) {
            setCast(castReq.cast.slice(0, 8));
        }
    }
    searchCast();

    const routePage = (page) => {
        router.push(page);
    }
    return (
        <div>
            <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto">
                <div className='flex flex-grow max-w-2xl'>
                    <div onClick={() => routePage('/')}><HeaderItem title='HOME' Icon={HomeIcon} /></div>
                    <div onClick={() => routePage('/')}><HeaderItem title='LIBRARY' Icon={BookmarkIcon} /></div>
                </div>
                <Image className='object-contain' src={PeriLogo} alt='Peri' width={250} height={100} />
            </header>

            <div className="w-full">
                <div className="mx-auto px-20 flex-col flex gap-10 object-bottom md:flex-row">
                    <div className="flex flex-col gap-4 lg:w-8/12 xl:w-3/5">
                        <h1 className="font-bold text-7xl text-center text-red-400">{movie.title || movie.original_name}</h1>
                        <div className="flex items-center justify-center space-x-40 font-bold text-2xl text-center text-white">
                            <p>{movie.media_type}</p>
                            <p>{movie.release_date || movie.first_air_date}</p>
                            <ThumbUpIcon className="h-6 mx-2" />{movie.vote_count}
                        </div>
                        <p className="text-2xl text-white">{movie.description || movie.overview}</p>

                        <div className="flex items-center justify-center space-x-4">
                            <button className="h-14 w-28 bg-red-400 hover:bg-red-500 text-white text-lg font-bold rounded inline-flex items-center justify-center"><PlayIcon className="h-12" />Play</button>
                            <button className="h-14 w-28 bg-red-400 hover:bg-red-500 text-white text-lg font-bold rounded inline-flex items-center justify-center"><FilmIcon className="h-12" />Watch Trailer</button>
                            <button className="h-14 w-28 bg-red-400 hover:bg-red-500 text-white text-lg font-bold rounded inline-flex items-center justify-center"><PlusCircleIcon className="h-12" />Add to Library</button>
                        </div>
                    </div>
                    <div className="w-full lg:w-3/12 mx-14">
                        <Image className="" src={`${BASE_URL}${movie.poster_path}`} alt='' height={960} width={640}/>
                    </div>
                </div>
            </div>
            <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                {cast?.map((cast) => cast.profile_path && (
                <>
                    <Cast member={cast} />
                </>
                ))}
            </FlipMove>
    </div>
    );
}

export default MovieInfo;