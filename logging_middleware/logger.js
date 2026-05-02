const BASE_URL = "/api/evaluation-service/logs";

// Put your token here temporarily (Only update it here, it will be shared automatically)
export const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhc3JpdGhhX2FzaXJlZGR5QHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwMzM1NiwiaWF0IjoxNzc3NzAyNDU2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTZkNzAxOWUtMDNhOC00NGY0LTk4NmMtMWVjNGRjMzFjYzFlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYS5hc3JpdGhhIiwic3ViIjoiNThiMjdlOGItMzM0My00MDg4LTlkZTEtNmUyNDI4YmE4ZjVmIn0sImVtYWlsIjoiYXNyaXRoYV9hc2lyZWRkeUBzcm1hcC5lZHUuaW4iLCJuYW1lIjoiYS5hc3JpdGhhIiwicm9sbE5vIjoiYXAyMzExMDAxMTMxNyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjU4YjI3ZThiLTMzNDMtNDA4OC05ZGUxLTZlMjQyOGJhOGY1ZiIsImNsaWVudFNlY3JldCI6IlZwd0pQbW5BUUtIU3FQY2QifQ.bg7nTxGnw4USvuENQRZlQ-JH-tMh9xumt7y20tqyKdc";

export async function Log(stack, level, pkg, message) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: pkg.toLowerCase(),
        message
      })
    });

    const data = await response.json();
    console.log("Log Success:", data);
  } catch (error) {
    console.error("Logging Failed:", error);
  }
}