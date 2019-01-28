function setStr(data) {
  if (data != null) {
    return "'" + data;
  }else {
    return data;
  }
}

// left padding
function leftPad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}