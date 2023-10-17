const toDOItems = document.getElementsByClassName("to-do-items")[0];
const input = document.getElementById("input");
const trashIcon = document.getElementById("trash");
const btn = document.getElementById( "btn" );
var d = new Date();
// Load saved items from local session
window.addEventListener("load", function () {
  const savedItems = JSON.parse( localStorage.getItem( "toDoItems" ) ) || [];
  savedItems.forEach(function (item) {
    addItem(item);
  });
});

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter" ) {
    if (input.value.trim() !== "") {
      addItem();
    }
  }
} );

btn.addEventListener("click", function () {
  if (input.value.trim() !== "") {
    addItem();
  }
});

function addItem(item) {
  var divParent = document.createElement("div");
  var divChild = document.createElement("div");
  var checkIcon = document.createElement("i");
  var trashIcon = document.createElement( "i" );
  var updateIcon = document.createElement("i");
  var date = document.createElement( "h4" );
  date.innerHTML = d.toLocaleString();

  divParent.className = "item";
  divParent.innerHTML = "<div>" + ( item || input.value )+"</div>";

  checkIcon.className = "fas fa-check-square";

//checkIcon
checkIcon.addEventListener("click", function () {
  const itemText = divParent.firstChild;
  itemText.style.textDecoration = itemText.style.textDecoration ? "" : "line-through";
  if ( itemText.style.textDecoration == "line-through" ) {
    updateIcon.disabled=true;
  }
  checkIcon.style.color = itemText.style.textDecoration === "line-through" ? "green" : "darkgray";
  saveItems();
});

  //Trash Icon
  trashIcon.className = "fas fa-trash";
  trashIcon.style.color = "darkgray";
  trashIcon.addEventListener( "click", function () {
    divParent.remove();
    saveItems();
  });

  //updateIcon
  updateIcon.className = "fas fa-pen-square";
  updateIcon.style.color = "darkgray";
  updateIcon.addEventListener( "click", function () {
     var inputbar = document.createElement("input");
    var ok = document.createElement( "button" );
    inputbar.id = "search";
    ok.className = "a-1";
    ok.innerHTML = "ok";
    divChild.appendChild( inputbar );
    divChild.appendChild( ok );

    inputbar.addEventListener( "keydown", function(event){
      if (event.key === "Enter") {
        if (inputbar.value.trim() !== "") {
           divParent.firstChild.innerHTML = inputbar.value;
           divChild.lastChild.remove();
           divChild.removeChild(inputbar);
        }
      }
    } )
    
    ok.addEventListener( "click", function () {
      if (inputbar.value != "") {
        divParent.firstChild.innerHTML = inputbar.value;
        divChild.lastChild.remove();
        divChild.removeChild( inputbar );
      }
    } )
    
    saveItems();
  } );

  divChild.appendChild( date );

  divChild.appendChild( checkIcon );

  divChild.appendChild( trashIcon );
  
  divChild.appendChild(updateIcon);

  divParent.appendChild(divChild);

  divParent.firstChild.style.overflow = "auto";
  divParent.firstChild.style.whiteSpace = "nowrap";
  divParent.firstChild.className = "scrollBar-hidden";

  toDOItems.appendChild( divParent );
  input.value = "";

  saveItems();
}

function saveItems() {
  const items = Array.from(toDOItems.getElementsByClassName("item")).map(
    function (item) {
      return item.firstChild.textContent;
    }
  );

  localStorage.setItem("toDoItems", JSON.stringify(items));
}

