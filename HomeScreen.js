export default class HomeScreen {
  #theHomeScreen;
  #themeButtons;
  #playAgainButton;
  #theme;

  constructor(theGameBoard, themes) {
    const documentBody = document.querySelector("body");
    this.#theHomeScreen = document.createElement("div");
    this.#theHomeScreen.classList.add("home-screen");
    this.#theHomeScreen.style.setProperty("--theme-color", 120);
    documentBody.append(this.#theHomeScreen);
    const title = document.createElement("p");
    title.innerText = 2048;
    this.title = title;
    this.#theHomeScreen.append(title);
    theGameBoard.style.setProperty("--theme-color", 120);
    this.#playAgainButton = new PlayAgainButton(this.#theHomeScreen);
    this.#themeButtons = createThemeButtons(this.#theHomeScreen).map(
      (themeBtnElement, index) => {
        return new ThemeBtn(theGameBoard, themeBtnElement, index, themes, this.#theHomeScreen);
      }
    );
  }

  get theHomeScreen() {
    return this.#theHomeScreen;
  }

  get themeButtons() {
    return this.#themeButtons;
  }

  get theme() {
    return this.#theme;
  }

  set theme(value) {
    this.#theHomeScreen.style.setProperty("--theme-color", value);
    theGameBoard.style.setProperty("--theme-color", value);
  }

  changeHomeScreenText(winLoseMsg) {
    this.title.innerText = winLoseMsg;
  }
}

function createThemeButtons(_HOME_SCREEN) {
  const _THEME_BUTTONS = [];
  let x = 0;
  do {
    const themeButton = document.createElement("button");
    themeButton.classList.add("button", "theme-button");
    themeButton.setAttribute("type", "button");
    _THEME_BUTTONS.push(themeButton);
    _HOME_SCREEN.append(themeButton);
    x++;
  } while (x < 6);
  return _THEME_BUTTONS;
}

class PlayAgainButton {
  constructor(homeScreenDiv) {
    const playButton = document.createElement("button");
    playButton.classList.add("button", "play-button");
    playButton.setAttribute("type", "button");
    playButton.dataset.playAgain = "";
    playButton.innerText = "PLAY";
    homeScreenDiv.append(playButton);
  }
}

class ThemeBtn {
  #currentTheme;

  constructor(theGameBoard, themeBtnElement, index, themes, _HOME_SCREEN) {
    this._HOME_SCREEN = _HOME_SCREEN;
    this.theGameBoard = theGameBoard;
    this.#currentTheme = (360 / themes) * index;
    this.themeBtnElement = themeBtnElement;
    themeBtnElement.setAttribute("id", `theme-button-${index + 1}`);
    themeBtnElement.innerText = `Theme ${index + 1}`;
    themeBtnElement.style.setProperty("--theme-button-bgc", this.#currentTheme);
  }

  changeTheme() {
    this.theGameBoard.style.setProperty("--theme-color", this.#currentTheme);
    this._HOME_SCREEN.style.setProperty("--theme-color", this.#currentTheme);
  }
}
