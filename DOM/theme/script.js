const status = document.getElementById("status");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click",function(){
    if(status.textContent === "Light is OFF"){
        status.textContent = "Light is ON";
        toggleBtn.textContent = "Turn OFF";
    }else if(status.textContent = "Light is ON"){
        status.textContent = "Light is OFF";
        toggleBtn.textContent = "Turn ON";
    }
})