import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Иван — Автоматизация и Курсы n8n";
  const subtitle = searchParams.get("subtitle") || "n8n • ИИ‑агенты • Интеграции";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "white",
          padding: "48px",
          fontSize: 48,
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 28, color: "#555" }}>{subtitle}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
