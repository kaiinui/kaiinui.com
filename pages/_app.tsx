import "../styles/notion.css";
import "../styles/anotion-overrides.css";
import "../styles/overrides.css";
import React from "react";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}