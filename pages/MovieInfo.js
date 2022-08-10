import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import ModalVideo from 'react-modal-video';
import movieTrailer from 'movie-trailer';
import Image from "next/image";
import { StarIcon, PlayIcon, HeartIcon, TrashIcon, FilmIcon } from '@heroicons/react/outline';
import Header from '../components/Header';
import Cast from "../components/Cast";
import Recommend from "../components/Recommend";
import Seasons from "../components/Seasons";
import FlipMove from "react-flip-move";
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from "../utils/requests";
import { toastNotify, alertParams } from "../utils/notifications";

function MovieInfo() {
    const router = useRouter();
    const movie = router.query;
    const [cast, setCast] = useState([]);
    const [movie2, setMovie2] = useState([]);
    const [trailerID, setTrailerId] = useState([]);
    const [recommendMovie, setRecommendMovie] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const mediaType = movie.media_type || 'movie';
    useEffect(() => {
        const searchReq = async () => {
            const castReq = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
            const movie2Req = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=release_dates`).then((res) => res.json());
            const recommendReq = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
            setMovie2(movie2Req);
            setSeasons(movie2Req.seasons);
            setCast(castReq.cast.slice(0, 12));
            setRecommendMovie(recommendReq.results.slice(0, 12));
            const trailerId = await movieTrailer(`${movie.title || movie.original_name}`, {id: true});
            setTrailerId(trailerId);
            checkRelease();
        }
        searchReq();
    }, [movie.id]);

    if (typeof window !== 'undefined') {
        document.title = `${movie.title || movie.original_name}`;
    }

    const [certification, setCertification] = useState([]);
    useEffect(() => {
        if(movie2.release_dates) {
            if(movie2.release_dates.results.length > 0) {
                setCertification(movie2.release_dates.results.find(obj => obj.iso_3166_1 === 'US').release_dates[0].certification);
            }
        }
    }, [movie2.release_dates]);

    const genres = '';
    for(let i in movie2.genres) {
        movie2.genres.length = 3;
        genres += movie2.genres[i].name + ', ';
    }

    const [releaseYear, setReleaseYear] = useState([]);
    const [recommendDiv, setRecommendDiv] = useState(false);
    const checkRelease = () => {
        if(mediaType === 'movie') {
            const sliced = movie.release_date.slice(0, -6)
            setReleaseYear(sliced);
        } else if(mediaType === 'tv') {
            const sliced = movie.first_air_date.slice(0, -6)
            setReleaseYear(sliced);
            setRecommendDiv(true);
        } else {
            setReleaseYear(movie.release_date);
        }
    }

    const params = {
        id: movie.id,
        type : mediaType,
    }

    const checkFav = () => {
        const localStorageParams = localStorage.getItem('favorites');
        if(localStorageParams) {
            const localStorageParamsObj = JSON.parse(localStorageParams);
            const localStorageParamsObjIds = localStorageParamsObj.map(obj => obj.id);
            if(localStorageParamsObjIds.includes(movie.id)) {
                const localStorageParamsObjIds = localStorageParamsObj.map(obj => obj.id);
                const index = localStorageParamsObjIds.indexOf(movie.id);
                localStorageParamsObj.splice(index, 1);
                localStorage.setItem('favorites', JSON.stringify(localStorageParamsObj));
                toastNotify('remove');
            } else {
                localStorageParamsObj.push(params);
                localStorage.setItem('favorites', JSON.stringify(localStorageParamsObj));
                toastNotify('add');
            }
        } else {
            localStorage.setItem('favorites', JSON.stringify([params]));
            toastNotify('add');
        }
    }

    const [runtime, setRunTime] = useState([]);
    useEffect(() => {
        if(mediaType === 'movie') {
            const minutes = movie2.runtime % 60;
            const hours = Math.floor(movie2.runtime / 60);
            setRunTime(`${hours}h ${minutes}min`);
        } else {
            setRunTime(`${movie2.episode_run_time} mins`);
        }
    }, [movie2.runtime, movie2.episode_run_time]);

    const streamAvailability = async () => {
        const watchMode = await fetch(`https://api.watchmode.com/v1/title/${mediaType}-${movie.id}/sources/?apiKey=${process.env.NEXT_PUBLIC_WatchMode}`).then((res) => res.json());
        if(watchMode.length > 0) {
            const watchModeUrl = watchMode[0].web_url;
            window.open(watchModeUrl, '_blank');
        } else {
            toast.error('Not available to stream', alertParams);
        }

    }

    const checkTrailer = () => {
        if(trailerID === null) {
            toast.error('No trailer available', alertParams);
        } else {
            setOpen(true);
        }
    }

    return (
        <div>
            <ToastContainer theme="dark"/>
            <Header />
            <div className="w-full">
                <div className="mx-auto px-20 flex flex-col-reverse gap-10 object-bottom md:flex-row">
                    <div className="flex flex-col gap-4 md:w-5/12 lg:w-6/12 xl:w-8/12 2xl:w-10/12">
                        <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl text-center text-red-400">{movie.title || movie.original_name}</h1>
                        <div className="flex items-center justify-center space-x-5 lg:space-x-20 font-bold lg:text-lg text-sm md:text-base text-center text-white">
                            <p className="border-2 border-white px-1">{mediaType !== 'tv' ? certification : movie2.status}</p>
                            <p>{releaseYear}</p>
                            <p className="xl:truncate">{genres.slice(0, -2)}</p>
                            <p>{runtime}</p>
                            <StarIcon className="h-4 my-4 md:h-8 lg:h-6 lg:mx-2 lg:my-0 text-yellow-400 fill-yellow-400" />{Math.round(movie.vote_average * 10) / 10}/10
                        </div>
                        <p className="md:text-lg lg:text-xl text-white text-center font-style: italic">{movie2.tagline}</p>
                        <p className="text-center text-base md:text-left md:text-xl lg:text-2xl text-white line-clamp-14">{movie.description || movie.overview}</p>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trailerID} onClose={() => setOpen(false)} />

                        <div className="flex items-center justify-center space-x-4 my-2">
                            <button onClick={streamAvailability} title="Play" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><PlayIcon className="h-12" /></button>
                            <button onClick={checkTrailer} title="Watch Trailer" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><FilmIcon className="h-12" /></button>
                            <button onClick={checkFav} title="Favorite" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><HeartIcon className="h-12" /></button>
                        </div>
                    </div>
                    <div className="w-8/12 md:w-4/12 lg:w-3/12 mx-10 md:mx-28 lg:mx-14">
                        <Image priority={true} layout="responsive" src={`${BASE_URL}${movie.poster_path}`} alt='' height={960} width={640}/>
                    </div>
                </div>
            </div>

            <div>
                <p className="font-bold text-white text-2xl lg:text-3xl mx-7 mt-10 md:mt-4 lg:mt-0">{mediaType != 'tv' ? '' : 'Seasons:'}</p>
                <FlipMove className="grid grid-cols-2 px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 3xl:grid-cols-12">
                    {seasons?.map((season) => season.poster_path && (
                    <>
                        <Seasons result={season} id={movie2.id} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div hidden={recommendDiv}>
                <p className="font-bold text-white text-2xl lg:text-3xl mx-7">More Like This:</p>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10">
                    {recommendMovie?.map((rec) => rec.backdrop_path && (
                    <>
                        <Recommend result={rec} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div>
                <p className="font-bold text-white text-2xl lg:text-3xl mx-7">Cast:</p>
                <FlipMove className="grid grid-cols-2 px-10 md:px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10">
                    {cast?.map((cast) => cast.profile_path && (
                    <>
                        <Cast member={cast} />
                    </>
                    ))}
                </FlipMove>
            </div>
    </div>
    );
}

export default MovieInfo;