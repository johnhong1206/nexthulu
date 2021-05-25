import Thumbnail from "./Thumbnail";
import FlipMove from "react-flip-move";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

function SuggestMovie({ request }) {
  const [viewmore, setViewMore] = useState(false);
  return (
    <>
      <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
        {request.results.slice(0, 6).map((result) => (
          <Thumbnail key={result.id} result={result} />
        ))}

        {}
      </FlipMove>
      {!viewmore && (
        <div
          onClick={() => setViewMore(true)}
          className="felx flex-col w-full flex items-center justify-center cursor-pointer group hover:text-white h-full
          "
        >
          <EyeIcon className="h-16 mb-1" />
          <p className=" tracking-widest ml-2  opacity-0 group-hover:opacity-100  ">
            View More
          </p>
        </div>
      )}
      <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
        {viewmore &&
          request.results
            .slice(6, request.results.length - 1)
            .map((result) => <Thumbnail key={result.id} result={result} />)}
      </FlipMove>
      {viewmore && (
        <div
          onClick={() => setViewMore(false)}
          className="felx flex-col w-full flex items-center justify-center cursor-pointer group hover:text-white h-full
       "
        >
          <EyeOffIcon className="h-16 mb-1" />
          <p className=" tracking-widest ml-2  opacity-0 group-hover:opacity-100  ">
            View Less
          </p>
        </div>
      )}
    </>
  );
}

export default SuggestMovie;
