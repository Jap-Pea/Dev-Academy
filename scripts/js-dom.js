document.addEventListener('DOMContentLoaded', () => {
  // ===== DOM demo: toggle heading text =====
  const sceneTitle = document.getElementById('sceneTitle')
  const toggleTitleBtn = document.getElementById('toggleTitleBtn')
  if (sceneTitle && toggleTitleBtn) {
    let toggled = false
    toggleTitleBtn.addEventListener('click', () => {
      toggled = !toggled
      sceneTitle.textContent = toggled
        ? "Game Started — Let's Go!"
        : 'Loading screen: Press Start'
    })
  }

  // ===== Loop demo: MMA rounds =====
  const startRoundsBtn = document.getElementById('startRoundsBtn')
  const roundsList = document.getElementById('roundsList')
  if (startRoundsBtn && roundsList) {
    startRoundsBtn.addEventListener('click', () => {
      roundsList.innerHTML = ''
      for (let round = 1; round <= 3; round++) {
        const li = document.createElement('li')
        li.textContent = `Round ${round}: jab, cross, hook`
        roundsList.appendChild(li)
      }
    })
  }

  // ===== Arrays and Objects demo =====
  const showRosterBtn = document.getElementById('showRosterBtn')
  const rosterOut = document.getElementById('rosterOut')
  const roster = ['Adesanya', 'Hooker', 'Volkanovski']
  if (showRosterBtn && rosterOut) {
    showRosterBtn.addEventListener('click', () => {
      rosterOut.textContent = ` roster[1] → ${roster[1]}`
    })
  }

  const showWeightBtn = document.getElementById('showWeightBtn')
  const fighterOut = document.getElementById('fighterOut')
  const fighter = { name: 'Adesanya', weight: '185lbs', wins: 24 }
  if (showWeightBtn && fighterOut) {
    showWeightBtn.addEventListener('click', () => {
      fighterOut.textContent = ` fighter.weight → ${fighter.weight}`
    })
  }

  // ===== MMA function example =====
  function comboOne() {
    return 'jab → cross → hook → low kick'
  }

  const comboBtn = document.getElementById('comboBtn')
  const comboOut = document.getElementById('comboOutput')
  const comboCode = document.getElementById('comboCode')

  if (comboBtn && comboOut && comboCode) {
    comboBtn.addEventListener('click', () => {
      // Run the function and show the result
      comboOut.textContent = comboOne()

      // Unhide the function code
      comboCode.hidden = false

      // Disable button so it only reveals once
      comboBtn.disabled = true
      comboBtn.textContent = 'Revealed!'
    })
  }
})
