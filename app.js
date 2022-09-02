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
            classification: 4,
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

function secondCheck (arr) {
    let classObj = {1: 0, 2: 0, 3: 0, 4: 0, 4: 0};
    for (var i = 0; i < arr.length; i++) {
        classObj[arr[i].classification] += arr[i].credits;
    }
    
    let sum = 0;
    for (const elem in classObj) {
        if (classObj[elem] !== 0) {
            sum += classObj[elem];
        }
        if (sum === 60) {
            return elem;
        }
    }


    // //if 60 credits at the same class then this is the check
    // for (const elem in classObj) {  
    //     if (classObj[elem] >= 60) {
    //         return elem;
    //     }
    // }

    // //if there isn't 60 credits at the same level
    // //then need to get the highest two thirty credits
    // for (var i = 1; i <= 4; i++) {
    //     if (classObj[i] === 30) {
    //         for (var j = i; j <= 4; j++) {
    //             if (classObj[j] === 30) {
    //                 return j;
    //             }
    //         }
    //     }
    // }


}

let level2 = checkCredits(courses.level2);

let level3 = checkCredits(courses.level3);
level3.totalPoints = level3.totalPoints * 2;


if (level2.correctCredits && level3.correctCredits) {
    console.log("Total Credits " + (level2.totalPoints + level3.totalPoints));
    console.log("First Check " + firstCheck(level2.totalPoints + level3.totalPoints));
    console.log("Second Check " + secondCheck(courses.level3));
} else {
    console.log("Incorrect number of credits");
}