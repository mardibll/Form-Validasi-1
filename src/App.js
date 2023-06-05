import { useState } from "react";
import "./App.css";
import Validator from "validatorjs";

function App() {
  const [errors, seterrors] = useState({});
  const [account, setaccount] = useState({
    email: "",
    password: "",
  });
  const handleChange = async (e) => {
    setaccount({ ...account, [e.target.name]: e.target.value });
    seterrors("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(account);
    let data = {
      email: account.email,
      password: account.password,
    };

    let rules = {
      email: "required|email",
      password: [
        "required",
        "min:8",
        "regex:^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
      ],
    };
    let validation = new Validator(data, rules);
    validation.passes();

    if (validation.fails()) {
      const validationErrors = validation.errors.all();

      // Remove password error if email is empty
      if (validation.hasOwnProperty("email") || !data.email.trim()) {
        delete validationErrors.password;
      }
      seterrors(validationErrors);
    } else {
      // Validation passed, proceed with form submission
      console.log(JSON.stringify(account));
      alert(JSON.stringify(account));
    }
    // if (account.email === "") {
    //   seterrors({ ...errors, email: "email tidak boleh kosong" });
    //   setaccount({ ...account, email: "" });
    // } else if (account.password === "" || account.password !== "abc") {
    //   seterrors({ ...errors, password: "password tidak boleh kosong" });
    //   setaccount({ ...account, password: "" });
    // } else {
    // }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="formPage">
        <h2 style={{ textAlign: "center" }}>Login page</h2>
        <div style={{ paddingBottom: 5, paddingTop: 10 }}>
          <label style={{ color: "white" }}>Email</label>
          <div style={{ paddingTop: 2 }}>
            <input
              name="email"
              type="text"
              value={account.email}
              onChange={handleChange}
              placeholder="Input your email"
              className="input"
            />
          </div>
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div style={{ paddingBottom: 5 }}>
          <label style={{ color: "white" }}>password</label>
          <div style={{ paddingTop: 2 }}>
            <input
              name="password"
              type="password"
              value={account.password}
              onChange={handleChange}
              placeholder="Input your password"
              className="input"
            />
          </div>
          {errors.password && (
            <p style={{ color: "red", width: 200 }}>{errors.password}</p>
          )}
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
