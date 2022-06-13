class Indicator {
    constructor(carousel, length, transition_time_in_second, hold_time_in_second, effect) {
        this.current_index = 0;
        this.direction = -1;

        this.carousel = carousel;
        this.container = carousel.children[0];

        this.length = length;
        this.transition_time = transition_time_in_second
        this.hold_time = hold_time_in_second;
        this.effect = effect;

        this.create_button();
        this.create_indicator_group();

        this.silder_id = this.automatic_slider();

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


        this.carousel.appendChild(this.next);
        this.carousel.appendChild(this.previous);



        this.next.addEventListener("click", () => {
            if (!this.transition_id) {
                clearInterval(this.silder_id);
                const previous_index = this.current_index;
                this.direction = -1;

                this.direction = (this.current_index + 1 === this.length) ? 1 : -1;
                this.current_index = Math.abs(this.current_index + 1) % this.length;

                this.image_transition(previous_index);

                this.silder_id = this.automatic_slider();
            }
        });


        this.previous.addEventListener("click", () => {
            if (!this.transition_id) {
                clearInterval(this.silder_id);
                const previous_index = this.current_index;
                this.direction = 1;

                this.current_index = Math.abs(this.current_index + (this.length - 1)) % this.length;
                this.direction = (this.current_index + 1 === this.length) ? -1 : 1;

                this.image_transition(previous_index);

                this.silder_id = this.automatic_slider();
            }
        });
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

        indicator.addEventListener('click', () => {
            if (!this.transition_id) {
                clearInterval(this.silder_id);

                const previous_index = this.current_index;
                this.current_index = parseInt(indicator.id);

                this.direction = (this.current_index < previous_index) ? 1 : -1;
                console.log(this.current_index, previous_index);
                this.image_transition(previous_index);

                this.silder_id = this.automatic_slider();
            }
        });

        return indicator;
    }

    image_transition(previous_index) {
        this.transition_value = 0;
        this.previous_value = parseInt(this.container.style.left);
        
        console.log(this.current_index, previous_index);
        this.transition_id = setInterval(() => {
            const transition_counter = Math.abs(this.current_index - previous_index);

            this.transition_value += this.direction * transition_counter;
            this.transform_value = this.previous_value + this.transition_value; 
            this.container.style.left = `${this.transform_value}%`;

            if (this.transition_value % (transition_counter * 100) === 0) {
                clearInterval(this.transition_id);
                this.transition_id = "";
            }
        }, this.transition_time * (1000 / 60));

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

    automatic_slider() {
        return setInterval(() => {
            const previous_index = this.current_index;
            if (this.effect === "alternate") {
                if (this.current_index + 1 === this.length) this.direction = 1
                else if (this.current_index === 0) this.direction = -1

                this.current_index = Math.abs(this.current_index - this.direction) % this.length;
            }
            else {
                this.current_index = Math.abs(this.current_index + 1) % this.length;
                this.direction = (this.current_index < previous_index) ? 1 : -1;
            }

            this.image_transition(previous_index);

        }, ((this.transition_time + this.hold_time) * 1000));
    }
}