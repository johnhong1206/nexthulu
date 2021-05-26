import { useState } from "react";
import ModalVideo from "react-modal-video";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function MovieTrailer({ movieTrailer, isOpen }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="px-0 my-0 lg:px-5 lg:my-5 sm:grid  xl:grid-cols-3 3xl:flex flex-wrap justify-center">
      {movieTrailer.results.map((trailer) => (
        <>
          <div className="h-full max-h-64 max-w-md ">
            <ModalVideo
              autoplay={0}
              channel="youtube"
              isOpen={isOpen}
              videoId={trailer.key}
              onClose={() => setPlaying(false)}
            />
          </div>
        </>
      ))}
    </div>
  );
}

export default MovieTrailer;
