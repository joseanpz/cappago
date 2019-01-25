
function keyValueFilter(key, value) {
  var filter = function(record) {
    return record[key] === value;
  }
  return filter;
}