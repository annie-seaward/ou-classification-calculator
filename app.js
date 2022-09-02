let courses = {
    level2: [
        {
            code: 'S209',
            credits: 60,
            classification: 1,
        },
        {
            code: 'TT284',
            credits: 30,
            classification: 1,
        },
        {
            code: 'TM255',
            credits: 30,
            classification: 4,
        }
    ],
    level3: [
        {
            code: 'T317',
            credits: 60,
            classification: 1,
        },
        {
            code: 'TM352',
            credits: 30,
            classification: 1,
        },
        {
            code: 'S350',
            credits: 30,
            classification: 2,
        }
    ]
};

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

let level2 = checkCredits(courses.level2);

let level3 = checkCredits(courses.level3);


if (level2.correctCredits && level3.correctCredits) {
    level3.totalPoints = level3.totalPoints * 2;
    let sumPoints = level2.totalPoints + level3.totalPoints;
    let firstCheck = calcFirstCheck(sumPoints);
    let secondCheck = calcSecondCheck(courses.level3);
    console.log(firstCheck >= secondCheck ? firstCheck : secondCheck);
} else {
    console.log("Incorrect number of credits");
}