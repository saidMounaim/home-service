import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-orange-500"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-800">Home Service</h1>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Button
              asChild
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
          <Button className="md:hidden" variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
