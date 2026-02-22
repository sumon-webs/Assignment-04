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


function count() {
    totalCount.innerText = mainContainer.children.length
    totalJob.innerText = mainContainer.children.length
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectList.length
}
count()



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

        parent.querySelector(".apply").innerText = "Apply"

        const jobInfo = {
            companyName,
            jobName,
            salary,
            status: "Apply   ",
            about
        }

        const exist = interviewList.find(item => item.companyName === jobInfo.companyName)
        if (!exist) {
            interviewList.push(jobInfo)
        }

        rejectList = rejectList.filter(item => item.jobName != jobInfo.jobName)


        count()

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

    }
})
