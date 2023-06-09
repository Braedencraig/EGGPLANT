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
            <div className="flex w-full flex-wrap">
              {people.map((person, i) => {
                return (
                  <FadeInSection
                    classNames="text-center md:text-left w-full md:w-[33%] mt-6"
                    key={i}
                  >
                    <h3 className="font-bold">{person.name.toUpperCase()}</h3>
                    <p style={{ letterSpacing: "initial" }}>{person.title}</p>
                    <p style={{ letterSpacing: "initial" }}>{person.email}</p>
                  </FadeInSection>
                );
              })}
            </div>
          </div>
          <FadeInSection classNames="hidden lg:flex" key={1}>
            <img src={data[0].image.url} alt="Eggplant Office" />
          </FadeInSection>
        </div>
      </Container>
    </div>
  );
}
