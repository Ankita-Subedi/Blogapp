"use client";

import { useState, useEffect } from "react";

import { fetchPostById } from "@/services/post";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import BlogDetailCard from "@/components/BlogDetailCard";

// Post detail page component
const PostDetailPage = () => {
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
      {/* <Image
        alt="thumbnail"
        src={
          post.img ||
          "https://images.pexels.com/photos/31050187/pexels-photo-31050187/free-photo-of-seagulls-on-a-pebble-beach-by-the-water.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        }
        width={600}
        height={400}
        className="w-[500px] object-cover rounded-md"
      />
      <p className="text-2xl">{post.title}</p>
      <p className="text-gray-500 text-md">
        By {post.author?.name || "Unknown Author"}
      </p>
      <p className="w-[20px]">{post.content}</p> */}

      <BlogDetailCard
        title={post.title}
        author={post.author.name}
        description={post.content}
      />
    </div>
  );
};

export default PostDetailPage;
