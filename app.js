//Object holds the information about each of the courses the users has entered
let courses = {
    level2: [],
    level3: []
};

/***********************************************/
/***Functions used to calc the classification***/
/***********************************************/

//check the user has the correct number of credits - 120 at each level
function checkCredits (arr) {
    let totalCredits = arr.reduce((total, {credits}) => total + (credits), 0);
    let correctCredits;
    if (totalCredits === 120) {
        correctCredits = true;
    } else {
        correctCredits = false;
    }

    let totalPoints = arr.reduce((total, {credits, classification}) => total + (credits * classification), 0);
    return ({totalPoints, correctCredits});
}

//check the number of points the user has
function calcFirstCheck (total) {
    if (total <= 630) {
        return 1
    } else if (total <= 900) {
        return 2
    } else if (total <= 1170) {
        return 3
    } else if (total <= 1440) {
        return 4
    } else {
        return 5
    }
}

//check the highest 60 credits at level 3
function calcSecondCheck (arr) {
    let classObj = {1: 0, 2: 0, 3: 0, 4: 0, 4: 0};
    for (var i = 0; i < arr.length; i++) {
        classObj[arr[i].classification] += arr[i].credits;
    }
    
    let sum = 0;
    for (const elem in classObj) {
        if (classObj[elem] !== 0) {
            sum += classObj[elem];
        }
        if (sum >= 60) {
            return elem;
        }
    }
}

//return a string for the correct classification
function returnClass (classification) {
    if (classification === 1) {
        return "First Class (1st)"
    } else if (classification === 2) {
        return "Upper Second Class (2.1)"
    } else if (classification === 3) {
        return "Lower Second Class (2.2)"
    } else if (classification === 4) {
        return "Third Class (3rd)"
    } else {
        return "error"
    }
}

/******************************************/
/***DOM manipulation and event functions***/
/******************************************/

let modulesContainer = document.getElementById('modulesContainer');

let modNameField = document.getElementById('modName');
let levelField = document.getElementById('level');
let classField = document.getElementById('class');
let creditsField = document.getElementById('credits');

let addModuleButton = document.getElementById('addModule');

let paraID = 0;

//when new module added display back to the user and add data to the object
addModuleButton.addEventListener('click', function(){
    var paragraph = document.createElement('p');

    paragraph.innerHTML = "<span class='blue'>" + modNameField.value + "</span>";
    paragraph.innerHTML += "<br/><br/><span>Level: " + levelField.value + "</span>";
    paragraph.innerHTML += "<span>Class: " + classField.value + "</span>";
    paragraph.innerHTML += "<span>Credits: " + creditsField.value + "</span>";

    paraID += 1;
    paragraph.id = paraID;

    modulesContainer.appendChild(paragraph);

    if (levelField.value === "2") {
        courses.level2.push({
            id: paraID,
            code: modNameField.value,
            credits: parseInt(creditsField.value),
            classification: parseInt(classField.value)
        });
    } else {
        courses.level3.push({
            id: paraID,
            code: modNameField.value,
            credits: parseInt(creditsField.value),
            classification: parseInt(classField.value)
        });
    }

    //allow the user to delete a module
    paragraph.addEventListener('dblclick', function(){
        modulesContainer.removeChild(paragraph);
        courses.level2 = courses.level2.filter((elem) => elem.id != paragraph.id);
        courses.level3 = courses.level3.filter((elem) => elem.id != paragraph.id);
    });
})

//when calculate button clicked calculate and return the classification
calcButton.addEventListener('click', function(){
    let level2 = checkCredits(courses.level2);
    let level3 = checkCredits(courses.level3);

    var paragraph = document.createElement('p');
    let resultContainer = document.getElementById('resultsContainer');

    if (level2.correctCredits && level3.correctCredits) {
        level3.totalPoints = level3.totalPoints * 2;
        let sumPoints = level2.totalPoints + level3.totalPoints;
        let firstCheck = calcFirstCheck(sumPoints);
        let secondCheck = calcSecondCheck(courses.level3);
        let message = returnClass(firstCheck >= secondCheck ? firstCheck : secondCheck);
        
        paragraph.innerHTML = "<span class='blue'>" + message + "</span>";
        resultContainer.appendChild(paragraph);

    } else {
        paragraph.innerHTML = "<span class='blue'>" + "Incorrect number of credits added" + "</span>";
        resultContainer.appendChild(paragraph);
    }
});

