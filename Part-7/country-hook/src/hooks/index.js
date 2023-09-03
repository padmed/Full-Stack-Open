import { useState, useEffect } from "react";
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

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name !== "") {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then((res) => {
          res.found = true;
          setCountry(res);
        })
        .catch(() => {
          const country = {};
          country.found = false;
          setCountry(country);
        });
    }
  }, [name]);

  return country;
};

export { useField, useCountry };
