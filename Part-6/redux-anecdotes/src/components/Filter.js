import { useDispatch } from "react-redux";
import { filterSearch } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const filterAnecdotes = (event) => {
    const toFilter = event.target.value;
    dispatch(filterSearch(toFilter));
  };

  return (
    <div>
      Filter: <input onChange={filterAnecdotes}></input>
    </div>
  );
};

export default Filter;
