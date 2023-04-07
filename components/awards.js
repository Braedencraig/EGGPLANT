import Container from "./container";

export default function Awards({ data }) {
  return (
    <div className="bg-black text-white">
      <Container>
        <div className="pt-20 pb-10 flex flex-row w-full flex-wrap justify-center sm:justify-around lg:justify-between">
          {data.map((item, index) => {
            return (
              <div
                className="w-[100%] sm:w-[50%] lg:w-[25%] max-w-[250px] text-center flex flex-col items-center mb-10"
                key={index}
              >
                <img src="/award.png" alt="Award Logo" />
                <h2
                  className="text-lg mt-4"
                  style={{ fontFamily: `Futura, san-serif` }}
                >
                  {item.title}
                </h2>
                <h2
                  className="text-md"
                  style={{ fontFamily: `Futura, san-serif` }}
                >
                  {item.year}
                </h2>
                {item.copy.json.content.map((item, index) => {
                  return (
                    <p
                      className="text-[14px] mx-auto"
                      style={{
                        fontFamily: `Roboto, san-serif`,
                      }}
                      key={index}
                    >
                      {item.content[0].value}
                    </p>
                  );
                })}
                <a
                  style={{ letterSpacing: "0.2em" }}
                  className="mt-3 text-accent-1 underline cursor-none"
                  href=""
                >
                  {item.linkText.toUpperCase()}
                </a>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
