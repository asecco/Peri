import Head from 'next/head';
import { TrendingUpIcon  } from '@heroicons/react/outline';
import Header from '../components/Header/Header';
import NowPlayingBanner from "../components/Home/NowPlayingBanner";
import Results from "../components/Layout/Results";
import StreamingNow from '../components/Home/StreamingNow';
import { API_KEY, API_URL } from '../utils/constants';

export default function Home({ results, nowPlaying, tv }) {
	return (
		<div>
			<Head>
				<title>Peri</title>
				<meta name="description" content="Movie/TV library for finding the perfect watch for any occasion" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<NowPlayingBanner nowPlaying={nowPlaying} />
			<StreamingNow tv={tv} />
			<div className="flex justify-center md:justify-start md:mt-8 items-center">
                <p className="font-bold text-white text-4xl md:text-5xl mx-8">Trending</p>
                <TrendingUpIcon className="h-12 w-12 lg:h-14 lg:w-14 -ml-6 text-green-400"/>
            </div>
            <Results results={results} />
		</div>
  	);
}

export async function getServerSideProps() {
	const requests = [
		fetch(`${API_URL}trending/movie/day?api_key=${API_KEY}`).then((res) => res.json()),
		fetch(`${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US`).then((res) => res.json()),
		fetch(`${API_URL}trending/tv/day?api_key=${API_KEY}&language=en-US`).then((res) => res.json())
	  ];

	const [trending, nowPlaying, tv] = await Promise.all(requests);
	const tvTrending = tv.results?.filter((tvShow) => tvShow.original_language === 'en');

    const filterArray = (array) => {
		const filteredArray = array?.filter(item => item.original_language === 'en');
      	return filteredArray;
  	};

	return {
		props: {
			results: trending.results?.slice(0, 10),
			nowPlaying: filterArray(nowPlaying.results),
			tv: tvTrending
		}
	};
} 