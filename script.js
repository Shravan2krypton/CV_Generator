// ✅ Handle CV form submission
const cvForm = document.getElementById('cvForm');

if (cvForm) {
  cvForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const photoFile = document.getElementById('photo').files[0];
    const reader = new FileReader();

    // Save CV data function
    const saveData = (photoBase64 = "") => {
      const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        about: document.getElementById('about').value,
        skills: document.getElementById('skills').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        photo: photoBase64
      };
      localStorage.setItem('cvData', JSON.stringify(data));
      window.location.href = "cv.html";
    };

    if (photoFile) {
      reader.onload = function () {
        saveData(reader.result); // Save with photo
      };
      reader.readAsDataURL(photoFile);
    } else {
      saveData(""); // Save without photo
    }
  });
}

// ✅ Populate CV on cv.html
if (window.location.pathname.includes('cv.html')) {
  const data = JSON.parse(localStorage.getItem('cvData'));

  if (data) {
    document.getElementById('cvName').innerText = data.name;
    document.getElementById('cvEmail').innerText = data.email;
    document.getElementById('cvPhone').innerText = data.phone;
    document.getElementById('cvAbout').innerText = data.about;
    document.getElementById('cvSkills').innerText = data.skills;
    document.getElementById('cvExperience').innerText = data.experience;
    document.getElementById('cvEducation').innerText = data.education;

    if (data.photo && document.getElementById('cvPhoto')) {
      document.getElementById('cvPhoto').src = data.photo;
    }
  }

  // ✅ Download CV as PDF
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const cvSection = document.querySelector('.cv-container'); // wrapper div of CV
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
}
