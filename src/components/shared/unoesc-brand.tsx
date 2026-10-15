import { cn } from '@/lib/utils'

type UnoescBrandProps = {
  className?: string
  logoClassName?: string
  nameClassName?: string
}

export function UnoescBrand({ className, logoClassName, nameClassName }: UnoescBrandProps) {
  return (
    <div className={cn('flex min-w-0 items-center gap-2', className)}>
      <img
        src={`${import.meta.env.BASE_URL}brand/logo-unoesc.png`}
        alt="Unoesc"
        width={243}
        height={230}
        className={cn('size-8 shrink-0 object-contain', logoClassName)}
      />
      <img
        src={`${import.meta.env.BASE_URL}brand/nome-unoesc.png`}
        alt=""
        width={444}
        height={91}
        className={cn('h-auto w-28 min-w-0 object-contain', nameClassName)}
      />
    </div>
  )
}
