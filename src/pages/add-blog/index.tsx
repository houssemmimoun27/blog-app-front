import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { config } from "@/lib/config";
import type { GetServerSideProps } from "next";
import type { NextRouter } from "next/router";
import { Config } from "@/types/config.type";
import { Head } from "@/components/head/Head";

type AddBlogProps = Pick<Config, "title" | "keywords" | "description" | "urls">;

type FormState = {
  title: string;
  content: string;
  author: string;
};

const SaveBlog = (props: AddBlogProps) => {
  const router: NextRouter = useRouter();
  const { serverUri } = props.urls;
  const titleRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    author: "",
  });
  const { title, content, author }: FormState = formState;

  useEffect(() => titleRef.current?.focus(), []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.target instanceof HTMLInputElement) {
        setFormState((prevState: Readonly<FormState>) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      } else {
        setFormState((prevState: Readonly<FormState>) => ({
          ...prevState,
          content: event.target.value,
        }));
      }
    },
    []
  );

  const saveBlog = useCallback(
    (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      axios
        .post(serverUri, {
          title,
          content,
          author,
        })
        .then(response => {
          console.log(response);
          router.push("/");
        })
        .catch((err: unknown) => console.error(err));
    },
    [author, content, serverUri, router, title]
  );

  return (
    <form className="add-blog-main" onSubmit={saveBlog}>
      <Head {...props}/>
      <label>
        Title
        <input
          name="title"
          type="text"
          placeholder="title"
          onChange={handleInputChange}
          ref={titleRef}
          value={title}
        />
      </label>
      <label>
        Content{" "}
        <textarea
          placeholder="content"
          onChange={handleInputChange}
          value={content}
        />
      </label>
      <label>
        Author{" "}
        <input
          name="author"
          type="text"
          placeholder="author"
          onChange={handleInputChange}
          value={author}
        />
      </label>
      <button disabled={!title || !content || !author} type="submit">
        Save Blog
      </button>
    </form>
  );
};

export const getServerSideProps: GetServerSideProps<
  AddBlogProps
> = async () => ({
  props: {
    ...config,
  },
});

export default SaveBlog;
