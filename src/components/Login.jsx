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
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
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
      if (value.includes(".com") && value.includes("@")) {
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
      history.push("/success");
    }
  };

  return (
    <>
      <h1 data-testId="cypress-title">Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            cy-data-email="email"
            id="exampleEmail"
            name="email"
            placeholder="Enter your email"
            type="email"
            onChange={handleChange}
            value={form.email}
            invalid={errors.email}
          />
          {errors.email ? (
            <FormFeedback cy-data-email-error="email-error">
              {errors.email}
            </FormFeedback>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            cy-data-password="password"
            id="examplePassword"
            name="password"
            placeholder="Enter your password "
            type="password"
            onChange={handleChange}
            value={form.password}
            invalid={errors.password}
          />
          {errors.password ? (
            <FormFeedback cy-data-password-error="password-error">
              {errors.password}
            </FormFeedback>
          ) : null}
        </FormGroup>
        <FormGroup check>
          <Input
            cy-data-terms="terms"
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
          <Button cy-data-button="sign-in" color="primary" disabled={!isValid}>
            Sign In
          </Button>
        </FormGroup>
      </Form>
    </>
  );
}
