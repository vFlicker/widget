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