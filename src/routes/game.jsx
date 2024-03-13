import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Timer, Character } from './../components';
import axios from 'axios';
import Odlaw from './../assets/odlaw.gif';
import Wizard from './../assets/wizard.gif';
import Waldo from './../assets/waldo.png';
import Playground from './../assets/wheres-waldo-playground.jpg';

function CharacterFac(name, link, found = false) {
  return { name, link, found };
}

export default function Game() {
  // navigate after submit user's name
  const navigate = useNavigate();

  // create each new game
  const [gameId] = useState(uuid());
	// must use Unix time
  const [startTime] = useState(Date.now());
  const [timePlay, setTimePlay] = useState(0);

  // whether popup show
  const [isPopup, setIsPopup] = useState(false);

  // a message to display to user
  const [message, setMessage] = useState('');

  // position of cursor over Playground
  const playgroundRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (playgroundRef.current) playgroundRef.current.addEventListener('click', handleClick);

    function handleClick(e) {
      // x of click (to screen edge) - x of picture's spacing (border, padding, margin etc.) = px from picture's edge
      const pxFromLeft = e.x - e.target.x;
      const pxFromTop = e.y - e.target.y;

      // percent from picture's edge to click's position
      const percentFromLeft = Math.floor((pxFromLeft / e.target.width) * 100);
      const percentFromTop = Math.floor((pxFromTop / e.target.height) * 100);

      setPosition({ x: percentFromLeft, y: percentFromTop });

      setIsPopup(true);
    }
  }, []);

  // default 3 characters
  const [characters, setCharacters] = useState([
    CharacterFac('waldo', Waldo), // create default object character
    CharacterFac('wizard', Wizard),
    CharacterFac('odlaw', Odlaw),
  ]);

  useEffect(() => {
    async function tmp() {
      try {
        const res = await axios({
          method: 'post',
          url: import.meta.env.VITE_API_ORIGIN + '/game',
          data: {
            startTime, // mark starting time
            gameId, // mark uniqueness of this game
          },
        });

        console.log(res);
      } catch (err) {
        // setMessage('Some errors')
      }
    }

    // fetch axios to mark this game starting time and uuid
    // tmp();
  }, [startTime, gameId]);

  // odlaw's head 10% - 35%
  // wizard's head 26% - 34%
  // waldo's head 61% - 37%

  async function handleSelectCharacter(e) {
    setIsPopup(false);

    // console.log(e.target.textContent);
    console.log({
      method: 'put',
      url: import.meta.env.VITE_API_ORIGIN + '/game',
      data: {
        time: Date.now(),
        gameId,
        position,
        charname: e.target.value,
      },
    });
    return;

    // hide to stop user from spamming

    try {
      const res = await axios({
        method: 'post',
        url: import.meta.env.VITE_API_ORIGIN + '/game',
        data: {
          time: Date.now(),
          gameId,
          position,
          charname: e.target.value,
        },
      });
    } catch (err) {
      // setMessage('Some errors')
    }
  }

	// TODO add form submit handler

  return (
    <section className="">
      {/* header game play to display info */}
      <header className="flex gap-2 justify-between items-center p-3">
        <div className="flex-1">
          {/* counter */}
          <Timer startTime={startTime} timePlay={timePlay} />

          {/* display click position */}
          <div className="p-4 font-bold text-lg">
            x: {position.x}% | y: {position.y}%
          </div>
        </div>

        <div className="">{message}</div>

        {characters.map((char, i) => (
          <Character char={char} key={i} />
        ))}
      </header>

      {characters.every((c) => c.found) && (
        <div className="fixed z-50 top-0 left-0 h-full w-full bg-[#77777799] flex flex-col gap-4 justify-center items-center">
          <h2 className="text-4xl font-bold text-white">You win!</h2>
          <h2 className="text-4xl font-bold text-white">Enter Your Name</h2>
          <form className="p-4 rounded-lg bg-white flex gap-2 items-center justify-between">
            <label
              htmlFor="search-input"
              className="relative block rounded-md sm:rounded-lg border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500"
            >
              <input
                id="search-input"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 sm:text-lg"
                placeholder="Search for..."
                type="text"
                name="username"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:text-xs peer-focus:sm:text-sm">
                Search
              </span>
            </label>

            <button type="submit" className="ripper p-2">
              Submit
            </button>
          </form>
        </div>
      )}

      {/* gameboard */}
      <article className="aspect-16/9 bg-link border-link border-8 rounded-3xl relative">
        <img ref={playgroundRef} src={Playground} alt="Many people at the beach" className="block w-full cursor-crosshair rounded-xl" />
        <div
          // have to use inline style because arbitrary dynamic position don't work in tailwind
          style={{ top: position.y + '%', left: position.x + '%' }}
          className={'flex-col gap-2 rounded-lg h-36 w-24 absolute z-10 bg-danger p-2 capitalize font-bold' + (isPopup ? ' flex' : ' hidden')}
        >
          <p className="text-center text-white">Select:</p>
          <button value={'waldo'} onClick={handleSelectCharacter} className="ripper capitalize">
            waldo
          </button>
          <button value={'wizard'} onClick={handleSelectCharacter} className="ripper capitalize">
            wizard
          </button>
          <button value={'odlaw'} onClick={handleSelectCharacter} className="ripper capitalize">
            odlaw
          </button>
        </div>
      </article>
    </section>
  );
}
