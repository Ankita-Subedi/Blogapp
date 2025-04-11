"use client";

import EditBlogForm from "@/components/EditBlogForm";
import { fetchPostById } from "@/services/post";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPage = () => {
  const params = useParams();
  const postId = params?.postId as string;

  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      fetchPostById(postId)
        .then((data) => {
          setPostData(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [postId]);

  if (loading) return <div>Loading...</div>;
  if (!postData) return <div>Post not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <EditBlogForm postData={postData} />
    </div>
  );
};

export default EditPage;
