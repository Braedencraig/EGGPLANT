import React, { useState } from "react";
import { useSpring } from "react-spring";
import HamburgerMenu from "./HamburgerMenu";
import MobileNav from "./MobileNav";

const animationConfig = {
  mass: 1,
  frictionLight: 20,
  frictionHeavy: 30,
  tension: 575,
  delay: 175,
};

const Header = ({ navItems }) => {
  const [open, toggle] = useState(false);
  const [styles, api] = useSpring(() => ({
    transformTop: "translate(-8px, 10px) rotate(0deg)",
    transformMiddle: "translate(-8px, 0px) rotate(0deg)",
    transformBottom: "translate(-8px, -10px) rotate(0deg)",
    widthTop: "28px",
    widthBottom: "28px",
    config: {
      mass: animationConfig.mass,
      friction: animationConfig.frictionHeavy,
      tension: animationConfig.tension,
    },
  }));

  return (
    <>
      <header className="header">
        <HamburgerMenu
          open={open}
          toggle={toggle}
          styles={styles}
          api={api}
          animationConfig={animationConfig}
        />
      </header>
      <MobileNav navItems={navItems} open={open} />
    </>
  );
};

export default Header;
