"use server";

import { revalidatePath } from "next/cache";
import { appointmentDataProps } from "../types";

const apiUrl = process.env.API_URL;

export async function fetchBusinessAction() {
  if (!apiUrl) {
    throw new Error("API_URL is not defined in environment variables");
  }

  try {
    const response = await fetch(`${apiUrl}/business`);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Unable to fetch business data");
    }

    return response.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong, please try again");
  }
}

export async function getSingleBusinessAction(slug: string) {
  if (!apiUrl) {
    throw new Error("API_URL is not defined in environment variables");
  }
  try {
    const response = await fetch(`${apiUrl}/business/${slug}`);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message || "Unable to fetch single business data"
      );
    }

    return response.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong, please try again");
  }
}

export async function getBusinessByCategoryAction(category: string) {
  if (!apiUrl) {
    throw new Error("API_URL is not defined in environment variables");
  }
  try {
    const response = await fetch(`${apiUrl}/business/category/${category}`);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message || "Unable to fetch business by category data"
      );
    }

    return response.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong, please try again");
  }
}

export async function createBusinessAction(businessData: FormData) {
  if (!apiUrl) {
    return { errorMessage: "API_URL is not defined in environment variables" };
  }
  try {
    const response = await fetch(`${process.env.API_URL}/business`, {
      method: "POST",
      body: businessData,
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        errorMessage: errorResponse.message || "Unable to create business",
      };
    }
    return response.json();
  } catch (error: any) {
    return {
      errorMessage: error.message || "Something went wrong, please try again",
    };
  }
}

export async function makeAppointmentAction(
  appointmentData: appointmentDataProps,
  pathname: string
) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/business/appointment/create`,
      {
        method: "POST",
        body: JSON.stringify(appointmentData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        errorMessage: errorResponse.message || "Unable to make an appointment",
      };
    }
    return response.json();
    revalidatePath(pathname);
  } catch (error: any) {
    return {
      errorMessage: error.message || "Something went wrong, please try again",
    };
  }
}
