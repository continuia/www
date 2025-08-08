import { Box, Typography, Button, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
// import video3 from "../../assets/heroVideo1.mp4";
import video2 from "../../assets/heroVideo3.mp4";
import video1 from "../../assets/heroVideo2.mp4";
import placeholderImage from "../../assets/ai_assisted_patient_intake.webp";
import { useRef, useState, useEffect } from "react";

const videos = [video2, video1];

// Animation variants
const fadeLeft: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 18 },
  },
};

const features = ["Board-certified specialists", "AI-enhanced analysis", "Global expertise"];

const MotionBox = motion.create(Box);

const HeroSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1 % videos.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [firstVideoReady, setFirstVideoReady] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>(new Array(videos.length).fill(false));
  const transitionTimeoutRef = useRef<number | null>(null);

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, []);

  // Handle video loading
  const handleVideoLoad = (index: number) => {
    setVideosLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      
      // When first video is loaded, prepare for seamless transition
      if (index === 0 && !firstVideoReady) {
        setFirstVideoReady(true);
        
        // Start video immediately but keep it hidden behind placeholder
        const firstVideo = videoRefs.current[0];
        if (firstVideo) {
          firstVideo.currentTime = 0;
          firstVideo.play().catch(console.error);
          
          // Wait for video to actually start playing, then begin seamless transition
          const checkVideoPlaying = () => {
            if (firstVideo.currentTime > 0 && !firstVideo.paused) {
              setVideoStarted(true);
              // Seamless crossfade: show video while fading out placeholder
              setTimeout(() => setShowPlaceholder(false), 50);
            } else {
              // Keep checking until video is actually playing
              setTimeout(checkVideoPlaying, 50);
            }
          };
          
          // Start checking after a brief moment
          setTimeout(checkVideoPlaying, 100);
        }
      }
      
      return newState;
    });
  };

  // Function to start transition 0.5 seconds before video ends
  const handleTimeUpdate = (index: number) => {
    const video = videoRefs.current[index];
    if (video && index === currentVideoIndex && !isTransitioning) {
      const timeRemaining = video.duration - video.currentTime;
      
      // Start transition 0.5 seconds before video ends
      if (timeRemaining <= 0.5 && timeRemaining > 0) {
        setIsTransitioning(true);
        
        // Prepare next video
        const nextIndex = (currentVideoIndex + 1) % videos.length;
        const nextVideo = videoRefs.current[nextIndex];
        if (nextVideo && videosLoaded[nextIndex]) {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(console.error);
        }
        
        setNextVideoIndex(nextIndex);
        
        // Complete transition after 0.5 seconds
        transitionTimeoutRef.current = setTimeout(() => {
          setCurrentVideoIndex(nextIndex);
          setNextVideoIndex((nextIndex + 1) % videos.length);
          setIsTransitioning(false);
        }, 500);
      }
    }
  };

  // Function to handle video end (fallback)
  const handleVideoEnd = (index: number) => {
    if (index === currentVideoIndex && !isTransitioning) {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      
      // Start the next video immediately
      const nextVideo = videoRefs.current[nextIndex];
      if (nextVideo && videosLoaded[nextIndex]) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(console.error);
      }
      
      setCurrentVideoIndex(nextIndex);
      setNextVideoIndex((nextIndex + 1) % videos.length);
    }
  };

  // Progressive video loading - start with first video, then load others
  useEffect(() => {
    // Load first video immediately for fast transition from placeholder
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.load();
    }
    
    // Load other videos with a slight delay to prioritize first video
    const loadOtherVideos = setTimeout(() => {
      videoRefs.current.forEach((video, index) => {
        if (video && index > 0) {
          video.load();
        }
      });
    }, 500);
    
    return () => clearTimeout(loadOtherVideos);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "80vh", md: "85vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        m: { xs: 1, md: 2 },
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 3, md: 10 },
        borderRadius: { xs: "1rem", md: "1rem" },
        boxShadow: "0 4px 32px 0 var(--neutral-300)",
        overflow: "hidden",
        // no background gradient here as video is now the background
      }}
    >
      {/* Fast-loading placeholder image */}
      {showPlaceholder && (
        <Box
          component="img"
          src={placeholderImage}
          alt="Medical consultation placeholder"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center", // Ensure consistent positioning
            zIndex: 1,
            scale: 1.2,
            borderRadius: "inherit",
            opacity: videoStarted ? 0 : 1,
            transition: "opacity 0.8s ease-in-out",
            // Ensure image fills exactly the same space as videos
            transform: "scale(1.2)", // Match video scaling exactly
            transformOrigin: "center center",
          }}
        />
      )}

      {/* Multiple preloaded videos as background */}
      {videos.map((videoSrc, index) => {
        const isCurrentVideo = index === currentVideoIndex;
        const isNextVideo = index === nextVideoIndex && isTransitioning;
        const shouldShow = (isCurrentVideo || isNextVideo) && videoStarted;
        
        return (
          <video
            key={index}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={videoSrc}
            muted
            playsInline
            loop={false}
            preload={index === 0 ? "auto" : "metadata"} // Prioritize first video
            onLoadedData={() => handleVideoLoad(index)}
            onTimeUpdate={() => handleTimeUpdate(index)}
            onEnded={() => handleVideoEnd(index)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center", // Match placeholder positioning
              zIndex: 0,
              scale: 1.2,
              borderRadius: "inherit",
              opacity: shouldShow ? (isTransitioning && isNextVideo ? 1 : isCurrentVideo ? 1 : 0) : 0,
              transition: "opacity 0.5s ease-in-out",
              // Explicit transform to match placeholder exactly
              transform: "scale(1.2)",
              transformOrigin: "center center",
            }}
            aria-label={`Medical consultation background video ${index + 1}`}
          />
        );
      })}

      {/* Optional: Add an overlay for better readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(255,255,255,0.60)", // adjust for dark/light overlay as needed
          zIndex: 1,
          borderRadius: "inherit",
          pointerEvents: "none",
        }}
      />

      {/* Main Content */}
      <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" spacing={6} sx={{ width: "100%", position: "relative", zIndex: 2 }}>
        {/* Left: Text Content */}
        <MotionBox initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={fadeLeft} sx={{ flex: 1, maxWidth: 650 }}>
          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,
              mb: 1,
              fontWeight: 600,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              color: "var(--neutral-800)",
              display: "flex",
              alignItems: "center",
            }}
          >
            Global Happy Customers
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", sm: "3.2rem", md: "3.8rem" },
              mb: 2,
              lineHeight: 1.08,
              letterSpacing: "-1px",
              background: "linear-gradient(90deg, var(--neutral-50), var(--neutral-50))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block",
            }}
          >
            When Medical Decisions Matter Most
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "var(--neutral-100)",
              fontWeight: 500,
              mb: 4,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              maxWidth: 600,
            }}
          >
            Every patient deserves confidence in their care. Our AI-powered platform connects you with world-class specialists who provide expert second opinions, ensuring you make informed decisions about your health journey.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
            <Button
              variant="contained"
              size="large"
              startIcon={<LocalHospitalIcon />}
              sx={{
                background: "var(--primary-600)",
                color: "var(--text-inverse)",
                fontWeight: 700,
                px: 3,
                py: 1.7,
                fontSize: "1.15rem",
                borderRadius: "14px",
                boxShadow: "0 2px 12px 0 var(--primary-200)",
                textTransform: "none",
                "&:hover": {
                  background: "var(--primary-700)",
                },
              }}
            >
              Get Expert Opinion
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "var(--primary-700)",
                borderColor: "var(--primary-300)",
                fontWeight: 700,
                px: 3,
                py: 1.7,
                fontSize: "1.15rem",
                borderRadius: "14px",
                background: "var(--bg-primary)",
                textTransform: "none",
                "&:hover": {
                  borderColor: "var(--primary-500)",
                  background: "var(--primary-50)",
                },
              }}
            >
              Learn How It Works
            </Button>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} gap={1} mt={2} flexWrap="wrap">
            {features.map((feature) => (
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                key={feature}
                sx={{
                  borderRadius: "10px",
                  px: 1.1,
                  py: 0.7,
                  bgcolor: "var(--primary-50)",
                  mb: { xs: 1, sm: 0 },
                  boxShadow: "0 1px 4px 0 var(--primary-100)",
                }}
              >
                <CheckCircleIcon sx={{ color: "var(--success)", fontSize: 20 }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--neutral-700)",
                    fontWeight: 500,
                    fontSize: { xs: "0.98rem", sm: "1.05rem" },
                    whiteSpace: "nowrap",
                  }}
                >
                  {feature}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </MotionBox>
        {/* Optionally remove right illustration, or include extra imagery if desired */}
      </Stack>
    </Box>
  );
};

export default HeroSection;
