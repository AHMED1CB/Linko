import { Container } from "@mui/material";
import Header from "../Header";
import { Outlet } from "react-router-dom";

export default () => {
  return (
    <>
      <Header />
      <Container className="contents">
        {<Outlet/>}
      </Container>
    </>
  );
};
