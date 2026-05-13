let clients = JSON.parse(localStorage.getItem("clients")) || [];

class client {
    constructor(fname, lname, night, roomtype, breakfast, ardate = new Date()){
        this.fname = fname;
        this.lname = lname;
        this.night = night;
        this.roomtype = roomtype;
        this.breakfast = breakfast;
        this.ardate = ardate;
    }
}

function price(night,breakfast){
    let leavedate = new Date().getHours();
    let total = 0;
    total = total + night * 65;
    if(breakfast == "oui"){
       total = total + night * 7
    }
    if(leavedate > 11){
        total = total + 10;
    }
    return total;
}

let form1 = document.getElementById("form1");
let form2 = document.getElementById("form2");

let jose = new client("José","Garcia",4,"suite","non",(function () {
    let d = new Date();
    d.setDate(d.getDate() - 2);
    d.setHours(16);
    d.setMinutes(0);
    return d;
})());
clients.push(jose);
let antoine = new client("Antoine","De Caunes",2,"suite","oui",(function () {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    d.setHours(18);
    d.setMinutes(0);
    return d;
})());
clients.push(antoine);


form1.addEventListener("submit",(e) => {
    e.preventDefault();

    let fname = document.getElementById("firstname").value;
    let lname = document.getElementById("lastname").value;
    let night = document.getElementById("night").value;
    let roomtype = document.getElementById("roomtype").value;
    let breakfast = document.querySelector('input[name="breakfast"]:checked').value;
    
    let ppl = new client(fname, lname, night, roomtype, breakfast);

    if(ppl.ardate.getHours() < 15){
        invoice.innerHTML = "Client refusée";
        invoice.classList.add("show");
    } else {
        clients.push(ppl)
        invoice.innerHTML = "Client enregistrée";
        invoice.classList.add("show");
        localStorage.setItem("clients", JSON.stringify(clients));
    }
    
    console.table(clients);
})

form2.addEventListener("submit", (e) => {
    e.preventDefault();

    let fname = document.getElementById("firstname-look").value;
    let lname = document.getElementById("lastname-look").value;

    let index = clients.findIndex(client => 
    client.fname.includes(fname) && client.lname.includes(lname)
    );

    if (index !== -1) {
    let result = clients[index];

    let ttc = price(result.night, result.breakfast);
    
    invoice.innerHTML = `Facture du Client : ${result.fname} ${result.lname} : ${ttc}€`;
        invoice.classList.add("show");
        clients.splice(index, 1);
        localStorage.setItem("clients", JSON.stringify(clients));
    } else {
        invoice.innerHTML = "Client introuvable";
        invoice.classList.add("show");
    }
})



