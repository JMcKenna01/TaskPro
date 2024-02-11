import $ from "./utils/jQuery.js"

let supervisorDropdown = $('#supervisor-dropdown')
let projectDropdown = $('#project-dropdown')
let phaseDropdown = $('#phase-dropdown')
let supervisorLi = $('.supervisor-li')
let projectLi = $('.project-li')
let phaseLi = $('.phase-li')
let createBtn = $('#create-btn')
let updateBtn = $('#update-btn')
let deleteBtn = $('#delete-btn')

const newJobHandler = async (event) => {
  event.preventDefault()

  const name = $('#project-name').val()
  const supervisorId = $(supervisorDropdown).attr('supervisor-id')
  const crewId = $(supervisorDropdown).attr('crew-id')

  const newProject = {
    project_name: name,
    project_super_id:supervisorId,
    crew_id: crewId
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
      document.location.replace('/dashboard/manager')
    } else {
      alert('Failed to created project')
    }
  }
}

const updateJobHandler = async (event) => {
  event.preventDefault()

  const projectToUpdate = $(projectDropdown).attr('project-id')
  const newPhase = $(phaseDropdown).attr('phase-id')


  const updatedProject = {
    project_phase_id: newPhase
  }

  if (projectToUpdate && newPhase) {
    const response = await fetch(`/api/projects/${projectToUpdate}`, {
      method: 'PUT',
      body: JSON.stringify(updatedProject),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      document.location.replace('/dashboard/manager')
    } else {
      alert('Failed to update project')
    }
  }
}

const deleteJobHandler = async (event) => {
  event.preventDefault()

  const projectToDelete = $(projectDropdown).attr('project-id')
  const crewToSum = $(projectDropdown).attr('crew-id')

  if (projectToDelete && crewToSum) {
    await fetch(`/api/users/addPoint/${crewToSum}`,{
      method: 'PUT'
    })

    const response = await fetch(`/api/projects/${projectToDelete}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      document.location.replace('/dashboard/manager')
    } else {
      alert('Failed to delete project')
    }
  }
}

function dropdownSelection (event) {
  let selection = $(event.target).text()
  let selector = $(event.target).attr('class')

  switch (selector) {
    case 'supervisor-li':
      let supervisorSelected = $(event.target).attr('supervisor-id')
      let crewSelected = $(event.target).attr('crew-id')
      $(supervisorDropdown).text(selection)
      $(supervisorDropdown).attr('supervisor-id', supervisorSelected)
      $(supervisorDropdown).attr('crew-id-id', crewSelected)
    break;
    case 'project-li':
      let projectSelected = $(event.target).attr('project-id')
      let projectCrew = $(event.target).attr('crew-id')
      $(projectDropdown).text(selection)
      $(projectDropdown).attr('project-id', projectSelected)
      $(projectDropdown).attr('crew-id', projectCrew)
    break;
    case 'phase-li':
      let phaseSelected = $(event.target).attr('phase-id')
      $(phaseDropdown).text(selection)
      $(phaseDropdown).attr('phase-id', phaseSelected)
    break;
  }
}

createBtn.on('click', newJobHandler)
updateBtn.on('click', updateJobHandler)
deleteBtn.on('click', deleteJobHandler)
supervisorLi.on('click', dropdownSelection)
projectLi.on('click', dropdownSelection)
phaseLi.on('click', dropdownSelection)