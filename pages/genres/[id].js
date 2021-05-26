import Head from "next/head";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThumbUpIcon } from "@heroicons/react/outline";
import Fade from "react-reveal/Fade";

const Genres = ({ genre, allGenre }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const base_url = "https://image.tmdb.org/t/p/original/";

  console.log("allGenre", allGenre);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults(
      genre.results.filter((genre) => genre.title.includes(searchTerm))
    );
  };
  useEffect(() => {
    setSearchResults(
      genre.results.filter((genre) => genre.title.includes(searchTerm))
    );
  }, [searchTerm, genre]);

  return (
    <div>
      <Head>
        <title>Hulu </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="max-w-6xl mx-auto">
        <Banner genre={genre} />
        <h1 className="text-center font-bold tracking-widest p-10 text-xl lg:text-3xl ">
          Search Your Movies and TV
        </h1>
        <input
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search anything you need... (Live Search by Filter)"
          className={` font-bold tracking-widest bg-gradient-to-l text-gray-800 from-[#06202A] p-2 px-5 h-full w-full flex-grow rounded flex-shrink rounded-l-md focus:outline-none
         `}
          type="text"
        />{" "}
        <>
          <Fade bottom>
            <div className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
              {searchResults.map(
                ({
                  id,
                  title,
                  original_name,
                  backdrop_path,
                  poster_path,
                  media_type,
                  release_date,
                  vote_count,
                  first_air_date,
                  overview,
                  keyword,
                }) => (
                  <Link href={`/movie/${id}`}>
                    <div
                      key={Math.random()}
                      className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
                    >
                      <Image
                        layout="responsive"
                        src={`${base_url}${backdrop_path || poster_path}`}
                        height={1080}
                        width={1920}
                      />
                      <div className="p-2">
                        <p className="truncate max-w-md">{overview}</p>
                        <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in group-hover:font-bold">
                          {title || original_name}
                        </h2>
                        <p className="flex items-center opacity-0 group-hover:opacity-100">
                          {media_type && `${media_type} •`}
                          {""}
                          {release_date || first_air_date}•{""}
                          <ThumbUpIcon className="h-5 mx-2" />
                          {vote_count}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </Fade>
        </>
      </main>
    </div>
  );
};

Genres.getInitialProps = async ({ query }) => {
  const prod = {
    url: "https://api.themoviedb.org/3",
    // api_key: process.env.API_ENV,
    api_key: "937131eba58ea1dee39d4b5fda3009f2",
    language: "en-US",
  };

  const allGenre = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list??api_key=${prod.api_key}&language=en-US`
  ).then((res) => res.json());

  const genre = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${prod.api_key}&with_genres=${query.id}`
  ).then((res) => res.json());

  return { genre, allGenre };
};

export default Genres;
