import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './404';
import Layout from './layout';
import Index from './index';
import Score from './score';
import Game from './game';
import About from './about';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Index />,
        },

        {
          path: 'score',
          element: <Score />,
        },

        {
          path: 'game',
          element: <Game />,
        },

        {
          path: 'about',
          element: <About />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
