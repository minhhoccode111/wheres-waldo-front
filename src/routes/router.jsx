import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './404';
import Layout from './layout';
import Index from './index';
import Score from './score';
import Play from './play';
import About from './about';

export default function Router() {
  // setting router
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Index />,
          errorElement: <NotFound />,
        },

        {
          path: 'score',
          element: <Score />,
          errorElement: <NotFound />,
        },

        {
          path: 'play',
          element: <Play />,
          errorElement: <NotFound />,
        },

        {
          path: 'about',
          element: <About />,
        },
      ],
    },
  ]);

  // wrapper with setting router
  return <RouterProvider router={router} />;
}
