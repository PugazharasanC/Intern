jQuery(document).ready(function(){
	var mail =  getCookie("uname");
	if(mail === ""){
		window.location = "index.html";
	}
	else{
		$.ajax({
			url:'php/loader.php',
			type:'post',
			data:{username:mail},
			success:function(response){
				var obj = jQuery.parseJSON(response);
				$("#txt_uname").val(mail);
				$("#txt_id").val(obj.id);
				$("#txt_fname").val(obj.firstname);
				$("#txt_lname").val(obj.lastname);
				$("#txt_dob").val(obj.dob);
				$("#txt_age").val(obj.age);
				$("#txt_phone").val(obj.phone);
				$("#txt_pwd").val(obj.password);
			}
		});
	}
	
	
	
	
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	  }
	  return "";
	}
});
