import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import type { Blog } from "types/blog.type";
import { BlogCard } from "@components/blog/BlogCard";
import { config } from "@/lib/config";

type BlogPreviewProps = {
  blog: Blog;
};
const BlogPreview: NextPage<BlogPreviewProps> = props => {
  const { blog } = props;
  return (
    <div>
      <BlogCard {...blog} isDetails/>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  BlogPreviewProps
> = async context => {
  const idBlog = context.params?.id;
  const response = await fetch(`${config.urls.serverUri}/${idBlog}`);
  const result = await response.json();
  return {
    props: {
      blog: result,
    },
  };
};

export default BlogPreview;
