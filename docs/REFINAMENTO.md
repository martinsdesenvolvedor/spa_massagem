# Élysée — Hero responsiva, animações e páginas internas

Revisão de 15/10/2026. Projeto: `elysee-spa-e-wellness-sanctuary`.
Referência inspecionada no navegador: [Beauty](https://beauty.websitelayout.net/).

## Atualização — português, fotografias e animações durante a rolagem

- Navegação desktop e mobile, submenus, breadcrumbs, identificação do spa, rodapé, nomes de tratamentos e metadados em português. Rotas e identificadores dos serviços foram preservados.
- 38 elementos animados na Home: entradas laterais do conteúdo, revelação vertical dos títulos, máscaras nas fotografias e cartões escalonados. O movimento acontece uma vez a cada visita, quando cada elemento entra no viewport; filtros registram os novos cartões sem mudar seu funcionamento.
- Páginas internas recebem entradas em títulos, perfis, artigos, equipe, serviços, galeria e agendamento. Duração de 0,8 s para conteúdo e 1,05 s para máscaras; escalonamento limitado a 0,28 s para manter a interação imediata.
- As 12 aberturas internas usam 11 fotografias distintas, selecionadas entre os recursos existentes. Detalhes do serviço exibem a fotografia do ritual escolhido; a aromaterapia pode compartilhar a imagem botânica com Perguntas frequentes. Abertura por máscara de 1,15 s e parallax sutil de até 85 px, vinculado à rolagem nativa.
- Sem novas dependências. Não há bloqueio ou substituição da rolagem nativa. Foco pelo teclado revela imediatamente conteúdo pendente; impressão e preferência de movimento reduzido exibem todo o conteúdo sem esses movimentos.

Validação desta atualização: tipos e build aprovados; 36 casos da Hero e 24 casos de páginas aprovados; navegação traduzida, agendamento demonstrativo, busca e galeria preservados. Na auditoria de rolagem, Home e 12 páginas internas passaram em 1366×768 e 390×844: nenhum elemento ficou pendente após a rolagem, nenhum transbordamento horizontal ou erro de JavaScript. As fotos das 12 aberturas carregaram. Parallax e movimento reduzido foram verificados no navegador. A auditoria automatizada de acessibilidade das páginas amostradas não encontrou violações.

[Resultados da rolagem](visual/scroll-refinement/validation.json) · [Home no celular](visual/scroll-refinement/home-services-390.png) · [Sobre no celular](visual/scroll-refinement/about-hero-390.png) · [Equipe no desktop](visual/scroll-refinement/team-hero-1366.png) · [Contato no desktop](visual/scroll-refinement/contact-hero-1366.png).

## Hero e continuidade visual

A faixa superior ocupava 33 px no fluxo enquanto o cabeçalho permanecia fixo sobre a página. Além disso, a Hero combinava títulos grandes, vários blocos de conteúdo e até 256 px de padding vertical, sem ajuste para a altura disponível. Em telas mais baixas, isso comprometia o enquadramento.

O cabeçalho agora se sobrepõe à fotografia sem acrescentar altura ao documento. A Hero usa a altura disponível do viewport, com tipografia e espaçamento que respondem à altura e à largura. Foram mantidos os três slides, textos, CTAs e informações de confiança. O recorte não depende de uma suposição sobre o tamanho físico do monitor.

A fumaça foi reduzida à composição observada no modelo. A base da Hero e a seção seguinte usam a mesma cor, `#f9f6f1`, extraída do arquivo de nuvem que já existia no projeto. A faixa de contraste e o ornamento cortado no topo da seção seguinte foram removidos. O teste de pixels na transição encontrou diferença zero nos três pontos amostrados.

O botão flutuante de retorno ao topo aparece após a rolagem, evitando sobreposição com a seta do slider no celular. Também foram corrigidos o dimensionamento dos cartões do portfólio mobile e a altura disponível dos modais.

## Animações

| Movimento | Referência observada e implementação |
| --- | --- |
| Slider | Troca automática a cada 5 s; crossfade de 1 s |
| Entrada dos textos | Fade vertical de 1 s; subtítulo em 0,8 s, título em 1,2 s e CTAs em 1,6 s; descrição e informações próprias entram coordenadamente |
| Fumaça | Ciclo contínuo de 60 s, posição horizontal de −1920 a 0 px |
| Ornamentos flutuantes | Ciclo de 5 s, deslocamento de 30 px no marco de 65% |
| Depoimentos | Entrada e saída horizontal em 800 ms, preservando os dados existentes |
| Acordeão | Abertura e fechamento da altura em 350 ms, com estado ARIA |

A configuração `smartSpeed` do carrossel original é 1500 ms, mas a inspeção da animação efetivamente renderizada (`fadeIn`/`fadeOut` nos itens do Owl) mostrou 1 s. A versão final usa a duração efetiva de 1 s. Os controles de pausa e a preferência por redução de movimento continuam disponíveis.

## Navegação e reaproveitamento

A estrutura do menu segue o modelo, com os nomes traduzidos: **Início, Conheça, Serviços, Galeria, Blog e Contato**. Foram criadas as rotas de conteúdo abaixo, usando os componentes e os dados existentes sempre que disponíveis. As alternativas de demonstração de Home, colunas e sidebars foram omitidas conforme a correção de escopo do usuário.

| Endereço | Conteúdo |
| --- | --- |
| `/` | Landing page existente |
| `/about.html` | AboutSection e apresentação da equipe |
| `/appoinment.html` | BookingSection existente |
| `/faq.html` | WhyChooseUs e perguntas existentes |
| `/team.html` | Equipe a partir de THERAPISTS |
| `/team-details.html?therapist=felipe` | Perfil individual usando os mesmos dados |
| `/pricing.html` | PricingMenu existente |
| `/services.html` | ServicesSection existente |
| `/services-details.html?service=aroma-lavanda` | Detalhamento a partir de SPA_SERVICES |
| `/portfolio.html` | GallerySection e lightbox existentes, com teclado e foco aprimorados |
| `/blog.html` | Três artigos editoriais originais sobre a experiência no spa |
| `/blog-details.html?article=primeira-visita` | Leitura dos artigos em um componente reutilizável |
| `/contact.html` | Canais existentes e BookingSection |

A navegação usa History API, preservando React/Vite e sem instalar dependências. Voltar/avançar e atualização de endereços internos foram testados. `vercel.json` prepara os deep links da SPA, seguindo a [documentação do Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite). Nenhum deploy foi executado.

As rotinas de agendamento e newsletter continuam sendo as demonstrações locais existentes. Não foi implementado envio real de e-mail, armazenamento, backend, autenticação ou alteração de preços.

## Imagens locais

Foram identificados dois endereços indisponíveis, com três ocorrências na home. A foto facial e a imagem de aromaterapia foram substituídas. Uma imagem de equipe também foi criada para completar as páginas novas. Nenhum rótulo sobre a origem das imagens foi inserido no site.

Ferramenta utilizada: **image_gen integrada**, sem CLI ou alteração de dependências. Os originais foram preservados no diretório de geração do Codex; cópias WebP otimizadas foram salvas no projeto:

- [Aromaterapia](../public/images/aromatherapy-still-life.webp)
- [Tratamento facial](../public/images/facial-treatment.webp)
- [Equipe](../public/images/spa-team.webp)

Prompts finais usados:

```text
Create an original photorealistic luxury spa product photograph for the Élysée wellness website. Wide horizontal composition, amber glass essential oil bottles without labels, a small ceramic bowl of massage oil, fresh lavender and eucalyptus sprigs, folded ivory linen towels on warm pale stone, soft natural window light, muted cream and blush palette, calm refined editorial photography, realistic textures, no people, no text, no logos, no watermark. Suitable for an aromatherapy service card and image gallery.
```

```text
Create an original photorealistic editorial spa photograph for the Élysée wellness website. Wide horizontal composition: an adult woman resting comfortably on a treatment bed, wearing a modest ivory spa robe and towel headband, eyes closed, a professional therapist's hands gently applying a facial treatment with a small soft brush, clean serene treatment room, folded cream towels, warm window light, neutral cream and subtle blush tones, natural realistic skin texture, sophisticated beauty magazine photography. Non-medical wellness setting, no needles, no text, no logos, no watermark.
```

```text
Original photorealistic editorial team portrait for a refined Brazilian wellness spa website. Four fictional adult spa professionals, three women and one man, standing naturally together in an elegant cream and pale blush spa reception, waist-up composition, neatly tailored ivory spa uniforms, welcoming relaxed expressions, diverse natural appearances, soft daylight, realistic skin texture, warm pale stone and subtle greenery in the background. Horizontal 16:9 image, generous breathing room, sophisticated but friendly, no text, no logos, no watermark.
```

## Validação

- `npm run lint`: verificação TypeScript existente (`tsc --noEmit`). Não há ESLint configurado.
- `npm run build`: build de produção aprovado; permanece o aviso preexistente do Vite sobre `__dirname` no futuro carregador nativo.
- 36 casos da Hero: três slides em 2560×1440, 1920×1080, 1440×900, 1366×768, 1280×720, 1280×600, 1024×768, 768×1024, 390×844, 375×667, 360×640 e 844×390. Sem overflow, corte do conteúdo ou altura extra antes da seção seguinte.
- 24 casos de páginas: doze rotas internas em desktop e celular; atualização direta, menus e histórico.
- Auditoria Axe WCAG 2 A/AA e 2.1 AA sem violações detectadas na home e nas páginas de Sobre, equipe, serviços, portfólio, blog e contato avaliadas em desktop. Auditoria automatizada não substitui avaliação manual completa.
- Testes de movimento, teclado, busca, formulários demonstrativos, seleção de ritual e ampliação de fotos em scripts separados.

Registros: [layout e rotas](visual/after/validation.json), [animações e continuidade visual](visual/after/movement.json), [fluxos](visual/after/flows.json).

Capturas: [desktop](visual/after/hero-final-1366.png), [mobile](visual/after/hero-final-390.png), [passagem entre seções](visual/after/hero-seam.png).

Os scripts de navegador em `docs/qa` usam Playwright, Axe e Sharp fornecidos pelo ambiente de teste. Defina `NODE_PATH` para a instalação dessas ferramentas e `CHROMIUM_PATH` para o navegador, se necessário. `PREVIEW_URL` permite testar outra porta. Não foram adicionados ao bundle de produção. Referências, relatórios e capturas em `docs` também ficam fora do build.
