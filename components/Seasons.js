import Image from "next/image";
import { useRouter } from "next/router";
import { BASE_URL } from "../utils/constants";

function Seasons({ result, id }) {
    const router = useRouter();
    const routeQuery = () => router.push({pathname: `/tv/season`, query: {num: result.season_number, id: id}});

    return (
        <div onClick={routeQuery} className='p-2 mx-4 md:mx-8 lg:mx-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
            <Image className='group-hover:opacity-50' layout='responsive' src={`${BASE_URL}${result.poster_path}`} alt='' height={1440} width={960}/>
            <div className='p-2 text-center'>
                <h2 className='mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold group-hover:text-red-400 md:truncate max-w-md'>{`Season ${result.season_number}`}</h2>
                <h2 className='mt-1 text-md text-white transition-all duration-100 ease-in-out group-hover:font-bold truncate max-w-md'>{`${result.episode_count} Episodes`}</h2>
            </div>
        </div>
    );
}

export default Seasons;