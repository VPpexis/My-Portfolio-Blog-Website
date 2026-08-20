import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { createMetadata, siteConfig } from "@/lib/metadata";
import siteData from "@/data/metadata.json";

export const metadata = createMetadata({ path: "/" });

export default function Home() {
  const certifications = (siteData.certifications ?? []).map((cert) => ({
    "@type": "EducationalOccupationalCredential",
    name: cert.name,
    credentialCategory: "certification",
    issuedBy: {
      "@type": "Organization",
      name: cert.issuer,
    },
    url: cert.credentialUrl,
  }));

  const publications = (siteData.publications ?? []).map((pub) => ({
    "@type": "ScholarlyArticle",
    name: pub.title,
    datePublished: String(pub.year),
    isPartOf: {
      "@type": "PublicationEvent",
      name: pub.venue,
    },
    url: pub.doi,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.title,
      description: siteConfig.description,
      url: siteConfig.url,
      ...(certifications.length > 0 && { hasCredential: certifications }),
      ...(publications.length > 0 && { hasPart: publications }),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Projects />
      <Skills />
      <Credentials />
      <Contact />
    </>
  );
}
