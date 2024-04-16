import { renderComments, renderLogin } from './render.js';
import { fetchAndRenderComments, postComment, loginUser, regUser, setToken, setName } from './api.js';
import { checkTextByNull } from './function.js';


const loginListener = (loginHref) => {
  loginHref.addEventListener("click", () => {
    renderLogin();
  });
}

const regListener1 = (buttonReg1) => {
  buttonReg1.addEventListener("click", () => {
    const formLoginElement = document.getElementById("form-login");
    const formRegElement = document.getElementById("form-reg");
    formLoginElement.style.display = "none"; 
    formRegElement.style.display = "flex";
  });
}

const loginListener2 = (buttonLogin2) => {
  buttonLogin2.addEventListener("click", () => {
    const formLoginElement = document.getElementById("form-login");
    const formRegElement = document.getElementById("form-reg");
    formLoginElement.style.display = "flex"; 
    formRegElement.style.display = "none";
  });
}

const regListener2 = (buttonReg2) => {
  buttonReg2.addEventListener("click", () => {
    buttonReg2.disabled = true;
    const loginInput = document.getElementById("username_input2");
    const nameInput = document.getElementById("name_input2");
    const passwordInput = document.getElementById("password_input2");
    regUser(loginInput.value, nameInput.value, passwordInput.value).then((responseData) => {
      setToken(responseData.user.token);
      setName(responseData.user.name);
      buttonReg2.disabled = false;
      fetchAndRenderComments();
    }).catch((error) => {
      buttonReg2.disabled = false;
      alert(error);
    });     
  });
}

const loginListener1 = (buttonLogin1) => {
  buttonLogin1.addEventListener("click", () => {
    buttonLogin1.disabled = true;
    const loginInput = document.getElementById("username_input1");
    const passwordInput = document.getElementById("password_input1");
    loginUser(loginInput.value, passwordInput.value).then((responseData) => {
      setToken(responseData.user.token);
      setName(responseData.user.name);
      buttonLogin1.disabled = false;
      fetchAndRenderComments();
    }).catch((error) => {
      buttonLogin1.disabled = false;
      alert(error);
    }); 
    
  });
}



const initListeners = (commentDatas) => {
  const likeButtonElements = document.querySelectorAll(".like-button");
  for(const likeButtonElement of likeButtonElements){
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeButtonElement.dataset.index;
      if(commentDatas[index].isLiked === true){
        commentDatas[index].isLiked = false;
        commentDatas[index].likes -= 1;
      } else {
        commentDatas[index].isLiked = true;
        commentDatas[index].likes += 1;
      }
      renderComments(commentDatas);
      initListeners();
    });
  }
  const commentsElements = document.querySelectorAll(".comment");
  for(const commentElement of commentsElements){
    commentElement.addEventListener("click", () => {
      const comment = commentElement.dataset.text;
      const name = commentElement.dataset.name;
      commentInputElement.value = "> "  + comment + "\n" + name + ", ";
    });
  }
  /**
  const nameInputElement = document.getElementById("name_input");
  nameInputElement.addEventListener("click", () => {
    nameInputElement.style.backgroundColor = "";
  });*/
  const commentInputElement = document.getElementById("comment_textarea");
  commentInputElement.addEventListener("click", () => {
    commentInputElement.style.backgroundColor = "";
  });
}

//const buttonElementAdd = document.getElementById("add-form-button");
//const buttonElementDelete = document.getElementById("delete-comment-button");
//const nameInputElement = document.getElementById("name_input");
//const commentInputElement = document.getElementById("comment_textarea");  

const addListener = (buttonElementAdd, nameInputElement, commentInputElement) => {
  buttonElementAdd.addEventListener("click", () => {
    if(checkTextByNull(nameInputElement.value) === false || checkTextByNull(commentInputElement.value) === false){
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
    renderComments(commentDatas);
  });
}




export { initListeners, addListener, loginListener, regListener1, regListener2, loginListener1, loginListener2 };