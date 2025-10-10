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

import { Search, MoreVert } from "@mui/icons-material";
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

  const friends = [
    // Examples
    {
      _id: 1232323,
      username: "jhondoe",
      email: "test@gmail.com",
      photo: "{{SERVERURL}}/storage/photos/user1.png",
      bio: "No Bio",
      name: "Jhon Doe",
      messages: {
        lastOne: {
          time: "2 mins ago",
          text: "Hey, how are you doing?",
        },
      },
    },
  ];

  const isActiveFriend = (u) => {
    return u === username;
  };

  return (
    <Slide
      direction="right"
      className={fullWidth ? "chat-side-full" : "sidebar"}
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
          {friends.map((friend) => {
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
                        {friend.name[0].toUpperCase()}{" "}
                        {/*@TODO Replace With User PHOTO*/}
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
                      {friend.messages.lastOne.text}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: theme.palette.text.disabled,
                      fontSize: "0.75rem",
                    }}
                  >
                    {friend.messages.lastOne.time}
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
