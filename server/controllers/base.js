/**
 * @author jk
 * @version 1.0.0
 */
import $ from '../helpers';

export default class Base {
  constructor(options) {
    this.model   = options.model || {};
    addMethods(this);
  }
}


function addMethods(_this) {
  _this.find = async function(req, res, next) {
    $.result(res, await _this.model.find({_id: req.params.id}));
  }

  _this.all = async function(req, res, next) {
    $.result(res, await _this.model.all({}, req.query.start));
  }

  _this.create = async function(req, res, next) {
    let exist = await _this.model.find({email: req.body.email});
    if ($.empty(exist)) {
      return $.result(res, await _this.model.create(req.body));
    }
    $.debug(exist);
    $.result(res, 'already existing');
  }

  _this.update = async function(req, res, next) {
    let documents = await _this.model.update({
      "_id": req.params.id
    }, req.body)
    if (documents === -1) $.result(res, 'update failed');
    else $.result(res, documents);
  }

  _this.delete = async function(req, res, next) {
    let documents = await _this.model.delete({
      "_id": req.params.id
    })
    if (documents === -1) $.result(res, 'delete failed');
    else $.result(res, documents);
  }
}
