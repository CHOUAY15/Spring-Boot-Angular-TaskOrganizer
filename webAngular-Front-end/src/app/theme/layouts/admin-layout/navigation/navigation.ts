export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'Accueil',
    title: 'Accueil',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Équipes',
        type: 'item',
        classes: 'nav-item',
        url: '/accueil/default',
        icon: 'profile',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'demandes',
    title: 'Demandes d\'aide',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'remarque',
        title: 'Demandes',
        type: 'item',
        classes: 'nav-item',
        url: '/login',
        target: true,
        breadcrumbs: false
      },
      
    ]
  },
  {
    id: 'projets',
    title: 'Projets',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'rapports',
        title: 'Rapports',
        type: 'item',
        classes: 'nav-item',
        url: '/rapports',
      },
      {
        id: 'documents',
        title: 'Documents',
        type: 'item',
        classes: 'nav-item',
        url: '/documents',
      },
    
    ]
  },

  {
    id: 'autres',
    title: 'Autres',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'feedback',
        title: 'Feedback et Suggestions',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'chrome'
      },
      {
        id: 'support',
        title: 'Support',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/mantis-angular/',
        icon: 'question',
        target: true,
        external: true
      }
    ]
  }
];
