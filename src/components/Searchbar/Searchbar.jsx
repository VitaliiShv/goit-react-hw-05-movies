import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import initialState from './initialState';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({
    ...initialState,
  });

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(state);
    resetForm();
  };

  const resetForm = () => {
    setState({ ...state });
  };

  return (
    <div className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className={css.searchFormInput}
          name="searchQuery"
          value={state.searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          required
        />
        <button type="submit" className={css.searchFormButton}>
          <ImSearch style={{ width: 22, height: 22 }} />
        </button>
      </form>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
