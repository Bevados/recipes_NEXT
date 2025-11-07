import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Массив путей
  const { pathname } = request.nextUrl;

  // Функция, извещающая и валидирующая jwt токен доступа из cookie. А также ключ секрета для подписи токена
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // Массив защищенных роутов, то есть роуты для которых нужна авторизация
  const protectedRoutes = ['/ingredients'];

  // Проверка, начинается ли путь, куда идет пользователь с одного из защищенных роутов.
  // Если да, проверяем наличие токена, то есть авторизации.
  // Если авторизации нет, редиректим на страницу ошибки.
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const url = new URL('/error', request.url);
      url.searchParams.set('message', 'Недостаточно прав');
      return NextResponse.redirect(url);
    }
  }

  // Если токен есть, пропускаем дальше
  return NextResponse.next();
}

// Определяем config для middleware. matcher указывает на пути, где будет срабатывать middleware
export const config = {
  matcher: ['/ingredients'],
};
