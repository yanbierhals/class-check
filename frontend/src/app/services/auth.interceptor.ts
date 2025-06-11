import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Pega o token do localStorage
  const authToken = localStorage.getItem('authToken');

  // Se o token existir, clona a requisição e adiciona o cabeçalho
  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    // Passa a requisição clonada para o próximo handler
    return next(authReq);
  }

  // Se não houver token, passa a requisição original
  return next(req);
};