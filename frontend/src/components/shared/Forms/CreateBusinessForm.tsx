"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateBusinessSchema } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";
import { createBusinessAction } from "@/lib/actions/business.actions";
import { useRouter } from "next/navigation";

export default function CreateBusinessForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateBusinessSchema>>({
    resolver: zodResolver(CreateBusinessSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
      contactPerson: "",
      email: "",
      category: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof CreateBusinessSchema>) {
    setIsSubmitting(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      setTimeout(async () => {
        const response = await createBusinessAction(formData);

        if (response?.errorMessage) {
          toast({
            className: "bg-red-500 text-white text-md font-medium",
            title: response.errorMessage,
          });
        } else {
          toast({
            className: "bg-green-500 text-white text-md font-medium",
            title: "Business was added sucessfully",
          });
          setIsSubmitting(false);
          router.push("/business");
        }
      }, 2000);
    } catch (error) {
      toast({
        className: "bg-red-500 text-white text-md font-medium",
        title: "Something went wrong please try again.",
      });
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create a Business</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter business title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your business"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Business Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    {...fieldValues}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      fieldValues.onChange(file);
                      handleImageChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Upload an image for your business (max 5MB).
                </FormDescription>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 rounded-md max-w-xs"
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact person's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                    <SelectItem value="Repair">Repair</SelectItem>
                    <SelectItem value="Painting">Painting</SelectItem>
                    <SelectItem value="Shifting">Shifting</SelectItem>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the category that best fits your business.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            {isSubmitting ? "Creating..." : "Create Business"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
