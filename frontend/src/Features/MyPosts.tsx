"use client";

import MyPostCard from "@/components/MyPostCard";
import Pagination from "@/components/Pagination";
import { deletePost, fetchMyPosts } from "@/services/post"; // import delete API
import { IPost } from "@/Types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MyPosts = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const getPosts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        toast.error("You need to log in to view your posts!");
        throw new Error("No token found. Please login.");
      }
      try {
        const fetchedPosts = await fetchMyPosts(currentPage);
        setPosts(fetchedPosts.posts);
        setTotalPages(fetchedPosts.metadata.totalPages);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Something went wrong!");
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [currentPage, error]);

  // ✅ Handle Delete Function
  const handleDelete = async (postId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You need to log in to view your posts!");
      setTimeout(() => {
        router.replace("/login");
      }, 1500);
      return;
    }

    try {
      await deletePost(postId);
      toast.success("Post deleted successfully!");
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete post!");
    }
  };

  const handleEdit = (postId: string) => {
    router.push(`/edit-post/${postId}`); // Navigate to the edit page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <div>
        {posts.map((post) => {
          const imageUrl = post.photo ? `${BASE_URL}/${post.photo}` : undefined;
          return (
            <MyPostCard
              key={post._id}
              title={post.title}
              author={post.author?.name || "Unknown Author"}
              description={post.content}
              blogDetailRoute={`/post-detail/${post._id}`}
              img={imageUrl}
              trashApi={() => handleDelete(post._id)}
              editApi={() => handleEdit(post._id)}
            />
          );
        })}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};
export default MyPosts;
