import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        background: "var(--color-bg-void)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <p
        className="text-caption mb-4"
        style={{ color: "var(--color-accent-primary)" }}
      >
        404
      </p>
      <h1
        className="text-h1 mb-4"
        style={{ color: "var(--color-text-primary)" }}
      >
        Page not found.
      </h1>
      <p
        className="text-body mb-12"
        style={{ color: "var(--color-text-secondary)" }}
      >
        This frame doesn&apos;t exist in the timeline.
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
