const input = document.querySelector('#date');
const btn = document.querySelector('#btn');
const output = document.querySelector("#output");

		function reverseStr(str) {
			return str.split('').reverse().join('');
		}
		
		function checkPalindrome(str){
			return str === reverseStr(str);
		}

		function dateToStr(date) {
			let dateStr = {
				day: '',
				month: '',
				year: ''
			}

			if (date.day < 10) {
				dateStr.day = '0' + date.day;
			}else {
				dateStr.day = date.day.toString()
			}

			if (date.month < 10) {
				dateStr.month = '0' + date.month;
			} else {
				dateStr.month = date.month;
			}

			dateStr.year = date.year.toString();

			return dateStr;
		}

		function getAllDateFormats(date) {
			let dateStr = dateToStr(date);

			let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
			let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
			let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
			let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
			let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
			let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

			return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
		}

		function checkPalindromeForAllFormat(date) {
			let listOfPalindromes = getAllDateFormats(date);
			let flag = false;

			for (let i=0; i < listOfPalindromes.length; i++) {
				if (checkPalindrome(listOfPalindromes[i])) {
					flag = true;
					break;
				}
			}

			return flag;
		}

		function isLeapYear(year) {
			if (year % 400 === 0){
				return true;
			}
			if (year % 100 === 0) {
				return  false;
			}
			if (year % 4 === 0) {
				return true;
			}
			return false;
		}

		function getNextDate(date) {
			var day = date.day + 1;
			var month = date.month;
			var year = date.year;

			var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

			if (month === 2) {
				if (isLeapYear(year)) {
					if (day > 29){
						day = 1;
						month++;
					}
				}else {
					if (day > 28) {
						day = 1;
						month++;
					}
				}
			}else {
				if (day > daysInMonth[month - 1]){
					day = 1;
					month++;
				}
			}

			if (month > 12) {
				month = 1;
				year++;
			}

			return {
				day: day,
				month: month,
				year: year
			}
		}

		function getNextPalindromeDate(date) {
			var count = 0;
			var nextDate = getNextDate(date);

			while(1) {
				count++;
				var isPalindrome = checkPalindromeForAllFormat(nextDate);
				if (isPalindrome) {
					break;
				}
				nextDate = getNextDate(nextDate)
			}

			return [count, nextDate];
		}
		
		function clickHandler(e) {
            e.preventDefault();
			var bdayStr = input.value;
			console.log(bdayStr);
			
			if (bdayStr !== '') {
				var listOfDate = bdayStr.split('-');
				date = {
					day: Number(listOfDate[2]),
					month: Number(listOfDate[1]),
					year: Number(listOfDate[0])
				}
				console.log(date);

				var isPalindrome = checkPalindromeForAllFormat(date);
				
				if(isPalindrome) {
					output.textContent = "Hurray, your birthday is Palindrome";
				}else {
					var [count, date] = getNextPalindromeDate(date);
					output.textContent = `You missed by ${count} days and next palindrome date is ${date.day}-${date.month}-${date.year}`;
				}
			}else {
                output.textContent = "Kindly select a date"
            }
		}

		btn.addEventListener('click', clickHandler);