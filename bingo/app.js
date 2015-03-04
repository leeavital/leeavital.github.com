var app = angular.module('hackathonBingo', []);


app.controller('ctl', ['$scope',
  function($scope) {

    $scope.hasWonGame = false;



    var populateGrid = function() {


      var labels = ['somebody building jarvis', '"the next facebook"',
        'someone with a HUGE box of hardware',
        'someone trying to shower in the sink',
        'that one kid who looks 13', 'a free credit to AWS/Google Cloud/etc',
        'someone with over five red bulls', 'the kid with way too many laptop stickers',
        'someone building a music recomendation system', 'someone without shoes',
        'someone with a second monitor', 'person sending a snapchat of the whole room',
        'the impossible hack', 'pedantic linux user', 'person with an intricate sleeping arrangment',
        'someone sleeping under a table', 'a hack that "spreads awareness"', 'a person in an old MHacks shirt',
        'Alternative energy drink', 'huge line for free T-Shirts',
        'Someone doing machine learning', 'Someone asleep at 3:00 PM', 'Stimulants in Pill Form',
        'Bootstrap', 'Heated Node.js vs Io.js debate', 'someone writing C', 'Drones', 'It\'s like Uber for X'
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
