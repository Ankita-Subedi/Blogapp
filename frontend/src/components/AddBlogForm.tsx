"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createPost } from "@/services/post";
import { toast } from "react-toastify";
import { postSchema } from "@/lib/validations/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

const AddBlogForm = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: z.infer<typeof postSchema>) => {
    console.log("Form submitted with data:", data);

    createPost(data)
      .then((res) => {
        console.log(res);
        toast.success("Post created successfully!");
        setPreviewImage(null);
        reset();
      })
      .catch((err) => {
        console.log(err);
        const message = err?.response?.data?.message || "Something went wrong!";
        toast.error(message);
      })
      .finally(() => {
        console.log("Create post request finished.");
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Upload Photo */}
        <div>
          <label className="block text-sm font-medium mb-1 md:text-lg">
            Upload Photo
          </label>
          <input
            type="file"
            className="w-full border rounded-lg p-2 text-sm"
            {...register("image")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
          />
          {typeof errors.image?.message === "string" && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}

          {/* Preview Image */}
          {previewImage && (
            <div className="mt-2">
              <Image
                src={previewImage}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1 md:text-lg">
            Enter Title
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1 md:text-lg">
            Enter Description
          </label>
          <textarea
            className="w-full border rounded-lg p-2 text-sm"
            rows={4}
            placeholder="Description"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default AddBlogForm;
