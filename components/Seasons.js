import Image from "next/image";

function Seasons({result}) {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    return (
        <div className='p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
            <Image className='group-hover:opacity-50' layout='responsive' src={`${BASE_URL}${result.poster_path}`} alt='' height={1440} width={960}/>
            <div className='p-2 text-center'>
                <h2 className='mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold group-hover:text-red-400 truncate max-w-md'>{`Season ${result.season_number}`}</h2>
                <h2 className='mt-1 text-md text-white transition-all duration-100 ease-in-out group-hover:font-bold truncate max-w-md'>{`${result.episode_count} Episodes`}</h2>
            </div>
        </div>
    );
}

export default Seasons;