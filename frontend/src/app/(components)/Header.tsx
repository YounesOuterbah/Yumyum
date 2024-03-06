import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

export default function Header() {
  return (
    <div className="py-3">
      <div className="container flex items-center justify-between">
        <Link href="/" className="font-bold flex items-center text-xl">
          <img src="/location.png" className="size-6" alt="ekrely logo" />
          EKRYLY
        </Link>
        <ul className="flex gap-6 items-center">
          <Link
            href="/add"
            className="cursor-pointer duration-300 hover:bg-black/5 size-10 p-2 rounded-full"
          >
            <IoIosAddCircleOutline className="text-2xl text-mainBlue" />
          </Link>
          <Link
            href="/signin"
            className="cursor-pointer duration-300 hover:bg-black/5 size-10 rounded-full flex items-center justify-center"
          >
            <IoPerson className="text-2xl text-mainBlue" />
          </Link>
          <li className="cursor-pointer duration-300 hover:bg-black/5 size-10 rounded-full flex items-center justify-center">
            <img src="/us.png" className="size-6" alt="dz lang" />
          </li>
        </ul>
      </div>
    </div>
  );
}
