const Notification = ({ message, requestSuccess }) => {
  if (message === null) return;

  const styleSuccess = {
    backgroundColor: "lightGrey",
    color: "green",
    fontSize: 20,
    padding: 12,
    border: "5px solid",
    marginBottom: 15,
  };

  const styleFail = {
    backgroundColor: "lightGrey",
    color: "red",
    fontSize: 20,
    padding: 12,
    border: "5px solid",
    marginBottom: 15,
  };

  const style = requestSuccess ? styleSuccess : styleFail;

  return <div style={style}>{message}</div>;
};

export default Notification;
