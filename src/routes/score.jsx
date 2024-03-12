import { useEffect, useReducer, useState } from 'react';
import { RiArrowUpDoubleLine } from 'react-icons/ri';
import { matchSorter } from 'match-sorter';
import axios from 'axios';
import { Loading, Error } from './../components';

import { markdownParser, domParser } from '../methods';

export default function Blog() {
  // sticky search header
  const [isSticky, setIsSticky] = useState(false);

  //
  const [isErrorScores, setIsErrorScores] = useState(false);
  const [isLoadingScores, setIsLoadingScores] = useState(false);

  // search, sort and filter scores on inputs change
  const [reduceState, dispatch] = useReducer(reducer, { scores: [] });

  // to keep reduceState in sync when scores fetched, because when we first assign scores to reduceState it's an empty array
  useEffect(() => {
    dispatch({ type: 'load' });
  }, []);

  // filter and sort the scores, we don't need state because we use scores state every time
  function reducer(state, action) {
    // TODO: implement reducer with tags like: frontend, backend, api, os, math, dsa, etc.
    const type = action.type;
    if (type === 'load') {
      return { scores: [...state.scores] };
    } else if (type === 'az') {
      // we have to clone scores because we don't want to use reducer's own `state`
      return { scores: [...state.scores].sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)) };
    } else if (type === 'za') {
      return { scores: [...state.scores].sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1)) };
    } else if (type === 'newest') {
      return { scores: [...state.scores].sort((a, b) => b.createdAtUnix - a.createdAtUnix) };
    } else if (type === 'oldest') {
      return { scores: [...state.scores].sort((a, b) => a.createdAtUnix - b.createdAtUnix) };
    } else if (type === 'search') {
      return {
        scores: matchSorter([...state.scores], action.query, {
          keys: [
            'title',
            // 'tag', // TODO search tags
          ],
        }),
      };
    } else {
      throw new Error(`Unknown action: `, type);
    }
  }

  function handleSortChange(e) {
    dispatch({ type: e.target.value });
  }

  function handleSearchChange(e) {
    dispatch({ type: 'search', query: e.target.value });
  }

  // BUG remove sticky header because it trigger rerender, or do some performant consideration when this whole Blog component rerender with that sticky bar
  // make search bar stick to the top when start scrolling
  useEffect(() => {
    const stickSearch = document.getElementById('stick-search');
    const sticky = stickSearch?.offsetTop;
    const handleScroll = () => {
      if (!sticky) return;
      if (window.scrollY > sticky) setIsSticky(true);
      else setIsSticky(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let jsx;

  // there server error or connection error when fetching scores
  if (isErrorScores) {
    jsx = (
      <div className="mx-auto grid place-items-center text-warn">
        <Error className="text-8xl" />
      </div>
    );
    // is fetching
  } else if (isLoadingScores) {
    jsx = (
      <div className="mx-auto grid place-items-center text-warn">
        <Loading className="text-8xl" />
      </div>
    );
    // data available
  } else {
    jsx = (
      <ul className="">
        {/* {scores.map((score) => ( */}
        {reduceState.scores.map((score) => (
          <li className="p-4 my-8 shadow-lg text-gray-900 rounded-md bg-white" key={score.id}>
            {/* display score here */}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="">
      {/* padding element so that the header don't seem like teleport when it sticky to top */}
      <div className={'text-transparent px-8 py-4 border' + ' ' + (isSticky ? '' : 'hidden')}>Made with by minhhoccode111</div>
      <div
        id="stick-search"
        className={
          'flex gap-2 sm:gap-3 md:gap-4 items-end justify-center md:justify-end transition-all px-4 py-2 sm:px-8 sm:py-4 bg-white' + ' ' + (isSticky ? 'fixed top-0 left-0 right-0 z-20 shadow-xl' : '')
        }
      >
        {/* divider */}
        <div className="hidden md:block border-b-8 border-sky-500 flex-1 scale-x-150 origin-right"></div>

        {/* search field */}
        <div className="max-sm:w-1/3">
          <label htmlFor="search-input" className="relative block rounded-md sm:rounded-lg border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
            <input
              id="search-input"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 sm:text-lg"
              placeholder="Search for..."
              type="search"
              name="q"
              onChange={handleSearchChange}
            />

            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:text-xs peer-focus:sm:text-sm">
              Search
            </span>
          </label>
        </div>

        {/* filter category */}
        <div className="">
          <div className="flex gap-2 sm:gap-3 md:gap-4">
            <div className="">
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-900">
                {' '}
                Sort{' '}
              </label>
              <select
                onChange={handleSortChange}
                name="sort"
                id="sort-by"
                defaultValue="newest"
                className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm md:text-base px-2 py-1 sm:px-3 sm:py-1.5 bg-white border shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 "
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* display each score in scores and its link to navigate to view */}
      <div className="p-2 sm:p-4 w-full max-w-[70ch] mx-auto my-8 rounded-lg">
        {jsx}

        {/* create new score field */}
      </div>

      {/* a scroll to top button */}
      <div className={'fixed right-2 bottom-2 z-10' + ' ' + (isSticky ? 'block' : 'hidden')}>
        <button
          onClick={() => {
            // scroll to top
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }}
          className="grid place-items-center w-12 h-12 bg-white border-2 border-sky-500 rounded-full hover:bg-sky-500 text-sky-500 hover:text-white transition-all"
        >
          <RiArrowUpDoubleLine className="text-4xl" />
        </button>
      </div>
    </section>
  );
}
