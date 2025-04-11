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
  photo: string;
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
  photo: File | null;
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

export interface AddBlogFormProps {
  isEdit: boolean;
  postData?: { title: string; content: string; photo: File | string }; // Optional for edit mode
  onFormSubmit: () => (data: {
    title: string;
    content: string;
    photo: unknown;
  }) => void;
}

export interface EditBlogFormProps {
  postData: {
    _id: string; // Post Id
    title: string;
    content: string;
    photo: string; // existing image URL
  };
}
