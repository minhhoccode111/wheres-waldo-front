import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Header } from './../components';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

export default function Layout() {
  const { pathname } = useLocation();
  const [scoreData, setScoreData] = useState(null);

  // fetch early to wake the server up
  useEffect(() => {
    let isActive = true;
    async function getScoreData() {
      try {
        const res = await axios({
          method: 'get',
          url: import.meta.env.VITE_API_ORIGIN + '/game',
        });
        if (isActive) setScoreData(res.data.games);
        // console.log(res.data.games);
      } catch (error) {
        console.log(`error belike: `, error);
      }
    }

    getScoreData();

    // clean up to void race condition when fetching using useEffect
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <Fragment>
      {pathname !== '/' && <Header />}

      <main className="flex-1 flex flex-col">
        <Outlet context={{ scoreData, setScoreData }} />
      </main>

      {pathname !== '/' && pathname !== '/play' && <Footer />}
    </Fragment>
  );
}
