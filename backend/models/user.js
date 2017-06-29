/**
 * @author jk
 * @version 1.0.0
 */

import $    from '../helpers';
import Base from './base';

const User = new Base('User', {
  login:        String,
  id:           Number,
  avatar_url:   String,
  url:          String,
  html_url:     String,
  name:         String,
  company:      String,
  blog:         String,
  location:     String,
  email:        String,
  bio:          String,
  public_repos: Number,
  public_gists: Number,
  followers:    Number,
  following:    Number,
  createdAt:   { type: Date, default: Date.now},
  meta:         {},
});

export default User
