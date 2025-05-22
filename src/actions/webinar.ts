"use server";

import { WebinarFormState } from "@/store/useWebinarStore";
import { inAuthenticateUser, onAuthenticateUser } from "./auth";

export const createWebinar = async (formData: WebinarFormState) => {
  try {
    const user = await onAuthenticateUser();
    if (!user.user) {
      return {
        status: 401,
        message: "Unauthorized",
      };
    }
  } catch (error) {
    console.log(error);
  }
};
