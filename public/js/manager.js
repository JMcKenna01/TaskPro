import $ from "./utils/jQuery.js"

let supervisorDropdown = $('#supervisor-dropdown')
let supervisorLi = $('.supervisor-li')
let createBtn = $('#create-btn')

const newJobHandler = async (event) => {
  event.preventDefault()

  const name = $('#project-name').val()
  const supervisorInput = $(supervisorDropdown).text()

  const supervisorReq = await fetch('/api/users/s', {
    method: 'GET'
  })

  const supersArray = await supervisorReq.json()

  let supervisorId

  supersArray.forEach(i => {
    if(supervisorInput === `${i.first_name} ${i.last_name}`){
      supervisorId = i.id
    }
  });

  const newProject = {
    project_name: name,
    project_super_id:supervisorId,
  }

  if (name && supervisorId) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify(newProject),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      document.location.replace('/managerDashboard')
    } else {
      alert('Failed to create project')
    }
  }
}

function selectSupervisor (event) {
  let selection = $(event.target).text()
  $(supervisorDropdown).text(selection)
}

createBtn.on('click', newJobHandler)
supervisorLi.on('click', selectSupervisor)