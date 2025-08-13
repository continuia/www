export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  structuredData?: object;
}

export const seoConfig: Record<string, PageSEO> = {
  home: {
    title: 'Continuia - AI-Powered Second Medical Opinions | Your Care, Continued',
    description: 'Get expert second medical opinions from board-certified specialists. AI-powered healthcare platform providing clinical governance and expert consultations for patients and hospitals.',
    keywords: 'second medical opinion, AI healthcare, clinical governance, medical consultation, board-certified specialists, healthcare platform, expert medical analysis',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Continuia - AI-Powered Second Medical Opinions",
      "description": "AI-powered healthcare platform providing second medical opinions",
      "url": "https://continuia.ai",
      "mainEntity": {
        "@type": "MedicalOrganization",
        "name": "Continuia",
        "medicalSpecialty": "Second Medical Opinions"
      }
    }
  },
  insights: {
    title: 'Medical Insights & Second Opinions | Expert Analysis | Continuia',
    description: 'Access expert medical insights and second opinions from board-certified specialists. Get comprehensive analysis and recommendations for better healthcare decisions.',
    keywords: 'medical insights, second opinion, expert analysis, medical consultation, healthcare decisions, specialist review',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Medical Insights & Second Opinions",
      "description": "Expert medical insights and second opinion services",
      "url": "https://continuia.ai/insights"
    }
  },
  governance: {
    title: 'Clinical Governance Platform | Healthcare Compliance | Continuia',
    description: 'Comprehensive clinical governance platform for healthcare organizations. Ensure compliance, quality analytics, and measurable impact with expert consultations.',
    keywords: 'clinical governance, healthcare compliance, quality analytics, healthcare platform, medical governance, compliance management',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Clinical Governance Platform",
      "description": "Healthcare governance and compliance solutions",
      "url": "https://continuia.ai/governance"
    }
  },
  partners: {
    title: 'Healthcare Partners | Medical Partnerships | Continuia',
    description: 'Partner with Continuia to enhance healthcare delivery. Solutions for hospitals, clinics, health plans, and healthcare organizations worldwide.',
    keywords: 'healthcare partners, medical partnerships, hospital solutions, clinic partnerships, health plan integration',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Healthcare Partners",
      "description": "Partnership solutions for healthcare organizations",
      "url": "https://continuia.ai/partners"
    }
  },
  doctors: {
    title: 'Board-Certified Doctors | Medical Specialists | Continuia',
    description: 'Meet our team of board-certified doctors and medical specialists providing expert second opinions and clinical consultations.',
    keywords: 'board-certified doctors, medical specialists, expert physicians, healthcare professionals, medical consultants',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Board-Certified Doctors",
      "description": "Expert medical specialists and physicians",
      "url": "https://continuia.ai/doctors"
    }
  },
  about: {
    title: 'About Continuia | AI-Powered Healthcare Platform | Our Mission',
    description: 'Learn about Continuia\'s mission to revolutionize healthcare through AI-powered second medical opinions and clinical governance solutions.',
    keywords: 'about continuia, healthcare mission, AI healthcare, medical technology, healthcare innovation',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Continuia",
      "description": "Learn about Continuia's healthcare mission and technology",
      "url": "https://continuia.ai/about"
    }
  },
  privacy: {
    title: 'Privacy Policy & Terms of Service | Continuia Healthcare',
    description: 'Read Continuia\'s privacy policy and terms of service. Learn how we protect your medical information and ensure HIPAA compliance.',
    keywords: 'privacy policy, terms of service, HIPAA compliance, medical privacy, healthcare data protection',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy & Terms of Service",
      "description": "Privacy and terms information for Continuia healthcare platform",
      "url": "https://continuia.ai/privacy"
    }
  },
  contact: {
    title: 'Contact Continuia | Global Healthcare Platform | Get in Touch',
    description: 'Contact Continuia for expert medical second opinions and clinical governance solutions. 24/7 support available globally in multiple languages.',
    keywords: 'contact continuia, healthcare support, medical consultation contact, global healthcare platform, customer service',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Continuia",
      "description": "Contact information for Continuia healthcare platform",
      "url": "https://continuia.ai/getInTouch"
    }
  },
  // Partner-specific pages
  'partners/hospitals': {
    title: 'Hospital Partners | Healthcare Solutions for Hospitals | Continuia',
    description: 'Enhance hospital care with Continuia\'s AI-powered second opinion platform. Improve patient outcomes and clinical decision-making.',
    keywords: 'hospital partners, hospital solutions, healthcare technology, clinical decision support, patient outcomes'
  },
  'partners/doctors-and-specialists': {
    title: 'Doctor & Specialist Partners | Medical Professional Network | Continuia',
    description: 'Join Continuia\'s network of medical specialists. Provide expert second opinions and expand your practice reach.',
    keywords: 'doctor partners, medical specialists, physician network, second opinion providers, medical consultants'
  },
  'partners/clinics-diagnostics': {
    title: 'Clinic & Diagnostic Partners | Healthcare Clinic Solutions | Continuia',
    description: 'Partner with Continuia to enhance clinic services with expert second opinions and diagnostic support.',
    keywords: 'clinic partners, diagnostic centers, healthcare clinics, medical diagnostics, clinic solutions'
  },
  'partners/health-plans-tpas': {
    title: 'Health Plan & TPA Partners | Insurance Solutions | Continuia',
    description: 'Integrate Continuia\'s second opinion services with health plans and TPAs to improve member outcomes and reduce costs.',
    keywords: 'health plan partners, TPA solutions, insurance integration, member benefits, healthcare costs'
  }
};

export const getPageSEO = (pathname: string): PageSEO => {
  // Remove leading slash and get the key
  const key = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  
  // Handle root path
  if (key === '' || key === '/') {
    return seoConfig.home;
  }
  
  // Return specific page config or default to home
  return seoConfig[key] || seoConfig.home;
};