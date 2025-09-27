import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import PasswordField from "./Mui/PasswordField";

function Register() {
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

        <form>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
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
          <PasswordField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Create Account
          </Button>
          <Link to="/auth/login">Already Have An Account? Login</Link>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
