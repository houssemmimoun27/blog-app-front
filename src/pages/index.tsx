import { useCallback, useEffect, useMemo, useState } from "react";
import { config } from "../lib/config";
import { useRouter } from "next/router";
import type { GetServerSideProps, NextPage } from "next";
import type { NextRouter } from "next/router";
import type { Blog } from "../types/blog.type";
import type { Config } from "@/types/config.type";
import { BlogCard } from "@components/blog/BlogCard";
import { Head } from "@components/head/Head";
import { InputSearch } from "@/components/inputSearch/InputSearch";

export type HomeProps = {
  blogs: Blog[];
  config: Pick<Config, "title" | "keywords" | "description" | "urls">;
};

const Home: NextPage<HomeProps> = ({ blogs, config }) => {
  const router: NextRouter = useRouter();
  const [query, setQuery] = useState("");

  const navigateToAddBlock = useCallback(
    () => router.push("/add-blog"),
    [router]
  );

  const renderBlogs = useMemo(
    () =>
      blogs
        .filter(
          ({ title, content, author }: Blog) =>
            title.toLowerCase().includes(query.toLowerCase()) ||
            content.toLowerCase().includes(query.toLowerCase()) ||
            author.toLowerCase().includes(query.toLowerCase())
        )
        .map((blog: Blog, index: number) => <BlogCard key={index} {...blog} />),
    [blogs, query]
  );

  const searchBlogs = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    []
  );

  return (
    <div>
      <Head {...config} />
      <div className="blog-list-main-header">
        <button className="blog-list-main-header-add-btn" onClick={navigateToAddBlock}>
          Add blog
        </button>
        <InputSearch filterBlogs={searchBlogs} query={query} />
      </div>
      <main>{blogs.length > 0 && renderBlogs}</main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(config.urls.serverUri);
  const result = await response.json();
  return {
    props: {
      blogs: result,
      config,
    },
  };
};

export default Home;
