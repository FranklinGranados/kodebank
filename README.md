# kodebank - autenticacion con cookies httpOnly

proyecto de practica del bootcamp (kodigo full stack junior, modulo 4). es un sistema de login/registro usando next.js y supabase, enfocado en seguridad: cookies httpOnly, proteccion de rutas con middleware y manejo de sesiones con server actions.

## que hace

- registro de usuarios con confirmacion por correo
- login (si el email o la contrasena estan mal, muestra un mensaje generico, no dice cual de los dos fallo, por seguridad)
- logout, que borra la cookie de sesion desde el servidor
- recuperar contrasena (pedir el correo + cambiar la contrasena)
- middleware que protege /dashboard: si no hay sesion te manda a /login, y si ya estas logueado no te deja entrar de nuevo a /login
- dashboard que muestra el correo del usuario logueado

## como esta armado

la parte mas importante del proyecto son los 3 clientes de supabase, porque cada uno maneja las cookies de forma distinta segun donde se usa:

- `utils/supabase/client.ts` -> para componentes del lado del cliente (navegador)
- `utils/supabase/server.ts` -> para server components y server actions
- `utils/supabase/middleware.ts` -> para el middleware, que corre antes de que cargue cualquier pagina

las cookies son httpOnly (no se pueden leer desde javascript, asi se evita xss) y esto lo maneja automatico la libreria @supabase/ssr, no hay que escribirlo a mano. tampoco se guarda ningun token en localStorage.

## tecnologias

- next.js 16 (app router)
- typescript
- supabase (auth)
- @supabase/ssr
- tailwind css

## como correrlo local

\`\`\`bash
git clone https://github.com/FranklinGranados/NOMBRE_DEL_REPO.git
cd NOMBRE_DEL_REPO
npm install
\`\`\`

crear un archivo `.env.local` en la raiz con esto:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_publishable_key
\`\`\`

en supabase, en authentication > url configuration, agregar como redirect url:
\`\`\`
https://tu-dominio.vercel.app/auth/confirm
\`\`\`

y despues:

\`\`\`bash
npm run dev
\`\`\`

se abre en [http://localhost:3000](http://localhost:3000). si intentas entrar a /dashboard sin haber iniciado sesion, te redirige solo a /login.