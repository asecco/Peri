import Image from "next/image";
import Header from '../components/Header/Header';
import Episodes from '../components/Info/Episodes';
import Head from 'next/head';
import { BASE_URL, API_KEY, API_URL } from '../utils/constants';
import { blurUrl } from '../utils/helper';

function EpisodeList({ seasonNum, season, episodes, title }) {
    const targetSeason = season.find((s) => s.season_number === seasonNum);
    const overview = targetSeason?.overview;
    const poster = targetSeason?.poster_path;

    return (
        <div>
            <Head><title>{`${title} | Season ${seasonNum}`}</title></Head>
            <Header />
            <div className="mx-auto px-10 flex flex-col-reverse gap-10 object-bottom md:flex-row mb-8">
                <div className="flex flex-col gap-4 md:w-6/12 lg:w-8/12 xl:w-9/12 2xl:w-10/12">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl 3xl:text-9xl text-center text-red-400">{title}</h1>
                    <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl 3xl:text-6xl text-center text-white">{`Season ${seasonNum}`}</h2>
                    <p className="text-center md:text-left text-base md:text-xl lg:text-2xl 3xl:text-4xl text-white line-clamp-14 mb-6 md:mb-0">{overview}</p>
                    {episodes?.map((episode) => episode.still_path && (
                        <Episodes key={episode.id} result={episode} />
                    ))}
                </div>
                <div className="w-9/12 md:w-5/12 lg:w-4/12 mx-10 md:mx-14">
                    <Image placeholder='blur' blurDataURL={blurUrl} priority={true} src={`${BASE_URL}${poster}`} alt='' height={1920} width={1280}/>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { num, id } = context.query;
    if (!id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    const show = await fetch(`${API_URL}tv/${id}?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
    const episode = await fetch(`${API_URL}tv/${id}/season/${num}?api_key=${API_KEY}&language=en-US`).then((res) => res.json());

    return {
        props: {
            seasonNum: parseInt(num),
            season: show.seasons,
            episodes: episode.episodes,
            title: show.original_name,
        },
    }
}

export default EpisodeList;