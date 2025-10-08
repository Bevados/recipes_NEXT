'use server';

import prisma from '@/utils/prisma';

import { IFormData } from '@/types/form-data';
export async function registerUser(data: IFormData) {
  const { email, password, confirmPassword } = data;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return user;
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return { error: 'Ошибка при регистрации пользователя' };
  }
}
