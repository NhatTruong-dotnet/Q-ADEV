//#region declare 
let apiLink = "https://localhost:5001/api/";
let isSubmited =  false;
const API_QUESTION =
  apiLink +
  "questions" +
  `/${localStorage.getItem("idQuestionsClick")}` +
  `/${localStorage.getItem("CurrentUserID")}`;
const ANSWER_API = apiLink+'answers';
const UPDATE_VOTE_API = apiLink + "Answers/Update/Votes";
const QUESTION_DISPLAY_CONTAINER = document.getElementById("questionDisplay");
const QUESTION_DISPLAY_INLINE = document.getElementById("inline");
const ANSWER_DISPLAY_CONTAINER = document.getElementById("answer");
const UPDATE_ANSWER_VOTES_API = apiLink + "Answers/Update/Votes";
const ADD_ANSWER_CONTAINER = document.getElementById("AddNewAnswer");
//#endregion

//#region upvote-downvote function
function updateVoteValue(answerID, userID , voteValue,currentVoteType) {
  $.ajax({
    type: "post",
    url: UPDATE_VOTE_API + `/${answerID}` + `/${userID}` + `/${voteValue}`+ `/${currentVoteType}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
  }).done(window.location.href= './ViewQuestions.html');
}

function upvoteClick(answerID, userID, voteValue, currentVoteType, voteID) {
  if (currentVoteType == 0 && voteID == 0) {
    updateVoteValue(answerID, userID, voteValue, currentVoteType);
  } else if (currentVoteType == 1 && voteID != 0) {
    updateVoteValue(answerID, userID, 0, currentVoteType);
  } else if (currentVoteType == 0 || currentVoteType == -1 && voteID != 0) {
    updateVoteValue(answerID, userID, 1, currentVoteType);
  }
}

function downvoteClick(answerID, userID, voteValue, currentVoteType, voteID) {
  if (currentVoteType == 0 && voteID == 0) {
    updateVoteValue(answerID, userID, voteValue, currentVoteType);
  } else if (currentVoteType == -1 && voteID != 0) {
    updateVoteValue(answerID, userID, 0, currentVoteType);
  } else if (currentVoteType == 0 ||currentVoteType == 1 && voteID != 0) {
    updateVoteValue(answerID, userID, -1, currentVoteType);
  }
}
//#endregion

//#region handle display question and answer
function getQuestionByID() {
  console.log(API_QUESTION);
  $.ajax({
    type: "get",
    url: API_QUESTION,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      console.log(data);
      let displayCreatedBy = "you";
      let displayCategory = data.category.categoryName;
      if (data.userID != localStorage.getItem("CurrentUserID")) {
        displayCreatedBy = data.user.name;
      }
      
      $(QUESTION_DISPLAY_CONTAINER).append(`<h3>${data.questionName}</h3>`);
      $(QUESTION_DISPLAY_INLINE).append(`
                <div class="col-sm-2"><span class="badge badge-info" id="CategorySpan">${displayCategory}</span></div>
                <div class="col-sm-2"><span class="text-info">by ${displayCreatedBy}</span></div>
                <div class="col-sm-2"><span class="text-success"> ${data.questionDateAndTime.substring(
                  0,
                  10
                )}</span></div>
                <div class="col-sm-2"><span class="badge badge-pill badge-success col-2">${
                  data.viewsCount
                }</span> Views</div>`);
      if (data.answers.length == 0) {
        $(ANSWER_DISPLAY_CONTAINER).append(`<h4>No answer yet</h4>`);
      } else {
        for (let index = 0; index < data.answers.length; index++) {
          let answerBy ="you";
          let srcUpVoteImage = "../../Share/Image/up-empty.png";
          let scrDownVoteImage = "../../Share/Image/down-empty.png";
          let voteID = 0;
          let displayEditAndDelete = ""
          if (data.answers[index].user.userID != localStorage.getItem("CurrentUserID")) {
            answerBy = data.answers[index].user.name;
          }
          if(data.answers[index].userID == localStorage.getItem("CurrentUserID")){
            document.getElementById("btnAddNewAnswer").innerText = "Add another answer"
          }
          if (data.answers[index].currentVoteType == 1) {
            srcUpVoteImage = "../../Share/Image/up-color.png";
          }
          if (data.answers[index].currentVoteType == -1) {
            scrDownVoteImage = "../../Share/Image/down-color.png";
          }
          for (let i = 0; i < data.answers[index].votes.length; i++) {
            if (
              data.answers[index].votes[i].userID ==
              localStorage.getItem("CurrentUserID")
            ) {
              voteID = data.answers[index].votes[i].voteID;
            }
          }
          if(data.answers[index].userID == localStorage.getItem("CurrentUserID")){
            displayEditAndDelete = ` <span>
            <a href="#" onclick="addNewAnswer(${data.answers[index].answerID})">
              <img src="../../Share/Image/edit-icon.png" width="24px"/>
            </a>
            <a href="#" onclick="deleteAns(${data.answers[index].answerID})">
              <img src="../../Share/Image/delete-icon.png" width="24px"/>
            </a>
          </span>`
          }
          $(ANSWER_DISPLAY_CONTAINER).append(`
                        <div class="row m-4 p-2 col-12">
                            <span class="badge badge-secondary votescount"> ${
                              data.answers[index].votesCount
                            }</span>
                            <span>
                                <a href="#" onclick="upvoteClick(${data.answers[index].answerID}, ${localStorage.getItem("CurrentUserID")},1,${data.answers[index].currentVoteType }, ${voteID})" >
                                  <img src="${srcUpVoteImage}" width="24px" />
                                </a>
                                <a href="#" onclick="downvoteClick(${ data.answers[index].answerID}, ${localStorage.getItem("CurrentUserID")},-1,${data.answers[index].currentVoteType}, ${voteID})">
                                  <img src="${scrDownVoteImage}" width="24px"/>
                                </a>
                            </span>
                              <span class="p-2" ></span>
                              <span class="col-6">${data.answers[index].answerText}</span>
                              <div class="col-sm-2"><span class="text-info">by ${answerBy}</span></div>
                              <div class="col-sm-2"><span class="text-success"> ${data.questionDateAndTime.substring( 0,10)}</span></div>
                                ${displayEditAndDelete}
                              </div>`
          );
          
        }
        
      }
    },
  });
}
//#endregion

//#region add or edit answer
function addNewAnswer(answerID){
  if (answerID == 0) {
    document.getElementById("AddNewAnswer").removeAttribute("hidden");
    document.getElementById("AddNewAnswer").style.visibility = "visibility"
    document.getElementById("btnAddNewAnswer").style.visibility = "hidden"
    document.getElementById("answerText").value = ""

  }else{
    document.getElementById("AddNewAnswer").removeAttribute("hidden");
    document.getElementById("AddNewAnswer").style.visibility = "visibility"
    $.ajax({
      type: "get",
      url: ANSWER_API+`/${answerID}`,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function(data){
        document.getElementById("answerText").value = data.answerText
      }
    })
    document.getElementById("btnAddNewAnswer").style.visibility = "hidden"
    document.getElementById("PostAns").removeAttribute("onclick")
    document.getElementById("PostAns").addEventListener("click",()=>{
      post(answerID)
    })
  }
  
}

function cancelPostAnswer(){
  document.getElementById("AddNewAnswer").removeAttribute("style");
  document.getElementById("AddNewAnswer").setAttribute("hidden","hidden")
  document.getElementById("btnAddNewAnswer").removeAttribute("style");
  document.getElementById("btnAddNewAnswer").style.visibility = "visibility"
}

function post(answerID){
  isSubmited = true;
  console.log(localStorage.getItem("CurrentUserID"))
  let urlCall = ANSWER_API
  if(document.getElementById("answerText").value == ""){
    console.log("eror");
    document.getElementById("answerErrorMessage").innerText = "Should not blank";
    document.getElementById("answerErrorMessage").classList.remove("text-muted");
    document.getElementById("answerErrorMessage").classList.add("invalid");
    document.getElementById("answerText").classList.add("invalid");
  }else{
  if (answerID == 0  ) {
    urlCall = ANSWER_API+'/add';
    dataPost=JSON.stringify({
      AnswerText: document.getElementById("answerText").value,
      AnswerDateAndTime : (new Date().toISOString()),
      QuestionId : parseInt(localStorage.getItem("idQuestionsClick")),
      UserId : parseInt(localStorage.getItem("CurrentUserID")),
      VotesCount : 0
    })
  }
  else{
    urlCall = ANSWER_API+'/update';
    dataPost=JSON.stringify({
      AnswerText: document.getElementById("answerText").value,
      AnswerDateAndTime : (new Date().toISOString()),
      QuestionId : parseInt(localStorage.getItem("idQuestionsClick")),
      UserId : parseInt(localStorage.getItem("CurrentUserID")),
      VotesCount : 0,
      AnswerID: answerID
    })
  }
    $.ajax({
      type: "post",
      url: urlCall,
      data:dataPost,
      dataType: "json",
      contentType: "application/json; charset=utf-8"
      
    }).done(window.location.href= './ViewQuestions.html')
  }
}
document.getElementById("answerText").addEventListener("change",()=>{
  if (isSubmited && document.getElementById("answerText").value) {
      document.getElementById("answerErrorMessage").innerText = "Thanks for your help";
      document.getElementById("answerErrorMessage").classList.add("text-muted");
      document.getElementById("answerErrorMessage").classList.remove("invalid");
      document.getElementById("answerText").classList.remove("invalid");
  }else if(isSubmited && document.getElementById("questionText").value == ""){
      document.getElementById("answerErrorMessage").innerText = "Should not blank";
      document.getElementById("answerErrorMessage").classList.remove("text-muted");
      document.getElementById("answerErrorMessage").classList.add("invalid");
      document.getElementById("answerText").classList.add("invalid");
  }
})
function deleteAns(answerID){
  $.ajax({
    type: "post",
    url: ANSWER_API+'/delete',
    data:JSON.stringify({
      AnswerText: document.getElementById("answerText").value,
      AnswerDateAndTime : (new Date().toISOString()),
      QuestionId : parseInt(localStorage.getItem("idQuestionsClick")),
      UserId : parseInt(localStorage.getItem("CurrentUserID")),
      VotesCount : 0,
      AnswerID: answerID
    }),
    dataType: "json",
    contentType: "application/json; charset=utf-8"
    
  }).done(window.location.href= './ViewQuestions.html')
}
//#endregion
getQuestionByID();
