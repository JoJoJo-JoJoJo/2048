export default class Tile {
  #tileElement;
  #x;
  #y;
  #value;

  constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement("div");
    this.#tileElement.classList.add("tile");
    tileContainer.append(this.#tileElement);
    this.value = value;
  }

  get value() {
    return this.#value;
  }

  set value(v) {
    this.#value = v;
    this.#tileElement.textContent = v;
    const power = Math.log2(v);
    const bgLightness = 100 - power * 9;
    this.#tileElement.style.setProperty("--bg-lightness", `${bgLightness}%`);
    this.#tileElement.style.setProperty(
      "--txt-lightness",
      `${bgLightness <= 50 ? 90 : 10}%`
    );
  }

  set x(value) {
    this.#x = value;
    this.#tileElement.style.setProperty("--x", value);
  }

  set y(value) {
    this.#y = value;
    this.#tileElement.style.setProperty("--y", value);
  }

  remove() {
    this.#tileElement.remove();
  }

  waitForTransition(animation = false) {
    return new Promise((res) => {
      this.#tileElement.addEventListener(
        animation ? "animationend" : "transitionend",
        res,
        { once: true }
      );
    }); // I used 'res' to mean resolve, there wouldn't have been a reject in this case
  }
}

//* When the constructor is first called upon a new Tile being created, the 'set' functions
//* within the class define their values with the values provided from the constructor.

//* 'set' is write-only.
//* 'get' is read-only.
