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