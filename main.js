import { getComments, postComment } from './api.js';
import { checkTextByNull, formattedComments } from './function.js';
import { renderComments } from './render.js';

let commentDatas = [];   
const buttonElementAdd = document.getElementById("add-form-button");
const buttonElementDelete = document.getElementById("delete-comment-button");
const listElement = document.getElementById("list");
const loading = document.getElementById("loading");
const nameInputElement = document.getElementById("name_input");
const commentInputElement = document.getElementById("comment_textarea");

fetchAndRenderComments();


function fetchAndRenderComments() {
  loading.style.display = "block";
  getComments().catch(() => {
    throw new Error("Нет подключения к сети интернет");
  })
  .then((response) => {
    if(response.status === 200){
      response.json().then((responseData) => {
        commentDatas = formattedComments(responseData);
        renderComments(commentDatas, listElement); 
        loading.style.display = "none";      
      });
    } else if(response.status === 500){
        throw new Error("500. Ошибка сервера");
    }   
  })
  .catch((error) => {
    loading.style.display = "none";
    alert(error);    
  });
}

buttonElementAdd.addEventListener("click", () => {
  if(checkTextByNull(nameInputElement.value) === false || checkTextByNull(commentInputElement.value) === false){
    nameInputElement.style.backgroundColor = "red";
    commentInputElement.style.backgroundColor = "red";
    return;
  }
  buttonElementAdd.disabled = true;
  buttonElementAdd.textContent = 'Добавление ...';
  postComment(commentInputElement.value, nameInputElement.value)
    .then(() => {
      return fetchAndRenderComments();
    })
    .then(() => {
      buttonElementAdd.disabled = false;
      buttonElementAdd.textContent = 'Написать';
      nameInputElement.value = '';
      commentInputElement.value = '';
    })
    .catch((error) => {
      buttonElementAdd.disabled = false;
      buttonElementAdd.textContent = 'Написать';
      alert(error);
    });
  renderComments(commentDatas, listElement);
});

buttonElementDelete.addEventListener("click", () => {
  commentDatas.splice(commentDatas.length - 1, 1);
  renderComments(commentDatas, listElement);
});

renderComments(commentDatas, listElement); 