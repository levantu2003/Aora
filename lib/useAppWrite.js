const { useEffect } = require("react");
const { useState } = require("react");
const { Alert } = require("react-native");

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const fetchData = async () => {
    setisLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("Lỗi", error.message);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
