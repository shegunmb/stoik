import { useQuery } from "@tanstack/react-query";
import "./App.css";

function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const res = await fetch("/api/hello");
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error : {error.message}</div>;

  return <div>{data.message}</div>;
}

export default App;
