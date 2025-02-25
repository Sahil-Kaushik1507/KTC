import NewDocket from "./Docket/New Docket/NewDocket";




const ComponentMap = {
    Docket: {
      "New Docket": <NewDocket/>,
      "View Docket": <>View Dockets</>,
      Welcome: <>Welcome</>,
    },
    Bill: {
      "New Bill": <>New Bill</>,
      "View Bill": <>View Bills</>,
      Welcome: <>Welcome</>,
    },
    Payment: {
      "New Payment": <>New Payment</>,
      "View Payment": <>View Payments</>,
      Welcome: <>Welcome</>,
    },
    Welcome: {
      Welcome: <>Welcome</>,
    },
  };

  export default ComponentMap;