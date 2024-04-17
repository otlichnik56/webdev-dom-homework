import { formattedComments } from './function.js';
import { renderComments, renderLoader } from './render.js';

let commentDatas = [];
const comentUrl = "https://wedev-api.sky.pro/api/v2/nurasyl-tyulegenov/comments";
const loginUrl = "https://wedev-api.sky.pro/api/user/login";
const regUrl = "https://wedev-api.sky.pro/api/user";

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

export let name;

export const setName = (newName) => {
  name = newName;
};


function fetchAndRenderComments() {
  renderLoader();
  //console.log("111");
  return getComments().catch(() => {
    throw new Error("Нет подключения к сети интернет");
  })
  .then((response) => {
    if(response.status === 200){
      response.json().then((responseData) => {
        commentDatas = formattedComments(responseData);
        renderComments(commentDatas);     
      });
    } else if(response.status === 500){
        throw new Error("500. Ошибка сервера");
    }   
  })
  .catch((error) => {
    alert(error);    
  });
}


function getComments() {
    return fetch(comentUrl,{
        method: "GET"
    }); 
}

function postComment(text, name) {
    return fetch(comentUrl,{
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: text.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
          name: name.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
          forceError: true
        }),
      })
        .catch(() => {
            buttonElementAdd.disabled = false;
            buttonElementAdd.textContent = 'Написать';
            throw new Error("Нет подключения к сети интернет");
        })
        .then((response) => {
          if(response.status === 201){
            return response.json();
          } else if(response.status === 400){
            throw new Error("400. Слишком короткое имя или комментарий. Введите более 2-х символов");
          } else if(response.status === 500){
            throw new Error("500. Ошибка сервера");
          }       
    }); 
}

function loginUser(loginUser, passwordUser) {
  return fetch(loginUrl,{
      method: "POST",
      body: JSON.stringify({
        login: loginUser,
        password: passwordUser
      }),
    })
      .catch(() => {
          throw new Error("Нет подключения к сети интернет");
      })
      .then((response) => {
        if(response.status === 201){          
          return response.json();
        } else if(response.status === 400){
          throw new Error("400. Не правильное имя пользователя или пароль");
        } else if(response.status === 500){
          throw new Error("500. Ошибка сервера");
        }       
  }); 
}

function regUser(loginUser, nameUser, passwordUser) {
  return fetch(regUrl,{
      method: "POST",
      body: JSON.stringify({
        login: loginUser,
        name: nameUser,
        password: passwordUser
      }),
    })
      .catch(() => {
          throw new Error("Нет подключения к сети интернет");
      })
      .then((response) => {
        if(response.status === 201){
          return response.json();          
        } else if(response.status === 400){
          throw new Error("400. Пользователь с таким логином уже сущетсвует");
        } else if(response.status === 500){
          throw new Error("500. Ошибка сервера");
        }       
  }); 
}

export { fetchAndRenderComments, getComments, postComment, loginUser, regUser };