# Template de página do projeto · Unoesc

Projeto independente em Vite, React e TypeScript que reproduz a página
`smartcampus-web/app/project-template/page.tsx`. Mantém as áreas pontilhadas,
a ordem dos blocos, a responsividade, os componentes Card, as cores, os espaçamentos
e a fonte Inter do Smart Campus. O cabeçalho já inclui o símbolo e o nome da Unoesc,
sem a faixa verde de instruções.

## Executar

Use Node.js 20.19+ ou 22.12+ (incluindo versões posteriores compatíveis).

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente http://localhost:5173.

## Validar e gerar a versão final

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

A versão estática é gerada em `dist/`. Não exige API, banco de dados ou variáveis
de ambiente. A fonte e as imagens são servidas pelo próprio projeto.

## Personalizar

- `src/App.tsx`: conteúdo e blocos da página. Substitua as áreas `Slot` pelas
  informações, gráficos e registros do seu projeto.
- `src/components/ui/card.tsx`: mesmos componentes de cartão do Smart Campus.
- `src/components/shared/unoesc-brand.tsx`: identificação da Unoesc.
- `src/index.css`: tema e estilos Tailwind CSS 4 copiados do Smart Campus.
- `src/components/charts/project-template-chart.tsx`: dados de exemplo do gráfico anual;
  substitua `series` e `startDate` pelos dados do projeto.
- `src/components/charts/movement-charts.tsx`: gráfico de área com os 12 meses, total anual
  e seletor de ano. Meses sem registros exibem zero; anos anteriores ao início não aparecem.
- `src/lib/monthly-movements.ts`: soma mensal e intervalo de anos, iguais aos do Smart Campus.
- `public/brand/`: imagens oficiais usadas pelo sistema.

As bibliotecas usadas pela tela original foram preservadas: React, React DOM,
Tailwind CSS, Recharts, Radix Select, Lucide, `tw-animate-css`, `clsx` e `tailwind-merge`, com as mesmas versões
instaladas no Smart Campus no momento da cópia. Os componentes Card seguem o
mesmo padrão shadcn/ui. Vite substitui o Next.js neste projeto; a fonte Inter é
distribuída localmente por `@fontsource-variable/inter`.
