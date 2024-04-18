import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./rootes/root";
import { MovieRoot } from "./rootes/movieRoot";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FilterRoot } from "./rootes/filterRoot";
//
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});
//
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/movie/:movieId",
        element: <MovieRoot />,
      },
      {
        path: "/filters/:filterList",
        element: <FilterRoot />,
      },
    ],
    errorElement: <Root />,
  },
  {
    path: "*",
    element: <Root />,
  },
]);
//
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
