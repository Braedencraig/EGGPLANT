import { useEffect } from "react";
import { useTransition, animated } from "react-spring";
import { IoLogoInstagram, IoLogoGithub } from "react-icons/io5";
import Link from "next/link";

const MobileNav = ({ open, navItems }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
      return;
    }
    document.body.style.overflowY = "auto";
  }, [open]);

  const transition = useTransition(open, {
    from: {
      opacity: 0,
      transformMain: "translateY(40px)",
      transformFoot: "translateY(200px)",
    },
    enter: {
      opacity: 1,
      transformMain: "translateY(0px)",
      transformFoot: "translateY(0px)",
    },
    leave: {
      opacity: 0,
      transformMain: "translateY(40px)",
      transformFoot: "translateY(200px)",
    },
  });

  return transition(({ opacity, transformMain, transformFoot }, visible) => {
    return visible ? (
      <animated.nav style={{ opacity }} className="mobile-nav">
        <div className="content-wrapper">
          <animated.ul style={{ transform: transformMain }} className="list">
            {navItems.map((item) => (
              <Link
                href={item.linkUrl}
                className="list-item"
                key={item.linkUrl}
              >
                {item.linkText}
              </Link>
            ))}
          </animated.ul>
          {/* <animated.div
            className="icon-wrapper"
            style={{ transform: transformFoot }}
          >
            <IoLogoInstagram className="icon" />
            <IoLogoGithub className="icon" />
          </animated.div> */}
        </div>
      </animated.nav>
    ) : null;
  });
};

export default MobileNav;
