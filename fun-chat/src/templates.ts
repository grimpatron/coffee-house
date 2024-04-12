export function generateLoginForm() {
  return `
<div class="registration__container">
  <h2 class="registration__title">User authorization</h2>
  <form class="registration__form" id="registration-form">
      <input class="registration__username" id="authorization-username" type="text" placeholder="Username" required>
      <p class="form__error-message" id="error-username"></p>
      <input class="registration__pass" id="authorization-password" type="password" placeholder="Password" required>
      <p class="form__error-message" id="error-password"></p>
      <button class="registration__submit" id="authorization-submit" type="submit">Authorization</button>
  </form>
</div>
  `;
}