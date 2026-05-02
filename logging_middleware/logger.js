const BASE_URL = "http://20.207.122.201/evaluation-service/logs";

// Put your token here temporarily
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhc3JpdGhhX2FzaXJlZGR5QHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzY5ODY5NywiaWF0IjoxNzc3Njk3Nzk3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMDc0ZDY1NDktOGRmOS00ODYxLTllZWYtODNhMjJlN2Y2MDNkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYS5hc3JpdGhhIiwic3ViIjoiNThiMjdlOGItMzM0My00MDg4LTlkZTEtNmUyNDI4YmE4ZjVmIn0sImVtYWlsIjoiYXNyaXRoYV9hc2lyZWRkeUBzcm1hcC5lZHUuaW4iLCJuYW1lIjoiYS5hc3JpdGhhIiwicm9sbE5vIjoiYXAyMzExMDAxMTMxNyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjU4YjI3ZThiLTMzNDMtNDA4OC05ZGUxLTZlMjQyOGJhOGY1ZiIsImNsaWVudFNlY3JldCI6IlZwd0pQbW5BUUtIU3FQY2QifQ.bQ9ymNUaLuSNwLxSCsSeGMqv02_d5JPLUDEhJd62fLI";

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