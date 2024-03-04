import Link from "next/link";

export default function Home() {
  return (
    <div className="py-4">
      <div className="container flex items-center justify-between">
        <h1 className="font-bold text-xl">EKRYLY</h1>
        <ul className="flex gap-6">
          <li className="cursor-pointer">Become a renter</li>
          <li className="cursor-pointer">Rently deals</li>
          <li className="cursor-pointer">How it work</li>
          <li className="cursor-pointer">Why choose us</li>
        </ul>
        <ul className="flex gap-6">
          <Link href="/signin" className="cursor-pointer">
            Sign in
          </Link>
          <Link href="/signup" className="cursor-pointer">
            Sign up
          </Link>
        </ul>
      </div>
    </div>
  );
}
