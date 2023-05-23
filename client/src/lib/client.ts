import { createConnectTransport, createPromiseClient } from '@bufbuild/connect-web'
import { MindGraphService } from './api/api_connect.ts'

const baseUrl = import.meta.env.DEV ? 'http://localhost:8520/api' : '/api'
export const transport = createConnectTransport({ baseUrl })

export const client = createPromiseClient(MindGraphService, transport)
