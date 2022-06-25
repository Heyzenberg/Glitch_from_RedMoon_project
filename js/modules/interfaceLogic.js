'use strict';


const interfaceLogic = {
    clock: () => {
                let hour = document.querySelectorAll('#hr');
                let min = document.querySelectorAll('#min');
                let sec = document.querySelectorAll('#sec');
            
                setInterval(() => {
                    let day = new Date();
                    let hh = day.getHours() * 30;
                    let mm = day.getMinutes() * 6;
                    let ss = day.getSeconds() * 6;
            
                    hour.forEach(thisHour => {
                        thisHour.style.transform = `rotateZ(${hh+(mm/12)}deg)`;
                    });
                    min.forEach(thisMin => {
                        thisMin.style.transform = `rotateZ(${mm}deg)`;
                    });
                    sec.forEach(thisSec => {
                        thisSec.style.transform = `rotateZ(${ss}deg)`;
                    });
                    
                    let hours = document.querySelectorAll('#hour');
                    let minutes = document.querySelectorAll('#minutes');
                    let seconds = document.querySelectorAll('#seconds');
            
                    let h = new Date().getHours();
                    let m = new Date().getMinutes();
                    let s = new Date().getSeconds();
            
            
                    h = (h < 10) ? '0' + h : h;
                    m = (m < 10) ? '0' + m : m;
                    s = (s < 10) ? '0' + s : s;
            
                    hours.forEach(thisHour => {
                        thisHour.innerText = h;
                    });
                    minutes.forEach(thisMin => {
                        thisMin.innerText = m;
                    });
                    seconds.forEach(thisSec => {
                        thisSec.innerText = s;
                    });
                }) 
    },

    calendar: () => {
                let thisCalendar = document.querySelectorAll('.calendar');

                const monthsName = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ];
                
                const isLeapYear = (year) => {
                    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0);
                }
            
                const getFebDays = (year) => {
                    return isLeapYear(year) ? 29 : 28;
                }                

                thisCalendar.forEach(calendar => {
                    let calendarDays = calendar.querySelectorAll('.calendar-days');
                    let calendarHeaderYear = calendar.querySelectorAll('#year');
                    let monthList = calendar.querySelectorAll('.month-list');
                    let monthPicker = calendar.querySelectorAll('#monthPicker');

                    calendarDays.forEach(calendarDay => {
                        calendarHeaderYear.forEach(calHeaderYear => {
                            monthList.forEach(monList => {
                                monthPicker.forEach(monPicker => {
                                    const generateCalendar = (month, year) => {
                                
                                
                                        let daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                                
                                        calendarDay.innerHTML = '';
                                
                                        let currentDate = new Date();
                                        // if (!month) month = currentDate.getMonth()
                                        // if (!year) year = currentDate.getFullYear()
                                
                                        let currentMonth = `${monthsName[month]}`;
                                        monPicker.innerHTML = currentMonth;
                                        calHeaderYear.innerHTML = year;
                                
                                        
                                        let firstDay = new Date(year, month, 1);
                                
                                        for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
                                            let day = document.createElement('div');
                                            if (i >= firstDay.getDay()) {
                                                day.classList.add('calendar-day-hover');
                                                day.innerHTML = i - firstDay.getDay() + 1;
                                                day.innerHTML += `<span></span>
                                                                <span></span>
                                                                <span></span>
                                                                <span></span>`;
                                                if (i - firstDay.getDay() + 1 === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
                                                    day.classList.add('curr-date');
                                                }
                                            }
                                            calendarDay.appendChild(day);
                                        }
                                    }
                                
                                
                                    monthsName.forEach((e, index) => {
                                        let month = document.createElement('div');
                                        month.innerHTML = `<div data-month="${index}">${e}</div>`;
                                        month.querySelector('div').onclick = () => {
                                            monList.classList.remove('show');
                                            currentMonth.value = index;
                                            generateCalendar(index, currentYear.value);
                                        }
                                        monList.appendChild(month);
                                    })
                                
                                    
                                
                                    monPicker.onclick = () => {
                                        monList.classList.add('show');
                                    }
                                
                                    let currentDate = new Date();
                                
                                    let currentMonth = {value: currentDate.getMonth()};
                                    let currentYear = {value: currentDate.getFullYear()};
                                
                                    generateCalendar(currentMonth.value, currentYear.value);
                                
                                    const prevBtn = document.querySelectorAll('#prevYear');
                                    prevBtn.forEach(prev => {
                                        prev.addEventListener('click', () => {
                                            --currentYear.value;
                                            generateCalendar(currentMonth.value, currentYear.value);
                                        })
                                    })
                                
                                    const nextBtn = document.querySelectorAll('#nextYear');
                                    nextBtn.forEach(next => {
                                        next.addEventListener('click', () => {
                                            ++currentYear.value;
                                            generateCalendar(currentMonth.value, currentYear.value);                                            
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
    },

    navPanel: () => {
                const reloadGlitch = document.querySelectorAll('#reload-icon');

                reloadGlitch.forEach(reloadIcon => {
                    reloadIcon.addEventListener('click', () => {
                        window.location.reload();
                    })                    
                });
    },
}


export { interfaceLogic };