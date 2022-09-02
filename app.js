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
            classification: 4,
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

function firstCheck (total) {
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

let level2 = checkCredits(courses.level2);

let level3 = checkCredits(courses.level3);
level3.totalPoints = level3.totalPoints * 2;


if (level2.correctCredits && level3.correctCredits) {
    console.log("Total Credits " + (level2.totalPoints + level3.totalPoints));
    console.log("Classification " + firstCheck(level2.totalPoints + level3.totalPoints));
} else {
    console.log("Incorrect number of credits");
}