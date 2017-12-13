/*doc
---
title: fakeJQ 1.0
name: fakeJQ
category: Helpers JS
---
Simulamos el selector de jQuery, sin jQuery

```js_example
$('selector')

```
*/ 

var $ = function(el) {
	return document.querySelectorAll(el);
};



//.removeClass


//.next
//.nextAll

//is


//.attr


//.remove



//.removeAttr


//.hasClass


//.height


//.width


//.offset


//.position


//.clone


//.wrap


//.append


//.appendTo


//.html


//.preppend


//.prependTo


//.text


//.after


//.before


//.is


//.each


//.children


//.closest


//.find


//.parent


//.prev


//.prevAll


//.siblings


//.resize


//.scroll


//.ready


//.on


//.off


//.trigger


//.change


//.focus


//.submit


//.keydown
//.keypress
//.keyup

//.toggle

//.hover

//.click








