import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../gql/actions";

const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    variables: { username, password },
    onError: (error) => {
      console.log(error.message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-login-token", token);
    }
  }, [result.data]);

  const submit = (e) => {
    e.preventDefault();
    login();
    setPassword("");
    setUsername("");
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={submit}>
      <div>
        username:{" "}
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>

      <div>
        password:
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
