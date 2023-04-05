import React from "react";
import { animated } from "react-spring";

const HamburgerMenu = ({ open, toggle, api, styles, animationConfig }) => {
  const handleClick = () => {
    api.start({
      to: open
        ? [
            {
              transformTop: "translate(-8px, 18.5px) rotate(0deg)",
              transformMiddle: "translate(-8px, 0px) rotate(0deg)",
              transformBottom: "translate(-8px, -18.5px) rotate(0deg)",
              widthTop: "24px",
              widthBottom: "24px",
              config: { clamp: true },
            },
            {
              transformTop: "translate(-8px, 10px) rotate(0deg)",
              transformMiddle: "translate(-8px, 0px) rotate(0deg)",
              transformBottom: "translate(-8px, -10px) rotate(0deg)",
              widthTop: "24px",
              widthBottom: "24px",
              config: {
                clamp: false,
                friction: animationConfig.frictionLight,
                tension: animationConfig.tension,
              },
              delay: animationConfig.delay,
            },
          ]
        : [
            {
              transformTop: "translate(-8px, 18.5px) rotate(0deg)",
              transformMiddle: "translate(-8px, 0px) rotate(0deg)",
              transformBottom: "translate(-8px, -18.5px) rotate(0deg)",
              widthTop: "24px",
              widthBottom: "24px",
              config: { clamp: true },
            },
            {
              transformTop: "translate(-8px, 18.5px) rotate(45deg)",
              transformMiddle: "translate(-8px, 0px) rotate(45deg)",
              transformBottom: "translate(-8px, -18.5px) rotate(-45deg)",
              widthTop: "24px",
              widthBottom: "24px",
              config: {
                clamp: false,
                friction: animationConfig.frictionLight,
                tension: animationConfig.tension,
              },
              delay: animationConfig.delay,
            },
          ],
    });
    toggle((prev) => !prev);
  };
  return (
    <button className="btn" onClick={() => handleClick()}>
      <animated.div
        style={{ transform: styles.transformTop, width: styles.widthTop }}
        className="menu-line"
      />
      <animated.div
        style={{
          transform: styles.transformMiddle,
          display: open ? "none" : "",
        }}
        className="menu-line"
      />
      <animated.div
        style={{
          transform: styles.transformBottom,
          width: styles.widthBottom,
        }}
        className="menu-line"
      />
    </button>
  );
};

export default HamburgerMenu;
