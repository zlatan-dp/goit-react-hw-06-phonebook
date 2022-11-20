// import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, addContact } from 'redux/contactsSlice';
import {
  AddBtn,
  ContactFormInput,
  ContactFormLabel,
  ContactFormWrap,
} from './ContactForm.styled';

export const ContactForm = () => {
  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

  /*   const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  }; */

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const nameCheck = name => {
      const normalizedName = name.toLowerCase();
      const checked = contacts.find(
        contact => contact.name.toLowerCase() === normalizedName
      );
      //console.log(checked);
      if (checked) return checked.name;
    };

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (nameCheck(name)) return alert(`${name} is already in contacts`);

    dispatch(addContact(newContact));

    form.reset();
  };

  /*   const reset = () => {
    setName('');
    setNumber('');
  }; */

  return (
    <ContactFormWrap onSubmit={handleSubmit}>
      <ContactFormLabel>
        Name
        <ContactFormInput
          type="text"
          name="name"
          // value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          // onChange={handleChange}
        />
      </ContactFormLabel>
      <ContactFormLabel>
        Phone
        <ContactFormInput
          type="tel"
          name="number"
          // value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          // onChange={handleChange}
        />
      </ContactFormLabel>
      <AddBtn type="submit">Add contact</AddBtn>
    </ContactFormWrap>
  );
};
