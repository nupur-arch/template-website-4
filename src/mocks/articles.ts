import { Article, LiveStat, SplitFlapItem } from "@/types/article";

export const MOCK_AUTHORS = {
  editorial: {
    id: "auth-editorial",
    name: "Redação Movimento na Rotina",
    title: "Equipe Editorial de Conteúdo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Jornalistas e pesquisadores dedicados a traduzir as diretrizes oficiais de saúde e movimento em guias claros, práticos e acessíveis.",
  },
  educador: {
    id: "auth-educador",
    name: "Consultoria em Educação Física",
    title: "Profissionais de Educação Física",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Revisão técnica de exercícios, progressão de carga e segurança motora alinhada ao Guia de Atividade Física para a População Brasileira.",
  },
  fisioterapia: {
    id: "auth-fisio",
    name: "Consultoria em Fisioterapia & Ergonomia",
    title: "Especialistas em Reabilitação & Postura",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Orientações sobre descompressão postural, alívio de tensões do trabalho sentado e prevenção de sobrecarga articular.",
  },
};

export const MOCK_ARTICLES: Article[] = [
  // ==========================================
  // SEÇÃO 1: ATIVIDADES (academia / casa)
  // ==========================================
  {
    id: "art-1",
    slug: "treino-funcional-na-sala-4-exercicios-peso-do-corpo",
    title: "Treino funcional na sala: 4 exercícios com o peso do corpo",
    excerpt:
      "Aprenda uma sequência segura e sem impacto para fortalecer pernas, braços e abdômen usando apenas o espaço livre da sua sala.",
    content: `
# Treino funcional na sala: 4 exercícios com o peso do corpo

*Por Consultoria em Educação Física*

Treinar em casa é uma das maneiras mais eficientes de vencer a barreira da falta de tempo. Sem a necessidade de deslocamentos ou equipamentos caros, você pode ativar os principais grupos musculares usando apenas a gravidade e o peso do próprio corpo.

### Sequência Básica de 4 Exercícios

1. **Sentar e Levantar da Cadeira (Agachamento Guiado)**:
   - Posicione-se em frente a uma cadeira firme. Com os pés alinhados aos ombros, desça o quadril até tocar suavemente o assento e suba estendendo as pernas. Faça 3 séries de 10 a 12 repetições.
2. **Apoio Inclinado na Mesa ou Parede**:
   - Apoie as mãos na largura dos ombros em uma superfície estável. Flexione os cotovelos aproximando o peito e empurre de volta. Protege os ombros e desenvolve força no peitoral e tríceps.
3. **Ponte no Chão (Elevação de Quadril)**:
   - Deitado de barriga para cima com os joelhos dobrados, eleve o quadril contraindo os glúteos. Permaneça 2 segundos no topo e desça com controle.
4. **Marcha Estacionária Suave**:
   - Eleve os joelhos de forma alternada no lugar por 45 segundos, mantendo a postura ereta e a respiração ritmada.

Faça essa sequência duas a três vezes por semana, descansando um minuto entre os exercícios.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Atividades",
    categorySlug: "atividades",
    subtopic: "casa",
    author: MOCK_AUTHORS.educador,
    publishedAt: "2026-11-18T10:00:00Z",
    readTimeMinutes: 3,
    featuredOrder: 1,
    heroRank: "01",
    isBreaking: true,
    isTrending: true,
    trendingRank: 1,
    isEditorsPick: true,
    coverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Pessoa praticando agachamento em casa com luz natural",
    tags: ["Casa", "Funcional", "Iniciantes", "Peso Corporal"],
    stats: { views: 18200, shares: 1420, comments: 84 },
  },
  {
    id: "art-2",
    slug: "como-quebrar-o-tempo-sentado-com-pausas-ativas-em-casa",
    title: "Como quebrar o tempo sentado com pausas ativas em casa",
    excerpt:
      "Passar muitas horas seguidas na cadeira desacelera a circulação. Veja como pequenas pausas de 2 minutos revitalizam o foco e o corpo.",
    content: `
# Como quebrar o tempo sentado com pausas ativas em casa

*Por Consultoria em Fisioterapia & Ergonomia*

O corpo humano não foi feito para ficar estático por períodos contínuos de quatro a seis horas. Mesmo quem pratica exercícios no início da manhã pode sofrer com a rigidez articular se passar o restante do dia completamente parado.

As chamadas **pausas ativas** são pequenas interrupções planejadas que estimulam a circulação periférica e reduzem a fadiga mental.

### Três Movimentos para Fazer a Cada 50 Minutos

- **Elevação de Calcanhares (Panturrilhas)**: Em pé, apoie as mãos na mesa e fique na ponta dos pés por 15 a 20 vezes. As panturrilhas atuam como uma bomba circulatória de retorno venoso.
- **Abertura de Peito e Rotação de Ombros**: Entrelace as mãos atrás das costas e projete o peito para a frente, respirando fundo por 30 segundos.
- **Alongamento do Psoas**: Dê um passo largo para trás, mantenha o tronco reto e flexione levemente o joelho da frente até sentir a parte anterior do quadril alongar.

Defina um alarme suave no relógio ou no computador para lembrá-lo de se levantar.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Atividades",
    categorySlug: "atividades",
    subtopic: "casa",
    author: MOCK_AUTHORS.fisioterapia,
    publishedAt: "2026-11-17T11:00:00Z",
    readTimeMinutes: 2,
    featuredOrder: 2,
    heroRank: "02",
    isTrending: true,
    trendingRank: 2,
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Pausa ativa ao lado da mesa de trabalho",
    tags: ["Casa", "Pausa Ativa", "Home Office", "Circulação"],
    stats: { views: 14500, shares: 980, comments: 46 },
  },
  {
    id: "art-3",
    slug: "primeiro-dia-na-musculacao-como-funciona-o-circuito-basico",
    title: "Primeiro dia na musculação: como funciona o circuito básico",
    excerpt:
      "Entenda a lógica dos aparelhos guiados da academia e como fazer seu treino inicial com tranquilidade e sem medo de errar.",
    content: `
# Primeiro dia na musculação: como funciona o circuito básico

*Por Consultoria em Educação Física*

Entrar em uma sala de musculação pela primeira vez pode causar certa apreensão diante de tantas máquinas e termos técnicos. No entanto, os aparelhos modernos foram desenhados justamente para guiar a trajetória do movimento e proteger as articulações dos iniciantes.

### A Estrutura de um Treino Introdutório

Em geral, os professores da academia prescrevem um circuito geral que envolve os maiores grupos musculares:

1. **Leg Press ou Cadeira Extensora**: Foco na musculatura das coxas com trajetória guiada.
2. **Puxada Frontal na Polia**: Trabalha a musculatura das costas e melhora a postura dos ombros.
3. **Supino na Máquina (Chest Press)**: Exercício para o peitoral com apoio total das costas.
4. **Cadeira Flexora**: Fortalece a parte posterior das coxas.
5. **Abdominal na Máquina ou Colchonete**: Estabilização do tronco.

### Dicas de Ouro para o Primeiro Mês

- Não se preocupe com o peso: o objetivo das primeiras semanas é aprender a mecânica do exercício e a coordenação motora.
- Peça sempre a demonstração do instrutor da sala para ajustar a altura dos pinos e bancos.
- Descanse entre 45 e 60 segundos entre cada série para recuperar a respiração.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Atividades",
    categorySlug: "atividades",
    subtopic: "academia",
    author: MOCK_AUTHORS.educador,
    publishedAt: "2026-11-16T14:30:00Z",
    readTimeMinutes: 3,
    featuredOrder: 3,
    heroRank: "03",
    isTrending: true,
    trendingRank: 3,
    isPhotoStory: true,
    photoStoryAngle: "Despertar Urbano",
    coverImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Aparelhos de musculação alinhados em sala de treino",
    tags: ["Academia", "Musculação", "Iniciantes", "Aparelhos"],
    stats: { views: 22100, shares: 1840, comments: 112 },
  },
  {
    id: "art-4",
    slug: "ergonomia-nos-aparelhos-como-ajustar-banco-e-encosto-na-academia",
    title: "Ergonomia nos aparelhos: como ajustar banco e encosto na academia",
    excerpt:
      "Ajustar a altura correta do banco faz toda a diferença para evitar dores articulares e direcionar o esforço ao músculo certo.",
    content: `
# Ergonomia nos aparelhos: como ajustar banco e encosto na academia

*Por Consultoria em Fisioterapia & Ergonomia*

Um dos erros mais comuns em academias é sentar no aparelho sem alterar o ajuste deixado pelo usuário anterior. Como cada pessoa possui alturas e comprimentos de membros diferentes, treinar com uma máquina desregulada pode sobrecarregar tendões e ligamentos.

### Pontos de Atenção nos Ajustes

- **Eixo de Rotação da Máquina**: Em aparelhos como a cadeira extensora e flexora, o ponto circular móvel do aparelho deve ficar perfeitamente alinhado com a linha dos seus joelhos.
- **Altura do Assento no Supino Máquina**: As manoplas de apoio devem ficar alinhadas com a linha média do peito, nunca acima da linha dos ombros.
- **Apoio dos Pés no Chão**: Certifique-se de que seus pés fiquem bem firmes no solo ou na plataforma do aparelho para garantir estabilidade à coluna.

Gastar 10 segundos ajustando os pinos garante um treino mais confortável, seguro e eficaz.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Atividades",
    categorySlug: "atividades",
    subtopic: "academia",
    author: MOCK_AUTHORS.fisioterapia,
    publishedAt: "2026-11-15T09:15:00Z",
    readTimeMinutes: 3,
    featuredOrder: 4,
    heroRank: "04",
    isTrending: true,
    trendingRank: 4,
    coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Pessoa ajustando aparelho de musculação com atenção",
    tags: ["Academia", "Ergonomia", "Postura", "Segurança"],
    stats: { views: 16400, shares: 1120, comments: 58 },
  },

  // ==========================================
  // SEÇÃO 2: EQUIPAMENTOS (vestuario / acessorios)
  // ==========================================
  {
    id: "art-5",
    slug: "como-escolher-o-tenis-ideal-para-caminhada-e-corrida-leve",
    title: "Como escolher o tênis ideal para caminhada e corrida leve",
    excerpt:
      "Descubra o que realmente importa na hora de comprar um tênis de caminhada: estabilidade, conforto e espaço para os dedos, sem gastar fortunas.",
    content: `
# Como escolher o tênis ideal para caminhada e corrida leve

*Por Redação Movimento na Rotina*

Muitas pessoas acreditam que precisam comprar o modelo mais caro da vitrine para começar a caminhar ou trotar. Na prática, o calçado ideal para o dia a dia não depende de placas de carbono ou tecnologias avançadas, mas sim de **conforto biomecânico e firmeza no calcanhar**.

### Critérios Práticos para a Escolha

1. **Espaço na Frente (Biqueira)**:
   - Seus dedos precisam de cerca de 1 centímetro de folga entre a ponta do dedão e o calçado. Durante a caminhada contínua, os pés acumulam sangue e incham levemente.
2. **Estabilidade no Calcanhar**:
   - A parte traseira do tênis deve segurar o osso calcâneo com firmeza, sem escorregar ao dar cada passo.
3. **Amortecimento Moderado**:
   - Um solado excessivamente mole pode instabilizar os tornozelos. Prefira espumas que ofereçam absorção de impacto sem perder a sensação de contato com o chão.
4. **Horário de Provar o Calçado**:
   - Sempre experimente tênis no final da tarde ou à noite, quando seus pés já estão ligeiramente mais dilatados pela rotina diária.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Equipamentos",
    categorySlug: "equipamentos",
    subtopic: "vestuario",
    author: MOCK_AUTHORS.editorial,
    publishedAt: "2026-11-14T15:20:00Z",
    readTimeMinutes: 3,
    featuredOrder: 5,
    heroRank: "05",
    isTrending: true,
    trendingRank: 5,
    isEditorsPick: true,
    coverImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Tênis esportivo amarrado com solado em terreno urbano",
    tags: ["Vestuário", "Tênis", "Caminhada", "Equipamentos"],
    stats: { views: 24900, shares: 1980, comments: 130 },
  },
  {
    id: "art-6",
    slug: "roupas-respiraveis-o-que-vestir-em-dias-de-calor-ou-frio",
    title: "Roupas respiráveis: o que vestir em dias de calor ou frio no Brasil",
    excerpt:
      "Entenda por que tecidos sintéticos como poliamida e poliéster superam o algodão na evaporação do suor e no conforto térmico.",
    content: `
# Roupas respiráveis: o que vestir em dias de calor ou frio no Brasil

*Por Redação Movimento na Rotina*

A escolha do vestuário esportivo impacta diretamente a regulação da temperatura do corpo. Em um país tropical como o Brasil, o principal mecanismo de resfriamento corporal durante o exercício é a **evaporação do suor**.

### Algodão vs. Tecidos Técnicos

- **O Problema do Algodão**: O algodão retém a umidade em suas fibras. Conforme você se exercita, a camiseta fica pesada, encharcada e passa a provocar atrito contra a pele, aumentando o risco de assaduras.
- **Vantagens da Poliamida e Poliéster**: As fibras sintéticas não absorvem água: elas transportam o suor da superfície da pele para a face externa do tecido, onde o vento facilita a evaporação rápida.

### Dicas para Dias Quentes e Dias Frescos

- **No Calor**: Prefira regatas ou camisetas leves em cores claras, bermudas soltas e boné para proteção solar.
- **Em Dias Mais Frios**: Use camadas finas. É comum sentir frio nos primeiros cinco minutos e logo em seguida o corpo aquecer com o movimento.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Equipamentos",
    categorySlug: "equipamentos",
    subtopic: "vestuario",
    author: MOCK_AUTHORS.editorial,
    publishedAt: "2026-11-13T12:00:00Z",
    readTimeMinutes: 2,
    featuredOrder: 6,
    heroRank: "06",
    isTrending: true,
    trendingRank: 6,
    coverImage: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Roupas leves de treino adequadas ao clima ameno",
    tags: ["Vestuário", "Tecidos", "Conforto", "Corrida"],
    stats: { views: 13200, shares: 790, comments: 39 },
  },
  {
    id: "art-7",
    slug: "colchonete-elasticos-e-garrafa-acessorios-que-valem-a-pena",
    title: "Colchonete, elásticos e garrafa: os acessórios que valem a pena",
    excerpt:
      "Monte um kit básico e compacto para se exercitar em qualquer lugar gastando pouco e ocupando quase nenhum espaço no armário.",
    content: `
# Colchonete, elásticos e garrafa: os acessórios que valem a pena

*Por Consultoria em Educação Física*

Você não precisa lotar a sua casa com anilhas pesadas, barras ou esteiras ergométricas volumosas que acabam virando cabide de roupas. Alguns acessórios simples, compactos e acessíveis ampliam muito a variedade de exercícios possíveis.

### Os 3 Acessórios Essenciais

1. **Tapete de Exercício ou Colchonete (Mat)**:
   - Proporciona conforto para exercícios de solo, pranchas e alongamentos, protegendo joelhos, cotovelos e coluna de pisos frios ou duros.
2. **Faixas Elásticas (Mini Bands & Super Bands)**:
   - Fáceis de guardar e transportar, as faixas elásticas adicionam resistência progressiva em agachamentos, abduções de quadril e puxadas para as costas.
3. **Garrafa Térmica Reutilizável de Água**:
   - Manter a hidratação ao alcance da mão evita interrupções no treino e ajuda a monitorar o volume de água consumido ao longo do dia.

Com esses três itens, você tem uma verdadeira academia portátil para treinar na sala, no parque ou em viagens.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Equipamentos",
    categorySlug: "equipamentos",
    subtopic: "acessorios",
    author: MOCK_AUTHORS.educador,
    publishedAt: "2026-11-12T16:15:00Z",
    readTimeMinutes: 3,
    featuredOrder: 7,
    heroRank: "07",
    isTrending: true,
    trendingRank: 7,
    isPhotoStory: true,
    photoStoryAngle: "Orlas & Parques",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Acessórios de treino organizados sobre tapete",
    tags: ["Acessórios", "Elásticos", "Casa", "Equipamentos"],
    stats: { views: 19800, shares: 1540, comments: 95 },
  },
  {
    id: "art-8",
    slug: "relogio-e-pedometro-como-usar-a-contagem-de-passos-a-seu-favor",
    title: "Relógio e pedômetro: como usar a contagem de passos a seu favor",
    excerpt:
      "Aprenda a transformar o contador de passos do celular ou smartwatch em um aliado motivador, sem ansiedade ou cobranças irreais.",
    content: `
# Relógio e pedômetro: como usar a contagem de passos a seu favor

*Por Redação Movimento na Rotina*

Dispositivos vestíveis e aplicativos de celular tornaram a medição do movimento algo automático no dia a dia. Saber quantos passos você dá ajuda a criar consciência sobre o quanto você passa parado entre o trabalho e o lazer.

No entanto, o objetivo do pedômetro deve ser **o monitoramento do seu próprio progresso**, e não uma meta rígida que cause frustração.

### Como Estabelecer uma Meta Realista

- **Meça sua linha de base por 3 dias**: Observe quantos passos você costuma dar na sua rotina habitual sem tentar mudar nada (por exemplo, 3.500 passos).
- **Adicione 1.000 passos na primeira semana**: Uma volta a mais no quarteirão ou descer um ponto antes no ônibus adiciona de 1.000 a 1.500 passos com facilidade.
- **Comemore a regularidade**: Mais vale manter 6.000 passos todos os dias do que atingir 12.000 no domingo e ficar estagnado de segunda a sexta.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Equipamentos",
    categorySlug: "equipamentos",
    subtopic: "acessorios",
    author: MOCK_AUTHORS.editorial,
    publishedAt: "2026-11-11T08:45:00Z",
    readTimeMinutes: 3,
    featuredOrder: 8,
    heroRank: "08",
    isTrending: true,
    trendingRank: 8,
    coverImage: "https://images.unsplash.com/photo-1510519138161-58444cbfdb7d?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Relógio inteligente marcando passos no pulso",
    tags: ["Acessórios", "Passos", "Smartwatch", "Metas"],
    stats: { views: 17600, shares: 1210, comments: 64 },
  },

  // ==========================================
  // SEÇÃO 3: INICIAÇÃO (planejamento / orientacao)
  // ==========================================
  {
    id: "art-9",
    slug: "como-montar-uma-rotina-semanal-que-cabe-no-seu-tempo",
    title: "Como montar uma rotina semanal de exercícios que cabe no seu tempo",
    excerpt:
      "Sem agendas impossíveis: veja como planejar de dois a três blocos semanais de movimento compatíveis com trabalho, família e estudo.",
    content: `
# Como montar uma rotina semanal de exercícios que cabe no seu tempo

*Por Redação Movimento na Rotina*

O principal motivo de abandono de programas de treino não é a preguiça, mas o planejamento incompatível com a rotina real. Quando alguém que não se exercitava tenta agendar treinos de segunda a sábado por uma hora e meia, o primeiro imprevisto profissional ou familiar quebra o plano e gera a falsa sensação de fracasso.

### O Modelo Realista de 3 Dias

Para construir um hábito sustentável, comece com **três compromissos semanais não consecutivos**:

- **Segunda-feira (20 a 30 min)**: Treino de força funcional com peso corporal ou caminhada acelerada.
- **Quarta-feira (20 a 30 min)**: Exercícios de mobilidade e fortalecimento do core.
- **Sábado (30 a 45 min)**: Atividade livre ao ar livre (caminhada no parque, bicicleta leve ou natação).

Ao tratar esses horários com a mesma prioridade de uma consulta médica, você cria uma base sólida que protege sua saúde sem sobrecarregar sua rotina.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Iniciação",
    categorySlug: "iniciacao",
    subtopic: "planejamento",
    author: MOCK_AUTHORS.editorial,
    publishedAt: "2026-11-10T14:00:00Z",
    readTimeMinutes: 3,
    featuredOrder: 9,
    heroRank: "09",
    isTrending: true,
    trendingRank: 9,
    isEditorsPick: true,
    coverImage: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Agenda de planejamento e bloco de anotações com caneta",
    tags: ["Planejamento", "Iniciação", "Organização", "Rotina"],
    stats: { views: 25400, shares: 2100, comments: 144 },
  },
  {
    id: "art-10",
    slug: "a-regra-dos-15-minutos-por-que-comecar-pequeno-garante-o-sucesso",
    title: "A regra dos 15 minutos: por que começar pequeno garante o sucesso",
    excerpt:
      "Descubra por que blocos curtos de quinze minutos vencem a resistência cerebral e constroem a consistência que transforma o corpo a longo prazo.",
    content: `
# A regra dos 15 minutos: por que começar pequeno garante o sucesso

*Por Consultoria em Educação Física*

Grandes metas costumam provocar paralisia por sobrecarga mental. Dizer a si mesmo que precisa fazer um treino pesado de 60 minutos exige um esforço motivacional gigantesco após um dia cansativo de trabalho.

A **regra dos 15 minutos** quebra essa resistência:

1. **Baixo atrito inicial**: Quinze minutos representam apenas 1% do seu dia. É um período curto o bastante para que seu cérebro não encontre justificativas para adiar.
2. **Eficiência fisiológica**: Se você mantiver 15 minutos de exercício por dia durante 30 dias, somará 450 minutos de movimento no mês — o suficiente para colher melhorias comprovadas na pressão arterial e nos níveis de energia.
3. **Vitória diária**: Concluir o bloco planejado gera sensação de conquista e reforça sua identidade como uma pessoa ativa.

Comece pequeno para não parar nunca.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Iniciação",
    categorySlug: "iniciacao",
    subtopic: "planejamento",
    author: MOCK_AUTHORS.educador,
    publishedAt: "2026-11-09T17:30:00Z",
    readTimeMinutes: 2,
    featuredOrder: 10,
    heroRank: "10",
    isTrending: true,
    trendingRank: 10,
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Cronômetro marcando tempo com serenidade",
    tags: ["Planejamento", "Consistência", "Iniciação", "Hábito"],
    stats: { views: 20500, shares: 1680, comments: 89 },
  },
  {
    id: "art-11",
    slug: "avaliacao-fisica-inicial-o-que-observar-antes-de-comecar",
    title: "Avaliação física inicial: o que observar antes de começar",
    excerpt:
      "Saiba quais aspectos da sua saúde merecem atenção médica prévia e como uma anamnese simples previne surpresas desagradáveis.",
    content: `
# Avaliação física inicial: o que observar antes de começar

*Por Consultoria em Fisioterapia & Ergonomia*

Retomar as atividades físicas é uma das decisões mais benéficas para o bem-estar e a longevidade. Ainda assim, para adultos que passaram anos no sedentarismo, uma checagem inicial de saúde é um passo inteligente de responsabilidade consigo mesmo.

### Principais Aspectos a Considerar

- **Histórico Cardiovascular**: Sintomas como dores no peito durante esforços comuns, tonturas frequentes ou histórico familiar precoce de cardiopatias merecem consulta médica antes de iniciar treinos vigorosos.
- **Limitações Articulares e Coluna**: Dores prévias nos joelhos, quadris ou coluna lombar devem ser informadas ao professor para adaptação dos ângulos e amplitudes.
- **Pressão Arterial e Glicemia**: Conhecer seus parâmetros basais ajuda a adequar a intensidade e a hidratação durante os treinos.

Exercício seguro é aquele feito com autoconhecimento e respeito ao ritmo de recuperação do corpo.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Iniciação",
    categorySlug: "iniciacao",
    subtopic: "orientacao",
    author: MOCK_AUTHORS.fisioterapia,
    publishedAt: "2026-11-08T10:20:00Z",
    readTimeMinutes: 3,
    featuredOrder: 11,
    heroRank: "11",
    coverImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Consulta e verificação de saúde com acolhimento",
    tags: ["Orientação", "Saúde", "Avaliação Física", "Segurança"],
    stats: { views: 15900, shares: 1040, comments: 52 },
  },
  {
    id: "art-12",
    slug: "intensidade-leve-moderada-e-vigorosa-como-identificar-seu-ritmo",
    title: "Intensidade leve, moderada e vigorosa: como identificar seu ritmo",
    excerpt:
      "Aprenda o 'teste da conversa' para medir a intensidade do seu exercício sem precisar de aparelhos complexos ou fórmulas matemáticas.",
    content: `
# Intensidade leve, moderada e vigorosa: como identificar seu ritmo

*Por Consultoria em Educação Física*

As diretrizes do Ministério da Saúde recomendam que adultos acumulem pelo menos **150 a 300 minutos de atividade física moderada por semana**, ou **75 a 150 minutos de intensidade vigorosa**. Mas como saber em qual zona você está se exercitando?

O método mais simples e prático é o chamado **Teste da Conversa**:

1. **Intensidade Leve**:
   - A respiração fica tranquila e você consegue conversar e cantarolar normalmente durante o movimento (exemplo: caminhada relaxada na calçada).
2. **Intensidade Moderada (A zona recomendada para a maioria)**:
   - A respiração acelera e o corpo aquece. Você consegue falar frases completas, mas **não consegue cantar** sem perder o fôlego (exemplo: caminhada rápida em subida suave ou pedalada constante).
3. **Intensidade Vigorosa**:
   - A respiração é profunda e ofegante. Você só consegue falar poucas palavras soltas antes de precisar puxar o ar (exemplo: trote rápido ou subida de escadas com ritmo).

Para a saúde geral e longevidade, a intensidade moderada é a mais sustentável e segura para se manter durante todo o ano.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Iniciação",
    categorySlug: "iniciacao",
    subtopic: "orientacao",
    author: MOCK_AUTHORS.educador,
    publishedAt: "2026-11-07T13:45:00Z",
    readTimeMinutes: 3,
    featuredOrder: 12,
    heroRank: "12",
    coverImage: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Pessoas caminhando com ritmo e boa disposição",
    tags: ["Orientação", "Intensidade", "Frequência", "Iniciação"],
    stats: { views: 18700, shares: 1390, comments: 76 },
  },

  // ==========================================
  // SEÇÃO 4: SERVIÇOS (academias / profissionais)
  // ==========================================
  {
    id: "art-13",
    slug: "como-escolher-uma-academia-perto-de-casa-sem-cair-em-armadilhas",
    title: "Como escolher uma academia perto de casa sem cair em armadilhas",
    excerpt:
      "A distância até a academia é o fator número um que define a frequência. Veja o que verificar antes de assinar planos anuais longos.",
    content: `
# Como escolher uma academia perto de casa sem cair em armadilhas

*Por Redação Movimento na Rotina*

Quantas pessoas você conhece que pagaram um plano anual de academia, frequentaram apenas duas semanas e passaram o restante do ano pagando mensalidades sem ir?

Para não cair nessa armadilha, observe critérios práticos antes de assinar qualquer contrato:

### O Que Avaliar na Escolha

- **Localização Conveniente**: A academia precisa ficar a no máximo 10 a 15 minutos da sua casa ou do seu local de trabalho. Se exigir trânsito pesado para chegar, a chance de desistência em dias chuvosos é imensa.
- **Lotação nos Seus Horários Reais**: Visite o espaço exatamente no horário em que pretende treinar (por exemplo, 18h30 ou 07h00) para conferir se há filas em aparelhos e esteiras.
- **Atenção dos Instrutores de Salão**: Observe se os professores estão circulando e corrigindo posturas ou apenas olhando para celulares.
- **Opte por Planos Mensais no Início**: Mesmo que o plano mensal seja ligeiramente mais caro por mês, ele permite testar sua real adesão antes de assumir fidelidades contratuais de 12 meses.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Serviços",
    categorySlug: "servicos",
    subtopic: "academias",
    author: MOCK_AUTHORS.editorial,
    publishedAt: "2026-11-06T15:00:00Z",
    readTimeMinutes: 3,
    featuredOrder: 13,
    heroRank: "13",
    coverImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Recepção de academia organizada e acolhedora",
    tags: ["Academias", "Serviços", "Escolha", "Dicas"],
    stats: { views: 21300, shares: 1720, comments: 98 },
  },
  {
    id: "art-14",
    slug: "academias-publicas-e-pracas-esportivas-como-aproveitar",
    title: "Academias públicas e praças esportivas: como aproveitar os espaços abertos",
    excerpt:
      "As 'academias da terceira idade' e barras de parques públicos são excelentes recursos gratuitos para se exercitar ao ar livre.",
    content: `
# Academias públicas e praças esportivas: como aproveitar os espaços abertos

*Por Consultoria em Educação Física*

Muitas cidades brasileiras contam com praças equipadas com aparelhos de ginástica ao ar livre, pistas de caminhada e barras de calistenia. Esses espaços públicos são recursos democráticos para quem deseja se movimentar sem custos.

### Boas Práticas ao Treinar em Praças

- **Verificação de Segurança**: Confira se os aparelhos estão bem fixados e sem partes enferrujadas ou soltas antes de apoiar todo o peso.
- **Aproveite as Pistas de Caminhada**: Muitas praças oferecem piso plano e arborizado, perfeito para acumular passos pela manhã ou no fim de tarde.
- **Proteção Solar e Horários Apropriados**: Evite horários de sol a pino (entre 10h e 16h). Use protetor solar, boné e leve sua própria garrafa de água fresca.
- **Convivência Comunitária**: Espaços públicos promovem interação social, o que comprovadamente aumenta a motivação e a sensação de pertencimento.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Serviços",
    categorySlug: "servicos",
    subtopic: "academias",
    author: MOCK_AUTHORS.educador,
    publishedAt: "2026-11-05T09:40:00Z",
    readTimeMinutes: 2,
    featuredOrder: 14,
    heroRank: "14",
    coverImage: "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Praça esportiva ao ar livre em dia ensolarado",
    tags: ["Academias", "Parques", "Espaço Público", "Gratuito"],
    stats: { views: 16100, shares: 1190, comments: 62 },
  },
  {
    id: "art-15",
    slug: "quando-procurar-um-educador-fisico-e-quando-buscar-um-fisioterapeuta",
    title: "Quando procurar um educador físico e quando buscar um fisioterapeuta",
    excerpt:
      "Entenda o papel complementar de cada especialista para saber a quem recorrer na hora de prevenir dores ou potencializar treinos.",
    content: `
# Quando procurar um educador físico e quando buscar um fisioterapeuta

*Por Consultoria em Fisioterapia & Ergonomia*

Tanto o profissional de Educação Física quanto o Fisioterapeuta são peças fundamentais para a saúde e o movimento humano, mas suas atuações têm objetivos clínicos e funcionais complementares:

### O Fisioterapeuta
- **Quando procurar**: Se você sente dores agudas que impedem movimentos básicos, acabou de passar por uma cirurgia articular ou foi diagnosticado com lesões teciduais (como hérnias de disco agudas ou tendinopatias com inflamação severa).
- **Foco de atuação**: Diagnóstico funcional, alívio de dor, restauração da mobilidade articular e reabilitação de tecidos lesionados.

### O Profissional de Educação Física
- **Quando procurar**: Quando você busca condicionamento cardiovascular, ganho de força muscular, emagrecimento saudável, preparação para corridas e manutenção da saúde geral.
- **Foco de atuação**: Prescrição de sobrecargas progressivas, planejamento de rotinas de treino e aprimoramento do desempenho físico.

O melhor cenário ocorre quando esses dois profissionais dialogam, garantindo que você supere limitações e progrida com total segurança.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Serviços",
    categorySlug: "servicos",
    subtopic: "profissionais",
    author: MOCK_AUTHORS.fisioterapia,
    publishedAt: "2026-11-04T16:00:00Z",
    readTimeMinutes: 3,
    featuredOrder: 15,
    heroRank: "15",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Profissional de saúde orientando movimento com cuidado",
    tags: ["Profissionais", "Fisioterapia", "Educação Física", "Saúde"],
    stats: { views: 23500, shares: 1910, comments: 120 },
  },
  {
    id: "art-16",
    slug: "a-importancia-da-orientacao-profissional-para-corrigir-sua-postura",
    title: "A importância da orientação profissional para corrigir sua postura",
    excerpt:
      "Ter alguém qualificado para checar seus ângulos articulares evita compensações musculares que costumam cobrar a conta no futuro.",
    content: `
# A importância da orientação profissional para corrigir sua postura

*Por Consultoria em Educação Física*

Com a facilidade de vídeos curtos na internet, muitas pessoas tentam reproduzir exercícios complexos sozinhas na sala de casa. Embora o estímulo ao movimento seja louvável, a falta de retroalimentação visual imediata pode gerar compensações posturais silenciosas.

### Por Que a Correção Externa Faz Diferença?

- **Ponto Cego Proprioceptivo**: Quando agachamos, muitas vezes acreditamos que nossa coluna está perfeitamente reta, enquanto na verdade a lombar pode estar flexionando sob carga.
- **Adaptação Individual**: O que é um agachamento ideal para uma pessoa com pernas longas e tronco curto é diferente da postura de alguém com fêmur proporcionalmente menor.
- **Prevenção de Sobrecarga**: O olhar experiente de um profissional identifica se você está forçando o joelho para dentro (valgo dinâmico) ou elevando os ombros durante uma puxada.

Aproveite sempre a presença dos instrutores na academia para pedir checagem de postura em movimentos básicos.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Serviços",
    categorySlug: "servicos",
    subtopic: "profissionais",
    author: MOCK_AUTHORS.educador,
    publishedAt: "2026-11-03T11:15:00Z",
    readTimeMinutes: 3,
    featuredOrder: 16,
    heroRank: "16",
    coverImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Treinador corrigindo a posição das costas de aluno",
    tags: ["Profissionais", "Postura", "Orientação", "Segurança"],
    stats: { views: 17200, shares: 1280, comments: 71 },
  },

  // ==========================================
  // SEÇÃO 5: HÁBITOS (continuidade / seguranca)
  // ==========================================
  {
    id: "art-17",
    slug: "como-manter-a-regularidade-nos-dias-em-que-a-preguica-bater",
    title: "Como manter a regularidade nos dias em que a preguiça bater",
    excerpt:
      "Aprenda o conceito de 'treino mínimo viável': como cumprir apenas 10 minutos para proteger o hábito sem se cobrar perfeição.",
    content: `
# Como manter a regularidade nos dias em que a preguiça bater

*Por Redação Movimento na Rotina*

A ideia de que pessoas fisicamente ativas acordam todos os dias transbordando de motivação é um mito popular. Em muitos dias normais, o cansaço do trabalho, a chuva ou noites mal dormidas geram vontade imediata de ficar no sofá.

A diferença entre quem mantém a constância e quem abandona está na flexibilidade de expectativas através do **Treino Mínimo Viável**.

### A Regra de 'Nunca Zerar'

- Se o treino planejado era de 40 minutos e você está sem energia, combine consigo mesmo fazer **apenas 10 minutos de caminhada ou mobilidade leve**.
- Quase sempre, após os primeiros 5 minutos, a sensação de preguiça diminui conforme o fluxo sanguíneo aquece o corpo.
- E mesmo que você pare aos 10 minutos, seu cérebro registrou que você cumpriu o compromisso. Você não quebrou a corrente de continuidade.

Consistência é sobre não desistir, não sobre ter desempenhos olímpicos todos os dias.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Hábitos",
    categorySlug: "habitos",
    subtopic: "continuidade",
    author: MOCK_AUTHORS.editorial,
    publishedAt: "2026-11-02T16:00:00Z",
    readTimeMinutes: 3,
    featuredOrder: 17,
    heroRank: "17",
    isTrending: true,
    trendingRank: 11,
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Pessoa sentada respirando fundo antes de iniciar o treino",
    tags: ["Continuidade", "Hábitos", "Motivação", "Disciplina"],
    stats: { views: 28900, shares: 2540, comments: 178 },
  },
  {
    id: "art-18",
    slug: "o-poder-do-ambiente-preparando-a-casa-para-facilitar-o-movimento",
    title: "O poder do ambiente: preparando a casa para facilitar o movimento",
    excerpt:
      "Deixar o tapete à vista, o tênis na porta e garrafas de água cheias reduz o atrito e torna o exercício a opção mais fácil.",
    content: `
# O poder do ambiente: preparando a casa para facilitar o movimento

*Por Redação Movimento na Rotina*

Muitas vezes culpamos nossa falta de determinação quando, na realidade, é o ambiente ao nosso redor que foi desenhado para o sedentarismo e o conforto estático.

Se o seu tênis fica guardado no fundo do guarda-roupa e a garrafa de água está vazia na pia, cada pequena etapa exige uma micro-decisão que alimenta a procrastinação.

### 3 Ajustes Simples no Seu Espaço

1. **Torne o Hábito Visível**: Deixe o tapete de exercício esticado ou encostado ao lado do sofá. A presença visual do objeto serve como um lembrete positivo.
2. **Separe a Roupa na Véspera**: Se você planeja se exercitar de manhã, deixe o conjunto de roupas e o par de meias ao lado da cama.
3. **Crie Zonas Livres de Telas**: Reserve um canto da sala livre de fios e mesas de centro para que você tenha espaço seguro para se movimentar sem ter que arrumar móveis.

Desenhe seu ambiente para que o movimento seja o caminho de menor resistência.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Hábitos",
    categorySlug: "habitos",
    subtopic: "continuidade",
    author: MOCK_AUTHORS.editorial,
    publishedAt: "2026-11-01T14:20:00Z",
    readTimeMinutes: 2,
    featuredOrder: 18,
    heroRank: "18",
    coverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Ambiente claro e organizado pronto para atividade física",
    tags: ["Continuidade", "Ambiente", "Organização", "Hábitos"],
    stats: { views: 19100, shares: 1470, comments: 85 },
  },
  {
    id: "art-19",
    slug: "sinais-de-alerta-dor-normal-do-esforco-vs-dor-de-lesao",
    title: "Sinais de alerta: dor normal do esforço vs. dor de lesão",
    excerpt:
      "Aprenda a diferenciar o cansaço muscular passageiro de fisgadas e pontadas articulares que exigem repouso e avaliação médica.",
    content: `
# Sinais de alerta: dor normal do esforço vs. dor de lesão

*Por Consultoria em Fisioterapia & Ergonomia*

A famosa expressão em inglês *'no pain, no gain'* causou muitos prejuízos à saúde de praticantes iniciantes. Sentir dor aguda durante ou após o exercício nunca é sinal de bom treino: é o alarme natural do corpo indicando sobrecarga em tecidos que não toleraram o estímulo.

### Diferenças Fundamentais

- **Dor Tardia Muscular (Normal)**:
  - Sensação difusa de cansaço ou peso no músculo (como coxas doloridas 24 a 48 horas após agachamentos).
  - Melhora progressivamente com caminhadas leves, banho morno e boa hidratação.
  - Diminui a cada nova semana conforme o músculo se adapta.
- **Dor de Alerta / Lesão (Não Normal)**:
  - Dor aguda, em pontada, queimação ou fisgada localizada em tendões ou articulações (joelhos, tornozelos, ombros).
  - Piora durante o próprio movimento ou causa inchaço, vermelhidão e calor no local.
  - Provoca mancar ou compensar o peso em uma das pernas.

Ao notar dores agudas persistentes, interrompa o movimento e procure orientação médica especializada.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Hábitos",
    categorySlug: "habitos",
    subtopic: "seguranca",
    author: MOCK_AUTHORS.fisioterapia,
    publishedAt: "2026-10-31T11:00:00Z",
    readTimeMinutes: 3,
    featuredOrder: 19,
    heroRank: "19",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Pessoa ouvindo o corpo com atenção e serenidade",
    tags: ["Segurança", "Lesões", "Prevenção", "Sinais de Alerta"],
    stats: { views: 27400, shares: 2310, comments: 165 },
  },
  {
    id: "art-20",
    slug: "hidratacao-e-descanso-os-dois-pilares-para-treinar-com-seguranca",
    title: "Hidratação e descanso: os dois pilares para treinar com segurança",
    excerpt:
      "O resultado do treino acontece na recuperação. Entenda como água e noites bem dormidas previnem câimbras, lesões e fadiga crônica.",
    content: `
# Hidratação e descanso: os dois pilares para treinar com segurança

*Por Consultoria em Educação Física*

Exercício físico sem descanso adequado não gera saúde: gera exaustão e sobrecarga imune. Quando nos movimentamos, provocamos micro-estresses fisiológicos que só se transformam em ganho de tônus e disposição se dermos ao organismo os insumos biológicos necessários para a reconstrução tecidual.

### Os Dois Pilares Inegociáveis

1. **A Hidratação Pré e Pós-Treino**:
   - A desidratação aumenta a viscosidade sanguínea, elevando os batimentos cardíacos para um mesmo esforço. Beba um copo de água 30 minutos antes de se movimentar e mantenha goles pequenos durante a sessão.
2. **O Sono Reparador**:
   - É durante as fases profundas do sono noturno que o corpo libera o hormônio do crescimento (GH), responsável por reparar microlesões musculares e regenerar a fáscia.
3. **Dias de Recuperação Ativa**:
   - Não é preciso treinar com peso todos os dias. Em dias alternados, uma caminhada leve ou alguns minutos de alongamento promovem circulação sem gerar estresse mecânico adicional.

Cuide do seu descanso com o mesmo carinho que dedica aos seus treinos.

---

> **Aviso de Saúde**: Converse com um profissional de saúde antes de mudar sua rotina de exercícios.
    `,
    category: "Hábitos",
    categorySlug: "habitos",
    subtopic: "seguranca",
    author: MOCK_AUTHORS.educador,
    publishedAt: "2026-10-30T09:30:00Z",
    readTimeMinutes: 3,
    featuredOrder: 20,
    heroRank: "20",
    coverImage: "https://images.unsplash.com/photo-1559839914-ba2a16d8a39e?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Garrafa de água e ambiente fresco de descanso",
    tags: ["Segurança", "Hidratação", "Sono", "Recuperação"],
    stats: { views: 24100, shares: 1980, comments: 132 },
  },
];

// Dicas rápidas (Wire ticker relabeled as "Dicas rápidas")
export const MOCK_BREAKING_HEADLINES: string[] = [
  "DICA RÁPIDA: Levante-se a cada 50 minutos sentado para ativar a circulação nas pernas e combater a fadiga.",
  "POSTURA: Alongue os flexores do quadril por 60 segundos para aliviar a tensão na coluna lombar.",
  "HIDRATAÇÃO: Beba um copo de água ao acordar para restabelecer os níveis hídricos e ativar o metabolismo.",
  "CAMINHADA: Subir dois lances de escada no dia a dia queima até 5 vezes mais calorias que usar o elevador.",
  "RESPIRAÇÃO: Inspire pelo nariz em 4 segundos e expire pela boca em 6 para baixar o estresse diário.",
  "SEGURANÇA: Converse com um profissional de saúde antes de iniciar ou alterar sua rotina de exercícios.",
];

// Real numbers only: number of guides, sections, etc.
export const MOCK_LIVE_STATS: LiveStat[] = [
  {
    id: "stat-1",
    label: "Guias Publicados",
    value: 20,
    prefix: "#",
    suffix: " guias",
    description: "Guias originais, simples e seguros nas 5 seções do portal.",
    trend: "ACTIVE",
  },
  {
    id: "stat-2",
    label: "Seções Especializadas",
    value: 5,
    suffix: " seções",
    description: "Atividades, Equipamentos, Iniciação, Serviços e Hábitos Saudáveis.",
    trend: "ACTIVE",
  },
  {
    id: "stat-3",
    label: "Subtópicos com Filtro",
    value: 10,
    suffix: " tópicos",
    description: "Chips de filtro: academia, casa, vestuário, acessórios e mais.",
    trend: "ACTIVE",
  },
  {
    id: "stat-4",
    label: "Acesso Aberto & Gratuito",
    value: 100,
    suffix: "%",
    description: "Conteúdo 100% gratuito e alinhado a fontes oficiais brasileiras de saúde.",
    trend: "ACTIVE",
  },
];

export const MOCK_SPLIT_FLAP_ITEMS: SplitFlapItem[] = [
  {
    id: "flap-1",
    time: "07:00 BRT",
    category: "ATIVIDADES",
    headline: "TREINO FUNCIONAL NA SALA: 4 EXERCÍCIOS SIMPLES COM PESO DO CORPO",
    status: "CONFIRMED",
  },
  {
    id: "flap-2",
    time: "09:30 BRT",
    category: "HÁBITOS",
    headline: "PAUSA ATIVA DE DESCOMPRESSÃO LOMBAR: LEVANTE-SE E ALONGUE O QUADRIL",
    status: "BREAKING",
  },
  {
    id: "flap-3",
    time: "12:15 BRT",
    category: "INICIAÇÃO",
    headline: "META DO DIA: O TESTE DA CONVERSA PARA ENCONTRAR O RITMO MODERADO",
    status: "CONFIRMED",
  },
  {
    id: "flap-4",
    time: "15:40 BRT",
    category: "EQUIPAMENTOS",
    headline: "ROUPAS RESPIRÁVEIS E TÊNIS CONFORTÁVEL FACILITAM O MOVIMENTO",
    status: "DISPATCHED",
  },
  {
    id: "flap-5",
    time: "18:00 BRT",
    category: "SERVIÇOS",
    headline: "COMO ESCOLHER ACADEMIAS E PROFISSIONAIS QUALIFICADOS PERTO DE CASA",
    status: "CONFIRMED",
  },
  {
    id: "flap-6",
    time: "21:30 BRT",
    category: "SEGURANÇA",
    headline: "RECUPERAÇÃO E DESCANSO: A BASE INDISPENSÁVEL PARA TREINAR COM SAÚDE",
    status: "UPDATING",
  },
];
