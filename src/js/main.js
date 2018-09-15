
$(document).ready(function(){


    console.log("Start the show...");

    $("h1").hide();
    $(".pseudonav").hide();
    $("#terminal").hide();
    $("h1").slideDown(3000);
    $(".pseudonav").fadeIn(4000);
    $("#terminal").slideToggle(500);

    $( "li#bio" ).click(function() {
        $("#t-bio").toggleClass("inactive");
        $("#t-projects").addClass("inactive");
        $("#t-socials").addClass("inactive");
        $("#terminal").addClass("inactive");
    });

    $( "li#projects" ).click(function() {
        $("#t-projects").toggleClass("inactive");
        $("#t-bio").addClass("inactive");
        $("#t-socials").addClass("inactive");
        $("#terminal").addClass("inactive");
    });
    
    $( "li#contact" ).click(function() {
        $("#t-socials").toggleClass("inactive");
        $("#t-bio").addClass("inactive");
        $("#t-projects").addClass("inactive");
        $("#terminal").addClass("inactive");
    });

    // Data to feed the terminal
    let data = [
      { 
        action: 'typeit',
        strings: ['^2000 bash --version\n'], 
        output: '<pre>GNU bash, version 4.3.48(1)-release (x86_64-pc-linux-gnu)<br /> Copyright (C) 2013 Free Software Foundation, Inc.<br /> License GPLv3+: GNU GPL version 3 or later http://gnu.org/licenses/gpl.html <br /> This is free software; you are free to change and redistribute it. <br /> There is NO WARRANTY, to the extent permitted by law.'
      },
      { 
        action: 'typeit',
        strings: ['name="Dave"'], 
        output: ' ',
        postDelay: 2000
      },
      {
        action: 'typeit',
        strings: ['echo "Hi ${name}!"'],
        output: "Hi Dave!",
        postDelay: 2000
      },
      {
        action: 'typeit',
        strings: ['echo "What\'s new?"'],
        output: "Not much, how about you?",
        postDelay: 2000
    }]

    // This uses Matt Bolt's typed.js to put the text on the terminal
    $(function(){
        runScripts(data, 0);
		function runScripts(data, pos) {
			var prompt = $('.prompt'),
				script = data[pos];
			switch(script.action) {
				default:
				  // cleanup
				  prompt.removeData();
				  $('.typed-cursor').text('');
				  prompt.typed({
					strings: script.strings,
					typeSpeed: 35,
					callback: function() {
					  var history = $('.history').html();
					  history = history ? [history] : [];
					  history.push('dave@localhost ]$ ' + prompt.text());
					  if(script.output) {
						history.push(script.output);
						prompt.html('');
						$('.history').html(history.join('<br>'));
					  }
					  // scroll to bottom of screen
					  $('section.terminal').scrollTop($('section.terminal').height());
					  // Run next script
					  pos++;
					  if(pos < data.length) {
						setTimeout(function() {
						  runScripts(data, pos);
						}, script.postDelay || 1000);
					  }
					}
				  });
				  break;
		  }  // end of switch
	   }     // end of runScripts()
   });       // end of IIFE
});

