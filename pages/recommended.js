import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Header from "../components/Header/Header";
import Results from '../components/Layout/Results';
import LocalStorageMessage from '../components/Layout/LocalStorageMesage';
import { API_KEY, API_URL } from '../utils/constants';
import { toast } from 'react-toastify';
import { alertParams } from "../utils/helper";

function Recommended() {
    const [recRes, setRecRes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [type, setType] = useState('movie');
    const searchReq = async (type) => {
        setType(type);
        const recArr = [];
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        const favoritesType = favorites?.filter((favorite) => favorite.type === type);
        if (favoritesType?.length < 1) {
            toast.error(`You have no ${type} favorites to get recommendations from!`, alertParams);
            setType('movie');
            setIsLoaded(true);
            return;
        }
        const favoriteIds = favoritesType?.map((favorite) => favorite.id);
        const shuffledIds = favoriteIds?.sort(() => 0.5 - Math.random());
        const selectedIds = shuffledIds?.slice(0, 10); //Selects 10 random movies from favorites to get recommendations from

        for (let i = 0; i < selectedIds?.length; i++) {
            const favorite = favorites.find((fav) => fav.id === selectedIds[i]);
            const recommendReq = await fetch(`${API_URL}${favorite.type}/${favorite.id}/recommendations?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
            for (let j in recommendReq.results) {
                recArr.push(recommendReq.results[j]);
            }
        }

        recArr.map((item, index) => { //Removes the same movie from appearing twice
            for(let i = index + 1; i < recArr.length; i++) {
                if(item.id === recArr[i].id) {
                    recArr.splice(i, 1);
                }
            }
        });
        
        recArr.sort(() => Math.random() - 0.5);
        const filteredArr = recArr.filter((obj) => { //Removes movies that are already in favorites
            return !favoriteIds.includes(obj.id);
        });

        const filteredAndSortedArr = filteredArr.filter((obj) => { //Removes movies with low vote count, < 100
            return obj.vote_count >= 100;
        });

        filteredAndSortedArr.sort((a, b) => { //Sorts by vote count
            return b.vote_count - a.vote_count;
        });
        const splicedArr = filteredAndSortedArr.splice(0, 20);
        setRecRes(splicedArr);
        setIsLoaded(true);
    };

    useEffect(() => {
        searchReq(type);
    }, []);

    return (
        <div>
            <Head><title>{`Recommended`}</title></Head>
            <Header />
            {isLoaded &&<LocalStorageMessage results={recRes} id={'recommendations'} searchReq={searchReq} type={type} />}
            <Results results={recRes} />
        </div>
    );
}

export default Recommended;