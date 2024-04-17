import { format } from "date-fns";
// import {format} from './node_modules/date-fns/format.js';
// приватные функции

const getFormatetNowDate = () => {
    let date = new Date();
    return getFormatetDate(date);
};

const getFormatetDate = (date) => {
    //let options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' };
    //let formattedDate = new Intl.DateTimeFormat('ru', options).format(date).replaceAll(",", "");
    //console.log(date);
    //const formattedDate = dateFns.format(date, 'YYYY-MM-DD hh.mm.ss');    
    const formattedDate = format(date, 'yyyy-MM-dd hh.mm.ss');
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
          date: getFormatetDate(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked
        };
      });
    return appComments;
};

export { getFormatetNowDate, getFormatetDate, getStyleLikeButton, checkTextByNull, formattedComments };