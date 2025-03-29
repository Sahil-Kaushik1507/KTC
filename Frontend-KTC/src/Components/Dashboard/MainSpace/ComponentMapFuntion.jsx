import NewDocket from "./Docket/New Docket/NewDocket";
import ViewDocket from "./Docket/View Docket/ViewDocket";

const ComponentMap = {
  Docket: {
    "New Docket": <NewDocket />,
    "View Docket": <ViewDocket />,
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
    Welcome: (
      <>
        <div className="m-14 flex justify-center">
          <img
            src="./Images/logo/Logo-jpg-1.jpg"
            alt="Logo"
            className="h-80 rounded-xl"
          />
        </div>
      </>
    ),
  },
};

export default ComponentMap;
