import { checkCmpletenessFields, getScreen } from "../utils";
import * as $ from 'jquery';
import 'jquery-ui-bundle';

let pswVehicleModels = [];
let pswVehicleYears = [];

export const getFirstScreenForm = () => {
  $(() => {
    let autoDocumentType = document.getElementById('autoDocumentType');
    let vehicleLicensePlate = document.getElementById('vehicleLicensePlate');
    const form = document.querySelector('.psw-form');
    const formFirstScreen = form.querySelectorAll('.psw-form-screen')[0];
    const formFirstScreenButtonNext = formFirstScreen.querySelector('.psw-btn-next-step');
    const checkboxNoDiagnosticCard = formFirstScreen.querySelector('#noDiagnosticCard');
    const inputsWrapNoDiagnosticCard = formFirstScreen.querySelector('#noDiagnosticCardInputsWrap');
    checkboxNoDiagnosticCard.disabled = true;

    $('#vehicleBrand').autocomplete({
      source: function (request, response) {
        $('#vehicleBrandName').val('');
        $.ajax({
          url: window.pswUrl + '/brands?query=' + request.term,
          type: 'GET',
          async: false,
          success: function (data) {
            response(data);
          },
          error: function (error) {
            ps__show_alert('Технические неполадки. Просим прощения за неудобства.');
            console.log(error);
          }
        })
      },
      select: function (event, ui) {
        $('#vehicleBrandName').val(ui.item.data);
        event.target.classList.remove('border-danger');
        prepareModels(ui.item.data);
      },
      close: function (event, ui) {
        if (!$('#vehicleBrandName').val()) {
          // alertify.error('Марку авто нужно выбрать из списка!');
          event.target.value = '';
          event.target.classList.add('border-danger');
          event.target.focus();
        }
      }
    });

    $('#vehicleYear').on('change', () => {
      let year = $('#vehicleYear').val();

      if (Number(year) > 2018 && Number(year) < 2022) {
        checkboxNoDiagnosticCard.disabled = false;
      } else {
        checkboxNoDiagnosticCard.disabled = true;
        checkboxNoDiagnosticCard.checked = false;
        inputsWrapNoDiagnosticCard.classList.remove('psw-form-item--hidden');
      }
    });

    vehicleLicensePlate.addEventListener('change', () => {
      if (vehicleLicensePlate.value) {

      } else {
        autoDocumentType.value = 'pts';
      }
    });

    autoDocumentType.addEventListener('change', () => {
      if (autoDocumentType.value === 'epts') {
        document.getElementById('autoDocumentSerie').setAttribute('disabled', 'disabled');
      } else {
        if (vehicleLicensePlate.value) {

        } else {
          autoDocumentType.value = 'pts';
        }

        document.getElementById('autoDocumentSerie').removeAttribute('disabled');
      }
    });

    checkboxNoDiagnosticCard.addEventListener('change', (e) => {
      const inputAutoDianosticCardNumber = inputsWrapNoDiagnosticCard.querySelector('#autoDianosticCardNumber');
      const inputAutoDiagnosticCardDate = inputsWrapNoDiagnosticCard.querySelector('#autoDiagnosticCardDate');

      if (e.target.checked) {
        inputsWrapNoDiagnosticCard.classList.add('psw-form-item--hidden')
        inputAutoDianosticCardNumber.classList.add('not-required');
        inputAutoDiagnosticCardDate.classList.add('not-required');
      } else {
        inputsWrapNoDiagnosticCard.classList.remove('psw-form-item--hidden');
        inputAutoDianosticCardNumber.classList.remove('not-required');
        inputAutoDiagnosticCardDate.classList.remove('not-required');
      }
    });

    const onFormFirstScreenButtonNextClick = (evt) => {
      evt.preventDefault();

      const errors = checkCmpletenessFields(formFirstScreen);

      if (!errors) {
        getScreen(2);
      }
    };

    formFirstScreenButtonNext.addEventListener('click', onFormFirstScreenButtonNextClick);
  });

  const prepareModels = (brand) => {
    $('#vehicleModelName').val('');
    $.ajax({
      url: window.pswUrl + '/models?query=' + brand,
      type: 'GET',
      async: false,
      success: function (data) {
        let models = [];
        models = data.map(item => {
          return {
            value: (item.nameRu ? item.nameRu : item.name),
            label: (item.nameRu ? item.nameRu : item.name),
            data: item.id
          }
        });
        $('#vehicleModel').autocomplete({
          source: models,
          select: function (event, ui) {
            $('#vehicleModelName').val(ui.item.data);
            event.target.classList.remove('border-danger');
            prepareYears(ui.item.data);
          },
          close: function (event, ui) {
            if (!$('#vehicleModelName').val()) {
              // alertify.error('Модель авто нужно выбрать из списка!');
              event.target.value = '';
              event.target.classList.add('border-danger');
              event.target.focus();
            }
          }
        }).attr('disabled', false);
      },
      error: function (error) {
        ps__show_alert('Технические неполадки. Просим прощения за неудобства.');
        console.log(data);
      }
    })
  };

  const prepareYears = (model) => {
    unSetModifications();
    $.ajax({
      url: window.pswUrl + '/years?model_id=' + model,
      type: 'GET',
      async: false,
      success: function (data) {
        let years = data.map(item => {
          return {
            value: item,
            label: item,
          };
        });
        $('#vehicleYear').autocomplete({
          source: years,
          select: function (event, ui) {
            setModifications({
              model: model,
              year: ui.item.value
            }, event.target);
          },
          close: function (event, ui) {
            if (!checkModificationsExist()) {
              // alertify.error('Год выпуска нужно выбрать из списка!');
              event.target.value = '';
              event.target.classList.add('border-danger');
              event.target.focus();
            }
          }
        })
      },
      error: function (error) {
        ps__show_alert('Технические неполадки. Просим прощения за неудобства.');
        console.log(error);
      }
    })
  }

  const setModifications = (data, element) => {
    $.ajax({
      url: window.pswUrl + '/modifications?model_id=' + data.model + '&year=' + data.year,
      type: 'GET',
      async: false,
      success: function (data) {
        $('#vehicle_modification').val(data.modification);
        $('#vehicle_modification_name').val(data.modification_name);
        $('#vehicle_serie').val(data.serie);
        $('#vehicle_serie_name').val(data.serie_name);
        $('#vehicle_generation').val(data.generation);
        $('#vehicle_generation_name').val(data.generation_name);

        if (checkModificationsExist()) {
          element.classList.remove('border-danger');
        }
      },
      error: function (error) {
        ps__show_alert('Технические неполадки. Просим прощения за неудобства.');
        console.log(error);
      }
    })
  }

  const unSetModifications = () => {
    $('#vehicle_modification').val('')
    $('#vehicle_modification_name').val('')
    $('#vehicle_serie').val('')
    $('#vehicle_serie_name').val('')
    $('#vehicle_generation').val('')
    $('#vehicle_generation_name').val('')
  }

  const checkModificationsExist = () => {
    return $('#vehicle_modification').val()
      || $('#vehicle_modification_name').val()
      || $('#vehicle_serie').val()
      || $('#vehicle_serie_name').val()
      || $('#vehicle_generation').val()
      || $('#vehicle_generation_name').val();
  }
}
