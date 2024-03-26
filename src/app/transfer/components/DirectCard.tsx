"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Code,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import dottedArrow from "/public/imgs/dottedArrow.png";
import dayjs from "dayjs";
import clsx from "clsx";

export default function DirectCard(props: any) {
  const [rtBtn, setRtBtn] = useState("Pause");
  const [rbBtn, setRbBtn] = useState("Resend");

  const { title, CreatedAt, extraData } = props;
  const time = dayjs(CreatedAt).format("MMM DD, YYYY, HH:mm");
  useEffect(() => {
    if (title === "Active") {
        setRtBtn("Paused");
        setRbBtn("Retrieve");
      } else {
        setRtBtn(title);
        setRbBtn("Resend");
      }
  }, [title])
  const formatAddress = (s: string) => {
    if (s) {
      const head = s.slice(0, 4);
      const tail = s.slice(s.length - 4, s.length);
      return head + "..." + tail;
    }
    return "...";
  };

  return (
    <Card className="mx-5 mb-5 rounded-[20px] bg-[#223874]">
      <CardHeader className="relative">
        <div className="text-[12px] text-[#c6cad6] pl-3 mt-2">{time}</div>
        <div
          className={clsx(" absolute top-0 right-0 rounded-bl-lg p-2 px-", {
            "bg-[#ffcf36]": title === "Paused",
            "bg-[#33aa5c]": title === "Completed",
            "bg-[#cc4425]": title === "Failed",
          })}
        >
          {rtBtn}
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <div className="p-5 flex flex-row text-center border-b-1 border-[#405aab]">
          <div className="basis-1/3">
            <div className="text-[18px] font-bold mb-3">You</div>
            <Code className="bg-[#405aa9] text-[#819df5]">
              {formatAddress(extraData.from)}
            </Code>
          </div>
          <div className="basis-1/3">
            <div className="text-[14px] text-[#4faaeb]">
              {extraData.amount} USDT{" "}
            </div>
            <div className="text-[18px] m-2 h-[27px]">
              <Image className="m-auto" src={dottedArrow} alt="dottedArrow" />
            </div>
            <div className="text-[12px] text-[#819df5]">Direct Transfer</div>
          </div>
          <div className="basis-1/3">
            <div className="text-[18px] font-bold mb-3">{extraData.toName}</div>
            <Code className="bg-[#405aa9] text-[#819df5]">
              {formatAddress(extraData.to)}
            </Code>
          </div>
        </div>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex w-full">
          <div className="flex-1 flex-grow flex justify-center">
            <Button
              radius="md"
              size="lg"
              className="bg-[#4662b6] text-white shadow-lg w-4/5"
            >
              View
            </Button>
          </div>
          <div className="flex-1 flex-grow flex justify-center ">
            <Button
              radius="md"
              size="lg"
              className="bg-[#33aa5c] text-white shadow-lg w-4/5"
            >
              {rbBtn}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
