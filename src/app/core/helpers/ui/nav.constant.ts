import { Menu } from 'src/app/core/interfaces/ui/nav.interface';

export const MENU_ITEMS: Menu[] = [
  {
    id: 'backOffice',
    headTitle1: 'words.backOffice',
  },
  {
    id: 'betshopManagement',
    title: 'betshopManagement.title',
    icon: 'home',
    type: 'sub',
    badgeType: 'light-primary',
    children: [
      {
        id: 'betshopManagementBetshop',
        path: '/betshop-management/betshop',
        title: 'betshopManagement.betshops.title',
        type: 'link',
      },
      {
        id: 'betshopManagementCashdesk',
        path: '/betshop-management/cashdesk',
        title: 'betshopManagement.cashdesks.title',
        type: 'link',
      },
    ],
  },

  //   id: 'auth',
  //   title: 'auth.title',
  //   icon: 'home',
  //   type: 'link',
  //   badgeType: 'light-primary',
  //   path: '/auth/login',
  // },
];
