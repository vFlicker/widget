import * as $ from 'jquery';

export const dateInputMask = (selector) => {
  const items = document.querySelectorAll(selector);

  for (const item of items) {
    item.addEventListener(`keypress`, function (evt) {
      const length = item.value.length;

      if (evt.keyCode < 47 || evt.keyCode > 57 || length > 9) {
        evt.preventDefault();
      }
      if (length === 2 || length === 5) {
        item.value += `.`;
      }
    });
  }
};

export const organisationCodeMask = (selector) => {
  const items = document.querySelectorAll(selector);

  for (const item of items) {
    item.addEventListener(`keypress`, function (evt) {
      const length = item.value.length;

      if (evt.keyCode < 47 || evt.keyCode > 57 || length > 6) {
        evt.preventDefault();
      }

      if (length === 3) {
        item.value += `-`;
      }

    });
  }
};

export const getScreen = (screenNumber) => {
  const form = document.querySelector(`.psw-form`);
  let shiftPercentage;

  screenNumber === 1
    ? shiftPercentage = 0
    : shiftPercentage = screenNumber - 1;

  form.style.transform = `translateX(${shiftPercentage * -100}%)`;
};

export const ps__show_alert = (content = '') => {
  $('.ps__widget_alert_content').html(content)
  $('.ps__widget_alert_block').show(500);
}

export const ps__hide_alert = () => {
  $('.ps__widget_alert_block').hide(500);
  $('.ps__widget_alert_content').html('')
}

export const preloaderOn = () => {
  console.log('Preloader start');
  $('#ps__widget_loading').css('display', 'block');
}

export const preloaderOff = () => {
  console.log('Preloader off');
  $('#ps__widget_loading').delay(1000).css('display', 'none');
}

export const checkCmpletenessFields = (selector) => {
  const inputs = selector.querySelectorAll(`.psw-form-input`);
  let isError = false;

  for (const input of inputs) {
    if (input.value.length < 1 && !input.classList.contains(`not-required`)) {
      input.classList.add(`psw-form-input-error`);
      isError = true;
    }
  }

  return isError;
};

export const setAddressDetails = (ownerType, addressData) => {
  pswStorage.set(ownerType, {
    CountryCode: addressData.country_iso_code,
    AreaType: addressData.area_type,
    AreaName: addressData.area_with_type,
    AreaKladr: addressData.area_kladr_id,
    RegionKladrCode: addressData.region_kladr_id,
    RegionType: addressData.region_type,
    RegionName: addressData.region,
    CityDistrictKladrCode: addressData.city_district_kladr_id,
    CityDistrictType: addressData.city_district_type,
    CityDistrict: addressData.city_district,
    CityKladrCode: addressData.city_kladr_id,
    CityType: addressData.city_type,
    CityName: addressData.city,
    AddressesKladrCode: addressData.kladr_id,
    SettlementKladrCode: addressData.settlement_kladr_id,
    SettlementType: addressData.settlement_type,
    SettlementName: addressData.settlement,
    StreetKladrCode: addressData.street_kladr_id,
    StreetType: addressData.street_type,
    StreetName: addressData.street,
    HouseKladrCode: addressData.house_kladr_id ? addressData.house_kladr_id : addressData.kladr_id,
    HouseType: addressData.house_type,
    House: addressData.house,
    Block: addressData.block,
    BlockType: addressData.block_type,
    Flat: addressData.flat,
    FlatType: addressData.flat_type,
    Okato: addressData.okato,
    Fias: addressData.fias_id,
    SettlementFias: addressData.settlement_fias_id,
    StreetFias: addressData.street_fias_id,
    CityFias: addressData.city_fias_id,
    HouseFias: addressData.house_fias_id,
    PostalCode: addressData.postal_code,
    RegionFiasCode: addressData.region_fias_id,
    CityFiasCode: addressData.city_fias_id,
    SettlementFiasCode: addressData.settlement_fias_id,
    StreetFiasCode: addressData.street_fias_id,
    AreaFiasCode: addressData.area_fias_id
  }, true);
};

