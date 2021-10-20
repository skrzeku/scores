

export const filterbyDate = (one, bool, arr, currentMonth)=>  arr
    .filter((ons)=> ons.type === one)
    .filter((ont) => {
        if (bool) {
            const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
            return date >= currentMonth?.startDate.toDate().getTime() && date <= currentMonth?.endDate.toDate().getTime();
        }
        else return ont;
    })


