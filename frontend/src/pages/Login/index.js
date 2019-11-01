import React, { useState } from "react";
import api from "../../services/api";
import Notifier from "../Notifier";
import { withRouter, Link } from "react-router-dom";

require("dotenv").config();

export const login = (token, _id) => {
  localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, token);
  localStorage.setItem(process.env.REACT_APP_USER_KEY, _id);
};

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      const { _id } = response.data;
      login(response.data.token, _id);
      props.changeFn();
      //history.push('/dashboard');
      props.history.push("/dashboard");
    } catch (error) {
      if (error.response) {
        setMessageError(error.response.data.message);
      }
    }
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre talentos
        para sua empresa
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          name="email"
          placeholder="Seu melhor email"
          value={email}
          required
          onChange={event => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          required
          onChange={event => setPassword(event.target.value)}
        />
        <button type="submit" className="btn">
          Entrar
        </button>
      </form>
      <br></br>
      <Link to="/register">
        <button className="btn">Registrar</button>
      </Link>
      <Notifier message={messageError}></Notifier>
    </>
  );
};

export default withRouter(Login);
