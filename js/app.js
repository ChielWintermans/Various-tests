'use strict';
function Model(){
	var self=this;
	self.optionArray=[1, 2, 3];
	self.displayTwoButtons=ko.observable(false);
}
var model=new Model();

function ViewModel(){
	var self=this;
	self.displayOption=ko.observable(model.optionArray[0]);

	self.choices=function(data){
		if(data==='0'){
			if(self.displayOption()===model.optionArray[0]){
				self.displayOption(model.optionArray[1]);
				model.displayTwoButtons(true);
			}else{
				self.displayOption(model.optionArray[0]);
				model.displayTwoButtons(false);
			}
		}else{
			if(self.displayOption()===model.optionArray[1]){
				self.displayOption(model.optionArray[2]);
			}else{
				self.displayOption(model.optionArray[1]);
			}
		}
	};
}
ko.applyBindings(new ViewModel());