import asyncHandler from "../utils/asynHandler.js";
import { addDocket } from "../db/Docket/set.dockets.js";
import { getConsignorDetails } from "../db/Add/get.consignorDetails.js";
import { getBranchDetails } from "../db/Add/get.BranchDetails.js";

const nextDocketNo = {
  compnayName: 0,
  Halonix: 11,
  Hilla: 200,
};

export const addNewDocket = asyncHandler(async (req, res) => {
  try {
    // console.log();
    const response = addDocket(Object.values(req.body));
    res.send(response);

    if (response) {
      nextDocketNo[req.body.compnayName]++;
    }
  } catch (error) {
    console.log(error);
  }
});

export const sendNextDocketNo = asyncHandler(async (req, res) => {
  try {
    // console.log(req.query);
    const { companyName } = req.query;
    const response = nextDocketNo[companyName];
    const response1 = await getConsignorDetails();
    const response2 = await getBranchDetails();

    console.log(response);
    console.log(response1)
    res.json({ DocketNo: response , consignorDetails:response1, BranchDetails:response2});
  } catch (error) {
    console.log(error);
  }
});
