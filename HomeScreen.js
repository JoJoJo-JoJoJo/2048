export default class HomeScreen {
  #isActive;
  #theHomeScreen;
  #themeButtons;
  #playAgainButton;

  constructor(theGameBoard, themes) {
    this.themes = themes;
    this.#isActive = true;
    this.#theHomeScreen = document.createElement("div");
    this.#theHomeScreen.classList.add("home-screen");
    theGameBoard.append(this.#theHomeScreen);
    theGameBoard.style.setProperty("--theme-color", 180);
    this.#playAgainButton = new PlayAgainButton(this.#theHomeScreen);
    this.#themeButtons = createThemeButtons(this.#theHomeScreen).map(
      (themeBtnElement, index) => {
        return new ThemeBtn(theGameBoard, themeBtnElement, index, themes);
      }
    );
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
  let x = 0;
  do {
    const themeButton = document.createElement("div");
    themeButton.classList.add("theme-button");
    themeButton.classList.add("button");
    _THEME_BUTTONS.push(themeButton);
    _HOME_SCREEN.append(themeButton);
    x++;
  } while (x < 6);
  return _THEME_BUTTONS;
}

class PlayAgainButton {
  constructor(homeScreenDiv) {
    const playButton = document.createElement("div");
    playButton.classList.add("button");
    playButton.classList.add("play-button");
    playButton.dataset.playAgain = "";
    homeScreenDiv.append(playButton);
  }
}

class ThemeBtn {
  #theme
  #themeButtonIndex

  constructor(theGameBoard, themeBtnElement, index, themes) {
    this.#themeButtonIndex = index;
    this.themeBtnElement = themeBtnElement;
  }

  changeTheme() {
    theGameBoard.style.setProperty("--theme-color", (360 / themes) * this.#themeButtonIndex);
  }
}
