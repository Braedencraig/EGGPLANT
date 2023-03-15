import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";

export default function About({ data }) {
  return (
    <div className="bg-accent-2 text-accent-1 text-center">
      <Container>
        <div className="py-20">
          <h2
            className="text-lg max-w-[326px] md:max-w-[708px] mx-auto mb-10"
            style={{ fontFamily: `Roboto, san-serif`, letterSpacing: "0.2em" }}
          >
            {data[0].title}
          </h2>
          {data[0].copy.json.content.map((item, index) => {
            return (
              <p
                className="text-2xl md:text-4xl max-w-[326px] md:max-w-[708px] mx-auto mt-10 font-bold"
                style={{ fontFamily: `Futura, san-serif` }}
                key={index}
              >
                {item.content[0].value}
              </p>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
