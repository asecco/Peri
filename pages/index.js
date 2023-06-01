import Head from 'next/head';
import { TrendingUpIcon  } from '@heroicons/react/outline';
import Header from '../components/Header';
import NowPlayingBanner from "../components/NowPlayingBanner";
import Results from "../components/Results";
import FeaturedMovie from '../components/FeaturedMovie';
import StreamingToday from '../components/StreamingToday';
import { API_KEY, API_URL } from '../utils/constants';

export default function Home({ results, nowPlaying, featured, reviews, tv }) {
	return (
		<div>
			<Head>
				<title>Peri</title>
				<meta name="description" content="Movie/TV library for finding the perfect watch for the night" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<NowPlayingBanner nowPlaying={nowPlaying} />
			<StreamingToday tv={tv} />
			<div className="flex mt-8">
                <p className="font-bold text-white text-4xl lg:text-5xl mx-8 xl:mx-10 text-center md:text-left">Trending</p>
                <TrendingUpIcon className="h-12 w-12 lg:h-14 lg:w-14 -ml-6 text-green-400"/>
            </div>
            <Results results={results} />
			{reviews.length > 0 &&<FeaturedMovie featured={featured} reviews={reviews} />}
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

	  const featured = nowPlaying.results[Math.floor(Math.random() * nowPlaying.results.length)]; 
	  const reviews = await fetch(`${API_URL}movie/${featured.id}/reviews?api_key=${API_KEY}&language=en-US`).then((res) => res.json());

	  const tvTrending = tv.results.filter((tvShow) => tvShow.original_language === 'en');

    const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
      	return array;
  	};

	return {
		props: {
			results: trending.results,
			nowPlaying: shuffleArray(nowPlaying.results),
			featured: featured,
			reviews: reviews.results,
			tv: tvTrending
		}
	};
} 