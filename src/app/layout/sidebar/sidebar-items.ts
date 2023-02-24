import { RouteInfo } from "./sidebar.metadata";
export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "MENUITEMS.MAIN.TEXT",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    submenu: [],
  },
  {
    path: "dashboard/",
    title: "MENUITEMS.DASHBOARD.TEXT",
    iconType: "feather",
    icon: "home",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [],
  },
  {
    path: "menu-subMenu",
    title: "Menu & Sub-Menu",
    iconType: "feather",
    icon: "trello",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [],
  },

  {
    path: "",
    title: "Pages",
    iconType: "feather",
    icon: "home",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [
      {
        path: "/content-pages/add-pages",
        title: "Add Pages",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
      {
        path: "/content-pages/pages-details",
        title: "Pages Details",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
    ],
  },

  // {
  //   // path: "",
  //   // title: "Add Pages",
  //   // iconType: "feather",
  //   // icon: "chevrons-right",
  //   // class: "menu-toggle",
  //   // groupTitle: false,
  //   // badge: "",
  //   // badgeClass: "",
  //   path: "",
  //   title: "Authentication",
  //   iconType: "feather",
  //   icon: "user-check",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   submenu: [
  //     {
  //       path: "extra-pages/blank",
  //       title: "Add Pages",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //     {
  //       path: "extra-pages/blank",
  //       title: "Pages Table",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //   ],
  // },

  // {
  //   path: "/extra-pages/blank",
  //   title: "MENU & SUB-MENU",
  //   iconType: "feather",
  //   icon: "trello",
  //   class: "",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   submenu: [],
  // },

  // Common Modules
  // {
  //   path: "",
  //   title: "Authentication",
  //   iconType: "feather",
  //   icon: "user-check",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   submenu: [
  //     {
  //       path: "/authentication/signin",
  //       title: "Sign In",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/signup",
  //       title: "Sign Up",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/forgot-password",
  //       title: "Forgot Password",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/locked",
  //       title: "Locked",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/page404",
  //       title: "404 - Not Found",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/page500",
  //       title: "500 - Server Error",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: "",
  //   title: "Extra Pages",
  //   iconType: "feather",
  //   icon: "anchor",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   submenu: [
  //     {
  //       path: "/extra-pages/blank",
  //       title: "Blank Page",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: "",
  //   title: "Multi level Menu",
  //   iconType: "feather",
  //   icon: "chevrons-down",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   submenu: [
  //     {
  //       path: "/multilevel/first1",
  //       title: "First",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //     {
  //       path: "/",
  //       title: "Second",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-sub-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [
  //         {
  //           path: "/multilevel/secondlevel/second1",
  //           title: "Second 1",
  //           iconType: "",
  //           icon: "",
  //           class: "ml-menu2",
  //           groupTitle: false,
  //           badge: "",
  //           badgeClass: "",
  //           submenu: [],
  //         },
  //         {
  //           path: "/",
  //           title: "Second 2",
  //           iconType: "",
  //           icon: "",
  //           class: "ml-sub-menu2",
  //           groupTitle: false,
  //           badge: "",
  //           badgeClass: "",
  //           submenu: [
  //             {
  //               path: "/multilevel/thirdlevel/third1",
  //               title: "third 1",
  //               iconType: "",
  //               icon: "",
  //               class: "ml-menu3",
  //               groupTitle: false,
  //               badge: "",
  //               badgeClass: "",
  //               submenu: [],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       path: "/multilevel/first3",
  //       title: "Third",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //   ],
  // },
];