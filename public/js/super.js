import $ from "./utils/jQuery.js"

let projectDropdown = $('#project-dropdown')
let phaseDropdown = $('#phase-dropdown')
let projectLi = $('.project-li')
let phaseLi = $('.phase-li')
let updateBtn = $('#update-btn')

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
      document.location.replace('/dashboard/supervisor')
    } else {
      alert('Failed to create project')
    }
  }
}

function dropdownSelection (event) {
  let selection = $(event.target).text()
  let selector = $(event.target).attr('class')

  switch (selector) {
    case 'project-li':
      let projectSelected = $(event.target).attr('project-id')
      $(projectDropdown).text(selection)
      $(projectDropdown).attr('project-id', projectSelected)
    break;
    case 'phase-li':
      let phaseSelected = $(event.target).attr('phase-id')
      $(phaseDropdown).text(selection)
      $(phaseDropdown).attr('phase-id', phaseSelected)
    break;
  }
}


updateBtn.on('click', updateJobHandler)
projectLi.on('click', dropdownSelection)
phaseLi.on('click', dropdownSelection)
