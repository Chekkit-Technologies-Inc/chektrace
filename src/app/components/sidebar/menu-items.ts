import { RouteInfo } from './sidebar.metadata';
/**
 * Cateories
 * 0: general
 * 1: anti-fake
 * 2: insights
 * 3: engage
 * 4: sap
 * 5: traceability
 * 
 */
export const ROUTES: RouteInfo[] = 
[
  {
    path: '/dashboard/overview',
    title: 'Overview',
    icon: 'fas fa-home',
    category: 0,
    class: '',
    code:'1',
    extralink: false,
    submenu: []
  },
  // {
  //   path: '/dashboard/profile',
  //   title: 'Profile',
  //   icon: 'fas fa-user-circle',
  //   category: 0,
  //   class: '',
  //   code:'1',
  //   extralink: false,
  //   submenu: []
  // },
  {
    path: '/dashboard/analytics',
    title: 'Analytics',
    icon: 'fas fa-chart-area',
    category:1,
    class: '',
    code:'2',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard/products',
    title: 'Products',
    category:1,
    icon: 'fas fa-cubes',
    class: '',
    code:'34',
    extralink: false,
    submenu: []
  },
  // {
  //   path: '/dashboard/insights',
  //   title: 'Insights Home',
  //   category:2,
  //   icon: 'fas fa-boxes',
  //   class: '',
  //   code:'30',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/dashboard/insights/analytics',
  //   title: 'Analytics',
  //   category:2,
  //   icon: 'fas fa-chart-line',
  //   class: '',
  //   code:'30',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/dashboard/insights/ussd-channel',
  //   title: 'USSD Channel',
  //   category:2,
  //   icon: 'fas fa-tty',
  //   class: '',
  //   code:'30',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/dashboard/insights/call-channel',
  //   title: 'CallCode Channel',
  //   category:2,
  //   icon: 'fas fa-phone',
  //   class: '',
  //   code:'30',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/dashboard/insights/qr-channel',
  //   title: 'QR Channel',
  //   category:2,
  //   icon: 'fas fa-expand',
  //   class: '',
  //   code:'30',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/dashboard/surveys',
  //   title: 'Surveys',
  //   category:1,
  //   icon: 'fas fa-tasks',
  //   class: '',
  //   code:'29',
  //   extralink: false,
  //   submenu: []
  // },
  {
    path: '/dashboard/rewards',
    title: 'Rewards',
    category:1,
    icon: 'fas fa-gift',
    class: '',
    code:'34',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard/code-collections',
    title: 'Code Collections',
    category:1,
    icon: 'fas fa-file-alt',
    class: '',
    code:'33',
    extralink: false,
    submenu: []
  },
  // {
  //   path: '/dashboard/user-feedback',
  //   title: 'User Feedback Logs',
  //   category:1,
  //   icon: 'fas fa-comment-dots',
  //   class: '',
  //   code:'88',
  //   extralink: false,
  //   submenu: []
  // },
  {
    path: '/engage',
    title: 'Engage Home',
    category:3,
    icon: 'fas fa-bullhorn',
    class: '',
    code:'28',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard/engage/upload-csv',
    title: 'Upload CSV',
    category:3,
    icon: 'fas fa-file-excel',
    class: '',
    code:'28',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard/engage/existing-contacts',
    title: 'Existing Customers',
    category:3,
    icon: 'fas fa-id-card',
    class: '',
    code:'28',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard/engage/target-group',
    title: 'Target Group',
    category:3,
    icon: 'fas fa-shapes',
    class: '',
    code:'28',
    extralink: false,
    submenu: []
  },
  {
    path: '/sap',
    title: 'SAP Portal',
    category:4,
    icon: 'fas fa-shapes',
    class: '',
    code:'28',
    extralink: false,
    submenu: []
  },
  {
    path: '/sap/connect',
    title: 'SAP connect',
    category:4,
    icon: 'fas fa-shapes',
    class: '',
    code:'28',
    extralink: false,
    submenu: []
  },
  // {
  //   path: '/sap/home',
  //   title: 'SAP Home',
  //   category:4,
  //   icon: 'fas fa-shapes',
  //   class: '',
  //   code:'28',
  //   extralink: false,
  //   submenu: []
  // },
  {
    path: '/sap/request-serial',
    title: 'SAP request serial',
    category:4,
    icon: 'fas fa-shapes',
    class: '',
    code:'28',
    extralink: false,
    submenu: []
  },
  {
    path: '/sap/batch',
    title: 'SAP batch',
    category:4,
    icon: 'fas fa-shapes',
    class: '',
    code:'28',
    extralink: false,
    submenu: []
  },
  {
    path: '/sap/setup-surveys',
    title: 'SAP setup surveys',
    category:4,
    icon: 'fas fa-shapes',
    class: '',
    code:'28',
    extralink: false,
    submenu: []
  },
  {
    path: '/sap/attach-rewards',
    title: 'SAP attach rewards',
    category:4,
    icon: 'fas fa-shapes',
    class: '',
    code:'28',
    extralink: false,
    submenu: []
  },
  {
    path: '/traceability',
    title: 'Traceability Home',
    icon: 'fas fa-home',
    category: 5,
    class: '',
    code:'1',
    extralink: false,
    submenu: []
  },
  {
    path: '/mas',
    title: 'Quicklinks',
    icon: 'fas fa-arrow-alt-circle-right',
    category: 6,
    class: '',
    code:'1',
    extralink: false,
    submenu: []
  },
  {
    path: '/mas/products',
    title: 'Products',
    icon: 'fas fa-arrow-alt-circle-right',
    category: 6,
    class: '',
    code:'1',
    extralink: false,
    submenu: []
  },
  {
    path: '/mas/dashboard',
    title: 'ChekIntel',
    icon: 'fas fa-arrow-alt-circle-right',
    category: 6,
    class: '',
    code:'1',
    extralink: false,
    submenu: []
  },
  {
    path: '/mas/products',
    title: 'Products',
    icon: 'fas fa-arrow-alt-circle-right',
    category: 6,
    class: '',
    code:'1',
    extralink: false,
    submenu: []
  },
  {
    path: '/mas/product-pin',
    title: 'Pins',
    icon: 'fas fa-arrow-alt-circle-right',
    category: 6,
    class: '',
    code:'1',
    extralink: false,
    submenu: []
  },
  {
    path: '/mas/survey',
    title: 'Surveys',
    icon: 'fas fa-arrow-alt-circle-right',
    category: 6,
    class: '',
    code:'1',
    extralink: false,
    submenu: []
  },
  {
    path: '/mas/campaigns',
    title: 'Campaigns',
    icon: 'fas fa-arrow-alt-circle-right',
    category: 6,
    class: '',
    code:'1',
    extralink: false,
    submenu: []
  },
  {
    path: '/mas/rewards',
    title: 'Rewards',
    icon: 'fas fa-arrow-alt-circle-right',
    category: 6,
    class: '',
    code:'1',
    extralink: false,
    submenu: []
  },
];
