// VideoComponent.tsx
// import { videoTagString, VideoTagProps } from "./videoTagString";

const videoTagString = (props = {}) => {
  const classOrClassName = props.className || props.class;
  const classString = classOrClassName ? ` class="${classOrClassName}"` : ``;
  const muted = props.muted ? ` muted` : ``;
  const autoPlay = props.autoPlay ? ` autoplay` : ``;
  const playsInline = props.playsInline ? ` playsinline` : ``;
  const loop = props.loop ? ` loop` : ``;
  const poster = props.poster ? ` poster` : ``;
  const src = props.src ? ` src="${props.src}"` : ` src=""`; // required
  const type = props.type ? ` type="${props.type}"` : ``;

  return `<video${classString}${muted}${autoPlay}${playsInline}${loop}${poster}><source${src}${type}></video>`;
};

export const VideoComponent = (props) => (
  <span
    dangerouslySetInnerHTML={{
      __html: videoTagString(props),
    }}
  />
);

VideoComponent.defaultProps = {
  muted: true,
  autoPlay: true,
  playsInline: true,
  loop: true,
};

export default VideoComponent;
