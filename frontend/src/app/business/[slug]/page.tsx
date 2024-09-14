import BusinessDetails from "@/components/shared/BusinessDetails/BusinessDetails";
import { getSingleBusinessAction } from "@/lib/actions/business.actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface BusinessDetailsProps {
  params: {
    slug: string;
  };
}
export default async function BusinessDetailsPage({
  params,
}: BusinessDetailsProps) {
  const businessSlug: string = params.slug;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["BusinessDetails"],
    queryFn: () => getSingleBusinessAction(businessSlug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BusinessDetails businessSlug={businessSlug} />
    </HydrationBoundary>
  );
}
