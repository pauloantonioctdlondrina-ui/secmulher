# PRD — Módulo Caminhos Seguros

**Produto:** Londrina ON  
**Módulo:** Caminhos Seguros — mapa colaborativo de segurança preventiva  
**Versão:** 1.0  
**Status:** proposta para validação institucional  
**Responsável pelo produto:** Secretaria da Mulher, em articulação com Guarda Municipal, CMTU, IPPUL e órgãos de zeladoria

## 1. Resumo executivo

O Caminhos Seguros é um módulo do Londrina ON para identificar, validar e encaminhar vulnerabilidades urbanas relacionadas à segurança preventiva, especialmente aquelas que afetam a circulação e a permanência de mulheres nos espaços públicos.

O cidadão visualiza um mapa colaborativo, consulta pontos já sinalizados, confirma riscos que continuam ativos e registra uma nova ocorrência a partir de sua localização. Cada ocorrência pode conter categorias, descrição, localização e fotos. A Prefeitura recebe os registros em um painel operacional, aplica uma prioridade assistida e encaminha a demanda para o órgão responsável.

O módulo não substitui o 190, o 153 ou qualquer canal emergencial. Seu foco é transformar percepção cidadã sobre infraestrutura urbana em informação organizada para prevenção, planejamento e ação pública.

## 2. Problema

Hoje, uma pessoa pode perceber um ponto inseguro — por exemplo, um ponto de ônibus diante de uma viela escura ou de um terreno baldio — sem saber onde registrar, qual órgão deve tratar o problema ou se outras pessoas já identificaram a mesma situação.

Na perspectiva institucional, registros dispersos dificultam a identificação de recorrência, a priorização técnica e o acompanhamento de resultados entre órgãos diferentes.

## 3. Oportunidade

Criar uma camada colaborativa de prevenção urbana no Londrina ON, aproveitando geolocalização, mapa, fotos e encaminhamento interinstitucional para:

- tornar riscos urbanos visíveis;
- reduzir registros duplicados;
- identificar concentração e recorrência de vulnerabilidades;
- orientar patrulhamento preventivo e manutenção urbana;
- dar transparência ao tratamento das demandas;
- apoiar decisões de mobilidade e desenho urbano com perspectiva de gênero.

## 4. Objetivos

### Objetivos do produto

1. Permitir que o cidadão registre um ponto vulnerável em poucos passos.
2. Facilitar a confirmação comunitária de riscos ainda existentes.
3. Organizar ocorrências por localização, categoria, gravidade e status.
4. Sugerir o órgão responsável pelo atendimento.
5. Dar à Prefeitura uma fila de trabalho priorizada e auditável.
6. Mostrar ao cidadão o andamento e o resultado de cada ocorrência.

### Objetivos do MVP de produção

- mapa real de Londrina;
- registro anônimo ou identificado;
- pin de localização do usuário, arrastável para ajuste;
- nome da rua e coordenadas do ponto;
- seleção de múltiplas categorias;
- descrição e upload de fotos;
- confirmação comunitária;
- painel institucional básico;
- status e histórico da ocorrência;
- encaminhamento manual ou assistido para órgãos municipais;
- aviso destacado para emergências 190/153.

## 5. Não objetivos

- substituir canais de emergência;
- receber denúncia nominal contra indivíduos;
- classificar pessoas como suspeitas;
- prometer resposta imediata da Guarda;
- executar automaticamente obras ou alterações de linhas/pontos;
- produzir um índice oficial de criminalidade;
- expor dados pessoais ou a localização residencial do cidadão;
- realizar integração definitiva com sistemas municipais antes de validar o fluxo.

## 6. Usuários e perfis

### Cidadão

Pessoa que identifica uma vulnerabilidade urbana ou deseja confirmar um ponto já registrado. Pode contribuir anonimamente ou criar uma conta para acompanhar suas participações.

**Necessidade principal:** registrar o risco com segurança, clareza e pouco esforço.

### Moderador institucional

Servidor que analisa conteúdo, agrupa duplicidades, oculta abusos e valida se a ocorrência está dentro do escopo do módulo.

