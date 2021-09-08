import React from "react";
// import styles from "../styles/Home.module.css";
import { client } from "@/utils/client";

import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // console.log(ctx.query.id);
  const contentId = ctx.query.id;

  if (typeof contentId !== "string") {
    throw Error("invalid query");
  }

  const data = await client.get({
    endpoint: "posts",
    contentId: contentId,
  });
  return {
    props: { data },
  };
};

export default function Page(props: any) {
  console.log(props);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: props.data.body }}></div>
    </div>
  );
}
