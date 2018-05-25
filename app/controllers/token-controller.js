function TokenController($scope) {
  var vm = this;
  vm.accounts = web3.eth.accounts;
  vm.isAllowedToOperate=true;
  vm.selectedAccount = vm.accounts[0];

  SimpleAirDrop.deployed().then(function(instance){
    vm.instance = instance;
    return instance.paused.call(); 
  }).then(function(pausedOrNot){
     vm.paused = pausedOrNot;
     $scope.$apply();
  });

  vm.pause = function(){
    vm.instance.pause({from:web3.eth.accounts[0]})
      .then(function(transactionReceipt){
        console.log(transactionReceipt.tx);
        vm.pause_success = true;
        $scope.$apply();
      }).catch(function(error) {
        console.error(error);
        vm.has_pause_errors = error;
        $scope.$apply();
    });
  }

  vm.unpause = function(){
    vm.instance.unpause({from:web3.eth.accounts[0]})
      .then(function(transactionReceipt){
        console.log(transactionReceipt.tx);
        vm.unpause_success = true;
        $scope.$apply();
      }).catch(function(error) {
        console.error(error);
        vm.has_unpause_errors = error;
        $scope.$apply();
    });
  }

  vm.setTokenTo = function(address) {

    SimpleAirDrop.deployed()
      .then(function(instance) {
        vm.instance = instance;

        return instance.owner.call();
      })
      .then(function(owner) {
        if (vm.paused && owner == vm.selectedAccount){
          vm.isAllowedToOperate = true;
        }else{
          vm.isAllowedToOperate = false;
        }

        console.log("attempting transaction, please wait.");
        if (vm.isAllowedToOperate) {
          vm.instance.applyToken(address, {
              from: web3.eth.accounts[0]
            })
            .then(function(transactionReceipt) {
              console.log(transactionReceipt.tx);
              vm.transfer_success = true;
              $scope.$apply();
            }).catch(function(error) {
              console.error(error);
              vm.has_errors = error;
              $scope.$apply();
            });
        } else {
          console.log("blocked, address cannot be applied to airdrop");
          $scope.$apply();
        }
      });
  }
}
