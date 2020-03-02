jQuery(document).ready(function(){
                $("#loginsubmitbtn").click(function(){
                    var username = $("#txt_uname").val().trim();
                    var password = $("#txt_pwd").val().trim();
					if(username === "" && password === ""){
						$("#message").html("Username and Password required");
					}
					else if(username ===""){
						$("#message").html("Username required");
					}
					else if(validateMail(username) == false){
						$("#message").html("Enter valid username <br>Eg:-abc@xyz.com");
					}
					else if(password ===""){
						$("#message").html("Password required");
					}
                    else if( username != "" && password != "" ){
                        $.ajax({
                            url:'php/login.php',
                            type:'post',
                            data:{username:username,password:password},
                            success:function(response){
                                var msg = "";
                                if(response == 1){
									var date = new Date();
									date.setTime(date.getTime() + (7*864000000));
									var expires = "expires="+ date.toUTCString();
									document.cookie = "uname = " + username+";"+expires+";path=/";
                                    window.location = "home.html";
                                }else{
                                    msg = "Invalid username and password!";
                                }
                                $("#message").html(msg);
                            }
                        });
                    }
                });
				
				$("#logoutbtn").click(function(){
					var date = new Date();
					date.setTime(date.getTime() + (-7*864000000));
					var expires = "expires="+ date.toUTCString();
					document.cookie = "uname = ;"+expires+";path=/";
					window.location = "index.html";
				});
				
				$("#signupsubmitbtn").click(function(){
                    var firstname = $("#txt_fname").val().trim();
                    var lastname = $("#txt_lname").val().trim();
                    var mail = $("#txt_uname").val().trim();
                    var phone = $("#txt_phone").val().trim();
					var gender = $('input[name="gender"]:checked').val().trim();
                    var dob = $("#txt_dob").val().trim();
                    var age = $("#txt_age").val().trim();
                    var password = $("#txt_password").val().trim();
					if($("#message").html() != ""){
					}
					else if(firstname === "" || lastname === "" || mail === "" || phone === "" || gender === "" ||  dob === "" ||  age === "" || password === "" ){
						$("#message").html("Fill those missing details");
					}
                    else{
                        $.ajax({
                            url:'php/signup.php',
                            type:'post',
                            data:{firstname:firstname,lastname:lastname,mail:mail,phone:phone,gender:gender,dob:dob,age:age,password:password},
                            success:function(response){
                                var msg = "";
                                if(response == 1){
									window.alert("Registration Complete!..");
                                    window.location = "index.html";
                                }else if(response == 0){
                                    msg = "Registration Failed";
									$("#txt_password").val("");
									$("#txt_cpword").val("");
                                }else{
									msg = "User Already Exists " + response;
									$("#txt_uname").focus();
								}
                                $("#message").html(msg);
                            }
                        });
                    }
                });
				
				$("#password_visible").click(function(){
					if($("#txt_pwd").attr("type")==="password"){
						$("#txt_pwd").attr("type","text");
					}
					else{
						$("#txt_pwd").attr("type","password");
					}
					$("#password_visible").toggleClass("fas fa-eye-slash");
				});
				
				
				$("#cancelbtn").click(function(){
					window.location = "index.html";
				});
				
				
				$("#txt_dob").change(function(){
					var dob = $("#txt_dob").val().trim();
					dob = new Date(dob);
					var today = new Date();
					var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
					$("#txt_age").val(age);
				});
				
				$("#fname_edit").click(function(){
					if($("#icon_fname").attr("class") === "fas fa-edit"){
						$("#txt_fname").prop("disabled",false);
						$("#txt_fname").focus();
						$("#icon_fname").attr("class","fa fa-check");
					}
					else{
						var firstname = $("#txt_fname").val().trim();
						var mail = $("#txt_uname").val().trim();
						var id = $("#txt_id").val().trim();
						if(firstname!=""){
							$.ajax({
								url:'php/home.php',
								type:'post',
								data:{username:mail,firstname:firstname,id:id},
								success:function(response){
								}
							});
							$("#txt_fname").prop("disabled",true);
							$("#icon_fname").attr("class","fas fa-edit");
						}
						else{
							$('#txt_fname').tooltip({'trigger':'focus', 'title': 'Name should not be empty'});
							$("#txt_fname").focus();
						}
					}
				});
				
				$("#lname_edit").click(function(){
					if($("#icon_lname").attr("class") === "fas fa-edit"){
						$("#txt_lname").prop("disabled",false);
						$("#txt_lname").focus();
						$("#icon_lname").attr("class","fa fa-check");
					}
					else{
						var lastname = $("#txt_lname").val().trim();
						var mail = $("#txt_uname").val().trim();
						var id = $("#txt_id").val().trim();
						if(lastname !=""){	
							$.ajax({
								url:'php/home.php',
								type:'post',
								data:{username:mail,lastname:lastname,id:id},
								success:function(response){
								}
							});
							$("#txt_lname").prop("disabled",true);
							$("#icon_lname").attr("class","fas fa-edit");
						}
						else{
							$('#txt_lname').tooltip({'trigger':'focus', 'title': 'Name should not be empty'});
							$("#txt_lname").focus();
						}
					}
				});
				
				$("#dob_edit").click(function(){
					if($("#icon_dob").attr("class") === "fas fa-edit"){
						$("#txt_dob").prop("disabled",false);
						$("#txt_dob").focus();
						$("#icon_dob").attr("class","fa fa-check");
					}
					else{
						var age = $("#txt_age").val().trim();
						var dob = $("#txt_dob").val().trim();
						var mail = $("#txt_uname").val().trim();
						var id = $("#txt_id").val().trim();
						if(dob!=""){
							$.ajax({
								url:'php/home.php',
								type:'post',
								data:{username:mail,dob:dob,age:age,id:id},
								success:function(response){
								}
							});
							$("#txt_dob").prop("disabled",true);
							$("#icon_dob").attr("class","fas fa-edit");
						}
						else{
							$('#txt_dob').tooltip({'trigger':'focus', 'title': 'Date required'});
							$("#txt_dob").focus();
						}
					}
				});
				
				$("#pwd_edit").click(function(){
					if($("#icon_pwd").attr("class") === "fas fa-edit"){
						$("#txt_pwd").prop("disabled",false);
						$("#txt_pwd").focus();
						$("#icon_pwd").attr("class","fa fa-check");
					}
					else{
						var pwd = $("#txt_pwd").val().trim();
						var mail = $("#txt_uname").val().trim();
						var id = $("#txt_id").val().trim();
						if(pwd!=""){
							$.ajax({
								url:'php/home.php',
								type:'post',
								data:{username:mail,pwd:pwd,id:id},
								success:function(response){
								}
							});
							$("#txt_pwd").prop("disabled",true);
							$("#icon_pwd").attr("class","fas fa-edit");
						}
						else{
							$('#txt_pwd').tooltip({'trigger':'focus', 'title': 'Password should not be empty'});
							$("#txt_pwd").focus();
						}
					}
				});
				
				$("#phone_edit").click(function(){
					if($("#icon_phone").attr("class") === "fas fa-edit"){
						$("#txt_phone").prop("disabled",false);
						$("#txt_phone").focus();
						$("#icon_phone").attr("class","fa fa-check");
					}
					else{
						var phone = $("#txt_phone").val().trim();
						var mail = $("#txt_uname").val().trim();
						var id = $("#txt_id").val().trim();
						if(phone !="" && validatePhone(phone)){
							$.ajax({
								url:'php/home.php',
								type:'post',
								data:{username:mail,phone:phone,id:id},
								success:function(response){
								}
							});
							$("#txt_phone").prop("disabled",true);
							$("#icon_phone").attr("class","fas fa-edit");
						}
						else{
							$('#txt_phone').tooltip({'trigger':'focus', 'title': 'Phone Number Not Valid'});
							$("#txt_phone").focus();
						}
					}
				});
				
				$("#txt_cpword,#txt_password").on('input',function(){
					var pass = $("#txt_password").val().trim();
					var cpass = $("#txt_cpword").val().trim();
					if(pass===""){}
					else if(cpass===""){
					}
					else if(pass!=cpass){
						$("#message").html("Password Mismatch");
					}
					else{
						$("#message").html("");
					}
				});
				
				
				$("#txt_phone").on('input',function(){
					var phone = $("#txt_phone").val().trim();
					if(validatePhone(phone) == false){
						$("#message").html("Enter valid phone Number <br>Eg:- 98670 12345");
						$("#txt_phone").focus();
					}
					else{
						$("#message").html("");
					}
				});
				
				
				$("#txt_uname").on('input',function(){
					var mail = $("#txt_uname").val().trim();
					if(validateMail(mail) == false){
						$("#message").html("Enter valid username <br>Eg:-abc@xyz.com");
						$("#txt_uname").focus();
					}
					else{
						$("#message").html("");
					}
				});
				
				
				function validateMail (input) {
					if(input.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
						return false;
					}
				}
				
				function validatePhone (input) {
					if(input.length !=10)
						return false;
					var regexPattern=new RegExp(/^[0-9]{10}$/);
					return regexPattern.test(input);
				}
            });