export const employees = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_EMPLOYEES_SUCCESS':
            return [
                ...action.employees
            ];
        case 'ADD_EMPLOYEE':
            return [
                ...action.employees, action.employee
            ];
        default:
            return state
    }
}



