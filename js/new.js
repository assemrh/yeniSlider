<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>

</head>

<script>
const swiper_main = new Swiper('.swiper_main', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
})

function goToSlide(index) {
    const loader = document.getElementsByClassName('loader')
    loader[0].style.rotate = 'rotate(45deg)'
    swiper_main.slideTo(index, 300);
}





$(document).ready(function() {
  var sliderItems = $('.slider .slide');
  var paginationBoxes = $('.pagination .box');

  var currentImg = 0;

  function setActive(index) {
      sliderItems.removeClass('active');
      paginationBoxes.removeClass('active').eq(index).addClass('active');
      currentImg = index;
      sliderItems.eq(currentImg).addClass('active');
  }

  $('.next').on('click', function() {
      var nextImg = (currentImg + 1) % sliderItems.length;
      setActive(nextImg);
  });

  $('.prev').on('click', function() {
      var prevImg = (currentImg - 1 + sliderItems.length) % sliderItems.length;
      setActive(prevImg);
  });

  paginationBoxes.on('click', function() {
      var index = $(this).index();
      setActive(index);
  });

  // İlk sayfa yüklenirken ilk kutuyu aktif hale getirin
  setActive(currentImg);
});




const container = document.querySelector(".loader");
const rotatingDivs = document.querySelectorAll(".rotating");
const slides = document.querySelectorAll(".slide");
const paginationBoxes = document.querySelectorAll(".pagination .box");
const contentDiv = document.querySelector(".content");

let currentSlide = 0;
let autoRotateInterval;

rotatingDivs.forEach((div) => {
    div.addEventListener("click", () => {
        const index = parseInt(div.dataset.index, 10);

        // Tüm slaytları gizleyin
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });

        // İlgili slaytı gösterin
        slides[index].classList.add("active");

        // Paginationdaki ilgili kutuyu aktif hale getirin
        paginationBoxes.forEach((box) => {
            box.classList.remove("active");
        });
        paginationBoxes[index].classList.add("active");

        // Loader'ı ayarlanan derecede döndürün
        const degree = 360 - ((index * 90) - 45 - 90);
        container.style.transform = `rotate(${degree}deg)`;
        container.style.transition = "2s";

        // Content divi sağdan sola kayarak görünsün
        contentDiv.classList.remove("fade-in");
        setTimeout(() => {
            contentDiv.classList.add("fade-in");
        }, 0);

        // Otomatik dönüşü durdurun ve index'i güncelleyin
        clearInterval(autoRotateInterval);
        currentSlide = index;

        // Otomatik döndürmeyi başlatın (4 saniye aralıklarla)
        autoRotateInterval = setInterval(autoRotate, 4000);
    });
});

function autoRotate() {
    currentSlide = (currentSlide + 1) % rotatingDivs.length;
    rotatingDivs[currentSlide].click();
}

// İlk sayfa yüklenirken ilk kutuyu ve slaytı aktif hale getirin
rotatingDivs[0].click();
</script>