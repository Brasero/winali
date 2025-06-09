import Hero from "@/components/home/Hero";
import SellerSection from "@/components/home/SellerSection";
import BuyerSection from "@/components/home/BuyerSection";
import {redirect} from "next/navigation";

export default function Home() {
    if (process.env.ENVIRONMENT !== "development") {
        redirect("/waiting");
    }
  return (
      <>
      <Hero />
      <SellerSection />
      <BuyerSection />
      </>
  );
}