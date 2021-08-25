import { apiLink } from '../../Share/constValue.js';

const getQuestionsUrl = apiLink.value + 'questions';
var questions  = GetQuestions();
let questionsDisplay = document.getElementById("questionsDisplay");

function GetQuestions() {
   return $.ajax({
        type: "get",
        url: getQuestionsUrl ,
        data: "data",
        dataType: "json"
    });
};

function displayQuestions(){
    questions['responseJSON'].forEach(element => {
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
                    '<a href="/questions/view/'+element['questionID']+'" class="text-primary">'+element['questionName']+'</a>'+
                    '<br />'+
                '</td>' +
                '<td> by '+displayName+''+
                
                '<td> on '+element['questionDateAndTime']+''+
            '</tr>'
        )
        
    });
    if(localStorage.getItem("CurrentUserID") != null) {
        let contain = document.getElementById("tableQuestions");
        $(contain).append('<a href="" class="btn btn-primary">Add Question </a>');
        console.log(contain);
    }
}
$(document).ready(function () {
    displayQuestions();
    console.log(questions);
});
