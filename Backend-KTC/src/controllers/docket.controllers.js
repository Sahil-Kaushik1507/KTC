import asyncHandler from "../utils/asynHandler.js";
import { addDocket } from "../db/set.dockets.js";

const nextDocketNo = {
  compnayName: 0,
  Halonix: 11,
  Hilla:200,
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
    console.log(response)
    res.json({DocketNo:response});
  } catch (error) {
    console.log(error);
  }
});
