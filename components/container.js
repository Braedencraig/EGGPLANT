export default function Container({ children, fullBleed }) {
  return (
    <div
      className={`container mx-auto ${
        fullBleed ? "" : "px-[16px]"
      } md:px-[45px]`}
    >
      {children}
    </div>
  );
}
