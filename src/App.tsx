import { createBrowserRouter, RouterProvider } from 'react-router';

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // Default route
        element: <Home />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
