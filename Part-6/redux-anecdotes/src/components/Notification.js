import { useSelector } from "react-redux";
import { hideNotification } from "../reducers/notificationReducer.js";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Notification = () => {
  const [timeoutId, setTimeoutId] = useState(null);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const removeNotification = () => {
    const id = setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
    setTimeoutId(id);
  };

  useEffect(() => {
    if (notification !== "") {
      clearTimeout(timeoutId);
      removeNotification();
    }
  }, [notification]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return notification === "" ? null : <div style={style}>{notification}</div>;
};

export default Notification;
