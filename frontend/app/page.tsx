"use client"
import { Appbar } from "@/components/Appbar";
import Hero from "@/components/Hero";
import HeroVideo from "@/components/HeroVideo";

export default function Home() {
  return (
    <main className="pb-20">
      <Appbar />
      <Hero />
       <HeroVideo />
    </main>
  );
}
