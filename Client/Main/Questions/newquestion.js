const CATEGORY_PIKCER = document.getElementById("categoryPicker");
let apiLink ="https://localhost:5001/api/";
let isSubmited = false;
const BTN_POST_QUESTION = document.getElementById("btnPostNewQuestion")
const GET_CATEGORIES = apiLink +'categories'
const ADD_QUESTION = apiLink +'questions/add'
function getValueForCategoryPicker(){
    $.ajax({
        type: "get",
        url: GET_CATEGORIES ,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            console.log(data)
           for (let index = 0; index < data.length; index++) {
               console.log(data[index].categoryName)
                $(CATEGORY_PIKCER).append(`<option value="${data[index].categoryID}">${data[index].categoryName}</option>`)               
           }
        }
    })
}
BTN_POST_QUESTION.addEventListener("click",validate)
function validate(){
    isSubmited = true;
    if(document.getElementById("questionText").value){
        postQuestion(document.getElementById("questionText").value)
    }else{
        document.getElementById("questionErrorMessage").innerText = "Should not blank";
        document.getElementById("questionErrorMessage").classList.remove("text-muted");
        document.getElementById("questionErrorMessage").classList.add("invalid");
        document.getElementById("questionText").classList.add("invalid");
    }
}
function postQuestion(questionText){
    $.ajax({
        type: "post",
        url: ADD_QUESTION ,
        data: JSON.stringify({
            QuestionName: document.getElementById("questionText").value,
            QuestionDateAndTime : (new Date().toISOString()),
            UserID : parseInt(localStorage.getItem("CurrentUserID")),
            CategoryID : parseInt(CATEGORY_PIKCER.value),
            VotesCount : 0,
            AnswersCount : 0,
            ViewsCount : 0,
          }),
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    }).done(
        window.location.href = 'http://127.0.0.1:5500/Client/Main/Questions/QuestionsIndex.html'
    )
}
document.getElementById("questionText").addEventListener("change",()=>{
    if (isSubmited && document.getElementById("questionText").value) {
        document.getElementById("questionErrorMessage").innerText = "Don't be shy to share your question";
        document.getElementById("questionErrorMessage").classList.add("text-muted");
        document.getElementById("questionErrorMessage").classList.remove("invalid");
        document.getElementById("questionText").classList.remove("invalid");
    }else if(isSubmited && document.getElementById("questionText").value == ""){
        document.getElementById("questionErrorMessage").innerText = "Should not blank";
        document.getElementById("questionErrorMessage").classList.remove("text-muted");
        document.getElementById("questionErrorMessage").classList.add("invalid");
        document.getElementById("questionText").classList.add("invalid");
    }
})
getValueForCategoryPicker();