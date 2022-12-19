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
const renderCalendar=(month,year)=>{

    const lastDateOfMonth = new Date(currentYear,currentMonth +1,0).getDate()
    const lastDateOfLastMonth = new Date(currentYear,currentMonth,0).getDate()
    const firstDayOfMonth = new Date(currentYear,currentMonth,1).getDay();
    let days ="";
    for(let i=firstDayOfMonth; i>0; i--){
        days +=`<li></li>`

    }
    for(let i=1; i<=lastDateOfMonth; i++){
        days +=`<li>${i}</li>`
    }
   

    currentDate.innerText =` Tháng ${months[currentMonth]} năm ${currentYear}`
    currentDays.innerText=`${currentDay}`
    currentWeek.innerText=`${week[currentWeeks]}`
    tbodyTable.innerHTML=days
    //render threadTH
    // inerThread = week.map(data =>{
    //      return `<li>${data}</li>`
    //  })
    //  threadTable.innerHTML = inerThread ;
}
renderCalendar();
prev.forEach(item =>{
    item.addEventListener("click",()=>{
       currentMonth =item.id === "prevMonth" ? currentMonth - 1 :currentMonth+1;
       currentYear =item.id === "prevYear" ? currentYear - 1 :currentYear+1;
       renderCalendar();
    })
})

