import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./page/Homepage.jsx";
import "./styles/main.css";
import "./styles/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
  Spinner,
} from "@chakra-ui/react";
import ErrorPage from "./page/ErrorPage.jsx";

// Lazy-load page components for chunking and faster initial load times
const MovieByIdPage = lazy(() => import("./page/MovieByIdPage.jsx"));
const TvSeriesByIdPage = lazy(() => import("./page/TvSeriesByIdPage.jsx"));
const CharByIdPage = lazy(() => import("./page/CharByIdPage.jsx"));
const AllCharPage = lazy(() => import("./page/AllCharPage.jsx"));
const SearchPage = lazy(() => import("./page/SearchPage.jsx"));
const NotFoundPage = lazy(() => import("./page/404Page.jsx"));

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      cacheTime: 1000 * 60 * 15, // Cache is kept for 15 minutes
      refetchOnWindowFocus: false, // Prevent queries from refetching on window focus
      retry: 1, // Limit retry attempts on failure
    },
  },
});

// A loading wrapper fallback for chunk loading states
const PageSuspense = ({ children }) => (
  <Suspense
    fallback={
      <div className="w-full min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center text-slate-100">
        <Spinner width="4rem" height="4rem" speed="0.8s" color="indigo.500" thickness="4px" />
        <h1 className="mt-4 font-semibold text-slate-400 animate-pulse text-sm">
          Loading Page...
        </h1>
      </div>
    }
  >
    {children}
  </Suspense>
);

const routes = createBrowserRouter([
  {
    path: `/`,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ``,
        element: <Homepage />,
      },
      {
        path: `movie/:id`,
        element: <PageSuspense><MovieByIdPage /></PageSuspense>,
      },
      {
        path: `movie/char/:id`,
        element: <PageSuspense><AllCharPage /></PageSuspense>,
      },
      {
        path: `tvseries/:id`,
        element: <PageSuspense><TvSeriesByIdPage /></PageSuspense>,
      },
      {
        path: `tvseries/char/:id`,
        element: <PageSuspense><AllCharPage /></PageSuspense>,
      },
      {
        path: `char/:id`,
        element: <PageSuspense><CharByIdPage /></PageSuspense>,
      },
      {
        path: `search/:key`,
        element: <PageSuspense><SearchPage /></PageSuspense>,
      },
      {
        path: `*`,
        element: <PageSuspense><NotFoundPage /></PageSuspense>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ChakraBaseProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
  </ChakraBaseProvider>
);
