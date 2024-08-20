import { MapExplore } from "@/components/MapExplore";
import React from "react";

export default function page() {
  return (
    <main className="w-full flex flex-col flex-grow p-12 bg-slate-100  rounded-md">
      <h1 className="text-3xl font-semibold">Explore</h1>
      <MapExplore />
    </main>
  );
}
