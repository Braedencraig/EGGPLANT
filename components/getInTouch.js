import Container from "./container";

export default function GetInTouch({ data, people }) {
  return (
    <div className="bg-[#ECECEC] text-black getintouch">
      <Container>
        <div className="flex justify-between py-14">
          <div>
            <div>
              <h3
                style={{ fontFamily: `Futura, san-serif` }}
                className="text-center md:text-left text-4xl text-accent-1 font-bold"
              >
                {data[0].title}
              </h3>
            </div>
            <div className="flex w-full flex-wrap">
              {people.map((person, i) => {
                return (
                  <div
                    key={i}
                    className="text-center md:text-left w-full md:w-[33%] mt-6"
                  >
                    <h3
                      style={{
                        fontFamily: `Roboto, san-serif`,
                        letterSpacing: "0.2em",
                      }}
                      className="font-bold"
                    >
                      {person.name.toUpperCase()}
                    </h3>
                    <p>{person.title}</p>
                    <p>{person.email}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hidden lg:flex">
            <img src={data[0].image.url} alt="Eggplant Office" />
          </div>
        </div>
      </Container>
    </div>
  );
}
