
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  import React from 'react'
  import Lenis from 'lenis'

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1 - Math.pow(1 - t, 3)),
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  