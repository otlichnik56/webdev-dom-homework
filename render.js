import { getStyleLikeButton} from './function.js';
import { initListeners, addListener, loginListener, regListener1, regListener2, loginListener1, loginListener2 } from './listener.js';
import { token, name } from './api.js';


const renderLoader = () => {  
  const appElement = document.getElementById("app"); 
  const appHtml = `  
      <div class="container">
        <div id="loading" class="loading" style="display: flex">
          <div id="loading-text" class="loading-text">Идет загрузка данных...</div>
          <div id="spinner" class="spinner"></div>
        </div>
      </div>`;
    appElement.innerHTML = appHtml;    
}  

const renderComments = (commentDatas) => {  
    const appElement = document.getElementById("app"); 
    const commentHtml = commentDatas.map((commentData, index) => {
    const likes = getStyleLikeButton(commentData.isLiked);
    return ` 
        <li class="comment" data-name="${commentData.name}" data-text="${commentData.text}">
          <div class="comment-header">
            <div>${commentData.name}</div>
            <div>${commentData.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${commentData.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${commentData.likes}</span>
              <button data-index="${index}" class="like-button${likes}"></button>
            </div>
          </div>
        </li>`
      }).join("");  
      const appHtml = `  
        <div class="container">
          <ul class="comments" id="list">${commentHtml}
          </ul>    
          <div id="add-form" class="add-form" style="display: none">
            <input
              type="text"
              class="add-form-name"
              placeholder="Введите ваше имя"
              id="name_input"
            />
            <textarea
              type="textarea"
              class="add-form-text"
              placeholder="Введите ваш коментарий"
              rows="4"
              id="comment_textarea"
            ></textarea>
            <div class="add-form-row">
              <button class="add-form-button" id="add-form-button">Написать</button>
            </div>
          </div>

          <div id="login" style="display: none">
            <p>Чтобы добавить комментарий, <a href="#" id="login-href">авторизуйтесь</a></p>
          </div>
        </div>`;
    appElement.innerHTML = appHtml;
    const nameInput = document.getElementById("name_input");
    const loginElement = document.getElementById("login");
    const addFormElement = document.getElementById("add-form");
    if (token !== undefined && token !== null){
      addFormElement.style.display = "flex"; 
      loginElement.style.display = "none";
      nameInput.value = name;
      nameInput.disabled = true;
    } else{
      addFormElement.style.display = "none"; 
      loginElement.style.display = "flex";
    }
    const loginHref = document.getElementById("login-href"); 
    loginListener(loginHref);
    initListeners(commentDatas);
    const buttonElementAdd = document.getElementById("add-form-button");
    const nameInputElement = document.getElementById("name_input");
    const commentInputElement = document.getElementById("comment_textarea"); 
    addListener(buttonElementAdd, nameInputElement, commentInputElement);
}   

const renderLogin = () => {  
  const appElement = document.getElementById("app"); 
  const appHtml = `  
  <div class="container">
    <div id="form-login" class="add-form" style="display: flex">
      <p>Форма ввода </p>
          <input
            type="text"
            class="add-form-text"
            placeholder="Введите логин"
            id="username_input1"
          />
      <input
            type="text"
            class="add-form-text"
            placeholder="Введите пароль"
        rows="4"
            id="password_input1"
          />
      <div class="form-row">
          <button class="add-form-button" id="form-button-login1">Войти</button>
      </div>
      <div class="form-row">
          <button class="add-form-button button-2" id="form-button-reg1">Зарегистрироваться</button>
      </div>
    </div>
    <div id="form-reg" class="add-form" style="display: none">
      <p>Форма регистрации </p>
          <input
            type="text"
            class="add-form-text"
            placeholder="Введите логин"
            id="username_input2"
          />
      <input
            type="text"
            class="add-form-text"
            placeholder="Введите имя"
            id="name_input2"
          />
      <input
            type="text"
            class="add-form-text"
            placeholder="Введите пароль"
            rows="4"
            id="password_input2"
          />
      <div class="form-row">
          <button class="add-form-button" id="form-button-reg2">Зарегистрироваться</button>
      </div>
      <div class="form-row">
            <button class="add-form-button button-2" id="form-button-login2">Войти</button>
      </div>
    </div>
  </div>`;
  appElement.innerHTML = appHtml;
  const buttonReg1 = document.getElementById("form-button-reg1"); 
  const buttonLogin1 = document.getElementById("form-button-login1");
  const buttonReg2 = document.getElementById("form-button-reg2");
  const buttonLogin2 = document.getElementById("form-button-login2");
  regListener1(buttonReg1);
  loginListener2(buttonLogin2);
  regListener2(buttonReg2);
  loginListener1(buttonLogin1);
}  


export { renderComments, renderLogin, renderLoader};  