
// !!! Мне пришлось использовать "var" вместо "const" и "let", так как gulp не хотел компелировать с ними.
// Я честно не хотел использовать "var" :-(


    ////*************************
    //// 1. FUNCTIONS FOR BUTTONS
    ////*************************

// MENU__HAMBURGER--DROPDOWN
    // icon
var close = document.getElementById("closeBtn");
var menuIcon = close.children;
var dropdown = document.getElementsByClassName("dropdown-content");

close.addEventListener("click", function(){
    for (var i = 0; i < menuIcon.length; i++){
        menuIcon[i].classList.toggle("active");
    }
});

    // dropdown content
function dropFunction() {
    document.getElementById("dropList").classList.toggle("show");
}

// Close dropdown content if detect click outside the dropdown area
window.onclick = function(event) {

    if (event.target === '.dropBtn') {

        for (var i = 0; i < dropdown.length; i++) {
            var openDropdown = dropdown[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }}};


    ////*****************************
    //// 2. FUNCTION FOR COUNT BUTTON
    ////*****************************

   var addCountWatch = (function () {
       var counter = 0;
       return function () {return counter += 1;}
   })();

    var addCountFavour = (function () {
        var counter = 0;
        return function () {return counter += 1;}
    })();

    var addCountFork = (function () {
        var counter = 0;
        return function () {return counter += 1;}
    })();

    function countWatch() {
        document.getElementById("watch").innerHTML = addCountWatch();
    }

    function countFav() {
        document.getElementById("fav").innerHTML = addCountFavour();
    }

    function countFork() {
        document.getElementById("fork").innerHTML = addCountFork();
    }