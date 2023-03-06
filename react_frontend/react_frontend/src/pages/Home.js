import React, { useContext, useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AuthContext from "../context/auth";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [skills, setSkills] = useState([]);
  let { user } = useContext(AuthContext);
  let token = localStorage.getItem("jwtToken");

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("http://127.0.0.1:8000/employees/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        setEmployees(data.employees);
        setSkills(data.skills);
        console.log("employee data fetched: ", data);
      } else {
        alert("Something wrong fetching employees");
      }
    }
    fetchData();
  }, []);

  let onChange = (e, i) => {
    // console.log("employee change: ", employees[i][e.target.controlId])
    employees[i][e.target.controlId] = e.target.value;
    setEmployees([...employees]);
  };

  function deleteEmployee(e) {
    console.log("delete employee: ", e.target);
  }

  return (
    <>
      {employees.map((employee, i) => {
        return (
          <div key={i} className="employeeCard">
            <Form onChange={onChange}>
              <Form.Group className="mb-3" controlId="id">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="GUID"
                  disabled
                  defaultValue={employee.id}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  defaultValue={employee.first_name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  defaultValue={employee.last_name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date of Birth"
                  defaultValue={employee.date_of_birth}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Example@gmail.com"
                  defaultValue={employee.email}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="skill_level">
                <Form.Label>Skill</Form.Label>
                <Form.Select defaultValue={employee.skill_level}>
                  {skills.map((skill, k) => {
                    return (
                      <option key={k} value={skill.skill_name}>
                        {skill.skill_name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="active">
                <Form.Check
                  type="checkbox"
                  label="Active"
                  defaultChecked={employee.active}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="age">
                <Form.Control
                  type="number"
                  label="age"
                  defaultValue={employee.age}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
              <Button variant="danger" type="submit" onClick={deleteEmployee}>
                Delete
              </Button>
            </Form>
          </div>
        );
      })}
    </>
  );
};

export default Home;
