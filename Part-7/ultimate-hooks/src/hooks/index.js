import { useEffect, useState } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setResources(res.data);
    });
  }, []);

  const create = (resource) => {
    axios.post(baseUrl, resource).then((res) => {
      setResources([...resources, res.data]);
    });
  };

  const service = {
    create,
  };

  return [resources, service];
};

export { useField, useResource };
