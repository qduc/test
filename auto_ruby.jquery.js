/*  auto_ruby.js var 1.0.0
 *  Presented by 2008 Source Create co.,ltd.(http://www.srce.jp)
 *  Author Akira Yoshimaru(akira@srce.jp)
 *  
 *--------------------------------------------------------------------------*/

//--------設定--------
var convFlag  = 1;      //モードフラグ ひらがな→0　カタカナ→1
var nameField = '#name'; //名前のID
var rubyField = '#ruby'  //カナのID
//--------------------

var baseVal = "";
function setRuby(nameId,rubyId) {
	var newVal = $(nameId).val();
	if (baseVal == newVal){return;}
	if (newVal == "") {
  $(rubyId).val("");
		  baseVal = "";
		  return;
	}
	
	var addVal = newVal;
	for(var i=baseVal.length; i>=0; i--) {
		if (newVal.substr(0,i) == baseVal.substr(0,i)) {
			addVal = newVal.substr(i);break;
		}
	}
	baseVal = newVal;
	var addruby = addVal.replace( /[^ 　ぁあ-んァー]/g, "" );
	if (addruby == ""){return;}
	if(convFlag){addruby = convKana(addruby);}
	$(rubyId).val($(rubyId).val() + addruby);
}

function loopTimer(){
	setRuby(nameField,rubyField);
	timer = setTimeout("loopTimer()",30);
}

function convKana(val){
	var c, a = [];
	for(var i=val.length-1;0<=i;i--){
			c = val.charCodeAt(i);
			a[i] = (0x3041 <= c && c <= 0x3096) ? c + 0x0060 : c;
	}
	return String.fromCharCode.apply(null, a);
}

var timer = false;
$(document).ready(function(){
	//loopTimer();
	$(nameField).bind("change keyup input", function(){
		setRuby(nameField,rubyField);
	});
});
