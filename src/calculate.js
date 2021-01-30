const getCalculateScreen = () => {

  const responseWrapper = document.querySelector('.psw-response');

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
}
