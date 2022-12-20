const currentDate= document.querySelector('.Current-date');
const currentDays= document.querySelector('.Current-days');
const currentWeek= document.querySelector('.Current-week');
const threadTable= document.querySelector('.thread');
const tbodyTable= document.querySelector('.days');
const prev= document.querySelectorAll('.footer span');
let date = new Date();
currentYear = date.getFullYear();
currentMonth=date.getMonth();
currentDay =date.getDate();
currentWeeks=date.getDay();
//data month
const months=["January", "February", "March", "April", "May", "June", "July", "August","  September","October", "November", "December"];
//data weeks
const week=["Chủ nhật"," Thứ hai", "Thứ ba", " Thứ tư", " Thứ năm ", " Thứ 6 ", " Thứ bảy "];

//render calendar
const renderCalendar=(month,year)=>{

    const lastDateOfMonth = new Date(currentYear,currentMonth +1,0).getDate()
    const lastDateOfLastMonth = new Date(currentYear,currentMonth,0).getDate()
    const lastDayOfMonth = new Date(currentYear,currentMonth,lastDateOfMonth).getDay()
    const firstDayOfMonth = new Date(currentYear,currentMonth,1).getDay();

    let days ="";
    for(let i=firstDayOfMonth; i>0; i--){
        days +=`<li></li>`
    }
    for(let i=lastDayOfMonth; i<lastDayOfMonth; i++){
        days +=`<li>${lastDateOfLastMonth}</li>`
    }
    for(let i=1; i<=lastDateOfMonth; i++){
        let isDayNow = i === date.getDate() && currentMonth === new Date().getMonth()
        && currentYear == new Date().getFullYear() ? "in-active":"";
        days +=`<li class="${isDayNow}">${i}</li>`
    }
    currentDate.innerText =` Tháng ${months[currentMonth]} năm ${currentYear}`
    currentDays.innerText=`${currentDay}`
    currentWeek.innerText=`${week[currentWeeks]}`
    tbodyTable.innerHTML=days
}
renderCalendar();
const handleSelectOption =(opDay, optMonth,textYear)=>{
    let item ="";
    for(let i=1;i< opDay;i++){
        item +=` <option value="${i}" ${i===textYear ? 'selected':''}> ${i}</option>`
    }
    document.querySelector(optMonth).innerHTML=item
}
handleSelectOption(12,".selectMonth",currentMonth+1)
handleSelectOption(new Date(currentYear,currentMonth+1,0).getDate(),".selectDate",currentDay)
//handle prev && next 
prev.forEach(item =>{
    item.addEventListener("click",()=>{
       currentMonth =item.id === "prevMonth" ? currentMonth - 1 :currentMonth;
       currentYear =item.id === "prevYear" ? currentYear - 1 :currentYear;
       currentMonth =item.id === "nextMonth" ? currentMonth + 1 :currentMonth;
       currentYear =item.id === "nextYear" ? currentYear +1 :currentYear;
       currentWeeks = new Date(`${currentMonth +1} ${currentDay},${currentYear}`).getDay()
       //hanlde month not undifined on click
       if(currentMonth <0 || currentMonth >11){
        date = new Date(currentYear,currentMonth);
        currentYear =date.getFullYear();
        currentMonth=date.getMonth(); 
       }else{
        date= new Date();
       }
       
       renderCalendar();
    })
})
document.querySelector(".yearNum").setAttribute('value',currentYear)

//lay gia tri value ng dung nhap vao
document.querySelector('.selectMonth').addEventListener('change',(evt)=>{
    const {value}=evt.target;
    let selectMonth = value;
    let selectYear = document.querySelector(".yearNum").value;
    let selectDate = new Date(selectYear,selectMonth,0).getDate();
    handleSelectOption(selectDate,".selectDate",currentDay)
})
document.querySelector('.yearNum').addEventListener('blur',(evt)=>{
    const {value}=evt.target;
    let selectYear = value;
    let selectMonth = document.querySelector(".selectMonth").value;
    let selectDate = new Date(selectYear,selectMonth,0).getDate();
    handleSelectOption(selectDate,".selectDate",currentDay)
})
//hanldle button Ok
const handleButtonClick =()=>{
    currentDay = document.querySelector(".selectDate").value
    currentMonth =document.querySelector(".selectMonth").value -1
    currentYear =document.querySelector(".yearNum").value
    currentWeeks = new Date(`${currentMonth +1} ${currentDay},${currentYear}`).getDay()
    renderCalendar();
}
//handle click day calendar
const handleClickDay = (evt) =>{
    evt.forEach(item =>{
        item.addEventListener('click',()=>{
            evt.forEach(item =>{
            item.classList.remove("in-active")
            this.classList.add("in-active")
            })
            currentDay= item.innerHTML
            currentWeeks = new Date(`${currentMonth +1} ${currentDay},${currentYear}`).getDay()
            currentDays.innerText=`${currentDay}`
            currentWeek.innerText=`${week[currentWeeks]}`
            tbodyTable.innerHTML=days
        })
    })
}

