const form = document.querySelector('.psw-form');
const formScreens = form.querySelectorAll('.psw-form-screen');
const formFirstScreen = formScreens[0];
const formSecondScreen = formScreens[1];
const formThirdScreen = formScreens[2];
const formFourthScreen = formScreens[3];

const onFormFocus = (evt) => {
  evt.target.classList.remove('psw-form-input-error');
};

dateInputMask('.psw-date-input');
organisationCodeMask('.psw-organisation-code-input');

form.addEventListener('focus', onFormFocus, true);
