import Header from "../../components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AdjustmentsIcon } from "@heroicons/react/outline";

function index() {
  const [toggle, setToggle] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();

  const SearchMovie = (e) => {
    e.preventDefault();
    const term = searchInputRef.current.value;

    if (!term) return;
    router.push(`/search/${term}`);
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
        <form className="flex flex-row" type="submit">
          <input
            ref={searchInputRef}
            placeholder="Search Movie you need... (Live Search by Filter)"
            className={` font-bold tracking-widest bg-gradient-to-l text-gray-800 from-[#06202A] p-2 px-5 h-full w-full flex-grow rounded flex-shrink rounded-l-md focus:outline-none
         `}
            type="text"
          />
          <AdjustmentsIcon className="h-8 text-white" />
          <button hidden onClick={SearchMovie} type="submit">
            Search
          </button>
        </form>
      </main>
    </div>
  );
}

export default index;
