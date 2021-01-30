import {checkCmpletenessFields, getScreen} from "../utils";

export const getThirdScreenForm = () => {
  const form = document.querySelector(`.psw-form`);
  const formThirdScreen = form.querySelectorAll(`.psw-form-screen`)[2];

  const checkboxIsClientForeigner = formThirdScreen.querySelector(`#isClientForeigner`);
  const inputWrapClientIssuedPassport = formThirdScreen.querySelector(`#clientIssuedPassportInputWrap`);
  const inputClientIssuedPassport = inputWrapClientIssuedPassport.querySelector(`#clientIssuedPassport`);
  const formThirdScreenButtonPrev = formThirdScreen.querySelector(`.psw-btn-prev-step`);
  const formThirdScreenButtonNext = formThirdScreen.querySelector(`.psw-btn-next-step`);

  inputClientIssuedPassport.classList.add(`not-required`);

  const onCheckboxIsClientForeignerChange = (evt) => {
    if (evt.target.checked) {
      inputWrapClientIssuedPassport.classList.remove(`psw-form-item--hidden`);
      inputClientIssuedPassport.classList.remove(`not-required`);
    } else {
      inputWrapClientIssuedPassport.classList.add(`psw-form-item--hidden`);
      inputClientIssuedPassport.classList.add(`not-required`);
    }
  };

  const onFormThirdScreenButtonPrevClick = (evt) => {
    evt.preventDefault();
    getScreen(2);
  };

  const onFormThirdScreenButtonNextClick = (evt) => {
    evt.preventDefault();

    const errors = checkCmpletenessFields(formThirdScreen);

    if (!errors) {
      getScreen(4);
    }
  };

  checkboxIsClientForeigner.addEventListener(`change`, onCheckboxIsClientForeignerChange);
  formThirdScreenButtonPrev.addEventListener(`click`, onFormThirdScreenButtonPrevClick);
  formThirdScreenButtonNext.addEventListener(`click`, onFormThirdScreenButtonNextClick);
};
