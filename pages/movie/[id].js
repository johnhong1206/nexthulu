import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import { environment, getMovieById, deleteMovie } from "../../utils/requests";

import Image from "next/image";
import { useState } from "react";
import { FireIcon } from "@heroicons/react/outline";

const Movie = (props) => {
  const [playing, setPlaying] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { movie, categories } = props;
  const base_url = "https://image.tmdb.org/t/p/original/";

  console.log("movie", movie);

  return (
    <div className="">
      <Head>
        <title>Hulu - {movie.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
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

              <div className="flex flex-row space-x-4">
                {movie.genres.map((genre) => (
                  <div
                    key={genre.id}
                    className=" bg-gray-600 rounded-full p-1 hover:animate-pulse cursor-pointer"
                  >
                    <p>{genre.name}</p>
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
        </div>
      </main>
      <div className="pb-6" />
    </div>
  );
};

Movie.getInitialProps = async ({ query }) => {
  const movie = await getMovieById(query.id);
  return { movie };
};

export default Movie;
