// var labels = document.getElementsByClassName('item__wheel-show');
var inputs = document.querySelectorAll('.item__wheel-check');
var checks = document.querySelectorAll('.item__btn');
var lastButton = -1; // 

// !Выпадающий список:
var popupNumber = document.querySelectorAll(".popup")

const selectSingle = popupNumber[0].querySelector('.select');
const selectSingle_title = selectSingle.querySelector('.select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.select__label');
const selectSingle_content = selectSingle.querySelector('.select__content');

const selectSingle_1 = popupNumber[1].querySelector('.select');
const selectSingle_title_1 = selectSingle_1.querySelector('.select__title');
const selectSingle_labels_1 = selectSingle_1.querySelectorAll('.select__label');
const selectSingle_content_1 = selectSingle_1.querySelector('.select__content-edit');


// !Кнопки
window.onload = function () {
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].id = "btn-" + i;
	}
};
if (checks.length > 0) {
	for (var index = 0; index < checks.length; index++) {
		const check = checks[index];

		check.addEventListener('click', function () {
			var wheelCheck = this.querySelector(".item__wheel-check");
			if (lastButton != wheelCheck.id.substr(-1)) {
				lastButton = wheelCheck.id.substr(-1);
				btnOpen(this);
			} else {
				btnClose();
				lastButton = -1;
			}
		});
	}
}
function btnOpen(el) {
	btnClose();
	var wheelList = el.querySelector(".item__wheel-list");
	wheelList.classList.add("clicked");
	// fadeInBtn(".clicked")
}
function btnClose() {
	var wheelList = document.querySelectorAll(".item__wheel-list");
	for (var index = 0; index < wheelList.length; index++) {
		const wheelLst = wheelList[index];
		// fadeOutBtn(".clicked")
		wheelLst.classList.remove("clicked");
	}
}
document.addEventListener('click', function (e) {
	if (!e.target.closest('.item__btn')) {
		btnClose();
		lastButton = -1;
	}
});

function fadeOutBtn(el) {
	var opacity = 1;
	var timer = setInterval(function () {
		if (opacity <= 0.1) {
			clearInterval(timer);
			document.querySelector(el).style.display = "none";
		}
		document.querySelector(el).style.opacity = opacity;
		opacity -= opacity * 0.1;
	}, 5);
}
function fadeInBtn(el) {
	var opacity = 0.1;
	var timer = setInterval(function () {
		if (opacity >= 1) {
			clearInterval(timer);
		}
		document.querySelector(el).style.opacity = opacity;
		document.querySelector(el).style.display = "block";
		opacity += opacity * 0.1;
	}, 1);
}


// !popup!
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
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));

				selectSingle.setAttribute('data-state', '');
				selectSingle_title.style.cssText = `border: none; border-radius: 5.07498px; box-shadow: 0px 2px 2px rgba(146, 146, 146, 0.25);`;
				selectSingle_content.style.display = "none";

				selectSingle_1.setAttribute('data-state', '');
				selectSingle_title_1.style.cssText = `border: none; border-radius: 5.07498px; box-shadow: 0px 2px 2px rgba(146, 146, 146, 0.25);`;
				selectSingle_content_1.style.display = "none";
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
	// console.log(lockPaddingValue)
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


// Toggle menu
selectSingle_title.addEventListener('click', () => {
	if ('active' === selectSingle.getAttribute('data-state')) {
		selectSingle.setAttribute('data-state', '');
		selectSingle_title.style.cssText = `border: none; border-radius: 5.07498px; box-shadow: 0px 2px 2px rgba(146, 146, 146, 0.25);`;
		fadeOut('.select__content')

	} else {
		selectSingle.setAttribute('data-state', 'active');
		selectSingle_title.style.cssText = `border: 0.5px solid #aaaaaa; border-radius: 5.07498px 5.07498px 0px 0px;`;
		fadeIn('.select__content')
	}
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
	selectSingle_labels[i].addEventListener('click', (evt) => {
		selectSingle_title.textContent = evt.target.textContent;
		selectSingle.setAttribute('data-state', '');

		selectSingle_title.style.cssText = `border: none; border-radius: 5.07498px; box-shadow: 0px 2px 2px rgba(146, 146, 146, 0.25);`;
		fadeOut('.select__content')
	});
}



// Toggle menu_1
selectSingle_title_1.addEventListener('click', () => {
	if ('active' === selectSingle_1.getAttribute('data-state')) {
		selectSingle_1.setAttribute('data-state', '');
		selectSingle_title_1.style.cssText = `border: none; border-radius: 5.07498px; box-shadow: 0px 2px 2px rgba(146, 146, 146, 0.25);`;
		fadeOut('.select__content-edit')

	} else {
		selectSingle_1.setAttribute('data-state', 'active');
		selectSingle_title_1.style.cssText = `border: 0.5px solid #aaaaaa; border-radius: 5.07498px 5.07498px 0px 0px;`;
		fadeIn('.select__content-edit')
	}
});

// Close when click to option_1
for (let i = 0; i < selectSingle_labels_1.length; i++) {
	selectSingle_labels_1[i].addEventListener('click', (evt) => {
		selectSingle_title_1.textContent = evt.target.textContent;
		selectSingle_1.setAttribute('data-state', '');

		selectSingle_title_1.style.cssText = `border: none; border-radius: 5.07498px; box-shadow: 0px 2px 2px rgba(146, 146, 146, 0.25);`;
		fadeOut('.select__content-edit')
	});
}


function fadeOut(el) {
	var opacity = 1;
	var timer = setInterval(function () {
		if (opacity <= 0.1) {
			clearInterval(timer);
			document.querySelector(el).style.display = "none";
		}
		document.querySelector(el).style.opacity = opacity;
		opacity -= opacity * 0.1;
	}, 5);
}
function fadeIn(el) {
	var opacity = 0.1;
	var timer = setInterval(function () {
		if (opacity >= 1) {
			clearInterval(timer);
		}
		document.querySelector(el).style.opacity = opacity;
		document.querySelector(el).style.display = "flex";
		opacity += opacity * 0.1;
	}, 1);
}

// burger-menu
var menu = document.querySelector(".menu-btn");
var aside = document.querySelector(".aside")
var asideBody = aside.querySelector(".aside__body");

menu.addEventListener('click', function () {
	asideBody.classList.add("aside-active");
	fadeInMenu(".aside")
});


aside.addEventListener('click', function (e) {
	if (!e.target.closest('.aside__body')) {
		asideBody.classList.remove("aside-active");
		// aside.style.opacity = "0";
		// aside.style.visibility = "hidden";
		fadeOutMenu(".aside")
	}
});


function fadeOutMenu(el) {
	var opacity = 1;
	var timer = setInterval(function () {
		if (opacity <= 0.1) {
			clearInterval(timer);
			document.querySelector(el).style.visibility = "hidden";
		}
		document.querySelector(el).style.opacity = opacity;
		opacity -= opacity * 0.1;
	}, 10);
}
function fadeInMenu(el) {
	var opacity = 0.01;
	var timer = setInterval(function () {
		if (opacity >= 1) {
			clearInterval(timer);
		}
		document.querySelector(el).style.opacity = opacity;
		document.querySelector(el).style.visibility = "visible";
		opacity += opacity * 0.1;
	}, 10);
}





