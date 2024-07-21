import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import SetAuthorBirth from "./components/SetAuthorBirth";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    const tokenExists = localStorage.getItem("user-login-token");

    if (tokenExists) {
      setToken(tokenExists);
    }
  }, []);

  if (!token) {
    return (
      <>
        {" "}
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("login")}>login</button>
        <Authors show={page === "authors"} />
        <Books show={page === "books"} />
        <LoginForm show={page === "login"} setToken={setToken} />
      </>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("editAuthor")}>edit author</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <SetAuthorBirth show={page === "editAuthor"} />
    </div>
  );
};

export default App;
