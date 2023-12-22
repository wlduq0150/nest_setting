export function compareDateTime(dateTime1: string, dateTime2: string): boolean {
    const [date1, time1] = dateTime1.split("/");
    const [date2, time2] = dateTime2.split("/");

    const [year1, month1, day1] = date1.split("-").map(Number);
    const [year2, month2, day2] = date2.split("-").map(Number);

    const [hour1, minute1] = time1.split(":").map(Number);
    const [hour2, minute2] = time2.split(":").map(Number);

    const dateObject1 = new Date(year1, month1 - 1, day1, hour1, minute1);
    const dateObject2 = new Date(year2, month2 - 1, day2, hour2, minute2);

    const timestamp1 = dateObject1.getTime();
    const timestamp2 = dateObject2.getTime();

    const time = timestamp2 - timestamp1 - 3600000 * 3;

    return time > 0 ? true : false;
}
