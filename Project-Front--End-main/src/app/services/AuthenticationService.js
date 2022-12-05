import axios from "axios";

class AuthenticationService {
  signin = (username, password) => {
      return axios.post("http://localhost:8082/api/auth/signin", {username, password})
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
  }

  signOut() {
    localStorage.removeItem("user");
  }

  register = async(firstname, lastname, username, email,mobileno, password) => {
    return axios.post("http://localhost:8082/api/auth/signup", {
      firstname,
      lastname,
      username,
      email,
      mobileno,
      password 
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthenticationService();