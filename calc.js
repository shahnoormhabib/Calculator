/*
 * Implement all your JavaScript in this file!
 */
 $(document).ready(function test() {
     console.log("document loaded.");
    $("#display").disabled=false;
    $("#display").html("Hello");     
    document.getElementById('display').disabled=false;
    });
	var equalsOnEqual=false;
	var numberPressed=false;
	var displayOn=true;
	var Entries=[];
	var Oper=[];
	var previousEntry=null, currentEntry=0;
	var verb=null;
	var previousOper=null;
$("button.oper").click(function operHandler(){    
    var id;	
    id=$(this).attr('id');
	verb=id;
    console.log("Element id: "+ id);
    if(id=='clearButton') {
		$("#display").val("");
		Entries=[];
		Oper=[];
		$('#output').html("");
		return;
	}
        entry=$("#display").val();
		if(numberPressed===false){		 
		 Oper.pop();
		 Oper.push(id.toString());
		 console.log("Multiple operands"+" "+id);
		 return;
		 }
		if(previousEntry!==null && Entries.length>0){
		    console.log("Entries are: "+Entries.length);
			currentEntry=entry;
			currentEntry=DoVerb(previousOper, currentEntry,previousEntry);
			previousEntry=currentEntry;
			previousOper=verb;
			$('#output').html(currentEntry);
			$('#display').val(currentEntry);
		}
		else
		{
			previousEntry=entry;
			previousOper=verb;
		}
		Entries.push(entry);
		Oper.push(id.toString());
		displayOn=false; 
        //$("#display").val("");
    equalsOnEqual=false;
    console.log("Entry="+entry);
	numberPressed=false;
	});
	$("button.equal").click(function(){
		if(verb===null || numberPressed===false){		
		return;
		}
		entry=$("#display").val();
		Entries.push(entry);
		if(equalsOnEqual==true){
		    console.log("Equals on Equals operating " + previousOper+ " previous entry: "+ previousEntry+ " current: "+entry);
			entry=DoVerb(previousOper,previousEntry,entry);
			$('#display').val(entry);
			return;
		}		
		var lNumber=Entries.length;		
		var id;
        id=$(this).attr('id');
	    verb=id;//previous action
        $("#display").val("");
	    
	    var lOper=Oper.length;
	    var previous=null, operation, answer=0;
	    console.log("Entries : "+lNumber);
		var numbers=[];
	for(var i=0;i<lNumber;i=i+2){
	    operation=Oper.shift();
		console.log("operation: "+operation.toString());
		numbers=[parseInt(Entries.shift()),parseInt(Entries.shift())];
		switch (operation){
			case 'addButton':
				if(!isNaN(numbers[1])){
					answer=calculateAnswer(previous,operation, answer,numbers[0]+numbers[1]);
					console.log("Intermediate: "+answer);}
				else
				{
					console.log("previous operation is: "+previous+" "+operation); 
					answer=calculateAnswer(previous,operation, answer,numbers[0]);
					
				}
		
				break;
		case 'subtractButton':
		if(!isNaN(numbers[1]))
		     answer=calculateAnswer(previous,operation, answer,numbers[0]-numbers[1]);
        else
		{
		   console.log("Previous: "+previous+" "+operation); 
           answer=calculateAnswer(previous,operation, answer,numbers[0]);
        }  
		
		break;
		case 'multiplyButton':
		if(!isNaN(numbers[1]))
			answer=calculateAnswer(previous,operation, answer,numbers[0]*numbers[1]);
        else
			answer=calculateAnswer(previous,operation, answer,numbers[0]); 
		
		break;
		case 'divideButton':
			if(numbers[1]!==0){
				if(!isNaN(numbers[1]))
					answer=calculateAnswer(previous,operation, answer,numbers[0]/numbers[1]);
				else
					answer=calculateAnswer(previous,operation, answer,numbers[0]); 
		        }
		else answer="infinity";
		break;
		}//switch end
		
		previous=operation;
		
		previousOper=operation;
		if(!isNaN(numbers[1]))previousEntry=numbers[1];
		else prviousEntry=numbers[0];
		
	   $('#display').val(answer);
	   $('#output').html("Answer:"+answer);
	}//loop ends
	equalsOnEqual=true;
	});
	function calculateAnswer(previousOper, currentOper, previousAnswer, currentNumber)
	{     //console.log("Previous operation: "+previousOper); 
	      switch (currentOper)
		  {
		      case 'addButton':
			  if(previousOper===null){
			  console.log("current number: "+currentNumber);
			  return previousAnswer+currentNumber;
			  }
			  else
			  {
			  console.log("Previous answer: "+previousAnswer);
			  previousAnswer+=currentNumber;
			  return previousAnswer;
			  }
			  case 'subtractButton':
			  if(previousOper===null){
			  return currentNumber;
			  }
			  else
			  {
			  $('#output').html("Previous answer: "+previousAnswer);
			  previousAnswer-=currentNumber;
			  return previousAnswer;
			  }
			  case 'multiplyButton':
			   if(previousOper===null)
			  return currentNumber*1.0;
			  else
			  return previousAnswer*=1.0*currentNumber;
			  case 'divideButton':
			  if(currentNumber!==0){
			  if(previousOper===null)
			  return currentNumber*1.0;
			  else
			  return previousAnswer/=1.0*currentNumber;
			  }
			  return "infinity";			  
		  }
	}
$("button.number").click(clickHandler);
function clickHandler(){
    if(displayOn===false)$('#display').val("");//new change
    console.log("verb: "+verb);
    var number=$(this).val();
	if(verb==='equalsButton'){
	$('#display').val("");
	verb=null;
	}
	
	
    console.log("Number clicked: "+ number);
    if($('#display').val()==="")$('#display').val(number);
    else $('#display').val($('#display').val()+number);
	displayOn=true; //new change
	equalsOnEqual=false;
	numberPressed=true;
};
function DoVerb(verb, current, previous){
      switch(verb){
	    case 'addButton':
		return parseInt(current)+parseInt(previous);
		case 'subtractButton':
		return -parseInt(current)+parseInt(previous);
		case 'multiplyButton':
		return parseInt(current)*parseInt(previous);
		case 'divideButton':
		if(parseInt(previous)!==0)
		return parseInt(current)/parseInt(previous);
		else return "infinity";
	  }
}