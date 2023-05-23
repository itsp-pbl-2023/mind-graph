import {createConnectTransport, createPromiseClient} from "@bufbuild/connect-web";
import {MindGraphService} from "./api/api_connect.ts";

export const transport = createConnectTransport({
  baseUrl: "/api",
})

export const client = createPromiseClient(MindGraphService, transport)
