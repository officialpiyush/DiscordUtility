/**
 * @param {Number} ms - The MilliSeconds to transform
 * @param {Boolean} long - If you want the output to be transformed long
 */
export function convertMS(ms: number, numberOnly: boolean = true, long: boolean = false){
    if(isNaN(ms) || ms === 0) throw Error("ms has to be a number bigger than 0!")
    
    let day, hour, minute, seconds;
    seconds = Math.floor(ms / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    if(!numberOnly){
    let newDate = "";

        if(day > 0) newDate += long?`${day} days, ` : `${day}:`;
        if(hour > 0) newDate += long?`${hour} hours, ` : `${hour}:`;
        if(minute > 0) newDate += long?`${minute} minutes, ` : `${minute}:`;
        if(seconds > 0) newDate += long? `${seconds} seconds.` : `${seconds}`;

    return newDate;
    } else {
        return {
            d: day,
            h: hour,
            m: minute,
            s: seconds
        }
    }
}