const inputdate = document.querySelector('#date');
const output = document.querySelector('#output');
const btn = document.querySelector('#btn');

function dateToString(date) {
	let dd = date.getDate();
	let mm = date.getMonth() + 1;
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	return date.getFullYear() + '-' + mm + '-' + dd;
}

let today = new Date();
let maxDate = dateToString(today);
inputdate.setAttribute("max", maxDate);
inputdate.setAttribute("value", maxDate);

const findNextPalindrome = function(datelist) {
	let curDate = new Date(datelist.join('-'));
	console.log(curDate);
	curDate.setDate(curDate.getDate() + 1);
	console.log(curDate);
	let trueFlag = '', dayCount = 0;
	while (!trueFlag) {
		curDate.setDate(curDate.getDate() + 1);
		console.log(curDate);
		dayCount++;
		console.log(dateToString(curDate));
		[trueFlag, palDate] = isPalindrome(dateToString(curDate).split('-'))
	}
	return [trueFlag, palDate, dayCount];
}

const isPalindrome = function(datelist) {
	dateFormats = [
		datelist[1] + datelist[2] + datelist[0],
		datelist[2] + datelist[1] + datelist[0],
		datelist[1] + datelist[2] + datelist[0].substring(2),
		datelist[2] + datelist[1] + datelist[0].substring(2)
	];
	for(let i = 0; i < dateFormats.length; i++){
		let revStr = dateFormats[i].split('').reverse().join('');
		if (dateFormats[i] === revStr) {
			switch(i) {
				case 0: 
				return ['MM/DD/YYYY', `${datelist[1]}-${datelist[2]}-${datelist[0]}`];
				case 1: 
				return ['DD/MM/YYYY', `${datelist[2]}-${datelist[1]}-${datelist[0]}`];
				case 2: 				
				return ['MM/DD/YY', `${datelist[1]}-${datelist[2]}-${datelist[0].substring(2)}`];
				case 3: 				
				return ['DD/MM/YY', `${datelist[2]}-${datelist[1]}-${datelist[0].substring(2)}`];
			}
		}
	}
	return ['', ''];
}


function callPalindrome(date) {
	let dateArray = date.split('-');
	let [flagFormat, palDate] = isPalindrome(dateArray);
	if (flagFormat) {
		output.textContent = `Hurray! Your birthdate forms a Palindrome in ${flagFormat} format as ${palDate}`;
	} else {
		let [dateFormat, nextDate, days] = findNextPalindrome(dateArray);
		output.textContent = `ohh! Your birthday does not form a Palindrome. The next plaindrome date is ${nextDate} in ${dateFormat} format which occurs ${days} days from your birthday`;
	}
}


btn.addEventListener('click', (e) => {
	e.preventDefault();
	output.textContent = '';
	if (!inputdate.value) {
		output.textContent = 'Kindly select a date';
	}else {
		callPalindrome(inputdate.value);
	}
	
});
