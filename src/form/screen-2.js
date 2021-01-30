import {checkCmpletenessFields, getScreen} from "../utils";

export const getSecondScreenForm = () => {
  const form = document.querySelector(`.psw-form`);
  const formSecondScreen = form.querySelectorAll(`.psw-form-screen`)[1];
  const formFourthScreen = form.querySelectorAll(`.psw-form-screen`)[3];

  const checkboxIsInsurerForeigner = formSecondScreen.querySelector(`#isInsurerForeigner`);
  const inputWrapInsurerIssuedPassport = formSecondScreen.querySelector(`#insurerIssuedPassportInputWrap`);
  const inputInsurerIssuedPassport = inputWrapInsurerIssuedPassport.querySelector(`#insurerIssuedPassport`);
  const checkboxIsInsurerClient = formSecondScreen.querySelector(`#isInsurerClient`);
  const formSecondScreenButtonPrev = formSecondScreen.querySelector(`.psw-btn-prev-step`);
  const formSecondScreenButtonNext = formSecondScreen.querySelector(`.psw-btn-next-step`);
  const formFourthScreenButtonPrev = formFourthScreen.querySelector(`.psw-btn-next-step`);

  inputInsurerIssuedPassport.classList.add(`not-required`);

  const onCheckboxIsInsurerForeignerChange = (evt) => {
    if (evt.target.checked) {
      inputWrapInsurerIssuedPassport.classList.remove(`psw-form-item--hidden`);
      inputInsurerIssuedPassport.classList.remove(`not-required`);
    } else {
      inputWrapInsurerIssuedPassport.classList.add(`psw-form-item--hidden`);
      inputInsurerIssuedPassport.classList.add(`not-required`);
    }
  };

  const onCheckboxIsInsurerClientChange = (evt) => {

    if (evt.target.checked) {
      formSecondScreenButtonNext.textContent = `Добавить водителей`;
      formFourthScreenButtonPrev.textContent = `Заполнить данные страхователя`;
    } else {
      formSecondScreenButtonNext.textContent = `Заполнить данные собственника`;
      formFourthScreenButtonPrev.textContent = `Заполнить данные собственника`;
    }
  };

  const onFormSecondScreenButtonPrevClick = (evt) => {
    evt.preventDefault();
    getScreen(1);
  };

  const onFormSecondScreenButtonNextClick = (evt) => {
    evt.preventDefault();

    const errors = checkCmpletenessFields(formSecondScreen);

    if (!errors) {
      checkboxIsInsurerClient.checked ? getScreen(4) : getScreen(3);
    }
  };

  checkboxIsInsurerForeigner.addEventListener(`change`, onCheckboxIsInsurerForeignerChange);
  checkboxIsInsurerClient.addEventListener(`change`, onCheckboxIsInsurerClientChange);
  formSecondScreenButtonPrev.addEventListener(`click`, onFormSecondScreenButtonPrevClick);
  formSecondScreenButtonNext.addEventListener(`click`, onFormSecondScreenButtonNextClick);
};
