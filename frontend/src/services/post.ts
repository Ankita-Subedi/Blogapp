import instance from "@/lib/axios/instance";
import { IPostResponse, IPostData, ICreatePostResponse } from "@/Types/types";

// ALL POST OF ALL USERS
export const fetchPosts = async (page: number = 1): Promise<IPostResponse> => {
  try {
    const res = await instance.get<IPostResponse>(`/posts?page=${page}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

//ALL POST BUT ONLY MY
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

//CREATE A POST
export const createPost = async (
  iPostData: IPostData
): Promise<ICreatePostResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found. Please login.");
  }
  try {
    const formData = new FormData();
    formData.append("title", iPostData.title);
    formData.append("content", iPostData.content);
    if (iPostData.photo) {
      formData.append("photo", iPostData.photo);
    }

    const res = await instance.post<ICreatePostResponse>(
      `/posts/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

//FETCH POST BY ID
export const fetchPostById = async (id: string) => {
  try {
    const response = await instance.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//DELETING A POST
export const deletePost = async (id: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found. Please login.");
  }
  console.log("This is before instance call");
  try {
    const response = await instance.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("This is after instance call", response);

    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

// UPDATE A POST
export const updatePost = async (
  postId: string, // Post ID to update
  iPostData: IPostData // Updated post data
): Promise<ICreatePostResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found. Please login.");
  }

  try {
    const formData = new FormData();
    formData.append("title", iPostData.title);
    formData.append("content", iPostData.content);
    if (iPostData.photo) {
      formData.append("photo", iPostData.photo); // Optional photo update
    }

    const res = await instance.put<ICreatePostResponse>(
      `/posts/${postId}/update`, // Your endpoint should accept a post ID
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
