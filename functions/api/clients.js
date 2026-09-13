import {verifyToken,json} from './_shared.js';

export async function onRequestGet(context){
  const user=await verifyToken(context.env,context.request);

  if(!user){
    return json({error:'Sessão inválida ou expirada.'},401);
  }

  try{
    const {results}=await context.env.DB
      .prepare(`
        SELECT
          id,
          nome,
          telefone,
          whatsapp,
          email,
          endereco,
          cidade,
          estado,
          observacoes,
          vendedor_id,
          criado_em
        FROM clientes
        ORDER BY id DESC
      `)
      .all();

    const clients=(results||[]).map(c=>({
      id:String(c.id),
      name:c.nome||'',
      contact:c.whatsapp||c.telefone||'',
      address:[
        c.endereco,
        c.cidade,
        c.estado
      ].filter(Boolean).join(' - '),
      lastSeller:'',
      createdAt:c.criado_em||null
    }));

    return json({clients});

  }catch(e){
    return json({
      error:e?.message||'Não foi possível carregar os clientes.'
    },500);
  }
}

export async function onRequestPost(context){
  const user=await verifyToken(context.env,context.request);

  if(!user){
    return json({error:'Sessão inválida ou expirada.'},401);
  }

  try{
    const body=await context.request.json();

    const nome=String(body.name||'').trim();
    const contact=String(body.contact||'').trim();
    const address=String(body.address||'').trim();

    if(!nome){
      return json({error:'Informe o nome do cliente.'},400);
    }

    if(body.id){
      await context.env.DB
        .prepare(`
          UPDATE clientes
          SET nome=?,
              telefone=?,
              endereco=?
          WHERE id=?
        `)
        .bind(
          nome,
          contact,
          address,
          Number(body.id)
        )
        .run();

      return json({
        ok:true,
        id:String(body.id)
      });
    }

    const result=await context.env.DB
      .prepare(`
        INSERT INTO clientes
        (nome,telefone,endereco)
        VALUES (?,?,?)
      `)
      .bind(
        nome,
        contact,
        address
      )
      .run();

    return json({
      ok:true,
      id:String(result.meta.last_row_id)
    });

  }catch(e){
    return json({
      error:e?.message||'Não foi possível salvar o cliente.'
    },400);
  }
}

export async function onRequestDelete(context){
  const user=await verifyToken(context.env,context.request);

  if(!user){
    return json({error:'Sessão inválida ou expirada.'},401);
  }

  if(user.role!=='gestor'){
    return json({error:'Apenas gestor pode excluir clientes.'},403);
  }

  try{
    const url=new URL(context.request.url);
    const id=Number(url.searchParams.get('id'));

    if(!id){
      return json({error:'Cliente inválido.'},400);
    }

    await context.env.DB
      .prepare(`DELETE FROM clientes WHERE id=?`)
      .bind(id)
      .run();

    return json({ok:true});

  }catch(e){
    return json({
      error:e?.message||'Não foi possível excluir o cliente.'
    },400);
  }
}
