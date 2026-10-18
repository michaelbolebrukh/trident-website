/**
 * Official Trident Modular profiles. One list feeds the footer icons and the
 * Organization schema's sameAs, so the two cannot disagree. Networks without
 * a profile are simply absent: no placeholder links.
 */
export interface SocialProfile {
  id: 'instagram' | 'youtube' | 'facebook' | 'x'
  label: string
  href: string
}

export const socialProfiles: SocialProfile[] = [
  { id: 'instagram', label: 'Trident Modular on Instagram', href: 'https://www.instagram.com/tridentmodular/' },
  { id: 'youtube', label: 'Trident Modular on YouTube', href: 'https://www.youtube.com/channel/UCZzJtNHDN2G97T-eJ8Co4DQ' },
  { id: 'facebook', label: 'Trident Modular on Facebook', href: 'https://www.facebook.com/tridentmodular/' },
  { id: 'x', label: 'Trident Modular on X', href: 'https://x.com/TridentModular' },
]
