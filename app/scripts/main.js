$(document).ready(function() {
    deactivationRadioButtons(true);
    deactivationStartButtons(true);
    insertElements();
    changeElements(8);
    changeQuantity(6);
    addEvents();

    var Numbers = {
        element : [],
        setNumbers: function (arg, quantity) {
            this.element = [];
            for(var i = 0; i < quantity; i++){
                this.element[i] = arg[i].innerHTML;
            }
        },
        getNumbers: function () {
            return this.element;
        }
    };

    //funckja dezaktywujaca radio buttony
    function deactivationRadioButtons(arg){
        var radio = document.getElementsByName("sort");
        var radioLength = radio.length;
        if(arg){
            for(var i = 0; i < radioLength; i++){
                radio[i].setAttribute("disabled", "disabled");
            }
        }else {
            for(var i = 0; i < radioLength; i++){
                radio[i].removeAttribute('disabled');
            }
        }
    }

    //funkcja dezaktywujaca start buttony
    function deactivationStartButtons(arg){
        var start = document.getElementsByClassName("start-button");
        var startLength = start.length;
        if(arg){
            for(var i = 0; i < startLength; i++){
                start[i].setAttribute("disabled", "disabled");
            }
        }else {
            for(var i = 0; i < startLength; i++){
                start[i].removeAttribute('disabled');
            }
        }
    }

    //funkcja dezaktywujaca random button
    function deactiveRandomButton(arg){
        var rand = document.getElementById("random");
        var add = document.getElementById("add");
        var string = document.getElementById("string");
        if(arg){
            rand.setAttribute("disabled", "disabled");
            add.setAttribute("disabled", "disabled");
            string.setAttribute("disabled", "disabled");
        }else {
            rand.removeAttribute('disabled');
            add.removeAttribute('disabled');
            string.removeAttribute('disabled');
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

    //dodawanie losowych liczb jezeli arg === true, dodawanie wpisanych liczb jezeli arg === false
    function addElements(arg, quantity){
        var element = document.getElementsByClassName("elements");
        if(arg){
            for(var i = 0; i < quantity; i++){
                element[i].innerText = Math.floor((Math.random() * 15) + 1);
            }
            Numbers.setNumbers(element, quantity);
        } else{
            var string = document.getElementById("string");
            var stringArray = string.value.split(" ");
            var stringLenth = stringArray.length;
            var elementLenth = quantity;
            if(stringLenth == elementLenth){
                for(var i = 0; i < quantity; i++){
                    element[i].innerText = stringArray[i];
                }
                Numbers.setNumbers(element, quantity);
                deactivationRadioButtons(false);
            } else{
                alert("Nieprawidłowa ilość elementów!");
            }
        }
        getElements();
    }

    //dodawanie eventow do elementow
    function addEvents(){
        var slider = document.getElementById("slider");
        //event on slider for IE
        slider.addEventListener("change", function(){
            changeQuantity(slider.value);
            changeElements(14 - slider.value);
            deactivationRadioButtons(true);
            deactivationStartButtons(true);
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
            // randomElements(slider.value);
            addElements(true, slider.value);
            deactivationRadioButtons(false);
        });
        var add = document.getElementById("add");
        //event on add button
        add.addEventListener("click", function(){
            addElements(false, slider.value);
        });
        var radio = document.getElementsByName("sort");
        var radioLength = radio.length;
        //events for radio buttons
        for(var i = 0; i < radioLength; i++){
            (function(e){
                radio[e].addEventListener("click", function(){
                    choose(radio[e].value);
                    deactiveRandomButton(true);
                    deactivationStartButtons(false);
                });
            })(i);
        }
    }

    ///////////////////////////////////////////////////
    //function for test////////////////////////////////
    ///////////////////////////////////////////////////
    function getElements(){
        var numbers = [];
        var numbersLength = Numbers.getNumbers().length;
        for(var i = 0; i < numbersLength; i++){
            numbers[i] = parseInt(Numbers.getNumbers()[i]);
        }
        return numbers;
    }

    //funkcja wybierajaca radio button
    function choose(arg) {
        var elements = getElements();
        var elementsLength = elements.length;
        switch (arg) {
            case "bubble":
                bubbleSort(elements, elementsLength);
                break;
            case "quick":
                addBefore(elements);
                quickSort(elements, elementsLength, 0, elementsLength - 1);
                break;
            case "insertion":
                insertionSort(elements, elementsLength);
                break;
            case "selection":
                selectionSort(elements, elementsLength);
                break;
            case "counting":
                countingSort(elements, elementsLength);
                break;
            case "radix":
                radixSort(elements, elementsLength);
                break;
            case "heap":
                heapSort(elements, elementsLength);
                break;
        }
    }

    function addBefore(arg) {
        var before = document.getElementById("result-before");
        before.innerHTML = "";
        var numbersLength = arg.length;
        for(var i = 0; i < numbersLength; i++){
            before.innerHTML += arg[i] + " ";
        }
    }

    function addAfter(arg) {
        var after = document.getElementById("result-after");
        after.innerHTML = "";
        var numbersLength = arg.length;
        for(var i = 0; i < numbersLength; i++){
            after.innerHTML += arg[i] + " ";
        }
    }

    //funkcja sortujaca algorytmem babelkowym
    function bubbleSort(arg, n) {
        var numbers = [], i,
        tmp = 0,
        p = 0;
        for(i = 0; i < n; i++){
            numbers[i] = arg[i];
        }
        addBefore(numbers);
        for(var j = n -1; j > 0; j--){
            p = 1;
            for(var i = 0; i < j; i++){
                if(numbers[i] > numbers[i + 1]){
                    tmp = numbers[i];
                    numbers[i] = numbers[i + 1]
                    numbers[i + 1] = tmp;
                    p = 0;
                }
            }
            if(p){
                break;
            }
        }
        addAfter(numbers);
    }

    function quickSort(arg, n, left, right) {
        // do zrobienia
        var numbers = [],
        i, j, tmp, piwot;
        for(i = 0; i < n; i++){
            numbers[i] = arg[i];
        }
        i = Math.floor((left + right) / 2);
        piwot = numbers[i];
        numbers[i] = numbers[right];
        for(j = i = left; i < right; i++){
            if(numbers[i] < piwot){
                tmp = numbers[i];
                numbers[i] = numbers[j];
                numbers[j] = tmp;
                j++;
            }
        }
        numbers[right] = numbers[j];
        numbers[j] = piwot;
        if(left < j - 1){
            quickSort(numbers, n, left, j - 1);
        }else if(j + 1 < right){
            quickSort(numbers, n, j + 1, right);
        } else {
            addAfter(numbers);
        }
    }

    function insertionSort(arg, n) {
        var numbers = [],
        i, j, tmp;
        for(i = 0; i < n; i++){
            numbers[i] = arg[i];
        }
        addBefore(numbers);
        for(j = n -2; j >= 0; j--){
            tmp = numbers[j];
            i = j + 1;
            while((i < n) && (tmp > numbers[i])){
                numbers[i - 1] = numbers[i];
                i++;
            }
            numbers[i - 1] = tmp;
        }
        addAfter(numbers);
    }

    function selectionSort(arg, n) {
        var numbers = [],
        i, j, min, tmp;
        for(i = 0; i < n; i++){
            numbers[i] = arg[i];
        }
        addBefore(numbers);
        for(j = 0; j < n - 1; j++){
            min = j;
            for(i = j + 1; i < n; i++){
                if(numbers[i] < numbers[min]){
                    min = i;
                }
            }
            tmp = numbers[min];
            numbers[min] = numbers[j];
            numbers[j] = tmp;
        }
        addAfter(numbers);
    }

    function countingSort(arg, n) {
        var numbers = [];
        var min = 1, max = 15;
        var i, z = 0, count = [];
        for(i = 0; i < n; i++){
            numbers[i] = arg[i];
        }
        addBefore(numbers);
         for (i = min; i <= max; i++) {
            count[i] = 0;
        }
        for (i=0; i < numbers.length; i++) {
            count[numbers[i]]++;
        }
        for (i = min; i <= max; i++) {
            while (count[i]-- > 0) {
                numbers[z++] = i;
            }
        }
        addAfter(numbers);
    }

    function radixSort(arg, n) {
        // do zrobienia
        var numbers = [], i;
        for(i = 0; i < n; i++){
            numbers[i] = arg[i];
        }
        addBefore(numbers);
        addAfter(numbers);
    }

    function heapSort(arg, n) {
        // do zrobienia
        var numbers = [],
        i, j, k, m, tmp;
        for(i = 0; i < n; i++){
            numbers[i] = arg[i];
        }
        addBefore(numbers);
        for(i = 2; i <= n; i++){
            j = i;
            k = Math.floor(j / 2);
            tmp = numbers[i];
            while((k > 0) && (numbers[k] < tmp)){
                numbers[j] = numbers[k];
                j = k;
                k = Math.floor(j / 2);
            }
            numbers[j] = tmp;
        }
        for(i = n; i > 1; i--){
            tmp = numbers[1];
            numbers[1] = numbers[i];
            numbers[i] = tmp;
            j = 1;
            k = 2;
            while(k < i){
                if((k + 1 < i) && (numbers[k + 1] > numbers[k])){
                    m = k + 1;
                }else {
                    m = k;
                }
                if(numbers[m] <= numbers[j]){
                    break;
                }
                tmp = numbers[j];
                numbers[j] = numbers[m];
                numbers[m] = tmp;
                j = m;
                k = j + j;
            }
        }
        addAfter(numbers);
    }
});