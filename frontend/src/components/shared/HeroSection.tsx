import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategoriesGrid from "./CategoriesGrid";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-orange-100 py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Find Your Perfect <span className="text-orange-500">Home</span>{" "}
          Service
        </h1>
        <p className="mb-8 text-xl text-gray-600 md:text-2xl">
          Connecting you with trusted professionals for all your home needs
        </p>
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for a service..."
              className="h-14 w-full rounded-full pl-6 pr-16 text-lg shadow-lg bg-white focus:ring-2 focus:ring-orange-300"
            />
            <Button
              type="submit"
              className="absolute right-2 top-2 h-10 w-10 rounded-full bg-orange-500 p-0 hover:bg-orange-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </div>
      <CategoriesGrid />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
