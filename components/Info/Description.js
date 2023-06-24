import Image from "next/image";
import { StarIcon, PlayIcon, HeartIcon, FilmIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import StreamingSources from "./StreamingSources";
import { BASE_URL } from '../../utils/constants';
import { localStorageFavorites } from '../../utils/localStorage';
import { toast } from 'react-toastify';
import { blurUrl, alertParams } from "../../utils/helper";
import fallbackImage from '../../public/fallback.png';

function Description({ movie, mediaType, releaseYear, runtime, certification }) {
    const { isFav, checkFav } = localStorageFavorites(movie, mediaType);
    const genres = movie.genres?.map((genre) => genre.name).slice(0, 3).join(', ');

    const [isOpen, setOpen] = useState(false);
    const [trailerID, setTrailerId] = useState([]);
    const checkTrailer = async () => {
        toast.info('Fetching trailer, please wait...', alertParams);
        const title = movie?.title || movie?.original_name;
        try {
            const response = await fetch('/api/trailer', {
            method: 'POST',
            body: JSON.stringify({ title, mediaType }),
            headers: {
                'Content-Type': 'application/json',
            },
            });
            if (!response.ok) {
                toast.error('No trailer available', alertParams);
            } else {
                const { trailerId } = await response.json();
                setTrailerId(trailerId);
                setOpen(true);
            }
        } catch (error) {
            toast.error('Error occurred', alertParams);
        }
    };      

    const [watchModeSources, setWatchModeSources] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const onOpenModal = () => setModalOpen(true);
    const onCloseModal = () => setModalOpen(false);
    const streamAvailability = async () => {
        toast.info('Fetching links, please wait...', alertParams);
        const id = movie?.id;
        try {
            const response = await fetch('/api/streamingsources', {
            method: 'POST',
            body: JSON.stringify({ mediaType, id }),
            headers: {
                'Content-Type': 'application/json',
            },
            });
            if (response.ok) {
                const { sources } = await response.json();
                setWatchModeSources(sources);
                onOpenModal();
            } else {
                toast.error('Not available to stream', alertParams);
            }
        } catch (error) {
            toast.error('Error occurred', alertParams);
        }
    };

    const btnStyles = 'transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 bg-white text-primary font-bold rounded-lg border-b-2 border-red-400 hover:bg-red-400 hover:text-white shadow-md py-2 px-6 items-center'
    const poster = movie?.poster_path ? `${BASE_URL}${movie.poster_path}` : fallbackImage;

    return (
        <div>
            <StreamingSources watchModeSources={watchModeSources} modalOpen={modalOpen} onCloseModal={onCloseModal} mediaType={mediaType} />
            <div className="w-full">
                <div className="mx-auto px-10 flex flex-col-reverse gap-10 object-bottom md:flex-row">
                    <div className="flex flex-col gap-4 md:w-6/12 lg:w-8/12 xl:w-9/12 2xl:w-10/12">
                        <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl 3xl:text-9xl text-center text-red-400">{movie?.title || movie?.original_name}</h1>
                        <div className="flex items-center justify-center space-x-4 lg:space-x-20 font-bold text-base lg:text-xl 3xl:text-3xl text-center text-white">
                            <p className="border-2 border-white px-1">{mediaType !== 'tv' ? certification : movie?.status}</p>
                            <p>{releaseYear}</p>
                            <p className="xl:truncate">{genres}</p>
                            <p>{runtime}</p>
                            <StarIcon className="h-4 my-4 md:h-6 3xl:h-10 lg:mx-2 lg:my-0 text-yellow-400 fill-yellow-400" />{Math.round(movie?.vote_average * 10) / 10}/10
                        </div>
                        <p className="text-base md:text-lg lg:text-xl 3xl:text-3xl text-white text-center italic">{movie?.tagline}</p>
                        <p className="text-center text-lg md:text-left md:text-xl lg:text-2xl 3xl:text-4xl text-white line-clamp-14">{movie?.description || movie?.overview}</p>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trailerID} onClose={() => setOpen(false)} />

                        <div className="flex items-center justify-center space-x-4 my-2">
                            <button onClick={streamAvailability} title="Play" className={btnStyles}><PlayIcon className="h-10 md:h-12 3xl:h-20" /></button>
                            <button onClick={checkTrailer} title="Watch Trailer" className={btnStyles}><FilmIcon className="h-10 md:h-12 3xl:h-20" /></button>
                            <button onClick={checkFav} title="Favorite" className={isFav ? `${btnStyles} hover:bg-white` : btnStyles }><HeartIcon className={isFav ? 'h-10 md:h-12 3xl:h-20 text-red-400 fill-red-400' : 'h-10 md:h-12 3xl:h-20'} /></button>
                        </div>
                    </div>
                    <div className="w-9/12 md:w-4/12 lg:w-3/12 2xl:w-4/12 mx-10 md:mx-14">
                        <Image placeholder='blur' blurDataURL={blurUrl} priority={true} src={poster} alt='' height={1920} width={1280}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Description;