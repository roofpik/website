var t = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
var url = window.location.href;
var res = url.split("#");
if(t){
	if(res[1]){
    	window.location.href = 'http://mobile.roofpik.com/#'+res[1];	
	} else {
		window.location.href = 'http://mobile.roofpik.com';	
	}
}