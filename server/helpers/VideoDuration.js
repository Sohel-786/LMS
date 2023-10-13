function Duration(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let res = "";
  
    if (hrs > 0) {
      res += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
  
    res += "" + mins + ":" + (secs < 10 ? "0" : "");
    res += "" + secs;
  
    return res;
  }
  
export default Duration;