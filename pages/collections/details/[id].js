import Head from "next/head";
import Header from "../../../components/Header";
import Image from "next/image";
import Thumbnail from "../../../components/Thumbnail";
import FlipMove from "react-flip-move";
import CollectionThumbnail from "../../../components/CollectionThumbnail";

function CollectionDetails({ collectionDetails }) {
  console.log("collectionDetails", collectionDetails);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const photo = `${base_url}${collectionDetails.backdrop_path}`;

  return (
    <div>
      <Head>
        <title>Hulu - Collection - {collectionDetails.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div
          style={{ backgroundImage: `url(${photo})` }}
          className={`sm:grid lg:grid-cols-2 lg:items-center md:space-x-4 brightness-50 opacity-90
              `}
        >
          <Image
            layout="responsive"
            src={`${base_url}${
              collectionDetails.poster_path || collectionDetails.backdrop_path
            }`}
            height={1080}
            width={1920}
            className=" object-contain"
          />
          <div className="bg-transparent bg-gradient-to-t from-[#000000] text-gray-200 rounded-2xl opacity-100">
            <h1 className="text-xl md:text-3xl lg:text-5xl  font-medium">
              {collectionDetails.name}
            </h1>
            <p className="mt-4  font-medium">{collectionDetails.overview}</p>
          </div>
        </div>
        <div className="mt-10 p-2 lg:p-4">
          <h1 className=" font-bold text-xl">Collection Movies</h1>
          <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
            {collectionDetails.parts.map((result) => (
              <CollectionThumbnail key={result.id} result={result} />
            ))}
          </FlipMove>
        </div>
      </main>
    </div>
  );
}

export default CollectionDetails;

CollectionDetails.getInitialProps = async ({ query }) => {
  const prod = {
    url: "https://api.themoviedb.org/3",
    // api_key: process.env.API_ENV,
    api_key: "937131eba58ea1dee39d4b5fda3009f2",
    language: "en-US",
  };

  const allGenre = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list??api_key=${prod.api_key}&language=en-US`
  ).then((res) => res.json());

  const collectionDetails = await fetch(
    `https://api.themoviedb.org/3/collection/${query.id}?api_key=${prod.api_key}&language=en-US`
  ).then((res) => res.json());

  //api.themoviedb.org/3/collection/259411?api_key=937131eba58ea1dee39d4b5fda3009f2&language=en-US

  https: return { collectionDetails };
};
