import { Resvg } from "@resvg/resvg-js";
import { getCollection } from "astro:content";
import fs from "fs";
import path from "path";
import satori from "satori";

const fontPath = path.resolve("src/assets/fonts/atkinson-bold.woff");
const fontData = fs.readFileSync(fontPath);
const regularFontPath = path.resolve("src/assets/fonts/atkinson-regular.woff");
const regularFontData = fs.readFileSync(regularFontPath);

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export async function GET({ props }: { props: any }) {
  const { post } = props;
  const title = post.data.title;
  const description = post.data.description;
  const tags = post.data.tags || [];

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
                gap: "20px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      gap: "10px",
                    },
                    children: tags.slice(0, 3).map((tag: string) => ({
                      type: "div",
                      props: {
                        style: {
                          fontSize: "14px",
                          color: "#3b82f6",
                          backgroundColor: "#1e3a5f",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontWeight: "700",
                        },
                        children: tag,
                      },
                    })),
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: title.length > 40 ? "52px" : "64px",
                      fontWeight: "700",
                      color: "#eeeeee",
                      lineHeight: "1.15",
                      maxWidth: "900px",
                    },
                    children: title,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "24px",
                      color: "#999999",
                      lineHeight: "1.5",
                      maxWidth: "800px",
                    },
                    children: description,
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
                borderTop: "1px solid #222222",
                paddingTop: "24px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: "18px",
                            fontWeight: "700",
                            color: "#eeeeee",
                          },
                          children: "Rajat Jog",
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: "14px",
                            color: "#555555",
                          },
                          children:
                            "Senior Backend Engineer · Systems Over Syntax",
                        },
                      },
                    ],
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "14px",
                      color: "#555555",
                    },
                    children: "rajat-jog-dev.vercel.app",
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
        {
          name: "Atkinson",
          data: regularFontData,
          weight: 400,
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
