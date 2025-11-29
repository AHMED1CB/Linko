import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { useAuth } from "../app/Contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { searchForFriends } from "../app/Redux/Features/Friends/FriendsServices";
import { sendRequest } from "../app/Redux/Features/Requests/RequestsServices";
import Converter from "../app/Helpers/TextConverter";

export default ({ open, setOpen }) => {
  const [search, setSearch] = useState("");
  const user = useAuth();
  const dispatch = useDispatch();
  const allUsers = useSelector((s) => s.friends.results);

  const [friends, setFriends] = useState(user.friends);

  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleAddFriend = async (usr) => {
    try {
      setFilteredUsers((prev) => prev.filter((u) => u._id !== usr._id));
      await dispatch(sendRequest(usr._id)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (Converter.Username(search.trim()).length === 0)
        return setFilteredUsers([]);

      try {
        await dispatch(search).unwrap();
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [search]);

  useEffect(() => {
    if (!allUsers?.length) return;

    setFilteredUsers(() =>
      allUsers.filter(
        (usr) =>
          !friends.find((f) => f._id === usr._id) &&
          !user.requests.find(
            (r) => r.from._id === usr._id || r.to._id === usr._id
          )
      )
    );
  }, [allUsers, friends, user.requests]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Add Friend by Username</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Search username"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(Converter.Username(e.target.value))}
          sx={{ mb: 2 }}
        />

        <List>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((usr) => (
              <ListItem key={usr._id} divider>
                <ListItemText primary={usr.username} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={() => handleAddFriend(usr)}
                  >
                    <PersonAdd />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No users found" />
            </ListItem>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};
