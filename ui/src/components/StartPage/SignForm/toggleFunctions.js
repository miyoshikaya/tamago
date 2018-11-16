import $ from 'jquery'; 

$(".log-in").click(function(){
	$(".signIn").addClass("active-dx");
	$(".signUp").addClass("inactive-sx");
	$(".signUp").removeClass("active-sx");
	$(".signIn").removeClass("inactive-dx");
});

function showSignIn() {
	$(".back").click(function(){
		$(".signUp").addClass("active-sx");
		$(".signIn").addClass("inactive-dx");
		$(".signIn").removeClass("active-dx");
		$(".signUp").removeClass("inactive-sx");
	});
}

export { showSignIn };