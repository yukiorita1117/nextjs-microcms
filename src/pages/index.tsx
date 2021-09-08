import React from "react";
import { Button } from "@/components/atoms/Button";
import styles from "../styles/Home.module.css";
import { client } from "@/utils/client";

// これを定義することでこのページはSSRしなきゃと認識してくれる。
// 決まりがある
// 1. async functionにする or async await
// 2. ログるとわかるがserverもfrontもどちらも実行されている
export const getServerSideProps = async () => {
  // console.log("こちらサーバーです。", new Date());

  const data = await client.get({
    endpoint: "posts",
  });
  return {
    props: { data },
  };
};

// getServerSidePropsのreturnがpropsとして降ってくる
export default function Page(props: any) {
  console.log(props);
  return (
    <div className={styles.container}>
      {props.data.contents.map((content: any) => (
        <p key={content.id}>{content.title}</p>
      ))}
      {/* <Button /> */}
    </div>
  );
}
