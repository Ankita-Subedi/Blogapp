"use client";

import { useState, useEffect } from "react";

import { fetchPostById } from "@/services/post";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import BlogDetailCard from "@/components/BlogDetailCard";

// Post detail page component
const PostDetailPage = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  // Fetch post data based on the ID
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const postData = await fetchPostById(id as string);
          setPost(postData);
        } catch (err: any) {
          setError(err?.response?.data?.message || "Failed to load post");
          toast.error("Failed to load post.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <BlogDetailCard
        img={post.photo && `${BASE_URL}/${post.photo}`}
        title={post.title}
        author={post.author.name}
        description={post.content}
      />
    </div>
  );
};

export default PostDetailPage;
