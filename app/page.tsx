import { Hero } from "@/components/Hero";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { createMetadata, siteConfig } from "@/lib/metadata";

export const metadata = createMetadata({ path: "/" });

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.title,
      description: siteConfig.description,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <FeaturedBlog />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
