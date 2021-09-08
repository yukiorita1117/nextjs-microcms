import React from "react";
import styles from "../../styles/Home.module.css";
import { client } from "@/utils/client";

import type { GetServerSideProps, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/dist/client/router";

// getStaticPropsでは queryを pathを受け取れないので、これを使う。
// pathsの中に queryが入ってきて、getStaticPropsのparamsで参照できるようになる。
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  //  requestが確定していない時に nullを返すよってのをtrueにして許可している。
  // pathsに入るidはbuild時に欲しい情報(micro cms apiからもらいたいもの)
  // [] の場合はこのbuild時に何も生成しませんよって設定にしている
  // なので[]の場合は useRouterの条件でnull返してあげ、dataないやんけってことでgetStaticPropsが走りdataを取りにいき、描画してくれる
  return { paths: [], fallback: true };
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   // console.log(ctx.query.id);
//   const contentId = ctx.query.id;

//   if (typeof contentId !== "string") {
//     throw Error("invalid query");
//   }

//   const data = await client.get({
//     endpoint: "posts",
//     contentId: contentId,
//   });
//   return {
//     props: { data },
//   };
// };

export const getStaticProps: GetStaticProps = async (ctx) => {
  const contentId = ctx.params?.id;

  if (typeof contentId !== "string") {
    throw Error("invalid query");
  }

  const data = await client.get({
    endpoint: "posts",
    contentId: contentId,
  });

  // revalidate optionを付与すればbuild時でなく、userの訪問によって生成し直してくれる。
  return {
    props: { data },
    revalidate: 30,
  };
};

// ISRやSSRだとCDNにキャッシュをため、useSWRだとlocal PC内のメモリに保存する。

export default function Page(props: any) {
  console.log(props);

  const router = useRouter();
  if (router.isFallback) {
    return <>...loading</>;
  }

  return (
    <div className={styles.container}>
      <div dangerouslySetInnerHTML={{ __html: props.data.body }}></div>
    </div>
  );
}
