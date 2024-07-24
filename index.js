// 1. "Əlaqə saxlayın" və "Bizimlə əlaqə saxlayın" button'larına klik etdikdə, modal teqində yerləşən hissəni göstərmək tələb olunur.//
const buttons = document.querySelectorAll(".buttons");
const modal = document.querySelector(".modal");
const close_button = modal.querySelector(".modal__close");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.add("show");
  });
});
close_button.addEventListener("click", () => {
  modal.classList.remove("show");
});
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

// 2. "Qida üsulunuzu seçin" hissəsində, yazıya klik olunan zaman ona uyğun olan kontent gorsənməlidir. //
const tab_header_items = document.querySelectorAll(".tabheader__item"); // fitness premium lenten balansli
const tab_contents = document.querySelectorAll(".tabcontent"); // image and description

tab_header_items.forEach((item, index) => {
  item.addEventListener("click", () => {
    tab_header_items.forEach((i) =>
      i.classList.remove("tabheader__item_active")
    );
    item.classList.add("tabheader__item_active");

    tab_contents.forEach((content) => content.classList.add("hide"));
    tab_contents[index].classList.remove("hide");
    tab_contents[index].classList.add("show");
  });
});

// 3. "Sizə nə təklif edə bilərik" hissəsində yerləşən oxlara klik etdikdə uyğun olan rəqəm və şəkil görsənməlidir. //
const left_arrow = document.querySelector(".offer__slider-prev");
const right_arrow = document.querySelector(".offer__slider-next");
const current = document.getElementById("current");
const offer_slides = document.querySelectorAll(".offer__slide");
let currentSliderIndex = 1;
right_arrow.addEventListener("click", () => {
  if (currentSliderIndex >= offer_slides.length) {
    currentSliderIndex = 1; 
  } else {
    currentSliderIndex++; 
  }
  current.innerText = currentSliderIndex < 10 ? "0" + currentSliderIndex : currentSliderIndex;
  offer_slides.forEach(content => content.classList.add("hide"));
  offer_slides[currentSliderIndex - 1].classList.remove("hide");
  offer_slides[currentSliderIndex - 1].classList.add("show");
});

left_arrow.addEventListener("click", () => {
  if (currentSliderIndex <= 1) {
    currentSliderIndex=4;
  } else{
    currentSliderIndex--;
  }
  current.innerText=currentSliderIndex < 10 ? "0" + currentSliderIndex : currentSliderIndex;
  offer_slides.forEach((content) => content.classList.add("hide"));
  offer_slides[currentSliderIndex - 1].classList.remove("hide");
  offer_slides[currentSliderIndex - 1].classList.add("show");
});

// 4. İsitfadəçi tərəfindən yazılan göstəricilərə uyğun kkal hesablanmalıdrı. Formula:
// Kişi üçün -> calorie = (10 * weight.value + 6.25 * height.value - 5 * age.value + 5) * dataRatio;
// Qadın üçün -> calorie = (10 * weight.value + 6.25 * height.value - 5 * age.value - 161) * dataRatio;

let height_input = document.getElementById("height");
let weight_input = document.getElementById("weight");
let age_input = document.getElementById("age");
const female = document.getElementById("female");
const male = document.getElementById("male");
const gender = document.querySelectorAll("#gender>div");
const calorie_result = document.querySelector(".calculating__result span");
const activity_level = document.querySelectorAll(
  ".calculating__choose.calculating__choose_big > div"
);
const dataRatios = [1.2, 1.375, 1.55, 1.725];
const inputs = document.querySelectorAll(
  ".calculating__choose.calculating__choose_medium > input"
);

function addActiveClass(array, activeClass) {
  array.forEach((element) => {
    element.addEventListener("click", () => {
      array.forEach((content) => content.classList.remove(activeClass));
      element.classList.add(activeClass);
      calculateAndDisplayCalories();
    });
  });
}
addActiveClass(gender, "calculating__choose-item_active");
addActiveClass(activity_level, "calculating__choose-item_active");

function calculateCalories(heightValue, weightValue, ageValue, dataRatio) {
  let calorie_res = 0;
  if (female.classList.contains("calculating__choose-item_active")) {
    calorie_res = Math.round(
      (10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161) * dataRatio
    );
  } else if (male.classList.contains("calculating__choose-item_active")) {
    calorie_res = Math.round(
      (10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5) * dataRatio
    );
  }
  calorie_result.innerText = `${calorie_res}`;
}

function getSelectedActivityRatio() {
  let selectedRatio = dataRatios[0]; // default to first ratio
  activity_level.forEach((element, index) => {
    if (element.classList.contains("calculating__choose-item_active")) {
      selectedRatio = dataRatios[index];
    }
  });
  return selectedRatio;
}

function calculateAndDisplayCalories() {
  let height = height_input.value;
  let weight = weight_input.value;
  let age = age_input.value;
  let dataRatio = getSelectedActivityRatio();
  if (height && weight && age) {
    calculateCalories(height, weight, age, dataRatio);
  }
}

inputs.forEach((element) => {
  element.addEventListener("input", calculateAndDisplayCalories);
});

calculateAndDisplayCalories();
