import { notFound } from "next/navigation";
import { getBusinessByCategoryAction } from "@/lib/actions/business.actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BusinessCategory from "@/components/shared/BusinessCategory/BusinessCategory";

interface BusinessCategoryProps {
  params: {
    name: string;
  };
}

enum BusinessCategoryEnum {
  Cleaning = "Cleaning",
  Repair = "Repair",
  Painting = "Painting",
  Shifting = "Shifting",
  Plumbing = "Plumbing",
  Electric = "Electric",
}

export default function BusinessCategoryPage({
  params,
}: BusinessCategoryProps) {
  const categoryName = params.name;

  const isValidCategory = Object.values(BusinessCategoryEnum).includes(
    categoryName as BusinessCategoryEnum
  );

  if (!isValidCategory) notFound();

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["businessCategory"],
    queryFn: () => getBusinessByCategoryAction(categoryName),
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-orange-600 mb-10">
        {categoryName}
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BusinessCategory category={categoryName} />
      </HydrationBoundary>
    </div>
  );
}
