import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function Banner({ genre }) {
  const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {genre.results.map((genre) => (
          <Image
            layout="responsive"
            src={`${base_url}${genre.backdrop_path || genre.poster_path}`}
            height={1080}
            width={1920}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
