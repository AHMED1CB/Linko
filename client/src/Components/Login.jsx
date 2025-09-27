import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import PasswordField from "./Mui/PasswordField";

function Login() {
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

        <form>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <PasswordField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Login
          </Button>

          <Link to="/auth/register">Dont Have an Account? Create One</Link>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
