// --- Surprise Video ---
const showVideoBtn = document.getElementById('showVideoBtn')
const videoContainer = document.getElementById('videoContainer')
const myVideo = document.getElementById('myVideo')
const closeBtn = document.getElementById('closeBtn')

showVideoBtn.addEventListener('click', function (e) {
  e.preventDefault()
  videoContainer.hidden = false
  myVideo.currentTime = 0
  myVideo.muted = false
  myVideo.play().catch((err) => console.warn('Autoplay issue:', err))
})

closeBtn.addEventListener('click', function () {
  myVideo.pause()
  videoContainer.hidden = true
})

// --- Notes Feature ---
const noteForm = document.getElementById('noteForm')
const nameInput = document.getElementById('nameInput')
const noteInput = document.getElementById('noteInput')
const publicCheckbox = document.getElementById('publicCheckbox')
const noteList = document.getElementById('noteList')
const adminToggle = document.getElementById('adminToggle')
const adminToggleWrapper = document.getElementById('adminToggleWrapper')
let isAdminView = false

let notes = JSON.parse(localStorage.getItem('notes')) || []

function renderNotes() {
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

noteList.addEventListener('click', (e) => {
  const index = e.target.dataset.index
  if (e.target.classList.contains('check-note')) {
    notes[index].checked = !notes[index].checked
  } else if (e.target.classList.contains('delete-note')) {
    notes.splice(index, 1)
  }
  localStorage.setItem('notes', JSON.stringify(notes))
  renderNotes()
})

adminToggle.addEventListener('change', () => {
  isAdminView = adminToggle.checked
  renderNotes()
})

// --- Matrix Rain Effect ---
const canvas = document.createElement('canvas')
canvas.id = 'matrixCanvas'
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')
let matrixAnimation

function startMatrixRain() {
  canvas.style.display = 'block'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const letters =
    'アァイィウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(
      ''
    )
  const fontSize = 14
  const columns = canvas.width / fontSize
  const drops = Array(Math.floor(columns)).fill(1)

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#0F0'
    ctx.font = fontSize + 'px monospace'

    drops.forEach((y, i) => {
      const text = letters[Math.floor(Math.random() * letters.length)]
      const x = i * fontSize
      ctx.fillText(text, x, y * fontSize)

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
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
  canvas.style.display = 'none'
}

// --- Admin Login ---
const adminLoginBtn = document.getElementById('adminLoginBtn')
const adminPasswordInput = document.getElementById('adminPassword')

adminLoginBtn.addEventListener('click', () => {
  const password = adminPasswordInput.value

  if (password === 'password') {
    startMatrixRain()

    // Delay popup so Matrix effect shows first
    setTimeout(() => {
      stopMatrixRain()
      alert('Nice work, Hacker. Welcome to the code.')

      document.getElementById('adminToggleWrapper').style.display = 'flex'
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
