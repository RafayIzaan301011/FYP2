import React, { FormEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const [person, setPerson] = useState({ name: "", age: 0 });
  //   const nameRef = useRef<HTMLInputElement>(null);
  //   const ageRef = useRef<HTMLInputElement>(null);

  const per = { name: "", age: 0 };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // if (nameRef.current !== null) per.name = nameRef.current.value;
    // if (ageRef.current !== null) per.age = parseInt(ageRef.current.value);
    console.log(person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          {" "}
          Name{" "}
        </label>
        <input
          id="name"
          type="text"
          //ref={nameRef}
          value={person.name}
          className="form-control"
          onChange={(event) => {
            setPerson({ ...person, name: event.target.value });
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          {" "}
          Age{" "}
        </label>
        <input
          id="age"
          type="number"
          //ref={ageRef}
          value={person.age}
          className="form-control"
          onChange={(event) => {
            setPerson({ ...person, age: parseInt(event.target.value) });
          }}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
