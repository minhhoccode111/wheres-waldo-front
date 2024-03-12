import { AiOutlineLoading } from 'react-icons/ai';
import { IoIosCloseCircleOutline, IoIosMenu } from 'react-icons/io';
import { RiSignalWifiErrorFill } from 'react-icons/ri';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function Loading({ className = 'text-2xl' }) {
  return (
    <span className={'animate-spin block ' + className}>
      <AiOutlineLoading className={''} />
    </span>
  );
}

export function Error({ className = 'text-2xl' }) {
  return (
    <span className={className}>
      <RiSignalWifiErrorFill className="" />
    </span>
  );
}

export function NavigateButton() {
  return <></>;
}

export function CustomButton() {
  return <></>;
}

export function Character() {
  return <></>;
}

export function GameResult() {
  return <></>;
}

export function Dropdown() {
  return <></>;
}

export function DropdownButton() {
  return <></>;
}

export function Footer() {
  return (
    <footer className="p-4 grid place-items-center">
      <p className="">
        <a href="https://github.com/minhhoccode111/wheres-waldo-front" target="_blank" rel="noopener" className="text-link underline decoration-dotted hover:decoration-solid">
          This
        </a>{' '}
        is made by{' '}
        <a href="https://github.com/minhhoccode111" target="_blank" rel="noopener" className="text-sky-500 underline decoration-dotted hover:decoration-solid">
          minhhoccode111
        </a>
        .
      </p>
    </footer>
  );
}

export function RipperLink({ children, to }) {
  return (
    <div className="border-2 h-0 border-sky-500 relative self-stretch">
      <Link className="ripper px-8 py-8 underline hover:decoration-2 underline-offset-4 flex items-center tracking-widest absolute right-1/2 translate-x-1/2 bottom-0 translate-y-1/2 z-10" to={to}>
        <span className="text-xl font-bold whitespace-nowrap">{children}</span>
      </Link>
    </div>
  );
}

export function RipperButton({ children, onClick }) {
  return (
    <div className="border-2 h-0 border-sky-500 relative self-stretch">
      <button
        className="ripper px-8 py-8 underline hover:decoration-2 underline-offset-4 flex items-center tracking-widest absolute right-1/2 translate-x-1/2 bottom-0 translate-y-1/2 z-10"
        onClick={onClick}
      >
        <span className="text-xl font-bold whitespace-nowrap">{children}</span>
      </button>
    </div>
  );
}

export function Header() {
  // hamburger menu state
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <header
      id="header"
      className={
        'flex gap-3 sm:gap-5 md:gap-7 lg:gap-9 items-center p-4 sm:p-5 md:p-6 lg:p-7 shadow-lg shadow-gray-300 text-slate-700 bg-white'
        // + ' ' +  (pathname !== '/' && 'bg-slate-50')
      }
      // color base on url path
    >
      {/* hamburger button */}
      <nav className={'sm:hidden'}>
        {/* click to toggle menu */}
        <button className="hover:bg-gray-300 hover:text-black p-2 max-sm:rounded-xl rounded-md transition-all text-4xl" onClick={() => setIsShowMenu(!isShowMenu)}>
          <IoIosMenu />
        </button>
      </nav>

      {/* all nav links */}
      <nav
        className={
          'flex max-sm:flex-col max-sm:gap-8 max-sm:text-4xl max-sm:fixed max-sm:top-0 max-sm:bottom-0 max-sm:right-0 max-sm:z-30 max-sm:bg-[#ffffff99] max-sm:px-8 max-sm:py-20 max-sm:shadow-2xl max-sm:text-right max-sm:w-3/4 max-sm:backdrop-blur-sm max-sm:items-stretch transition-all origin-top items-center gap-1 md:gap-3 lg:gap-5 text-lg md:text-xl' +
          ' ' +
          (isShowMenu ? 'max-sm:scale-y-100' : 'max-sm:scale-y-0')
          // show or hide base on isShowMenu
        }
      >
        {/* close button */}
        <button className="sm:hidden mt-1 text-4xl absolute top-0 right-0 p-4" onClick={() => setIsShowMenu(!isShowMenu)}>
          <IoIosCloseCircleOutline className="text-red-500 rounded-full hover:text-white hover:bg-red-500 transition-all" />
        </button>

        {/* link to index route */}
        <NavLink
          className={({ isActive }) => (isActive ? 'bg-sky-400 text-white' : 'hover:bg-gray-300 hover:text-black') + ' ' + 'max-sm:p-4 p-2 max-sm:rounded-xl rounded-md transition-all'}
          to={'/'}
        >
          Home
        </NavLink>

        {/* link to about section */}
        <NavLink
          className={({ isActive }) => (isActive ? 'bg-sky-400 text-white' : 'hover:bg-gray-300 hover:text-black') + ' ' + 'max-sm:p-4 p-2 max-sm:rounded-xl rounded-md transition-all'}
          to={'play'}
        >
          Play
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? 'bg-sky-400 text-white' : 'hover:bg-gray-300 hover:text-black') + ' ' + 'max-sm:p-4 p-2 max-sm:rounded-xl rounded-md transition-all'}
          to={'score'}
        >
          Score
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? 'bg-sky-400 text-white' : 'hover:bg-gray-300 hover:text-black') + ' ' + 'max-sm:p-4 p-2 max-sm:rounded-xl rounded-md transition-all'}
          to={'about'}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}

Error.propTypes = {
  className: PropTypes.string,
};

Loading.propTypes = Error.propTypes;

RipperLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  to: PropTypes.string.isRequired,
};

RipperButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func.isRequired,
};
