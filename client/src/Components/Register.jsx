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
import { registerSchema } from "../app/Validations/Auth";
import { useState } from "react";
import { useLoader } from "../app/Contexts/LoaderContext";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../app/Redux/Features/Auth/AuthServices.js";
import Converter from "../app/Helpers/TextConverter.js";

function Register() {
  let initialData = {
    username: "",
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const [data, setData] = useState(initialData);
  const [alert, setAlert] = useState({ show: false, text: "" });
  const { showLoader, hideLoader } = useLoader();
  const dispatch = useDispatch();
  const go = useNavigate();

  // Register Funtion
  const tryToRegister = async () => {
    const parse = registerSchema.safeParse(data);

    if (!parse.success) {
      const error = parse.error.issues[0].message;
      setAlert({ show: true, text: error });
      return;
    }

    if (!import.meta.env.VITE_API_URL) {
      setAlert({ show: true, text: "Something Went Wrong Try Again Later" });
      return;
    }

    setAlert({ show: false, text: "" });

    try {
      showLoader();
      await dispatch(
        RegisterUser({
          username: Converter.Username(data.username),
          name: data.name,
          email: data.email,
          password: data.password,
        })
      ).unwrap();
      setData(initialData);
      go("/auth/login");
    } catch (error) {
      setAlert({
        show: true,
        text: error.response?.data?.message || "Something Went Wrong",
      });
    } finally {
      hideLoader();
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
            Create New Account
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
            onChange={() => setData({ ...data, username: Converter.Username(event.target.value) })}
            value={data.username}
          />
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={() => setData({ ...data, name: event.target.value })}
            value={data.name}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={() => setData({ ...data, email: event.target.value })}
            value={data.email}
          />
          <PasswordField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={() => setData({ ...data, password: event.target.value })}
            value={data.password}
          />
          <PasswordField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={() =>
              setData({ ...data, passwordConfirmation: event.target.value })
            }
            value={data.passwordConfirmation}
          />
          <Button
            onClick={tryToRegister}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Create Account
          </Button>
          <Link to="/auth/login">Already Have An Account? Login</Link>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
