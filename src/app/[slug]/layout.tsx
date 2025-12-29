import React from "react";

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg-white">{children}</main>;
}
