import Head from "next/head";
import Header from "../../components/Header";
import FlipMove from "react-flip-move";

import Thumbnail from "../../components/Thumbnail";

function index({ results }) {
  console.log("results", results);
  return (
    <div>
      <Head>
        <title>Hulu-Trending</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
          {results.results.map((result) => (
            <Thumbnail key={result.id} result={result} />
          ))}
        </FlipMove>
      </main>
    </div>
  );
}

export default index;

index.getInitialProps = async ({ query }) => {
  const prod = {
    url: "https://api.themoviedb.org/3",
    // api_key: process.env.API_ENV,
    api_key: "937131eba58ea1dee39d4b5fda3009f2",
    language: "en-US",
  };

  const results = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=937131eba58ea1dee39d4b5fda3009f2&language=en-US&query=${query.id}&page=1&include_adult=true`
  ).then((res) => res.json());

  //api.themoviedb.org/3/trending/all/day?api_key=937131eba58ea1dee39d4b5fda3009f2

  https: return { results };
};
