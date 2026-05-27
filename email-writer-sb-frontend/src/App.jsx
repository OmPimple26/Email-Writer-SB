// import React from "react";
import './index.css';
import { useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        {
          emailContent,
          tone,
        }
      );

      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );

      toast.success("Reply generated successfully");
    } catch (error) {
      console.log(error);

      toast.error("Failed to generate reply");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);

    toast.success("Copied to clipboard");
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background:
            "linear-gradient(135deg, #8e2de2, #ff6fd8)",
          py: 5,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={12}
            sx={{
              p: 4,
              borderRadius: 4,
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Email Reply Generator
            </Typography>

            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Generate AI-powered email replies instantly
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={6}
              label="Original Email Content"
              value={emailContent}
              onChange={(e) =>
                setEmailContent(e.target.value)
              }
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>
                Tone (Optional)
              </InputLabel>

              <Select
                value={tone}
                label="Tone (Optional)"
                onChange={(e) =>
                  setTone(e.target.value)
                }
              >
                <MenuItem value="">
                  None
                </MenuItem>

                <MenuItem value="professional">
                  Professional
                </MenuItem>

                <MenuItem value="casual">
                  Casual
                </MenuItem>

                <MenuItem value="friendly">
                  Friendly
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              startIcon={
                !loading && <AutoAwesomeIcon />
              }
              sx={{
                mb: 4,
                py: 1.5,
                borderRadius: 3,
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                />
              ) : (
                "Generate Reply"
              )}
            </Button>

            {generatedReply && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Generated Reply
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  value={generatedReply}
                  inputProps={{
                    readOnly: true,
                  }}
                />

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 3,
                  }}
                  startIcon={
                    <ContentCopyIcon />
                  }
                  onClick={handleCopy}
                >
                  Copy to Clipboard
                </Button>
              </>
            )}
          </Paper>
        </Container>
      </Box>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
};

export default App;
