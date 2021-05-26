import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Image from "next/image";
import { useRouter } from "next/router";

function index({ collection }) {
  console.log(collection);
  const base_url = "https://image.tmdb.org/t/p/original/";

  const searchInputRef = useRef(null);
  const router = useRouter();

  const Search = (e) => {
    e.preventDefault();
    const term = searchInputRef.current.value;

    if (!term) return;
    router.push(`/collections/${term}`);
  };

  return (
    <div>
      <Head>
        <title>Hulu -Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className=" max-w-4xl mx-auto">
        <h1 className="text-center font-bold tracking-widest p-10 text-xl lg:text-3xl ">
          Search Your Movies and TV Collection
        </h1>
        <form type="submit">
          <input
            ref={searchInputRef}
            placeholder="Search anything you need... (Live Search by Filter)"
            className={` font-bold tracking-widest bg-gradient-to-l text-gray-800 from-[#06202A] p-2 px-5 h-full w-full flex-grow rounded flex-shrink rounded-l-md focus:outline-none
         `}
            type="text"
          />
          <button hidden onClick={Search} type="submit">
            Search
          </button>
        </form>
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

  const allGenre = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list??api_key=${prod.api_key}&language=en-US`
  ).then((res) => res.json());

  const collection = await fetch(
    `https://api.themoviedb.org/3/search/collection?api_key=937131eba58ea1dee39d4b5fda3009f2&language=en-US&query=sex&page=1`
  ).then((res) => res.json());

  return { collection, allGenre };
};
