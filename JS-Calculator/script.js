
//function for the history value
function getHistory(){
	return document.getElementById("history-value").innerText;
}

//function for the print history
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}

//function for the result/ output
function getOutput(){
	return document.getElementById("output-value").innerText;
}

//function for print the output/ result in the result pannel
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}

//function to get the formatted number
function getFormattedNumber(num){
	if(num=="-"){  //if number is negative it will return empty string
		return "";
	}

	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}

//function to change the comma separated number to the actual number like 8,999 to 8999
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}



//this function is reponsible for the operator related operation
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){ //if click on clear button, history and result both will be cleared.
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){  // if clicked on the backspace button, one number from right side will be erased
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){   //checking if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();

			//if we want to change the operator in for calculation
			//suppose we clicked 8+9*, but we want to change * from - then below code will execute
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){  //if we clicked on = button
					var result=eval(history);  //eval method will automatically calculate and 
					printOutput(result);   // result section will be replaced by the calculated value
					printHistory("");		// and history section will be empty
				}
				else{   //else we didn't clicked on = button, history will be remain same and output will be empty.
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}

//operation related to the number clicked by the user
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){

	
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;  //concatenation will happen here
			printOutput(output);  
		}
	});
}