import { z } from "zod"

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  bio: z.string().max(200, { message: "Bio cannot exceed 200 characters" }).optional(),
  profileImage: z.string().optional(),
})

export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>

// Client-side validation
export const validateName = (name: unknown): string | null => {
  try {
    z.string().min(2, { message: "Name must be at least 2 characters long" }).parse(name);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      if (error.issues[0].code === 'invalid_type') {
        return 'Invalid name';
      }
      return error.issues[0].message;
    }
    return 'Invalid name';
  }
};
export const validateEmail = (email: unknown): string | null => {
  try {
    z.string().email({ message: "Please enter a valid email address" }).parse(email);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      if (error.issues[0].code === 'invalid_type') {
        return 'Invalid email';
      }
      return error.issues[0].message;
    }
    return 'Invalid email';
  }
};

export const validateBio = (bio: unknown): string | null => {
  try {
    z.string().max(200, { message: "Bio cannot exceed 200 characters" }).optional().parse(bio);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      if (error.issues[0].code === 'invalid_type') {
        return 'Invalid bio';
      }
      return error.issues[0].message;
    }
    return 'Invalid bio';
  }
};
