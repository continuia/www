import { Box } from "@mui/material";
import HeroSection from "../../components/campaigns/campaign2/heroSection";
import ProcessSection from "../../components/campaigns/campaign2/stepProcess";
import { useEffect } from "react";
import { WhyThisPartnerMatters } from "../../components/partners/hospitals/whyThisPartnerMatters";
import FlexiblePricing from "../../components/campaigns/campaign2/flexiblePricingSnapShot";
import OutcomesROI from "../../components/campaigns/campaign2/proofAndRoi";
import FrequentlyAskedQuestions from "../../components/campaigns/campaign2/faq";
import FinalCTA from "../../components/campaigns/campaign2/cta";

interface MetaTag {
  name?: string;
  httpEquiv?: string;
  content: string;
}

const Campaign = () => {
  // const checkHeaders = async () => {
  //   try {
  //     const response = await fetch(window.location.href, {
  //       method: "HEAD",
  //     });

  //     console.log("Response Headers:");
  //     response.headers.forEach((value, key) => {
  //       console.log(`${key}: ${value}`);
  //     });
  //   } catch (error) {
  //     console.error("Error checking headers:", error);
  //   }
  // };

  useEffect(() => {
    // Set document title and meta tags
    document.title = "Continuia for Employers | Trusted Second Opinions for Employee Health";

    const metaTags: MetaTag[] = [
      {
        name: "robots",
        content: "noindex, nofollow, noarchive, nosnippet, nocache",
      },
      {
        name: "googlebot",
        content: "noindex, nofollow, noarchive, nosnippet, nocache",
      },
      {
        httpEquiv: "Cache-Control",
        content: "no-cache, no-store, must-revalidate",
      },
      { httpEquiv: "Pragma", content: "no-cache" },
      { httpEquiv: "Expires", content: "0" },
    ];

    const createdTags: HTMLMetaElement[] = [];

    metaTags.forEach((tag) => {
      const meta = document.createElement("meta");
      if ("name" in tag && tag.name) {
        meta.name = tag.name;
      } else if ("httpEquiv" in tag && tag.httpEquiv) {
        meta.httpEquiv = tag.httpEquiv;
      }
      meta.content = tag.content;
      document.head.appendChild(meta);
      createdTags.push(meta);
    });

    // Cleanup function
    return () => {
      createdTags.forEach((tag) => {
        if (document.head.contains(tag)) {
          document.head.removeChild(tag);
        }
      });
    };
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      <HeroSection />
      <ProcessSection />
      <WhyThisPartnerMatters />
      <FlexiblePricing />
      <OutcomesROI />
      <FrequentlyAskedQuestions />
      <FinalCTA />
    </Box>
  );
};

export default Campaign;
