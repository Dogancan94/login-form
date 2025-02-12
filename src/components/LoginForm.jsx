import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import axios from "axios";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const errorMessages = {
  email: "Please enter a valid email address",
  password: "Password must be at least 4 characters long",
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({
    email: errorMessages.email,
    password: errorMessages.password,
    terms: true,
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (
      errors.email === null &&
      errors.password === null &&
      errors.terms === false
    ) {
      setIsValid(true);
    }
  }, [form]);

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === "checkbox" ? event.target.checked : value;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      if (value.length >= 4) {
        setErrors({ ...errors, password: null });
      } else {
        setErrors({ ...errors, password: errorMessages.password });
      }
    } else if (name === "email") {
      if (value.includes(".com")) {
        setErrors({ ...errors, email: null });
      } else {
        setErrors({ ...errors, email: errorMessages.email });
      }
    } else if (name === "terms") {
      if (event.target.checked) {
        setErrors({ ...errors, terms: false });
      } else {
        setErrors({ ...errors, terms: true });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      axios
        .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
        .then((res) => {
          const user = res.data.find(
            (item) => item.password == form.password && item.email == form.email
          );
          if (user) {
            setForm(initialForm);
            history.push("/main");
          } else {
            history.push("/error");
          }
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
        />
        {errors.email ? <FormFeedback>{errors.email}</FormFeedback> : null}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
        />
        {errors.password ? (
          <FormFeedback>{errors.password}</FormFeedback>
        ) : null}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={errors.terms}
        />{" "}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
