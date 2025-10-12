'use server';

import { signOut } from '@/auth/auth';

export async function signOutFunc() {
	try {
		const res = await signOut({redirect: false});

		return res;
	} catch (error) {
		console.error('Ошибка авторизации:', error);
		throw error;
	}
}
