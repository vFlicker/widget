const pswInit = (selector) => {
  const widget = document.querySelector(selector);

  const start = () => {
    const dateInputMask = (selector) => {
      const items = document.querySelectorAll(selector)
  
      for (const item of items) {
        item.addEventListener('keypress', function(evt) {
          const length = item.value.length;
  
          if (evt.keyCode < 47 || evt.keyCode > 57 || length > 9) {
            evt.preventDefault();
          }
  
          if (length === 2 || length === 5) {
            item.value += '.';
          }
  
        });
      }
    };
  
    const organisationCodeMask = (selector) => {
      const items = document.querySelectorAll(selector)
  
      for (const item of items) {
        item.addEventListener('keypress', function(evt) {
          const length = item.value.length;
  
          if (evt.keyCode < 47 || evt.keyCode > 57 || length > 6) {
            evt.preventDefault();
          }
  
          if (length === 3) {
            item.value += '-';
          }
  
        });
      }
    };
  
    const getScreen = (screenNumber) => {
      let shiftPercentage;
  
      screenNumber === 1
        ? shiftPercentage = 0
        : shiftPercentage = screenNumber - 1;
      
      form.style.transform = `translateX(${shiftPercentage * -100}%)`;
    };
  
    const changeCheckboxNoDiagnosticCard = (year) => {
      if (Number(year) > 2018 && Number(year) < 2022) {
        checkboxNoDiagnosticCard.disabled = false;
      } else {
        checkboxNoDiagnosticCard.disabled = true;
        checkboxNoDiagnosticCard.checked = false;
        inputsWrapNoDiagnosticCard.classList.remove('psw-form-item--hidden');
      }
    };
  
    const checkCmpletenessFields = (selector) => {
      const inputs = selector.querySelectorAll('.psw-form-input');
      let isError = false;
  
      for (const input of inputs) {
        if (input.value.length < 1 && !input.classList.contains('not-required')) {
          input.classList.add('psw-form-input-error');
          isError = true;
        }
      }
  
      return isError;
    };
  
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
  
    const mainScreen = document.querySelector('.psw-main-screen');
    const input = mainScreen.querySelector('.psw-main-screen__input');
    const searchButton = mainScreen.querySelector('.psw-main-screen__psw-btn');
    const buttonLink = mainScreen.querySelector('.psw-main-screen__psw-btn-link');
  
    mainScreen.classList.add('psw-main-screen--active');
  
    const onSearchButtonClick = (evt) => {
      evt.preventDefault();
  
      if (!input.value) {
        input.classList.add('psw-input-error');
      } else {
        input.classList.remove('psw-input-error');
        alert('Заполнить поля..')
      }
    };
  
    const onButtonLinkClick = (evt) => {
      evt.preventDefault();
  
      mainScreen.classList.remove('psw-main-screen--active');
      form.classList.add('psw-form--active');
  
      getScreen(1);
    };
  
    searchButton.addEventListener('click', onSearchButtonClick);
    buttonLink.addEventListener('click', onButtonLinkClick);
  
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
  
    const inputVehicleBrand = formFirstScreen.querySelector('#vehicleBrand');
    const brandId = formFirstScreen.querySelector('#brandId');
    const brandList = formFirstScreen.querySelector('#vehicleBrandList');
  
    const inputVehicleModel = formFirstScreen.querySelector('#vehicleModel');
    const modelId = formFirstScreen.querySelector('#modelId');
    const modelList = formFirstScreen.querySelector('#vehicleModelList');
  
    const inputVehicleYear = formFirstScreen.querySelector('#vehicleYear');
    const yearList = formFirstScreen.querySelector('#vehicleYearList');
  
    const inputVehicleLicensePlate = formFirstScreen.querySelector('#vehicleLicensePlate');
    const inputIdentifierNumber = formFirstScreen.querySelector('#identifierNumber');
    const inputAutoDocumentType = formFirstScreen.querySelector('#autoDocumentType');
    const checkboxNoDiagnosticCard = formFirstScreen.querySelector('#noDiagnosticCard');
    const inputsWrapNoDiagnosticCard = formFirstScreen.querySelector('#noDiagnosticCardInputsWrap');
    const formFirstScreenButtonNext = formFirstScreen.querySelector('.psw-btn-next-step');
    checkboxNoDiagnosticCard.disabled = true;
  
    const onInputVehicleBrandChange = (evt) => {
      if (evt.target.value && evt.target.value.length > 0) {
        inputVehicleModel.disabled = false;
      } else {
        inputVehicleModel.disabled = true;
      }
    }
  
    const onInputVehicleLicensePlateChange = (evt) => {
      if (evt.target.value && evt.target.value.length > 0) {
        inputAutoDocumentType.value = 'sts';
        inputIdentifierNumber.classList.add('not-required');
        inputIdentifierNumber.classList.remove('psw-form-input-error');
      } else {
        inputAutoDocumentType.value = 'pts';
        inputIdentifierNumber.classList.remove('not-required');
      }
    };
  
    const onInputIdentifierNumberChange = (evt) => {
      if (evt.target.value && evt.target.value.length > 0) {
        inputVehicleLicensePlate.classList.add('not-required');
        inputVehicleLicensePlate.classList.remove('psw-form-input-error');
      } else {
        inputVehicleLicensePlate.classList.remove('not-required');
      }
    };
  
    const onInputAutoDocumentTypeChange = (evt) => {
      const hasLicensePlate = inputVehicleLicensePlate.value && inputVehicleLicensePlate.value.length > 0;
  
      if (evt.target.value === 'sts' && !hasLicensePlate) {
        evt.target.value = 'pts';
      }
    };
  
    const onCheckboxNoDiagnosticCardСhange = (evt) => {
      const inputAutoDianosticCardNumber = inputsWrapNoDiagnosticCard.querySelector('#autoDianosticCardNumber');
      const inputAutoDiagnosticCardDate = inputsWrapNoDiagnosticCard.querySelector('#autoDiagnosticCardDate');
  
      if (evt.target.checked) {
        inputsWrapNoDiagnosticCard.classList.add('psw-form-item--hidden')
        inputAutoDianosticCardNumber.classList.add('not-required');
        inputAutoDiagnosticCardDate.classList.add('not-required');
      } else {
        inputsWrapNoDiagnosticCard.classList.remove('psw-form-item--hidden');
        inputAutoDianosticCardNumber.classList.remove('not-required');
        inputAutoDiagnosticCardDate.classList.remove('not-required');
      }
    };
  
    const onFormFirstScreenButtonNextClick = (evt) => {
      evt.preventDefault();
  
      const errors = checkCmpletenessFields(formFirstScreen);
  
      if (!errors) {
        getScreen(2);
      }
    };
  
    // -------------------------- AJAX  --------------------------
    const onOutsideDropItemlick = (evt) => {
      const dropItem = document.querySelector('.psw-drop-item');
  
      if (dropItem) {
        if (evt.target !== dropItem) {
          // Здесь пофиксить баг, нужно ображаться 
          // конерктно к конкретному инпуту, а то очищаются все.
          // inputVehicleBrand.value = '';
          // inputVehicleModel.value = '';
          // inputVehicleYear.value = '';
          brandList.innerHTML = '';
          modelList.innerHTML = '';
          yearList.innerHTML = '';
        }
      }
    };
  
    const onBrandListItemClick = (evt) => {
      evt.preventDefault();
  
      inputVehicleBrand.value = evt.target.textContent;
      brandId.value = evt.target.dataset.value;
      brandList.innerHTML = '';
    };
  
    const onModelListItemClick = (evt) => {
      evt.preventDefault();
  
      inputVehicleModel.value = evt.target.textContent;
      modelId.value = evt.target.dataset.value;
      modelList.innerHTML = '';
    };
  
    const onYearListItemClick = (evt) => {
      inputVehicleYear.value = evt.target.textContent;
      yearList.innerHTML = '';
  
      changeCheckboxNoDiagnosticCard(evt.target.textContent);
    };
  
    const outputBrandListItemsHtml = (matches) => {
      if (matches.length > 0) {
        const html = matches
          .map(match => `
            <li class="psw-drop-item" data-value="${match.data}">${match.value}</li>
          `)
          .join('');
  
        brandList.innerHTML = html;
      };
    };
  
    const outputModelListItemsHtml = (matches) => {
      if (matches.length > 0) {
        const html = matches
          .map(match => `
            <li class="psw-drop-item" data-value="${match.id}">${match.nameRu 
              ? match.nameRu 
              : match.name}</li>
          `)
          .join('');
  
        modelList.innerHTML = html;
      };
    };
  
    const outputYearsListItemsHtml = (matches) => {
      if (matches.length > 0) {
        const html = matches
          .map(match => `
            <li class="psw-drop-item"">${match}</li>
          `)
          .join('');
  
        yearList.innerHTML = html;
      };
    };
  
    const searchBrandListItems = async (searchText) => {
      const res = await fetch('./data/brands.json');
      const data = await res.json();
  
      // Get and filter through entered data
      let matches = Object.values(data).filter(item => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return item.value.match(regex) || item.label.match(regex);
      });
  
      // Clears data if search input field is empty
      if (searchText.length === 0) {
        matches = [];
        brandList.innerHTML = '';
      }
  
      outputBrandListItemsHtml(matches);
    };
  
    const searchModelListItems = async (searchText) => {
      const res = await fetch('./data/models.json');
      const data = await res.json();
  
      // Get and filter through entered data
      let matches = data.models.filter(item => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return item.name.match(regex) || item.nameRu.match(regex);
      });
  
      // Clears data if search input field is empty
      if (searchText.length === 0) {
        matches = [];
        modelList.innerHTML = '';
      }
  
      outputModelListItemsHtml(matches);
    };
  
    const searchYearsListItems = async (searchText) => {
      const res = await fetch('./data/years.json');
      const data = await res.json();
  
      // Get and filter through entered data
      let matches = data.years.filter(item => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return item.toString().match(regex);
      });
  
      // Clears data if search input field is empty
      if (searchText.length === 0) {
        matches = [];
        yearList.innerHTML = '';
      }
  
      outputYearsListItemsHtml(matches);
    };
  
    brandList.addEventListener('click', onBrandListItemClick);
    modelList.addEventListener('click', onModelListItemClick);
    yearList.addEventListener('click', onYearListItemClick);
  
    inputVehicleBrand.addEventListener('input', (evt) => searchBrandListItems(evt.target.value));
    inputVehicleModel.addEventListener('input', (evt) => searchModelListItems(evt.target.value));
    inputVehicleYear.addEventListener('input', (evt) => searchYearsListItems(evt.target.value));
  
    document.addEventListener('click', onOutsideDropItemlick);
    // -------------------------- !AJAX  --------------------------
  
    inputVehicleLicensePlate.addEventListener('change', onInputVehicleLicensePlateChange);
    inputIdentifierNumber.addEventListener('change', onInputIdentifierNumberChange);
    inputVehicleYear.addEventListener('input', (evt) => changeCheckboxNoDiagnosticCard(evt.target.value));
    inputAutoDocumentType.addEventListener('change', onInputAutoDocumentTypeChange);
    inputVehicleBrand.addEventListener('change', onInputVehicleBrandChange);
    checkboxNoDiagnosticCard.addEventListener('change', onCheckboxNoDiagnosticCardСhange);
    formFirstScreenButtonNext.addEventListener('click', onFormFirstScreenButtonNextClick);
  
    const checkboxIsInsurerForeigner = formSecondScreen.querySelector('#isInsurerForeigner');
    const inputWrapInsurerIssuedPassport = formSecondScreen.querySelector('#insurerIssuedPassportInputWrap');
    const inputInsurerIssuedPassport = inputWrapInsurerIssuedPassport.querySelector('#insurerIssuedPassport');
    const checkboxIsInsurerClient = formSecondScreen.querySelector('#isInsurerClient');
    const formSecondScreenButtonPrev = formSecondScreen.querySelector('.psw-btn-prev-step');
    const formSecondScreenButtonNext = formSecondScreen.querySelector('.psw-btn-next-step');
  
    inputInsurerIssuedPassport.classList.add('not-required');
  
    const onCheckboxIsInsurerForeignerChange = (evt) => {
      if (evt.target.checked) {
        inputWrapInsurerIssuedPassport.classList.remove('psw-form-item--hidden');
        inputInsurerIssuedPassport.classList.remove('not-required');
      } else {
        inputWrapInsurerIssuedPassport.classList.add('psw-form-item--hidden');
        inputInsurerIssuedPassport.classList.add('not-required');
      }
    };
  
    const onCheckboxIsInsurerClientChange = (evt) => {
  
      if (evt.target.checked) {
        formSecondScreenButtonNext.textContent = 'Добавить водителей';
        formFourthScreenButtonPrev.textContent = 'Заполнить данные страхователя';
      } else {
        formSecondScreenButtonNext.textContent = 'Заполнить данные собственника';
        formFourthScreenButtonPrev.textContent = 'Заполнить данные собственника';
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
  
    checkboxIsInsurerForeigner.addEventListener('change', onCheckboxIsInsurerForeignerChange);
    checkboxIsInsurerClient.addEventListener('change', onCheckboxIsInsurerClientChange);
    formSecondScreenButtonPrev.addEventListener('click', onFormSecondScreenButtonPrevClick);
    formSecondScreenButtonNext.addEventListener('click', onFormSecondScreenButtonNextClick);
  
    const checkboxIsClientForeigner = formThirdScreen.querySelector('#isClientForeigner');
    const inputWrapClientIssuedPassport = formThirdScreen.querySelector('#clientIssuedPassportInputWrap');
    const inputClientIssuedPassport = inputWrapClientIssuedPassport.querySelector('#clientIssuedPassport');
    const formThirdScreenButtonPrev = formThirdScreen.querySelector('.psw-btn-prev-step');
    const formThirdScreenButtonNext = formThirdScreen.querySelector('.psw-btn-next-step');
  
    inputClientIssuedPassport.classList.add('not-required');
  
    const onCheckboxIsClientForeignerChange = (evt) =>  {
      if (evt.target.checked) {
        inputWrapClientIssuedPassport.classList.remove('psw-form-item--hidden');
        inputClientIssuedPassport.classList.remove('not-required');
      } else {
        inputWrapClientIssuedPassport.classList.add('psw-form-item--hidden');
        inputClientIssuedPassport.classList.add('not-required');
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
  
    checkboxIsClientForeigner.addEventListener('change', onCheckboxIsClientForeignerChange);
    formThirdScreenButtonPrev.addEventListener('click', onFormThirdScreenButtonPrevClick);
    formThirdScreenButtonNext.addEventListener('click', onFormThirdScreenButtonNextClick);
  
    const checkboxsIsDriverForeigner = formFourthScreen.querySelectorAll('.psw-form-checkbox--driver-license');
    const checkboxsNoDiagnosticCard = formFourthScreen.querySelectorAll('.psw-form-checkbox--no-diagnostic-card');
    const checkboxUnlimitedDrivers = formFourthScreen.querySelector('#isUnlimitedDrivers');
    const buttonsCopy = formFourthScreen.querySelectorAll('.psw-btn--copy');
    const driverScreens = formFourthScreen.querySelectorAll('.psw-form-screen-driver');
    const driverButtonsWrap = formFourthScreen.querySelector('.psw-drivers-actions__buttons');
    const driverButtons = driverButtonsWrap.querySelectorAll('.psw-drivers-button');
    const formFourthScreenButtonPrev = formFourthScreen.querySelector('.psw-btn-prev-step');
    const formFourthScreenButtonNext = formFourthScreen.querySelector('.psw-btn-next-step');
  
    const inputWrappers = formFourthScreen.querySelectorAll('.has-previous-license-items');
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
  };

  const html = `<div class="psw-wrapper">
    <div class="psw-main-screen">
      <div class="psw-main-screen-wrapper">
        <p class="psw-main-screen__title psw-p">
          Номер автомобиля для рассчета стоимости ОСАГО
        </p>
        <div class="psw-main-screen-inner">
          <input class="psw-main-screen__input psw-input" type="text">
          <button class="psw-main-screen__psw-btn psw-btn">
            Найти
          </button>
        </div>
      </div>
      <div class="psw-btn-link-wrapper">
        <button class="psw-main-screen__psw-btn-link psw-btn-link">
          Заполнить данные об автомобиле самостоятельно
        </button>
      </div>
    </div>
    <form class="psw-form">
      <div class="psw-form-screen">

        <div class="psw-form-header">
          <h2 class="psw-form-screen__title">
            Авто <span>(личное пользование)</span>
          </h2>
        </div>

        <div class="psw-form-col-wrapper">
          <div class="psw-form-col">

            <div class="psw-form-item">
              <input
                type="date"
                class="psw-form-input"
                name="osagoStartDate"
                id="osagoStartDate"
                placeholder=" ">
              <label class="psw-label--select" for="osagoStartDate">Начало действия полиса:</label>
            </div>

            <div class="psw-form-item">
              <select class="psw-form-select" name="vehicleType" id="vehicleType">
                <option value="640189240" selected>
                  Легковые автомобили
                </option>
              </select>
            </div>

            <div class="psw-form-item psw-form-item--column">
              <input type="hidden" id="brandId" value>
              <input
                type="text"
                class="psw-form-input"
                name="vehicleBrand"
                id="vehicleBrand"
                placeholder=" "
                autocomplete="off">
              <label for="vehicleBrand">Марка:</label>

              <ul class="psw-drop-list" id="vehicleBrandList"></ul>
            </div>

            <div class="psw-form-item psw-form-item--column">
              <input type="hidden" id="modelId" value>
              <input
                type="text"
                class="psw-form-input"
                name="vehicleModel"
                id="vehicleModel"
                placeholder=" "
                autocomplete="off"
                disabled>
              <label for="vehicleModel">Модель:</label>

              <ul class="psw-drop-list" id="vehicleModelList"></ul>
            </div>

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input"
                name="vehicleLicensePlate"
                id="vehicleLicensePlate"
                placeholder=" ">
              <label for="vehicleLicensePlate">Гос. номер:</label>
            </div>

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input"
                name="identifierNumber"
                id="identifierNumber"
                placeholder=" ">
              <label for="identifierNumber">VIN:</label>
            </div>

            <div class="psw-form-item">
              <div class="psw-form-item psw-form-item--colums">

                <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                  <input
                    type="text"
                    class="psw-form-input"
                    name="vehicleYear"
                    id="vehicleYear"
                    autocomplete="off"
                    placeholder=" ">
                  <label for="vehicleYear">Год выпуска:</label>

                  <ul class="psw-drop-list" id="vehicleYearList"></ul>
                </div>

                <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                  <input
                    type="text"
                    class="psw-form-input"
                    name="vehiclePower"
                    id="vehiclePower"
                    placeholder=" ">
                  <label for="vehiclePower">Мощность л.с:</label>
                </div>

              </div>
            </div>
          </div>
          <div class="psw-form-col">

            <h3 class="psw-h3">Документ</h3>

            <div class="psw-form-item">
              <div class="psw-form-item psw-form-item--colums">

                <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                  <div class="psw-form-item">
                    <select
                      class="psw-form-select"
                      name="autoDocumentType"
                      id="autoDocumentType">
                      <option value="sts">СТС</option>
                      <option value="pts" selected>ПТС</option>
                      <option value="epts">ЭПТС</option>
                    </select>
                  </div>
                </div>

                <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                  <input
                    type="text"
                    class="psw-form-input"
                    name="autoDocumentSeries"
                    id="autoDocumentSeries"
                    placeholder=" ">
                  <label for="autoDocumentSeries">Серия:</label>
                </div>

                <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                  <input
                    type="text"
                    class="psw-form-input"
                    name="autoDocumentNumber"
                    id="autoDocumentNumber"
                    placeholder=" ">
                  <label for="autoDocumentNumber">Номер:</label>
                </div>
              </div>
            </div>

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input psw-date-input"
                name="autoDocumentDate"
                id="autoDocumentDate"
                placeholder=" ">
              <label for="autoDocumentDate">Дата выдачи:</label>
            </div>

            <div class="psw-form-item">
              <select
                class="psw-form-select"
                name="vehicleEngineType"
                id="vehicleEngineType">
                <option value="Petrol" selected>Бензин</option>
                <option value="Diesel">Дизель</option>
                <option value="Electro">Электро</option>
                <option value="Hybrid">Гибрид</option>
              </select>
              <label class="psw-label--select" for="vehicleEngineType">Тип двигателя:</label>
            </div>

            <div class="psw-form-item psw-form-item--checkbox">
              <input
                class="visually-hidden psw-form-checkbox"
                type="checkbox"
                name="noDiagnosticCard"
                id="noDiagnosticCard">
              <label class="psw-form-checkbox-item__label" for="noDiagnosticCard">
                Без диагностической карты
              </label>
            </div>

            <div class="psw-form-item" id="noDiagnosticCardInputsWrap">
              <div class="psw-form-item">

                <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                  <input
                    type="text" class="psw-form-input"
                    name="autoDianosticCardNumber"
                    id="autoDianosticCardNumber"
                    placeholder=" ">
                  <label for="autoDianosticCardNumber">Номер карты:</label>
                </div>

                <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                  <input
                    type="text"
                    class="psw-form-input"
                    name="autoDiagnosticCardDate"
                    id="autoDiagnosticCardDate"
                    placeholder=" ">
                  <label for="autoDiagnosticCardDate">Действует до:</label>
                </div>

              </div>
            </div>
            <div class="psw-notification-dange">
              <p class="psw-notification-dange__text">
                * - Гос. номер авто вводить кирилицей (русским алфавитом)
              </p>
              <p class="psw-notification-dange__text">
                ** - Серию ПТС вводить кирилицей (русским алфавитом)
              </p>
            </div>
          </div>
        </div>

        <div class="psw-form-footer">
          <button class="psw-btn psw-btn-next-step">
            Заполнить данные страхователя
          </button>
        </div>
      </div>

      <div class="psw-form-screen">

        <div class="psw-form-header">
          <h2 class="psw-form-screen__title">
            Страхователь
          </h2>
        </div>

        <div class="psw-form-col-wrapper">
          <div class="psw-form-col">

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input"
                name="insurerLastName"
                id="insurerLastName"
                placeholder=" ">
              <label for="insurerLastName">Фамилия:</label>
            </div>

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input"
                name="insurerFirstName"
                id="insurerFirstName"
                placeholder=" ">
              <label for="insurerFirstName">Имя:</label>
            </div>

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input"
                name="insurerMiddleName"
                id="insurerMiddleName"
                placeholder=" ">
              <label for="insurerMiddleName">Отчество:</label>
            </div>

            <div class="psw-form-item psw-form-item--colums ">

              <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                <select
                  class="psw-form-select"
                  name="insurerGender"
                  id="insurerGender">
                  <option value="1" selected="">Мужской</option>
                  <option value="2">Женский</option>
                </select>
                <label class="psw-label--select" for="insurerGender">Пол:</label>
              </div>

              <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                <input
                  type="text"
                  class="psw-form-input psw-date-input"
                  name="insurerBirthDate"
                  id="insurerBirthDate"
                  placeholder=" ">
                <label for="insurerBirthDate">Дата рождения:</label>
              </div>
            </div>

            <h3 class="psw-h3">Адрес регистрации</h3>

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input"
                name="insurerAddressName"
                id="insurerAddressName"
                placeholder=" ">
              <label for="insurerAddressName">Адрес:</label>
            </div>

          </div>
          <div class="psw-form-col">

            <h3 class="psw-h3">Паспортные данные</h3>

            <div class="psw-form-item">
              <div class="psw-form-item psw-form-item--colums">

                <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                  <div class="psw-form-item">
                    <input
                      type="text"
                      class="psw-form-input"
                      name="insurerPassportSeries"
                      id="insurerPassportSeries"
                      placeholder=" ">
                    <label for="insurerPassportSeries">Серия:</label>
                  </div>
                </div>

                <div class="psw-form-item__colums-item">
                  <input
                    type="text"
                    class="psw-form-input"
                    name="insurerPassportNumber"
                    id="insurerPassportNumber"
                    placeholder=" ">
                  <label for="insurerPassportNumber">Номер:</label>
                </div>
              </div>
            </div>

            <div class="psw-form-item psw-form-item--checkbox">
              <input
                class="visually-hidden psw-form-checkbox"
                type="checkbox"
                name="isInsurerForeigner"
                id="isInsurerForeigner">
              <label class="psw-form-checkbox-item__label" for="isInsurerForeigner">
                Не резидент РФ
              </label>
            </div>

            <div class="psw-form-item psw-form-item--hidden" id="insurerIssuedPassportInputWrap">
              <input
                type="text"
                class="psw-form-input"
                name="insurerIssuedPassport"
                id="insurerIssuedPassport"
                placeholder=" ">
              <label for="insurerIssuedPassport">Кем выдан:</label>
            </div>

            <div class="psw-form-item">
              <div class="psw-form-item psw-form-item--colums">

                <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                  <div class="psw-form-item">
                    <input
                      type="text"
                      class="psw-form-input psw-date-input"
                      name="insurerPassportDate"
                      id="insurerPassportDate"
                      placeholder=" ">
                    <label for="insurerPassportDate">Дата выдачи:</label>
                  </div>
                </div>

                <div class="psw-form-item__colums-item">
                  <input
                    type="text"
                    class="psw-form-input psw-organisation-code-input"
                    name="insurerPassportOrganisationCode"
                    id="insurerPassportOrganisationCode"
                    placeholder=" ">
                  <label for="insurerPassportOrganisationCode">
                    Подразделение:
                  </label>
                </div>
              </div>
            </div>

            <h3 class="psw-h3">Контакты</h3>

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input"
                name="insurerPhoneNumber"
                id="insurerPhoneNumber"
                placeholder=" ">
              <label for="insurerPhoneNumber">Телефон:</label>
            </div>

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input"
                name="insurerEmailAddress"
                id="insurerEmailAddress"
                placeholder=" ">
              <label for="insurerEmailAddress">Почта:</label>
            </div>

            <div class="psw-form-item psw-form-item--checkbox">
              <input
                class="visually-hidden psw-form-checkbox"
                type="checkbox"
                name="isInsurerClient"
                id="isInsurerClient">
              <label class="psw-form-checkbox-item__label" for="isInsurerClient">
                Страхователь является собствеником
              </label>
            </div>

          </div>
        </div>

        <div class="psw-form-footer">
          <button class="psw-btn psw-btn-prev-step">
            Заполнить данные авто
          </button>
          <button class="psw-btn psw-btn-next-step">
            Заполнить данные собственника
          </button>
        </div>
      </div>

      <div class="psw-form-screen">

        <div class="psw-form-header">
          <h2 class="psw-form-screen__title">
            Собственник
          </h2>
        </div>

        <div class="psw-form-col-wrapper">
          <div class="psw-form-col">

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input"
                name="clientLastName"
                id="clientLastName"
                placeholder=" ">
              <label for="clientLastName">Фамилия:</label>
            </div>

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input"
                name="clientFirstName"
                id="clientFirstName"
                placeholder=" ">
              <label for="clientFirstName">Имя:</label>
            </div>

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input"
                name="clientMiddleName"
                id="clientMiddleName"
                placeholder=" ">
              <label for="clientMiddleName">Отчество:</label>
            </div>

            <div class="psw-form-item psw-form-item--colums ">

              <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                <select
                  class="psw-form-select"
                  name="clientGender"
                  id="clientGender"
                  placeholder=" ">
                  <option value="1" selected="">Мужской</option>
                  <option value="2">Женский</option>
                </select>
                <label class="psw-label--select" for="clientGender">Пол:</label>
              </div>

              <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                <input type="text"
                       class="psw-form-input psw-date-input"
                       name="clientBirthDate"
                       id="clientBirthDate"
                       placeholder=" ">
                <label for="clientBirthDate">Дата рождения:</label>
              </div>
            </div>

            <h3 class="psw-h3">Адрес регистрации</h3>

            <div class="psw-form-item">
              <input
                type="text"
                class="psw-form-input"
                name="clientAddressName"
                id="clientAddressName"
                placeholder=" ">
              <label for="clientAddressName">Адрес:</label>
            </div>
          </div>
          <div class="psw-form-col">

            <h3 class="psw-h3">Паспортные данные</h3>

            <div class="psw-form-item">
              <div class="psw-form-item psw-form-item--colums">

                <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                  <div class="psw-form-item">
                    <input
                      type="text"
                      class="psw-form-input"
                      name="clientPassportSeries"
                      id="clientPassportSeries"
                      placeholder=" ">
                    <label for="clientPassportSeries">Серия:</label>
                  </div>
                </div>

                <div class="psw-form-item__colums-item">
                  <input
                    type="text"
                    class="psw-form-input"
                    name="clientPassportNumber"
                    id="clientPassportNumber"
                    placeholder=" ">
                  <label for="clientPassportNumber">Номер:</label>
                </div>
              </div>
            </div>

            <div class="psw-form-item psw-form-item--checkbox">
              <input
                class="visually-hidden psw-form-checkbox"
                type="checkbox"
                name="isClientForeigner"
                id="isClientForeigner">
              <label class="psw-form-checkbox-item__label" for="isClientForeigner">
                Не резидент РФ
              </label>
            </div>

            <div class="psw-form-item psw-form-item--hidden" id="clientIssuedPassportInputWrap">
              <input
                type="text"
                class="psw-form-input"
                name="clientIssuedPassport"
                id="clientIssuedPassport"
                placeholder=" ">
              <label for="clientIssuedPassport">Кем выдан:</label>
            </div>

            <div class="psw-form-item">
              <div class="psw-form-item psw-form-item--colums">

                <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                  <div class="psw-form-item">
                    <input
                      type="text"
                      class="psw-form-input psw-date-input"
                      name="clientPassportDate"
                      id="clientPassportDate"
                      placeholder=" ">
                    <label for="clientPassportDate">Дата выдачи:</label>
                  </div>
                </div>

                <div class="psw-form-item__colums-item">
                  <input
                    type="text"
                    class="psw-form-input psw-organisation-code-input"
                    name="clientPassportOrganisationCode"
                    id="clientPassportOrganisationCode"
                    placeholder=" ">
                  <label for="clientPassportOrganisationCode">
                    Подразделение:
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="psw-form-footer">
          <button class="psw-btn psw-btn-prev-step">
            Заполнить данные страхователя
          </button>
          <button class="psw-btn psw-btn-next-step">
            Добавить водителей
          </button>
        </div>
      </div>

      <div class="psw-form-screen">

        <div class="psw-form-screen-driver psw-form-screen-driver--active">
          <div class="psw-form-header">
            <h2 class="psw-form-screen__title">
              Водители <span>(водитель #1)</span>
            </h2>
          </div>

          <div class="psw-form-col-wrapper psw-form-col-wrapper--drivers">
            <div class="psw-form-col">

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-last-name"
                  name="driver1LastName"
                  id="driver1LastName"
                  placeholder=" ">
                <label for="driver1LastName">Фамилия:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-first-name"
                  name="driver1FirstName"
                  id="driver1FirstName"
                  placeholder=" ">
                <label for="driver1FirstName">Имя:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-middle-name"
                  name="driver1MiddleName"
                  id="driver1MiddleName"
                  placeholder=" ">
                <label for="driver1MiddleName">Отчество:</label>
              </div>

              <div class="psw-form-item psw-form-item--colums ">

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <select
                    class="psw-form-select  psw-form-select--driver-gender"
                    name="driver1Gender"
                    id="driver1Gender"
                    placeholder=" ">
                    <option value="1" selected="">Мужской</option>
                    <option value="2">Женский</option>
                  </select>
                  <label class="psw-label--select" for="driver1Gender">Пол:</label>
                </div>

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input type="text"
                         class="psw-form-input psw-date-input  psw-form-input--driver-birth-date"
                         name="driver1BirthDate"
                         id="driver1BirthDate"
                         placeholder=" ">
                  <label for="driver1BirthDate">Дата рождения:</label>
                </div>
              </div>

              <div class="psw-form-item">
                <button class="psw-btn psw-btn--copy">Скопировать данные страхователя</button>
              </div>
            </div>
            <div class="psw-form-col">

              <h3 class="psw-h3">Водительское удостоверение</h3>

              <div class="psw-form-item">
                <div class="psw-form-item psw-form-item--colums">

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                    <div class="psw-form-item">
                      <input
                        type="text"
                        class="psw-form-input  psw-form-input--driver-series"
                        name="driver1Series"
                        id="driver1Series"
                        placeholder=" ">
                      <label for="driver1Series">Серия:</label>
                    </div>
                  </div>

                  <div class="psw-form-item__colums-item">
                    <input
                      type="text"
                      class="psw-form-input  psw-form-input--driver-number"
                      name="driver1Number"
                      id="driver1Number"
                      placeholder=" ">
                    <label for="driver1Number">Номер:</label>
                  </div>

                </div>
              </div>

              <div class="psw-form-item psw-form-item--colums">

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input
                    class="visually-hidden psw-form-checkbox  psw-form-checkbox--driver-foreigner"
                    type="checkbox"
                    name="isDriver1Foreigner"
                    id="isDriver1Foreigner">
                  <label class="psw-form-checkbox-item__label" for="isDriver1Foreigner">
                    Не резидент РФ
                  </label>
                </div>

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input
                    class="visually-hidden psw-form-checkbox  psw-form-checkbox--driver-license"
                    type="checkbox"
                    name="driver1ForeignDriverLicense"
                    id="driver1ForeignDriverLicense">
                  <label class="psw-form-checkbox-item__label" for="driver1ForeignDriverLicense">
                    Иностранные права
                  </label>
                </div>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input psw-date-input"
                  name="driver1LicenseIssue"
                  id="driver1LicenseIssue"
                  placeholder=" ">
                <label for="driver1LicenseIssue">Дата выдачи ВУ:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input psw-date-input"
                  name="driver1FirstLicenseIssue"
                  id="driver1FirstLicenseIssue"
                  placeholder=" ">
                <label for="driver1FirstLicenseIssue">Дата выдачи первого ВУ:</label>
              </div>

              <div class="psw-form-item psw-form-item--checkbox">
                <input
                  class="visually-hidden psw-form-checkbox  psw-form-checkbox--no-diagnostic-card"
                  type="checkbox"
                  name="driver1HasPreviousLicense"
                  id="driver1HasPreviousLicense">
                <label class="psw-form-checkbox-item__label" for="driver1HasPreviousLicense">
                  Указать предыдущие права
                </label>
              </div>

              <div class="psw-form-item psw-form-item--hidden  has-previous-license-items"
                   id="driver1HasPreviousLicenseItems">
                <div class="psw-form-item psw-form-item--colums">

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--series">
                    <input
                      type="text"
                      class="psw-form-input"
                      name="driver1PreviousSeries"
                      id="driver1PreviousSeries"
                      placeholder=" ">
                    <label for="driver1PreviousSeries">Серия:</label>
                  </div>

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                    <input
                      type="text"
                      class="psw-form-input"
                      name="driver1PreviousNumber"
                      id="driver1PreviousNumber"
                      placeholder=" ">
                    <label for="driver1PreviousNumber">Номер:</label>
                  </div>

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                    <input
                      type="text"
                      class="psw-form-input psw-date-input"
                      name="driver1PreviousDate"
                      id="driver1PreviousDate"
                      placeholder=" ">
                    <label for="driver1PreviousDate">Дата выдачи:</label>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="psw-form-screen-driver">
          <div class="psw-form-header">
            <h2 class="psw-form-screen__title">
              Водители <span>(водитель #2)</span>
            </h2>
          </div>

          <div class="psw-form-col-wrapper psw-form-col-wrapper--drivers">
            <div class="psw-form-col">

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-last-name"
                  name="driver2LastName"
                  id="driver2LastName"
                  placeholder=" ">
                <label for="driver2LastName">Фамилия:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-first-name"
                  name="driver2FirstName"
                  id="driver2FirstName"
                  placeholder=" ">
                <label for="driver2FirstName">Имя:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-middle-name"
                  name="driver2MiddleName"
                  id="driver2MiddleName"
                  placeholder=" ">
                <label for="driver2MiddleName">Отчество:</label>
              </div>

              <div class="psw-form-item psw-form-item--colums">

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <select
                    class="psw-form-select  psw-form-select--driver-gender"
                    name="driver2Gender"
                    id="driver2Gender"
                    placeholder=" ">
                    <option value="1" selected="">Мужской</option>
                    <option value="2">Женский</option>
                  </select>
                  <label class="psw-label--select" for="driver2Gender">Пол:</label>
                </div>

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input type="text"
                         class="psw-form-input psw-date-input  psw-form-input--driver-birth-date"
                         name="driver2BirthDate"
                         id="driver2BirthDate"
                         placeholder=" ">
                  <label for="driver2BirthDate">Дата рождения:</label>
                </div>
              </div>

              <div class="psw-form-item">
                <button class="psw-btn psw-btn--copy">Скопировать данные страхователя</button>
              </div>

            </div>

            <div class="psw-form-col">

              <h3 class="psw-h3">Водительское удостоверение</h3>

              <div class="psw-form-item">
                <div class="psw-form-item psw-form-item--colums">

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                    <div class="psw-form-item">
                      <input
                        type="text"
                        class="psw-form-input  psw-form-input--driver-series"
                        name="driver2Series"
                        id="driver2Series"
                        placeholder=" ">
                      <label for="driver2Series">Серия:</label>
                    </div>
                  </div>

                  <div class="psw-form-item__colums-item">
                    <input
                      type="text"
                      class="psw-form-input  psw-form-input--driver-number"
                      name="driver2Number"
                      id="driver2Number"
                      placeholder=" ">
                    <label for="driver2Number">Номер:</label>
                  </div>

                </div>
              </div>

              <div class="psw-form-item psw-form-item--colums ">

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input
                    class="visually-hidden psw-form-checkbox  psw-form-checkbox--driver-foreigner"
                    type="checkbox"
                    name="isDriver2Foreigner"
                    id="isDriver2Foreigner">
                  <label class="psw-form-checkbox-item__label" for="isDriver2Foreigner">
                    Не резидент РФ
                  </label>
                </div>

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input
                    class="visually-hidden psw-form-checkbox  psw-form-checkbox--driver-license"
                    type="checkbox"
                    name="driver2ForeignDriverLicense"
                    id="driver2ForeignDriverLicense">
                  <label class="psw-form-checkbox-item__label" for="driver2ForeignDriverLicense">
                    Иностранные права
                  </label>
                </div>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input psw-date-input"
                  name="driver2LicenseIssue"
                  id="driver2LicenseIssue"
                  placeholder=" ">
                <label for="driver2LicenseIssue">Дата выдачи ВУ:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input psw-date-input"
                  name="driver2FirstLicenseIssue"
                  id="driver2FirstLicenseIssue"
                  placeholder=" ">
                <label for="driver2FirstLicenseIssue">Дата выдачи первого ВУ:</label>
              </div>

              <div class="psw-form-item psw-form-item--checkbox">
                <input
                  class="visually-hidden psw-form-checkbox  psw-form-checkbox--no-diagnostic-card"
                  type="checkbox"
                  name="driver2HasPreviousLicense"
                  id="driver2HasPreviousLicense">
                <label class="psw-form-checkbox-item__label" for="driver2HasPreviousLicense">
                  Указать предыдущие права
                </label>
              </div>

              <div class="psw-form-item psw-form-item--hidden  has-previous-license-items"
                   id="driver2HasPreviousLicenseItems">
                <div class="psw-form-item psw-form-item--colums">

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--series">
                    <input
                      type="text"
                      class="psw-form-input"
                      name="driver2PreviousSeries"
                      id="driver2PreviousSeries"
                      placeholder=" ">
                    <label for="driver2PreviousSeries">Серия:</label>
                  </div>

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                    <input
                      type="text"
                      class="psw-form-input"
                      name="driver2PreviousNumber"
                      id="driver2PreviousNumber"
                      placeholder=" ">
                    <label for="driver2PreviousNumber">Номер:</label>
                  </div>

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                    <input
                      type="text"
                      class="psw-form-input psw-date-input"
                      name="driver2PreviousDate"
                      id="driver2PreviousDate"
                      placeholder=" ">
                    <label for="driver2PreviousDate">Дата выдачи:</label>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="psw-form-screen-driver">
          <div class="psw-form-header">
            <h2 class="psw-form-screen__title">
              Водители <span>(водитель #3)</span>
            </h2>
          </div>

          <div class="psw-form-col-wrapper psw-form-col-wrapper--drivers">
            <div class="psw-form-col">

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-last-name"
                  name="driver3LastName"
                  id="driver3LastName"
                  placeholder=" ">
                <label for="driver3LastName">Фамилия:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-first-name"
                  name="driver3FirstName"
                  id="driver3FirstName"
                  placeholder=" ">
                <label for="driver3FirstName">Имя:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-middle-name"
                  name="driver3MiddleName"
                  id="driver3MiddleName"
                  placeholder=" ">
                <label for="driver3MiddleName">Отчество:</label>
              </div>

              <div class="psw-form-item psw-form-item--colums ">

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <select
                    class="psw-form-select  psw-form-select--driver-gender"
                    name="driver3Gender"
                    id="driver3Gender"
                    placeholder=" ">
                    <option value="1" selected="">Мужской</option>
                    <option value="2">Женский</option>
                  </select>
                  <label class="psw-label--select" for="driver3Gender">Пол:</label>
                </div>

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input type="text"
                         class="psw-form-input psw-date-input  psw-form-input--driver-birth-date"
                         name="driver3BirthDate"
                         id="driver3BirthDate"
                         placeholder=" ">
                  <label for="driver3BirthDate">Дата рождения:</label>
                </div>
              </div>

              <div class="psw-form-item">
                <button class="psw-btn psw-btn--copy">Скопировать данные страхователя</button>
              </div>

            </div>

            <div class="psw-form-col">

              <h3 class="psw-h3">Водительское удостоверение</h3>

              <div class="psw-form-item">
                <div class="psw-form-item psw-form-item--colums">

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                    <div class="psw-form-item">
                      <input
                        type="text"
                        class="psw-form-input  psw-form-input--driver-series"
                        name="driver3Series"
                        id="driver3Series"
                        placeholder=" ">
                      <label for="driver3Series">Серия:</label>
                    </div>
                  </div>

                  <div class="psw-form-item__colums-item">
                    <input
                      type="text"
                      class="psw-form-input  psw-form-input--driver-number"
                      name="driver3Number"
                      id="driver3Number"
                      placeholder=" ">
                    <label for="driver3Number">Номер:</label>
                  </div>

                </div>
              </div>

              <div class="psw-form-item psw-form-item--colums">

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input
                    class="visually-hidden psw-form-checkbox  psw-form-checkbox--driver-foreigner"
                    type="checkbox"
                    name="isDriver3Foreigner"
                    id="isDriver3Foreigner">
                  <label class="psw-form-checkbox-item__label" for="isDriver3Foreigner">
                    Не резидент РФ
                  </label>
                </div>

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input
                    class="visually-hidden psw-form-checkbox  psw-form-checkbox--driver-license"
                    type="checkbox"
                    name="driver3ForeignDriverLicense"
                    id="driver3ForeignDriverLicense">
                  <label class="psw-form-checkbox-item__label" for="driver3ForeignDriverLicense">
                    Иностранные права
                  </label>
                </div>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input psw-date-input"
                  name="driver3LicenseIssue"
                  id="driver3LicenseIssue"
                  placeholder=" ">
                <label for="driver3LicenseIssue">Дата выдачи ВУ:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input psw-date-input"
                  name="driver3FirstLicenseIssue"
                  id="driver3FirstLicenseIssue"
                  placeholder=" ">
                <label for="driver3FirstLicenseIssue">Дата выдачи первого ВУ:</label>
              </div>

              <div class="psw-form-item psw-form-item--checkbox">
                <input
                  class="visually-hidden psw-form-checkbox  psw-form-checkbox--no-diagnostic-card"
                  type="checkbox"
                  name="driver3HasPreviousLicense"
                  id="driver3HasPreviousLicense">
                <label class="psw-form-checkbox-item__label" for="driver3HasPreviousLicense">
                  Указать предыдущие права
                </label>
              </div>

              <div class="psw-form-item psw-form-item--hidden  has-previous-license-items"
                   id="driver3HasPreviousLicenseItems">
                <div class="psw-form-item psw-form-item--colums">

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--series">
                    <input
                      type="text"
                      class="psw-form-input"
                      name="driver3PreviousSeries"
                      id="driver3PreviousSeries"
                      placeholder=" ">
                    <label for="driver3PreviousSeries">Серия:</label>
                  </div>

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                    <input
                      type="text"
                      class="psw-form-input"
                      name="driver3PreviousNumber"
                      id="driver3PreviousNumber"
                      placeholder=" ">
                    <label for="driver3PreviousNumber">Номер:</label>
                  </div>

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                    <input
                      type="text"
                      class="psw-form-input psw-date-input"
                      name="driver3PreviousDate"
                      id="driver3PreviousDate"
                      placeholder=" ">
                    <label for="driver3PreviousDate">Дата выдачи:</label>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="psw-form-screen-driver">
          <div class="psw-form-header">
            <h2 class="psw-form-screen__title">
              Водители <span>(водитель #4)</span>
            </h2>
          </div>

          <div class="psw-form-col-wrapper psw-form-col-wrapper--drivers">
            <div class="psw-form-col">

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-last-name"
                  name="driver4LastName"
                  id="driver4LastName"
                  placeholder=" ">
                <label for="driver4LastName">Фамилия:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-first-name"
                  name="driver4FirstName"
                  id="driver4FirstName"
                  placeholder=" ">
                <label for="driver4FirstName">Имя:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-middle-name"
                  name="driver4MiddleName"
                  id="driver4MiddleName"
                  placeholder=" ">
                <label for="driver4MiddleName">Отчество:</label>
              </div>

              <div class="psw-form-item psw-form-item--colums ">

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <select
                    class="psw-form-select  psw-form-select--driver-gender"
                    name="driver4Gender"
                    id="driver4Gender"
                    placeholder=" ">
                    <option value="1" selected="">Мужской</option>
                    <option value="2">Женский</option>
                  </select>
                  <label class="psw-label--select" for="driver4Gender">Пол:</label>
                </div>

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input type="text"
                         class="psw-form-input psw-date-input  psw-form-input--driver-birth-date"
                         name="driver4BirthDate"
                         id="driver4BirthDate"
                         placeholder=" ">
                  <label for="driver4BirthDate">Дата рождения:</label>
                </div>
              </div>

              <div class="psw-form-item">
                <button class="psw-btn psw-btn--copy">Скопировать данные страхователя</button>
              </div>

            </div>

            <div class="psw-form-col">

              <h3 class="psw-h3">Водительское удостоверение</h3>

              <div class="psw-form-item">
                <div class="psw-form-item psw-form-item--colums">

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                    <div class="psw-form-item">
                      <input
                        type="text"
                        class="psw-form-input  psw-form-input--driver-series"
                        name="driver4Series"
                        id="driver4Series"
                        placeholder=" ">
                      <label for="driver4Series">Серия:</label>
                    </div>
                  </div>

                  <div class="psw-form-item__colums-item">
                    <input
                      type="text"
                      class="psw-form-input  psw-form-input--driver-number"
                      name="driver4Number"
                      id="driver4Number"
                      placeholder=" ">
                    <label for="driver4Number">Номер:</label>
                  </div>

                </div>
              </div>

              <div class="psw-form-item psw-form-item--colums">

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input
                    class="visually-hidden psw-form-checkbox  psw-form-checkbox--driver-foreigner"
                    type="checkbox"
                    name="isDriver4Foreigner"
                    id="isDriver4Foreigner">
                  <label class="psw-form-checkbox-item__label" for="isDriver4Foreigner">
                    Не резидент РФ
                  </label>
                </div>

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input
                    class="visually-hidden psw-form-checkbox  psw-form-checkbox--driver-license"
                    type="checkbox"
                    name="driver4ForeignDriverLicense"
                    id="driver4ForeignDriverLicense">
                  <label class="psw-form-checkbox-item__label" for="driver4ForeignDriverLicense">
                    Иностранные права
                  </label>
                </div>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input psw-date-input"
                  name="driver4LicenseIssue"
                  id="driver4LicenseIssue"
                  placeholder=" ">
                <label for="driver4LicenseIssue">Дата выдачи ВУ:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input psw-date-input"
                  name="driver4FirstLicenseIssue"
                  id="driver4FirstLicenseIssue"
                  placeholder=" ">
                <label for="driver4FirstLicenseIssue">Дата выдачи первого ВУ:</label>
              </div>

              <div class="psw-form-item psw-form-item--checkbox">
                <input
                  class="visually-hidden psw-form-checkbox  psw-form-checkbox--no-diagnostic-card"
                  type="checkbox"
                  name="driver4HasPreviousLicense"
                  id="driver4HasPreviousLicense">
                <label class="psw-form-checkbox-item__label" for="driver4HasPreviousLicense">
                  Указать предыдущие права
                </label>
              </div>

              <div class="psw-form-item psw-form-item--hidden  has-previous-license-items"
                   id="driver4HasPreviousLicenseItems">
                <div class="psw-form-item psw-form-item--colums">

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--series">
                    <input
                      type="text"
                      class="psw-form-input"
                      name="driver4PreviousSeries"
                      id="driver4PreviousSeries"
                      placeholder=" ">
                    <label for="driver4PreviousSeries">Серия:</label>
                  </div>

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                    <input
                      type="text"
                      class="psw-form-input"
                      name="driver4PreviousNumber"
                      id="driver4PreviousNumber"
                      placeholder=" ">
                    <label for="driver4PreviousNumber">Номер:</label>
                  </div>

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                    <input
                      type="text"
                      class="psw-form-input psw-date-input"
                      name="driver4PreviousDate"
                      id="driver4PreviousDate"
                      placeholder=" ">
                    <label for="driver4PreviousDate">Дата выдачи:</label>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="psw-form-screen-driver">
          <div class="psw-form-header">
            <h2 class="psw-form-screen__title">
              Водители <span>(водитель #5)</span>
            </h2>
          </div>

          <div class="psw-form-col-wrapper psw-form-col-wrapper--drivers">
            <div class="psw-form-col">

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-last-name"
                  name="driver5LastName"
                  id="driver5LastName"
                  placeholder=" ">
                <label for="driver5LastName">Фамилия:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-first-name"
                  name="driver5FirstName"
                  id="driver5FirstName"
                  placeholder=" ">
                <label for="driver5FirstName">Имя:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input  psw-form-input--driver-middle-name"
                  name="driver5MiddleName"
                  id="driver5MiddleName"
                  placeholder=" ">
                <label for="driver5MiddleName">Отчество:</label>
              </div>

              <div class="psw-form-item psw-form-item--colums ">

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <select
                    class="psw-form-select  psw-form-select--driver-gender"
                    name="driver5Gender"
                    id="driver5Gender"
                    placeholder=" ">
                    <option value="1" selected="">Мужской</option>
                    <option value="2">Женский</option>
                  </select>
                  <label class="psw-label--select" for="driver5Gender">Пол:</label>
                </div>

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input type="text"
                         class="psw-form-input psw-date-input  psw-form-input--driver-birth-date"
                         name="driver5BirthDate"
                         id="driver5BirthDate"
                         placeholder=" ">
                  <label for="driver5BirthDate">Дата рождения:</label>
                </div>
              </div>

              <div class="psw-form-item">
                <button class="psw-btn psw-btn--copy">Скопировать данные страхователя</button>
              </div>

            </div>

            <div class="psw-form-col">

              <h3 class="psw-h3">Водительское удостоверение</h3>

              <div class="psw-form-item">
                <div class="psw-form-item psw-form-item--colums">

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-2">
                    <div class="psw-form-item">
                      <input
                        type="text"
                        class="psw-form-input  psw-form-input--driver-series"
                        name="driver5Series"
                        id="driver5Series"
                        placeholder=" ">
                      <label for="driver5Series">Серия:</label>
                    </div>
                  </div>

                  <div class="psw-form-item__colums-item">
                    <input
                      type="text"
                      class="psw-form-input  psw-form-input--driver-number"
                      name="driver5Number"
                      id="driver5Number"
                      placeholder=" ">
                    <label for="driver5Number">Номер:</label>
                  </div>

                </div>
              </div>

              <div class="psw-form-item psw-form-item--colums">

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input
                    class="visually-hidden psw-form-checkbox  psw-form-checkbox--driver-foreigner"
                    type="checkbox"
                    name="isDriver5Foreigner"
                    id="isDriver5Foreigner">
                  <label class="psw-form-checkbox-item__label" for="isDriver5Foreigner">
                    Не резидент РФ
                  </label>
                </div>

                <div class="psw-form-item__colums-item psw-form-item__colums-item--col-2">
                  <input
                    class="visually-hidden psw-form-checkbox  psw-form-checkbox--driver-license"
                    type="checkbox"
                    name="driver5ForeignDriverLicense"
                    id="driver5ForeignDriverLicense">
                  <label class="psw-form-checkbox-item__label" for="driver5ForeignDriverLicense">
                    Иностранные права
                  </label>
                </div>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input psw-date-input"
                  name="driver5LicenseIssue"
                  id="driver5LicenseIssue"
                  placeholder=" ">
                <label for="driver5LicenseIssue">Дата выдачи ВУ:</label>
              </div>

              <div class="psw-form-item">
                <input
                  type="text"
                  class="psw-form-input psw-date-input"
                  name="driver5FirstLicenseIssue"
                  id="driver5FirstLicenseIssue"
                  placeholder=" ">
                <label for="driver5FirstLicenseIssue">Дата выдачи первого ВУ:</label>
              </div>

              <div class="psw-form-item psw-form-item--checkbox">
                <input
                  class="visually-hidden psw-form-checkbox  psw-form-checkbox--no-diagnostic-card"
                  type="checkbox"
                  name="driver5HasPreviousLicense"
                  id="driver5HasPreviousLicense">
                <label class="psw-form-checkbox-item__label" for="driver5HasPreviousLicense">
                  Указать предыдущие права
                </label>
              </div>

              <div class="psw-form-item psw-form-item--hidden  has-previous-license-items"
                   id="driver5HasPreviousLicenseItems">
                <div class="psw-form-item psw-form-item--colums">

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--series">
                    <input
                      type="text"
                      class="psw-form-input"
                      name="driver5PreviousSeries"
                      id="driver5PreviousSeries"
                      placeholder=" ">
                    <label for="driver5PreviousSeries">Серия:</label>
                  </div>

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                    <input
                      type="text"
                      class="psw-form-input"
                      name="driver5PreviousNumber"
                      id="driver5PreviousNumber"
                      placeholder=" ">
                    <label for="driver5PreviousNumber">Номер:</label>
                  </div>

                  <div class="psw-form-item__colums-item  psw-form-item__colums-item--col-3">
                    <input
                      type="text"
                      class="psw-form-input psw-date-input"
                      name="driver5PreviousDate"
                      id="driver5PreviousDate"
                      placeholder=" ">
                    <label for="driver5PreviousDate">Дата выдачи:</label>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="psw-drivers-actions">
          <div class="psw-drivers-actions__buttons">
            <button class="psw-drivers-button psw-drivers-button--active">1</button>
            <button class="psw-drivers-button">2</button>
            <button class="psw-drivers-button">3</button>
            <button class="psw-drivers-button">4</button>
            <button class="psw-drivers-button">5</button>
          </div>

          <div class="psw-drivers-actions__checkbox">
            <input
              class="visually-hidden  psw-form-checkbox"
              type="checkbox"
              name="isUnlimitedDrivers"
              id="isUnlimitedDrivers">
            <label class="psw-form-checkbox-item__label" for="isUnlimitedDrivers">
              Неограниченное количество водителей
            </label>
          </div>
        </div>

        <div class="psw-form-footer">
          <button class="psw-btn psw-btn-prev-step">
            Заполнить данные собственника
          </button>
          <button class="psw-btn psw-btn-next-step">
            Расчитать
          </button>
        </div>

      </div>
    </form>
    <div class="psw-response">
      <ul class="psw-response__list">
      </ul>
    </div>
  </div>`;

  widget.innerHTML = html;
  start();
}


pswInit('#widget');