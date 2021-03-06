import { ThumbUpIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { forwardRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Thumbnail = forwardRef(({ key, result }, ref) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();

  const navtoDetail = () => {
    if (result.media_type === "movie") {
      router.push(`/movie/${result.id}`);
    } else {
      router.push(`/tv/${result.id}`);
    }
  };

  return (
    <div
      onClick={navtoDetail}
      ref={ref}
      className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
    >
      <Image
        layout="responsive"
        src={`${base_url}${result.backdrop_path || result.poster_path}`}
        height={1080}
        width={1920}
      />
      <div className="p-2">
        <p className="truncate max-w-md">{result.overview}</p>
        <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in group-hover:font-bold">
          {result.title || result.original_name}
        </h2>
        <p className="flex items-center opacity-0 group-hover:opacity-100">
          {result.media_type && `${result.media_type} •`}
          {""}
          {result.release_date || result.first_air_date}•{""}
          <ThumbUpIcon className="h-5 mx-2" />
          {result.vote_count}
        </p>
      </div>
    </div>
  );
});

export default Thumbnail;
