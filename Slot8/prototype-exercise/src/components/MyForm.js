
import React, { useState } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const MyForm = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    gender: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name || form.name.length < 3 || form.name.length > 50) {
      newErrors.name = "Tên phải có từ 3 đến 50 ký tự!";
    }
    if (!form.age || isNaN(form.age) || form.age < 18 || form.age > 100) {
      newErrors.age = "Tuổi phải nằm trong khoảng từ 18 đến 100!";
    }
    if (!form.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Email không đúng định dạng!";
    }
    if (!form.phone || !/^\d{10,15}$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại phải từ 10-15 chữ số!";
    }
    if (!form.agree) {
      newErrors.agree = "Phải đồng ý với điều khoản!";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitted(true);
  };

  return (
    <Container style={{ maxWidth: 600 }}>
      {submitted && Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          Lỗi: Vui lòng kiểm tra các trường hợp lỗi.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
            placeholder="Nhập tên"
          />
          <Form.Text className="text-danger">{errors.name}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAge">
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
            placeholder="Nhập tuổi"
          />
          <Form.Text className="text-danger">{errors.age}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="Nhập email"
          />
          <Form.Text className="text-danger">{errors.email}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
            placeholder="Nhập số điện thoại"
          />
          <Form.Text className="text-danger">{errors.phone}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGender">
          <Form.Label>Giới tính</Form.Label>
          <Form.Select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAgree">
          <Form.Check
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            label="Đồng ý với điều khoản"
            isInvalid={!!errors.agree}
          />
          <Form.Text className="text-danger">{errors.agree}</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">Gửi</Button>
      </Form>
    </Container>
  );
};

MyForm.propTypes = {
  name: function(props, propName, componentName) {
    if (props[propName] && (typeof props[propName] !== 'string' || props[propName].length < 3 || props[propName].length > 50)) {
      return new Error('Tên phải có từ 3 đến 50 ký tự!');
    }
  },
  age: function(props, propName, componentName) {
    if (props[propName] && (isNaN(props[propName]) || props[propName] < 18 || props[propName] > 100)) {
      return new Error('Tuổi phải nằm trong khoảng từ 18 đến 100!');
    }
  },
  email: function(props, propName, componentName) {
    if (props[propName] && !/^\S+@\S+\.\S+$/.test(props[propName])) {
      return new Error('Email không đúng định dạng!');
    }
  },
  phone: function(props, propName, componentName) {
    if (props[propName] && !/^\d{10,15}$/.test(props[propName])) {
      return new Error('Số điện thoại phải từ 10-15 chữ số!');
    }
  },
  gender: PropTypes.oneOf(['Nam', 'Nữ', '']),
  agree: function(props, propName, componentName) {
    if (props[propName] === false) {
      return new Error('Phải đồng ý với điều khoản!');
    }
  },
};

export default MyForm;
