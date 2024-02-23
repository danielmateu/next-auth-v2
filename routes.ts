/*
    * Un array de rutas que son accesibles sin autenticación
    * Estas rutas son accesibles para todos los usuarios
    * @type {string[]}
*/

export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

/*
    * Un array de rutas que usaremos para la autenticación
    * Estas rutas redirigiran los usuarios logueados a /settings
    * @type {string[]}
*/

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
]

/*
    * El prefijo de la API para las rutas de autenticación
    * Las rutas que empiezan con este prefijo son usadas para la autenticación
    * @type {string}
*/

export const apiAuthPrefix = "/api/auth"

/*
    * La ruta a la que redirigir si el usuario está autenticado
    * @type {string}
*/

export const DEFAULT_LOGIN_REDIRECT = "/settings"
