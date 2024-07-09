// Swiper
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Consts
const inactivePlacemark =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8wXzE4KSI+CjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjciIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjYuNSIgc3Ryb2tlPSIjMEY2N0NGIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF8wXzE4IiB4PSIwIiB5PSIwIiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldC8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0ib3V0Ii8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjEgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18wXzE4Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzBfMTgiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==";
const activePlacemark =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8xXzIyMykiPgo8Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI3IiBmaWxsPSIjMEY2N0NGIi8+CjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjYuNSIgc3Ryb2tlPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfMV8yMjMiIHg9IjAiIHk9IjAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0Lz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzFfMjIzIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzFfMjIzIiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=";

// Templates
function balloonTemplate(opts) {
  return `
        <div class="balloon">
          <div class="balloon-image">
            <img src="${opts.img}" alt="Фото номера">
          </div>
          <div class="balloon-body">
            <p>${opts.hotel}</p>
            <a href="${opts.href}" class="balloon-title">${opts.title}</a>
            <div class="balloon-rating">
              <span class="card__rating">${opts.rating}</span>
              <span class="balloon-rating__reviews">${opts.reviews}</span>
            </div>
            <div class="balloon-pricing">
              <p>${opts.period}</p>
              <span>${opts.price}</span>
            </div>
          </div>
        </div>
  `;
}

// Ymaps
function init() {
  const map = new ymaps.Map("map", {
    center: [53.353151922581084, 83.77409176380847],
    zoom: 15,
  });

  const firstPlacemark = new ymaps.Placemark(
    [53.35428168946139, 83.77769665272446],
    {
      balloonContent: balloonTemplate({
        img: "assets/balloon_photo1.jpg",
        href: "#",
        hotel: "Гостиница 3*",
        title: "Отель на Земле имени Кленова Владислава",
        rating: 4.9,
        reviews: "121 отзыв",
        period: "За 5 ночей и 2 гостя",
        price: "6 000 ₽",
      }),
    },
    {
      iconLayout: "default#image",
      iconImageHref: inactivePlacemark,
      iconImageSize: [14, 14],
      iconImageOffset: [-10, -2],
      hideIconOnBalloonOpen: false,
      balloonCloseButton: false,
      balloonOffset: [-160, 0],
      balloonAutoPanMargin: 15,
    }
  );
  const secondPlacemark = new ymaps.Placemark(
    [53.35304921500627, 83.77941326649402],
    {
      balloonContent: balloonTemplate({
        img: "assets/balloon_photo1.jpg",
        href: "#",
        hotel: "Гостиница 3*",
        title: "Отель на Земле имени Кленова Владислава",
        rating: 4.9,
        reviews: "121 отзыв",
        period: "За 5 ночей и 2 гостя",
        price: "6 000 ₽",
      }),
    },
    {
      iconLayout: "default#image",
      iconImageHref: inactivePlacemark,
      iconImageSize: [14, 14],
      iconImageOffset: [-10, -2],
      hideIconOnBalloonOpen: false,
      balloonCloseButton: false,
      balloonOffset: [-160, 0],
      balloonAutoPanMargin: 15,
    }
  );

  firstPlacemark.events.add("balloonopen", (e) =>
    e.get("target").options.set("iconImageHref", activePlacemark)
  );
  firstPlacemark.events.add("balloonclose", (e) =>
    e.get("target").options.set("iconImageHref", inactivePlacemark)
  );
  secondPlacemark.events.add("balloonopen", (e) =>
    e.get("target").options.set("iconImageHref", activePlacemark)
  );
  secondPlacemark.events.add("balloonclose", (e) =>
    e.get("target").options.set("iconImageHref", inactivePlacemark)
  );

  map.controls.remove("geolocationControl"); // удаляем геолокацию
  map.controls.remove("searchControl"); // удаляем поиск
  map.controls.remove("trafficControl"); // удаляем контроль трафика
  map.controls.remove("typeSelector"); // удаляем тип
  map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove("zoomControl"); // удаляем контрол зуммирования
  map.controls.remove("rulerControl"); // удаляем контрол правил
  // map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)

  map.geoObjects.add(firstPlacemark);
  map.geoObjects.add(secondPlacemark);
}

ymaps.ready(init);

// Go To Map

const goToMapBtn = document.querySelector("[data-go-to-map]");
const map = document.getElementById("map");

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    goToMapBtn.ariaHidden = entry.isIntersecting;
  }
});

if (goToMapBtn) {
  goToMapBtn.addEventListener("click", () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });

  observer.observe(map);
}
