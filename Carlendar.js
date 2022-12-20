//data month
const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
// days of month
const dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//data weeks
const week = ["Chủ nhật", " Thứ hai", "Thứ ba", " Thứ tư", " Thứ năm ", " Thứ Sáu ", " Thứ bảy "];

var currentDate = document.getElementById('currentDate');
var currentDay = document.getElementById('currentDay');
var currentWeek = document.getElementById('currentWeek');
var tableDays = document.getElementById('days');
var prev = document.querySelectorAll('.footer span');

//id weeknow_datenow_monthnow_yearmonth 
var dayNow = new Date();
var dateNow = dayNow.getDate();
var weekNow = dayNow.getDay();
var monthNow = dayNow.getMonth();
var yearNow = dayNow.getFullYear();

const renderCalendarDetail = () => {
    currentDate.innerText = `Tháng ${months[monthNow]} năm ${yearNow}`;
    currentDay.innerText = `${dateNow}`;
    currentWeek.innerText = `${week[weekNow]}`;
}
const renderCalendar = () => {
    const firstDayOfMonth = new Date(yearNow, monthNow, 1).getDay();
    var tmp = ' ';
    var cnt = 1; //count day
     // kiểm tra đã qua ngày đầu tiên của tháng chưa
    var checkBeginDayOfMonth = false;
    var numberDayOfMonth = dayOfMonth[monthNow];
    if (monthNow === 1) {
        if (yearNow % 4 === 0 || (yearNow % 400 === 0 && yearNow % 100 !== 0)) {
            numberDayOfMonth += 1;
        }
    }
    for (var i = 0; i < 6; i++) {
        tmp += '<tr>';
        for (var j = 0; j < 7; j++) {
            if (((i === 0 && firstDayOfMonth === j) || checkBeginDayOfMonth) && cnt <= numberDayOfMonth) {
                if (cnt == dateNow)
                    tmp += `<td onClick="chooseDay(${cnt},${monthNow}, ${yearNow})" class = 'active'>${cnt}</td>`;
                else
                    tmp += `<td onClick="chooseDay(${cnt},${monthNow}, ${yearNow})">${cnt}</td>`;
                cnt++;
                checkBeginDayOfMonth = true;
            } else
                tmp += '<td>&nbsp;&nbsp;</td>';
        }
        tmp += '</tr>';
    }
    console.log(firstDayOfMonth);
    tableDays.innerHTML = tmp;
}

const chooseDay = (date, month, year) => {
    yearNow = year;
    monthNow = month;
    dateNow = date
    weekNow = new Date(`${monthNow + 1} ${dateNow},${yearNow}`).getDay();
    handelCreateOption();
    renderCalendarDetail();
    renderCalendar();
}


prev.forEach(item => {
    item.addEventListener("click", () => {
        monthNow = item.id === "prevMonth" ? monthNow - 1 : monthNow;
        yearNow = item.id === "prevYear" ? yearNow - 1 : yearNow;
        monthNow = item.id === "nextMonth" ? monthNow + 1 : monthNow;
        yearNow = item.id === "nextYear" ? yearNow + 1 : yearNow;
        weekNow = new Date(`${dateNow} ${monthNow} ${yearNow}`).getDay()

        if (monthNow < 0 || monthNow > 11) {         
            yearNow = date.getFullYear();
            monthNow = date.getMonth();
            date = new Date(`${monthNow + 1} ${dateNow},${yearNow}`);
            weekNow = date.getDay();
        } else {
            date = new Date();
            weekNow = new Date(`${monthNow + 1} ${dateNow},${yearNow}`).getDay();
        }
        handelCreateOption();
        renderCalendarDetail();
        renderCalendar();
    })
})

// onPay => số lần lặp
// optMonth => id hoặc class bên html
// textYear => giá trioj hiện tại
const handleSelectOption =(opDay, optMonth,textYear)=>{
    let item ="";
    for(let i=1;i<opDay+1;i++){
        item +=` <option value="${i}" ${i===textYear ? 'selected':''}> ${i}</option>`
    }
    document.querySelector(optMonth).innerHTML=item
}
const handelCreateOption = () => {
    handleSelectOption(12,".selectMonth", monthNow + 1)
    handleSelectOption(new Date(yearNow, monthNow + 1,0).getDate(),".selectDate",dateNow);
    document.querySelector(".yearNum").setAttribute('value',yearNow);
}
const handleButtonClick =()=>{
    dateNow = document.querySelector(".selectDate").value * 1;
    monthNow = document.querySelector(".selectMonth").value * 1 - 1;
    yearNow = document.querySelector(".yearNum").value * 1;
    date = new Date(`${monthNow +1} ${dateNow},${yearNow}`);
    weekNow = date.getDay();
    renderCalendarDetail();
    renderCalendar();
}

const returnDateNow = () =>{
    dayNow = new Date();
    dateNow = dayNow.getDate();
    weekNow = dayNow.getDay();
    monthNow = dayNow.getMonth();
    yearNow = dayNow.getFullYear();
    handelCreateOption();
    renderCalendarDetail();
    renderCalendar();
}
handelCreateOption();
renderCalendarDetail();
renderCalendar();