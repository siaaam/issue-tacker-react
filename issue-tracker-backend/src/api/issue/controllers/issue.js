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

  async delete(ctx) {
    // some logic here
    const authorID = ctx.state.user.id;
    const { id } = ctx.params;

    // check author id
    // compare author
    const foundIssue = await strapi.entityService.findOne(
      "api::issue.issue",
      +id,
      {
        populate: "author",
      }
    );

    if (!foundIssue) {
      ctx.notFound("Issue is not found to be deleted");
    }

    if (foundIssue && foundIssue.author.id !== authorID) {
      // not the owner
      return ctx.unauthorized("You are not owner of the issue");
    }

    const response = await super.delete(ctx);
    // some more logic

    return response;
  },

  async update(ctx) {
    // some logic here
    const authorID = ctx.state.user.id;
    const { id } = ctx.params;

    const foundIssue = await strapi.entityService.findOne(
      "api::issue.issue",
      +id,
      {
        populate: "author",
      }
    );

    if (!foundIssue) ctx.notFound("Issue is not found to be updated");
    if (foundIssue && foundIssue.author.id !== authorID) {
      // not the owner
      return ctx.unauthorized("You are not owner of the issue");
    }

    const response = await super.update(ctx);
    // some more logic

    return response;
  },
}));
