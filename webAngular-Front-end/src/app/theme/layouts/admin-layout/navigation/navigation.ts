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

const AdminNavigationItems: NavigationItem[] = [
  {
    id: 'Dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'SectionsEquipes',
    title: 'Sections et équipes',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sections',
        title: 'Sections',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/sections',
        icon: 'profile',
        breadcrumbs: false
      }, 
      {
        id: 'équipes',
        title: 'Equipes',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/teams',
        icon: 'team',
        breadcrumbs: false
      },
      {
        id: 'projets',
        title: 'Projets',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/projects',
        icon: 'book',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'users',
    title: 'Utilisateurs',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Gestionnaires',
        title: 'Gestionnaires',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/managers',
        icon: 'user',
        breadcrumbs: false

      },
      {
        id: 'membres',
        title: 'Membres',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/members',
        icon: 'user',
        breadcrumbs: false

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
        url: '/admin/feedback',
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

const ChefNavigationItems: NavigationItem[] = [
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
        url: '/',
        icon: 'profile',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'taches',
    title: 'Tâches',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'taches',
        title: 'Tâches',
        type: 'item',
        classes: 'nav-item',
        url: '/chef/taches',
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
        url: '/chef/rapports',
      },
      {
        id: 'documents',
        title: 'Documents',
        type: 'item',
        classes: 'nav-item',
        url: '/chef/documents',
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
        url: '/chef/feedback',
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

export function getNavigationItems(role: string): NavigationItem[] {
  switch (role.toUpperCase()) {
    case 'ADMIN':
      return AdminNavigationItems;
    case 'CHEF':
      return ChefNavigationItems;
    default:
      return []; // Return empty array for unknown roles
  }
}