import {
  Slide,
  Box,
  Fade,
  Badge,
  Avatar,
  Typography,
  IconButton,
  useTheme,
  keyframes,
  TextField,
} from "@mui/material";

import { AttachFile, MoreVert, InsertEmoticon, Mic } from "@mui/icons-material";
import SideBar from "./SideBar";

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const slideLeft = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;
const slideRight = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export default () => {
  const theme = useTheme();

  return (
    <Box sx={{
        display:'flex',
        height: '95vh'
    }}>
      <SideBar/>

      <Slide direction="left" in={true} timeout={800} className="chat-contents">
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Chat Header */}
          <Fade in={true} timeout={1000}>
            <Box
              sx={{
                p: 2,
                bgcolor: theme.palette.background.paper,
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Badge
                  color="success"
                  variant="dot"
                  overlap="circular"
                  sx={{
                    "& .MuiBadge-dot": { animation: `${pulse} 2s infinite` },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      transition: "all 0.3s",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    J
                  </Avatar>
                </Badge>
                <Box sx={{ ml: 2 }}>
                  <Typography
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 600,
                    }}
                  >
                    John Doe
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.success.main,
                      fontSize: "0.85rem",
                    }}
                  >
                    Online
                  </Typography>
                </Box>
              </Box>
              <Box>
                <IconButton
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: "all 0.3s",
                    "&:hover": {
                      bgcolor: theme.palette.action.hover,
                      transform: "rotate(180deg)",
                    },
                  }}
                >
                  <AttachFile />
                </IconButton>
                <IconButton
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: "all 0.3s",
                    "&:hover": {
                      bgcolor: theme.palette.action.hover,
                      transform: "rotate(90deg)",
                    },
                  }}
                >
                  <MoreVert />
                </IconButton>
              </Box>
            </Box>
          </Fade>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Fade in={true} timeout={1200}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  animation: `${slideLeft} 0.6s ease-out`,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "70%",
                    color: theme.palette.text.message,
                    bgcolor: theme.palette.grey[200],
                    borderRadius: "18px 18px 18px 6px",
                    p: 2,
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <Typography>Hey there! How are you doing?</Typography>
                  <Typography
                    sx={{
                      color: theme.palette.text.disabled,
                      fontSize: "0.75rem",
                      mt: 1,
                    }}
                  >
                    10:00 AM
                  </Typography>
                </Box>
              </Box>
            </Fade>

            <Fade in={true} timeout={1400}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  animation: `${slideRight} 0.6s ease-out`,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "70%",
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderRadius: "18px 18px 6px 18px",
                    p: 2,
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <Typography>
                    I'm good! Just working on some projects. How about you?
                  </Typography>
                  <Typography sx={{ opacity: 0.8, fontSize: "0.75rem", mt: 1 }}>
                    10:01 AM
                  </Typography>
                </Box>
              </Box>
            </Fade>
          </Box>

          {/* Input */}
          <Fade in={true} timeout={2200}>
            <Box
              sx={{
                p: 2,
                bgcolor: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.divider}`,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton
                sx={{
                  color: theme.palette.text.secondary,
                  transition: "all 0.3s",
                  "&:hover": {
                    bgcolor: theme.palette.action.hover,
                    transform: "scale(1.1)",
                  },
                }}
              >
                <InsertEmoticon />
              </IconButton>
              <TextField
                fullWidth
                placeholder="Type a message..."
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    transition: "all 0.3s",
                    "&:hover": {
                      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
                    },
                  },
                }}
              />
              <IconButton
                sx={{
                  color: theme.palette.text.secondary,
                  transition: "all 0.3s",
                  "&:hover": {
                    bgcolor: theme.palette.action.hover,
                    transform: "scale(1.1)",
                  },
                }}
              >
                <Mic />
              </IconButton>
            </Box>
          </Fade>
        </Box>
      </Slide>
    </Box>
  );
};
