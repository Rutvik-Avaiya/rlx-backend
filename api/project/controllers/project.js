'use strict';
const { parseMultipartData, sanitizeEntity, models, finder } = require('strapi-utils');

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { get } = require('strapi-utils/lib/policy');
const jwt_decode = require('jwt-decode')

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

 
module.exports = {
    async create(ctx){   
      // always call service from controller
      
      // always return from functions either async or sync
      const authToken = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);
      const { id } = ctx.state.user
      console.log("This is  project content type's controller")
      const { token, domain, name, channel } = ctx.request.body.data

      // if(!token || !domain || !name || !channel){
      //     ctx.body = {
      //         status: 422,
      //         message: 'Please provide required fields'
      //     }
      //     return;
      //}
      const model = await strapi.models.project.forge({
          name,
          domain,
          slack_channel: channel,
          slack_token:token,
          users_permissions_user: id
      }).save();
      return model;
  },
  async get(ctx) {
    const token = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);
    const { id } = ctx.state.user 
    const project = await strapi.models.project.where({
      users_permissions_user: id
    }).fetchAll();
    return project;
  },   
}

