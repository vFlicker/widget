import {dateInputMask, organisationCodeMask} from './utils';

export const index = () => {
  const form = document.querySelector(`.psw-form`);

  const onFormFocus = (evt) => {
    evt.target.classList.remove(`psw-form-input-error`);
  };

  dateInputMask(`.psw-date-input`);
  organisationCodeMask(`.psw-organisation-code-input`);

  form.addEventListener(`focus`, onFormFocus, true);
};


