import { Config } from "../types/config.type";

export const config: Config = {
  title: process.env.APP_TITLE,
  keywords: process.env.APP_KEYWORDS,
  description: process.env.APP_DESCRIPTION,
  urls: {
    serverUri: process.env.SERVER_API,
  },
};
