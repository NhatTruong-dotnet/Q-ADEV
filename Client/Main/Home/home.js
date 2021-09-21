let apiLink ="https://localhost:5001/api/";

const NAVIGATE_VIEW_QUESTION = "http://127.0.0.1:5500/Client/Main/ViewQuestions/ViewQuestions.html";
const GET_QUESTIONS = apiLink + 'questions';
const UPDATE_VIEWS_COUNT = apiLink + 'questions/votes/view/';

let questionsDisplay = document.getElementById("questionsDisplay");

function  GetQuestions() {
   return $.ajax({
        type: "get",
        url: GET_QUESTIONS ,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            displayQuestions(data);
        }
    });
};
function clickQuestions(idQuestions){
    $.ajax({
        type: "post",
        url: UPDATE_VIEWS_COUNT+`${idQuestions}/`+"1" ,
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    }).done(
        localStorage.setItem("idQuestionsClick", idQuestions),
        window.location.href = NAVIGATE_VIEW_QUESTION
    );

}
function displayQuestions(questions){
    console.log(questions)
    questions.forEach(element => {
        let displayName ="";
         if(localStorage.getItem("CurrentUserID") == element['userID']) {
            displayName = 'you'
        }else{
            displayName = element['user']['name']
        }
        $(questionsDisplay).append(
            '<tr>'+
                '<td><span class="badge badge-secondary">'+element['votesCount']+'</span> Votes</td>'+
                '<td><span class="badge badge-secondary">'+element['answersCount']+'</span> Answers</td>'+
                '<td><span class="badge badge-secondary">'+element['viewsCount']+'</span> Views</td>'+
                '<td class="text-dark">'+
                    '<a '+`value=${element['questionID']}`+' class="text-primary" onclick='+`"clickQuestions(${element["questionID"]})">`+element['questionName']+'</a>'+
                    '<br />'+
                    `<span class="badge badge-info" id="CategorySpan">${element.category.categoryName}</span>`+
                '</td>' +
                '<td> by '+displayName+''+
                
                '<td> on '+element['questionDateAndTime']+''+
            '</tr>'
        )
        
    });
    if(localStorage.getItem("CurrentUserID") != null) {
        let contain = document.getElementById("tableQuestions");
        $(contain).append('<a href="./../Questions/NewQuestion.html" class="btn btn-primary">Add Question </a>');
        console.log(contain);
    }
}

$(document).ready(function () {
    GetQuestions();
});
