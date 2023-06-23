export const toDate = (epoch)=>{
    var utcSeconds = epoch;
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    return d.toString();
}