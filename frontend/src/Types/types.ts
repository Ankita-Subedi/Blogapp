export interface ILoginResponse {
  token: string;
}

export interface IPost {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author?: string;
  name: string;
}

export interface IPostResponse {
  posts: IPost[];
  metadata: {
    totalPages: number;
    totalPosts: number;
    page: number;
    limit: number;
  };
}

export interface IPostData {
  title: string;
  content: string;
  image?: File;
}

export interface ICreatePostResponse {
  message: string;
  blog: {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
