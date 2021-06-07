export const employeesFetched = (employees) => ({
    type: 'FETCH_EMPLOYEES_SUCCESS',
    employees
});


export const AddEmployee = (employees, employee) => ({
    type: 'ADD_EMPLOYEE',
    employees,
    employee
});


export const fetchScores = (scores) => ({
   type: 'SCORES_FETCHED',
   scores
});

export const addScore = (scores, score) => ({
   type: 'ADD_SCORE',
   scores,
   score
});




export const changeMonth = (month) => ({
    type: "CHANGE_MONTH",
    month
});


export const addMonthObject = (months, month) => ({
    type: "ADD_MONTH",
    months,
    month
});

export const fetchUser = (user) => ({
   type: "FETCH_USER",
   user
});

export const fetchCalendar = (calendar) => ({
    type: "CALENDAR_FETCHED",
    calendar,
});

export const addMonthCalendar = (calendar, month) => ({
   type: "ADD_MONTHTOCALENDAR",
   calendar,
   month
});