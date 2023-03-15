import Container from "./container";

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
            <div className="mr-20 -ml-[20px]">
              <img src={data[0].logo.url} alt="Eggplant" />
            </div>
            <div className="flex flex-row-reverse">
              {cities.map((city, i) => {
                return (
                  <div className="mr-20" key={i}>
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
          </div>
          <div className="flex">
            {socials.map((social, i) => {
              return (
                <a
                  href={social.socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  className="w-[47px] h-[47px] bg-white flex items-center justify-center ml-8"
                ></a>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center py-14 text-white items-center lg:hidden flex-col">
          <div className="flex items-center">
            <img
              className="max-w-[88px] max-h-[88px]"
              src={data[0].logo.url}
              alt="Eggplant"
            />
            {socials.map((social, i) => {
              return (
                <a
                  href={social.socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  className="w-[47px] h-[47px] bg-white flex items-center justify-center ml-8"
                ></a>
              );
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
        </div>
      </Container>
    </footer>
  );
}
