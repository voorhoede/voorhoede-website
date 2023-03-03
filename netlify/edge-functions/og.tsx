import type { Config } from "https://edge.netlify.com/";
import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.6/mod.ts";

type Author = {
  name: string;
  image: {
    url: string;
  };
};

const AuthorBadge = ({ name, image }: Author) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: 10,
    }}
  >
    {image && (
      <img
        style={{
          width: 55,
          height: 55,
          borderRadius: "50%",
          marginRight: 20,
        }}
        src={`${image.url}?w=135&q=45&auto=format,compress&ar=1:1&fit=crop&crop=faces`}
      />
    )}
    <div
      style={{
        fontSize: 30,
      }}
    >
      {name}
    </div>
  </div>
);

export default async function handler(req: Request) {
  const { origin } = new URL(req.url);
  const fontRegular = fetch(new URL("/fonts/apercu-regular-pro.ttf", origin)).then(
    (res) => res.arrayBuffer()
  );
  const fontBold = fetch(new URL("/fonts/apercu-bold-pro.ttf", origin)).then(
    (res) => res.arrayBuffer()
  );
  const fontRegularData = await fontRegular;
  const fontBoldData = await fontBold;
  const url = new URL(req.url);
  const title = url.searchParams.get("title");
  const imageUrl = url.searchParams.get("imageUrl");
  const authors = url.searchParams.get("authors");
  const parsedAuthors = JSON.parse(authors || "[]");

  console.log('generating image...')

  const response = new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          display: "flex",
          backgroundColor: "#fffeca",
          fontFamily: "Apercu",
          color: "blue",
        }}
      >
        {/* content */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "40px 0 40px 40px",
            height: "100%",
            width: imageUrl ? "60%" : "100%",
          }}
        >
          {/* title */}
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontStyle: "italic",
              fontWeight: 800,
            }}
          >
            {title}
          </div>

          {/* authors */}
          {parsedAuthors.length ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: '40px',
              }}
            >
              {parsedAuthors.map(({ name, image }: Author) => (
                <AuthorBadge name={name} image={image} />
              ))}
            </div>
          ) : 'doei'}
        </div>
        {/* image */}
        {imageUrl && (
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px",
              backgroundColor: "#ffe400",
              height: "100%",
            }}
          >
            <img
              alt="Vercel"
              width="100%"
              src={`${imageUrl}?w=400&q=45&auto=format,compress`}
            />
          </div>
        )}
      </div>
    ),
    {
      width: 1000,
      height: 500,
      fonts: [
        {
          name: "Apercu",
          data: fontRegularData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Apercu",
          data: fontBoldData,
          style: "normal",
          weight: 800,
        },
      ],
    }
  );

  response.headers.set("Cache-Control", "public, max-age=31536000");

  return response;
}

export const config: Config = {
  path: "/api/og",
};
