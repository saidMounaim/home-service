import {
  Wrench,
  Paintbrush,
  Package,
  Droplet,
  Zap,
  HouseIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const categories = [
  { name: "Cleaning", icon: <HouseIcon />, href: "/category/Cleaning" },
  { name: "Repair", icon: <Wrench />, href: "/category/Repair" },
  { name: "Painting", icon: <Paintbrush />, href: "/category/Painting" },
  { name: "Shifting", icon: <Package />, href: "/category/Shifting" },
  { name: "Plumbing", icon: <Droplet />, href: "/category/Plumbing" },
  { name: "Electric", icon: <Zap />, href: "/category/Electric" },
];

export default function CategoriesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-5">
      {categories.map((category) => (
        <Link
          href={category.href}
          key={category.name}
          className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <div className="bg-orange-100 p-3 rounded-full mb-4">
              {React.cloneElement(category.icon, {
                className: "w-8 h-8 text-orange-500",
              })}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {category.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
