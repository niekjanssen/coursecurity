<?php
	if(isset($_GET['token'])){
		$token = $_GET['token'];
	}else{
		header('location:/');
		exit();
	}
	$time = time();
	
	function available(){
		// Get list of files in 'available' folder, indicating available instances
		$files = scandir("../q/available/");
		// Initialize array to hold instances
		$instances = array();
		foreach($files as $file){
			if(is_file("../q/available/".$file)){
				// If a file is older than 60 seconds (to give it time to initialize)
				// Add to the array of available instances
				$time = filemtime("../q/available/".$file);
				if((time()-$time) > 60) $instances[$time.$file]=strtoupper($file);
			}
		}
		// Sort by key (oldest instance first) and return
		ksort($instances);
		return (array_values($instances));
	}
	
	function assign(){
		GLOBAL $available;
		GLOBAL $token;
		GLOBAL $queue;
		
		// Get the first instance from all available
		$instance = $available[0];
		
		// Remove the instance from the available folder
		unlink("../q/available/".$instance);
		// Generate a key based on the token and current time
		$key = md5($token.time());
		// Add the instance to the folder with "blocked" in use applications, and store the key
		file_put_contents("../q/blocked/".$instance, $key);
		// If the token is in the queue, remove from queue
		if(isset($queue->waiting->$token)) unset($queue->waiting->$token);
		// Store the assignment of the token -> instance
		$queue->assigned->$token = $instance;
		// If the random refresh parameter is set, show the "end of queue"-page, else redirect immediately to instance
		if(isset($_GET['r'])){
			echo '<html><head><meta http-equiv="refresh" content="5; url=https://'.strtolower($instance).'.coursecurity.com/?token='.$key.'"><title>Coursecurity Ready</title><style>*{box-sizing:border-box}body{font-family:sans-serif;display:flex;justify-content:center;align-items:center}#box{width:min(70vh,70vw,400px);height:min(70vh,70vw,400px);padding:min(7vh,7vw,40px);border:1px solid #000;overflow-y:auto;display:flex;flex-direction:column}h1{margin-top:0}</style></head><body><div id=box><h1>Ready!</h1><p>We are now ready for you to start the challenge.</p><p>You will automatically be forwarded in a few seconds.</p></div></body></html>';
		}else{
			header('location:https://'.strtolower($instance).'.coursecurity.com/?token='.$key);
		}
	}
	
	$available = available();
	$queue = json_decode(file_get_contents('queue.json'));
	
	
	// If the token has an assigned instance, retrieve the key and redirect
	if(isset($queue->assigned->$token)){
		$instance = $queue->assigned->$token;
		header('location:https://'.strtolower($instance).'.coursecurity.com/?token='.file_get_contents
		("../q/blocked/".$instance));
	// If there are no instances available, add the token to the queue and show the queue page
	}elseif(!isset($available[0]) || count($available) <= 0){
		$q = array();
		foreach($queue->waiting as $spot => $duration){
			$q[$duration] = $spot;
		}
		ksort($q);
		if(!isset($queue->waiting->$token)) $queue->waiting->$token = $time;
		echo '<html><head><title>Coursecurity Queue</title><meta http-equiv="refresh" content="5; url=?token='.$token.'&r='.rand().'"><style>*{box-sizing:border-box}body{font-family:sans-serif;display:flex;justify-content:center;align-items:center}#box{width:min(70vh,70vw,400px);height:min(70vh,70vw,400px);padding:min(7vh,7vw,40px);border:1px solid #000;overflow-y:auto;display:flex;flex-direction:column}h1{margin-top:0}</style></head><body><div id=box><h1>Queue</h1><p>We\'re currently operating at maximum capacity. It might take a few minutes before we can let you into the challenge.</p><p>You will automatically be forwarded as soon as there is capacity, we apologize for the inconvienence.</p><p>There are <b>'.(array_search($token, array_values($q), true)).'</b> people ahead of you in the queue.</p></div></body></html>';
	// If there are more people waiting than available instances check the current user's spot in the queue
	}elseif(count((array)$queue->waiting) > count($available)){
		$q = array();
		foreach($queue->waiting as $spot => $duration){
			$q[$duration] = $spot;
		}
		ksort($q);
		// If current user is at the top of the queue, assign a instance, otherwise show queue page
		if(array_values($q)[0]==$token){
			assign();
		}else{
			if(!isset($queue->waiting->$token)) $queue->waiting->$token = $time;
			//Add random refresh parameter to URL to avoid caching + indicate active queue so user will be shown "end of queue" page when ready
			echo '<html><head><title>Coursecurity Queue</title><meta http-equiv="refresh" content="5; url=?token='.$token.'&r='.rand().'"><style>*{box-sizing:border-box}body{font-family:sans-serif;display:flex;justify-content:center;align-items:center}#box{width:min(70vh,70vw,400px);height:min(70vh,70vw,400px);padding:min(7vh,7vw,40px);border:1px solid #000;overflow-y:auto;display:flex;flex-direction:column}h1{margin-top:0}</style></head><body><div id=box><h1>Queue</h1><p>We\'re currently operating at maximum capacity. It might take a few minutes before we can let you into the challenge.</p><p>You will automatically be forwarded as soon as there is capacity, we apologize for the inconvienence.</p><p>There are <b>'.(array_search($token, array_values($q), true)).'</b> people ahead of you in the queue.</p></div></body></html>';
		}
	}else{
		assign();
	}
	// Update Queue
	file_put_contents('queue.json', json_encode($queue));
?>