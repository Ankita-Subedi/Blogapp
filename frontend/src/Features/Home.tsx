"use client";

import { useEffect, useState } from "react";
import { fetchPosts, IPost } from "@/services/post";
import { toast } from "react-toastify";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination"; // Import Pagination
import { useSearchParams } from "next/navigation";

const PostsPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Get the current page from search params
  const currentPage = Number(searchParams.get("page") || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts(currentPage); // Fetch posts for the current page
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
            img={post.photo}
            key={post._id}
            title={post.title}
            author={post.author || "Unknown Author"}
            description={post.content}
            blogDetailRoute={`/post-detail/${post._id}`}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default PostsPage;
