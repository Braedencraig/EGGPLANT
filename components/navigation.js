import { useEffect, useState } from "react";
import Container from "./container";
import Link from "next/link";
import Header from "./header";
import Logo from "../public/egg_svg.svg";

export default function Navigation({ data: { nav, navItems } }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(window.location.pathname.replace("/", ""));
  }, []);
  return (
    <div className="absolute top-0 left-0 right-0">
      <Container>
        <nav className="items-start justify-between flex-wrap py-6 hidden md:flex">
          <div>
            <Link
              href="/"
              className="flex items-center flex-shrink-0 text-white mr-6 svgfun"
            >
              <Logo />
              {/* <img src={nav[0].logo.url} alt="Eggplant" /> */}
            </Link>
          </div>
          <ul className="flex flex-row">
            {navItems.map((item, i) => {
              return (
                <li key={i} className="ml-7">
                  <Link
                    href={item.linkUrl}
                    className={`${
                      active === item.linkUrl
                        ? "text-accent-1 font-bold"
                        : "text-white font-bold"
                    } no-underline hover:text-accent-1`}
                  >
                    {item.linkText}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav className="md:hidden relative py-3">
          <div>
            <Link
              href="/"
              className="text-white max-h-[68px] max-w-[67px] absolute left-0 right-0 top-0 bottom-0 m-auto"
            >
              <img
                src={nav[0].logo.url}
                alt="Eggplant"
                className="z-[1000] relative"
              />
            </Link>
          </div>
          <Header navItems={navItems} />
        </nav>
      </Container>
    </div>
  );
}
