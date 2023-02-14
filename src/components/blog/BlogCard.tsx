import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import type { NextRouter } from "next/router";

type BlogCardProps = {
  _id: string;
  title: string;
  content: string;
  author: string;
  isDetails?: boolean;
};
export const BlogCard: React.FC<BlogCardProps> = ({
  _id,
  title,
  content,
  author,
  isDetails,
}): JSX.Element => {
  const router: NextRouter = useRouter();
  const [upVote, setUpVote] = useState<number>(0);
  const [downVote, setDownVote] = useState<number>(0);
  const navigateToDetails = useCallback(
    () => router.push(`/blog/${_id}`),
    [_id, router]
  );

  const renderTitle = useMemo(
    () => (isDetails ? content : `${content.substring(0, 300)}...`),
    [content, isDetails]
  );

  const handleUpVote = useCallback(
    (event: any) => {
      const name = event?.target.name;
      return name === "upvote" ? setUpVote(upVote + 1) : setUpVote(upVote - 1);
    },
    [upVote]
  );

  const handleDownVote = useCallback(
    (event: any) => {
      const name = event?.target.name;
      return name === "downvote"
        ? setDownVote(downVote + 1)
        : setDownVote(downVote - 1);
    },
    [downVote]
  );

  const handleCardBorder = useMemo(
    () => (upVote > downVote ? "green" : downVote > upVote ? "red" : ""),
    [downVote, upVote]
  );

  return (
    <div className={`blog-card-main ${handleCardBorder}`}>
      <div className="blog-card-main-title">{title}</div>
      <div className="blog-card-main-content">{renderTitle}</div>
      <div className="blog-card-main-author">{author}</div>
      {!isDetails && (
        <>
          <div className="blog-card-upvote">
            <button name="upvote" onClick={handleUpVote}>
              +
            </button>
            <input type="number" value={upVote} />
            <button name="minusupvote" onClick={handleUpVote}>
              -
            </button>
          </div>
          <div className="blog-card-downvote">
            <button name="downvote" onClick={handleDownVote}>
              +
            </button>
            <input type="number" value={downVote} />
            <button name="minusdownvote" onClick={handleDownVote}>
              -
            </button>
          </div>
          <div className="blog-card-main-bottom">
            <button className="blog-card-button" onClick={navigateToDetails}>
              Continue reading
            </button>
          </div>
        </>
      )}
    </div>
  );
};
