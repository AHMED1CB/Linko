import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  Divider,
  Grow,
  Modal,
  TextField,
  Slide,
  Stack,
} from "@mui/material";
import { Edit, Close, CameraAlt, Send } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

import { useAuth } from "../app/Contexts/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getByUsername } from "../app/Redux/Features/User/UserServices";
import NotFound from "./NotFound";
import Loader from "./Loader";
import { UpdateUserProfile } from "../app/Redux/Features/Auth/AuthServices";
import utils from "../app/Api/utils";
import { sendRequest } from "../app/Redux/Features/Requests/RequestsServices";
import Alert from "../app/Swal/Alert";

const ProfilePage = ({ isProfile = false }) => {
  const theme = useTheme();
  const [animate, setAnimate] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const go = useNavigate();

  const [user, setUser] = useState(null); // THE USER TO SHOW ON PAGE

  const { pathname: location } = useLocation();

  let currentUser = useAuth(); // Authorized User

  const { username } = useParams(); // username FROM url

  const targetUser = useSelector((state) => state.users.user); // The Target User

  const status = useSelector((state) => state.users.status);

  const dispatch = useDispatch();
  useEffect(() => {
    Alert.configure(theme);
  }, [theme]);

  useEffect(() => {
    if (isProfile) {
      setUser(currentUser);
    } else if (username) {
      dispatch(getByUsername(username)).unwrap();
    }
  }, [location, currentUser, username]);

  useEffect(() => {
    if (!targetUser) return;

    if (targetUser._id !== currentUser._id) {
      setUser(targetUser);
      return;
    }
    go("/profile");
  }, [targetUser]);

  useEffect(() => {
    if (user) {
      setAnimate(true);
    }
  }, [user]);

  // profile data

  const [photo, setPhoto] = useState(null);

  const updateProfileData = async () => {
    // update data
    const profileData = new FormData();
    profileData.append("username", user.username);
    profileData.append("name", user.name);
    profileData.append("bio", user.bio ?? "No Bio");

    if (photo) {
      profileData.append("photo", photo);
    }

    try {
      await dispatch(UpdateUserProfile(profileData)).unwrap();
    } catch (err) {
      let error = err?.response?.data?.error || "Something Went Wrong";
      Alert.error("Invalid User Data", error);
    } finally {
      setEditOpen(false);
    }
  };

  const sendFriendRequest = async () => {
    if (!targetUser) return;
    if (!targetUser.isRequested) {
      await dispatch(sendRequest(targetUser._id)).unwrap();
      setUser({ ...user, isRequested: true });
    }
  };

  const onImageError = () => {
    setUser({ ...user, photo: null });
    Alert.error(
      "Profile Photo Error",
      "Invalid Profile Photo Source You Must Change it Now"
    );
  };

  if (status === "Fail" && !isProfile) {
    return <NotFound />;
  }

  if (!isProfile && status == "Loading") {
    return <Loader />;
  }

  return (
    user && (
      <Box sx={{ width: "100%", maxWidth: 600, margin: "auto", mt: 5, px: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
            {isProfile ? "Profile" : `${user.username}'s Profile`}
          </Typography>
        </Box>

        <Grow in={animate} timeout={500}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
              position: "relative",
            }}
          >
            <Box sx={{ position: "relative", display: "inline-block" }}>
              {
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: theme.palette.primary.main,
                    animation: "pulse 2s infinite",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.15)" },
                  }}
                >
                  {(user.photo && (
                    <img
                      className="profile_photo"
                      src={utils.url + "/storage/photos/" + user.photo}
                      onError={onImageError}
                    />
                  )) ||
                    user.username[0].toUpperCase()}
                </Avatar>
              }

              <input
                type="file"
                id="profile-image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={() => {
                  setPhoto(event.target.files[0]);
                  setEditOpen(true);
                }}
              />

              <label htmlFor="profile-image" hidden={!isProfile}>
                <IconButton
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "background.paper",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "#fff",
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <CameraAlt />
                </IconButton>
              </label>
            </Box>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.primary, mt: 2 }}
            >
              {user.username}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              {user.email}
            </Typography>
            <Button
              variant="contained"
              startIcon={
                isProfile ? <Edit /> : !user.isRequested ? <Send /> : ""
              }
              disabled={!isProfile && user.isRequested}
              sx={{
                mt: 2,
                borderRadius: 8,
                px: 3,
                bgcolor: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  transform: "translateY(-2px)",
                },
                "&:active": { transform: "translateY(1px)" },
              }}
              onClick={
                isProfile
                  ? () => setEditOpen(!editOpen)
                  : !user.isRequested && !user.isFriend
                  ? sendFriendRequest
                  : user.isFriend
                  ? () => go(`/user/${user.username}/chat`)
                  : undefined
              }
            >
              {isProfile
                ? "Edit Profile"
                : user.isRequested
                ? "Friend Request Sent"
                : user.isFriend
                ? "Chat With User"
                : "Send Friend Request"}
            </Button>
          </Box>
        </Grow>

        <Divider sx={{ mb: 3, backgroundColor: theme.palette.divider }} />

        <Stack spacing={2}>
          {[
            { label: "Username", value: user.username },
            { label: "Full Name", value: user.name },
            {
              label: "Bio",
              value: user.bio ?? "No Bios",
            },
            {
              label: "Status",
              value: "Online",
              color: theme.palette.success.main,
            },
          ].map((item, index) => (
            <Grow in={animate} timeout={700 + index * 200} key={index}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
                  "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
                }}
              >
                <Typography sx={{ color: theme.palette.text.primary }}>
                  {item.label}
                </Typography>
                <Typography
                  sx={{ color: item.color || theme.palette.text.secondary }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Grow>
          ))}
        </Stack>

        <Modal open={editOpen} onClose={() => setEditOpen(false)}>
          <Slide direction="up" in={editOpen} mountOnEnter unmountOnExit>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                bgcolor: theme.palette.background.paper,
                p: 3,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                boxShadow: 5,
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.text.primary }}
                >
                  Edit Profile
                </Typography>
                <IconButton
                  onClick={() => setEditOpen(false)}
                  sx={{ color: theme.palette.text.secondary }}
                >
                  <Close />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                label="Username"
                defaultValue={user.username}
                variant="outlined"
                sx={{ mb: 2 }}
                onChange={() =>
                  setUser({ ...user, username: event.target.value })
                }
              />
              <TextField
                fullWidth
                label="Name"
                defaultValue={user.name}
                variant="outlined"
                sx={{ mb: 2 }}
                onChange={() => setUser({ ...user, name: event.target.value })}
              />
              <TextField
                fullWidth
                label="Bio"
                defaultValue={currentUser.bio ?? "No Bio"}
                variant="outlined"
                multiline
                rows={3}
                sx={{ mb: 2 }}
                onChange={() => setUser({ ...user, bio: event.target.value })}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: 2,
                  bgcolor: theme.palette.primary.main,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                    transform: "translateY(-2px)",
                  },
                  "&:active": { transform: "translateY(1px)" },
                }}
                onClick={updateProfileData}
              >
                Save
              </Button>
            </Box>
          </Slide>
        </Modal>
      </Box>
    )
  );
};

export default ProfilePage;
