import Image from "next/image";

export default function ContentImage({ image, priority = false }) {
  if (!image) return null;

  return (
    <figure className="content-visual">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 860px) calc(100vw - 2rem), 820px"
        priority={priority}
      />
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}
