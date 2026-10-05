/** The Hexa robot in a round white badge (decorative; the name is always shown next to it). */
export function HexaAvatar({ size = 32 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid flex-none place-items-center overflow-hidden rounded-full bg-white shadow-[0_0_0_1px_rgb(6_20_38/0.08)]"
      style={{ width: size, height: size }}
    >
      <picture>
        <source type="image/avif" srcSet="/brand/hexa-robot.avif" />
        <source type="image/webp" srcSet="/brand/hexa-robot.webp" />
        <img src="/brand/hexa-robot.png" alt="" width={size} height={size} className="h-[86%] w-[86%] object-contain" style={{ margin: 'auto' }} />
      </picture>
    </span>
  );
}
