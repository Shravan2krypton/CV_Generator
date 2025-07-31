// Handle CV form submission and save data
const cvForm = document.getElementById('cvForm');

if (cvForm) {
  cvForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const photoFile = document.getElementById('photo').files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        linkedin: document.getElementById('linkedin').value,
        website: document.getElementById('website').value,
        about: document.getElementById('about').value,
        skills: document.getElementById('skills').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        projects: document.getElementById('projects').value,
        certifications: document.getElementById('certifications').value,
        photo: reader.result // Base64 encoded image
      };

      localStorage.setItem('cvData', JSON.stringify(data));
      window.location.href = "cv.html";
    };

    if (photoFile) {
      reader.readAsDataURL(photoFile);
    } else {
      // If no photo, still save other data
      const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        linkedin: document.getElementById('linkedin').value,
        website: document.getElementById('website').value,
        about: document.getElementById('about').value,
        skills: document.getElementById('skills').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        projects: document.getElementById('projects').value,
        certifications: document.getElementById('certifications').value,
        photo: ""
      };
      localStorage.setItem('cvData', JSON.stringify(data));
      window.location.href = "cv.html";
    }
  });
}

// On cv.html - Load and display data
if (window.location.pathname.includes('cv.html')) {
  const data = JSON.parse(localStorage.getItem('cvData'));
  if (data) {
    document.getElementById('cvName').textContent = data.name || "";
    document.getElementById('cvEmail').textContent = data.email || "";
    document.getElementById('cvPhone').textContent = data.phone || "";
    document.getElementById('cvAddress').textContent = data.address || "";
    document.getElementById('cvLinkedin').textContent = data.linkedin || "";
    document.getElementById('cvWebsite').textContent = data.website || "";
    document.getElementById('cvAbout').textContent = data.about || "";
    document.getElementById('cvExperience').textContent = data.experience || "";
    document.getElementById('cvEducation').textContent = data.education || "";
    document.getElementById('cvProjects').textContent = data.projects || "";
    document.getElementById('cvCertifications').textContent = data.certifications || "";

    // Skills as list items
    const skillList = document.getElementById('cvSkills');
    skillList.innerHTML = "";
    if (data.skills) {
      data.skills.split(',').forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill.trim();
        skillList.appendChild(li);
      });
    }

    if (data.photo && data.photo !== "") {
      document.getElementById('cvPhoto').src = data.photo;
    }
  }

  // Download CV as PDF
  document.getElementById('downloadBtn').addEventListener('click', () => {
    const cvSection = document.querySelector('.cv-container');
    html2canvas(cvSection, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('My_CV.pdf');
    });
  });
}
