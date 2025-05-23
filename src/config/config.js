let baseUrl = "";
const webUrl = import.meta.env.VITE_LIVE_WEB_URL;

if (window.location.protocol === "https:") {
  baseUrl = import.meta.env.VITE_SERVER_LIVE_URL;
} else {
  baseUrl = import.meta.env.VITE_SERVER_LOCAL_URL;
}

export { baseUrl, webUrl };
