import { useState, useRef, useCallback } from "react";
import { TextField, IconButton, Box, CircularProgress, Chip, Avatar, Menu, MenuItem, Typography, Divider, Button, Tooltip, ListItemIcon, ListItemText, Dialog, DialogContent, DialogActions } from "@mui/material";
import { Send, AttachFile, Image, PictureAsPdf, Close, ExpandMore, Delete, CameraAlt, Add, PhotoLibrary, PhotoCamera, FlipCameraAndroid } from "@mui/icons-material";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  previewUrl?: string;
}

interface ChatInputProps {
  onSendMessage: (message: string, files?: UploadedFile[]) => void;
  isLoading: boolean;
  disabled?: boolean;
  agent: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ agent, onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [filesMenuAnchor, setFilesMenuAnchor] = useState<null | HTMLElement>(null);
  const [attachMenuAnchor, setAttachMenuAnchor] = useState<null | HTMLElement>(null);

  // Camera states
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  // const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock upload API
  const uploadFile = async (file: File): Promise<UploadedFile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockFile: UploadedFile = {
          id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          type: file.type,
          size: file.size,
          url: `https://mock-api.example.com/files/${Date.now()}/${file.name}`,
          previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        };
        resolve(mockFile);
      }, 1000);
    });
  };

  // Start camera stream
  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera. Please check permissions.");
    }
  }, [facingMode]);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  // Open camera dialog
  const openCamera = async () => {
    setAttachMenuAnchor(null);
    setIsCameraOpen(true);
    setCapturedImage(null);
    await startCamera();
  };

  // Close camera dialog
  const closeCamera = () => {
    stopCamera();
    setIsCameraOpen(false);
    setCapturedImage(null);
  };

  // Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setCapturedImage(imageDataUrl);
        stopCamera();
      }
    }
  };

  // Switch camera (front/back)
  const switchCamera = async () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);

    if (stream) {
      stopCamera();
      setTimeout(async () => {
        await startCamera();
      }, 100);
    }
  };

  // Convert data URL to File
  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // Use captured photo
  const useCapturedPhoto = async () => {
    if (capturedImage) {
      setUploading(true);
      try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const fileName = `camera-capture-${timestamp}.jpg`;
        const file = dataURLtoFile(capturedImage, fileName);

        const uploadedFile = await uploadFile(file);
        setUploadedFiles((prev) => [...prev, uploadedFile]);

        closeCamera();
      } catch (error) {
        console.error("Failed to process captured image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  // Retake photo
  const retakePhoto = async () => {
    setCapturedImage(null);
    await startCamera();
  };

  // Mock delete API
  const deleteFile = async (fileId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Deleted file with ID: ${fileId}`);
        resolve();
      }, 500);
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    setAttachMenuAnchor(null);

    try {
      const uploadPromises = Array.from(files).map((file) => uploadFile(file));
      const newUploadedFiles = await Promise.all(uploadPromises);
      setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = async (fileId: string) => {
    try {
      await deleteFile(fileId);
      setUploadedFiles((prev) => {
        const fileToRemove = prev.find((f) => f.id === fileId);
        if (fileToRemove?.previewUrl) {
          URL.revokeObjectURL(fileToRemove.previewUrl);
        }
        return prev.filter((f) => f.id !== fileId);
      });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || uploadedFiles.length > 0) && !isLoading && !uploading) {
      onSendMessage(message.trim(), uploadedFiles.length > 0 ? uploadedFiles : undefined);
      setMessage("");
      setUploadedFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <Image fontSize="small" />;
    if (fileType === "application/pdf") return <PictureAsPdf fontSize="small" />;
    return <AttachFile fontSize="small" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const truncateFileName = (name: string, maxLength: number = 12) => {
    if (name.length <= maxLength) return name;
    const extension = name.split(".").pop();
    const nameWithoutExt = name.substring(0, name.lastIndexOf("."));
    const truncatedName = nameWithoutExt.substring(0, maxLength - extension!.length - 4);
    return `${truncatedName}...${extension}`;
  };

  return (
    <Box
      sx={{
        padding: "var(--space-4) var(--space-6)",
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* File attachments preview */}
      {uploadedFiles.length > 0 && (
        <Box
          sx={{
            maxWidth: "800px",
            margin: "0 auto var(--space-4) auto",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", flex: 1 }}>
            {uploadedFiles.slice(0, 3).map((file) => (
              <Tooltip key={file.id} title={file.name} placement="top" arrow>
                <Chip
                  avatar={file.previewUrl ? <Avatar src={file.previewUrl} sx={{ width: 18, height: 18 }} /> : <Avatar sx={{ width: 18, height: 18, backgroundColor: "var(--primary-100)" }}>{getFileIcon(file.type)}</Avatar>}
                  label={truncateFileName(file.name, 12)}
                  onDelete={() => handleRemoveFile(file.id)}
                  deleteIcon={<Close fontSize="small" />}
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-light)",
                    maxWidth: { xs: "90px", sm: "110px", md: "130px" },
                    minWidth: "65px",
                    height: "28px",
                    display: "inline-flex",
                    "& .MuiChip-label": {
                      fontSize: { xs: "0.65rem", sm: "0.7rem" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      paddingLeft: "var(--space-1)",
                      paddingRight: "var(--space-1)",
                    },
                    "& .MuiChip-avatar": {
                      width: { xs: "16px", sm: "18px" },
                      height: { xs: "16px", sm: "18px" },
                      marginLeft: "2px",
                    },
                    "& .MuiChip-deleteIcon": {
                      width: { xs: "14px", sm: "16px" },
                      height: { xs: "14px", sm: "16px" },
                      marginRight: "2px",
                    },
                  }}
                />
              </Tooltip>
            ))}
          </Box>

          {uploadedFiles.length > 3 && (
            <Button
              size="small"
              variant="outlined"
              endIcon={<ExpandMore sx={{ fontSize: { xs: "14px", sm: "16px" } }} />}
              onClick={(e) => setFilesMenuAnchor(e.currentTarget)}
              sx={{
                fontSize: { xs: "0.65rem", sm: "0.7rem" },
                borderColor: "var(--border-light)",
                color: "var(--text-secondary)",
                minWidth: "auto",
                padding: { xs: "2px 6px", sm: "4px 8px" },
                height: "28px",
              }}
            >
              +{uploadedFiles.length - 3} More
            </Button>
          )}
        </Box>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: "var(--space-2)", sm: "var(--space-3)" },
          maxWidth: "800px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "var(--radius-2xl)",
            border: "1px solid var(--border-light)",
            padding: "var(--space-1)",
            display: "flex",
            alignItems: "flex-end",
            transition: "border-color var(--transition-fast)",
            "&:focus-within": {
              borderColor: "var(--primary-500)",
              boxShadow: "0 0 0 3px var(--primary-100)",
            },
          }}
        >
          <TextField
            multiline
            maxRows={4}
            fullWidth
            disabled={isLoading || uploading}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? `Connecting to ${agent}...` : uploading ? "Uploading files..." : "Share your Story"}
            variant="standard"
            slotProps={{
              input: {
                disableUnderline: true,
                sx: {
                  fontSize: { xs: "0.9rem", sm: "var(--text-base)" },
                  lineHeight: "var(--leading-normal)",
                  padding: { xs: "var(--space-2) var(--space-3)", sm: "var(--space-3) var(--space-4)" },
                  "& .MuiInputBase-input": {
                    padding: 0,
                    "&::placeholder": {
                      color: "var(--text-muted)",
                      opacity: 1,
                    },
                  },
                },
              },
            }}
          />
        </Box>

        {/* Hidden file inputs */}
        <input ref={fileInputRef} type="file" multiple accept="image/*,application/pdf" onChange={handleFileSelect} style={{ display: "none" }} />

        {/* Attachment options button */}
        <IconButton
          onClick={(e) => setAttachMenuAnchor(e.currentTarget)}
          disabled={isLoading || uploading}
          sx={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-light)",
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
            borderRadius: "var(--radius-xl)",
            transition: "all var(--transition-fast)",
            "&:hover": {
              backgroundColor: "var(--bg-tertiary)",
              borderColor: "var(--border-medium)",
            },
            "&:disabled": {
              backgroundColor: "var(--neutral-100)",
              color: "var(--neutral-400)",
            },
          }}
        >
          {uploading ? <CircularProgress size={16} sx={{ color: "var(--primary-600)" }} /> : <Add sx={{ fontSize: { xs: "18px", sm: "20px" } }} />}
        </IconButton>

        {/* Send button */}
        <IconButton
          type="submit"
          disabled={(!message.trim() && uploadedFiles.length === 0) || isLoading || uploading}
          sx={{
            backgroundColor: "var(--primary-600)",
            color: "var(--text-inverse)",
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-md)",
            transition: "all var(--transition-fast)",
            "&:hover": {
              backgroundColor: "var(--primary-700)",
              boxShadow: "var(--shadow-lg)",
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              backgroundColor: "var(--neutral-300)",
              color: "var(--neutral-500)",
              boxShadow: "none",
              transform: "none",
            },
          }}
        >
          {isLoading ? <CircularProgress size={16} sx={{ color: "var(--primary-600)" }} /> : <Send sx={{ fontSize: { xs: "18px", sm: "20px" } }} />}
        </IconButton>
      </Box>

      {/* Camera Dialog */}
      <Dialog
        open={isCameraOpen}
        onClose={closeCamera}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "var(--bg-primary)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          },
        }}
      >
        <DialogContent sx={{ padding: 0, position: "relative" }}>
          {!capturedImage ? (
            <Box sx={{ position: "relative", width: "100%", aspectRatio: "4/3" }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  backgroundColor: "#000",
                }}
              />

              {/* Camera controls overlay */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  padding: "var(--space-4)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "var(--space-4)",
                }}
              >
                {/* Switch camera button */}
                <IconButton
                  onClick={switchCamera}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                    },
                  }}
                >
                  <FlipCameraAndroid />
                </IconButton>

                {/* Capture button */}
                <IconButton
                  onClick={capturePhoto}
                  sx={{
                    backgroundColor: "white",
                    color: "var(--primary-600)",
                    width: 70,
                    height: 70,
                    border: "4px solid rgba(255,255,255,0.3)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.9)",
                    },
                  }}
                >
                  <PhotoCamera sx={{ fontSize: "2rem" }} />
                </IconButton>

                {/* Close button */}
                <IconButton
                  onClick={closeCamera}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                    },
                  }}
                >
                  <Close />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box sx={{ position: "relative", width: "100%" }}>
              <img
                src={capturedImage}
                alt="Captured"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </Box>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </DialogContent>

        {capturedImage && (
          <DialogActions sx={{ padding: "var(--space-4)", gap: "var(--space-2)" }}>
            <Button onClick={retakePhoto} variant="outlined" startIcon={<PhotoCamera />} disabled={uploading}>
              Retake
            </Button>
            <Button
              onClick={useCapturedPhoto}
              variant="contained"
              startIcon={uploading ? <CircularProgress size={16} /> : <Send />}
              disabled={uploading}
              sx={{
                backgroundColor: "var(--primary-600)",
                "&:hover": {
                  backgroundColor: "var(--primary-700)",
                },
              }}
            >
              {uploading ? "Processing..." : "Use Photo"}
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* Attachment options menu */}
      <Menu
        anchorEl={attachMenuAnchor}
        open={Boolean(attachMenuAnchor)}
        onClose={() => setAttachMenuAnchor(null)}
        disableScrollLock={true}
        slotProps={{
          paper: {
            sx: {
              minWidth: 200,
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-light)",
              boxShadow: "var(--shadow-lg)",
              borderRadius: "var(--radius-lg)",
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <MenuItem
          onClick={() => {
            fileInputRef.current?.click();
          }}
          sx={{
            padding: "var(--space-3)",
            "&:hover": {
              backgroundColor: "var(--bg-secondary)",
            },
          }}
        >
          <ListItemIcon>
            <PhotoLibrary sx={{ color: "var(--primary-600)" }} />
          </ListItemIcon>
          <ListItemText
            primary="Upload Files"
            secondary="Images, PDFs, and documents"
            primaryTypographyProps={{
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
            secondaryTypographyProps={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          />
        </MenuItem>

        <MenuItem
          onClick={openCamera}
          sx={{
            padding: "var(--space-3)",
            "&:hover": {
              backgroundColor: "var(--bg-secondary)",
            },
          }}
        >
          <ListItemIcon>
            <CameraAlt sx={{ color: "var(--primary-600)" }} />
          </ListItemIcon>
          <ListItemText
            primary="Take Photo"
            secondary="Capture with camera"
            primaryTypographyProps={{
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
            secondaryTypographyProps={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          />
        </MenuItem>
      </Menu>

      {/* Files menu for viewing all uploaded files */}
      <Menu
        anchorEl={filesMenuAnchor}
        open={Boolean(filesMenuAnchor)}
        onClose={() => setFilesMenuAnchor(null)}
        disableScrollLock={true}
        slotProps={{
          paper: {
            sx: {
              maxWidth: { xs: 260, sm: 380 },
              maxHeight: 280,
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-light)",
              boxShadow: "var(--shadow-lg)",
              position: "fixed",
            },
          },
        }}
        autoFocus={false}
        disableAutoFocusItem={true}
        disableEnforceFocus={true}
        disableAutoFocus={true}
        keepMounted={false}
        disablePortal={false}
      >
        <Box sx={{ padding: "var(--space-2)" }}>
          <Typography variant="subtitle2" sx={{ color: "var(--text-secondary)", fontSize: { xs: "0.75rem", sm: "0.8rem" } }}>
            Uploaded Files ({uploadedFiles.length})
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ maxHeight: 180, overflow: "auto" }}>
          {uploadedFiles.map((file) => (
            <MenuItem
              key={file.id}
              sx={{
                padding: { xs: "var(--space-1) var(--space-2)", sm: "var(--space-2) var(--space-3)" },
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                minHeight: { xs: "40px", sm: "48px" },
              }}
            >
              {file.previewUrl ? <Avatar src={file.previewUrl} sx={{ width: { xs: 20, sm: 28 }, height: { xs: 20, sm: 28 } }} /> : <Avatar sx={{ width: { xs: 20, sm: 28 }, height: { xs: 20, sm: 28 }, backgroundColor: "var(--primary-100)" }}>{getFileIcon(file.type)}</Avatar>}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Tooltip title={file.name} placement="top" arrow>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: { xs: "0.75rem", sm: "0.8rem" },
                      cursor: "pointer",
                    }}
                  >
                    {truncateFileName(file.name, 16)}
                  </Typography>
                </Tooltip>
                <Typography
                  variant="caption"
                  sx={{
                    color: "var(--text-muted)",
                    fontSize: { xs: "0.65rem", sm: "0.7rem" },
                  }}
                >
                  {formatFileSize(file.size)}
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(file.id);
                }}
                sx={{
                  color: "var(--error)",
                  width: { xs: 20, sm: 28 },
                  height: { xs: 20, sm: 28 },
                }}
              >
                <Delete sx={{ fontSize: { xs: "14px", sm: "16px" } }} />
              </IconButton>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default ChatInput;
