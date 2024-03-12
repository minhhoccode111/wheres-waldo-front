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
    console.log(playgroundRef.current);

    if (playgroundRef.current) playgroundRef.current.addEventListener('click', handleClick);

    function handleClick(e) {
      console.log(e);

      const pxFromLeft = e.x - e.target.x;
      const pxFromTop = e.y - e.target.y;
      console.log(pxFromLeft, pxFromTop);

      const percentFromLeft = Math.floor((pxFromLeft / e.target.width) * 100);
      const percentFromTop = Math.floor((pxFromTop / e.target.height) * 100);

      setPosition({ x: percentFromLeft, y: percentFromTop });
    }

    // return ()=>playgroundRef.current.removeEventListener('click', handleClick);
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

  return (
    <section className="">
      {/* header game play to display info */}
      <header className="flex gap-2 justify-between items-center p-3">
        <div className="flex-1">
          <Timer startTime={startTime} />
        </div>
        {characters.map((char, i) => (
          <Character char={char} key={i} />
        ))}
      </header>

      {/* display click position */}
      <div className="">
        x:{position.x}% | y: {position.y}%
      </div>

      {/* gameboard */}
      <article className="aspect-16/9 bg-danger border-link border-8">
        <img ref={playgroundRef} src={Playground} alt="Many people at the beach" className="block w-full cursor-crosshair" />
      </article>
    </section>
  );
}
