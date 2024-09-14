import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Error() {
  return (
    <div className="container mx-auto mt-5">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Unable to fetch business by category, please try again
        </AlertDescription>
      </Alert>
    </div>
  );
}
