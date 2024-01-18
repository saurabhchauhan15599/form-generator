import { CssBaseline } from "@mui/joy";
import React from "react";
import css from "./index.module.scss";
import { Typography } from "@saurabh-chauhan/sc-components-library";

const Header: React.FC = () => {
  return (
    <header className={css.container}>
      <Typography className={css.text}>Form Generator</Typography>
    </header>
  );
};

export default Header;
