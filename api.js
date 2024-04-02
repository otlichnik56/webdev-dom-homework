function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/nurasyl-tyulegenov/comments",{
        method: "GET"
    }); 
}

function postComment(text, name) {
    return fetch("https://wedev-api.sky.pro/api/v1/nurasyl-tyulegenov/comments",{
        method: "POST",
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

export { getComments, postComment };