import { Box, Typography, Button, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import poster from "../../assets/poster.webp";
import video4 from "../../assets/heroVideo4.webm";
import video3 from "../../assets/heroVideo3.webm";
import video2 from "../../assets/heroVideo2.webm";
import video1 from "../../assets/heroVideo1.webm";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const videos = [video2, video3, video4, video1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const features = ["Board-certified specialists", "AI-enhanced analysis", "Global expertise"];

const MotionBox = motion.create(Box);
const MotionStack = motion.create(Stack);

const HeroSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1 % videos.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [allVideosLoaded, setAllVideosLoaded] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
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

      const allLoaded = newState.every((loaded) => loaded);
      if (allLoaded && !allVideosLoaded) {
        setAllVideosLoaded(true);
      }

      if (index === 0 && !videoStarted) {
        const firstVideo = videoRefs.current[0];
        if (firstVideo) {
          firstVideo.currentTime = 0;

          const startPlayback = () => {
            firstVideo
              .play()
              .then(() => {
                setVideoStarted(true);
              })
              .catch(console.error);
          };

          setTimeout(startPlayback, 1000);
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
    const loadVideos = async () => {
      const firstVideo = videoRefs.current[0];
      if (firstVideo) {
        firstVideo.load();
      }

      setTimeout(() => {
        videoRefs.current.forEach((video, index) => {
          if (video && index > 0) {
            video.load();
          }
        });
      }, 200);
    };

    loadVideos();
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
        minHeight: { xs: "100vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        px: { xs: "var(--space-4)", sm: "var(--space-6)", md: "var(--space-12)", lg: "var(--space-16)" },
        py: { xs: "var(--space-8)", md: "var(--space-16)" },
        overflow: "hidden",
        background: !videoStarted ? "var(--neutral-50)" : "transparent",
      }}
    >
      {/* Video Background */}
      {videos.map((videoSrc, index) => {
        const isCurrentVideo = index === currentVideoIndex;
        const isNextVideo = index === nextVideoIndex && isTransitioning;
        const shouldShow = isCurrentVideo || isNextVideo;

        return (
          <video
            key={index}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={videoSrc}
            poster={index === 0 ? poster : undefined}
            muted
            playsInline
            loop={false}
            preload={index === 0 ? "auto" : "metadata"}
            onLoadedData={() => handleVideoLoad(index)}
            onTimeUpdate={() => handleTimeUpdate(index)}
            onEnded={() => handleVideoEnd(index)}
            onCanPlay={() => {
              if (index === 0 && !videoStarted) {
                handleVideoLoad(index);
              }
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              zIndex: shouldShow ? 1 : 0,
              opacity: shouldShow ? 1 : 0,
              transition: "opacity 0.5s ease",
              pointerEvents: "none",
            }}
            aria-label={`Medical consultation background video ${index + 1}`}
          />
        );
      })}

      {/* Enhanced Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: {
            xs: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.6) 100%)",
            md: "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.3) 100%)"
          },
          zIndex: 2,
        }}
      />

      {/* Main Content Container */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          position: "relative",
          zIndex: 3,
        }}
      >
        <MotionStack
          direction="column"
          alignItems={{ xs: "center", md: "flex-start" }}
          justifyContent="center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
          sx={{
            maxWidth: { xs: "100%", md: "60%", lg: "55%" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Main Headline */}
          <MotionBox variants={slideInLeft}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { 
                  xs: "clamp(var(--text-4xl), 8vw, var(--text-5xl))", 
                  sm: "clamp(var(--text-5xl), 6vw, var(--text-6xl))", 
                  md: "clamp(var(--text-6xl), 5vw, var(--text-7xl))"
                },
                mb: "var(--space-6)",
                lineHeight: { xs: "var(--leading-tight)", md: "var(--leading-none)" },
                letterSpacing: { xs: "-0.02em", md: "-0.04em" },
                color: "white",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              When Medical
              <br />
              <Box 
                component="span" 
                sx={{ 
                  color: "var(--primary-300)",
                  textShadow: "0 0 30px var(--primary-300), 0 2px 20px rgba(0,0,0,0.5)",
                  fontWeight: 900,
                }}
              >
                Decisions Matter
              </Box>
              <br />
              Most
            </Typography>
          </MotionBox>

          {/* Subtitle */}
          <MotionBox variants={fadeUp}>
            <Typography
              variant="h4"
              sx={{
                color: "rgba(255,255,255,0.95)",
                fontWeight: 400,
                mb: "var(--space-10)",
                fontSize: { 
                  xs: "var(--text-lg)", 
                  sm: "var(--text-xl)", 
                  md: "var(--text-2xl)",
                  lg: "var(--text-3xl)"
                },
                lineHeight: "var(--leading-relaxed)",
                maxWidth: { xs: "100%", md: "90%" },
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              Connect with world-class specialists for expert second opinions.{" "}
              <Box component="span" sx={{ color: "var(--primary-200)", fontWeight: 500 }}>
                Make informed decisions
              </Box>{" "}
              about your health journey with confidence.
            </Typography>
          </MotionBox>

          {/* CTA Buttons */}
          <MotionStack
            direction={{ xs: "column", sm: "row" }}
            spacing={"var(--space-4)"}
            mb={"var(--space-12)"}
            alignItems="center"
            variants={fadeUp}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<LocalHospitalIcon sx={{ fontSize: "var(--text-xl) !important" }} />}
              onClick={() => navigate("/share-your-story")}
              sx={{
                background: "linear-gradient(135deg, var(--primary-500), var(--primary-700))",
                color: "white",
                fontWeight: 700,
                px: { xs: "var(--space-8)", sm: "var(--space-10)" },
                py: { xs: "var(--space-4)", sm: "var(--space-4)" },
                fontSize: { xs: "var(--text-lg)", sm: "var(--text-xl)" },
                borderRadius: "var(--radius-2xl)",
                textTransform: "none",
                width: { xs: "100%", sm: "auto" },
                minWidth: { sm: "280px" },
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
                "&:hover": {
                  background: "linear-gradient(135deg, var(--primary-600), var(--primary-800))",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Get Second Opinion
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={handleHowItworks}
              sx={{
                color: "white",
                borderColor: "rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                fontWeight: 600,
                px: { xs: "var(--space-8)", sm: "var(--space-10)" },
                py: { xs: "var(--space-4)", sm: "var(--space-4)" },
                fontSize: { xs: "var(--text-lg)", sm: "var(--text-xl)" },
                borderRadius: "var(--radius-2xl)",
                borderWidth: "2px",
                textTransform: "none",
                width: { xs: "100%", sm: "auto" },
                minWidth: { sm: "280px" },
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.8)",
                  background: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              How It Works
            </Button>
          </MotionStack>

          {/* Enhanced Features - Card Style */}
          <MotionBox variants={fadeUp} sx={{ width: "100%" }}>
   
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={"var(--space-4)"}
              sx={{ width: "100%" }}
            >
              {features.map((feature, index) => (
                <Box
                  key={feature}
                  sx={{
                    flex: 1,
                    background: "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "var(--radius-2xl)",
                    p: "var(--space-6)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: index === 0 ? "linear-gradient(90deg, var(--primary-400), var(--primary-600))" :
                                 index === 1 ? "linear-gradient(90deg, var(--accent-400), var(--accent-600))" :
                                 "linear-gradient(90deg, var(--success-400), var(--success-600))",
                    },
                    "&:hover": {
                      background: "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)",
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.3)",
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems={{ xs: "center", md: "flex-start" }}
                    spacing={"var(--space-3)"}
                  >
                    <Box
                      sx={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--radius-xl)",
                        background: index === 0 ? "linear-gradient(135deg, var(--primary-500), var(--primary-700))" :
                                   index === 1 ? "linear-gradient(135deg, var(--accent-500), var(--accent-700))" :
                                   "linear-gradient(135deg, var(--success-500), var(--success-700))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                      }}
                    >
                      <CheckCircleIcon 
                        sx={{ 
                          color: "white",
                          fontSize: "var(--text-2xl)",
                        }} 
                      />
                    </Box>
                    
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: { xs: "var(--text-base)", sm: "var(--text-lg)" },
                        textAlign: { xs: "center", md: "left" },
                        lineHeight: "var(--leading-tight)",
                      }}
                    >
                      {feature}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </MotionBox>
        </MotionStack>
      </Box>
    </Box>
  );
};

export default HeroSection;
