"use client";

import { useEffect, useState } from "react";
import { fetchPosts, IPost } from "@/services/post";
import { toast } from "react-toastify";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination"; // Import Pagination
import { useSearchParams } from "next/navigation";

const PostsPage = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
        {posts.map((post) => {
          const imageUrl = post.photo ? `${BASE_URL}/${post.photo}` : undefined;

          return (
            <BlogCard
              key={post._id}
              img={imageUrl} // <-- Pass the img to BlogCard
              title={post.title}
              author={post.author}
              description={post.description}
              blogDetailRoute={`/post-detail/${post._id}`}
            />
          );
        })}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default PostsPage;

// blogDetailRoute={`/post-detail/${post._id}`}
