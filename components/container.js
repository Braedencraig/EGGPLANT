export default function Container({ children, fullBleed, heroFull = false }) {
  return (
    <div
      className={`${heroFull ? "container2" : "container2"} mx-auto ${
        fullBleed ? "" : "px-[16px]"
      } md:px-[45px] `}
    >
      {children}
    </div>
  );
}
