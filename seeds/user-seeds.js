import { User } from '../models/Index.js'


const userData = [
  {
    first_name: "Vicente",
    last_name: "Emparan",
    email: "vemparan@gmail.com",
    is_manager: true,
    is_supervisor:false,
    password: "password12345"
  },
  {
    first_name: "Simon",
    last_name: "Bolivar",
    email: "sbolivar@gmail.com",
    is_manager: false,
    is_supervisor:true,
    password: "password12345"
  },
  {
    first_name: "Jose Antonio",
    last_name: "Paez",
    email: "joseap@gmail.com",
    is_manager: false,
    is_supervisor:true,
    password: "password12345"
  },
  {
    first_name: "Led",
    last_name: "Varela",
    email: "ledvarela@gmail.com",
    is_manager: false,
    is_supervisor: false,
    password: "password12345"
  },
  {
    first_name: "Benjamin",
    last_name: "Er'Conde",
    email: "erconde@gmail.com",
    is_manager: false,
    is_supervisor: false,
    password: "password12345"
  },
  {
    first_name: "Daniel",
    last_name: "Pistola",
    email: "dpistola@gmail.com",
    is_manager: false,
    is_supervisor: false,
    password: "password12345"
  },
  {
    first_name: "Victor",
    last_name: "Medina",
    email: "nanutria@gmail.com",
    is_manager: false,
    is_supervisor: false,
    password: "password12345"
  },
  {
    first_name: "Alejandra",
    last_name: "Otero",
    email: "aleotero@gmail.com",
    is_manager: false,
    is_supervisor: false,
    password: "password12345"
  },
  {
    first_name: "Emilio",
    last_name: "Lovera",
    email: "elovera@gmail.com",
    is_manager: false,
    is_supervisor: false,
    password: "password12345"
  }
]


export const seedUsers = () => User.bulkCreate(userData)
