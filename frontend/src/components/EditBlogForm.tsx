/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import { useRouter } from "next/navigation"; // <-- import router for redirect
import { postSchema } from "@/lib/validations/post";
import { updatePost } from "@/services/post";
import { EditBlogFormProps } from "@/Types/types";

const EditBlogForm: React.FC<EditBlogFormProps> = ({ postData }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter(); // <-- initialize router

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: postData?.title || "",
      content: postData?.content || "",
    },
  });

  useEffect(() => {
    if (postData?.photo) {
      let imageUrl = "";

      if (typeof postData.photo === "string") {
        // If the photo already includes uploads/.. then add API URL
        if (postData.photo.startsWith("uploads/")) {
          imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${postData.photo}`;
        } else {
          // In case it's already a full URL, no need to prepend
          imageUrl = postData.photo;
        }
      } else {
        // If it's a File object (during edit form)
        imageUrl = URL.createObjectURL(postData.photo);
      }

      setPreviewImage(imageUrl);
    }
  }, [postData]);

  console.log(postData);

  const onSubmit = async (data: z.infer<typeof postSchema>) => {
    try {
      console.log("Updating post with data:", data);

      const file = data.photo?.[0];

      const formDataToSend = {
        title: data.title,
        content: data.content,
        photo: file || postData.photo, // If no new photo uploaded, ignore
      };

      await updatePost(postData._id, formDataToSend);

      toast.success("Post updated successfully! 🎉");

      // Redirect user after successful update
      router.push("/my-posts"); //
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          {...register("title")}
          className="w-full p-2 border rounded"
          placeholder="Enter title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Content</label>
        <textarea
          {...register("content")}
          className="w-full p-2 border rounded"
          placeholder="Enter content"
          rows={6}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Photo</label>
        <input type="file" {...register("photo")} accept="image/*" />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Post
      </button>
    </form>
  );
};

export default EditBlogForm;
