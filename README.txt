NOVA IMAGEM ERP V9 - REVISADA
================================

ALTERAÇÕES CONSOLIDADAS
- Orçamento por ambiente com: apenas forro, apenas acabamento e cortina completa.
- Resumo final com ambientes, persianas, deslocamento e totais em 18x, 4x e à vista.
- PDF detalhado e resumido com cabeçalho compacto e tabela RESUMO.
- Persianas inseridas manualmente, sem motor de cálculo, com quantidade por unidade.
- Persiana vira item vinculado ao pedido; custo gerencial derivado por markup de 60%.
- Estoque inicial automático de 500 m por combinação produto/cor definida.
- Tecidos só baixam do estoque quando o orçamento é convertido em pedido.
- Reversão/exclusão de pedido devolve o estoque.
- Gestor pode excluir orçamento, pedido e usuário (built-ins são desativados/reativados).
- Vendedores continuam limitados aos próprios orçamentos/pedidos e sem relatórios gerenciais.
- Ajustes de contraste para evitar textos/botões invisíveis em fundo branco.

IMPORTANTE PARA CLOUDFLARE
Este pacote contém os arquivos de interface enviados da V9. Ele usa /api/auth e /api/data.
MANTENHA no repositório as Functions/API e o binding D1 que já estiverem funcionando no Cloudflare.
Não apague a pasta functions do projeto ao substituir estes arquivos.

Arquivos para substituir na raiz:
- index.html
- app.js
- styles.css
- manifest.json
- _routes.json
- logo-v4.jpg e ícones

Antes de publicar, faça backup da versão atual.
