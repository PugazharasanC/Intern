<?php
	include "dbconfig.php";
	$uname = mysqli_real_escape_string($con,$_POST['username']);
	$id = mysqli_real_escape_string($con,$_POST['id']);
	
	if(isset($_POST['firstname'])){
		$firstname = mysqli_real_escape_string($con,$_POST['firstname']);
		$sql_query = "UPDATE users SET firstname = ? WHERE email = ?;";
		$stmt = mysqli_prepare($con,$sql_query);
		mysqli_stmt_bind_param($stmt,'ss',$firstname,$uname);
		mysqli_stmt_execute($stmt);
		$jsonFile = "data.json";		
		$jsondata = file_get_contents($jsonFile);
		$arr_data = json_decode($jsondata, true);
		$userData = json_decode($arr_data[(intval($id))-1]);
		$userData->firstname = $firstname;
		$arr_data[intval($id)-1] = json_encode($userData);
		$jsondata = json_encode($arr_data , JSON_PRETTY_PRINT);
		file_put_contents($jsonFile, $jsondata);
		echo 'done';
	}
	if(isset($_POST['lastname'])){
		$lastname = mysqli_real_escape_string($con,$_POST['lastname']);
		$sql_query = "UPDATE users SET lastname = ? WHERE email = ?;";
		$stmt = mysqli_prepare($con,$sql_query);
		mysqli_stmt_bind_param($stmt,'ss',$lastname,$uname);
		mysqli_stmt_execute($stmt);
		$jsonFile = "data.json";		
		$jsondata = file_get_contents($jsonFile);
		$arr_data = json_decode($jsondata, true);
		$userData = json_decode($arr_data[(intval($id))-1]);
		$userData->lastname = $lastname;
		$arr_data[intval($id)-1] = json_encode($userData);
		$jsondata = json_encode($arr_data , JSON_PRETTY_PRINT);
		file_put_contents($jsonFile, $jsondata);
		echo 'done';
	}
	if(isset($_POST['phone'])){
		$phone = mysqli_real_escape_string($con,$_POST['phone']);
		$sql_query = "UPDATE users SET phone = ? WHERE email = ?;";
		$stmt = mysqli_prepare($con,$sql_query);
		mysqli_stmt_bind_param($stmt,'ss',$phone,$uname);
		mysqli_stmt_execute($stmt);
		$jsonFile = "data.json";		
		$jsondata = file_get_contents($jsonFile);
		$arr_data = json_decode($jsondata, true);
		$userData = json_decode($arr_data[(intval($id))-1]);
		$userData->phone = $phone;
		$arr_data[intval($id)-1] = json_encode($userData);
		$jsondata = json_encode($arr_data , JSON_PRETTY_PRINT);
		file_put_contents($jsonFile, $jsondata);
		echo 'done';
	}
	if(isset($_POST['pwd'])){
		$password = mysqli_real_escape_string($con,$_POST['pwd']);
		$sql_query = "UPDATE users SET password = ? WHERE email = ?;";
		$stmt = mysqli_prepare($con,$sql_query);
		mysqli_stmt_bind_param($stmt,'ss',$password,$uname);
		mysqli_stmt_execute($stmt);
		$jsonFile = "data.json";		
		$jsondata = file_get_contents($jsonFile);
		$arr_data = json_decode($jsondata, true);
		$userData = json_decode($arr_data[(intval($id))-1]);
		$userData->password = $password;
		$arr_data[intval($id)-1] = json_encode($userData);
		$jsondata = json_encode($arr_data , JSON_PRETTY_PRINT);
		file_put_contents($jsonFile, $jsondata);
		echo 'done';
	}
	if(isset($_POST['dob'])){
		$dob = mysqli_real_escape_string($con,$_POST['dob']);
		$age = mysqli_real_escape_string($con,$_POST['age']);
		$sql_query = "UPDATE users SET dob = ?, age = ? WHERE email = ?;";
		$stmt = mysqli_prepare($con,$sql_query);
		mysqli_stmt_bind_param($stmt,'sis',$dob,intval($age),$uname);
		mysqli_stmt_execute($stmt);
		$jsonFile = "data.json";		
		$jsondata = file_get_contents($jsonFile);
		$arr_data = json_decode($jsondata, true);
		$userData = json_decode($arr_data[(intval($id))-1]);
		$userData->dob = $dob;
		$userData->age = $age;
		$arr_data[intval($id)-1] = json_encode($userData);
		$jsondata = json_encode($arr_data , JSON_PRETTY_PRINT);
		file_put_contents($jsonFile, $jsondata);
		echo 'done';
	}
?>
