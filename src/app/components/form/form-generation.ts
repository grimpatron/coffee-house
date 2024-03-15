export function generateLoginForm() {
  return `
  <div class="login__container">
      <form class="login__form">
          <h2 class="login__title">Login to account</h2>

          <div class="form__group">
              <label class="form__label" for="first-name">First Name:</label>
              <input class="form__input" type="text" id="first-name" name="first-name" required/>
              <p class="form__error-message" id="error-first-name"></p>
          </div>

          <div class="form__group">
              <label class="form__label" for="surname">Surname:</label>
              <input class="form__input" type="text" id="surname" name="surname" required/>
              <p class="form__error-message" id="error-surname"></p>
          </div>

          <button class="btn form__btn" id="log-in">Log in</button>
      </form>
  </div>
  `;
}