**Necessidade principal:** separar contribuição útil de conteúdo inadequado sem apagar o histórico.

### Órgão executor

Equipe da Guarda Municipal, CMTU, IPPUL, zeladoria, iluminação ou outro órgão designado.

**Necessidade principal:** receber ocorrências contextualizadas, com localização, evidências, prioridade e prazo.

### Gestor público

Responsável por acompanhar volume, recorrência, concentração territorial, tempo de atendimento e resultados.

**Necessidade principal:** decidir onde concentrar recursos e articulação institucional.

## 7. Escopo funcional

### 7.1 Mapa público

O mapa deve:

- usar cartografia real;
- exibir pins por categoria, com ícone e cor coerentes;
- exibir o pin “Você” com ícone de usuário e borda pulsante suave;
- permitir zoom, arraste e navegação;
- mostrar a rua correspondente à localização selecionada;
- permitir filtros por categoria, status e prioridade;
- agrupar pontos próximos quando a escala estiver afastada;
- não exibir dados pessoais;
- informar que os dados são preventivos e não emergenciais.

### 7.2 Localização do cidadão

Ao abrir o módulo, o sistema deve solicitar localização somente mediante permissão do navegador. Se a permissão for negada, deve permitir navegação manual e apresentar uma mensagem clara.

O pin do usuário deve:

- ser arrastável;
- abrir o fluxo de novo registro ao ser clicado;
- atualizar latitude, longitude e rua após o arraste;
- manter um indicador visual diferente dos pins de ocorrências;
- não revelar a localização exata do usuário para outros cidadãos.

### 7.3 Novo registro

O fluxo deve permitir:

1. confirmar a localização no mapa;
2. selecionar uma ou mais categorias;
3. informar descrição livre;
4. anexar uma ou mais fotos, conforme limite definido;
5. indicar horário/período de maior risco;
6. escolher registro identificado ou anônimo;
7. revisar os dados antes do envio;
8. receber protocolo e confirmação de salvamento.

O formulário deve exibir, antes do envio: “Este módulo trata de prevenção urbana. Em uma emergência, ligue 190 ou 153.”

### 7.4 Categorias

As categorias iniciais são:

- ponto de ônibus vulnerável;
- iluminação insuficiente;
- viela, beco ou passagem sem visibilidade;
- terreno baldio ou imóvel abandonado;
- vegetação, poda ou entulho bloqueando a visibilidade;
- calçada ou rota de acesso insegura;
- falha ou ausência de equipamento de apoio;
- concentração de vulnerabilidades.

Categorias devem ser combináveis. Exemplo: “ponto de ônibus + terreno baldio + iluminação insuficiente”.

### 7.5 Detalhe de ocorrência

O detalhe deve apresentar:

- título e categorias;
- mapa/localização aproximada;
- carrossel de fotos cidadãs;
- data da última atualização;
- número de confirmações;
- prioridade;
- órgão responsável;
- status atual;
- histórico resumido;
- ações “Confirmar que continua”, “Informar que foi resolvido” e “Denunciar conteúdo inadequado”.

O carrossel deve exibir contador, navegação anterior/próxima, indicador de posição e texto alternativo para cada foto.

### 7.6 Validação comunitária

Qualquer cidadão pode:

- confirmar que o risco continua;
- informar que o risco foi resolvido;
- denunciar conteúdo inadequado;
- adicionar evidência, quando autorizado.

O sistema deve evitar que uma única pessoa gere confirmações ilimitadas. Limites por conta, sessão, dispositivo e intervalo de tempo devem ser definidos na implementação.

### 7.7 Painel institucional

O painel deve oferecer:

- mapa operacional;
- fila de ocorrências;
- filtros por órgão, categoria, bairro, status, prioridade e idade;
- agrupamento de registros duplicados;
- revisão de conteúdo;
- ajuste de prioridade;
- definição de órgão líder e órgãos apoiadores;
- atualização de status;
- registro de justificativa;
- histórico de ações;
- exportação de dados agregados.

## 8. Fluxos principais

