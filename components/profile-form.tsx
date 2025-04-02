"use client";

import type React from "react";
import { useActionState, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitProfileForm } from "@/lib/actions/user.actions";
import { UserProfile } from "@/lib/interfaces/user";
import FormInput from "@/components/ui/form-input";
import { validateBio, validateEmail, validateName } from "@/lib/validation";
import ProfilePictureUpload from "./picture-profile-upload";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/lib/translations";

interface ProfileFormProps {
  initialData: UserProfile;
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const { language, direction } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState<UserProfile>(initialData);
  const [isPending, startTransition] = useTransition();

  // Client-side validation errors
  const [clientErrors, setClientErrors] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const initialState = { errors: {}, message: "" };
  const [state, action, pending] = useActionState(
    submitProfileForm,
    initialState
  );

  const isSubmitting = isPending || pending;

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // client-side validation
    if (name === "name") {
      const error = validateName(value);
      setClientErrors((prev) => ({ ...prev, name: error || "" }));
    } else if (name === "email") {
      const error = validateEmail(value);
      setClientErrors((prev) => ({ ...prev, email: error || "" }));
    } else if (name === "bio") {
      const error = validateBio(value);
      setClientErrors((prev) => ({ ...prev, bio: error || "" }));
    }
  };

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const toastId = toast.loading("Saving changes...", {
        description: "Your profile is being updated.",
      });

      // Submit the form
      const result = await action(formData);

      // @ts-expect-error: result?.errors doesn't exist on type never
      if (result?.errors && Object.keys(result.errors).length > 0) {
        toast.error("Error", {
          id: toastId,
          description: "There were errors updating your profile.",
        });
      } else {
        // No errors means success
        toast.success("Profile updated", {
          id: toastId,
          description: "Your profile has been successfully updated.",
        });
      }
    });
  };

  return (
    <form
      action={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
    >
      <h1 dir={direction} className="text-3xl font-bold mb-6">
        {t.userProfile}
      </h1>
      <ProfilePictureUpload
        initialImage={formData.profileImage}
        userId={formData.id}
        onImageChange={handleImageChange}
      />
      <div dir={direction}>
        <FormInput
          id="name"
          label={t.nameLabel}
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          error={clientErrors.name || state?.errors?.name?.[0]}
        />

        <FormInput
          id="email"
          label={t.emailLabel}
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
          error={clientErrors.email || state?.errors?.email?.[0]}
        />

        <FormInput
          id="bio"
          label={t.bioLabel}
          value={formData.bio || ""}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          multiline
          maxLength={200}
          error={clientErrors.bio || state?.errors?.bio?.[0]}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.saving}...
              </>
            ) : (
              t.saveChanges || "Save Changes"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
