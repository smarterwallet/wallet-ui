"use client";
import React, { useEffect, useState } from "react";
import Active from "./components/Active";
import Completed from "./components/Completed";
import Canceled from "./components/Canceled";
import { useAddress } from "@/store/useAddress";
import { Tabs, Tab } from "@nextui-org/react";
import { getTxList } from "@/api/transfer";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

export default function Transfer() {
  const [value, setValue] = React.useState();
  const [ActiveList, setActiveList] = useState<TransferItem[]>([]);
  const [CompletedList, setCompletedList] = useState<TransferItem[]>([]);
  const [CanceledList, setCanceledList] = useState<TransferItem[]>([]);
  const { currentAddress, addressList } = useAddress((state) => state);
  useEffect(() => {
      const getList = async () => {
          try {
            const res = await getTxList("0x4e998cb48cf577cded956e6e10ca5b16761e9a54");
            const data = res.body.result;
            console.log("data:", data);
            let list1:TransferItem[] = [];
            let list2:TransferItem[] = [];
            let list3:TransferItem[] = [];
            data.forEach((item: any) => {
              if(item.status === 1) {
                list1.push(item);
              } else if (item.status === 2) {
                list2.push(item);
              } else if (item.status === 3) {
                list3.push(item);
              }
            })
            setActiveList(list1);
            setCompletedList(list2);
            setCanceledList(list3);
          } catch (error) {
            console.error("Failed to fetch transfer list:", error);
          }
        };
        getList(); 
  }, [])
  return (
    <div>
      <Tabs
        fullWidth
        key="underlined"
        variant="underlined"
        aria-label="Tabs variants"
      >
        <Tab key="Active" title={<span>Active<span className="bg-[#456ade] p-1 ml-1">{ActiveList.length}</span></span>} >
          <Active list={ActiveList} />
        </Tab>
        <Tab key="Completed" title={<span>Completed<span className="bg-[#456ade] p-1 ml-1">{CompletedList.length}</span></span>} >
          <Completed list={CompletedList} />
        </Tab>
        <Tab key="Canceled" title={<span>Canceled<span className="bg-[#456ade] p-1 ml-1">{CanceledList.length}</span></span>} >
          <Canceled list={CanceledList} />
        </Tab>
      </Tabs>
    </div>
  );
}
