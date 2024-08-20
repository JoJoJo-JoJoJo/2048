export default class HomeScreen {
  #isActive;
  #theHomeScreen;
  #themeButtons;
  #playAgainButton;

  constructor(theGameBoard, themes) {
    this.themes = themes;
    this.#isActive = true;
    const documentBody = document.querySelector("body");
    this.#theHomeScreen = document.createElement("div");
    this.#theHomeScreen.classList.add("home-screen");
    this.#theHomeScreen.dataset.visible = "showing";
    documentBody.append(this.#theHomeScreen);
    const title = document.createElement("p");
    title.innerText = 2048;
    title.dataset.visible = "showing";
    this.#theHomeScreen.append(title);
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

  get themeButtons() {
    return this.#themeButtons;
  }

  get playAgainButton() {
    return this.#playAgainButton;
  }

  getHomeScreenChildren() {
    return [title, ...this.#themeButtons, this.#playAgainButton];
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
    const themeButton = document.createElement("button");
    themeButton.classList.add("theme-button");
    themeButton.classList.add("button");
    themeButton.setAttribute("type", "button");
    themeButton.dataset.visible = "showing";
    _THEME_BUTTONS.push(themeButton);
    _HOME_SCREEN.append(themeButton);
    x++;
  } while (x < 6);
  return _THEME_BUTTONS;
}

class PlayAgainButton {
  constructor(homeScreenDiv) {
    const playButton = document.createElement("button");
    playButton.classList.add("button");
    playButton.classList.add("play-button");
    playButton.setAttribute("type", "button");
    playButton.dataset.visible = "showing";
    playButton.dataset.playAgain = "";
    homeScreenDiv.append(playButton);
  }
}

class ThemeBtn {
  #theme;
  #themeButtonIndex;

  constructor(theGameBoard, themeBtnElement, index, themes) {
    this.#themeButtonIndex = index;
    this.themeBtnElement = themeBtnElement;
    themeBtnElement.setAttribute("id", `theme-button-${index + 1}`);
    themeBtnElement.style.setProperty(
      "--theme-button-bgc",
      (360 / themes) * index
    );
  }

  changeTheme() {
    theGameBoard.style.setProperty(
      "--theme-color",
      (360 / themes) * this.#themeButtonIndex
    );
  }
}
