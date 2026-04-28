window.CONFIG = {
    API_BASE: window.location.hostname === "127.0.0.1"
      ? "http://localhost:3000/rooms"
      : "https://your-backend-domain.com/rooms"
} 