import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhc3JpdGhhX2FzaXJlZGR5QHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwMTI3NSwiaWF0IjoxNzc3NzAwMzc1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNGUyM2Q3OGItYTFkZS00Y2JiLTg5OTItODc2N2U2NWY1MzQ4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYS5hc3JpdGhhIiwic3ViIjoiNThiMjdlOGItMzM0My00MDg4LTlkZTEtNmUyNDI4YmE4ZjVmIn0sImVtYWlsIjoiYXNyaXRoYV9hc2lyZWRkeUBzcm1hcC5lZHUuaW4iLCJuYW1lIjoiYS5hc3JpdGhhIiwicm9sbE5vIjoiYXAyMzExMDAxMTMxNyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjU4YjI3ZThiLTMzNDMtNDA4OC05ZGUxLTZlMjQyOGJhOGY1ZiIsImNsaWVudFNlY3JldCI6IlZwd0pQbW5BUUtIU3FQY2QifQ.E-LPTL-a3lzBZpdvbVJTIE-_ASMKv6gwSGH7ah1uEus";

export const fetchNotifications = async () => {
  const response = await axios.get(
    "/api/evaluation-service/notifications",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  );

  return response.data.notifications;
};