### Fluxo A — cidadão registra pelo pin

1. Cidadão abre o mapa.
2. Sistema posiciona o pin “Você” mediante permissão ou usa navegação manual.
3. Cidadão arrasta o pin para o local correto.
4. Sistema atualiza rua e coordenadas.
5. Cidadão clica no pin.
6. Modal abre com localização preenchida.
7. Cidadão seleciona categorias, descreve e anexa foto.
8. Sistema valida campos e mostra aviso de emergência.
9. Registro é salvo como “Registrado”.
10. Sistema exibe protocolo e próximos passos.

### Fluxo B — cidadão consulta ocorrência

1. Cidadão clica em um pin existente.
2. Popup apresenta resumo e ação “Ver detalhes”.
3. Sistema seleciona a ocorrência e atualiza o painel lateral.
4. Cidadão navega pelas fotos e confirma a situação.

### Fluxo C — triagem institucional

1. Ocorrência entra na fila “Registrado”.
2. Moderador verifica escopo, conteúdo e duplicidade.
3. Sistema sugere prioridade e encaminhamento.
4. Servidor confirma ou ajusta a decisão.
5. Ocorrência passa para “Validado pela comunidade” ou “Priorizado”.
6. Órgão líder é definido.
7. Registro é encaminhado e passa para “Em execução”.
8. Órgão informa solução e evidência.
9. Ocorrência passa para “Resolvido”.
10. Comunidade pode reabrir se o risco retornar.

## 9. Estados e regras de negócio

### Estados

`Registrado → Em análise → Validado → Priorizado → Encaminhado → Em execução → Resolvido`

Estados auxiliares: `Duplicado`, `Fora do escopo`, `Aguardando informação`, `Oculto para moderação` e `Reaberto`.

### Prioridade

A prioridade sugerida combina:

- gravidade da categoria;
- número de categorias no mesmo ponto;
- confirmações recentes;
- proximidade de transporte, escolas, universidades e áreas de grande circulação;
- ausência de visibilidade, iluminação ou rota de fuga;
- recorrência do problema.

A decisão final deve permanecer revisável por servidor autorizado. Uma ocorrência grave não pode ficar baixa apenas por ter poucas confirmações.

### Encaminhamento sugerido

| Tipo de risco | Órgão líder sugerido | Apoio possível |
|---|---|---|
| iluminação, poda, entulho, calçada | zeladoria/serviços urbanos | Guarda Municipal |
| ponto ou rota de ônibus | CMTU | IPPUL, Guarda Municipal |
| alteração de ponto ou desenho urbano | IPPUL | CMTU, Secretaria da Mulher |
| patrulhamento preventivo | Guarda Municipal | Secretaria da Mulher |
| risco combinado | órgão definido na triagem | demais órgãos envolvidos |

## 10. Privacidade, segurança e moderação

- Registro anônimo não exibe identidade nem permite rastreamento público.
- Registros identificados usam a conta apenas para acompanhamento e comunicação.
- O mapa público deve generalizar localizações sensíveis quando necessário.
- Fotos devem remover ou ocultar metadados de localização antes da publicação.
- Conteúdo com nomes, acusações, ameaças ou dados pessoais deve ser moderado.
- Toda ação institucional deve registrar usuário, data, alteração e justificativa.
- O sistema deve possuir proteção contra spam, automação abusiva e upload malicioso.
- A política de retenção de fotos e dados deve ser definida com jurídico e encarregado de proteção de dados.

## 11. Requisitos não funcionais

- funcionar em celular e desktop;
- atender WCAG 2.1 AA como objetivo de acessibilidade;
- garantir contraste mínimo de 4,5:1 para texto normal;
- permitir navegação por teclado nos controles não cartográficos;
- disponibilizar alternativa textual para pins e fotos;
- responder ao primeiro carregamento em poucos segundos em rede móvel;
- compactar fotos e impor limite configurável;
- suportar inicialmente dezenas de milhares de ocorrências e centenas de acessos simultâneos;
- possuir logs, monitoramento e alertas de falha;
- manter configuração de categorias, pesos e órgãos fora do código;
- possuir fallback quando geolocalização, mapa ou geocodificação reversa estiverem indisponíveis.

