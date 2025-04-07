"use client";

import { useEffect, useState } from "react";
import { fetchMyPosts, IPost } from "@/services/post";
import { toast } from "react-toastify";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination"; // Import Pagination
import { useSearchParams } from "next/navigation";

const MyPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Get the current page from search params
  const currentPage = Number(searchParams.get("page") || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        window.location.href = "/login";
        toast.error("You need to log in to view your posts!");
        throw new Error("No token found. Please login.");
      }
      try {
        const fetchedPosts = await fetchMyPosts(currentPage); // Fetch posts for the current page
        setPosts(fetchedPosts.posts);
        setTotalPages(fetchedPosts.metadata.totalPages); // Set total pages
      } catch (err: any) {
        setError(err?.response?.data?.message || "Something went wrong!");
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [currentPage, error]); // Refetch posts if currentPage or error changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <div>
        {posts.map((post) => (
          <BlogCard
            key={post._id}
            title={post.title}
            author={post.author?.name || "Unknown Author"} // Access author name properly
            description={post.content}
            blogDetailRoute={`/posts/${post._id}`}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default MyPosts;
