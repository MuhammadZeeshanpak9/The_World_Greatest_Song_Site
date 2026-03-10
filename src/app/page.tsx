import Scene from "@/components/3d/Scene";
import Header from "@/components/ui/Header";
import Hero from "@/components/sections/Hero";
import TrendingVideos from "@/components/sections/TrendingVideos";
import FrequencySections from "@/components/sections/FrequencySections";
import ValuePackages from "@/components/sections/ValuePackages";
import WelcomeUniverse from "@/components/sections/WelcomeUniverse";
import Creators from "@/components/sections/Creators";
import WriterProducer from "@/components/sections/WriterProducer";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Scene />
      
      {/* Sections */}
      <Hero />
      <TrendingVideos />
      <FrequencySections />
      <ValuePackages />
      <WelcomeUniverse />
      <Creators />
      <WriterProducer />
      <Footer />
      </main>
    </>
  );
}
