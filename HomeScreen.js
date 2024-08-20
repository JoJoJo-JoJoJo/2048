export default class HomeScreen {
  #isActive;
  #theHomeScreen;
  #theme;
  #themeButtons;
  #playAgainButton;

  constructor(theGameBoard, themes) {
    this.#isActive = true;
    this.#theHomeScreen = document.createElement("div");
    this.#theHomeScreen.classList.add("home-screen");
    theGameBoard.append(this.#theHomeScreen);
    this.#playAgainButton = new PlayAgainButton(this.#theHomeScreen);
    this.#theme = theGameBoard.style.setProperty("--theme-color", 360 / themes);
    this.#themeButtons = createThemeButtons(this.#theHomeScreen);
  }

  get isActive() {
    return this.#isActive;
  }

  get theHomeScreen() {
    return this.#theHomeScreen;
  }

  showHomeScreen() {
    // This will just make the home screen appear and function. Will also activate animations.
    this.#isActive = true;
  }

  hideHomeScreen() {
    // This will stop the home screen from functioning, and make it disappear.
    this.#isActive = false;
  }
}

function createThemeButtons(_HOME_SCREEN) {
  const _THEME_BUTTONS = [];
  do {
    const themeButton = document.createElement("div");
    themeButton.classList.add("theme-button");
    _THEME_BUTTONS.push(themeButton);
    _HOME_SCREEN.append(themeButton);
    x++;
  } while (x < 6);
  return _THEME_BUTTONS;
}

class PlayAgainButton {
  constructor() {}
}

class ThemeBtn {
  constructor() {}
}
