import {
  checkCmpletenessFields,
  getScreen,
  formToJson,
  pswStorage,
  preloaderOn,
  preloaderOff,
  ps__show_alert,
  ps__hide_alert
} from "../utils";
import * as $ from 'jquery';

export const getFourthScreenForm = () => {
  const form = document.querySelector(`.psw-form`);
  const formSecondScreen = form.querySelectorAll(`.psw-form-screen`)[1];
  const formFourthScreen = form.querySelectorAll(`.psw-form-screen`)[3];

  const checkboxsIsDriverForeigner = formFourthScreen.querySelectorAll(`.psw-form-checkbox--driver-license`);
  const checkboxsNoDiagnosticCard = formFourthScreen.querySelectorAll(`.psw-form-checkbox--no-diagnostic-card`);
  const checkboxUnlimitedDrivers = formFourthScreen.querySelector(`#isUnlimitedDrivers`);
  const checkboxIsInsurerClient = formSecondScreen.querySelector(`#isInsurerClient`);
  const buttonsCopy = formFourthScreen.querySelectorAll(`.psw-btn--copy`);
  const driverScreens = formFourthScreen.querySelectorAll(`.psw-form-screen-driver`);
  const driverButtonsWrap = formFourthScreen.querySelector(`.psw-drivers-actions__buttons`);
  const driverButtons = driverButtonsWrap.querySelectorAll(`.psw-drivers-button`);
  const formFourthScreenButtonPrev = formFourthScreen.querySelector(`.psw-btn-prev-step`);
  const formFourthScreenButtonNext = formFourthScreen.querySelector(`.psw-btn-next-step`);
  const inputWrappers = formFourthScreen.querySelectorAll(`.has-previous-license-items`);

  /* -----------------------------
              Расчёт
   ----------------------------- */

  const responseWrapper = document.querySelector(`.psw-response`);
  const btnBack = responseWrapper.querySelector(`.psw-response__btn-back`);

  const onButtonBackClick = (evt) => {
    evt.preventDefault();
    form.classList.add(`psw-form--active`);
    responseWrapper.classList.remove(`psw-response--active`);
    getScreen(4);
  };

  const outputCalculateResponseHtml = () => {
    $('.psw-response__item').remove();
    let data = pswStorage.get(`calculation`, true);
    const responseList = responseWrapper.querySelector(`.psw-response__list`);

    if (data.offers.success) {
      const html = data.offers.success
        .map((item) => {
          return (
            `<li class="psw-response__item  psw-response__item--success">
              <span class="psw-response-item__status">Одобрен</span>
              <div class="psw-response-item__img">
                <img src="${item.partner.logoUrl}" alt="Лого - ${item.partner.name}">
              </div>
              <span class="psw-response-item__name">${item.partner.name}</span>
              <span class="psw-response-item__price">${item.offerAmount} руб.</span>
              <button class="psw-response__btn psw-btn psw_success_offer__btn" data-bank="${item.partner.bank_id}">Оформить</button>
            </li>`
          );
        }).join(``);

      responseList.insertAdjacentHTML(`beforeend`, html);
    }

    if (data.offers.errors) {
      const html = data.offers.errors
        .map((item) => {
          return (
            `<li class="psw-response__item  psw-response__item--error">
              <span class="psw-response-item__status">Отказ</span>
              <div class="psw-response-item__img">
                <img src="${item.partner.logoUrl}" alt="Лого - ${item.partner.name}">
              </div>
              <span class="psw-response-item__name">${item.partner.name}</span>
            </li>`
          );
        })
        .join(``);

      responseList.insertAdjacentHTML(`beforeend`, html);
    }
  };

  const getCalculateResponse = () => {
    preloaderOn();
    let data = formToJson();
    console.log(data);
    $.ajax({
      url: window.pswUrl + `/calculate`,
      type: `POST`,
      headers: {
        Enc: window.pswToken
      },
      data,
      success: (response) => {
        if (response.status && response.status === `error` && response.errors) {
          let wrong = `<ul>`;
          for (let err in response.errors) {
            if (response.errors.hasOwnProperty(err)) {
              response.errors[err].map((message) => {
                wrong += `<li>${message}</li>`;
              });
            }
          }

          ps__show_alert(wrong);
        } else {
          pswStorage.set(`calculation`, response, true);
          outputCalculateResponseHtml();
          bindPayment();
        }
        preloaderOff();
      },
      fail: (error) => {
        console.log(error);
      }
    });
  };

  const calculate = () => {
    form.classList.remove(`psw-form--active`);
    responseWrapper.classList.add(`psw-response--active`);
    getCalculateResponse();
  };

  btnBack.addEventListener(`click`, onButtonBackClick);

  /* -----------------------------
              !Расчёт
   ----------------------------- */

  /* -----------------------------
              Оформление
   ----------------------------- */

  const bindPayment = () => {
    $('.psw_success_offer__btn').on('click touchstart', (e) => {
      paymentLink(e.target.dataset.bank);
    });
  }

  const paymentLink = (bank) => {
    preloaderOn();
    let calculation = pswStorage.get('calculation', true);

    if (!bank) {
      ps__show_alert('Не удается оформить у выбранной СК');
      preloaderOff();
      return false;
    }

    let offer = null;

    calculation.offers.success.map(item => {
      console.log(item);
      if (item.partner.bank_id === parseInt(bank)) {
        offer = item;
      }
    });

    console.log(offer);

    if (!offer) {
      ps__show_alert('Предложение не найдено или потеряло актуальность');
      preloaderOff();
      return false;
    }

    let params = {
      calculationId: calculation.calculation_id,
      reqId: calculation.clientRequestId,
      amount: offer.offerAmount,
      offerId: offer.id,
      bankId: offer.partner.bank_id
    };

    if (offer.status === 200) {
      params['service_id'] = offer.partner.id;
      params['confirm_url'] = offer.partner.confirmUrl;
      params['isApi'] = true;
    }

    $.ajax({
      url: window.pswUrl + '/confirm',
      type: 'POST',
      headers: {
        Enc: window.pswToken
      },
      data: params,
      success: (response) => {
        if (response.status === 'error' && response.message) {
          ps__show_alert(response.message);
        } else {
          displayPaymentBlock(response.offers);
        }
        preloaderOff();
      },
      fail: (error) => {
        console.log(error);
        ps__show_alert(`Технические неполадки, обратитесь к андминистрации сайта, для решения проблемы. Код ошибки ${offer.id}/${offer.partner.id}/${offer.partner.bank_id}`)
        preloaderOff();
      }
    })
  }

  const displayPaymentBlock = (offer) => {
    $('.psw-wrapper').append(`<div class="psw_payment__block">
      <div class="psw_payment__header">
        Данные заявки
        <span id="psw_payment__close"></span>
      </div>
      <div class="psw_payment__content">
          <div class="psw_cols__2">
            <div class="">
                <img src="${offer.partner.logoUrl}">
            </div>
            <div class="">
              Заявка №: <strong>${offer.id}</strong><br>
              Стоимость: <strong>${offer.offerAmount.toLocaleString('ru-RU').replace(',', '.')}</strong> руб.<br>
            </div>
          </div>
          <div class="psw_payment__controllers">
              <div class="psw_payment__btn_block">
                  <a href="${offer.paymentUrl}" target="_blank" class="">Перейти к оплате</a>
              </div>
              <div class="psw_payment__link_block">
                  ${offer.paymentUrl}
              </div>
          </div>
        </div>
    </div>`);

    $('#psw_payment__close').on('click touchstart', closePaymentBlock);
  }

  const closePaymentBlock = () => {
    $('.psw_payment__block').remove();
  }


  /* -----------------------------
              !Оформление
   ----------------------------- */

  for (const inputWrapper of inputWrappers) {
    const inputs = inputWrapper.querySelectorAll(`input`);

    for (const input of inputs) {
      input.classList.add(`not-required`);
    }

  }

  if (driverScreens.length > 0) {
    for (let index = 0; index < driverScreens.length; index++) {
      const screen = driverScreens[index];
      const button = driverButtons[index];

      const onDriverButtonClick = (evt) => {
        evt.preventDefault();

        const isActiveDriver = screen.classList.contains(`psw-form-screen-driver--active`);

        if (!isActiveDriver) {
          for (let index = 0; index < driverScreens.length; index++) {
            const screenActive = driverScreens[index];
            const buttonActive = driverButtons[index];

            screenActive.classList.remove(`psw-form-screen-driver--active`);
            buttonActive.classList.remove(`psw-drivers-button--active`);
          }

          screen.classList.add(`psw-form-screen-driver--active`);
          button.classList.add(`psw-drivers-button--active`);
        }
      };

      button.addEventListener(`click`, onDriverButtonClick);
    }
  }

  const onCheckboxDriverForeignDriverLicenseChange = (evt) => {
  /* Ищем соседний colums-item в котором находится чекбокс. Написал так, чтобы не
    дублировать #checkboxIsDriverForeigner тк. у каждого из водителей он свой */

    const checkboxIsDriverForeigner = evt.target
      .closest(`.psw-form-item__colums-item`)
      .previousElementSibling
      .querySelector(`.psw-form-checkbox`);

    if (evt.target.checked) {
      checkboxIsDriverForeigner.checked = true;
      checkboxIsDriverForeigner.disabled = true;
    } else {
      checkboxIsDriverForeigner.disabled = false;
    }
  };

  const onCheckboxsNoDiagnosticCardChange = (evt) => {
    const inputWrapper = evt.target
      .closest(`.psw-form-item`)
      .nextElementSibling;

    const inputs = inputWrapper.querySelectorAll(`input`);

    if (evt.target.checked) {
      inputWrapper.classList.remove(`psw-form-item--hidden`);
      for (const input of inputs) {
        input.classList.remove(`not-required`);
      }
    } else {
      inputWrapper.classList.add(`psw-form-item--hidden`);
      for (const input of inputs) {
        input.classList.add(`not-required`);
      }
    }
  };

  const onButtonCopyClick = (evt) => {
    evt.preventDefault();

    const driver = evt.target.closest(`.psw-form-screen-driver--active`);
    const lastName = driver.querySelector(`.psw-form-input--driver-last-name`);
    const firstName = driver.querySelector(`.psw-form-input--driver-first-name`);
    const middleName = driver.querySelector(`.psw-form-input--driver-middle-name`);
    const gender = driver.querySelector(`.psw-form-select--driver-gender`);
    const birthDate = driver.querySelector(`.psw-form-input--driver-birth-date`);
    const foreigner = driver.querySelector(`.psw-form-checkbox--driver-foreigner`);
    const isInsurerDriver = document.getElementById('isClientDriver');

    lastName.value = insurerLastName.value;
    firstName.value = insurerFirstName.value;
    middleName.value = insurerMiddleName.value;
    gender.value = insurerGender.value;
    birthDate.value = insurerBirthDate.value;
    foreigner.value = isInsurerForeigner.value;

    if (isInsurerForeigner.checked) {
      foreigner.checked = true;
    }

    isInsurerDriver.checked = true;
    isInsurerDriver.value = "on";

    for (const button of buttonsCopy) {
      button.remove();
    }
  };

  const onCheckboxUnlimitedDriversChange = (evt) => {
    const screenActive = formFourthScreen.querySelector(`.psw-form-screen-driver--active`);
    const buttonActive = driverButtonsWrap.querySelector(`.psw-drivers-button--active`);

    if (evt.target.checked) {
      screenActive.classList.remove(`psw-form-screen-driver--active`);
      buttonActive.classList.remove(`psw-drivers-button--active`);
      driverButtonsWrap.style.display = `none`;
    } else {
      driverScreens[0].classList.add(`psw-form-screen-driver--active`);
      driverButtons[0].classList.add(`psw-drivers-button--active`);
      driverButtonsWrap.style.display = `block`;
    }
  };

  const onFormFourthScreenButtonPrevClick = (evt) => {
    evt.preventDefault();
    checkboxIsInsurerClient.checked ? getScreen(2) : getScreen(3);
  };

  for (const button of buttonsCopy) {
    button.addEventListener(`click`, onButtonCopyClick);
  }

  for (const checkbox of checkboxsIsDriverForeigner) {
    checkbox.addEventListener(`change`, onCheckboxDriverForeignDriverLicenseChange);
  }

  for (const checkbox of checkboxsNoDiagnosticCard) {
    checkbox.addEventListener(`change`, onCheckboxsNoDiagnosticCardChange);
  }

  const onFormFourthScreenButtonNextClick = (evt) => {
    evt.preventDefault();
    let errors = false;

    for (const screen of driverScreens) {
      const lastName = screen.querySelector(`.psw-form-input--driver-last-name`);
      const firstName = screen.querySelector(`.psw-form-input--driver-first-name`);
      const series = screen.querySelector(`.psw-form-input--driver-serie`);
      const number = screen.querySelector(`.psw-form-input--driver-number`);

      screen.closest(`.psw-form-screen-driver`).classList.remove(`required`);

      if (lastName.value.length > 0
          && firstName.value.length > 0
          && series.value.length > 0
          && number.value.length > 0) {
        screen.closest(`.psw-form-screen-driver`).classList.add(`required`);
      }

      if (screen.classList.contains(`required`)) {
        errors = checkCmpletenessFields(screen);
      }
    }

    if (!errors) {
      calculate();
    } else {
      const screenActive = formFourthScreen.querySelector(`.psw-form-screen-driver--active`);
      const buttonActive = driverButtonsWrap.querySelector(`.psw-drivers-button--active`);
      const errorScreenIndex = [...formFourthScreen.querySelectorAll(`.psw-form-screen-driver`)]
        .findIndex((screen) => screen.querySelector(`.psw-form-input-error`));

      screenActive
        .classList
        .remove(`psw-form-screen-driver--active`);

      buttonActive
        .classList
        .remove(`psw-drivers-button--active`);

      driverScreens[errorScreenIndex]
        .classList
        .add(`psw-form-screen-driver--active`);

      driverButtons[errorScreenIndex]
        .classList
        .add(`psw-drivers-button--active`);
    }
  };

  checkboxUnlimitedDrivers.addEventListener(`change`, onCheckboxUnlimitedDriversChange);
  formFourthScreenButtonPrev.addEventListener(`click`, onFormFourthScreenButtonPrevClick);
  formFourthScreenButtonNext.addEventListener(`click`, onFormFourthScreenButtonNextClick);
};