## 12. Métricas de sucesso

### Ativação e uso

- percentual de usuários que conseguem registrar uma ocorrência;
- tempo mediano do início ao envio;
- percentual de registros com localização válida;
- percentual de registros com foto útil;
- número de confirmações por ocorrência.

### Efetividade institucional

- tempo até a triagem;
- tempo até o encaminhamento;
- tempo até a primeira ação;
- tempo até resolução;
- percentual de ocorrências reabertas;
- percentual de encaminhamentos corrigidos por órgão inadequado.

### Qualidade

- taxa de duplicidade;
- taxa de conteúdo moderado;
- taxa de falsos positivos ou fora do escopo;
- satisfação do cidadão após o encerramento;
- disponibilidade e falhas de geolocalização/upload.

## 13. Critérios de aceite do MVP

O MVP será considerado apto para piloto quando:

- o cidadão conseguir localizar e arrastar o pin “Você”;
- a rua e as coordenadas forem atualizadas após o reposicionamento;
- o clique no pin abrir o formulário de ocorrência;
- o formulário aceitar múltiplas categorias, descrição e foto;
- o envio gerar protocolo demonstrativo;
- uma ocorrência existente abrir corretamente pelo mapa e pelo botão “Ver detalhes”;
- o carrossel de fotos funcionar com teclado e leitor de tela;
- o painel institucional listar, filtrar e atualizar ocorrências;
- a prioridade e o encaminhamento puderem ser revisados;
- o aviso 190/153 aparecer no fluxo adequado;
- não houver exposição de dados pessoais no mapa público;
- typecheck, build e testes críticos passarem.

## 14. Fases de entrega

### Fase 0 — protótipo validado

Interface, mapa real, pins, fotos demonstrativas, modal e painel com dados fictícios.

### Fase 1 — piloto controlado

Backend, autenticação opcional, armazenamento de fotos, protocolos, moderação e painel para equipe restrita.

### Fase 2 — integração institucional

Integração com Londrina ON, 156, CMTU, Guarda Municipal, zeladoria e IPPUL; notificações e filas reais.

### Fase 3 — inteligência territorial

Heatmap, análise de recorrência, rotas seguras, relatórios gerenciais e apoio a decisões de urbanismo.

## 15. Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| excesso de denúncias duplicadas | alto | agrupamento geográfico e confirmação comunitária |
| conteúdo acusatório ou ofensivo | alto | moderação, denúncia e política clara de escopo |
| expectativa de resposta emergencial | alto | aviso permanente para 190/153 |
| baixa adesão | médio | fluxo curto, divulgação em bairros e parceiros |
| encaminhamento para órgão errado | médio | matriz de responsabilidade configurável |
| localização imprecisa | médio | pin arrastável, endereço visível e revisão institucional |
| exposição de dados sensíveis | alto | anonimização, generalização e revisão de fotos |
| dependência de serviços externos de mapa | médio | fallback, cache e monitoramento |

## 16. Decisões em aberto

- Qual órgão será formalmente dono da fila de triagem?
- O protocolo será integrado ao 156 ou terá numeração própria?
- Quais equipes poderão alterar prioridade e encaminhamento?
- Qual limite de tamanho, quantidade e retenção das fotos?
- Quais localizações devem ser automaticamente generalizadas?
- Haverá notificações por e-mail, SMS, WhatsApp ou apenas no portal?
- Quais dados poderão ser publicados em relatórios abertos?
- Qual legislação, política de privacidade e termo de uso regerão o módulo?

## 17. Relação com o protótipo atual

O protótipo atual valida a experiência e a linguagem visual, mas ainda usa dados fictícios, fotos demonstrativas e estado local no navegador. Não há persistência, autenticação, moderação real, integração com órgãos municipais ou protocolo de produção.

O próximo passo técnico recomendado é implementar o backend mínimo de ocorrências, usuários, fotos, confirmações, status, órgãos e histórico de auditoria antes de iniciar integrações externas.
