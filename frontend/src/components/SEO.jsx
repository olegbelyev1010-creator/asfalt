import { useEffect } from 'react';

const SEO = () => {
  useEffect(() => {
    const schemaOrganization = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "asfaltmoscow",
      "description": "Профессиональное асфальтирование дорог, дворов и территорий в Москве и МО. Гарантия до 5 лет. Опыт 15 лет. 500+ проектов.",
      "url": "https://asfaltmoscow.ru",
      "telephone": "+79779928455",
      "email": "asfaltkamen@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Москва",
        "addressCountry": "RU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "55.7558",
        "longitude": "37.6173"
      },
      "openingHours": "Mo-Su 08:00-20:00",
      "priceRange": "от 500 руб/м2",
      "image": "https://images.pexels.com/photos/9843588/pexels-photo-9843588.jpeg",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "450"
      },
      "sameAs": [
        "https://wa.me/79779928455",
        "https://t.me/+79779928455"
      ]
    };

    const schemaService = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Асфальтирование",
      "provider": {
        "@type": "LocalBusiness",
        "name": "asfaltmoscow",
        "telephone": "+79779928455"
      },
      "areaServed": {
        "@type": "City",
        "name": "Москва"
      },
      "offers": [
        { "@type": "Offer", "name": "Асфальтирование дворов", "price": "800", "priceCurrency": "RUB" },
        { "@type": "Offer", "name": "Асфальтирование дорог", "price": "1200", "priceCurrency": "RUB" },
        { "@type": "Offer", "name": "Асфальтирование территорий", "price": "900", "priceCurrency": "RUB" }
      ]
    };

    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(schemaOrganization);
    script1.id = 'schema-organization';

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(schemaService);
    script2.id = 'schema-service';

    document.head.appendChild(script1);
    document.head.appendChild(script2);

    return () => {
      const s1 = document.getElementById('schema-organization');
      const s2 = document.getElementById('schema-service');
      if (s1) s1.remove();
      if (s2) s2.remove();
    };
  }, []);

  return null;
};

export default SEO;
