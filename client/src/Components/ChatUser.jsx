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
import { useParams } from "react-router-dom";
import { useAuth } from "../app/Contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFriendDetails } from "../app/Redux/Features/Friends/FriendsServices";
import Loader from "./Loader";
import NotFound from "./NotFound";
import utils from "../app/Api/utils";

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

  const { username } = useParams();
  const currentUser = useAuth();

  const targetFriend = useSelector((s) => s.friends.user);
  const statue = useSelector((s) => s.friends.status);

  const dispatch = useDispatch();

  // get Target userId

  useEffect(() => {
    const targetId = currentUser.friends.find(
      (d) => d.username === username
    )._id;

    const getFriend = async () => {
      return await dispatch(getFriendDetails(targetId)).unwrap();
    };
    getFriend();
  }, [username]);

  if (statue === "Loading") return <Loader />;
  if (statue === "Fail") return <NotFound />;

  return (
    (targetFriend && (
      <Box
        sx={{
          display: "flex",
          height: "95vh",
        }}
      >
        <SideBar />

        <Slide
          direction="left"
          in={true}
          timeout={800}
          className="chat-contents"
        >
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
                      src={utils.url + "/storage/photos/" + targetFriend.photo}
                    >
                      {targetFriend.name[0].toUpperCase()}
                    </Avatar>
                  </Badge>
                  <Box sx={{ ml: 2 }}>
                    <Typography
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                      }}
                    >
                      {targetFriend.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.success.main,
                        fontSize: "0.85rem",
                      }}
                    >
                      Online
                      {/* Will Add Status soon */}
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
              {targetFriend.messages.map((msg) => {
                const isFromMe = msg.from._id === currentUser._id;

                return (
                  <Fade in={true} timeout={1400}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: isFromMe ? "flex-end" : "flex-start",
                        animation: `${
                          isFromMe ? slideRight : slideLeft
                        } 0.6s ease-out`,
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "70%",
                          bgcolor: isFromMe
                            ? theme.palette.primary.main
                            : theme.palette.grey[200],
                          color: isFromMe
                            ? theme.palette.primary.contrastText
                            : theme.palette.text.message,
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
                          {message.content}
                          {/* Only on the start show message as text */}
                        </Typography>
                        <Typography
                          sx={{ opacity: 0.8, fontSize: "0.75rem", mt: 1 }}
                        >
                          {message.creationDate}
                        </Typography>
                      </Box>
                    </Box>
                  </Fade>
                );
              })}
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
    )) || <NotFound />
  );
};
