function AirDropController($scope) {
  var vm = this;
  vm.accounts = web3.eth.accounts; 
  vm.isAllowedToOperate = true;
  vm.selectedAccount = web3.eth.accounts[0];

  vm.withdrawFunds = function(address_from,addresses, amount) {
    
    SimpleAirDrop.deployed().then(function(instance) {
      vm.instance = instance;
      vm.selectedAccount = address_from;
      return instance.owner.call();
    }).then(function(owner) {
      if (owner == vm.selectedAccount){
        vm.isAllowedToOperate = true;
      }else{
        vm.isAllowedToOperate = false;
      }

      if (vm.isAllowedToOperate) {
        var lucky = addresses;
        var weiAmount = web3.toWei(amount,"ether");
        vm.instance.withdrawAirDrop(lucky, weiAmount,{
            from: web3.eth.accounts[0]
          }).then(function(transactionReceipt) {
            console.log(transactionReceipt.tx);
            vm.transfer_success = true;
            $scope.$apply();
          }).catch(function(error) {
            console.error(error);
            vm.has_errors = error;
            $scope.$apply();
          });

      }else{
        console.log("is address allowed to operate: "+vm.isAllowedToOperate);
      }

      $scope.$apply();
    });
  };
}
