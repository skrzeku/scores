

export const filterbyDate = (one, bool, arr, currentMonth, year)=>  arr
    .filter((ons)=> ons.type === one)
    .filter((ont) => {
        // console.log(new Date(+'2021', 0, 1));
        if (bool) {
            const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
            return date >= currentMonth?.startDate.toDate().getTime() && date <= currentMonth?.endDate.toDate().getTime();
        }
        else {
            const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
            return date >= new Date(+year, 0, 1) && date <= new Date(+year, 11, 30);

            // return ont;
        }
    })

export const indexMonth = (year, month, array)=> {
    return array?.indexOf (
        array.find((one, index)=> {
            return one.year === year && one.name === month
        })
    )
};


export const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
export const years= ['2021', '2022'];

export const types = ['Pozycjonowanie', 'Premium Start', 'Facebook', 'Remarketing', 'Strona WWW', 'B2B', 'ssl', 'ads', 'Logotyp', 'Ads + Remarketing', 'Optymalizacja', 'Premium Start + Optymalizacja', 'reCaptcha', 'GMF', 'GMF + Opinie', 'Opinie','Instagram', 'Abonament GMF','inny'];
export const shorts = ['Seo', 'S', 'Fb', 'Rem', 'www', 'b2b', 'ssl', 'ads', 'L', 'a+rem', 'o', 's+o', 'rc', 'gmf', 'gmf+o', 'opi', 'ins', 'GMFab', ''];


