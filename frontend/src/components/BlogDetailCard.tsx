"Use client";

import Image from "next/image";
import React from "react";

const BlogDetailCard = ({
  img = "https://images.pexels.com/photos/31050187/pexels-photo-31050187/free-photo-of-seagulls-on-a-pebble-beach-by-the-water.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  title = "Title",
  author = "Author",
  description = "Description",
}) => {
  return (
    <div className="flex flex-col gap-2.5 mb-5 items-center md:gap-4 md:my-10">
      <Image
        alt="thumbnail"
        src={img}
        width={600}
        height={400}
        className="w-[300px] md:w-[500px] lg:w-[600px] lg:h-[300px] object-cover rounded-md"
      />
      <div className="flex flex-col items-center gap-0.5 lg:w-[800px]">
        <p className="text-2xl font-semibold">{title}</p>
        <p>
          <span className="font-semibold">Author:</span> {author}
        </p>
        <p className=" max-w-[300px] md:max-w-[400px] lg:max-w-[700px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default BlogDetailCard;
