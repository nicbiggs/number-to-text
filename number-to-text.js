/**
 * Takes in some number and returns a spelled out version of it.
 * @param {Number} number Some number
 * @returns {String} The worded version of this number
 */
function numberToText(number) {
    if (number == 0) {
        return singleDigits[number];
    }

    let numberArray = Array.from(number.toString(), Number);
    if (numberArray.length <= 3) {
        return getHundredsNumber(number);
    }

    let text = "";
    let groupIndex = 0;
    for (let i = numberArray.length - 3; i >= -2; i = i-3) {
        let groupNumber;
        if (i < 0) {
            groupNumber = Number(numberArray.slice(0, i + 3).join(""));
        }
        else {
            groupNumber = Number(numberArray.slice(i, i + 3).join(""));
        }

        let group = (groupNumber == 0) ? "" : ` ${grouping[groupIndex]} `;
        text = getHundredsNumber(groupNumber) + group + text;
        groupIndex++;
    }

    return text.trim();
}

/**
 * Takes a 1-3 digit number and returns it as a string word.
 * @param {Number} threeDigit The 3 digit "hundred" segment. Note that it can be less than 3 digits, it just can't be more than 3.
 * @returns {String} The hundreds number printed out as a string
 */
function getHundredsNumber(threeDigit) {
    // Check for "0##" numbers
    if (threeDigit < 100) {
        return getTensNumber(threeDigit);
    }
    let [hundredDigit, ...remainingArray] = Array.from(threeDigit.toString(), Number);
    let tensNumber = Number(remainingArray.join(""));
    if (tensNumber == 0) {
        return `${singleDigits[hundredDigit]} hundred `;
    }
    else {
        return `${singleDigits[hundredDigit]} hundred ${getTensNumber(tensNumber)}`;
    }
}

/**
 * Takes a 1-2 digit number and returns it as a string word.
 * @param {Number} twoDigit The two digit "tens" segment. Note that it can be less than 2 digits, it just can't be more than 2.
 * @returns {String} The tens number printed out as a string
 */
 function getTensNumber(twoDigit) {
    // Check for "teens" number
    if (twoDigit > 10 && twoDigit < 20) {
        return teens[twoDigit];
    }
    // Check for "0#" numbers (since JS will auto-convert that to a single digit)
    if (twoDigit < 10) {
        return singleDigits[twoDigit];
    }

    let [tensDigit, singleDigit] = Array.from(twoDigit.toString(), Number);
    if (singleDigit == 0) {
        return tensDigits[tensDigit];
    }
    else {
        return `${tensDigits[tensDigit]}-${singleDigits[singleDigit]}`;
    }
}

/* Object map section */

let singleDigits = {
    0: "",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine"
};

let teens = {
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen"
};

let tensDigits = {
    0: "",
    1: "ten",
    2: "twenty",
    3: "thirty",
    4: "forty",
    5: "fifty",
    6: "sixty",
    7: "seventy",
    8: "eighty",
    9: "ninety"
};

let grouping = {
    0: "",
    1: "thousand",
    2: "million",
    3: "billion",
    4: "trillion",
    5: "quadrillion",
    6: "quintillion",
    7: "sextillion",
    8: "septillion",
    9: "octillion",
    10: "nonillion",
    11: "decillion"
};