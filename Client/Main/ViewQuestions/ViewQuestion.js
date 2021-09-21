let apiLink = "https://localhost:5001/api/";
const API_QUESTION =
  apiLink +
  "questions" +
  `/${localStorage.getItem("idQuestionsClick")}` +
  `/${localStorage.getItem("CurrentUserID")}`;
const UPDATE_VOTE_API = apiLink + "Answers/Update/Votes";
const QUESTION_DISPLAY_CONTAINER = document.getElementById("questionDisplay");
const QUESTION_DISPLAY_INLINE = document.getElementById("inline");
const ANSWER_DISPLAY_CONTAINER = document.getElementById("answer");
const UPDATE_ANSWER_VOTES_API = apiLink + "Answers/Update/Votes";
//Update/Votes/{answerID}/{userID}/{value}
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
          let srcUpVoteImage = "../../Share/Image/up-empty.png";
          let scrDownVoteImage = "../../Share/Image/down-empty.png";
          let voteID = 0;
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

          $(ANSWER_DISPLAY_CONTAINER).append(`
                        <div class="row m-2 p-2 col-12">
                            <span class="badge badge-secondary votescount"> ${
                              data.answers[index].votesCount
                            }</span>
                            <span>
                                <a  onclick="upvoteClick(${
                                  data.answers[index].answerID
                                }, ${localStorage.getItem("CurrentUserID")},1,${
            data.answers[index].currentVoteType
          }, ${voteID})" ><img src="${srcUpVoteImage}" width="24px" /></a>
                                <a href="#" onclick="downvoteClick(${
                                  data.answers[index].answerID
                                }, ${localStorage.getItem(
            "CurrentUserID"
          )},-1,${
            data.answers[index].currentVoteType
          }, ${voteID})"><img src="${scrDownVoteImage}" width="24px"/></a>
                            </span>
                            <span class="p-2" ></span>
                            ${data.answers[index].answerText}</div>`);
        }
      }
    },
  });
}

getQuestionByID();
