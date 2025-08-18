export function translatetopersian(input) {

    switch (input) {
        case "free":
            return (
                {
                    lable: "رایگان",
                    classname: 'text-success'
                }
            )


        case "paid":
            return "پرداختی"
        case "premium":
            return ({
                lable: "پولی",
                classname: 'text-red-600'
            })



        default:
            break;
    }
}