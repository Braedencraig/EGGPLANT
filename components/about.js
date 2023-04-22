import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";
import FadeInSection from "./fadeIn";

export default function About({ data }) {
  return (
    <div className="bg-accent-2 text-accent-1 text-center">
      <Container>
        <div className="py-20">
          <FadeInSection key={1}>
            <h2
              className="text-lg max-w-[326px] md:max-w-[708px] mx-auto mb-10"
              style={{
                fontFamily: `Roboto, san-serif`,
                letterSpacing: "0.2em",
              }}
            >
              {data[0].title}
            </h2>
          </FadeInSection>
          {data[0].copy.json.content.map((item, index) => {
            return (
              <FadeInSection key={2}>
                <p
                  className="text-2xl md:text-4xl max-w-[326px] md:max-w-[708px] mx-auto mt-10 font-bold"
                  style={{ fontFamily: `Futura, san-serif` }}
                  key={index}
                >
                  {item.content[0].value}
                </p>
              </FadeInSection>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
