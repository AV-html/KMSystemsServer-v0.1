var labels = document.getElementsByClassName('item__wheel-show');
var cheks = document.getElementsByClassName('item__wheel-check');
var lastCkeckBox = -1; // 
window.onload = function () {
	for (var i = 0; i < cheks.length; i++) {
		cheks[i].id = "btn-" + i
	}
	for (var i = 0; i < labels.length; i++) {
		labels[i].setAttribute("for", "btn-" + i)
	}
};
function openWheelList(Btn) {
	lastCkeckBox = Btn.id.substr(-1);
};
function closeWheelList() {
	if (lastCkeckBox != -1) {
		cheks[lastCkeckBox].checked = false
	}
}

// !popup!//
const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

// Отключение двойных нажатий
let unlock = true;
// transition 0.8s (А также для блокировки скрола)
const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener("click", function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open')
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener("click", function (e) {
			// Если нету в родителях .popup__content
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	// Разница между всего окна и шириной объекта  (Чтобы убрать сдвиг при убирании полосы скрола)
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPaddingValue > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	// Предотвращает повторный клик
	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout)
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout)

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout)
}