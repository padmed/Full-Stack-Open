const Notification = ({ message }) => {
  if (message === null) return;

  const style = {
    backgroundColor: "lightGrey",
    color: "green",
    fontSize: 20,
    padding: 12,
    border: "5px solid",
    marginBottom: 15,
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
