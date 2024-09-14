"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AppointmentFormSchema } from "@/lib/validations";
import { makeAppointmentAction } from "@/lib/actions/business.actions";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function AppointmentForm({
  businessId,
}: {
  businessId: string;
}) {
  const { toast } = useToast();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof AppointmentFormSchema>>({
    resolver: zodResolver(AppointmentFormSchema),
    defaultValues: {
      date: undefined,
      timeSlot: "",
      note: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormSchema>) {
    const appointmentData = {
      ...values,
      date: new Date(values.date),
      businessId,
    };
    try {
      setTimeout(async () => {
        const response = await makeAppointmentAction(appointmentData, pathname);
        console.log(response);
        if (response?.errorMessage) {
          toast({
            className: "bg-red-500 text-white text-md font-medium",
            title: response.errorMessage,
          });
        } else {
          toast({
            className: "bg-green-500 text-white text-md font-medium",
            title: "Appointment was added sucessfully",
          });
          form.reset();
        }
      }, 2000);
    } catch (error) {
      toast({
        className: "bg-red-500 text-white text-md font-medium",
        title: "Something went wrong please try again.",
      });
    }
  }

  return (
    <>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
          <CardDescription>
            Fill out the form to schedule an appointment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time slot</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                          <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional details"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-orange-500 text-white hover:bg-orange-600"
                disabled={form.formState.isSubmitting}
              >
                Book Appointment
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
