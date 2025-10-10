import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Collapse,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PasswordField from "./Mui/PasswordField";
import { useState } from "react";
import { loginSchema } from "../app/Validations/Auth";
import { useDispatch } from "react-redux";
import { LoginUser } from "../app/Redux/Features/Auth/AuthServices";

function Login() {
  let initialData = {
    username: "",
    password: "",
  };
  const [data, setData] = useState(initialData);
  const [alert, setAlert] = useState({ show: false, text: "" });
  const dispatch = useDispatch();
  const go = useNavigate();
  const tryToLogin = async () => {
    let parse = loginSchema.safeParse(data);

    if (!parse.success) {
      const error = parse.error.issues[0].message;

      setAlert({ show: true, text: error });

      return;
    }

    try {
      await dispatch(LoginUser(data)).unwrap();
      setData(initialData);
      go("/");
    } catch (err) {
      const error = err?.response?.data?.message || "Something Went Wrong";
      setAlert({ show: true, text: error });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box>
          <img src="/logo.svg" alt="AppLogo" className="logo" id="logo" />

          <Typography variant="h5" align="center" gutterBottom>
            Login To Your Account
          </Typography>
        </Box>
        <Collapse in={alert.show}>
          <Alert
            severity="error"
            onClose={() => setAlert({ ...alert, show: false })}
            variant="outlined"
          >
            {alert.text}
          </Alert>
        </Collapse>
        <form>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.username}
            onChange={() => setData({ ...data, username: event.target.value })}
          />
          <PasswordField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.password}
            onChange={() => setData({ ...data, password: event.target.value })}
          />

          <Button
            onClick={tryToLogin}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Login
          </Button>

          <Link to="/auth/register">Dont Have an Account? Create One</Link>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
