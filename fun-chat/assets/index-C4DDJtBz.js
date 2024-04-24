(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();function p(){return`
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
  `}function g(e){return`
  <div class="container">

  <header class="header">
    <h1 class="header_title">Fun Chat</h1>
    <div class="header_user">${e}</div>
    <button class="header_logout btn" id="logout">Log Out</button>
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
    <ul class="users_list" id="user-list"></ul>
  </aside>
      
</div>
  `}function y(e,s){const t=document.querySelector("#user-list");let o="online",r="",a="";s===!1&&(o="offline",r="users_item--offline",a="users_item-status--offline");const n=document.createElement("li");n.className=`users_item ${r}`,n.innerHTML=`
    <div class="users_item-name">${e}</div>
    <div class="users_item-status ${a}">${o}</div>
  `,t==null||t.appendChild(n)}function h(e){e.preventDefault();const s=document.querySelector("#authorization-username"),t=document.querySelector("#error-username"),o=/^[A-Z][a-z-]{2,}$/;t.innerHTML="",s.classList.remove("form__input--error"),o.test(s.value)||(s.classList.add("form__input--error"),t.innerHTML="The name must begin with a capital letter and be at least 3 characters long."),u()}function v(e){e.preventDefault();const s=document.querySelector("#authorization-password"),t=document.querySelector("#error-password"),o=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,}$/;t.innerHTML="",s.classList.remove("form__input--error"),o.test(s.value)||(s.classList.add("form__input--error"),t.innerHTML="The password must be at least 6 characters and must contain lowercase and uppercase Latin letters, and numbers."),u()}function u(){const e=document.querySelector("#authorization-submit");let s=2;const t=document.querySelector("#authorization-username"),o=document.querySelector("#authorization-password"),r=/^[A-Z][a-z-]{2,}$/,a=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,}$/;r.test(t.value)||(s-=1),a.test(o.value)||(s-=1),s==2?(e==null||e.classList.remove("registration__submit--disable"),e==null||e.removeAttribute("disabled")):(e==null||e.classList.add("registration__submit--disable"),e==null||e.setAttribute("disabled","disabled"))}function _(e,s){return{userName:e,userPassword:s}}function S(e,s){const t=_(e,s);localStorage.setItem("fun-chat-user",JSON.stringify(t))}function L(){const e=localStorage.getItem("fun-chat-user");if(e!==null)return JSON.parse(e)}function l(e,s,t){if(e.readyState===WebSocket.OPEN){const o={id:Date.now().toString(),type:"USER_LOGIN",payload:{user:{login:s,password:t}}};e.send(JSON.stringify(o)),c(e),O(e),U(e)}else setTimeout(()=>l(e,s,t),1e3)}function b(e,s,t){const o={id:Date.now().toString(),type:"USER_LOGOUT",payload:{user:{login:s,password:t}}};e.send(JSON.stringify(o)),c(e)}function c(e){e.onmessage=function(s){const t=JSON.parse(s.data);t.type==="ERROR"?console.error(t.payload.error):t.type==="USER_LOGIN"?console.log(`User ${t.payload.user.login} login status: ${t.payload.user.isLogined}`):t.type==="USER_LOGOUT"&&console.log(`User ${t.payload.user.login} login status: ${t.payload.user.isLogined}`)}}function O(e){d(e,"USER_ACTIVE")}function U(e){d(e,"USER_INACTIVE")}function d(e,s){const t={id:Date.now().toString(),type:s,payload:null};e.send(JSON.stringify(t)),w(e)}function w(e){e.onmessage=function(s){const t=JSON.parse(s.data);t.type==="ERROR"?console.error(t.payload.error):t.type==="USER_EXTERNAL_LOGIN"?console.log(`User ${t.payload.user.login} login status: ${t.payload.user.isLogined}`):t.type==="USER_EXTERNAL_LOGOUT"?console.log(`User ${t.payload.user.login} login status: ${t.payload.user.isLogined}`):t.type==="USER_ACTIVE"?(console.log(`Active users: ${t.payload.users.length}`),i(t.payload.users)):t.type==="USER_INACTIVE"&&(console.log(`Inactive users: ${t.payload.users.length}`),i(t.payload.users))}}function i(e){e.forEach(s=>{y(s.login,s.isLogined)})}const f=new WebSocket("ws://localhost:4000");function m(){document.querySelector("body").innerHTML=p(),document.querySelector("#authorization-username").addEventListener("input",h),document.querySelector("#authorization-password").addEventListener("input",v),document.querySelector("#authorization-submit").addEventListener("click",E)}m();function E(e){e.preventDefault();const s=document.querySelector("#authorization-submit");if(!(s!=null&&s.hasAttribute("disabled"))){const t=document.querySelector("#authorization-username").value,o=document.querySelector("#authorization-password").value;l(f,t,o),S(t,o),document.querySelector("body").innerHTML=g(t),document.querySelector("#logout").addEventListener("click",N)}}function N(){const e=L(),s=e.userName,t=e.userPassword;b(f,s,t),m(),localStorage.clear()}
