import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [usercode, setusercode] = useState("");
  const navigate=useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleinputchange = (e) => {
    setusercode(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(usercode);
    console.log("submit");
    try {
      const result = await axios.post("http://localhost:5050/api/login", {
        usercode: usercode
      });
      const id=result.data.user._id;
      console.log('result',result);
      console.log('result user',result.data.user);
      navigate(`/displayNotes/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="container-fluid bg-secondary-subtle d-flex align-items-center p-5"
      style={{ minHeight: "100vh" }}
    >
      <div className="row container-fluid bg-dark p-5 rounded-4">
        <div
          className="bg-dark col-md-7 col-sm-12 p-3 pe-5 "
          style={{ height: "50vh" }}
        >
          <p
            className="display-2 fw-bold my-5 "
            style={{ color: "rgb(80, 207, 169)",fontFamily:"'Lexend Giga',sans-serif"}}
          >
            CopyPal
          </p>
          <p className="fs-4 text-light mb-4">
            A sleek and minimalistic online notepad for seamless text editing
            and sharing. Access your notes from anywhere and collaborate
            effortlessly without the hassle of accounts or downloads"
          </p>
        </div>
        <form
          onSubmit={handlesubmit}
          className="row bg-light col-md-5 col-sm-12 rounded p-4 d-flex flex-column justify-content-center align-items-center bg-light"
          style={{ height: "65vh" }}
        >
          <div className=" fs-3 fw-semibold text-dark mb-4 px-sm-4 px-lg-5" style={{}}>
            Enter the code to access your Notes
          </div>
          <div className="row d-flex align-items-center justify-content-center gap-sm-0 gap-sm-4">
            <div className="row col-lg-8 col-sm-12">
              <input
                type="text"
                placeholder="Enter code here"
                ref={inputRef}
                value={usercode}
                onChange={handleinputchange}
                className="text-secondary form-control-lg mt-3"
              />
            </div>
            <button
              type="submit"
              className="btn border-success btn-outline text-light col-lg-3 col-sm-6 p-2 fs-5 mt-3"
              style={{ backgroundColor: "rgb(80, 207, 169)" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
