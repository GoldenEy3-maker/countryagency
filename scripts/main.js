// Swiper
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Drawer
const drawer = document.querySelector("[data-drawer]");
const drawerContent = document.querySelector("[data-drawer-content]");
const header = document.getElementById("header");
let balloonPanel = null;

function updateBalloonPanelPositionBasedOnDrawerHeight(drawerHeight) {
  if (
    balloonPanel &&
    ((drawerHeight >= 10 && drawerHeight < 65) ||
      (drawerHeight <= 65 && drawerHeight > 10))
  ) {
    balloonPanel.style.setProperty(
      "--bottom",
      `calc(1rem + ${(drawerHeight * window.innerHeight) / 100 / 16}rem)`
    );
  }
}

let isOpen = false,
  isDraggable = true,
  startY,
  startHeight;

function openDrawer() {
  isOpen = true;
  updateDrawerHeight(65);
  header.ariaHidden = false;
  drawer.ariaExpanded = true;
}

function closeDrawer() {
  isOpen = false;
  updateDrawerHeight(10);
  header.ariaHidden = true;
  drawer.ariaExpanded = false;
}

function updateDrawerHeight(value) {
  drawer.style.height = `${value}svh`;
  updateBalloonPanelPositionBasedOnDrawerHeight(value);
}

function dragStart(event) {
  if (!isDraggable) return;
  startY = event.pageY || event.touches?.[0].pageY;
  startHeight = parseInt(drawer.style.height);
  drawer.classList.add("_dragging");
  balloonPanel?.classList.add("_drawer-dragging");
  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragEnd);
  document.addEventListener("touchmove", dragging);
  document.addEventListener("touchend", dragEnd);
}

function dragging(event) {
  const delta = startY - (event.pageY || event.touches?.[0].pageY);
  const height = startHeight + (delta / window.innerHeight) * 100;
  updateDrawerHeight(height);
}

function dragEnd() {
  drawer.classList.remove("_dragging");
  balloonPanel?.classList.remove("_drawer-dragging");
  const height = parseInt(drawer.style.height);
  if (height > 25 && !isOpen) openDrawer();
  else if (height < 25 && !isOpen) closeDrawer();
  else if (isOpen && height < 50) closeDrawer();
  else if (isOpen && height > 50) openDrawer();
  document.removeEventListener("mousemove", dragging);
  document.removeEventListener("mouseup", dragEnd);
  document.removeEventListener("touchmove", dragging);
  document.removeEventListener("touchend", dragEnd);
}

updateDrawerHeight(10);
drawer.addEventListener("mousedown", dragStart);
drawer.addEventListener("touchstart", dragStart);
drawerContent.addEventListener(
  "scroll",
  () => (isDraggable = drawerContent.scrollTop === 0)
);

// Ymaps
const mapCenter = [53.353151922581084, 83.77409176380847];

const PLACEMARKS_DATA = [
  {
    img: "balloon_photo1",
    href: "#",
    hotel: "Гостиница 3*",
    title: "Отель на Земле имени Кленова Владислава",
    rating: 4.9,
    reviews: "121 отзыв",
    period: "За 5 ночей и 2 гостя",
    price: "6 000 ₽",
  },
  {
    img: "balloon_photo1",
    href: "#",
    hotel: "Гостиница 2*",
    title: "BAST Apart Grey Manufaktura Centrum Miasta Legionów 18",
    rating: 4.9,
    reviews: "121 отзыв",
    period: "За 5 ночей",
    price: "6 000 ₽",
    discount: "8 000 ₽",
  },
];

const inactivePlacemark =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8wXzE4KSI+CjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjciIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjYuNSIgc3Ryb2tlPSIjMEY2N0NGIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF8wXzE4IiB4PSIwIiB5PSIwIiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldC8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0ib3V0Ii8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjEgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18wXzE4Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzBfMTgiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==";
const activePlacemark =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8xXzIyMykiPgo8Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI3IiBmaWxsPSIjMEY2N0NGIi8+CjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjYuNSIgc3Ryb2tlPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfMV8yMjMiIHg9IjAiIHk9IjAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0Lz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzFfMjIzIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzFfMjIzIiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=";

function getRandomPosition() {
  return [
    mapCenter[0] + (Math.random() * 0.1 - 0.06),
    mapCenter[1] + (Math.random() * 0.1 - 0.06),
  ];
}

function balloonTemplate(opts) {
  return `
        <div class="balloon">
          <div class="balloon-image">
            <picture>
              <source srcset="assets/${opts.img}.webp" type="image/webp" />
              <source src="assets/${opts.img}.jpg" type="image/jpeg" />
              <img src="assets/${opts.img}.jpg" alt="Фото номерa" />
            </picture>
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
              <div class="balloon-pricing-wrapper">
                <span>${opts.price}</span>
                ${
                  opts.discount
                    ? `<span class="balloon-pricing__discoung">${opts.discount}</span>`
                    : ""
                }
              </div>
            </div>
          </div>
        </div>
  `;
}

function init() {
  const map = new ymaps.Map("map", {
    center: mapCenter,
    zoom: 12,
  });

  let placemarks = [];

  for (let i = 0; i <= 15; i++) {
    const dataIdx = i % 2 === 0 ? 1 : 0;

    const placemark = new ymaps.Placemark(
      getRandomPosition(),
      {
        balloonContent: balloonTemplate(PLACEMARKS_DATA[dataIdx]),
      },
      {
        iconLayout: "default#image",
        iconImageHref: inactivePlacemark,
        iconImageSize: [20, 20],
        iconImageOffset: [-10, -10],
        hideIconOnBalloonOpen: false,
        balloonCloseButton: false,
        balloonOffset: [-160, 0],
        balloonAutoPanMargin: 15,
        balloonPanelMaxMapArea: matchMedia("(max-width: 768px)").matches
          ? Infinity
          : 0,
      }
    );

    placemarks.push(placemark);
  }

  // Close Balloon onMapClick
  map.events.add("click", () => map.balloon.close());

  map.controls.remove("geolocationControl");
  map.controls.remove("searchControl");
  map.controls.remove("trafficControl");
  map.controls.remove("typeSelector");
  map.controls.remove("fullscreenControl");
  map.controls.remove("zoomControl");
  map.controls.remove("rulerControl");
  // map.behaviors.disable(["scrollZoom"]);

  placemarks.forEach((mark) => {
    // Toggle iconImageHref
    mark.events.add("balloonclose", (e) =>
      e.get("target").options.set("iconImageHref", inactivePlacemark)
    );
    mark.events.add("balloonopen", (e) => {
      balloonPanel = document.querySelector("[class*='-balloon_layout_panel']");

      updateBalloonPanelPositionBasedOnDrawerHeight(
        parseInt(drawer.style.height)
      );
      e.get("target").options.set("iconImageHref", activePlacemark);
    });

    window.addEventListener("resize", () =>
      mark.options.set(
        "balloonPanelMaxMapArea",
        matchMedia("(max-width: 768px)").matches ? Infinity : 0
      )
    );

    // Add placemarks on the map
    map.geoObjects.add(mark);
  });
}

ymaps.ready(init);

// Go To Map
const goToMapBtn = document.querySelector("[data-go-to-map]");
const map = document.getElementById("map");

if (goToMapBtn && map) {
  const observer = new IntersectionObserver((entries) =>
    entries.forEach((entry) => (goToMapBtn.ariaHidden = entry.isIntersecting))
  );

  goToMapBtn.addEventListener("click", () => {
    map.scrollIntoView({
      behavior: "smooth",
    });
  });

  observer.observe(map);
}
