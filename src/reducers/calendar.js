

export const calendar = (state= [], action) => {
  switch (action.type) {
      case 'CALENDAR_FETCHED':
            return [
                ...action.calendar
            ];
      case 'ADD_MONTHTOCALENDAR':
          return [
              ...action.calendar, action.month
          ];
      default:
          return state;
  }
};