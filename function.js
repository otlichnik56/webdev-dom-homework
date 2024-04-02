// приватные функции

const getFormatetNowDate = () => {
    let date = new Date();
    return getFormatetDate(date);
};

const getFormatetDate = (date) => {
    let options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' };
    let formattedDate = new Intl.DateTimeFormat('ru', options).format(date).replaceAll(",", "");
    return formattedDate;
};

const getStyleLikeButton = (likeStatus) => {
    if(likeStatus === false){
      return "";
    } else {
      return " -active-like";
    }
};

const checkTextByNull = (text) => {
    if(text === "" || text.replaceAll(" ", "") === ""){
      return false;
    } else {
      return true;
    }
};

const formattedComments = (responseData) => {
  const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: getFormatetDate(new Date(comment.date)),
          text: comment.text,
          likes: comment.likes,
          isLiked: false
        };
      });
    return appComments;
};

export { getFormatetNowDate, getFormatetDate, getStyleLikeButton, checkTextByNull, formattedComments };