import * as $ from 'jquery';
import {fillBySuggest, getScreen, preloaderOn, preloaderOff, ps__show_alert, ps__hide_alert} from './utils';

export const getMainScreen = () => {
  const mainScreen = document.querySelector(`.psw-main-screen`);
  const input = mainScreen.querySelector(`.psw-main-screen__input`);
  const searchButton = mainScreen.querySelector(`.psw-main-screen__psw-btn`);
  const buttonLink = mainScreen.querySelector(`.psw-main-screen__psw-btn-link`);
  const form = document.querySelector(`.psw-form`);

  mainScreen.classList.add(`psw-main-screen--active`);

  const onSearchButtonClick = (evt) => {
    fillBySuggest();
  };

  const onButtonLinkClick = (evt) => {
    evt.preventDefault();

    mainScreen.classList.remove(`psw-main-screen--active`);
    form.classList.add(`psw-form--active`);

    getScreen(1);
  };

  const setStartDate = () => {
    let date = new Date();
    date = date.setDate(date.getDate() + 4);
    date = new Date(date);
    document.querySelector('#osagoStartDate').value = (date.getDate() > 9 ? '' : '0') + date.getDate() + '.' + ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1) + '.' + date.getFullYear();
  }

  searchButton.addEventListener(`click`, onSearchButtonClick);
  buttonLink.addEventListener(`click`, onButtonLinkClick);
  setStartDate();
};
