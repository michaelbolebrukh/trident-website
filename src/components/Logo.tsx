import logoSrc from '../assets/logo__1_.svg'

interface LogoProps {
  className?: string
  height?: number
  variant?: 'default' | 'white'
}

export default function Logo({ className = '', height = 36, variant = 'default' }: LogoProps) {
  return (
    <img
      src={logoSrc.src}
      alt="Trident Modular"
      height={height}
      style={{ height: `${height}px`, width: 'auto', filter: variant === 'white' ? 'brightness(0) invert(1)' : 'none' }}
      className={className}
    />
  )
}
