import {signToken,json} from './_shared.js';

export async function onRequestPost(context){
  try{
    const {username,passwordHash}=await context.request.json();

    const u=String(username||'').trim().toUpperCase();
    const p=String(passwordHash||'').trim();

    if(!u || !p){
      return json({error:'Informe usuário e senha.'},400);
    }

    const user=await context.env.DB
      .prepare(`
        SELECT id, usuario, nome, nivel, ativo
        FROM usuarios
        WHERE UPPER(usuario)=?
          AND senha=?
          AND ativo=1
        LIMIT 1
      `)
      .bind(u,p)
      .first();

    if(!user){
      return json({error:'Usuário ou senha inválidos.'},401);
    }

    const tokenUser={
      username:user.usuario,
      role:user.nivel === 'vendas' ? 'sales' : user.nivel,
      name:user.nome || user.usuario
    };

    return json({
      token:await signToken(context.env,tokenUser),
      username:tokenUser.username,
      role:tokenUser.role,
      name:tokenUser.name
    });

  }catch(e){
    return json({error:'Falha ao autenticar.'},400);
  }
}

export function onRequest(){
  return json({error:'Método não permitido.'},405);
}
