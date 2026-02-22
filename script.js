const btnAll = document.getElementById("btn-all")
const btnInterview = document.getElementById("btn-interview")
const btnRejected = document.getElementById("btn-rejected")

const totalCount = document.getElementById("total-count");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");

const totalJob = document.getElementById("total-job")

const mainContainer = document.getElementById("main-container")

const interViewBtn = document.getElementById("interview-btn")
const rejectedViewBtn = document.getElementById("rejected-btn")

const filterSection = document.getElementById("filter-section")

const jobCount = document.getElementById("available-job")

const deletes = document.getElementById("delete")

const availableStatus = document.getElementById("available-section")

let currentStatus = 'all'

let interviewList = []
let rejectList = []

function updateAvailableStatus() {
    if (
        (currentStatus === "btn-interview" && interviewList.length === 0) ||
        (currentStatus === "btn-rejected" && rejectList.length === 0)
    ) {
        availableStatus.classList.remove("hidden")
    } else {
        availableStatus.classList.add("hidden")
    }
}


function count() {
    totalCount.innerText = mainContainer.children.length
    totalJob.innerText = mainContainer.children.length
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectList.length
}
count()

function updateJobCount() {
    if (currentStatus === "btn-all") {
        totalJob.innerText = mainContainer.children.length
    }
    else if (currentStatus === "btn-interview") {
        totalJob.innerText = interviewList.length + " of " + mainContainer.children.length

    }
    else if (currentStatus === "btn-rejected") {
        totalJob.innerText = rejectList.length + " of " + mainContainer.children.length
    }
}

function available() {

}

function clickBtn(id) {
    currentStatus = id


    btnAll.classList.remove("btn-primary")
    btnInterview.classList.remove("btn-primary")
    btnRejected.classList.remove("btn-primary")

    document.getElementById(id).classList.add("btn-primary")

    if (id === "btn-interview") {
        currentStatus = id

        mainContainer.classList.add("hidden")
        filterSection.classList.remove("hidden")
        jobCount.innerText = 'Interview job'

        renderInterview()
        updateAvailableStatus()
    }
    else if (id === "btn-all") {
        mainContainer.classList.remove("hidden")
        filterSection.classList.add("hidden")
        count()
    }
    if (id === "btn-rejected") {
        currentStatus = id

        mainContainer.classList.add("hidden")
        filterSection.classList.remove("hidden")
        jobCount.innerText = 'Rejected job'

        renderReject()
        updateAvailableStatus()
    }
    updateJobCount()

}

let cardContainer = document.getElementById("card-container")

function styleAdd(id) {
    console.log();
}



mainContainer.addEventListener("click", function (id) {

    if (id.target.classList.contains("delete")) {
        id.target.parentElement.parentElement.parentElement.remove()
        count()
    }
    if (id.target.classList.contains("btn-success")) {
        const parent = id.target.parentNode.parentNode;

        const companyName = parent.querySelector(".company-name").innerText
        const jobName = parent.querySelector(".job-name").innerText
        const salary = parent.querySelector(".salary").innerText
        const status = parent.querySelector(".apply").innerText
        const about = parent.querySelector(".about").innerText

        parent.querySelector(".apply").innerText = "Interview"

        const jobInfo = {
            companyName,
            jobName,
            salary,
            status: "Interview",
            about
        }

        const exist = interviewList.find(item => item.companyName === jobInfo.companyName)
        if (!exist) {
            interviewList.push(jobInfo)
        }

        rejectList = rejectList.filter(item => item.jobName != jobInfo.jobName)


        count()

        id.target.parentNode.parentNode.classList.add("border-l-4", "border-green-400")

    } else if (id.target.classList.contains("btn-error")) {
        const parent = id.target.parentNode.parentNode;

        const companyName = parent.querySelector(".company-name").innerText
        const jobName = parent.querySelector(".job-name").innerText
        const salary = parent.querySelector(".salary").innerText
        const status = parent.querySelector(".apply").innerText
        const about = parent.querySelector(".about").innerText

        parent.querySelector(".apply").innerText = "Rejected"

        const jobInfo = {
            companyName,
            jobName,
            salary,
            status: "Rejected",
            about
        }

        const exist = rejectList.find(item => item.companyName === jobInfo.companyName)
        if (!exist) {
            rejectList.push(jobInfo)
        }

        interviewList = interviewList.filter(item => item.jobName != jobInfo.jobName)

        count()
        
        id.target.parentNode.parentNode.classList.add("border-l-4", "border-red-400")
    }
})


