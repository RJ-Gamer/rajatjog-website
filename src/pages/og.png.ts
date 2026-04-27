import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import satori from "satori";

// Load the font
const fontPath = path.resolve("src/assets/fonts/atkinson-bold.woff");
const fontData = fs.readFileSync(fontPath);

export async function GET() {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#0f0f0f",
          fontFamily: "Atkinson",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "18px",
                      color: "#3b82f6",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    },
                    children: "Senior Backend Engineer",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "72px",
                      fontWeight: "700",
                      color: "#eeeeee",
                      lineHeight: "1.1",
                    },
                    children: "Rajat Jog",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "28px",
                      color: "#999999",
                      lineHeight: "1.4",
                      maxWidth: "700px",
                    },
                    children:
                      "I build backend systems that are meant to last — not just work.",
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      gap: "20px",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: "16px",
                            color: "#555555",
                            backgroundColor: "#1a1a1a",
                            padding: "8px 16px",
                            borderRadius: "20px",
                          },
                          children: "Python",
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: "16px",
                            color: "#555555",
                            backgroundColor: "#1a1a1a",
                            padding: "8px 16px",
                            borderRadius: "20px",
                          },
                          children: "Django",
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: "16px",
                            color: "#555555",
                            backgroundColor: "#1a1a1a",
                            padding: "8px 16px",
                            borderRadius: "20px",
                          },
                          children: "FastAPI",
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: "16px",
                            color: "#555555",
                            backgroundColor: "#1a1a1a",
                            padding: "8px 16px",
                            borderRadius: "20px",
                          },
                          children: "AWS ML Certified",
                        },
                      },
                    ],
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "16px",
                      color: "#555555",
                    },
                    children: "project-4ir8l.vercel.app",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Atkinson",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });

  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
