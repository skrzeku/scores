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


export const filterScores = (month) => ({
   type: "FILTER_SCORES",
   month
});