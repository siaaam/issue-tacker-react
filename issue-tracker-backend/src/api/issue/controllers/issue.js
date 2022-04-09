"use strict";

/**
 *  issue controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::issue.issue", ({ strapi }) => ({
  async create(ctx) {
    // console.log(ctx.state.user);
    const author = ctx.state.user.id;
    ctx.request.body.data.author = author;
    // console.log(ctx.request.body.data);
    // some logic here
    const response = await super.create(ctx);
    // some more logic

    return response;
  },
}));
