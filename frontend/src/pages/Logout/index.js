import React from "react";
import { withRouter } from "react-router-dom";
require("dotenv").config();

export const logout = () => {
  localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY);
  localStorage.removeItem(process.env.REACT_APP_USER_KEY);
};

const Logout = props => {
  async function handleSubmit(event) {
    event.preventDefault();
    props.changeStatus();
    logout();
    props.history.push("/");
  }

  return (
    <div>
      <br></br>
      {props.isLogged ? (
        <form onSubmit={handleSubmit}>
          <button type="submit" className="btn">
            Logout
          </button>
        </form>
      ) : null}
    </div>
  );
};
export default withRouter(Logout);
