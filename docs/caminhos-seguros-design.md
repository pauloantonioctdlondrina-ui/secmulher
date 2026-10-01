# Caminhos Seguros — Projeto de protótipo

## 1. Entendimento validado

O projeto propõe uma extensão visualmente integrada ao conceito do Londrina ON para mapear vulnerabilidades urbanas que afetam a segurança preventiva, especialmente de mulheres. O cidadão poderá registrar, confirmar, atualizar e acompanhar pontos vulneráveis em um mapa colaborativo inspirado no Waze. A Prefeitura poderá analisar, priorizar, encaminhar e acompanhar a resolução dos registros.

O protótipo será demonstrativo, sem integração técnica real com o Londrina ON nesta primeira etapa. Ele deverá apresentar os dois lados do serviço: a experiência pública do cidadão e o painel institucional de triagem e encaminhamento.

## 2. Objetivo e não objetivos

### Objetivo

Demonstrar um ciclo colaborativo de prevenção urbana:

**Registro → Validação comunitária → Priorização → Encaminhamento → Execução → Resolução → Confirmação comunitária**

### Não objetivos do MVP

- substituir o atendimento emergencial do 190 ou 153;
- funcionar como canal genérico de denúncia contra pessoas;
- realizar abertura real de chamados em órgãos públicos;
- implementar integração real com APIs, autenticação ou bases do Londrina ON;
- produzir diagnóstico estatístico definitivo da segurança urbana.

## 3. Usuários

### Cidadão

Pode registrar ocorrências de modo identificado ou anônimo, indicar localização, selecionar uma ou mais categorias, escrever uma descrição, anexar foto, confirmar ocorrências existentes, informar resolução e denunciar conteúdo inadequado.

### Equipe institucional

Visualiza o mapa operacional, analisa registros, agrupa duplicidades, revisa prioridade, encaminha para o órgão responsável, atualiza status e mantém o histórico das decisões.

## 4. Categorias iniciais

- Ponto de ônibus vulnerável diante de viela, terreno baldio ou imóvel abandonado;
- iluminação insuficiente em ponto, calçada, travessia ou rota;
- viela, beco ou passagem sem visibilidade;
- terreno baldio ou imóvel abandonado;
- vegetação, poda ou entulho bloqueando luz e visibilidade;
- calçada ou rota de acesso insegura;
- ausência ou falha de câmera, botão ou equipamento de apoio;
- concentração de vulnerabilidades.

O cidadão pode selecionar múltiplas categorias. Exemplo: “ponto de ônibus em frente a terreno baldio, com iluminação insuficiente e vegetação bloqueando a visibilidade”.

## 5. Fluxo público

### Mapa de segurança preventiva

- marcadores por categoria;
- filtros por tipo, status e prioridade;
- agrupamento de ocorrências próximas;
- legenda simples;
- visualização sem dados pessoais.

### Detalhe de ocorrência

Exibe categorias, descrição, imagens, confirmações, última atualização, órgão responsável e status. Ações disponíveis: “Confirmar que continua”, “Informar que foi resolvido” e “Denunciar conteúdo inadequado”.

### Novo registro

O cidadão informa a localização via mapa ou GPS, seleciona categorias, descreve o risco, anexa foto opcional, indica período de maior risco e escolhe registro anônimo ou identificado. O fluxo exibe aviso destacado de que emergências devem ser comunicadas ao 190/153.

## 6. Fluxo institucional

Estados da ocorrência:

**Registrado → Validado pela comunidade → Priorizado → Encaminhado → Em execução → Resolvido**

Uma ocorrência resolvida pode ser reaberta pela comunidade. Cada mudança registra responsável, data, decisão, órgão de destino e justificativa.

## 7. Priorização e encaminhamento

A prioridade combina quatro fatores:

- tipo de vulnerabilidade;
- concentração de riscos no mesmo local;
- quantidade e recência das confirmações;
- contexto territorial, como proximidade de escolas, universidades, terminais, áreas comerciais e rotas de transporte.

Faixas sugeridas: baixa, média, alta e crítica. A classificação crítica deve mostrar os canais 190/153 e não deve criar expectativa de atendimento emergencial pelo protótipo.

Encaminhamento sugerido:

- iluminação, poda, entulho e calçada → zeladoria/serviços urbanos;
- ponto e rota de ônibus → CMTU;
- desenho urbano, alteração de ponto e análise territorial → IPPUL;
- patrulhamento preventivo → Guarda Municipal;
- registros combinados → encaminhamento compartilhado com órgão líder.

## 8. Governança e proteção

Qualquer cidadão poderá confirmar ou atualizar uma ocorrência, com limites, denúncia de abuso e moderação institucional. O mapa público não exibirá nome, telefone ou dados pessoais. Conteúdo ofensivo, acusações nominais e informações sensíveis poderão ser ocultados enquanto aguardam moderação. Localizações sensíveis poderão ser generalizadas.

## 9. Requisitos não funcionais assumidos

- carregar o mapa inicial em poucos segundos;
- permitir uso em conexão móvel instável;
- confirmar se o registro foi salvo, ficou pendente ou falhou;
- limitar e compactar imagens;
- suportar, como referência inicial, dezenas de milhares de registros e centenas de acessos simultâneos;
- permitir configurar categorias, pesos, órgãos e mensagens sem alterar a estrutura do sistema;
- manter trilha de auditoria e separação explícita entre prevenção urbana e emergência.

## 10. Casos de borda

- sugerir agrupamento de registros duplicados;
- permitir ajuste manual de localização imprecisa;
- aceitar prioridade alta com poucas confirmações quando a combinação de riscos for grave;
- permitir reabertura de risco resolvido;
- permitir reencaminhamento quando o órgão não puder atender;
- preservar registro original e histórico em caso de conflito;
- ocultar temporariamente conteúdo denunciado.

## 11. Validação do protótipo

Testar cinco tarefas:

1. registrar um ponto vulnerável;
2. confirmar uma ocorrência;
3. filtrar riscos próximos a um ponto de ônibus;
4. encaminhar uma ocorrência no painel;
5. reabrir um ponto marcado como resolvido.

Critério principal: o usuário deve compreender rapidamente onde está o risco, quem está tratando e qual é o próximo passo.

## 12. Decisão log

| Decisão | Alternativas consideradas | Motivo |
|---|---|---|
| Construir cidadão + painel institucional | Só mapa público; só painel | Demonstra o ciclo completo do serviço |
| Modelo colaborativo inspirado no Waze | Registro tradicional; rotas seguras | Permite confirmações, recorrência e atualização contínua |
| Participação aberta com moderação | Só identificados; totalmente aberta | Equilibra participação, privacidade e controle de abuso |
| Prioridade por gravidade + confirmações | Só quantidade; só avaliação institucional | Evita ignorar riscos graves pouco conhecidos |
| Estados detalhados e reabertura | Fluxo simples | Torna visível a jornada até a solução |
| Infraestrutura + segurança preventiva | Denúncias genéricas | Mantém foco em risco urbano observável |
| Integração visual, sem API real | Integração técnica imediata | Adequado para validar conceito e apresentação |

## 13. Próxima etapa

Após aprovação deste documento, preparar um plano de implementação do protótipo visual, começando pelas telas e dados fictícios antes de qualquer integração técnica.
