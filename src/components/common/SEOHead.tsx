import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogImage = 'https://continuia.ai/continuia.webp',
  canonicalUrl,
  structuredData
}) => {
  const location = useLocation();
  const baseUrl = 'https://continuia.ai';
  const fullUrl = canonicalUrl || `${baseUrl}${location.pathname}`;
  
  const defaultTitle = 'Continuia - AI-Powered Second Medical Opinions | Your Care, Continued';
  const defaultDescription = 'Get expert second medical opinions from board-certified specialists. AI-powered healthcare platform providing clinical governance and expert consultations for patients and hospitals.';
  const defaultKeywords = 'second medical opinion, AI healthcare, clinical governance, medical consultation, board-certified specialists, healthcare platform, expert medical analysis';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update link tags
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('title', finalTitle);

    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', ogImage, true);

    // Twitter tags
    updateMetaTag('twitter:title', finalTitle, true);
    updateMetaTag('twitter:description', finalDescription, true);
    updateMetaTag('twitter:url', fullUrl, true);
    updateMetaTag('twitter:image', ogImage, true);

    // Canonical URL
    updateLinkTag('canonical', fullUrl);

    // Structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"][data-page-specific]') as HTMLScriptElement;
      
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-page-specific', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

  }, [finalTitle, finalDescription, finalKeywords, fullUrl, ogImage, structuredData]);

  return null; // This component doesn't render anything
};

export default SEOHead;