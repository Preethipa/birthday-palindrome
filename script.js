function reverseStr(str) {
  var listOfChars = str.split('');
  var reversedListOfChars = listOfChars.reverse();
  var reverseStr = reversedListOfChars.join('');
  return reverseStr;
  // return str.split('').reverse().join('');
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return (str === reverse);
}

function convertDateToStr(date) {
  var dateStr = { day: '', month: '', year: '' };

  if (date.day < 10) {
    dateStr.day = '0' + date.day;
  }
  else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = '0' + date.month;
  }
  else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

function allDateFormates(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormates(date) {
  var listOfPalindromes = allDateFormates(date);

  var flag = false;

  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1; // increment the day
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // check for february
  if (month === 2) {
    // check if it leap year
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    }
    else {
      // check if it is not a leap year
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  }
  else {
    //check if day exceeds the maximum days in month
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  // check for months
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year
  };
}

function nextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormates(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

var birthInput = document.querySelector("#birth-input");
var showBtn = document.querySelector("#show-btn");
var output = document.querySelector("#output");

function clickHandler(e) {
  var birthStr = birthInput.value;

  if (birthStr !== '') {
    var listOfDates = birthStr.split('-');

    var date = {
      day: Number(listOfDates[2]),
      month: Number(listOfDates[1]),
      year: Number(listOfDates[0])
    };

    var isPalindrome = checkPalindromeForAllDateFormates(date);

    if (isPalindrome) {
      output.innerText = "Yay!! Your Birthday is a Palindrome😇";
    }
    else {
      var [ctr, nextDate] = nextPalindromeDate(date);
      output.innerText = `The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}😮, You missed it by ${ctr} days!😏`
    }
  }
}

showBtn.addEventListener('click', clickHandler)