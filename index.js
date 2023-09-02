//to store the leads
let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-El")
const delBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocStorage) {
    myLeads = leadsFromLocStorage
    renderLeads(myLeads)
}

//double click on delete button
delBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
})


//click on save tab btn
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})
inputBtn.addEventListener("click", function () {

    myLeads.push(inputEl.value)
    inputEl.value = "" //to clear out the input field

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
})



function renderLeads(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {

        //listItems += "<li><a target = '_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        //template string instead of the above one
        listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
    `
    }

    ulEl.innerHTML = listItems
}