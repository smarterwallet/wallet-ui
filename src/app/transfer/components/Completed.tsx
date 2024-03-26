"use client";
import React from "react";
import DirectCard from "./DirectCard";

export default function Page(props: any) {
  const { list = [] } = props;

  return (
    <div>
      {list.map((item: any, index: number) => (
        <DirectCard {...item} key={index} title="Completed" />
      ))}
    </div>
  );
}
