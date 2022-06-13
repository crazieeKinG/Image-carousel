class Carousel {
    constructor(id, transition_time_in_second = 1, hold_time_in_second = 10, effect = "continuous") {
        this.id = id;

        this.carousel = document.querySelector(`#${id}`);
        this.container = document.querySelector(`#${id}>.carousel-container`);
        this.child_images = [...this.container.children];
        this.length = this.child_images.length;

        this.style_carousel();
        this.style_container();
        this.style_images();
        this.create_indicator_group(transition_time_in_second, hold_time_in_second, effect);
    }

    style_carousel() {
        this.carousel.style.width = "100%";
        this.carousel.style.height = "300px";
        this.carousel.style.border = "3px solid transparent";
        this.carousel.style.overflow = "hidden";
        this.carousel.style.position = "relative";
    }

    style_container() {
        this.container.style.width = `${this.length * 100}%`;
        this.container.style.display = "flex";
        this.container.style.position = "absolute";
        this.container.style.transform = "translate(0, -50%)";
        this.container.style.top = "50%";
        this.container.style.left = "0%";
    }

    style_images() {
        this.child_images.forEach((image) => {
            image.style.width = `${100 / this.length}%`;
        });
    }

    create_indicator_group(transition_time_in_second, hold_time_in_second, effect){
        new Indicator(this.carousel, this.length, transition_time_in_second, hold_time_in_second, effect);
    }
}