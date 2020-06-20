window.onload=function(){
	var oImg = document.getElementById('img');
	var oDiv1 = document.getElementById('left');
	var oDiv2 = document.getElementById('right');
	var oDiv3 = document.getElementById('playback_progress');
	var oDiv4 = document.getElementById('progress_bar');
	var oAudio = document.getElementById('audio');
	var oP1 = document.getElementById('play');
	var oP2 = document.getElementById('last_song');
	var oP3 = document.getElementById('next_song');
	var oP4 = document.getElementById('arrow');
	var oP5 = document.getElementById('neirong');
	var oP6 = document.getElementById('current_duration');
	var oP7 = document.getElementById('total_duration');
	var img = 1;
	oDiv1.onclick = function(){
		if (img==1){
			img=8;
			oImg.style.backgroundImage = 'url(./img/background_image' + img + '.jpg)';
		}else{
			oImg.style.backgroundImage = 'url(./img/background_image' + --img + '.jpg)';
		}
	}
	oDiv2.onclick = function(){
		if (img==8){
			img=1;
			oImg.style.backgroundImage = 'url(./img/background_image' + img + '.jpg)';
		}else{
			oImg.style.backgroundImage = 'url(./img/background_image' + ++img + '.jpg)';
		}
	}
	var state = 1;
	oP1.onclick = function(){
		if(oAudio.paused){
			oAudio.play();
			oP1.innerHTML = '&#x2016';
			state = 2;
		}else{
			oAudio.pause();
			oP1.innerHTML = '&#x25b7';
			state = 1;
		}
	}
	var sound = new Array();
	sound[1] = "./music/01.mp3";
	sound[2] = "./music/02.mp3";
	sound[3] = "./music/03.mp3";
	sound[4] = "./music/04.mp3";
	sound[5] = "./music/05.mp3";
	sound[6] = "./music/06.mp3";
	sound[7] = "./music/07.mp3";
	sound[8] = "./music/08.mp3";
	sound[9] = "./music/09.mp3";
	sound[10] = "./music/10.mp3";
	var music = 1;
	oP2.onclick = function(){
		if(music==1){
			oAudio.src = sound[10];
			music = 10;
			if(state==1){
				oAudio.pause();
			}else{
				oAudio.autoplay = 'autoplay';
			}
		}else{
			oAudio.src = sound[--music];
			//oAudio.autoplay = 'autoplay';
			if(state==1){
				oAudio.pause();
			}else{
				oAudio.autoplay = 'autoplay';
			}
		}
	}
	oP3.onclick = function(){
		if(music==10){
			oAudio.src = sound[1];
			if(state==1){
				oAudio.pause();
			}else{
				oAudio.autoplay = 'autoplay';
			}
			music = 1;
		}else{
			oAudio.src = sound[++music];
			if(state==1){
				oAudio.pause();
			}else{
				oAudio.autoplay = 'autoplay';
			}
		}
	}
	var arrow = 1;
	oP4.onclick = function(){
		if(arrow==1){
			oP4.style.backgroundImage = "url('./img/random.png')";
			oP5.innerHTML = '\u968f\u673a\u64ad\u653e';//随机播放
			arrow++;
		}else if(arrow==2){
			oP4.style.backgroundImage = "url('./img/repeat.png')";
			oP5.innerHTML = '\u5355\u66f2\u5faa\u73af';//单曲循环
			arrow++;
		}else{
			oP4.style.backgroundImage = "url('./img/return.png')";
			oP5.innerHTML = '\u987a\u5e8f\u64ad\u653e';//顺序播放
			arrow = 1;
		}
	}
	oAudio.onended = function(){
		if(arrow==1){
			if(music==10){
				oAudio.src = sound[1];
				oAudio.autoplay = 'autoplay';
				music = 1;
			}else{
				oAudio.src = sound[++music];
				oAudio.autoplay = 'autoplay';
			}
		}else if(arrow==2){
			//产生一个0-10的随机数,Math.random()是产生一个0-1的随机数，math.round()是四舍五入
			//var random = Math.round(Math.random()*10);
			var random;
			do{
				random = Math.round(Math.random()*10);
			}while(music==random+1)
			music = random+1;
			oAudio.src = sound[music];
			oAudio.autoplay = 'autoplay';
		}else{
			oAudio.src = sound[music];
			oAudio.autoplay = 'autoplay';
		}
	}
	oP4.onmouseover = function(){
		oP5.style.display = 'block';
		if(arrow==1){
			oP5.innerHTML = '\u987a\u5e8f\u64ad\u653e';//顺序播放
		}else if(arrow==2){
			oP5.innerHTML = '\u968f\u673a\u64ad\u653e';//随机播放
		}else{
			oP5.innerHTML = '\u5355\u66f2\u5faa\u73af';//单曲循环
		}
	}
	oP4.onmouseout = function(){
		oP5.style.display = 'none';
		oP5.innerHTML = '';
	}
	oAudio.addEventListener('timeupdate',function(){
		//updateProgress(oAudio);
		acquisitionTime();
		function acquisitionTime(currentTime,duration){
			var currentTime = oAudio.currentTime;
			var duration = parseInt(oAudio.duration);
			var t = isNaN(duration);
			if(t==true){
				duration = 0;
			}
			var curMin = parseInt(currentTime/60);
			var curs = parseInt(currentTime%60);
			var durMin = parseInt(duration/60);
			var durs = parseInt(duration%60);
			if (curs<10){
				oP6.innerHTML = curMin + '.0' + curs;
			}else{
				oP6.innerHTML = curMin + '.' + curs;
			}
			if (durs<10){
				oP7.innerHTML = durMin + '.0' + durs;
			}else{
				oP7.innerHTML = durMin + '.' + durs;
			}
			var width;
			if(duration==0){
				width = 0;
			}else{
			width = Math.round((currentTime/duration)*100);
			}
			oDiv3.style.marginLeft = width-108 + 'px';
		}
	},false);
}
