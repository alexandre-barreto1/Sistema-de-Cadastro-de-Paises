export interface UsuarioAutentificacaoModel {
  login: string;
  nome: string;
  autenticado: boolean;
  administrador: boolean;
  token: string;
}
