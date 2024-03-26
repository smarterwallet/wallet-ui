"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import unicorn from "/public/imgs/unicorn.png";
import circleIcon from "/public/imgs/circleIcon.png";
import DirectCard from "./DirectCard";

interface TransferItem {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  chainId: number;
  blockHash: string;
  blockNumber: number;
  txHash: string;
  sender: string;
  entryPointAddress: string;
  userOperationHash: string;
  userOperation: UserOperation;
  userOperationJson: any | null; // 根据实际情况替换为更具体的类型
  extraData: ExtraDataType;
  txSource: number;
  status: number;
}

interface UserOperation {
  sender: string;
  nonce: string;
  initCode: string;
  callData: string;
  callGasLimit: string;
  verificationGasLimit: string;
  preVerificationGas: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  paymasterAndData: string;
  signature: string;
}

export interface ExtraDataType {
  from: string;
  to: string;
  toName: string;
  amount: string;
  tokenId: string;
  isDirectTransfer: boolean;
}
export default function Active(props: any) {
  const { list = [] } = props;
  return (
    <div>
      <Card className="mx-5 mb-5 rounded-[20px] bg-[#223874]">
        <CardHeader className="relative">
          <div className="text-[12px]">Jan 19, 2024, 14:22</div>
          <div className="bg-[#4faaeb] absolute top-0 right-0 rounded-bl-lg p-2 px-5">
            Ongoing
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0">
          <div className="p-5 flex flex-row text-center">
            <div className="basis-1/5">
              <div className="text-[14px]">You</div>
              <div className="text-[18px] text-[#8197f5] m-2">0.5</div>
              <div className="text-[12px]">ETH</div>
            </div>
            <div className="basis-1/5">
              <div className="text-[14px]">Swap</div>
              <div className="text-[18px] m-2 h-[27px]">
                <Image className="m-auto" src={unicorn} alt="unicorn" />
              </div>
              <div className="text-[12px]">UniSwap</div>
            </div>
            <div className="basis-1/5">
              <div className="text-[14px]">You</div>
              <div className="text-[18px] text-[#8197f5] m-2">1001</div>
              <div className="text-[12px]">USDC</div>
            </div>
            <div className="basis-1/5">
              <div className="text-[14px]">Bridge</div>
              <div className="text-[18px] m-2 h-[27px]">
                <div></div>
                <Image className="m-auto" src={circleIcon} alt="circleIcon" />
              </div>
              <div className="text-[12px]">CCTP</div>
            </div>
            <div className="basis-1/5">
              <div className="text-[14px]">Alice</div>
              <div className="text-[18px] text-[#8197f5] m-2">1000</div>
              <div className="text-[12px]">USDC</div>
            </div>
          </div>
          <div className="px-5 pb-5">
            <div className="flex flex-row">
              <Spinner className="mr-10" color="primary" size="sm" />
              <span>
                <div className="text-[14px]">You send 100,76 USDC to CCTP</div>
                <div className="text-[12px] text-[#848eaf]">
                  transaction fees about $0.52
                </div>
              </span>
            </div>
            <div className="flex flex-row">
              <Spinner className="mr-10" color="primary" size="sm" />
              <div>
                <div className="text-[14px]">CCTP transfers 100 USDC</div>
                <div className="text-[12px] text-[#848eaf]">
                  from Avalance to Ethereum Mainnet
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <Spinner className="mr-10" color="primary" size="sm" />
              <span>
                <div className="text-[14px]">CCTP sends 100 USDC to Alice</div>
                <div className="text-[12px] text-[#848eaf]">
                  with transaction fees about $0.24
                </div>
              </span>
            </div>
          </div>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex flex-row justify-between gap-x-10 w-full">
            <div className="flex flex-grow justify-center">
              <Button
                radius="md"
                size="lg"
                className="bg-[#4662b6] text-white shadow-lg"
              >
                View
              </Button>
            </div>
            <div className="flex flex-grow justify-center ">
              <Button
                radius="md"
                size="lg"
                className="bg-[#b62550] text-white shadow-lg"
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
      {list.map((item: any, index: number) => (
        <DirectCard {...item} key={index} title="Active" />
      ))}
    </div>
  );
}
