var app = angular.module("GuessTheWordApp",[]);
app.controller("GameController",['$scope','$timeout',function($scope,$timeout){
    var words=["Planet","Jupiter","Earth","Mars"];
    $scope.wrongLetterArray=[];
    $scope.correctLetterArray=[];
    var selectedWord='';
    $scope.guesses=6;
    $scope.displayWord='';
    $scope.input = {
        letter: ''
    };
    var selectRandomWord = function() {
        var index = Math.round(Math.random()*words.length);
        return words[index];
    }
    var newGame = function() {

        $scope.wrongLetterArray = [];
        $scope.correctLetterArray=[];
        $scope.guesses=6;
        $scope.displayWord="";
        selectedWord=selectRandomWord();
        var tempDisplayWord='';
        for(var i=0;i<selectedWord.length;i++) {
            tempDisplayWord+='*';
        }
        $scope.displayWord=tempDisplayWord;
        // Random word selection.
    }
    $scope.letterChosen = function() {
        // Check if $scope.input.letter is a single letter and an alphabet and not an already chosen letter.
        // Check if its correct.
        for(var i=0;i<$scope.correctLetterArray.length;i++) {
            if($scope.correctLetterArray[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
                $scope.input.letter="";
                return;
            }
        }
        for(var i=0;i<$scope.wrongLetterArray.length;i++) {
            if($scope.wrongLetterArray[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
                $scope.input.letter="";
                return;
            }
        }
        var correct=false;
        for(var i=0;i<selectedWord.length;i++) {
            if(selectedWord[i].toLowerCase()==$scope.input.letter.toLowerCase()) {
                $scope.displayWord=$scope.displayWord.slice(0,i)+$scope.input.letter.toUpperCase()+$scope.displayWord.slice(i+1);
                correct=true;

            }
        }
        if(correct) {
            var objhand = $(".correct-icon");
            objhand.animate({height: '-100px', opacity: '0.4'}, "fast");
            objhand.animate({width: '200px', opacity: '0.8'}, "fast");
            objhand.animate({height: '100px', opacity: '0.4'}, "fast");
            objhand.animate({width: '100px', opacity: '0.8'}, "fast");

            $scope.correctLetterArray.push($scope.input.letter.toUpperCase());
        } else {
            var objhand = $(".incorrect-icon");
            objhand.animate({height: '200px', opacity: '0.4'}, "fast");
            objhand.animate({width: '-200px', opacity: '0.8'}, "fast");
            objhand.animate({height: '100px', opacity: '0.4'}, "fast");
            objhand.animate({width: '100px', opacity: '0.8'}, "fast");

            $scope.guesses--;
            $scope.wrongLetterArray.push($scope.input.letter.toUpperCase());
        }
        $timeout(function() {
            $('.dial').trigger('change');
        },500);


        $scope.input.letter="";
        if($scope.guesses==0) {
            // You Lose
            $timeout(function() {
                newGame();
                $timeout(function() {
                    $('.dial').trigger('change');
                },500);
            },500);
        }
        if($scope.displayWord.indexOf("*")==-1) {
            // Show score
            $timeout(function() {
                newGame();
                $timeout(function() {
                    $('.dial').trigger('change');
                },500);

            },500);
        }
    }
    newGame();
}]);
