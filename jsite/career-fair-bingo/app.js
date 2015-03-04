var app = angular.module('hackathonBingo', []);


app.controller('ctl', ['$scope',
  function($scope) {

    $scope.hasWonGame = false;



    var populateGrid = function() {


      var labels = [
       "Girl wearing a skirt that is entirely too short",
       "People complaining that google is not attending",
       "An art student complainig about lack of employers",
       "Someone fist pumping after getting an interview",
       "White socks with black dress pants",
       "A long line at the Apple table",
       "A recruiter mentioning career fair bingo",
       "A recruiter with a clipboard",
       "Students bragging about who got more interviews",
       "Sneakers and dress pants",
       "A kid wearing a Fedora",
       "Student explaining they dropped their name tag",
       "Free pens with the company name",
       "Someone who clearly hasn't shaved",
       "Someone overdressed in a tux",
       "Someone who forgot their own name from nervousness",
       "A company with the word \"Synergy\" on their poster",
       "Student who forgot resumes",
       "A student crying",
       "Recruiter frantically scribbling notes",
       "Student dropping a pile of resumes",
       "A recruiter giving out some kind of electronic device",
       "Student mentioning HVZ as an extrac curricular",
       "Student explaining the colored dots",
       "Making a government recuiter say \"It's classified\""
      ];



      for(var i = labels.length - 1; i != 0; i--) {
        var j = Math.floor(Math.random() * i);
        var tmp = labels[i];
        labels[i] = labels[j];
        labels[j] = tmp;
      }

      $scope.grid = [];
      for (var i = 0; i < 5; i++) {
        $scope.grid.push([]);
        for (var j = 0; j < 5; j++) {
          // shuffle 
          $scope.grid[i].push({
            label: labels.pop(),
            checked: false
          });
        }
      }
    }

    var jsonGrid = localStorage.getItem('grid');
    if (jsonGrid) {
      $scope.grid = JSON.parse(jsonGrid);
    } else {
      populateGrid();
    }


    $scope.onBoardChange = function() {
      localStorage.setItem('grid', JSON.stringify($scope.grid));

      // check for win
      for( var i = 0; i < 5; i++ ) {
        var win = true;
        for(var j = 0; j < 5; j++ ) {
          win = win && $scope.grid[i][j].checked;
        }
        $scope.hasWonGame = $scope.hasWonGame || win;
      }

      // check for win
      for( var i = 0; i < 5; i++ ) {
        var win = true;
        for(var j = 0; j < 5; j++ ) {
          win = win &&  $scope.grid[j][i].checked;
        }
        $scope.hasWonGame = $scope.hasWonGame || win;
      }

      console.log($scope.hasWongame);
    };

    $scope.reset = function () {
      localStorage.removeItem('grid');
      populateGrid();
      $scope.hasWonGame = false;
    }
  }
]);
