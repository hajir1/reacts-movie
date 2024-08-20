import axios from "axios";
import { useQuery } from "react-query";

const AUTH =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjc0NGZmNmFlZTYzN2U3ZjkzOTFlYjRmNGE0OGRiOCIsIm5iZiI6MTcyMzE4Njc1MC42MTEzNTYsInN1YiI6IjY2YjViZDBmNGQzNzJlNGJhNDI1ZmIwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HmVXKs4n2wcG0C-Tk12QJYY1TN-0MiV4ozpqOeaZhv4";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AUTH}`,
  },
};
export const APISearchMovie = (data, cb) => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?query=${data}&include_adult=false&language=id-ID&page=1`,
      {
        headers: {
          Authorization: `Bearer ${AUTH}`,
        },
      }
    )
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const UseAPITrendingAll = () => {
  const APIcall = useQuery({
    queryKey: ["trendingAll"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
        options
      );
      return response.json();
    },
  });
  return APIcall;
};

export const UseAPITrendingMovies = (time) => {
  const APIcall = useQuery({
    queryKey: ["trendingMovie", time],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/${time}?language=en-US`,
        options
      );
      return response.json();
    },
  });
  return APIcall;
};

export const UseAPITrendingTv = (time) => {
  const APIcall = useQuery({
    queryKey: ["trendingTv", time],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/${time}?language=en-US`,
        options
      );
      return response.json();
    },
  });
  return APIcall;
};

export const UseAPIPopular = (schema) => {
  const APIcall = useQuery({
    queryKey: ["popularType", schema],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${schema}/popular?language=en-US&page=1&region=id-ID`,
        options
      );
      return response.json();
    },
  });
  return APIcall;
};
export const UseAPIById = (schema, id) => {
  const APIcall = useQuery({
    queryKey: ["popular", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${schema}/${id}?language=en-US`,
        options
      );
      return response.json();
    },
  });
  return APIcall;
};
export const UseAPICharById = (schema, id) => {
  const APIcall = useQuery({
    queryKey: ["char", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${schema}/${id}/credits?language=en-US`,
        options
      );
      return response.json();
    },
  });
  return APIcall;
};
export const UseAPISosmedById = (schema, id) => {
  const APIcall = useQuery({
    queryKey: ["sosmed", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${schema}/${id}/external_ids`,
        options
      );
      return response.json();
    },
  });
  return APIcall;
};
export const UseAPIRecomendationById = (schema, id) => {
  const APIcall = useQuery({
    queryKey: ["recomendation", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${schema}/${id}/recommendations?language=en-US&page=1`,
        options
      );
      return response.json();
    },
  });
  return APIcall;
};
export const UseAPIKeywordById = (schema, id) => {
  const APIcall = useQuery({
    queryKey: ["keyword", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${schema}/${id}/keywords`,
        options
      );
      return response.json();
    },
  });
  return APIcall;
};
export const UseAPICreditPerson = (schemaHistory, id) => {
  const APIcall = useQuery({
    queryKey: ["credit", id, schemaHistory],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${id}/${schemaHistory}?language=en-US`,
        options
      );
      return response.json();
    },
  });
  return APIcall;
};
export const UseAPIVideo = (schema, id) => {
  const APIcall = useQuery({
    queryKey: ["credit", id, schema],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${schema}/${id}/videos?language=en-US`,
        options
      );
      return response.json();
    },
  });
  return APIcall;
};

export const UseAPISearch = (query) => {
  const APIcall = useQuery({
    queryKey: ["keyword", query],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        options
      );
      return response.json();
    },
  });
  return APIcall;
};
