import { useEffect } from "react";
import { useLocation } from "react-router";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  canonical?: string;
  schemaData?: object;
}

export function SEO({
  title,
  description = "Descubra, acompanhe e compartilhe seus animes favoritos no ViteAnime. A plataforma definitiva para fãs de anime.",
  image = "https://vite-anime.vercel.app/og-image.png", // Fallback image
  url,
  type = "website",
  keywords = "anime, manga, otaku, streaming, lista de animes, seasonal anime, top animes",
  canonical,
  schemaData,
}: SEOProps) {
  const location = useLocation();
  const siteName = "ViteAnime";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const currentUrl = url || `https://vite-anime.vercel.app${location.pathname}`;
  const finalCanonical = canonical || currentUrl;

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Update Meta Tags
    const updateMetaTag = (name: string, content: string, attr = "name") => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("robots", "index, follow");

    // Open Graph
    updateMetaTag("og:title", fullTitle, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:image", image, "property");
    updateMetaTag("og:url", currentUrl, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:site_name", siteName, "property");

    // Twitter
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", finalCanonical);

    // Structured Data (JSON-LD)
    const scriptId = "seo-structured-data";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (schemaData) {
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.id = scriptId;
        scriptElement.type = "application/ld+json";
        document.head.appendChild(scriptElement);
      }
      scriptElement.text = JSON.stringify(schemaData);
    } else if (scriptElement) {
      scriptElement.remove();
    }
  }, [fullTitle, description, keywords, image, currentUrl, type, finalCanonical, schemaData]);

  return null; // This component doesn't render anything UI-wise
}
