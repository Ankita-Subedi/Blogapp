"Use client";

import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MyPostCard = ({
  img = "https://images.pexels.com/photos/31050187/pexels-photo-31050187/free-photo-of-seagulls-on-a-pebble-beach-by-the-water.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  title = "Title",
  author = "Author",
  description = "Description",
  blogDetailRoute,
  trashApi,
  editApi,
}) => {
  return (
    <div className="flex flex-col gap-2.5 mb-5 items-center md:flex-row md:gap-4 md:my-10">
      <Image
        alt="thumbnail"
        src={img}
        width={600}
        height={400}
        className="w-[300px] object-cover rounded-md"
      />
      <div>
        <div className="flex flex-col gap-0.5 lg:w-[800px]">
          <p className="text-2xl font-semibold">{title}</p>
          <p>
            <span className="font-semibold">Author:</span> {author}
          </p>
          <p className="line-clamp-3 w-[300px] md:w-[400px] lg:w-[700px]">
            {description}
          </p>
          {blogDetailRoute && (
            <Link
              href={blogDetailRoute}
              className="px-4 py-1.5 bg-black text-white w-[100px] rounded-md my-1.5 text-sm"
            >
              View More
            </Link>
          )}
        </div>
        <div className="flex gap-2 cursor- text-sm cursor-pointer">
          <Trash
            onClick={trashApi}
            className="text-red-500 hover:scale-110 transition"
          />
          <Pencil
            onClick={editApi}
            className="text-blue-500 hover:scale-110 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default MyPostCard;
