/* jshint node: true */
'use strict';

import models from '../models';
import Base   from './base';
import $      from '../helpers';
import axios  from 'axios';

const UserModel = models.user;
const UserAPI    = new Base({ model: UserModel });

// github login;
UserAPI.github = async function (req, res) {
  const gitConfig = $.config.gitConfig;
  const result = axios.get(`https://github.com/login/oauth/access_token?client_id=${gitConfig.client_id}&client_secret=${gitConfig.client_secret}&code=${req.body.code}`)
     .then(result => {
    const args = result.data.split('&');
    const tokenInfo = args[0].split("=");
    const token = tokenInfo[1];
    axios.get(`https://api.github.com/user?access_token=${token}`).then(async result => {
      let exist = await UserModel.find({id: result.data.id});
      if ($.empty(exist)) { exist = UserModel.create(result.data); }
      req.session.user = exist;
      return $.result(res, exist);
    }, err => {
      return $.result(res, 'github error');
    })
  }, err => {
    return $.result(res, 'github error');
  })
}

// logout
UserAPI.logout = async function(req, res, next) {
  req.session.user = null;
  $.result(res, {
    success: true
  });
}

module.exports = UserAPI
