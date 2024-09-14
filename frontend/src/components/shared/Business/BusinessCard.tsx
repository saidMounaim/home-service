import { BusinessProps } from "@/lib/types";
import { Button } from "../../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function BusinessCard({
  business,
}: {
  business: BusinessProps;
}) {
  return (
    <div className="rounded-lg bg-card p-6 shadow-lg">
      <div className="relative h-48 overflow-hidden rounded-lg">
        <Image
          src={business.image}
          alt={business.title}
          width={400}
          height={300}
          className="h-full w-full object-cover"
          style={{ aspectRatio: "400/300", objectFit: "cover" }}
        />
      </div>
      <div className="mt-4">
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          {business.category}
        </span>
        <h3 className="mt-2 text-xl font-bold">{business.title}</h3>
        <p className="mt-2 text-muted-foreground">{business.contactPerson}</p>
        <div className="mt-4">
          <Button
            size="sm"
            className="w-full bg-orange-500 text-white hover:bg-orange-600"
            asChild
          >
            <Link href={`/business/${business.slug}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
