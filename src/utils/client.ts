import { createClient } from "microcms-js-sdk";

if (!process.env.MICRO_SERVICE_DOMAIN) {
  throw new Error("MICRO_SERVICE_DOMAINが 設定されていません。");
}
if (!process.env.MICRO_SERVICE_APIKEY) {
  throw new Error("MICRO_SERVICE_APIKEYが 設定されていません。");
}

// Initialize Client SDK.
export const client = createClient({
  // YOUR_DOMAIN is the XXXX part of XXXX.microcms.io
  serviceDomain: process.env.MICRO_SERVICE_DOMAIN,
  apiKey: process.env.MICRO_SERVICE_APIKEY,
  globalDraftKey: "YOUR_GLOBAL_DRAFT_KEY", // If need
});
