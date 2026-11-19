export interface CategoryConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  badgeColor?: string;
  count?: number;
  subtopics: { label: string; slug: string }[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  signatureStamp: string;
  healthDisclaimer: string;
  categories: CategoryConfig[];
  navLinks: {
    label: string;
    href: string;
    badge?: string;
  }[];
  footerLinks: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  referenceSources: {
    name: string;
    url: string;
    description: string;
  }[];
  socials: {
    platform: string;
    href: string;
    handle: string;
  }[];
  edition: string;
  foundedYear: number;
}

export const siteConfig: SiteConfig = {
  name: "Movimento na Rotina",
  tagline: "Fitness e atividade física: notícias e guias | Movimento na Rotina",
  description:
    "Portal brasileiro dedicado a adultos que desejam se movimentar mais no dia a dia. Guias simples, seguros e acessíveis sobre atividades, equipamentos, iniciação, serviços e hábitos saudáveis.",
  url: "https://movimentonarotina.com",
  signatureStamp: "AO VIVO • 20+ GUIAS • MOVIMENTO NA ROTINA • EST. 2026 •",
  healthDisclaimer:
    "Converse com um profissional de saúde antes de mudar sua rotina de exercícios.",
  edition: "Edição Digital Brasileira Diária",
  foundedYear: 2026,
  categories: [
    {
      id: "atividades",
      name: "Atividades",
      slug: "atividades",
      description:
        "Exercícios práticos para a sua realidade: rotinas funcionais em casa e guias para treinar na academia com segurança.",
      badgeColor: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
      count: 4,
      subtopics: [
        { label: "Academia", slug: "academia" },
        { label: "Casa", slug: "casa" },
      ],
    },
    {
      id: "equipamentos",
      name: "Equipamentos",
      slug: "equipamentos",
      description:
        "Tudo o que você precisa saber sobre roupas adequadas, calçados e acessórios úteis para se exercitar sem desperdício.",
      badgeColor: "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10",
      count: 4,
      subtopics: [
        { label: "Vestuário", slug: "vestuario" },
        { label: "Acessórios", slug: "acessorios" },
      ],
    },
    {
      id: "iniciacao",
      name: "Iniciação",
      slug: "iniciacao",
      description:
        "O passo a passo para quem está saindo do sedentarismo: planejamento realista e orientações básicas para começar bem.",
      badgeColor: "border-teal-500/30 text-teal-600 dark:text-teal-400 bg-teal-500/10",
      count: 4,
      subtopics: [
        { label: "Planejamento", slug: "planejamento" },
        { label: "Orientação", slug: "orientacao" },
      ],
    },
    {
      id: "servicos",
      name: "Serviços",
      slug: "servicos",
      description:
        "Como escolher academias, estúdios e profissionais qualificados (educadores físicos e fisioterapeutas) para sua jornada.",
      badgeColor: "border-emerald-700/30 text-emerald-700 dark:text-emerald-300 bg-emerald-700/10",
      count: 4,
      subtopics: [
        { label: "Academias", slug: "academias" },
        { label: "Profissionais", slug: "profissionais" },
      ],
    },
    {
      id: "habitos",
      name: "Hábitos",
      slug: "habitos",
      description:
        "Estratégias comportamentais para manter a continuidade nos treinos com segurança, respeitando os limites do seu corpo.",
      badgeColor: "border-amber-600/30 text-amber-700 dark:text-amber-300 bg-amber-600/10",
      count: 4,
      subtopics: [
        { label: "Continuidade", slug: "continuidade" },
        { label: "Segurança", slug: "seguranca" },
      ],
    },
  ],
  navLinks: [
    { label: "Destaques", href: "/#hero" },
    { label: "Dicas Rápidas", href: "/#breaking" },
    { label: "Guias Recentes", href: "/#latest" },
    { label: "Top 10", href: "/#trending" },
    { label: "Seleção Editorial", href: "/#editors-picks" },
    { label: "Seções", href: "/#categories" },
    { label: "Fotorreportagens", href: "/#photo-story" },
    { label: "Métricas", href: "/#live-stats" },
    { label: "Arquivo", href: "/arquivo", badge: "20 Guias" },
    { label: "Sobre & Fontes", href: "/sobre" },
    { label: "Manual da Marca", href: "/marca" },
  ],
  footerLinks: [
    {
      title: "5 Seções Principais",
      links: [
        { label: "Atividades (Academia & Casa)", href: "/secoes/atividades" },
        { label: "Equipamentos (Vestuário & Acessórios)", href: "/secoes/equipamentos" },
        { label: "Iniciação (Planejamento & Orientação)", href: "/secoes/iniciacao" },
        { label: "Serviços (Academias & Profissionais)", href: "/secoes/servicos" },
        { label: "Hábitos (Continuidade & Segurança)", href: "/secoes/habitos" },
      ],
    },
    {
      title: "Recursos & Guias",
      links: [
        { label: "Arquivo Completo de Guias", href: "/arquivo" },
        { label: "Busca Rápida de Artigos", href: "/busca" },
        { label: "Top 10 em Destaque", href: "/#trending" },
        { label: "Fotorreportagens do Movimento", href: "/#photo-story" },
        { label: "Dicas Rápidas do Dia", href: "/#breaking" },
        { label: "Feed de Notícias /api/news", href: "/api/news" },
      ],
    },
    {
      title: "Institucional & Fontes",
      links: [
        { label: "Sobre o Movimento na Rotina", href: "/sobre" },
        { label: "Fontes & Padrões Editoriais", href: "/sobre#fontes" },
        { label: "Manual de Identidade Visual", href: "/marca" },
        { label: "Política de Privacidade (LGPD)", href: "/privacidade" },
        { label: "Fale com a Equipe", href: "/sobre#contato" },
      ],
    },
  ],
  referenceSources: [
    {
      name: "Guia de Atividade Física para a População Brasileira — Ministério da Saúde",
      url: "https://www.gov.br/saude/pt-br",
      description: "Diretrizes oficiais brasileiras sobre tempo mínimo de movimento, benefícios e recomendações por faixa etária.",
    },
    {
      name: "Go Outside Brasil",
      url: "https://gooutside.com.br/",
      description: "Referência em vida ao ar livre, esportes, treinos funcionais e cultura do movimento no Brasil.",
    },
    {
      name: "Agência Brasil (EBC)",
      url: "https://agenciabrasil.ebc.com.br/",
      description: "Agência pública de notícias, fonte do nosso feed automatizado de atualizações sobre saúde e cidadania.",
    },
  ],
  socials: [
    { platform: "Instagram", href: "https://instagram.com", handle: "@movimentonarotina" },
    { platform: "YouTube", href: "https://youtube.com", handle: "Movimento na Rotina" },
    { platform: "Strava", href: "https://strava.com", handle: "Clube Movimento na Rotina" },
    { platform: "Newsletter (Demo)", href: "/#newsletter", handle: "Boletim Semanal" },
  ],
};
