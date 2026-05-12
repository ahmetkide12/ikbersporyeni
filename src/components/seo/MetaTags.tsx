import { useEffect } from "react";

interface MetaTagsProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export default function MetaTags({
  title,
  description,
  keywords,
  ogImage = "https://ikberspor.com/og-image.jpg",
  ogType = "website",
  canonicalUrl,
  noIndex = false,
}: MetaTagsProps) {
  useEffect(() => {
    document.title = title;
    
    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:image", ogImage);
    setMeta("og:type", ogType);
    setMeta("og:url", canonicalUrl || window.location.href);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
    
    if (noIndex) {
      setMetaTag("robots", "noindex, nofollow");
    } else {
      removeMetaTag("robots");
    }
    
    if (canonicalUrl) {
      setCanonical(canonicalUrl);
    }
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, noIndex]);

  return null;
}

function setMeta(name: string, content?: string) {
  if (!content) return;
  const selector = `meta[name="${name}"], meta[property="${name}"]`;
  let meta = document.querySelector(selector) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement("meta");
    if (name.startsWith("og:") || name.startsWith("twitter:")) {
      meta.setAttribute("property", name);
    } else {
      meta.setAttribute("name", name);
    }
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function setMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function removeMetaTag(name: string) {
  const meta = document.querySelector(`meta[name="${name}"]`);
  if (meta) meta.remove();
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.href = url;
}
