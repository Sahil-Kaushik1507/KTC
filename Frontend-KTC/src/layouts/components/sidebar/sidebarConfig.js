
export const SIDEBAR_ITEMS = [
  {
    id: 1,
    label: "Docket",

    children: [
      {
        id: 11,
        label: "Create Docket",
        path: "/docket/new",
      },

      {
        id: 12,
        label: "View Docket",
        path: "/docket/view",
      },
    ],
  },

  {
    id: 2,
    label: "Bill",

    children: [
      {
        id: 21,
        label: "Create Bill",
        path: "/bill/create",
      },

      {
        id: 22,
        label: "Bill List",
        path: "/bill/list",
      },
    ],
  },
  {
    id: 3,
    label: "Payment",

    children: [
      {
        id: 31,
        label: "New Payment",
        path: "/payment/new",
      },

      {
        id: 32,
        label: "Payment History",
        path: "/payment/history",
      },
    ],
  },
  {
    id: 4,
    label: "Add",

    children: [
      {
        id: 41,
        label: "Party",
        path: "/party/new",
      },

      {
        id: 42,
        label: "Branch",
        path: "/branch/new",
      },
    ],
  },
];