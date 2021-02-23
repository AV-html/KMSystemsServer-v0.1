
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


