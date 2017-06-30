/* jshint node: true */
'use strict';

import express     from 'express';
import controllers from './controllers';
import $           from './helpers';

const router = express.Router();
const authSession = $.auth.session;


// account

router.post('/account/github',  controllers.account.github);
router.post('/account/logout',    controllers.account.logout);

//                             bucket
router.get('/buckets',         authSession, controllers.bucket.all);
router.get('/buckets/:id',     authSession, controllers.bucket.find);
router.post('/buckets',        authSession, controllers.bucket.create);
router.delete('/buckets',      authSession, controllers.bucket.delete);
router.post('/bucket/verify', controllers.bucket.verify);

module.exports = router
