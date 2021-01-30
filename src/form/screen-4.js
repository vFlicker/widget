import { checkCmpletenessFields, getScreen } from "../utils";

export const getFourthScreenForm = () => {
  const form = document.querySelector('.psw-form');
  const formSecondScreen = form.querySelectorAll('.psw-form-screen')[1];
  const formFourthScreen = form.querySelectorAll('.psw-form-screen')[3];

  const checkboxsIsDriverForeigner = formFourthScreen.querySelectorAll('.psw-form-checkbox--driver-license');
  const checkboxsNoDiagnosticCard = formFourthScreen.querySelectorAll('.psw-form-checkbox--no-diagnostic-card');
  const checkboxUnlimitedDrivers = formFourthScreen.querySelector('#isUnlimitedDrivers');
  const checkboxIsInsurerClient = formSecondScreen.querySelector('#isInsurerClient');
  const buttonsCopy = formFourthScreen.querySelectorAll('.psw-btn--copy');
  const driverScreens = formFourthScreen.querySelectorAll('.psw-form-screen-driver');
  const driverButtonsWrap = formFourthScreen.querySelector('.psw-drivers-actions__buttons');
  const driverButtons = driverButtonsWrap.querySelectorAll('.psw-drivers-button');
  const formFourthScreenButtonPrev = formFourthScreen.querySelector('.psw-btn-prev-step');
  const formFourthScreenButtonNext = formFourthScreen.querySelector('.psw-btn-next-step');
  const inputWrappers = formFourthScreen.querySelectorAll('.has-previous-license-items');
  
  /* -----------------------------
              Расчёт
   ----------------------------- */

  const responseWrapper =  document.querySelector('.psw-response');

  const outputCalculateResponseHtml = (data) => {
    const responseList = responseWrapper.querySelector('.psw-response__list');

    if (data.offers.success) {
      const html = data.offers.success
        .map(item => {
          return (
            `<li class="psw-response__item  psw-response__item--success">
              <span class="psw-response-item__status">Одобрен</span>
              <div class="psw-response-item__img">
                <img src="${item.partner.logoUrl}" alt="Лого - ${item.partner.name}">
              </div>
              <span class="psw-response-item__name">${item.partner.name}</span>
              <span class="psw-response-item__price">${item.offerAmount} руб.</span>
              <button class="psw-response__btn psw-btn">Оформить</button>
            </li>`
          )
        })
        .join('');

      responseList.insertAdjacentHTML('beforeend', html);
    }

    if (data.offers.errors) {
      const html = data.offers.errors
        .map(item => {
          return (
            `<li class="psw-response__item  psw-response__item--error">
              <span class="psw-response-item__status">Отказ</span>
              <div class="psw-response-item__img">
                <img src="${item.partner.logoUrl}" alt="Лого - ${item.partner.name}">
              </div>
              <span class="psw-response-item__name">${item.partner.name}</span>
            </li>`
          )
        })
        .join('');

      responseList.insertAdjacentHTML('beforeend', html);
    }
  }

  const getCalculateResponse = async () => {
    const res = await fetch('./data/response.json');
    const data = await res.json();

    outputCalculateResponseHtml(data);
  };

  const calculate = () => {
    form.classList.remove('psw-form--active');
    responseWrapper.classList.add('psw-response--active');
    getCalculateResponse();
  };

  /* -----------------------------
              !Расчёт
   ----------------------------- */

  for (const inputWrapper of inputWrappers) {
    const inputs = inputWrapper.querySelectorAll('input');

    for (const input of inputs) {
      input.classList.add('not-required');
    }

  }

  if (driverScreens.length > 0) {
    for (let index = 0; index < driverScreens.length; index++) {
      const screen = driverScreens[index];
      const button = driverButtons[index];

      const onDriverButtonClick = (evt) => {
        evt.preventDefault();

        const isActiveDriver = screen.classList.contains('psw-form-screen-driver--active');

        if (!isActiveDriver) {
          for (let index = 0; index < driverScreens.length; index++) {
            const screenActive = driverScreens[index];
            const buttonActive = driverButtons[index];

            screenActive.classList.remove('psw-form-screen-driver--active');
            buttonActive.classList.remove('psw-drivers-button--active');
          }

          screen.classList.add('psw-form-screen-driver--active');
          button.classList.add('psw-drivers-button--active');
        }
      };

      button.addEventListener('click', onDriverButtonClick);
    }
  }

  const onCheckboxDriverForeignDriverLicenseChange = (evt) => {
  /* Ищем соседний colums-item в котором находится чекбокс. Написал так, чтобы не
    дублировать #checkboxIsDriverForeigner тк. у каждого из водителей он свой */

    const checkboxIsDriverForeigner = evt.target
      .closest('.psw-form-item__colums-item')
      .previousElementSibling
      .querySelector('.psw-form-checkbox');

    if (evt.target.checked) {
      checkboxIsDriverForeigner.checked = true;
      checkboxIsDriverForeigner.disabled = true;
    } else {
      checkboxIsDriverForeigner.disabled = false;
    }
  };

  const onCheckboxsNoDiagnosticCardChange = (evt) => {
    const inputWrapper = evt.target
      .closest('.psw-form-item')
      .nextElementSibling;

    const inputs = inputWrapper.querySelectorAll('input');

    if (evt.target.checked) {
      inputWrapper.classList.remove('psw-form-item--hidden')
      for (const input of inputs) {
        input.classList.remove('not-required');
      }
    } else {
      inputWrapper.classList.add('psw-form-item--hidden')
      for (const input of inputs) {
        input.classList.add('not-required');
      }
    }
  };

  const onButtonCopyClick = (evt) => {
    evt.preventDefault();

    const driver = evt.target.closest('.psw-form-screen-driver--active')
    const lastName = driver.querySelector('.psw-form-input--driver-last-name');
    const firstName = driver.querySelector('.psw-form-input--driver-first-name');
    const middleName = driver.querySelector('.psw-form-input--driver-middle-name');
    const gender = driver.querySelector('.psw-form-select--driver-gender');
    const birthDate = driver.querySelector('.psw-form-input--driver-birth-date');
    const foreigner = driver.querySelector('.psw-form-checkbox--driver-foreigner');

    lastName.value = insurerLastName.value;
    firstName.value = insurerFirstName.value;
    middleName.value = insurerMiddleName.value;
    gender.value = insurerGender.value;
    birthDate.value = insurerBirthDate.value;
    foreigner.value = isInsurerForeigner.value;

    if (isInsurerForeigner.checked) {
      foreigner.checked = true;
    }

    for (const button of buttonsCopy) {
      button.remove();
    }
  }

  const onCheckboxUnlimitedDriversChange = (evt) => {
    const screenActive = formFourthScreen.querySelector('.psw-form-screen-driver--active');
    const buttonActive = driverButtonsWrap.querySelector('.psw-drivers-button--active');

    if (evt.target.checked) {
      screenActive.classList.remove('psw-form-screen-driver--active');
      buttonActive.classList.remove('psw-drivers-button--active');
      driverButtonsWrap.style.display = 'none';
    } else {
      driverScreens[0].classList.add('psw-form-screen-driver--active');
      driverButtons[0].classList.add('psw-drivers-button--active');
      driverButtonsWrap.style.display = 'block';
    }
  }

  const onFormFourthScreenButtonPrevClick = (evt) => {
    evt.preventDefault();
    checkboxIsInsurerClient.checked ? getScreen(2) : getScreen(3);
  };

  for (const button of buttonsCopy) {
    button.addEventListener('click', onButtonCopyClick);
  }

  for (const checkbox of checkboxsIsDriverForeigner) {
    checkbox.addEventListener('change', onCheckboxDriverForeignDriverLicenseChange);
  }

  for (const checkbox of checkboxsNoDiagnosticCard) {
    checkbox.addEventListener('change', onCheckboxsNoDiagnosticCardChange);
  }

  const onFormFourthScreenButtonNextClick = (evt) => {
    evt.preventDefault();
    let errors = false;

    for (const screen of driverScreens) {
      const lastName = screen.querySelector('.psw-form-input--driver-last-name');
      const firstName = screen.querySelector('.psw-form-input--driver-first-name');
      const series = screen.querySelector('.psw-form-input--driver-series');
      const number = screen.querySelector('.psw-form-input--driver-number');

      screen.closest('.psw-form-screen-driver').classList.remove('required');

      if (lastName.value.length > 0
          && firstName.value.length > 0
          && series.value.length > 0
          && number.value.length > 0) {
        screen.closest('.psw-form-screen-driver').classList.add('required');
      }

      if (screen.classList.contains('required')) {
        errors = checkCmpletenessFields(screen);
      }
    }

    if (!errors) {
      calculate();
    } else {
      const screenActive = formFourthScreen.querySelector('.psw-form-screen-driver--active');
      const buttonActive = driverButtonsWrap.querySelector('.psw-drivers-button--active');
      const errorScreenIndex = [...formFourthScreen.querySelectorAll('.psw-form-screen-driver')]
        .findIndex(screen => screen.querySelector('.psw-form-input-error'));

      screenActive
        .classList
        .remove('psw-form-screen-driver--active');

      buttonActive
        .classList
        .remove('psw-drivers-button--active');

      driverScreens[errorScreenIndex]
        .classList
        .add('psw-form-screen-driver--active');

      driverButtons[errorScreenIndex]
        .classList
        .add('psw-drivers-button--active');
    }
  };

  checkboxUnlimitedDrivers.addEventListener('change', onCheckboxUnlimitedDriversChange);
  formFourthScreenButtonPrev.addEventListener('click', onFormFourthScreenButtonPrevClick);
  formFourthScreenButtonNext.addEventListener('click', onFormFourthScreenButtonNextClick);
}