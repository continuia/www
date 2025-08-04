import { Box } from "@mui/material";
import HeroSection from "../components/campaign/heroSection";
import PlatformPromo from "../components/campaign/platformPromo";
import AdaptiveTech2025 from "../components/campaign/adaptiveTech";
import GuidingPrinciples from "../components/campaign/guidingPrinciples";
import ContinuaLaunch from "../components/campaign/continuaLaunch";
import { useEffect } from "react";

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
    document.title = "Campaign Page";

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
      <PlatformPromo />
      <AdaptiveTech2025 />
      <GuidingPrinciples />
      <ContinuaLaunch />
    </Box>
  );
};

export default Campaign;
