import { useSelector } from "react-redux";
import { writeNotification } from "../reducers/notificationReducer.js";
import { useDispatch } from "react-redux";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  setTimeout(() => {
    dispatch(writeNotification(""));
  }, 5000);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return notification === "" ? null : <div style={style}>{notification}</div>;
};

export default Notification;
