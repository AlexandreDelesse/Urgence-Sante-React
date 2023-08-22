import React, { useContext } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/shared/Loader";
import { getCrewByCrewId } from "../services/crew.service";
import UserContext from "../contexts/User.context";

export default function ManualLogin() {
  const [form, setForm] = useState({ nom: "", code: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm((old) => ({ ...old, [name]: value }));
  };

  const onButtonClick = async () => {
    try {
      setLoading(true);
      const crewInfos = await getCrewByCrewId(`${form.code}&${form.nom}`);
      setUser(crewInfos);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-center">Authentification</h2>
      {Object.keys(form).map((el) => (
        <Form.Group className="mt-1" key={el}>
          <Form.Label>{el}</Form.Label>
          <Form.Control
            onChange={onChangeForm}
            name={el}
            value={form[el]}
            type="text"
          />
        </Form.Group>
      ))}
      <Button className="mt-3" onClick={onButtonClick}>
        {loading ? <Loader /> : "Login"}
      </Button>
    </div>
  );
}
