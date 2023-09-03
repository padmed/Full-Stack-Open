import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return { value, type, onChange };
};

export { useField };
