import { fetchBusinessAction } from "@/lib/actions/business.actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BunisessGrid from "./BusinessGrid";

export default function BusinessPage() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["business"],
    queryFn: () => fetchBusinessAction(),
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-orange-600 mb-10">Business</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BunisessGrid />
      </HydrationBoundary>
    </div>
  );
}
