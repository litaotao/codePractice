prettyPrint();

function numberingStart(cname) {
  var nstring = " linenums:";
  
  var index = cname.indexOf(nstring);
  if (index >= 0) {
    var end = cname.indexOf(" ", index + nstring.length);
    if (end < 0) end = cname.length;
    
    var numString = cname.substring(index + nstring.length, end);
    return parseInt(numString);
  }
  return 1;
}

function addLineHighlights() {
  var hstring = " highlight:";
  var elems = document.getElementsByTagName("pre");
  
  for (var i = 0; i < elems.length; i++) {
    var elem = elems[i];
    var cname = elem.className;
    
    var index = cname.indexOf(hstring);
    if (index >= 0) {
      var end = cname.indexOf(" ", index + hstring.length);
      if (end < 0) end = cname.length;
      
      var args = cname.substring(index + hstring.length, end);
      var ranges = args.split(",");
      var lines = elem.getElementsByTagName("li");
      
      for (var r = 0; r < ranges.length; r++) {
        var range = ranges[r].split("-");
        var numStart = numberingStart(cname);
        var from = parseInt(range[0]);
        var to = from;
        if (range.length > 1) to = parseInt(range[1]);
        
        highlightLines(lines, from - numStart, to - numStart);
      }
    }
  }
}

function highlightLines(lines, from, to) {
  for (var i = from; i <= to; i++) {
    var line = lines[i];
    
    if (line.className == null || line.className == "") {
      line.className = "highlighttrigger";
    }
    else {
      line.className = line.className + " highlighttrigger";
    }
  }
}

addLineHighlights();
