import Thumbnail from "./Thumbnail";
import FlipMove from "react-flip-move";
import NowPlayingBanner from "./NowPlayingBanner";

function HomeScreen({ results, nowPlaying }) {
    return (
        <div>
            <NowPlayingBanner nowPlaying={nowPlaying} />
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-14 mt-14 text-center md:text-left'>Trending</p>
            <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                {results.map((result) => result.poster_path && (
                    <Thumbnail key={result.id} result={result} />
                ))}
            </FlipMove>
        </div>
    );
}

export default HomeScreen;