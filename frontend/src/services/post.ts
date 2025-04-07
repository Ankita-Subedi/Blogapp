import instance from "@/lib/axios/instance";

// This function fetches all posts and returns an IPostResponse
export const fetchPosts = async (page: number = 1): Promise<IPostResponse> => {
  try {
    const res = await instance.get<IPostResponse>(`/posts?page=${page}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchMyPosts = async (
  page: number = 1
): Promise<IPostResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found. Please login.");
  }

  try {
    const res = await instance.get<IPostResponse>(
      `/posts/my-posts?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the Authorization header
        },
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export interface IPost {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author?: string;
  name: string;
}

interface IPostResponse {
  posts: IPost[];
  metadata: {
    totalPages: number;
    totalPosts: number;
    page: number;
    limit: number;
  };
}
