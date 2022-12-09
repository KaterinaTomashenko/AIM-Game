const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors =['#3fe22b', '#f0b91f', '#3d73dd', '#44dba5', '#61f000m', '#ff9079', '#c6f496', '#ff435a', '#a802a8', '#61dded', '#f5b590', '#daf52c','#f25ac7']
let time = 0
let score = 0


startBtn.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', (event) => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle()
	}
})

function startGame() {
	setInterval(decreaseTime,1000)
	createRandomCircle()
	setTime(time)
}

function decreaseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
	if (current<10) {
		current=`0${current}`
	}
	setTime(current)
	}
}
function setTime(value) {
	timeEl.innerHTML= `00:${value}`	
}

function finishGame() {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<hi  class='text'>Score: <span class='primary'>${score}</span></hi>`
}

function createRandomCircle() {
	const circle = document.createElement('div')
	const size = getRandomNumber(20, 60)
	const {width,height} = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)
	
	circle.classList.add('circle')
	circle.style.backgroundColor = getRandomColor(colors)
	circle.style.boxShadow = `0 0 2px ${getRandomColor(colors)}, 0 0 5px ${getRandomColor(colors)}`

	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${x}px`
	circle.style.left = `${y}px`

	board.append(circle)
}

function getRandomNumber(min, max) {
	return Math.round(Math.random()*(max-min)+min)
	
}

function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length)
	return colors[index]
}