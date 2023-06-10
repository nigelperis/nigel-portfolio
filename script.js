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

  document.addEventListener('DOMContentLoaded', function () {
    const projectsContainer = document.querySelector('#projectsContainer');
  
    // Array of projects
    const projects = [
      {
        image: '/images/proj1.jpg',
        title: 'Vegetable Disease Detection',
        description: 'Developed a web app with a CNN model using Machine Learning to classify Tomato and Corn Images into 12 diseases and identify their health status',
        githubLink: 'https://github.com/nigelperis/vegetable-disease-detection'
      },
      {
        image: '/images/proj2.jpg',
        title: 'Portfolio Site for Ganesh Designmatics Ltd',
        description: 'Developed a web app with visually appealing gallery, contact pages, and user login functionality with secure email storage.',
        githubLink: 'https://github.com/nigelperis/SiteForGaneshDesignmaticsLtd'
      }
    ];
    
    projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.classList.add('project');
      projectElement.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h2>${project.title}</h2>
        <p>${project.description}</p>
      `;
      projectElement.addEventListener('click', () => {
        window.location.href = project.githubLink;
      });
      projectsContainer.appendChild(projectElement);
    });
    
  });
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  