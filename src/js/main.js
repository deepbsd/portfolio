
$(document).ready(function(){


    console.log("Start the show...");

    $("h1").hide();
    $(".pseudonav").hide();
    $("#terminal").hide();
    $("h1").slideDown(3000);
    $(".pseudonav").fadeIn(4000);
    $("#terminal").fadeIn(2000);

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

    $("h1").click(function(){
        $("#terminal").toggleClass("inactive");
        $("#t-bio").addClass("inactive");
        $("#t-socials").addClass("inactive");
        $("#t-projects").addClass("inactive");
    })

    // Data to feed the terminal
    let data = [
      { 
        action: 'typeit',
        strings: ['^2000 bash --version\n'], 
        output: '<pre>GNU bash, version 4.3.48(1)-release (x86_64-pc-linux-gnu)<br /> Copyright (C) 2013 Free Software Foundation, Inc.<br /> License GPLv3+: GNU GPL version 3 or later http://gnu.org/licenses/gpl.html <br /> This is free software; you are free to change and redistribute it. <br /> There is NO WARRANTY, to the extent permitted by law.</pre>'
      },
      { 
        action: 'typeit',
        strings: ['name="Dave" '], 
        output: '\n',
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
        strings: ['[ -z "${name}" ] ||  echo "What\'s new, ${name}?"'],
        output: "Not much, Dave, how about you?",
        postDelay: 2000
    }]

    let data1 = [
    {
        action: 'typeit',
        strings: ["fortune"],
        output: "<pre>UNIX was not designed to stop you from doing stupid things <br />because that would also stop you from doing clever things.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  -- Douglas Gwyn</pre>",
        postDelay: 2000
    },
    {
        action: 'typeit',
        strings: ["fortune"],
        output: "<pre>I came of technical age with UNIX, where I learned with power-greedy pleasure that you could kill a system right out from under yourself with a single command.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  -- Ellen Ullman</pre>",
        postDelay: 2000
    }, 
    {
        action: 'typeit',
        strings: ["fortune"],
        output: "<pre>If you have any trouble sounding condescending, find a Unix user to show you how it's done.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  -- Scott Adams</pre>",
        postDelay: 2000
    }, 
    {
        action: 'typeit',
        strings: ["^2000 fortune"],
        output: "<pre>UNIX is simple.  It just takes a genius to understand its simplicity.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  -- Dennis Ritchie</pre>",
        postDelay: 2000
    },
    {
        action: 'typeit',
        strings: ["^2000 fortune"],
        output: "<pre>I define UNIX as 30 definitions of regular expressions living under one root.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  -- Donald Knuth</pre>",
        postDelay: 2000
    },
    {
        action: 'typeit',
        strings: ["^2000 fortune"],
        output: "<pre>UNIX gives you just enough rope to hang yourself--and then a couple more feet, just to be sure.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  -- Eric Allman</pre>",
        postDelay: 2000
    },
    {
        action: 'typeit',
        strings: ["^2000 fortune"],
        output: "<pre>I must say the Linux community is a lot nicer than the Unix community. A negative comment on Unix would warrent death threats. With Linux, it is like stirring up a nest of butterflies.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -- Ken Thompson</pre>",
        postDelay: 4000
    }
    ]

    // This uses Matt Bolt's typed.js to put the text on the terminal
    // Thanks to Simo Ami: https://codepen.io/simoami/pen/zstvo
    $(function(){
        let choice;
        choice = Math.round(Math.random()) ? data1 : data ;
        startTyping(choice, 0);
		function startTyping(data, pos) {
			var prompt = $('.prompt'),
				script = data[pos];
			switch(pos < data.length) {
				 default :
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
						$('.history').html(history.join('<br/>'));
					  }
					  // scroll to bottom of screen
					  $('section.terminal').scrollTop($('section.terminal').height());
					  // Type next string...
					  pos++;
					  if(pos < data.length) {
						setTimeout(function() {
						  startTyping(data, pos);
						}, script.postDelay || 1000);
					  }
                      else {
                         setTimeout(function(){
                           $('.history').html('');
                            choice = Math.round(Math.random()) ? data1 : data ;
                            startTyping(choice, 0);
                         }, 6000);
                      }
					}
				    });
		           break;
		  }  // end of switch
	   }     // end of runScripts()
   });       // end of IIFE
});

