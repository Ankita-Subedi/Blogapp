"Use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({
  img = "https://images.pexels.com/photos/31050187/pexels-photo-31050187/free-photo-of-seagulls-on-a-pebble-beach-by-the-water.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  title = "Title",
  author = "Author",
  description = "Description",
  blogDetailRoute,
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
      <div className="flex flex-col gap-0.5 lg:w-[800px]">
        <p className="text-2xl font-semibold">{title}</p>
        <p>
          <span className="font-semibold">Author:</span> {author}
        </p>
        <p className="line-clamp-3 w-[300px] md:w-[700px]">
          {description} Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Exercitationem nihil esse voluptatum quae? Deserunt aperiam sint
          quas aliquam aut odit mollitia est adipisci commodi atque saepe ea
          obcaecati, distinctio quos? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Expedita amet quis debitis veniam asperiores ipsa
          eligendi suscipit, autem a officia esse saepe nobis, provident at sit
          veritatis, doloribus velit. Sint!
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
    </div>
  );
};

export default BlogCard;
