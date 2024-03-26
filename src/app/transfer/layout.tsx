"use client";
import React from "react";
import MainLayout from "@/components/basic/MainLayout";
import Header from "@/components/Header";
import { Menu } from "@/components/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();


  return (
    <MainLayout className="">
      <Header title="My Transfer" showBack></Header>
      <div className="flex flex-col w-full ">{children}</div>
    </MainLayout>
  );
}