function renderInterview() {
    filterSection.innerHTML = ''

    for (const event of interviewList) {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class=" bg-base-200 p-3 rounded-sm space-y-4  border-l-4 border-green-400">
            <div class=" flex justify-between">
                <div>
                    <h3 class="company-name text-2xl">${event.companyName}</h3>
                    <p class="job-name">${event.jobName}</p>
                </div>
                <div class="btn"><i class="fa-solid fa-trash-can"></i></div>
            </div>
            <p class="salary">${event.salary}</p>
            <p class=" apply bg-base-300 px-2 py-1 inline-block">${event.status}</p>
            <p class="about">${event.about}</p>
            <div>
                <button id="interview-btn" class="btn btn-outline btn-success">INTERVIEW</button>
                <button id="rejected-btn" class="btn btn-outline btn-error">REJECTED</button>
            </div>
        </div>
        `
        filterSection.appendChild(div)
    }
}

function renderReject() {
    filterSection.innerHTML = ''

    for (const event of rejectList) {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class=" bg-base-200 p-3 rounded-sm space-y-4  border-l-4 border-red-400">
            <div class=" flex justify-between">
                <div>
                    <h3 class="company-name text-2xl">${event.companyName}</h3>
                    <p class="job-name">${event.jobName}</p>
                </div>
                <div class="btn"><i class="delete fa-solid fa-trash-can"></i></div>
            </div>
            <p class="salary">${event.salary}</p>
            <p class=" apply bg-base-300 px-2 py-1 inline-block">${event.status}</p>
            <p class="about">${event.about}</p>
            <div>
                <button id="interview-btn" class="btn btn-outline btn-success">INTERVIEW</button>
                <button id="rejected-btn" class="btn btn-outline btn-error">REJECTED</button>
            </div>
        </div>
        `
        filterSection.appendChild(div)
    }
}



filterSection.addEventListener("click", function (id) {
    if (id.target.classList.contains("btn-success")) {
        const parent = id.target.parentNode.parentNode;

        const companyName = parent.querySelector(".company-name").innerText
        const jobName = parent.querySelector(".job-name").innerText
        const salary = parent.querySelector(".salary").innerText
        const status = parent.querySelector(".apply").innerText
        const about = parent.querySelector(".about").innerText

        parent.querySelector(".apply").innerText = "Interview"

        const jobInfo = {
            companyName,
            jobName,
            salary,
            status: "Interview",
            about
        }

        const exist = interviewList.find(item => item.companyName === jobInfo.companyName)
        if (!exist) {
            interviewList.push(jobInfo)
        }

        rejectList = rejectList.filter(item => item.jobName != jobInfo.jobName)

        count()
        updateJobCount()
        updateAvailableStatus()

        if (currentStatus === "btn-rejected") {
            renderReject()
        }


    } else if (id.target.classList.contains("btn-error")) {
        const parent = id.target.parentNode.parentNode;

        const companyName = parent.querySelector(".company-name").innerText
        const jobName = parent.querySelector(".job-name").innerText
        const salary = parent.querySelector(".salary").innerText
        const status = parent.querySelector(".apply").innerText
        const about = parent.querySelector(".about").innerText

        parent.querySelector(".apply").innerText = "Rejected"

        const jobInfo = {
            companyName,
            jobName,
            salary,
            status: "Rejected",
            about
        }

        const exist = rejectList.find(item => item.companyName === jobInfo.companyName)
        if (!exist) {
            rejectList.push(jobInfo)
        }

        interviewList = interviewList.filter(item => item.jobName != jobInfo.jobName)

        count()
        updateJobCount()
        updateAvailableStatus()

        if (currentStatus === "btn-interview") {
            renderInterview()
        }

    }
})


function available() {
    availableStatus.innerHTML = ''

    let availableElement = document.createElement('div')

    availableElement.innerHTML = `
    <div id="available-status" class="max-w-[1440px] mx-auto pt-5 space-y-5 text-center bg-base-200 pt-18
     pb-18 rounded-sm mt-4">
        <img class=" mx-auto" src="./jobs.png" alt="">
        <h3>No jobs available</h3>
        <p>Check back soon for new job opportunities</p>
    </div>
    `

    availableStatus.appendChild(availableElement)
}

