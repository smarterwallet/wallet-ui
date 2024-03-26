"use client";
import Header from "./components/Header";
import MainLayout from "@/components/basic/MainLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout showMenu={false}>
      <Header title="Transfer" showBack>
      </Header>
      {children}
    </MainLayout>
  );
}
