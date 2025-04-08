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
    if (iPostData.image) {
      formData.append("image", iPostData.image); // image must be appended
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

export const deletePost = async (id: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found. Please login.");
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT to extract userId
  const userId = decodedToken.sub; // Assuming `sub` is the userId

  try {
    const response = await instance.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { userId }, // Make sure userId is part of the request body
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const editPost = async (id: string, updatedData: any) => {
  try {
    const response = await instance.put(`/posts/${id}/update`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
