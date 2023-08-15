class CircleSlider {
    images;
    container
    rotatingDivs;
    slides;
    paginationBoxes;
    contentDiv;
    checkBox;
    conDiv;
    carTitleElement;
    prevButton;
    nextButton;
    carTitles = [
        "Mavi Araba!",
        "Siyah Araba!",
        "Sarı Araba!",
        "Kırmızı Araba!"
    ];
    prevDegree = 45;
    currentDegree = 45;
    currentDegree2 = 0;

    currentSlide = 0;
    autoRotateInterval;
    pauseAutoId;
    sliderItems ;
    //paginationBoxes = $(".pagination .box");
    currentImg = 0;

    constructor() {
        this.images = document.querySelectorAll(".loader .rotating img");
        this.container = document.querySelector(".loader");
        this.rotatingDivs = document.querySelectorAll(".rotating");
        this.slides = document.querySelectorAll(".slide");
        this.paginationBoxes = document.querySelectorAll(".pagination .box");
        this.contentDiv = document.querySelector(".content");
        this.checkBox = document.querySelector(".checkbox");
        this.conDiv = document.querySelector(".con");
        this.carTitleElement = document.getElementById("carTitle");
        this.prevButton = document.querySelector(".prev");
        this.nextButton = document.querySelector(".next");
        this.sliderItems = $(".slider .slide");

        this.init()
    }

    setActive(index) {
        this.sliderItems.removeClass("active");

        this.sliderItems.eq(index).addClass("active");
        this.paginationBoxes.forEach(function (box) {
            box.classList.remove("active");
        });
        this.paginationBoxes[index].classList.add("active");

        this.currentImg = index;

    }


    nextSlider() {
        const nextImg = (this.currentImg + 1) % this.sliderItems.length;

        this.rotate(this.container, this.currentDegree + 90);
        this.setSlider(nextImg);
    }

    prevSlider() {
        const prevImg = (this.currentImg - 1 + this.sliderItems.length) % this.sliderItems.length;
        rotate(this.container, this.currentDegree - 90);
        setSlider(prevImg);
    }

    init() {
        document.querySelector(".next").addEventListener("click", this.nextSlider);
        document.querySelector(".prev").addEventListener("click", this.prevSlider);

        this.setActive(this.currentImg);
        this.rotatingDivs[0].click();
        this.startAutoRotate();


        //Events
        this.checkBox.addEventListener("change", () => {
            if (checkBox.checked) {
                this.stopAutoRotate();
            } else {
                this.startAutoRotate();
            }
        });

        this.rotatingDivs.forEach((div, index) => {
            div.addEventListener("click", () => {
                this.currentSlide = index;
                this.currentDegree = index * 90 + 45;
                this.goToSlide(index);
                this.setSlider(index);
            });
        });
    }

//Functions

    setSlider(index) {
        this.pauseAuto();
        this.setActive(index);
        this.returnImageBack(index);
        this.updateCarTitle(index);
        this.updateBackgroundColor(index);
        this.updateContentBackgroundColor(index);
    }

    updateCarTitle(index) {
        this.carTitleElement.textContent = this.carTitles[index];
    }

    updateBackgroundColor(index) {
        const bgColors = [
            "rgba(228, 208, 10, 0.4)",
            "rgba(136, 8, 8, 0.4)",
            "rgba(52, 52, 52, 0.4)",
            "rgba(93, 63, 211, 0.4)"
        ];
        this.conDiv.style.backgroundColor = bgColors[index];
    }

    updateContentBackgroundColor(index) {
        this.contentDiv.style.backgroundColor = window.getComputedStyle(this.rotatingDivs[index]).backgroundColor;
    }

    toggleAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
            console.log("Kapandı");
        } else {
            this.autoRotateInterval = setInterval(this.autoRotate, 4000);
            this.autoRotate(); // İlk döndürmeyi hemen başlat
            console.log("Açıldı");
        }
    }

    startAutoRotate() {
        if (!this.autoRotateInterval) {
            this.autoRotateInterval = setInterval(this.autoRotate, 4000);
            this.autoRotate(); // İlk döndürmeyi hemen başlat
            console.log("Açıldı");
        }
    }

    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
            console.log("Kapandı");
        }
    }

    goToSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove("active");
        });

        setTimeout(() => {
            this.slides[index].classList.add("active");
        }, 1000);

        this.paginationBoxes.forEach(box => {
            box.classList.remove("active");
        });
        this.paginationBoxes[index].classList.add("active");

        this.rotate(this.container, this.currentDegree);
        setTimeout(() => {
            this.currentDegree = this.fixRotate(this.container, this.currentDegree);
        }, 2100);
        this.returnImageBack();

        this.contentDiv.classList.remove("fade-in");
        setTimeout(() => {
            this.contentDiv.classList.add("fade-in");
        }, 0);
    }

    fixRotate(element, degree) {
        if (this.currentDegree > 360) {
            degree = degree % 360;
            element.style.transform = `rotate(${degree}deg)`;
            console.log("Degree fixed,", degree);
        }
        return degree
    }

    rotate(element, degree) {
        this.container.style.transition = "2s";
        element.style.transform = `rotate(${degree}deg)`;
        this.currentDegree = degree;
    }

    autoRotate() {
        this.currentDegree = this.currentDegree + 90;
        this.currentDegree2 = this.currentDegree2 - 90;
        console.log(this.rotatingDivs)
        this.currentSlide = (this.currentSlide + 1) % this.rotatingDivs?.length;
        this.goToSlide(this.currentSlide);
        this.updateContentBackgroundColor(this.currentSlide);
        this.updateBackgroundColor(this.currentSlide);
        this.updateCarTitle(this.currentSlide);
    }

    returnImageBack() {
        this.images.forEach(img => {
            img.style.transform = `rotate(- ${this.currentDegree}deg)`;
            img.style.transition = "2s";
        });
    }

    pauseAuto() {
        this.stopAutoRotate();
        clearTimeout(this.pauseAutoId);
        this.pauseAutoId = setTimeout(this.startAutoRotate, 4000);
    }
}