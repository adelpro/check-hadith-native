import { isLoading } from "expo-font";

function useFetchDorar(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const APIURI = `https://dorar-hadith-api.herokuapp.com/api/search?value=" + ${query}`;
  setIsLoading(true);
  setData([]);
  setError(null);
  fetch(APIURI)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      setData("");
      setError(err.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
  return {
    isLoading,
    data,
    error,
  };
}
