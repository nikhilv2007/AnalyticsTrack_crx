window.addEventListener('load', function(evt) {
   	//console.log(localStorage.getItem('AppNotification'));
      document.getElementById('appNotification').checked = localStorage.getItem('AppNotification') == "true" ?  true : false;

   	document.getElementById('appNotification').addEventListener('change', updateNotification);
   	
   	//document.getElementById('appState').addEventListener('change',updateApp);
});

function updateNotification(){   
   localStorage.setItem('AppNotification', document.getElementById('appNotification').checked);   
}