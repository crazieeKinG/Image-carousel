class Carousel {
    constructor(id, transition_time_in_second = 1, hold_time_in_second = 10, effect = "continuous") {
        this.id = id;
        this.current_index = 0;
        this.direction = -1;
        this.transition_time = transition_time_in_second
        this.hold_time = hold_time_in_second;
        this.effect = effect;

        this.carousel = document.querySelector(`#${id}`);
        this.container = document.querySelector(`#${id}>.carousel-container`);
        this.child_images = [...this.container.children];
        this.length = this.child_images.length;

        this.style_carousel();
        this.style_container();
        this.style_images();
        this.create_button();
        this.create_indicator_group();

        this.silder_id = this.automatic_slider();
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

    get_children_image() {
        this.container.style.left = `${this.current_index * -100}%`;
        this.container.style.transition = `${this.transition_time}s ease`;

        for (let single_indicator of this.indicator_group.children) {
            if (single_indicator.id != this.current_index) {
                single_indicator.style.backgroundColor = "transparent";
                single_indicator.style.width = "10px";
                single_indicator.style.height = "10px";
            }
            else {
                single_indicator.style.backgroundColor = "white";
                single_indicator.style.width = "20px";
                single_indicator.style.height = "20px";
            }

        }
    }

    create_button() {
        this.next = document.createElement("div");
        this.next.style.width = "30px";
        this.next.style.height = "30px";
        this.next.style.transform = "translate(0, -50%)";
        this.next.style.position = "absolute";
        this.next.style.top = "50%";
        this.next.style.right = "5%";
        this.next.style.zIndex = "2";
        this.next.style.content = "url('./images/svg/next.svg')";
        this.next.style.borderRadius = "50%";
        this.next.style.cursor = "pointer";

        this.previous = document.createElement("div");
        this.previous.style.width = "30px";
        this.previous.style.height = "30px";
        this.previous.style.transform = "translate(0, -50%)";
        this.previous.style.position = "absolute";
        this.previous.style.top = "50%";
        this.previous.style.left = "5%";
        this.previous.style.zIndex = "2";
        this.previous.style.content = "url('./images/svg/previous.svg')";
        this.previous.style.borderRadius = "50%";
        this.previous.style.cursor = "pointer";


        this.carousel.append(this.next);
        this.carousel.append(this.previous);



        this.next.addEventListener("click", () => {
            this.direction = -1;
            this.current_index = (this.current_index - this.direction) % this.length;
            this.get_children_image();
        });


        this.previous.addEventListener("click", () => {
            if (this.current_index === 0) this.current_index = this.length;
            this.direction = 1;
            this.current_index = (this.current_index - this.direction) % this.length;
            this.get_children_image();
        });
    }

    create_indicator(id) {
        const indicator = document.createElement("div");
        indicator.id = id;

        indicator.style.backgroundColor = this.current_index === id ? "white" : "transparent";
        indicator.style.width = this.current_index === id ? "20px" : "10px";
        indicator.style.height = this.current_index === id ? "20px" : "10px";
        indicator.style.border = "1px solid white";
        indicator.style.margin = "3px 5px";
        indicator.style.padding = "5px";
        indicator.style.borderRadius = "50%";
        indicator.style.cursor = "pointer";
        indicator.style.transition = `${this.transition_time}s ease`;

        indicator.addEventListener('click', () => {
            clearInterval(this.silder_id);

            this.current_index = parseInt(indicator.id);
            this.get_children_image();

            this.silder_id = this.automatic_slider();
        });

        return indicator;
    }

    create_indicator_group() {
        this.indicator_group = document.createElement("div");

        this.indicator_group.style.transform = "translate(-50%, -50%)";
        this.indicator_group.style.position = "absolute";
        this.indicator_group.style.top = "80%";
        this.indicator_group.style.left = "50%";
        this.indicator_group.style.zIndex = "2";
        this.indicator_group.style.display = "flex";
        this.indicator_group.style.verticalAlign = "middle";
        this.indicator_group.style.alignItems = "center";

        for (let i = 0; i < this.length; i++) {
            this.indicator_group.appendChild(this.create_indicator(i));
        }

        this.carousel.appendChild(this.indicator_group);
    }

    automatic_slider() {
        return setInterval(() => {
            if (this.effect === "alternate") {
                if (this.current_index + 1 === this.length) this.direction = 1
                else if (this.current_index === 0) this.direction = -1
            }
            else
                this.direction = -1;

            this.current_index = Math.abs(this.current_index - this.direction) % this.length;

            this.get_children_image();

        }, (this.hold_time * 1000));
    }
}