import { PageMenu } from "@amsterdam/design-system-react";
import React from "react";

import GithubIcon from "./GithubIcon";

const NavbarLinks = () => {
  return (
    <PageMenu alignEnd>
      <PageMenu.Link
        href="https://github.com/arthurWD/assessment-data-amsterdam"
        icon={GithubIcon}
        target="_blank"
      >
        Github
      </PageMenu.Link>
    </PageMenu>
  );
};

export default NavbarLinks;
