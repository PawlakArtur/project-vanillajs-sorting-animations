$(document).ready(function() {
    deactivationRadioButtons(true);
    deactivationStartButtons(true);
    insertElements();
    changeElements(8);
    changeQuantity(6);
    addEvents();

    //funckja dezaktywujaca radio buttony
    function deactivationRadioButtons(arg){
        var radio = document.getElementsByName("sort");
        if(arg){
            for(var i = 0; i < radio.length; i++){
                radio[i].setAttribute("disabled", "disabled");
            }
        }else {
            for(var i = 0; i < radio.length; i++){
                radio[i].removeAttribute('disabled');
            }
        }
    }

    //funkcja dezaktywujaca start buttony
    function deactivationStartButtons(arg){
        var start = document.getElementsByClassName("start-button");
        if(arg){
            for(var i = 0; i < start.length; i++){
                start[i].setAttribute("disabled", "disabled");
            }
        }else {
            for(var i = 0; i < start.length; i++){
                start[i].removeAttribute('disabled');
            }
        }
    }

    //funkcja dezaktywujaca random button
    function deactiveRandomButton(arg){
        var rand = document.getElementById("random");
        if(arg){
            rand.setAttribute("disabled", "disabled");
        }else {
            rand.removeAttribute('disabled');
        }
    }

    //funkcja dodajaca do pola elementy z liczbami
    function insertElements(){
        var top = 30;
        for(var i = 1; i < 15; i++){
            var element = document.createElement("div");
            var field = document.getElementById("comparasion");
            element.setAttribute("class", "elements");
            element.setAttribute("id", "number" + i);
            element.style.top = top + "px";
            element.innerText = i;
            field.appendChild(element);
            top += 60;
        }
    }

    //funkcja zmieniajaca ilosc elementow elementy z liczbami
    function changeElements(arg){
        var element = document.getElementsByClassName("elements");
        for(var i = 0; i < arg; i++){
            var index = element.length - 1 - i;
            element[index].style.display = "none";
        }
        for(var i = 0; i < 14 - arg; i++){
            element[i].style.display = "inline-block";
        }
    }

    //zmiana wartosci ze slidera
    function changeQuantity(quantity){
        var quantityDiv = document.getElementById("quantity-JS");
        quantityDiv.innerHTML = quantity;
    }

    //dodawanie losowych liczb do elementow
    function randomElements(arg){
        var element = document.getElementsByClassName("elements");
        for(var i = 0; i < arg; i++){
            element[i].innerText = Math.floor((Math.random() * 10) + 1);
        }
    }

    //dodawanie eventow do elementow
    function addEvents(){
        var slider = document.getElementById("slider");
        //event on slider for IE
        slider.addEventListener("change", function(){
            changeQuantity(slider.value);
            changeElements(14 - slider.value);
            deactivationRadioButtons(true);
            deactiveRandomButton(false);
        });
        //event on slider for Chrome, FF, Opera
        slider.addEventListener("input", function(){
            changeQuantity(slider.value);
            changeElements(14 - slider.value);
            deactivationRadioButtons(true);
            deactiveRandomButton(false);
        });
        var random = document.getElementById("random");
        //event on random button
        random.addEventListener("click", function(){
            randomElements(slider.value);
            deactivationRadioButtons(false);
        });
        var radio = document.getElementsByName("sort");
        //events for radio buttons
        for(var i = 0; i < radio.length; i++){
            (function(e){
                radio[e].addEventListener("click", function(){
                console.log(radio[e].value);
                deactiveRandomButton(true);
            });
            })(i);
        }
    }
});