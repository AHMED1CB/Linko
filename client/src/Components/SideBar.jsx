import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Badge,
  Fade,
  Slide,
  Grow,
  Zoom,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { keyframes, useTheme } from "@mui/material/styles";

import { Search, MoreVert, Close, Check } from "@mui/icons-material";
import { useAuth } from "../app/Contexts/AuthContext";
import utils from "../app/Api/utils";
import { useDispatch } from "react-redux";
import {
  acceptRequest,
  rejectRequest,
} from "../app/Redux/Features/Requests/RequestsServices";
import { useLoader } from "../app/Contexts/LoaderContext";
import { GetUserProfile } from "../app/Redux/Features/Auth/AuthServices";
import { useState } from "react";
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const slideLeft = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export default ({ fullWidth = false }) => {
  const theme = useTheme();
  const go = useNavigate();
  const { username } = useParams();

  const user = useAuth();
  const dispatch = useDispatch();
  const { showLoader, hideLoader } = useLoader();

  const friends = user.friends;

  const [requests, setRequests] = useState(user.requests);
  const isActiveFriend = (u) => {
    return u === username;
  };

  const handleAccept = async (userId) => {
    try {
      showLoader();
      await dispatch(acceptRequest(userId)).unwrap();
      await dispatch(GetUserProfile()).unwrap();
      setRequests(requests.filter((r) => r.from._id !== userId));
    } finally {
      hideLoader();
    }
  };

  const handleReject = async (userId) => {
    try {
      showLoader();
      await dispatch(rejectRequest(userId)).unwrap();
      setRequests(requests.filter((r) => r.from._id !== userId));
    } finally {
      hideLoader();
    }
  };

  return (
    <Slide
      direction="right"
      className={`defaultSide  ${fullWidth ? "chat-side-full" : "sidebar"}`}
      in={true}
      timeout={800}
    >
      <Box
        sx={{
          width: 350,
          bgcolor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              p: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
            >
              Messages
            </Typography>
            <IconButton
              sx={{
                color: theme.palette.text.secondary,
                transition: "all 0.3s",
                "&:hover": {
                  transform: "rotate(90deg)",
                  bgcolor: theme.palette.action.hover,
                },
              }}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Fade>

        {/* Search */}
        <Fade in={true} timeout={1200}>
          <Box
            sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search conversations..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <Search sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                ),
              }}
            />
          </Box>
        </Fade>

        {/* Friends List */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {requests.map((request) => {
            const sender = request.from;
            const senderPhoto = sender.photo ? (
              <img
                src={`${utils.url}/storage/photos/${sender.photo}`}
                alt={sender.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              sender.name[0].toUpperCase()
            );

            return (
              <Grow key={request._id} in timeout={800}>
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    bgcolor: theme.palette.action.selected,
                    animation: `${slideLeft} 0.6s ease-out`,
                    transition: "all 0.3s",
                    "&:hover": {
                      bgcolor: theme.palette.action.hover,
                      transform: "translateX(5px)",
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
                    },
                  }}
                >
                  <Zoom in timeout={1000}>
                    <Badge
                      color="success"
                      variant="dot"
                      overlap="circular"
                      sx={{
                        "& .MuiBadge-dot": {
                          animation: `${pulse} 2s infinite`,
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          transition: "all 0.3s",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                      >
                        {senderPhoto}
                      </Avatar>
                    </Badge>
                  </Zoom>

                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      {sender.name.slice(0, 20)}
                    </Typography>
                  </Box>

                  <Box id="requestActions" className="requestActions">
                    <IconButton
                      id="reject"
                      className="requestReject"
                      onClick={() => handleReject(request.from._id)}
                      sx={{
                        color: theme.palette.error.main,
                        "&:hover": {
                          bgcolor: theme.palette.error.light + "20",
                        },
                      }}
                    >
                      <Close />
                    </IconButton>

                    <IconButton
                      id="accept"
                      className="acceptRequest"
                      onClick={() => handleAccept(request.from._id)}
                      sx={{
                        color: theme.palette.success.main,
                        "&:hover": {
                          bgcolor: theme.palette.success.light + "20",
                        },
                      }}
                    >
                      <Check />
                    </IconButton>
                  </Box>
                </Box>
              </Grow>
            );
          })}

          {friends.map((friend) => {
            const friendProfilePhoto = friend.photo ? (
              <img
                src={utils.url + "/storage/photos/" + friend.photo}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              friend.name[0].toUpperCase()
            );
            return (
              <Grow
                key={friend._id}
                onClick={() => go(`/user/${friend.username}/chat`)}
                in={true}
                timeout={800}
              >
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    bgcolor: theme.palette.action.selected,
                    borderLeft: isActiveFriend(friend.username)
                      ? `3px solid ${theme.palette.primary.main}`
                      : "",

                    animation: `${slideLeft} 0.6s ease-out`,
                    transition: "all 0.3s",
                    "&:hover": {
                      bgcolor: theme.palette.action.hover,
                      transform: "translateX(5px)",
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
                    },
                  }}
                >
                  <Zoom in={true} timeout={1000}>
                    <Badge
                      color="success"
                      variant="dot"
                      overlap="circular"
                      sx={{
                        "& .MuiBadge-dot": {
                          animation: `${pulse} 2s infinite`,
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          transition: "all 0.3s",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                      >
                        {friendProfilePhoto}
                      </Avatar>
                    </Badge>
                  </Zoom>
                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      {friend.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "0.85rem",
                      }}
                    >
                      {/* {friend.messages.lastOne.text} */}
                      {/* @TODO SHOW LAST MESSAGE */}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: theme.palette.text.disabled,
                      fontSize: "0.75rem",
                    }}
                  >
                    {/* {friend.messages.lastOne.time} */}
                    {/* @TODO SHOW LAST MESSAGE DATE */}
                  </Typography>
                </Box>
              </Grow>
            );
          })}
        </Box>
      </Box>
    </Slide>
  );
};
