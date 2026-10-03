import type { Metadata } from "next";
import { BrandIntro } from "@/components/home/BrandIntro";
import { CuisineGrid } from "@/components/home/CuisineGrid";
import { DishMarquee } from "@/components/home/DishMarquee";
import { FollowBand } from "@/components/home/FollowBand";
import { Hero } from "@/components/home/Hero";
import { KitchenMoment } from "@/components/home/KitchenMoment";
import { Signatures } from "@/components/home/Signatures";
import { SplitConversion } from "@/components/home/SplitConversion";
import { StatBand } from "@/components/home/StatBand";
import { TheRoom } from "@/components/home/TheRoom";
import { KeywordRibbon } from "@/components/ui/KeywordRibbon";

export const metadata: Metadata = {
  title: { absolute: "Nooms Foods | Shawarma, Burgers & Loaded Fries in Karachi" },
  description:
    "Nooms Foods serves shawarma, burgers, loaded fries and pasta on Shahrah-e-Faisal in IBEX, Karachi. Dine in, takeaway or home delivery. Call 0304 3542289.",
  alternates: { canonical: "/" },
};

const KEYWORDS = [
  "Shawarma",
  "Burgers",
  "Loaded Fries",
  "Pasta",
  "Dine in",
  "Takeaway",
  "Home delivery",
  "Shawarma on fire",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <DishMarquee />
      <KeywordRibbon items={KEYWORDS} />
      <CuisineGrid />
      <KitchenMoment />
      <Signatures />
      <StatBand />
      <TheRoom />
      <FollowBand />
      <SplitConversion />
    </>
  );
}