export const formToJson = () => {
  let unindexed_array = $('#ps__widget_osago_form').serializeArray();
  let indexed_array = {};

  $.map(unindexed_array, function(n, i){
    indexed_array[n['name']] = n['value'];
  });
  let insurerAddress = pswStorage.get('insurer', true);
  let ownerAddress = pswStorage.get('client', true);

  for (let prop in insurerAddress) {
    indexed_array['insurer' + prop] = insurerAddress[prop];
  }

  if (ownerAddress.length) {
    for (let prop in ownerAddress) {
      indexed_array['client' + prop] = ownerAddress[prop];
    }
  }

  indexed_array['formId'] = 'pswwg' + Date.now().toString();
  if (!document.getElementById('isUnlimitedDrivers').checked) {
    let driverCount = 0;
    for (let i = 1; i<= 5; i++) {
      if (indexed_array['driver' + i + 'LastName'].length <= 0 && indexed_array['driver' + i + 'FirstName'].length <= 0) {
        delete indexed_array['driver' + i + 'LastName'];
        delete indexed_array['driver' + i + 'FirstName'];
        delete indexed_array['driver' + i + 'MiddleName'];
        delete indexed_array['driver' + i + 'BirthDate'];
        delete indexed_array['driver' + i + 'Gender'];
        delete indexed_array['driver' + i + 'FirstLicenseIssue'];
        delete indexed_array['driver' + i + 'LicenseIssue'];
        delete indexed_array['driver' + i + 'Number'];
        delete indexed_array['driver' + i + 'PreviousLicenseNumber'];
        delete indexed_array['driver' + i + 'PreviousLicenseSerie'];
        delete indexed_array['driver' + i + 'PreviousDate'];
        delete indexed_array['driver' + i + 'Serie'];
      } else {
        driverCount++;
      }
    }
    indexed_array['driverCount'] = driverCount;
  }

  return indexed_array;
}

export const pswStorage = {
  set: (key, value, isJson = false) => {
    if (isJson) {
      value = JSON.stringify(value);
    }
    return localStorage.setItem(key, value);
  },
  get: (key, isJson = false) => {
    if (isJson) {
      return JSON.parse(localStorage.getItem(key));
    }

    return localStorage.getItem(key);
  },
  remove: function (sKey) {
    if (!sKey || !this.hasOwnProperty(sKey)) { return; }
    document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    this.length--;
  },
  has: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  }
}

export const passportOrgSetter = () => {
  let codeEl = document.querySelectorAll('.psw-organisation-code-input');
  for(let i = 0; i < codeEl.length; i++) {
    codeEl[i].addEventListener('change', () => {
      let code = codeEl[i].value;
      if (validateCode(code)) {
        setPassportIssuer(code, codeEl[i]);
      }
    });
  }
}

const validateCode = (code) => {
  let valid = true;
  let split = code.split('-');
  if (split.length === 2) {
    for (let i = 0; i < split.length; i++) {
      if (split[i].length === 3 && !isNaN(split[i])) {
        valid = true;
      } else {
        return false;
      }
    }

    return valid;
  }

  return false;
}

const setPassportIssuer = (code, element) => {
  preloaderOn();
  let url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fms_unit';
  let token = '3997eb72967889aaf9aefd5b65060dc1ab866224';

  if($.ajaxSettings && $.ajaxSettings.headers) {
    delete $.ajaxSettings.headers.Enc;
  }

  $.ajax({
    url: url,
    type: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Token " + token
    },
    data: JSON.stringify({
      query: code
    }),
    success: (response) => {
      let targetField = document.getElementById(element.dataset.target);
      if (response.suggestions.length) {
        let suggestion = response.suggestions[0];
        targetField.value = suggestion.unrestricted_value
      } else {
        $(targetField).addClass('psw-form-input-error')
          .parent().removeClass('psw-form-item--hidden');
      }
      preloaderOff();
    },
    fail: (error) => {
      ps__show_alert('Технические неполадки. Просим прощения за неудобства.');
      console.log(error);
    }
  });
}

export const fillBySuggest = () => {
  event.preventDefault();
  preloaderOn();
  let requestValue = $('#ps__widget_entrance_value').val();
  let field = requestValue.length > 10 ? 'vin' : 'reg_num';
  let stop = false;

  if (requestValue) {
    $.ajax({
      type: "GET",
      url: window.pswUrl + '/auto_fill',
      data: {
        field: field,
        value: requestValue,
      },
      success: (response) => {
        console.log(response);
        if (response && response.status === 'success') {
          let data = response;
          fillWithData(data);
          $('.psw-main-screen__psw-btn-link').click();
        } else {
          ps__show_alert('На данный транспорт ничего не нашлось')
        }
        preloaderOff();
      },
      fail: (error) => {
        console.log(error);
        preloaderOff();
        ps__show_alert('Произошла техническая ошибка')
      }
    });
  } else {
    if (field === 'vin' && stop) {
      ps__show_alert('Автозаполнение можно использовать только с Регистрационным номером или ВИН автомобиля');
    } else {
      ps__show_alert('Значение не может быть пустым');
    }
    preloaderOff();
  }
}

