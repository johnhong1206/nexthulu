//const API_KEY = process.env.API_KEY;

import axios from "axios";

const dev = {
  url: "https://api.themoviedb.org/3",
};

const prod = {
  url: "https://api.themoviedb.org/3",
  // api_key: process.env.API_ENV,
  api_key: "937131eba58ea1dee39d4b5fda3009f2",
  language: "en-US",
};

export const environment = "prod";
const API_KEY = "937131eba58ea1dee39d4b5fda3009f2";

export default {
  fetchTrending: {
    tile: "Trending",
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  fetchTopRated: {
    title: "Top Rated",
    url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  },
  fetchActionMovies: {
    title: "Action Movies",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchComedyMovies: {
    title: "Comedy Movies",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  },
  fetchHorrorMovies: {
    title: "Horror Movies",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  },
  fetchRomanceMovies: {
    title: "Romance Movies",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  },
  fetchMystery: {
    title: "Mystery",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
  },
  fetchSciFi: {
    title: "SciFi",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  },
  fetchWestern: {
    title: "Western",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
  },
  fetchAdventure: {
    title: "Adventure",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
  },
  fetchAnimation: {
    title: "Animation",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  },
  fetchTV: {
    title: "TV",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
  },
};

const fetchMovie = (id) => {
  return `/movie/${id}?api_key=${API_KEY}&append_to_response=videos,release_dates`;
};
export { fetchMovie };

export const getMovieById = (id) => {
  if (environment === "prod") {
    return axios
      .get(
        `${prod.url}/movie/${id}?api_key=${prod.api_key}&language=${prod.language}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error("getMovieById", error);
      });
  } else {
    return axios.get(`${dev.url}/api/v1/movies/${id}`).then((res) => {
      return res.data;
    });
  }
};

export const getTvById = (id) => {
  if (environment === "prod") {
    return axios
      .get(
        `${prod.url}/tv/${id}?api_key=${prod.api_key}&language=${prod.language}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error("getMovieById", error);
      });
  } else {
    return axios.get(`${dev.url}/api/v1/tv/${id}`).then((res) => {
      return res.data;
    });
  }
};

export const deleteMovie = (id) => {
  return axios.delete(`${dev.url}/api/v1/movies/${id}`).then((res) => {
    return res.data;
  });
};

export const getCategories = () => {
  if (environment === "prod") {
    return axios
      .get(
        `${prod.url}/genre/movie/list?api_key=${prod.api_key}&language=${prod.language}`
      )
      .then((res) => {
        const categories = [{ id: 0, name: "All" }];
        categories.push(...res.data.genres);
        return categories;
      })
      .catch((error) => {
        console.error("getCategories", error);
      });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(CATEGORY_DATA);
        } catch (error) {
          reject(`Cannot fetch data: ${error}`);
        }
      }, 200);
    });
  }
};

export const getSimilarMovie = (id) => {
  if (environment === "prod") {
    return axios
      .get(
        `${prod.url}/movie/${id}/similar?api_key=${prod.api_key}&language=en-US&page=1`
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error("getMovieById", error);
      });
  } else {
    return axios
      .get(
        `${dev.url}/api/v1/movies/${id}/similar?api_key=${prod.api_key}&language=${prod.language}&page=1`
      )
      .then((res) => {
        return res.data;
      });
  }
};
