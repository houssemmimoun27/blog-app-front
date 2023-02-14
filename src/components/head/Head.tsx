import React from "react";
import HtmlHead from "next/head";

export type HeadProps = {
  title: string;
  keywords: string;
  description: string;
};

export const Head: React.FC<HeadProps> = ({
  title,
  keywords,
  description,
}): JSX.Element => {

  return (
    <HtmlHead>
      <title>{title}</title>
      <meta content={keywords} name="keywords" />
      <meta content={description} name="description" />
      <link href="/favicon.ico" rel="icon" />
    </HtmlHead>
  );
};
