//var analyticsRequest = 0;

var data = [
	{"urlPattern":"google-analytics", "provider": "Google Analytics", "events": [{"eventPattern": "analytics.js", "event": "Initialisation"},{"eventPattern": "ga.js", "event": "Initialisation"},{"eventPattern": "t=pageview", "event": "Page view"},{"eventPattern": "t=event", "event": "Event"},{"eventPattern": "t=timing", "event": "Timing"},{"eventPattern": "ec=ElementClick", "event": "Click"},{"eventPattern": "ec=performance", "event": "Timing"}]},
	{"urlPattern":"analytics.yahoo", "provider": "Yahoo Analytics"},
	{"urlPattern":"googletagmanager", "provider": "Google Tag Manager", "events": [{"eventPattern": "gtm.js", "event": "Initialisation"}]},
	{"urlPattern":"facebook.com/tr", "provider": "Facebook", "events": [{"eventPattern": "ev=PixelInitialized", "event": "Initialisation"},{"eventPattern": "ev=PageView", "event": "Page view"},{"eventPattern": "ev=ViewContent", "event": "Content view"}]},
	{"urlPattern":"doubleclick.net", "provider": "DoubleClick", "events": [{"eventPattern": "dc.js", "event": "Initialisation"}]}
	];

chrome.webRequest.onBeforeRequest.addListener(		//onBeforeRequest	//onSendHeaders
    function(xhrData){
    	if( (xhrData.type != "stylesheet")){	//xhrData.url.search(/analytics/i) != -1 &&
    		//console.log(xhrData.requestBody);
    		var provider = "";
    		var triggeredEvent ="";

    		//identify the analytics provider
    		for (var iter in data) {
    			if(xhrData.url.indexOf(data[iter].urlPattern) > 0)
    			{
    				provider = data[iter].provider;

    				//identify triggered event
    				for (var subIter in data[iter].events)
    				{
    					if (xhrData.url.indexOf(data[iter].events[subIter].eventPattern) > 0)
    					{
    						triggeredEvent = data[iter].events[subIter].event;
    						break;
    					}    						
    				}
    				Notify(provider, triggeredEvent, xhrData);
    				break;
    			}
    		};					
    	}
	},
    {urls: ["<all_urls>"]},
    ['blocking']
);

function Notify(provider, triggeredEvent, xhrData){
	chrome.browserAction.getBadgeText({tabId: xhrData.tabId},function(errorCount){
		//console.log("before : value - "+ errorCount + "; type - "+ typeof(errorCount));
		errorCount = parseInt(errorCount)+1 || 1;
		//console.log("after : value - "+ errorCount + "; type - "+ typeof(errorCount));		
		chrome.browserAction.setBadgeText({text: String(errorCount), tabId:xhrData.tabId});

		if(localStorage.getItem('AppNotification') == "true")
			chrome.notifications.create({type: "basic", title: provider, message: triggeredEvent , iconUrl: "images/AT128.png"});
		
   		//console.log(xhrData.url +" : "+ new Date());						
	});
}