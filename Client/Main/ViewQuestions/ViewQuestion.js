import {apiLink} from '../../Share/constValue.js'
const API_QUESTION = apiLink.value +'questions'+`/${localStorage.getItem("idQuestionsClick")}`+`/${localStorage.getItem("CurrentUserID")}`
const QUESTION_DISPLAY_CONTAINER = document.getElementById("questionDisplay");
const QUESTION_DISPLAY_INLINE = document.getElementById("inline");
function getQuestionByID(){
    console.log(API_QUESTION)
    $.ajax({
        type: "get",
        url: API_QUESTION ,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            console.log(data);
            let displayCreatedBy = "you"
            let displayCategory =data.category.categoryName;
            if(data.userID != localStorage.getItem("CurrentUserID")){
                displayCreatedBy = data.user.name
            }

            $(QUESTION_DISPLAY_CONTAINER).append(`<h3>${data.questionName}</h3>`)
            $(QUESTION_DISPLAY_INLINE).append(`
                <div class="col-sm-2"><span class="badge badge-info" id="CategorySpan">${displayCategory}</span></div>
                <div class="col-sm-2"><span class="text-info">by ${displayCreatedBy}</span></div>
                <div class="col-sm-2"><span class="text-success"> ${data.questionDateAndTime.substring(0,10)}</span></div>
                <div class="col-sm-2"><span class="badge badge-pill badge-success col-2">${data.viewsCount}</span> Views</div>`)
        }
    });
}

getQuestionByID();