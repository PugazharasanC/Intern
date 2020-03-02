<?php
//return json of user data
	include "dbconfig.php";
	$uname = mysqli_real_escape_string($con,$_POST['username']);
	
	$sql_query = mysqli_prepare($con,"SELECT id,firstname,lastname,phone,dob,age,password FROM users WHERE email=?");
	mysqli_stmt_bind_param($sql_query,'s',$uname);
	mysqli_stmt_execute($sql_query);
	mysqli_stmt_bind_result($sql_query,$id,$firstname,$lastname,$phone,$dob,$age,$password);
	mysqli_stmt_fetch($sql_query);
	$userdata = new \stdClass();
	$userdata->id = $id;
	$userdata->firstname = $firstname;
	$userdata->lastname = $lastname;
	$userdata->phone = $phone;
	$userdata->dob = $dob;
	$userdata->age = $age;
	$userdata->password = $password;
	$json_data = json_encode($userdata);
	echo $json_data;
?>