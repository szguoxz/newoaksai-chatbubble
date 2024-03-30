import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const Home = lazy(() => import("@/pages/home"));
const Chatbot = lazy(() => import("@/pages/chatbot"));

export const router = createBrowserRouter([
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/chatbot",
    element: <Chatbot />,
  },
]);
