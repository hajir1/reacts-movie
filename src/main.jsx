import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./page/Homepage.jsx";
import "./styles/main.css";
import "./styles/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import MovieByIdPage from "./page/MovieByIdPage.jsx";
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";
import CharByIdPage from "./page/CharByIdPage.jsx";
import TvSeriesByIdPage from "./page/TvSeriesByIdPage.jsx";
import SearchPage from "./page/SearchPage.jsx";
import AllCharMoviePage from "./page/AllCharMoviePage.jsx";
import AllCharTvPage from "./page/AllCharTvPage.jsx";
import NotFoundPage from "./page/404Page.jsx";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});
const queryClient = new QueryClient();
const routes = createBrowserRouter([
  {
    path: `/`,
    element: <Homepage />,
  },
  {
    path: `/movie/:id`,
    element: <MovieByIdPage />,
  },
  {
    path: `/movie/char/:id`,
    element: <AllCharMoviePage />,
  },
  {
    path: `/tvseries/:id`,
    element: <TvSeriesByIdPage />,
  },
  {
    path: `/tvseries/char/:id`,
    element: <AllCharTvPage />,
  },
  {
    path: `/char/:id`,
    element: <CharByIdPage />,
  },
  {
    path: `/search/:key`,
    element: <SearchPage />,
  },
  {
    path: `*`,
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <ChakraBaseProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
  </ChakraBaseProvider>
);
