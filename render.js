import { getStyleLikeButton} from './function.js';
import { initListeners} from './listener.js';

// рендер функция
const renderComments = (commentDatas, listElement) => {   
    const commentHtml = commentDatas.map((commentData, index) => {
      const likes = getStyleLikeButton(commentData.isLiked);
      return `<li class="comment" data-name="${commentData.name}" data-text="${commentData.text}">
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
      listElement.innerHTML = commentHtml;
      initListeners(commentDatas, listElement);
}   

export { renderComments };  