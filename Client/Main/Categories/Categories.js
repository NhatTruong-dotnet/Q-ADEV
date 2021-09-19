import { apiLink } from "../../Share/constValue.js";

const CATEGORIES_CONTAINER = document.getElementById("displayCategories");
const GET_CATEGORIES_URL = apiLink.value + "categories";

function displayCategories(){
    $.ajax({
        type: "get",
        url: GET_CATEGORIES_URL ,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
           for (let index = 0; index < data.length; index++) {
               $(CATEGORIES_CONTAINER).append('<li class="list-group-item list-group-item-action" ' +`value=${data[index].categoryID}>` +data[index].categoryName+'</li>');
           }
        }
    })
}
displayCategories();