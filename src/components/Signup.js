import React ,{useState}from "react";
import { useNavigate } from "react-router-dom";
function Signup(props) {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name:'',email: "", password: "" });
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = "http://127.0.0.1:5000/api/auth/createuser";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name : credentials.name,  
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert('Sign up Suceesfull','success')

      } else {
        props.showAlert('email already exist or other isse','danger')


      }
    };
  return (
    <div>
      <h1>Create A New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Enter Your Name
          </label>
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter Your Email
          </label>
          <input
            onChange={onChange}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            {" "}
            Enter Your Password
          </label>
          <input
            required
            minLength={5}
            onChange={onChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rpassword" className="form-label">
            {" "}
            Re-Enter Your Password
          </label>
          <input
            required
            minLength={5}
            onChange={onChange}
            type="password"
            className="form-control"
            name="rpassword"
            id="rpassword"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