const fillWithData = (data) => {
  if (data.doc_num) {
    document.getElementById('autoDocumentNumber').value = data.doc_num;
  }

  if (data.doc_serial) {
    document.getElementById('autoDocumentSerie').value = data.doc_serial;
  }

  if (data.doc_issued_date) {
    document.getElementById('autoDocumentDate').value = data.doc_issued_date;
  }

  if (data.ts_year) {
    $('#vehicleYear').val(data.ts_year);
    let yearEvent = new Event('change');
    document.getElementById('vehicleYear').dispatchEvent(yearEvent);
  }

  if (data.ts_vin) {
    $('#identifierType').find("option[value='vin']").attr('selected', 'selected');
    $('#identifierNumber').val(data.ts_vin);
  }

  if (data.ts_reg_num) {
    $('#vehicleLicensePlate').val(data.ts_reg_num);
    let regNumEvent = new Event('change');
    document.getElementById('vehicleLicensePlate').dispatchEvent(regNumEvent);
  }

  if (data.ts_eaisto_number) {
    $('#autoDianosticCardNumber').val(data.ts_eaisto_number);
    $('#autoDiagnosticCardDate').val(data.ts_eaisto_date);
  }

  if (data.ts_category && document.getElementById('vehicleType')) {
    let vehicleTypes = {
      1: 'Мотоциклы и мотороллеры',
      2: 'Легковые автомобили',
      3: 'Грузовые автомобили',
      4: 'Автобусы',
    };
    let value = vehicleTypes[data.ts_category];
    $('#vehicleType option:contains(' + value + ')').attr('selected', 'selected');
    let changeEvent = new Event('change');
    document.getElementById('vehicleType').dispatchEvent(changeEvent);
  }

  if (data.ts_fuel_type && document.getElementById('vehicleEngineType')) {
    let fuelTypes = {
      1: 'Бензин',
      2: 'Дизель',
    };
    let value = fuelTypes[data.ts_fuel_type];
    $('#vehicleEngineType option:contains(' + value + ')').attr('selected', 'selected');
    let changeEvent = new Event('change');
    document.getElementById('vehicleEngineType').dispatchEvent(changeEvent);
  }

  fillUserInfo(data);

  if (data.ts_mark) {
    $('#vehicleBrand').data("uiAutocomplete").search(data.ts_mark);
    $("#vehicleBrand").data("ui-autocomplete").menu.element.children().first().click();
    $("#vehicleBrand").trigger("autocompleteselect");

    if (data.ts_model) {
      $('#vehicleModel').data("uiAutocomplete").search(data.ts_model);
      $("#vehicleModel").data("ui-autocomplete").menu.element.children().first().click();
      $("#vehicleModel").trigger("autocompleteselect");

      if ($('#vehicleModel').val() && data.ts_year) {
        $('#vehicleYear').data("uiAutocomplete").search(data.ts_year.toString());
        $("#vehicleYear").data("ui-autocomplete").menu.element.children().first().click();
        $("#vehicleYear").trigger("autocompleteselect");
      }
    }
  }
}

const fillUserInfo = (data) => {
  if (data.user_last_name) {
    document.getElementById('insurerLastName').value = data.user_last_name;
    if (!$('#isInsurerClient').prop('checked')) {
      $('#clientLastName').val(data.user_last_name);
    }
  }

  if (data.user_first_name) {
    document.getElementById('insurerFirstName').value = data.user_first_name;
    if (!$('#isInsurerClient').prop('checked')) {
      $('#clientFirstName').val(data.user_first_name);
    }
  }

  if (data.user_middle_name) {
    document.getElementById('insurerMiddleName').value = data.user_middle_name;
    if (!$('#isInsurerClient').prop('checked')) {
      $('#clientMiddleName').val(data.user_middle_name);
    }
  }
}

