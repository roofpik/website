app.controller('faqCtrl', function($scope, $timeout, UserTokenService, $location){
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    
	$scope.faq = [
		{
			ques: 'What is Roofpik?',
			ans: 'Roofpik is your very own Platform which captures your views on a residential project, under construction property and locality.',
			val: false
		},
		{
			ques: 'Why do we need reviews?',
			ans: 'We rely on reviews for the littlest of things, yet there is no unbiased forum or source of information which provides genuine reviews from people who have the knowledge about a project or locality. Roofpik is gathering this information for users to access information which helps them make an informed decisions.',
			val: false
		},
		{
			ques: 'What sort of things do we need to write about?',
			ans: 'The review form captures information and ratings for structured parameters to enable a statistic analysis which will be helpful for users. Along with this, you also have a free text box for you to write whatever you want, giving your insider view on a project or locality.',
			val: false
		},
		{
			ques: 'What do we get for writing a review?',
			ans: 'Your few seconds today will help someone else in making an important decision. This very platform will help you in the future at some point to access reviews that other users have written. We are also working collaboratively with an NGO, Nanhi Kali, to contribute towards girl education for every review that you write and we will keep you informed of the progress of this if you chose to receive updates.',
			val: false
		},
		{
			ques: 'Can I write more than one review?',
			ans: 'Of course! You can write as many reviews that you like based on your experience of living there, or visiting a place.',
			val: false
		},
		{
			ques: 'Why do I need to share my mobile number or address?',
			ans: 'We need to ensure that the reviews that are written are validated and written by genuine users. This helps us ensure that Roofpik only contains information from real users, to eliminate fake information and reviews. We adhere strictly to our privacy policy and commit to not sharing your personal information with anyone. You can access our privacy policy HERE.',
			val: false
		},
		{
			ques: 'Where is Roofpik operational?',
			ans: 'At present, you can write about any residential project, under construction property or locality in Gurgaon. We will eventually be expanding and reaching out to other users across multiple cities.',
			val: false
		},
		{
			ques: 'Where will a user be able to access reviews?',
			ans: 'Once a user writes a review, this will go through an internal validation process after which it will be made live. This is when other users will be able to access this information.',
			val: false
		},
		{
			ques: 'How am I contributing to girl child education?',
			ans: 'Roofpik have a collaborative relationship with an NGO, Nanhi Kali who work in providing a girl child the gift of education. Roofpik have made a commitment to contribute towards this gift for every review that you write. We will be emailing the details of the girl child whose education you have contributed to by writing your review.',
			val: false
		}
	];

	$scope.showFaq = function(item, index){
		item.val = !item.val
		for(key in $scope.faq){
			if(index != key){
				$scope.faq[key].val = false;
			}
		}
	}
	loading(false);
})