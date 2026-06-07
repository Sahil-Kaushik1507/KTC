import { Route } from "react-router-dom";

import NewDocketLayout from "../layout/NewDocketLayout";

import Basic_Truck_docket from "../components/newDocket/steps/Basic_Truck_docket";
import Parties_docket from "../components/newDocket/steps/Parties_Items_docket";
import Invoice_Eway_docket from "../components/newDocket/steps/Invoice_eway_docket";
import Freight_docket from "../components/newDocket/steps/Freight_docket";
import Billing_Remarks_docket from "../components/newDocket/steps/Billing_Remarks_docket";

export const DocketRoutes = (
  <>
    {/* Create Docket */}
    <Route  path="/docket/new"
      element={<NewDocketLayout/>}>
      <Route
        path=""
        element={<Basic_Truck_docket/>}
      />

    
      <Route
        path="parties-item"
        element={<Parties_docket/>}
      />

      <Route
        path="invoice-eway"
        element={<Invoice_Eway_docket/>}
      />

      <Route
        path="freight"
        element={<Freight_docket/>}
      />
      <Route
        path="billing-remarks"
        element={<Billing_Remarks_docket/>}
      />
    </Route>

    {/* View Docket */}
    <Route
      path="/docket/view"
      element={<h1>View Docket</h1>}
    />
  </>
);