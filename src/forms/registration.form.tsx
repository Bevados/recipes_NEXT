'use client';

import React, { useState } from 'react';

import { Button, Form, Input } from '@heroui/react';

import { IFormData } from '@/types/form-data';
import { registerUser } from '@/actions/register';

interface IProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: IProps) => {
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const register = await registerUser(formData);
    console.log('Form submitted:', register);

    onClose();
  }

  return (
    <Form className="w-full" onSubmit={handleSubmit}>
      <Input
        aria-label="Email"
        isRequired
        name="email"
        placeholder="Введите email"
        type="email"
        value={formData.email}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus: outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return 'Email обязателен';
          if (!validateEmail(value)) return 'Неверный формат email';
          return '';
        }}
      />

      <Input
        isRequired
        name="password"
        placeholder="Введите пароль"
        type="password"
        value={formData.password}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus: outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return 'Пароль обязателен';
          if (value.length < 6) return 'Пароль должен быть не менее 6 символов';
          return '';
        }}
      />

      <Input
        isRequired
        name="confirmPassword"
        placeholder="Подтвердите пароль"
        type="password"
        value={formData.confirmPassword}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus: outline-none',
        }}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        validate={(value) => {
          if (!value) return 'Пароль для подтвержденя обязателен';
          if (formData.password !== value) return 'Пароли не совпадают';
          return '';
        }}
      />

      <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
        <Button variant="light" onPress={onClose}>
          Отмена
        </Button>
        <Button color="primary" type="submit">
          Зарегистрироваться
        </Button>
      </div>
    </Form>
  );
};

export default RegistrationForm;
