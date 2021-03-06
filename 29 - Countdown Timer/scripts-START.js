// let countdown
let raf
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')

function startTimer() {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}

function timer(seconds) {
  cancelAnimationFrame(raf)

  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  displayEndTime(then)

  raf = requestAnimationFrame(() => countdown(then))

  // countdown = setInterval(() => {
  //   const secondsLeft = Math.round((then - Date.now()) / 1000)
  //   if(secondsLeft < 0){
  //     clearInterval(countdown)
  //     return
  //   }
  //   displayTimeLeft(secondsLeft)
  // }, 1000)
}

function countdown(then) {
  const secondsLeft = Math.round((then - Date.now()) / 1000)
    if(secondsLeft >= 0){
      displayTimeLeft(secondsLeft)
      raf = requestAnimationFrame(() => countdown(then))
    }else{
      timerDisplay.textContent = 'Time Up !!'
    }
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  document.title = display
  timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  const adjustedHour = hour > 12 ? hour - 12 : hour
  // The getMinutes() method returns the minutes in the specified date according to local time.
  const minutes = end.getMinutes()
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`
}


buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e){
  e.preventDefault()
  const mins = this.minutes.value
  timer(mins * 60)
  this.reset()
})