const calendar = () => {
    
    let calendar = document.querySelector('.calendar');

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

    isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0);
    }

    getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28;
    }

    generateCalendar = (month, year) => {

        let calendarDays = calendar.querySelector('.calendar-days');
        let calendarHeaderYear = calendar.querySelector('#year');

        let daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        calendarDays.innerHTML = '';

        let currentDate = new Date();
        // if (!month) month = currentDate.getMonth()
        // if (!year) year = currentDate.getFullYear()

        let currentMonth = `${monthsName[month]}`;
        monthPicker.innerHTML = currentMonth;
        calendarHeaderYear.innerHTML = year;

        
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
            calendarDays.appendChild(day);
        }
    }

    let monthList = calendar.querySelector('.month-list');

    monthsName.forEach((e, index) => {
        let month = document.createElement('div');
        month.innerHTML = `<div data-month="${index}">${e}</div>`;
        month.querySelector('div').onclick = () => {
            monthList.classList.remove('show');
            currentMonth.value = index;
            generateCalendar(index, currentYear.value);
        }
        monthList.appendChild(month);
    })

    let monthPicker = calendar.querySelector('#month-picker');

    monthPicker.onclick = () => {
        monthList.classList.add('show');
    }

    let currentDate = new Date();

    let currentMonth = {value: currentDate.getMonth()};
    let currentYear = {value: currentDate.getFullYear()};

    generateCalendar(currentMonth.value, currentYear.value);

    document.querySelector('#prev-year').onclick = () => {
        --currentYear.value;
        generateCalendar(currentMonth.value, currentYear.value);
    }

    document.querySelector('#next-year').onclick = () => {
        ++currentYear.value;
        generateCalendar(currentMonth.value, currentYear.value);
    }

    let darkTodeToggle = document.querySelector('.dark-mode-switch');

    darkTodeToggle.onclick = () => {
        document.querySelector('body').classList.toggle('light');
        document.querySelector('body').classList.toggle('dark');
    }
};

calendar();