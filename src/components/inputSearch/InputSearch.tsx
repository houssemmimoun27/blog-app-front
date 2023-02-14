import React from "react";

type InputSearchProps = {
  filterBlogs: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
};

export const InputSearch: React.FC<InputSearchProps> = ({
  filterBlogs,
  query,
}) => {
  return (
    <input
      className="input-search-main"
      type="text"
      placeholder="Search Blogs"
      onChange={filterBlogs}
      value={query}
    />
  );
};
