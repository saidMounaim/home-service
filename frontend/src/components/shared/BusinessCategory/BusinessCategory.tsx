"use client";

import { getBusinessByCategoryAction } from "@/lib/actions/business.actions";
import { useQuery } from "@tanstack/react-query";
import BusinessCard from "../Business/BusinessCard";
import { BusinessProps } from "@/lib/types";
import Loading from "./Loading";
import Error from "./Error";

export default function BusinessCategory({ category }: { category: string }) {
  const {
    data: business,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["business", category],
    queryFn: () => getBusinessByCategoryAction(category),
  });

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {business.length == 0 && <h1>Currently, there are no businesses</h1>}
      {business?.map((bu: BusinessProps) => (
        <BusinessCard key={bu.id} business={bu} />
      ))}
    </div>
  );
}
