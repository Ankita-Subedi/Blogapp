/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { editPostSchema } from "@/lib/validations/post";
import { updatePost } from "@/services/post";
import { EditBlogFormProps } from "@/Types/types";
import { env } from "@/constants/env";

const EditBlogForm: React.FC<EditBlogFormProps> = ({ postData }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: postData?.title || "",
      content: postData?.content || "",
      hasExistingPhoto: !!postData.photo,
    },
  });

  useEffect(() => {
    if (postData?.photo && typeof postData.photo === "string") {
      const imageUrl = postData.photo.startsWith("uploads/")
        ? `${env.NEXT_PUBLIC_BASE_URL}/${postData.photo}`
        : postData.photo;

      setPreviewImage(imageUrl);
    }
  }, [postData]);

  const onSubmit = async (data: z.infer<typeof editPostSchema>) => {
    const file = data.photo?.[0];

    const formDataToSend = {
      title: data.title ?? postData.title,
      content: data.content ?? postData.content,
      photo: file || postData.photo,
    };

    if (file) {
      formDataToSend.photo = file;
    }
    updatePost(postData._id, formDataToSend)
      .then(() => {
        toast.success("Post updated successfully! 🎉");
        router.push("/my-posts");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        toast.error(error.response.data.message);
      });
  };
  console.log(errors);
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
        <input
          type="file"
          accept="image/*"
          {...register("photo")}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              console.log(file);
              const imageUrl = URL.createObjectURL(file);
              setPreviewImage(imageUrl);
              setSelectedFileName(file.name);
            } else {
              setSelectedFileName(null);
            }
          }}
        />
        {selectedFileName ? (
          <p className="text-sm text-gray-600 mt-1">
            Selected file:{" "}
            <span className="font-medium">{selectedFileName}</span>
          </p>
        ) : postData.photo ? (
          <p className="text-sm text-gray-600 mt-1">
            Current file:{" "}
            <span className="font-medium">
              {postData.photo.split("/").pop()}
            </span>
          </p>
        ) : null}

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md mt-2"
          />
        )}

        {errors.photo?.message == "string" && (
          <p className="text-red-500 text-sm">{errors.photo.message}</p>
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
