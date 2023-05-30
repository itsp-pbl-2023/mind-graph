// @generated by protoc-gen-connect-query v0.2.1 with parameter "target=ts"
// @generated from file api.proto (package mindgraph, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { createQueryService } from "@bufbuild/connect-query";
import { MethodKind } from "@bufbuild/protobuf";
import { Empty, HelloRequest, HelloResponse, ThemeRequest } from "./api_pb.js";

export const typeName = "mindgraph.MindGraphService";

/**
 * @generated from rpc mindgraph.MindGraphService.Hello
 */
export const hello = createQueryService({
  service: {
    methods: {
      hello: {
        name: "Hello",
        kind: MethodKind.Unary,
        I: HelloRequest,
        O: HelloResponse,
      },
    },
    typeName: "mindgraph.MindGraphService",
  },
}).hello;

/**
 * @generated from rpc mindgraph.MindGraphService.SetTheme
 */
export const setTheme = createQueryService({
  service: {
    methods: {
      setTheme: {
        name: "SetTheme",
        kind: MethodKind.Unary,
        I: ThemeRequest,
        O: Empty,
      },
    },
    typeName: "mindgraph.MindGraphService",
  },
}).setTheme;
