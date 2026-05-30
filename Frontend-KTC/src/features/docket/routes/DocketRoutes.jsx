import { Route } from "react-router-dom";

import BranchSelection from "../components/newDocket/steps/Basic_docket";
import NewDocketLayout from "../layout/NewDocketLayout";
import Loader from "../../../Components/loader/Loader";
import Basic_docket from "../components/newDocket/steps/Basic_docket";

export const DocketRoutes = (
  <>
    {/* Create Docket */}
    <Route  path="/docket/new"
      element={<NewDocketLayout/>}>
      <Route
        path=""
        element={<Basic_docket/>}
      />

    

      <Route
        path="consignor"
        element={<>Consignor</>}
      />

      <Route
        path="consignee"
        element={<>Consignee</>}
      />

      <Route
        path="charges"
        element={<>Charges</>}
      />

      <Route
        path="review"
        element={<>Review</>}
      />
    </Route>

    {/* View Docket */}
    <Route
      path="/docket/view"
      element={<h1>View Docket</h1>}
    />
  </>
);