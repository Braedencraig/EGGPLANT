import Container from "./container";
import FadeInSection from "./fadeIn";

export default function GetInTouch({ data, people }) {
  return (
    <div className="bg-[#ECECEC] text-black getintouch">
      <Container>
        <div className="flex justify-between py-14">
          <div>
            <div>
              <FadeInSection key={1}>
                <h3
                  style={{ fontFamily: `Futura, san-serif` }}
                  className="text-center md:text-left text-4xl text-accent-1 font-bold"
                >
                  {data[0].title}
                </h3>
              </FadeInSection>
            </div>
            <div className="flex w-full lg:flex-row flex-col">
              {people.map((person, i) => {
                return (
                  <FadeInSection classNames="text-left mt-6 lg:mr-12" key={i}>
                    <h3 style={{ lineHeight: "28px" }} className="font-bold">
                      {person.name.toUpperCase()}
                    </h3>
                    <p style={{ letterSpacing: "initial" }}>{person.title}</p>
                    <p style={{ letterSpacing: "initial" }}>{person.email}</p>
                    {person?.extraText && (
                      <p
                        style={{
                          letterSpacing: "initial",
                          lineHeight: "14px",
                          fontSize: "12px",
                          marginTop: "8px",
                        }}
                      >
                        {person.extraText}
                      </p>
                    )}
                  </FadeInSection>
                );
              })}
            </div>
          </div>
          {data[0].image && (
            <FadeInSection classNames="hidden lg:flex" key={1}>
              <img src={data[0].image.url} alt="Eggplant Office" />
            </FadeInSection>
          )}
        </div>
      </Container>
    </div>
  );
}
