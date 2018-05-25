function MainController($scope) {
  var vm = this;
  SimpleAirDrop.deployed().then(function(instance) {
    vm.instance=instance;
    return vm.instance.paused.call(); 
  }).then(function(pausedOrNot){
    if (pausedOrNot){
      vm.active="No";
    }else{
      vm.active="Yes";
    }
    return vm.instance.checkToken();
  }).then(function(addr){
    vm.tokenAddr =  addr;
    vm.url = "https://rinkeby.etherscan.io/address/"+addr;
    tokenStandard.at(vm.tokenAddr).then(function(tokenInstance){
      vm.tokenInstance=tokenInstance;
      return vm.tokenInstance.name.call();
    }).then(function(name){
      vm.tokenName = name;
      return vm.tokenInstance.symbol.call();
    }).then(function(symbol){
      vm.tokenSymbol = symbol;
      return vm.tokenInstance.decimals.call();
    }).then(function(dec){
      vm.tokenDec = dec;
      return vm.tokenInstance.balanceOf.call(vm.instance.address); 
    }).then(function(balance){
      vm.tokenBalance = web3.fromWei(balance, "ether");
      $scope.$apply();
    });
    
  });
}
