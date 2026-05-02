import { useEffect, useState } from "react";
import { fetchNotifications } from "./services/api";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const notifications = await fetchNotifications();

      const priority = {
        Placement: 3,
        Result: 2,
        Event: 1
      };

      const sorted = notifications.sort((a, b) => {
        if (priority[b.Type] !== priority[a.Type]) {
          return priority[b.Type] - priority[a.Type];
        }

        return new Date(b.Timestamp) - new Date(a.Timestamp);
      });

      setData(sorted.slice(0, 10));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Top 10 Notifications</h1>

      {data.map((item) => (
        <div
          key={item.ID}
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px"
          }}
        >
          <h3>{item.Type}</h3>
          <p>{item.Message}</p>
          <small>{item.Timestamp}</small>
        </div>
      ))}
      <pre>
{JSON.stringify(data, null, 2)}
</pre>
    </div>
  );
}

export default App;