export function generateLoginForm() {
  return `
<div class="registration__container">
  <h2 class="registration__title">User authorization</h2>
  <form class="registration__form" id="registration-form">
    <input class="registration__username" id="authorization-username" type="text" placeholder="Username" required>
    <p class="form__error-message" id="error-username"></p>
    <input class="registration__pass" id="authorization-password" type="password" placeholder="Password" required>
    <p class="form__error-message" id="error-password"></p>
    <button class="registration__submit registration__submit--disable" id="authorization-submit" type="submit" disabled>Authorization</button>
  </form>
</div>
  `;
}


export function generateChatLayout(user_name: string) {
  return `
  <div class="container">

  <header class="header">
    <h1 class="header_title">Fun Chat</h1>
    <div class="header_user">${user_name}</div>
    <button class="header_logout btn">Log Out</button>
  </header>

  <main class="main">

    <div class="conversation_topbar">
      <div class="conversation_user"></div>
      <div class="conversation_status"></div>
    </div>

    <ul class="conversation"></ul>

    <div class="conversation_downbar">
      <textarea class="textarea" placeholder="Write a message" rows="3"></textarea>
      <button class="textarea-btn btn">Send</button>
    </div>
  </main>

  <footer class="footer">
    <div class="footer_course">
      <a href="https://rs.school/">
        <img src="./rss.svg" alt="RS School">
      </a>
    </div>
    <div class="footer_author">
      <a href="https://github.com/grimpatron">Grim Patron</a>
    </div>
    <div class="footer_year">2024</div>
  </footer>

  <aside class="aside">
    <input class="users-search" type="text" name="" id="" placeholder="Search">
    <ul class="users_list"></ul>
  </aside>
      
</div>
  `;
}


export function generateChatMessage(author: string, time: string, message: string) {
  return `
    <li class="message">
      <div class="message_info">
        <span class="message_author">${author}</span>
        <span class="message_time">${time}</span>
      </div>
      <div class="message_text">${message}</div>
    </li>
  `;
}


export function generateUser(user: string, status: string) {
  let elemOffline = ''
  let statusOffline = ''
  if (status === 'offline') elemOffline = 'users_item--offline';
  if (status === 'offline') statusOffline = 'users_item-status--offline';

  return `
    <li class="users_item ${elemOffline}">
      <div class="users_item-name">${user}</div>
      <div class="users_item-status ${statusOffline}">${status}</div>
    </li>
  `;
}