import { Typography } from "@saurabh-chauhan/sc-components-library";
import React from "react";
import css from "./index.module.scss";

const Header: React.FC = () => {
  return (
    <header className={css.container}>
      <Typography className={css.text}>Form Generator</Typography>
    </header>
  );
};

export default Header;
