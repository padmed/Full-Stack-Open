import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const resetForm = () => {
    console.log({ ...content });
    content.reset();
    author.reset();
    info.reset();
  };

  const filterFieldProps = (field) => {
    // eslint-disable-next-line no-unused-vars
    const { reset, ...filteredProps } = field;
    return filteredProps;
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...filterFieldProps(content)} />
        </div>
        <div>
          author
          <input {...filterFieldProps(author)} />
        </div>
        <div>
          url for more info
          <input {...filterFieldProps(info)} />
        </div>
        <button>create</button>
        <button type="reset" onClick={resetForm}>
          reset
        </button>
      </form>
    </div>
  );
};

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
};

export default CreateNew;
