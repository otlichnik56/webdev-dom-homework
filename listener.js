import { renderComments } from './render.js';

// листенер 
const initListeners = (commentDatas, listElement) => {
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
      renderComments(commentDatas, listElement);
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
  const nameInputElement = document.getElementById("name_input");
  nameInputElement.addEventListener("click", () => {
    nameInputElement.style.backgroundColor = "";
  });
  const commentInputElement = document.getElementById("comment_textarea");
  commentInputElement.addEventListener("click", () => {
    commentInputElement.style.backgroundColor = "";
  });
}

export { initListeners };