import * as yup from 'yup';

export const Validator = {
  name: yup.string().required().label('Payload Name').max(50),
  nameLength: 50,
  content: yup.string().required().label('Content'),
};

export default Validator;
