function loadProjects() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "projects.html", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        document.getElementById("content").innerHTML = xhr.responseText;
      }
    };
    xhr.send();
  }
  
  function loadContactForm() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "contact.html", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        document.getElementById("content").innerHTML = xhr.responseText;
      }
    };
    xhr.send();
  }
  