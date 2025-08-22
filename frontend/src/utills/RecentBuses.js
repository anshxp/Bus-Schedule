export const addRecentBuses=(bus)=>{
    let recent =JSON.parse(localStorage.getItem("recentBuses")) || [];
    recent=recent.filter(item=>item.Busno!== bus.Busno);
    recent.unshift(bus);
    if(recent.length > 10) {
        recent = recent.slice(0, 10);
    }
    localStorage.setItem("recentBuses", JSON.stringify(recent));
}
export  const getRecentBuses=()=>{
    return JSON.parse(localStorage.getItem("recentBuses")) || [];
}