import { Box, Typography, Button, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import video2 from "../../assets/heroVideo2.mp4";
import video1 from "../../assets/heroVideo2.mp4";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const videos = [video2, video1];

const fadeLeft: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: "spring", stiffness: 60, damping: 18 },
  },
};

const features = ["Board-certified specialists", "AI-enhanced analysis", "Global expertise"];

const MotionBox = motion(Box);

const HeroSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1 % videos.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [firstVideoReady, setFirstVideoReady] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const posterVideoRef = useRef<HTMLVideoElement | null>(null);
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>(new Array(videos.length).fill(false));
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, []);

  const navigate = useNavigate();
  const handleHowItworks = () => {
    navigate("/insights#howItWorks");
  };

  const handleVideoLoad = (index: number) => {
    setVideosLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      if (index === 0 && !firstVideoReady) {
        setFirstVideoReady(true);
        const firstVideo = videoRefs.current[0];
        if (firstVideo) {
          firstVideo.currentTime = 0;
          firstVideo.play().catch(console.error);
          const checkVideoPlaying = () => {
            if (firstVideo.currentTime > 0 && !firstVideo.paused) {
              setVideoStarted(true);
              setTimeout(() => setShowPoster(false), 50);
            } else {
              setTimeout(checkVideoPlaying, 50);
            }
          };
          setTimeout(checkVideoPlaying, 100);
        }
      }
      return newState;
    });
  };

  const handleTimeUpdate = (index: number) => {
    const video = videoRefs.current[index];
    if (video && index === currentVideoIndex && !isTransitioning) {
      const timeRemaining = video.duration - video.currentTime;
      if (timeRemaining <= 0.5 && timeRemaining > 0) {
        setIsTransitioning(true);
        const nextIndex = (currentVideoIndex + 1) % videos.length;
        const nextVideo = videoRefs.current[nextIndex];
        if (nextVideo && videosLoaded[nextIndex]) {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(console.error);
        }
        setNextVideoIndex(nextIndex);
        transitionTimeoutRef.current = setTimeout(() => {
          setCurrentVideoIndex(nextIndex);
          setNextVideoIndex((nextIndex + 1) % videos.length);
          setIsTransitioning(false);
        }, 500);
      }
    }
  };

  const handleVideoEnd = (index: number) => {
    if (index === currentVideoIndex && !isTransitioning) {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      const nextVideo = videoRefs.current[nextIndex];
      if (nextVideo && videosLoaded[nextIndex]) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(console.error);
      }
      setCurrentVideoIndex(nextIndex);
      setNextVideoIndex((nextIndex + 1) % videos.length);
    }
  };

  useEffect(() => {
    const posterVideo = posterVideoRef.current;
    if (posterVideo) posterVideo.load();
    const firstVideo = videoRefs.current[0];
    if (firstVideo) firstVideo.load();
    const loadOtherVideos = setTimeout(() => {
      videoRefs.current.forEach((video, index) => {
        if (video && index > 0) video.load();
      });
    }, 500);
    return () => clearTimeout(loadOtherVideos);
  }, []);

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
        minHeight: { xs: "calc(var(--space-48) + var(--space-16))", md: "70vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        m: { xs: "var(--space-2)", md: "var(--space-4)" },
        px: { xs: "var(--space-4)", sm: "var(--space-8)", md: "var(--space-8)" },
        py: { xs: "var(--space-6)", md: "var(--space-8)" },
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-lg)",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Background Video Poster */}
      <video
        ref={posterVideoRef}
        src={videos[0]}
        muted
        playsInline
        preload="metadata"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          zIndex: showPoster ? 1 : -1,
          borderRadius: "inherit",
          opacity: showPoster ? 1 : 0,
          transition: "opacity 0.8s ease-in-out, z-index 0s linear 0.8s",
          scale: 1.2,
          transform: "scale(1.2)",
          pointerEvents: "none",
        }}
        aria-label="Video poster frame"
      />

      {/* Video Crossfade Loop */}
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
            preload={index === 0 ? "auto" : "metadata"}
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
              objectPosition: "center center",
              zIndex: 0,
              borderRadius: "inherit",
              opacity: shouldShow ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
              scale: 1.2,
              transform: "scale(1.2)",
              pointerEvents: "none",
            }}
            aria-label={`Medical consultation background video ${index + 1}`}
          />
        );
      })}

      {/* Overlay for text contrast */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(255,255,255,0.35)",
          zIndex: 1,
          borderRadius: "inherit",
          pointerEvents: "none",
        }}
      />

      {/* Main Content */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="start"
        spacing={{ xs: "var(--space-8)", md: "var(--space-16)" }}
        sx={{
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Text Content */}
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
          variants={fadeLeft}
          sx={{
            flex: 1,
            maxWidth: "650",
            px: { xs: 0, sm: "var(--space-2)" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "var(--text-4xl)", sm: "var(--text-5xl)", md: "var(--text-6xl)" },
              mb: "var(--space-3)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "-0.04em",
              display: "block",
              background: "linear-gradient(1800deg, var(--primary-900), var(--primary-900))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            When Medical
            <br />
            Decisions Matter Most
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "var(--text-secondary)",
              fontWeight: 500,
              mb: "var(--space-6)",
              fontSize: { xs: "var(--text-lg)", sm: "var(--text-xl)", md: "var(--text-2xl)" },
              lineHeight: "var(--leading-relaxed)",
              maxWidth: 580,
              mx: { xs: "auto", md: 0 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Every patient deserves confidence in their care.
            <br />
            Our AI-powered platform connects you with world-class specialists who provide expert second opinions—ensuring you make informed decisions about your health journey.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={"var(--space-3)"} mb={"var(--space-5)"} alignItems={{ xs: "center", sm: "flex-start" }} justifyContent={{ xs: "center", sm: "flex-start" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<LocalHospitalIcon />}
              onClick={() => {
                navigate("/insights");
              }}
              sx={{
                background: "var(--primary-700)",
                color: "var(--text-inverse)",
                fontWeight: 700,
                px: "var(--space-5)",
                py: "calc(var(--space-2) + var(--space-1))",
                fontSize: "var(--text-lg)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-md)",
                textTransform: "none",
                "&:hover": {
                  background: "var(--primary-900)",
                  boxShadow: "var(--shadow-lg)",
                },
              }}
            >
              Explore Insights
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleHowItworks}
              sx={{
                color: "var(--primary-700)",
                borderColor: "var(--primary-300)",
                background: "var(--bg-primary)",
                fontWeight: 700,
                px: "var(--space-5)",
                py: "calc(var(--space-2) + var(--space-1))",
                fontSize: "var(--text-lg)",
                borderRadius: "var(--radius-xl)",
                textTransform: "none",
                "&:hover": {
                  borderColor: "var(--primary-700)",
                  background: "var(--primary-50)",
                },
              }}
            >
              Learn How It Works
            </Button>
          </Stack>

          {/* Features */}
          <Stack direction="row" spacing={"var(--space-2)"} mt={"var(--space-2)"} flexWrap="wrap" rowGap={"var(--space-2)"} justifyContent={{ xs: "center", md: "flex-start" }}>
            {features.map((feature) => (
              <Stack
                direction="row"
                alignItems="center"
                spacing={"var(--space-1)"}
                key={feature}
                sx={{
                  borderRadius: "var(--radius-md)",
                  px: "var(--space-3)",
                  py: "var(--space-1)",
                  bgcolor: "var(--primary-100)",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <CheckCircleIcon sx={{ color: "var(--success)", fontSize: "var(--text-xl)" }} />
                <Typography
                  variant="body1"
                  sx={{
                    color: "var(--text-primary)",
                    fontWeight: 600,
                    fontSize: "var(--text-base)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {feature}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </MotionBox>
      </Stack>
    </Box>
  );
};

export default HeroSection;
