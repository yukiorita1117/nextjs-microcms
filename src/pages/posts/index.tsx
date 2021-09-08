import React from "react";
// import styles from "../styles/Home.module.css";
import { client } from "@/utils/client";

import type { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const contentId = ctx.query.id;

//   const data = await client.get({
//     endpoint: "posts",
//   });
//   return {
//     props: { data },
//   };
// };

// SSRと比べて 以下の内容だと30sはAPI callしないので APIのcall回数を間引くことができる

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log("hello");

  const data = await client.get({
    endpoint: "posts",
  });
  return {
    props: { data },
    revalidate: 30,
  };
};

export default function Page(props: any) {
  console.log(props);
  return (
    <div>
      <h1>〜記事一覧〜</h1>
      {props.data.contents.map((content: any) => (
        <div key={content.id}>
          <p>
            <Link href={`/posts/${content.id}`}>
              <a>
                {content.title}
                <p>Posted::{content.createdAt}</p>
              </a>
            </Link>
          </p>
          <p>----------------------------------------------</p>
        </div>
      ))}
    </div>
  );
}
