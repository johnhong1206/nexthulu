import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Image from "next/image";
import Link from "next/link";
import { ThumbUpIcon } from "@heroicons/react/outline";

function Collection({ collection }) {
  console.log("collection is >>>", collection);
  const router = useRouter();
  const { id } = router.query;
  const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <div>
      <Head>
        <title>Hulu-{id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
        {collection.results.map((collection) => (
          <>
            {collection.backdrop_path ? (
              <Link href={`/collections/details/${collection.id}`}>
                <div className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
                  <Image
                    layout="responsive"
                    src={`${base_url}${
                      collection.poster_path || collection.backdrop_path
                    }`}
                    height={1080}
                    width={1920}
                    className=" object-contain"
                  />
                  <div className="p-2">
                    <h2 className="mt-1 text-center text-2xl text-white transition-all duration-100 ease-in group-hover:font-bold">
                      {collection.title || collection.original_name}
                    </h2>
                    <p className="truncate max-w-md text-center">
                      {collection.overview}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <></>
            )}
          </>
        ))}
      </main>
    </div>
  );
}

export default Collection;

Collection.getInitialProps = async ({ query }) => {
  const prod = {
    url: "https://api.themoviedb.org/3",
    // api_key: process.env.API_ENV,
    api_key: "937131eba58ea1dee39d4b5fda3009f2",
    language: "en-US",
  };

  const allGenre = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list??api_key=${prod.api_key}&language=en-US`
  ).then((res) => res.json());

  const collection = await fetch(
    `https://api.themoviedb.org/3/search/collection?api_key=937131eba58ea1dee39d4b5fda3009f2&language=en-US&query=${query.id}&page=1`
  ).then((res) => res.json());

  return { collection, allGenre };
};
