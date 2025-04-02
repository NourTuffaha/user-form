"use server"

import { z } from "zod"
import { updateUserProfile } from "@/lib/api"
import { UserProfile } from "@/lib/interfaces/user"

export type FormState = {
  errors?: {
    name?: string[]
    email?: string[]
    bio?: string[]
  }
  message?: string
}

const ProfileFormSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  bio: z.string().max(200, { message: "Bio cannot exceed 200 characters" }).optional(),
   profileImage: z.string().optional()
})

export async function submitProfileForm(prevState: FormState, formData: FormData): Promise<FormState> {
  // Extract form data
  const rawFormData = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    bio: formData.get("bio") as string,
  }

  // Validate form data
  const validatedFields = ProfileFormSchema.safeParse(rawFormData)

  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors above",
    }
  }

  try {
    // Call the API to update the profile
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedProfile = await updateUserProfile(validatedFields.data as UserProfile)

    // Return success message
    return {
      message: "success",
    }
  } catch (error) {
    // Handle API errors
    console.error("Error updating profile:", error)
    return {
      message: error instanceof Error ? error.message : "Failed to update profile. Please try again.",
    }
  }
}

