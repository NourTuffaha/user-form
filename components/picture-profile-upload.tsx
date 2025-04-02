"use client";

import type React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import { uploadProfileImage } from "@/lib/api";

interface ProfilePictureUploadProps {
  initialImage?: string;
  userId: string;
  onImageChange: (imageUrl: string) => void;
}

export default function ProfilePictureUpload({
  userId,
  onImageChange,
}: ProfilePictureUploadProps) {
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Mock client side validation => file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    //  Mock client side validation => file type
    if (!file.type.startsWith("image/")) {
      setError("File must be an image");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // Create a local preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      // Mock image upload
      const imageUrl = await uploadProfileImage(userId, file);
      onImageChange(imageUrl);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage("/images/ph.jpg");
    onImageChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        <div
          className={`relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md ${
            isUploading ? "opacity-60" : ""
          }`}
        >
          <Image
            src={image || "/images/ph.jpg"}
            alt="Profile picture"
            fill
            className="object-cover"
            priority
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleImageClick}
          className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-colors"
          disabled={isUploading}
        >
          <Camera className="w-4 h-4" />
        </button>

        {image !== "/images/pg.jpg" && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
            disabled={isUploading}
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />

      <input type="hidden" name="profileImage" value={image} />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <p className="text-sm text-gray-500 mt-2">
        Click the camera icon to upload a profile picture
      </p>
    </div>
  );
}
