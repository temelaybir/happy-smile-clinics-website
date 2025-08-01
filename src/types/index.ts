export interface MenuItem {
  name: string
  href: string
}

export interface SocialLink {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
} 