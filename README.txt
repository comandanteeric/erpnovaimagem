NOVA IMAGEM ERP V8
==================

ESTRUTURA PARA CLOUDFLARE PAGES

Arquivos de tela ficam na raiz:
- index.html
- styles.css
- app.js
- manifest.json
- logo e ícones

Cloudflare Functions:
- functions/api/auth.js
- functions/api/data.js
- functions/api/_shared.js

CONFIGURAÇÃO OBRIGATÓRIA NO CLOUDFLARE
1. O projeto deve ser publicado como Cloudflare Pages com a pasta functions preservada.
2. Em Settings > Bindings, mantenha/crie o binding D1 com o nome EXATO: DB.
3. Aponte DB para o mesmo banco D1 já usado na versão anterior para manter os dados existentes.
4. Recomenda-se criar a variável/secret NOVA_IMAGEM_SECRET com uma chave longa e privada.
5. Faça novo deploy depois de configurar o binding/secret.

MIGRAÇÃO
- O ERP V8 usa a mesma tabela app_state do D1 anterior.
- Orçamentos, pedidos, clientes e usuários anteriores são preservados.
- Novos campos são acrescentados no JSON: products, suppliers, payables, reworks, priceConfig e settings.

USUÁRIOS BUILT-IN
- VENDAS1: mantém a senha já usada na V7.
- VENDAS2: mantém a senha já usada na V7.
- GESTOR: mantém a senha já usada na V7.
- ERIC.DELGOBO / senha 221281 / Gestor
- LUIZ.SERGIO / senha 220164 / Gestor

MOTOR V8
- Calcula consumo normal por largura e, quando necessário, por altura.
- Acabamento por altura = altura + 10 cm + 10% da altura.
- Calcula tecido, deslizantes, laterais, barras, metros de costura, prega, fixação e instalação.
- 4x = preço-base calculado.
- À vista = 8% de desconto por padrão.
- 18x = 14% de acréscimo por padrão.
- Todos esses parâmetros principais podem ser alterados em Tabela / Preços sem alterar o código.

OBSERVAÇÃO IMPORTANTE
O documento original não informou o custo unitário das tampas do VARÃO WAVE. Por isso o valor inicial está em R$ 0,00 e aparece no Gerenciamento de Preços para o gestor preencher.

VERSÃO
Nova Imagem ERP V8.0 - pacote inicial executável
