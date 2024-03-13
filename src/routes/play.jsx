import { useState, useEffect, useRef } from 'react';
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

export default function Play() {
  // create each new game
  const [gameId] = useState(uuid());
  const [startTime] = useState(new Date().getTime());

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

      setPosition(() => ({ x: percentFromLeft, y: percentFromTop }));
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
      await axios({
        method: 'post',
        url: import.meta.env.VITE_API_ORIGIN + '/game',
        data: {
          startTime, // mark starting time
          gameId, // mark uniqueness of this game
        },
      });
    }

    // fetch axios to mark this game starting time and uuid
    // tmp();
  }, [startTime, gameId]);

  // odlaw's head 10% - 35%
  // wizard's head 26% - 34%
  // waldo's head 61% - 37%

  useEffect(() => {
    if (playgroundRef.current) {
      //
    }
  }, []);

  return (
    <section className="">
      {/* header game play to display info */}
      <header className="flex gap-2 justify-between items-center p-3">
        <div className="flex-1">
          {/* counter */}
          <Timer startTime={startTime} />

          {/* display click position */}
          <div className="p-4 font-bold text-lg">
            x: {position.x}% | y: {position.y}%
          </div>
        </div>
        {characters.map((char, i) => (
          <Character char={char} key={i} />
        ))}
      </header>

      {/* gameboard min width 1000px so user can see */}
      <article className="aspect-16/9 min-w-[1000px] bg-link border-link border-8 rounded-3xl relative">
        <img ref={playgroundRef} src={Playground} alt="Many people at the beach" className="block w-full cursor-crosshair rounded-xl" />
        <div
          // have to use inline style because arbitrary dynamic position don't work in tailwind
          style={{ top: position.y + '%', left: position.x + '%' }}
          className={
            'flex flex-col gap-2 rounded-lg h-36 w-24 absolute z-10 bg-danger p-2 capitalize font-bold -translate-x-1/2 -translate-y-1/2 transition-transform origin-center hover:scale-y-100 scale-y-50'
          }
        >
          <p className="text-center text-white">Select:</p>
          <button className="ripper capitalize">waldo</button>
          <button className="ripper capitalize">wizard</button>
          <button className="ripper capitalize">odlaw</button>
        </div>
      </article>
    </section>
  );
}
