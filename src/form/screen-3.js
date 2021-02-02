import {checkCmpletenessFields, getScreen, setAddressDetails, ps__hide_alert, ps__show_alert} from "../utils";
import * as $ from "jquery";
import 'suggestions-jquery/dist/js/jquery.suggestions.min';

export const getThirdScreenForm = () => {
  const form = document.querySelector(`.psw-form`);
  const formThirdScreen = form.querySelectorAll(`.psw-form-screen`)[2];

  const checkboxIsClientForeigner = formThirdScreen.querySelector(`#isClientForeigner`);
  const inputWrapClientIssuedPassport = formThirdScreen.querySelector(`#clientIssuedPassportInputWrap`);
  const inputClientIssuedPassport = inputWrapClientIssuedPassport.querySelector(`#clientPassportOrganisation`);
  const formThirdScreenButtonPrev = formThirdScreen.querySelector(`.psw-btn-prev-step`);
  const formThirdScreenButtonNext = formThirdScreen.querySelector(`.psw-btn-next-step`);

  $(`#clientAddressName + label`)
    .css(`top`, `-17px`)
    .css(`font-size`, `12px`);

  $(`#clientAddressName`).suggestions({
    token: `3997eb72967889aaf9aefd5b65060dc1ab866224`,
    type: `ADDRESS`,
    onSelect(suggestion) {
      console.log(suggestion);
      if (!suggestion.data.house) {

      } else {
        setAddressDetails(`client`, suggestion.data);
      }
    }
  });

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
