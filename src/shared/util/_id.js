import randomString from "./randomString";

/** Adapted from http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery **/

var _id = function(base){
  base = base || randomString();

  var hash = 0, i, chr, len;

  if (base.length === 0) return false;

  for (i = 0, len = base.length; i < len; i++) {
    chr   = base.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};

export default _id;