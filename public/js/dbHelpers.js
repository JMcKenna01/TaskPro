import $ from "./utils/jQuery.js"

const addBtn = $('#addBtn')
const logInBtn = $('#logInBtn')

export const devLogIn = async (email, password) => {
    try {
        const user =   {
            "email": "elportu@gmail.com",
            "password": "password12345"
          }
        const req = await fetch("/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
    
        const res = await req.json()
        console.log(res)
    } catch (error) {
        console.error("Error:", error)
    }
}

export const logIn = async (email, password) => {
  try {
      const user =   {
          "email": email,
          "password": password
        }
      const req = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
  
      const res = await req.json()
      console.log(res)
  } catch (error) {
      console.error("Error:", error)
  }
}

export const signUp = async (email, password) => {
  try {
      const user =   {
          "email": "elportu@gmail.com",
          "password": "password12345"
        }
      const req = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
  
      const res = await req.json()
      console.log(res)
  } catch (error) {
      console.error("Error:", error)
  }



}

const addTask = async (project_name, phase_id, super_id, manager_id) => {
    try {
        const newTask = {
            "project_name": project_name, 
            "project_phase_id": phase_id, 
            "project_super_id": super_id, 
            "project_manager_id": manager_id
        }
        const req = await fetch("/api/projects/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        })
    
        const res = await req.json()
        console.log("Success:", res)
      } catch (error) {
        console.error("Error:", error)
      }
}

const updateTask = async (id, project_name, phase_id, super_id, manager_id) => {
    try {
        const updatedTask = {
            "project_name": project_name, 
            "project_phase_id": phase_id, 
            "project_super_id": super_id, 
            "project_manager_id": manager_id
        }
        const req = await fetch(`/api/projects/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        })
    
        const res = await req.json()
        console.log("Success:", res)
      } catch (error) {
        console.error("Error:", error)
      }
}

const deleteTask = async (id, project_name, phase_id, super_id, manager_id) => {
    try {
        const req = await fetch(`/api/projects/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
    
        const res = await req.json()
        console.log("Success:", res)
      } catch (error) {
        console.error("Error:", error)
      }
}

addBtn.on('click', addTask)
logInBtn.on('click', logIn)