"use client";

import BusinessCard from "@/components/shared/Business/BusinessCard";
import Error from "@/components/shared/Business/Error";
import Loading from "@/components/shared/Business/Loading";
import { fetchBusinessAction } from "@/lib/actions/business.actions";
import { BusinessProps } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function BunisessGrid() {
  const {
    data: business,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["business"],
    queryFn: () => fetchBusinessAction(),
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
