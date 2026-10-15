import type { ReactNode } from 'react'
import { UnoescBrand } from '@/components/shared/unoesc-brand'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ProjectTemplateChart } from '@/components/charts/project-template-chart'

/** Área pontilhada que indica onde cada informação deve ficar na página do projeto. */
function Slot({ label, hint, className }: { label: string; hint?: string; className?: string }) {
  return (
    <div
      className={cn(
        'border-muted-foreground/40 bg-muted/30 text-muted-foreground flex flex-col justify-center rounded-md border-2 border-dashed px-3 py-2',
        className,
      )}
    >
      <span className="text-foreground/80 text-sm font-medium">{label}</span>
      {hint ? <span className="text-xs">{hint}</span> : null}
    </div>
  )
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground text-xs tracking-wide uppercase">{children}</p>
}

export default function ProjectTemplatePage() {
  return (
    <main className="min-h-dvh">
      <header className="bg-background/85 border-b backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0 flex-1">
            <UnoescBrand />
            <p className="text-muted-foreground mt-1 truncate text-xs">Página do projeto</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        <Card>
          <CardContent className="space-y-5">
            <div className="space-y-1">
              <FieldLabel>Título</FieldLabel>
              <Slot label="Nome do projeto" hint="Até 50 caracteres" className="max-w-xl py-3" />
            </div>

            <div className="space-y-1">
              <FieldLabel>Descrição</FieldLabel>
              <Slot
                label="Resumo do projeto"
                hint="O que é, para quem é e qual o objetivo, em até 400 caracteres"
                className="min-h-20 max-w-3xl"
              />
            </div>

            <div className="space-y-1.5">
              <FieldLabel>Categorias</FieldLabel>
              <div className="flex flex-wrap gap-2">
                <Slot label="Ícone + nome do ODS" className="w-52 py-1.5" />
                <Slot label="Ícone + nome do ODS" className="w-52 py-1.5" />
                <Slot label="Categoria própria" className="w-52 py-1.5" />
              </div>
            </div>

            <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1">
                <FieldLabel>Tipo</FieldLabel>
                <Slot label="Projeto" className="py-1.5" />
              </div>
              <div className="space-y-1">
                <FieldLabel>Situação</FieldLabel>
                <Slot label="Em andamento, pausado ou concluído" className="py-1.5" />
              </div>
              <div className="space-y-1">
                <FieldLabel>Local</FieldLabel>
                <Slot label="Bloco, sala ou área do campus" className="py-1.5" />
              </div>
              <div className="space-y-1">
                <FieldLabel>Início</FieldLabel>
                <Slot label="Data de início" className="py-1.5" />
              </div>
              <div className="space-y-1">
                <FieldLabel>Responsáveis</FieldLabel>
                <Slot label="Nomes da equipe" className="py-1.5" />
              </div>
              <div className="space-y-1">
                <FieldLabel>Contato</FieldLabel>
                <Slot label="E-mail ou canal do projeto" className="py-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {['Indicador 1', 'Indicador 2', 'Indicador 3', 'Indicador 4'].map((label) => (
            <Card key={label} className="gap-0 py-5">
              <CardContent className="space-y-2">
                <FieldLabel>{label}</FieldLabel>
                <Slot label="Valor e unidade" hint="Ex.: total do ano" className="py-3" />
              </CardContent>
            </Card>
          ))}
        </div>

        <ProjectTemplateChart />

        <div className="grid gap-4 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Últimos registros</CardTitle>
              <CardDescription>Atualizações mais recentes do projeto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-muted-foreground grid grid-cols-4 gap-2 text-xs uppercase">
                <span>Indicador</span>
                <span className="text-right">Valor</span>
                <span>Origem</span>
                <span>Data</span>
              </div>
              {[1, 2, 3, 4].map((row) => (
                <Slot key={row} label={`Linha ${row} da tabela`} className="py-1.5" />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Local no campus</CardTitle>
              <CardDescription>Referência do local</CardDescription>
            </CardHeader>
            <CardContent>
              <Slot
                label="Imagem do local no mapa"
                hint="Baixe na tela do projeto no Smart Campus, em Materiais do projeto"
                className="aspect-[16/10] items-center text-center"
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sobre o projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <Slot
              label="Texto completo"
              hint="Contexto, metodologia, equipe, parceiros e resultados esperados"
              className="min-h-28"
            />
          </CardContent>
        </Card>

        <Slot
          label="Link de volta para o mapa público do Smart Campus"
          hint="Ajuda o visitante a conhecer os outros projetos e ações da universidade"
          className="items-center py-3 text-center"
        />
      </div>
    </main>
  )
}
