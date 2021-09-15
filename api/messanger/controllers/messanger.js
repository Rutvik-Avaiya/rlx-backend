'use strict';
const axios = require('axios');
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  talk: async (ctx) => {
    //get the token
    console.log(ctx.request.body);
    const { token } = ctx.request.body
    // const { data } = ctx.request.body.text
    console.log(token)
    //console.log(data)
    

    //perform the database query, find the project having token as given in request header
    const project = await strapi.query('project').findOne({ slack_token:token });
    console.log(project)
    
    //call the slack api if the project found.
    //use slack channelId from the project object retrieved from database
    const url = "https://slack.com/api/chat.postMessage";
    try{ 
      const slackResponse = await axios.post(url, {
        channel: project.slack_channel,
        text: ctx.request.body.text
      },
      {
        headers: {
          Authorization : `Bearer ${project.slack_token}`
        }
      });
      return slackResponse.data
    }
    catch(e){
      return e;
    }
  }
};
 