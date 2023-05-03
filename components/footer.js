import Container from "./container";
import FadeInSection from "./fadeIn";

export default function Footer({ data, cities, socials }) {
  return (
    <footer
      style={{
        backgroundImage: "url(" + "/footer.png" + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <div className="hidden justify-between py-14 text-white items-center lg:flex">
          <div className="flex items-center">
            <FadeInSection classNames="mr-20 -ml-[20px]" key={1}>
              <img src={data[0].logo.url} alt="Eggplant" />
            </FadeInSection>
            <div className="flex flex-row-reverse">
              {cities.map((city, i) => {
                return (
                  <FadeInSection classNames="mr-20" key={i}>
                    <h3
                      style={{ letterSpacing: "0.2em" }}
                      className="text-lg text-accent-1"
                    >
                      {city.city.toUpperCase()}
                    </h3>
                    {city.address.json.content.map((address, i) => {
                      return (
                        <div key={i}>
                          <p className="text-sm my-1">
                            {address.content[0].value}
                          </p>
                        </div>
                      );
                    })}
                  </FadeInSection>
                );
              })}
            </div>
          </div>
          <FadeInSection classNames="flex" key={1}>
            {socials.map((social, i) => {
              if (i === 0) {
                return (
                  <a
                    href="https://www.instagram.com/eggplantmusicandsound/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i}
                    className="w-[47px] h-[47px] flex items-center justify-center ml-8 cursor-none"
                  >
                    <img src="/instagram.png" alt="" />
                  </a>
                );
              }
              if (i === 1) {
                return (
                  <a
                    href="https://vimeo.com/eggplantmusicandsound"
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i}
                    className="w-[47px] h-[47px] flex items-center justify-center ml-8 cursor-none"
                  >
                    <img src="/vimeo.png" alt="" />
                  </a>
                );
              }
              if (i === 2) {
                return (
                  <a
                    href="https://www.linkedin.com/company/eggplant-collective/?originalSubdomain=ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i}
                    className="w-[47px] h-[47px] flex items-center justify-center ml-8 cursor-none"
                  >
                    <img src="/linkedin.png" alt="" />
                  </a>
                );
              }
            })}
          </FadeInSection>
        </div>
        <FadeInSection
          classNames="flex justify-center py-14 text-white items-center lg:hidden flex-col"
          key={1}
        >
          <div className="flex items-center">
            <img
              className="max-w-[88px] max-h-[88px]"
              src={data[0].logo.url}
              alt="Eggplant"
            />
            {socials.map((social, i) => {
              if (i === 0) {
                return (
                  <a
                    href="https://www.instagram.com/eggplantmusicandsound/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i}
                    className="w-[47px] h-[47px] flex items-center justify-center ml-8 cursor-none"
                  >
                    <img src="/instagram.png" alt="" />
                  </a>
                );
              }
              if (i === 1) {
                return (
                  <a
                    href="https://vimeo.com/eggplantmusicandsound"
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i}
                    className="w-[47px] h-[47px] flex items-center justify-center ml-8 cursor-none"
                  >
                    <img src="/vimeo.png" alt="" />
                  </a>
                );
              }
              if (i === 2) {
                return (
                  <a
                    href="https://www.linkedin.com/company/eggplant-collective/?originalSubdomain=ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i}
                    className="w-[47px] h-[47px] flex items-center justify-center ml-8 cursor-none"
                  >
                    <img src="/linkedin.png" alt="" />
                  </a>
                );
              }
            })}
          </div>
          <div className="flex flex-col-reverse">
            {cities.map((city, i) => {
              return (
                <div className="text-center mt-8" key={i}>
                  <h3
                    style={{ letterSpacing: "0.2em" }}
                    className="text-lg text-accent-1"
                  >
                    {city.city.toUpperCase()}
                  </h3>
                  {city.address.json.content.map((address, i) => {
                    return (
                      <div key={i}>
                        <p className="text-sm my-1">
                          {address.content[0].value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </FadeInSection>
      </Container>
    </footer>
  );
}
