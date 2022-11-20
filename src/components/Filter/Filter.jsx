// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FilterInput, FilterLabel } from './Filter.styled';
import { getFilter, filterContacts } from 'redux/contactsSlice';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const changeFilter = evt => {
    dispatch(filterContacts(evt.target.value));
  };

  return (
    <FilterLabel>
      Find contacts by name
      <FilterInput type="text" value={filter} onChange={changeFilter} />
    </FilterLabel>
  );
};
/* 
Filter.protTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
 */
