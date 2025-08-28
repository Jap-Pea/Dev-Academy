// =====================================================
// Surprise Video
// =====================================================
const showVideoBtn = document.getElementById('showVideoBtn')
const videoContainer = document.getElementById('videoContainer')
const myVideo = document.getElementById('myVideo')
const closeBtn = document.getElementById('closeBtn')

if (showVideoBtn && videoContainer && myVideo && closeBtn) {
  showVideoBtn.addEventListener('click', (e) => {
    e.preventDefault()
    videoContainer.hidden = false
    myVideo.currentTime = 0
    myVideo.muted = false
    myVideo.play().catch((err) => console.warn('Autoplay issue:', err))
  })

  closeBtn.addEventListener('click', () => {
    myVideo.pause()
    videoContainer.hidden = true
  })
}

// =====================================================
// Notes Feature (guarded)
// =====================================================
const noteForm = document.getElementById('noteForm')
const nameInput = document.getElementById('nameInput')
const noteInput = document.getElementById('noteInput')
const publicCheckbox = document.getElementById('publicCheckbox')
const noteList = document.getElementById('noteList')
const adminToggle = document.getElementById('adminToggle')
let isAdminView = false

let notes = []
try {
  notes = JSON.parse(localStorage.getItem('notes')) || []
} catch {
  notes = []
}

function renderNotes() {
  if (!noteList) return
  noteList.innerHTML = ''
  notes.forEach((note, index) => {
    if (!note.public && !isAdminView) return
    const li = document.createElement('li')
    li.innerHTML = `
      <input type="checkbox" ${
        note.checked ? 'checked' : ''
      } data-index="${index}" class="check-note">
      <strong>${note.name}</strong>: ${note.text}
      <span>${note.public ? '🌐 Public' : '🔒 Private'}</span>
      <button data-index="${index}" class="delete-note">❌</button>
    `
    noteList.appendChild(li)
  })
}

if (noteForm && nameInput && noteInput && publicCheckbox) {
  noteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newNote = {
      name: nameInput.value.trim(),
      text: noteInput.value.trim(),
      checked: false,
      public: publicCheckbox.checked,
    }
    if (newNote.name && newNote.text) {
      notes.push(newNote)
      localStorage.setItem('notes', JSON.stringify(notes))
      renderNotes()
      noteForm.reset()
    }
  })
}

if (noteList) {
  noteList.addEventListener('click', (e) => {
    const index = e.target.dataset.index
    if (index === undefined) return
    if (e.target.classList.contains('check-note')) {
      notes[index].checked = !notes[index].checked
    } else if (e.target.classList.contains('delete-note')) {
      notes.splice(index, 1)
    }
    localStorage.setItem('notes', JSON.stringify(notes))
    renderNotes()
  })
}

if (adminToggle) {
  adminToggle.addEventListener('change', () => {
    isAdminView = adminToggle.checked
    renderNotes()
  })
}

// =====================================================
// Matrix Rain Effect
// =====================================================
const matrixCanvas = document.createElement('canvas')
matrixCanvas.id = 'matrixCanvas'
document.body.appendChild(matrixCanvas)
const ctx = matrixCanvas.getContext('2d')
let matrixAnimation

function startMatrixRain() {
  matrixCanvas.style.display = 'block'
  matrixCanvas.width = window.innerWidth
  matrixCanvas.height = window.innerHeight

  const letters =
    'アァイィウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(
      ''
    )
  const fontSize = 14
  const columns = matrixCanvas.width / fontSize
  const drops = Array(Math.floor(columns)).fill(1)

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height)

    ctx.fillStyle = '#0F0'
    ctx.font = fontSize + 'px monospace'

    drops.forEach((y, i) => {
      const text = letters[Math.floor(Math.random() * letters.length)]
      const x = i * fontSize
      ctx.fillText(text, x, y * fontSize)

      if (y * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    })

    matrixAnimation = requestAnimationFrame(draw)
  }

  draw()
}

function stopMatrixRain() {
  cancelAnimationFrame(matrixAnimation)
  matrixCanvas.style.display = 'none'
}

// =====================================================
// Admin Login
// =====================================================
const adminLoginBtn = document.getElementById('adminLoginBtn')
const adminPasswordInput = document.getElementById('adminPassword')

if (adminLoginBtn && adminPasswordInput) {
  adminLoginBtn.addEventListener('click', () => {
    const password = adminPasswordInput.value

    if (password === 'password') {
      startMatrixRain()
      setTimeout(() => {
        stopMatrixRain()
        alert('Nice work, Hacker. Welcome to the code.')

        const adminToggleWrapper = document.getElementById('adminToggleWrapper')
        if (adminToggleWrapper) adminToggleWrapper.style.display = 'flex'

        isAdminView = true
        renderNotes()

        adminLoginBtn.disabled = true
        adminPasswordInput.disabled = true
        adminPasswordInput.value = '✔'
      }, 3000)
    } else {
      alert("That's not the password, Agent Smith. Try 'password' again.")
    }
  })
}

// =====================================================
// Nav toggle (desktop + mobile) with outside click + ESC
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuToggle')
  const links = document.getElementById('siteLinks')
  if (!menuBtn || !links) return

  // Start closed
  links.classList.remove('is-open')
  menuBtn.setAttribute('aria-expanded', 'false')

  // Toggle on click
  menuBtn.addEventListener('click', () => {
    const open = links.classList.toggle('is-open')
    menuBtn.setAttribute('aria-expanded', String(open))
  })

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!links.classList.contains('is-open')) return
    if (!menuBtn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('is-open')
      menuBtn.setAttribute('aria-expanded', 'false')
    }
  })

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('is-open')) {
      links.classList.remove('is-open')
      menuBtn.setAttribute('aria-expanded', 'false')
      menuBtn.focus()
    }
  })
})
