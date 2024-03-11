import { AiOutlineLoading } from 'react-icons/ai';
import { RiSignalWifiErrorFill } from 'react-icons/ri';

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

export function NavigateButton(){
  return <></>
}

export function CustomButton(){
  return <></>
}


export function Character(){
  return <></>
}


export function GameResult(){
  return <></>
}


export function Dropdown(){
  return <></>
}


export function DropdownButton(){
  return <></>
}