if(cvForm){
  cvForm.addEventListener('submit', function(e){
    e.preventDefault();
    const photoFile = document.getElementById('photo').files[0];
    const reader = new FileReader();

    reader.onload = function(){
      const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        about: document.getElementById('about').value,
        skills: document.getElementById('skills').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        photo: reader.result   // save image as Base64
      };
      localStorage.setItem('cvData', JSON.stringify(data));
      window.location.href = "cv.html";
    };

    if(photoFile){
      reader.readAsDataURL(photoFile);
    }
  });
}

// On cv.html load photo
if(window.location.pathname.includes('cv.html')){
  const data = JSON.parse(localStorage.getItem('cvData'));
  if(data){
    document.getElementById('cvPhoto').src = data.photo;
    // ... (rest of existing code)
  }
}


// Download CV as PDF
if(window.location.pathname.includes('cv.html')){
    document.getElementById('downloadBtn').addEventListener('click', () => {
        const cvSection = document.querySelector('.cv-container'); // wrapper div of CV
        html2canvas(cvSection, {scale: 2}).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save('My_CV.pdf');
        });
    });
}

