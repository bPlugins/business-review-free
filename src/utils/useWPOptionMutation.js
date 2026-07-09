const { useState } = wp.element;

const useWPOptionMutation = (key, { dataType = "string" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const saveData = (data) => {
    if (!isLoading) {
      setIsError(false);
      setError(null);
      setIsLoading(true);
      try {
        const model = new wp.api.models.Settings({
          [key]: prepareData(data, 'save'),
        });
        model.save().then((response) => {
          setData(prepareData(response[key], 'response'));
          setIsLoading(false);
        });
      } catch (error) {
        setIsError(true);
        setError(error?.message);
        setIsLoading(false);
      }
    }
  };

  const prepareData = (data, type) => {
    let newData = data;
    if (dataType === "object") {
      const { isLoaded, ...restData } = data;
      newData = restData;
      try {
        newData = type === 'save' ? JSON.stringify(data) : JSON.parse(data);
      } catch (error) {
        setError(error?.message);
        setIsError(true);
      }
    }
    return newData;
  };
  return { data, saveData, isLoading, isError, error };
};
export default useWPOptionMutation;
