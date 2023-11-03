import user from "./user-details";

const cardWidth = "30ch"

const currencies = [
    {
      value: 'naira',
      label: 'Naira',
    },
    {
      value: 'dollar',
      label: 'Dollar',
    },
    {
      value: 'euro',
      label: 'Euro',
    }
  ];

const currencySymbols = {
    NAIRA: "₦",
    DOLLAR: "$",
    EURO: "€"
}

const paymentPlan = [
    {
        value: "daily",
        label: "Daily"
    },
    {
        value: "weekly",
        label: "Weekly"
    },
    {
        value: "monthly",
        label: "Monthly"
    },
    {
        value: "yearly",
        label: "Yearly"
    }
]

const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;

// dev
// const url = "http://localhost:8000/graphql"
// const uiUrl = "http://localhost:3000"
// const baseUrl = "http://localhost:8000"

// prod
const url = "https://api.baymoon.app/graphql"
const uiUrl = "http://baymoon.app"
const baseUrl = "https://api.baymoon.app"

export {
    cardWidth,
    url,
    uiUrl,
    baseUrl,
    currencies,
    currencySymbols,
    paymentPlan,
    features
}