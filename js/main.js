  class TypeWriter {
    constructor(element, words, period) {
      this.element = element;
      this.words = JSON.parse(words);
      this.period = period || 2000;
      this.txt = '';
      this.wordIndex = 0;
      this.isDeleting = false;
      this.tick();
      this.isCursorVisible = true;
    }
  
    tick() {
      const current = this.wordIndex % this.words.length;
      const fullText = this.words[current];
  
      if (this.isDeleting) {
        this.txt = fullText.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullText.substring(0, this.txt.length + 1);
      }
  
      this.element.innerHTML = `<span class="typewrite-text">${this.txt}</span><span class="cursor"></span>`;
  
      let typingSpeed = 90;
      if (this.isDeleting) {
        typingSpeed /= 2;
      }
  
      if (!this.isDeleting && this.txt === fullText) {
        typingSpeed = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typingSpeed = 500;
      }
  
      setTimeout(() => this.tick(), typingSpeed);
    }
  }
  
  window.onload = function () {
    const element = document.querySelector('.typewrite');
    const words = element.getAttribute('data-type');
    const period = element.getAttribute('data-period');
    new TypeWriter(element, words, period);
  };



  document.querySelectorAll('.navbar-container a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
  
      window.scrollTo({
        top: targetElement.offsetTop - 50, // Sesuaikan nilai offset (misalnya 50px untuk memberi ruang)
        behavior: 'smooth',
      });
    });
  });
  

// Menunggu halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function() {
  // Ambil semua elemen link di navbar
  const navLinks = document.querySelectorAll('.navbar-container a');

  // Fungsi untuk mengubah kelas aktif
  function setActiveLink(e) {
    // Hapus kelas 'active' dari semua link
    navLinks.forEach(link => link.classList.remove('active'));

    // Tambahkan kelas 'active' pada link yang diklik
    e.target.classList.add('active');
  }

  // Tambahkan event listener untuk setiap link
  navLinks.forEach(link => {
    link.addEventListener('click', setActiveLink);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Cek apakah ada hash di URL
  if (window.location.hash === "") {
    // Jika tidak ada hash, arahkan ke bagian "home"
    window.location.hash = "#home";
  }

  // Scroll otomatis ke bagian "home" jika tidak ada hash
  const homeSection = document.getElementById("home");
  if (homeSection) {
    window.scrollTo({
      top: homeSection.offsetTop - 50, // Sesuaikan dengan margin/offset
      behavior: "smooth"
    });
  }

  // Mengatur navbar active link pada refresh
  const currentHash = window.location.hash;
  if (currentHash) {
    const activeLink = document.querySelector(`a[href="${currentHash}"]`);
    if (activeLink) {
      setActiveLink(activeLink); // Update link navbar yang aktif
    }
  }
});

// Fungsi untuk mengubah kelas active pada navbar
function setActiveLink(activeLink) {
  const navLinks = document.querySelectorAll('.navbar-container a');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  if (activeLink) {
    activeLink.classList.add('active');
  }
}


document.addEventListener("DOMContentLoaded", function() {
  // Pastikan scroll otomatis menuju "home" pada halaman load
  const homeSection = document.getElementById("home");
  if (homeSection) {
    window.scrollTo({
      top: homeSection.offsetTop - 50, // Sesuaikan dengan margin jika perlu
      behavior: "smooth"
    });
  }

  // Menangani klik pada link navbar untuk scroll halus
  document.querySelectorAll('.navbar-container a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      window.scrollTo({
        top: targetElement.offsetTop - 50, // Menyesuaikan offset untuk navbar
        behavior: 'smooth', // Smooth scroll
      });
    });
  });

  // Menambahkan highlight active pada link navbar saat scroll
  const navLinks = document.querySelectorAll('.navbar-container a');
  const sections = document.querySelectorAll('.content-container');
  
  window.addEventListener('scroll', () => {
    let current = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 60 && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Pilih semua elemen <h2> yang ingin dianimasikan
  const h2Elements = document.querySelectorAll('h2');

  // Fungsi untuk menambahkan kelas animasi ketika elemen berada di viewport
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Tambahkan kelas animasi ketika elemen <h2> berada di layar
        entry.target.classList.add('animate');
      } else {
        // Hapus kelas animasi jika elemen keluar dari layar
        entry.target.classList.remove('animate');
      }
    });
  }, {
    threshold: 0.5 // Elemen dianggap muncul jika 50% nya terlihat di layar
  });

  // Observer semua elemen <h2>
  h2Elements.forEach(h2 => {
    observer.observe(h2);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Pilih semua elemen <h2> yang ingin dianimasikan
  const h2Elements = document.querySelectorAll('h2');

  // Fungsi untuk menambahkan kelas animasi ketika elemen berada di viewport
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Tambahkan kelas animasi ketika elemen <h2> berada di layar
        entry.target.classList.add('animate');
      } else {
        // Hapus kelas animasi jika elemen keluar dari layar
        entry.target.classList.remove('animate');
      }
    });
  }, {
    threshold: 0.5 // Elemen dianggap muncul jika 50% nya terlihat di layar
  });

  // Observer semua elemen <h2>
  h2Elements.forEach(h2 => {
    observer.observe(h2);
  });
});

