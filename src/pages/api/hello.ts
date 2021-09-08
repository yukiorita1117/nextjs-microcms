// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  // if (!req.query.test) {
  //   res.status(400).json({ err: "エラーが起きていますよ！" });
  // }

  // http://localhost:3000/api/hello?test=1 だとうまくいくようにしている。
  res.status(200).json({ name: "Json Hard Coder", address: "Edogawa" });
};

export default handler;
