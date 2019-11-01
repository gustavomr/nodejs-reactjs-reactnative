import React, { useState } from "react";
import api from "../../services/api";
import Notifier from "../Notifier";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post("/register", { email, password });
      history.push("/");
    } catch (error) {
      if (error.response) {
        setMessageError(error.response.data.message);
      }
    }
  }
  return (
    <>
      <p>
        <strong>Register</strong>
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
        <label htmlFor="email">Password *</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          required
          onChange={event => setPassword(event.target.value)}
        />
        <button type="submit" className="btn">
          Register
        </button>
      </form>
      <Notifier message={messageError}></Notifier>
    </>
  );
}
