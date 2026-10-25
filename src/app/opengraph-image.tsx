import { ImageResponse } from "next/og";

import { cv } from "@/content/cv";

export const alt = `${cv.name} – ${cv.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #061113 0%, #0c2a2b 55%, #155b55 100%)",
        color: "#f2f8f7",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#4cc3b3",
            color: "#04201d",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          HR
        </div>
        <div style={{ fontSize: 26, color: "#9db3b3" }}>{cv.location}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
          {cv.name}
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 36 }}>
          <span style={{ color: "#7ad8cb" }}>{cv.roleParts[0]}</span>
          <span style={{ color: "#2a4a4f", margin: "0 18px" }}>|</span>
          <span>{cv.roleParts[1]}</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {cv.stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "18px 22px",
              borderRadius: 18,
              border: "1px solid rgba(122, 216, 203, 0.3)",
              background: "rgba(6, 17, 19, 0.45)",
            }}
          >
            <div style={{ fontSize: 34, fontWeight: 700 }}>{stat.value}</div>
            <div style={{ fontSize: 20, color: "#9db3b3" }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
