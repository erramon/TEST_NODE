import express = require("express");

import { checkEnvironment } from "@utils/environment.util";
import { errorList } from "@components/utils/errors";

/**
 * Check if the call has a correct API param and retrieve the API info from the environment util.
 * Then proceed to the controller if the check pass, or return a 400 error if the param is not correct.
 */
export const checkRequestedApiValidity = (
  req: any, // TODO: Extend Express.Request to add validatedApi property.
  res: express.Response,
  next: any
) => {
  const endpoints = checkEnvironment().API_MOCS;
  const requestedApi = req.query.api;

  // Check the param 'api'. It should exist in the endpoints object.
  if (requestedApi && endpoints.hasOwnProperty(requestedApi)) {
    // Retrieve the correct endpoint and store it in the request
    req.validatedApi = endpoints[requestedApi];
    return next();
  } else {
    // Return 400 error if the petition has an incorrect api param
    res.status(errorList["ApiParam"].code).send(errorList["ApiParam"].message);
    next();
  }
};
