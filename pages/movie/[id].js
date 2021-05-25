import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import {
  environment,
  getMovieById,
  deleteMovie,
  getSimilarMovie,
  getTvById,
} from "../../utils/requests";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FireIcon } from "@heroicons/react/outline";
import SuggestMovie from "../../components/SuggestMovie";

const Movie = ({ movie, tv, request }) => {
  const router = useRouter();
  const { id } = router.query;
  const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="">
      <Head>
        <title>Hulu {movie ? movie.title : tv.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {movie && (
        <main className="mx-auto p-2 lg:p-4">
          <div className="">
            <div className="sm:grid lg:grid-cols-2 lg:items-center md:space-x-4">
              <Image
                layout="responsive"
                src={`${base_url}${movie.backdrop_path || movie.poster_path}`}
                height={1080}
                width={1920}
              />
              <div className="">
                <div className="flex flex-col mb-4 p-1">
                  <div className="flex items-center">
                    <div>
                      <h1 className="text-xl md:text-3xl lg:text-5xl">
                        {movie.title}
                      </h1>
                      <div className="flex space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <h3 className="font-bold">{movie.vote_average}/10</h3>
                          <FireIcon className="h-4 text-yellow-600 brightness-110" />
                        </div>

                        <p className="font-bold">{movie.release_date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-center lg:items-start lg:justify-start space-x-4">
                  {movie.genres.map((genre) => (
                    <div
                      key={genre.id}
                      className=" w-full  h-auto bg-gray-600 rounded-full flex items-center justify-center p-1 hover:animate-pulse cursor-pointer"
                    >
                      <p className="text-center">{genre.name}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4">{movie.overview}</p>
                <div className="mt-8 cursor-pointer">
                  {movie.homepage && (
                    <a
                      className="p-4 bg-gray-800 rounded-2xl hover:bg-gray-500"
                      href={movie.homepage}
                      target="_blank"
                      role="button"
                    >
                      Learn more
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10 p-2 lg:p-4">
              <h1 className=" font-bold text-xl">Suggest Movies</h1>
              <SuggestMovie request={request} />
            </div>
          </div>
        </main>
      )}
      {tv && (
        <main className="mx-auto p-2 lg:p-4">
          <div className="">
            <div className="sm:grid lg:grid-cols-2 lg:items-center md:space-x-4">
              <Image
                layout="responsive"
                src={`${base_url}${tv.backdrop_path || tv.poster_path}`}
                height={1080}
                width={1920}
              />
              <div className="">
                <div className="flex flex-col mb-4 p-1">
                  <div className="flex items-center">
                    <div>
                      <h1 className="text-xl md:text-3xl lg:text-5xl">
                        {tv.name}
                      </h1>
                      <div className="flex space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <h3 className="font-bold">{tv.vote_average}/10</h3>
                          <FireIcon className="h-4 text-yellow-600 brightness-110" />
                        </div>

                        <p className="font-bold">{tv.release_date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row space-x-4">
                  {tv.genres.map((genre) => (
                    <div
                      key={genre.id}
                      className="  w-full  h-auto bg-gray-600 rounded-full flex items-center justify-center p-1 hover:animate-pulse cursor-pointer"
                    >
                      <p className="text-center">{genre.name}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4">{tv.overview}</p>
                <div className="mt-8 cursor-pointer">
                  {tv.homepage && (
                    <a
                      className="p-4 bg-gray-800 rounded-2xl hover:bg-gray-500"
                      href={tv.homepage}
                      target="_blank"
                      role="button"
                    >
                      Learn more
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <h1></h1>
        </main>
      )}
      <div className="pb-6" />
    </div>
  );
};

Movie.getInitialProps = async ({ query }) => {
  const movie = await getMovieById(query.id);
  const tv = await getTvById(query.id);

  const prod = {
    url: "https://api.themoviedb.org/3",
    // api_key: process.env.API_ENV,
    api_key: "937131eba58ea1dee39d4b5fda3009f2",
    language: "en-US",
  };

  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${query.id}/recommendations?api_key=${prod.api_key}&language=en-US`
  ).then((res) => res.json());

  console.log("request", request);

  return { movie, tv, request };
};

export default Movie;
