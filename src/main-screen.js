import {getScreen} from './utils';

export const getMainScreen = () => {
  const mainScreen = document.querySelector(`.psw-main-screen`);
  const input = mainScreen.querySelector(`.psw-main-screen__input`);
  const searchButton = mainScreen.querySelector(`.psw-main-screen__psw-btn`);
  const buttonLink = mainScreen.querySelector(`.psw-main-screen__psw-btn-link`);
  const form = document.querySelector(`.psw-form`);

  mainScreen.classList.add(`psw-main-screen--active`);

  const onSearchButtonClick = (evt) => {
    evt.preventDefault();

    if (!input.value) {
      input.classList.add(`psw-input-error`);
    } else {
      input.classList.remove(`psw-input-error`);
      alert(`Заполнить поля..`);
    }
  };

  const onButtonLinkClick = (evt) => {
    evt.preventDefault();

    mainScreen.classList.remove(`psw-main-screen--active`);
    form.classList.add(`psw-form--active`);

    getScreen(3);
  };

  searchButton.addEventListener(`click`, onSearchButtonClick);
  buttonLink.addEventListener(`click`, onButtonLinkClick);
};
