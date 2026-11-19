import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
}

export function SEOHead({ title, description, image }: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = title.includes('SM English School')
      ? title
      : `${title} | SM English School — Hoodi, Bangalore`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    if (image) {
      setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    }
  }, [title, description, image]);

  return null;
}
