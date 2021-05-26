import Head from "next/head";
import Header from "../../components/Header";
import { useRouter } from "next/router";

function index({ allGenre }) {
  const router = useRouter();
  console.log(allGenre);
  return (
    <div>
      <Head>
        <title>Hulu-Genres </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />{" "}
      <div className="flex px-10 sm:px-20 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide">
        {allGenre.genres.map((genre) => (
          <h1
            onClick={() => router.push(`/genres/${genre.id}`)}
            className=" last:pr-24 cursor-pointer transition duration-100 
          transform hover:scale-125 hover:text-white active:text-red-500"
          >
            {genre.name}
          </h1>
        ))}
      </div>
    </div>
  );
}

export default index;

index.getInitialProps = async ({ query }) => {
  const allGenre = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=937131eba58ea1dee39d4b5fda3009f2&language=en-US`
  ).then((res) => res.json());

  return { allGenre };
};
