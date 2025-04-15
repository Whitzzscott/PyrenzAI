import { hydrateRoot } from "react-dom/client";
import { RemixBrowser } from "@remix-run/react";

function App() {
  return <RemixBrowser />;
}

try {
  hydrateRoot(document, <App />);
} catch (error) {
  document.body.innerHTML = `<h1>Error during hydration... ${error}</h1>`;
}
