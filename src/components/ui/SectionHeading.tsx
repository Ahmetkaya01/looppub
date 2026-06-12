import MotionReveal from "./MotionReveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "text-center [&_p]:mx-auto" : "text-left";

  return (
    <MotionReveal className={`mx-auto max-w-3xl ${alignment}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </MotionReveal>
  );
}
