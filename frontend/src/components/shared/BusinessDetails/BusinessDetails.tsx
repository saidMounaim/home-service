"use client";

import { getSingleBusinessAction } from "@/lib/actions/business.actions";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import Error from "./Error";
import { notFound } from "next/navigation";
import { Contact2Icon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BusinessDetails({
  businessSlug,
}: {
  businessSlug: string;
}) {
  const {
    data: business,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["BusinessDetails", businessSlug],
    queryFn: () => getSingleBusinessAction(businessSlug),
  });

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  if (!business) notFound();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4">
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-bold">{business.title}</h1>
            <p className="text-muted-foreground">{business.category}</p>
          </div>
          <Image
            src={business.image}
            alt={business.title}
            width={800}
            height={500}
            className="w-full h-[400px] object-cover rounded-lg"
            style={{ aspectRatio: "800/500", objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Contact2Icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">
                {business.contactPerson}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">{business.email}</span>
            </div>
            <Button
              size="lg"
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              Book Now
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl medium">About the Service</h2>
            <p className="text-md">{business.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
