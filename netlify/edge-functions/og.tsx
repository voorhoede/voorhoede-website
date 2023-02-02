import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";

const baseUrl = Deno.env.get("BASE_URL") || "http://localhost:8888";

const fetchFont = async (path: string) => {
  const res = await fetch(new URL(path, baseUrl));
  return await res.arrayBuffer();
};

const fonts = Promise.all([
  fetchFont("/fonts/apercu-regular--subset.ttf"),
  fetchFont("/fonts/apercu-bold--subset.ttf"),
]);

export default async function handler(req: Request) {
  const [fontRegular, fontBold] = await fonts;

  const url = new URL(req.url);
  const title = url.searchParams.get("title");
  const imageUrl = url.searchParams.get("image-url");
  const authors = url.searchParams.get("authors");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: imageUrl ? "100px 100px" : "50px 50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffeca",
          lineHeight: 1.5,
        }}
      >
        <img
          src="https://www.voorhoede.nl/images/logo-with-text.svg"
          style={{
            width: "300px",
            position: "absolute",
            top: "40px",
            right: "40px",
          }}
        />
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: imageUrl ? "65%" : "100%",
            paddingRight: imageUrl ? "100px" : "0",
            height: "100%",
            justifyContent: "center",
            alignItems: imageUrl ? "flex-start" : "center",
            color: "blue",
          }}
        >
          <span
            style={{
              fontSize: 70,
              fontFamily: "Apercu",
              fontWeight: "bold",
            }}
          >
            {title}
          </span>
          {authors &&
            JSON.parse(authors).map(
              ({ name, imageUrl }: { name: string; imageUrl: string }) => (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    fontSize: 30,
                    fontFamily: "Apercu",
                    fontWeight: "normal",
                  }}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      style={{
                        width: "50px",
                        borderRadius: "50%",
                        filter: "grayscale(100%)",
                      }}
                    />
                  )}
                  {name}
                </span>
              )
            )}
        </span>
        {imageUrl && (
          <img
            src={imageUrl}
            style={{
              width: "35%",
            }}
          />
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Apercu",
          data: fontBold,
          style: "normal",
        },
        {
          name: "Apercu",
          data: fontRegular,
          style: "bold",
        },
      ],
    }
  );
}

export const config = { path: "/api/og" };
