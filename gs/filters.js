
function keyValueFilter(key, value) {
  var filtr = function(record) {
    return record[key] === value;
  }
  return filtr;
}