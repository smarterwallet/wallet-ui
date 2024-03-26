import { HttpUtils } from "@/server/utils/HttpUtils";

const HOST = "https://aa-tx-dev.web3idea.xyz";
export function getTxList(address: string | null) {
  return HttpUtils.get(`${HOST}/api/v1/aa-tx?address=${address}`);
}