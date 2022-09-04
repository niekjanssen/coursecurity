<html>
	<head>
		<style type="text/css">
			*{box-sizing: border-box;}
			body{
				font-family:sans-serif;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			#box{
				width:min(70vh,70vw, 400px);
				height:min(70vh,70vw, 400px);
				padding:min(7vh,7vw, 40px);
				border:1px solid #000000;
				overflow-y: auto;
				display:flex;
				flex-direction: column;
			}

			h1{margin-top:0;}
			input{width:45%;}
		</style>
		<title>Coursecurity Login</title>
	</head>
	<body>
		<div id="box">
			<h1>Login</h1>
			<form method="get" action="enter.php">
				<p>Please enter your username (e-mailaddress or pseudonym used in the survey):</p>
				<p><center><input type="text" name="token"/> <input type="submit" value="Log-In"/></center></p>
			</form>
		</div>
	</body>
</html>