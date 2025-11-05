import {
  Slide,
  Box,
  Fade,
  Badge,
  Avatar,
  Typography,
  IconButton,
  useTheme,
  TextField,
} from "@mui/material";

import {
  AttachFile,
  MoreVert,
  Mic,
  Send,
  Image,
  Close,
  Delete,
} from "@mui/icons-material";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import { useAuth } from "../app/Contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getFriendDetails } from "../app/Redux/Features/Friends/FriendsServices";
import Loader from "./Loader";
import NotFound from "./NotFound";
import utils from "../app/Api/utils";
import socket from "../app/SocketHandler/socket";
import Alert from "../app/Swal/Alert";
import VoiceMessage from "./VoiceMessage";
import { pulse, slideLeft, slideRight } from "../app/animations/Main";
import ImageViewer from "./ImageViewer";

export default () => {
  const theme = useTheme();

  const { username } = useParams();
  const currentUser = useAuth();

  const targetFriend = useSelector((s) => s.friends.user);
  const statue = useSelector((s) => s.friends.status);
  const messagesContinerRef = useRef(null);

  const dispatch = useDispatch();

  const [message, setMessage] = useState({
    type: "TXT",
    content: "",
  });

  const [messages, setMessages] = useState([]);
  const [imgFile, setImgFile] = useState({
    file: null,
    view: null,
  });
  const [currentImage, setCurrentImage] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  // get Target userId
  const targetId = currentUser.friends.find(
    (d) => d.username === username
  )?._id;

  useEffect(() => {
    const getFriend = async () => {
      return await dispatch(getFriendDetails(targetId)).unwrap();
    };

    if (targetId) {
      getFriend();
    } else {
    }
  }, [username]);

  // socket Events

  useEffect(() => {
    if (targetFriend) {
      setMessages(targetFriend?.messages || []);
    }
  }, [targetFriend]);

  useEffect(() => {
    socket.register(currentUser._id);

    const OnMessage = (data) => {
      if (data.from == targetId || data.from == currentUser._id) {
        setMessages((p) => [...p, data]);
      }
    };
    const OnDeleteMessage = (data) => {
      setMessages((prevMessages) =>
        prevMessages.filter((m) => m._id !== data.messageId)
      );
    };

    socket.on("message", OnMessage);
    socket.on("deleteMessage", OnDeleteMessage);

    return () => {
      socket.off("message", OnMessage);
      socket.off("deleteMessafe", OnDeleteMessage);
    };
  }, [socket]);

  useEffect(() => {
    Alert.configure(theme);
  }, []);

  useEffect(() => {
    if (messagesContinerRef.current) {
      messagesContinerRef.current.scrollTop =
        messagesContinerRef.current.scrollHeight;
    }
  }, [messages]);

  const SendMessage = () => {
    // check if there is images;

    if (imgFile) {
      socket.message({
        type: "IMG",
        content: imgFile.file,
        from: currentUser._id,
        to: targetFriend._id,
      });
      setImgFile({ file: null, view: null });
    }

    const details = {
      ...message,
      from: currentUser._id,
      to: targetFriend._id,
    };

    socket.message(details);

    setMessage({ type: "TXT", content: "" });
  };

  const handleImgFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const bufferReader = new FileReader();

    if (file && !file.type.startsWith("image/")) {
      onImageError();
      return;
    }

    reader.onload = (ev) => {
      setImgFile((e) => {
        return {
          ...e,
          view: ev.target.result,
        };
      });
    };

    bufferReader.onload = (e) => {
      const arrayBuffer = e.target.result;

      const base64String = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      setImgFile((e) => {
        return {
          ...e,
          file: base64String,
        };
      });
    };
    reader.readAsDataURL(file);
    bufferReader.readAsArrayBuffer(file);
  };

  const onImageError = () => {
    setImgFile({
      file: null,
      view: null,
    });
    Alert.error("Image Error", "Invalid Image File Please Select Another One");
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 44100,
        },
      });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });

        if (blob.size < 2_000) {
          Alert.error("Audio Error", "Too Short Audio message");
          return;
        }
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        audioChunks.current = [];

        const details = {
          type: "VOI",
          content: buffer,
          from: currentUser._id,
          to: targetFriend._id,
        };

        socket.message(details);
      };

      mediaRecorderRef.current.start();
    } catch {
      Alert.error("Recording Error", "Cannot Start Recording");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const deleteMessage = (id) => {
    try {
      socket.emit("deleteMessage", {
        from: currentUser._id,
        to: targetFriend._id,
        messageId: id,
      });
    } catch {
      Alert.error(
        "Message Error",
        "Something Went Wrong WHile deleteing the message"
      );
    }
  };

  if (statue === "Fail" || !targetId) return <NotFound />;
  if (statue === "Loading") return <Loader />;

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
          style={{
            position: "relative",
          }}
          direction="left"
          in={true}
          timeout={800}
          className="chat-contents"
        >
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Chat Header */}

            <Fade in={true} timeout={1000} className="bg-pattern">
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

            {/* image Viewer */}

            {currentImage && (
              <ImageViewer image={currentImage} setImage={setCurrentImage} />
            )}

            {/* Messages */}

            <Box
              ref={messagesContinerRef}
              className="bg-pattern"
              sx={{
                flex: 1,
                p: 2,
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {messages?.length === 0 && (
                <h2 className="sad-msg"> No Messages Yet</h2>
              )}
              {messages.map((msg) => {
                const isFromMe = msg.from == currentUser._id;
                return (
                  <Fade in={true} timeout={1400} key={msg._id}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: isFromMe ? "flex-end" : "flex-start",
                        animation: `${
                          isFromMe ? slideRight : slideLeft
                        } 0.6s ease-out`,
                      }}
                    >
                      {isFromMe && (
                        <IconButton
                          className="delete-btn"
                          size="small"
                          onClick={() => deleteMessage(msg._id)}
                        >
                          <Delete
                            fontSize="small"
                            sx={{
                              color: theme.palette.error.main,
                            }}
                          />
                        </IconButton>
                      )}
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
                        {msg.type == "IMG" && (
                          <img
                            src={utils.url + "/storage/imgs/" + msg.content}
                            className="img-msg"
                            onClick={() =>
                              setCurrentImage(
                                utils.url + "/storage/imgs/" + msg.content
                              )
                            }
                          />
                        )}
                        {msg.type == "TXT" && (
                          <Typography>{msg.content}</Typography>
                        )}

                        {msg.type == "VOI" && (
                          <VoiceMessage
                            src={`${utils.url}/storage/voices/${msg.content}`}
                          />
                        )}

                        <Typography
                          sx={{ opacity: 0.8, fontSize: "0.75rem", mt: 1 }}
                        >
                          {msg.creationDate}
                        </Typography>
                      </Box>
                    </Box>
                  </Fade>
                );
              })}
            </Box>

            {/* Image Area */}

            {imgFile?.view && (
              <Box className="img-file-shower">
                <IconButton
                  className="cancelImgFile"
                  onClick={() => setImgFile({ file: null, view: null })}
                >
                  <Close />
                </IconButton>
                <img
                  src={imgFile.view}
                  className="img-file"
                  onError={onImageError}
                />
              </Box>
            )}

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
                  <label htmlFor="imgFile" style={{ cursor: "pointer " }}>
                    <Image />
                  </label>

                  <input
                    type="file"
                    hidden
                    id="imgFile"
                    accept="image/*"
                    onChange={handleImgFileChange}
                  />
                </IconButton>
                <TextField
                  onChange={() =>
                    setMessage({
                      ...message,
                      content: event.target.value.trim(),
                    })
                  }
                  value={message.content}
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
                  {((message.content || imgFile.view) && (
                    <Send onClick={SendMessage} />
                  )) || (
                    <Mic
                      onMouseDown={startRecording}
                      onMouseUp={stopRecording}
                      onTouchStart={startRecording}
                      onTouchEnd={stopRecording}
                    />
                  )}
                </IconButton>
              </Box>
            </Fade>
          </Box>
        </Slide>
      </Box>
    )) || <NotFound />
  );
};
