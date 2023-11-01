    
    // use keyboard
    function useKey(event) {
             
        // Only ASCII character in that range allowed
        //var ASCIICode = (event.which) ? event.which : event.keyCode;
        //if ((ASCIICode > 47 && ASCIICode < 58)||ASCIICode==8||(ASCIICode > 95 && ASCIICode < 112)||ASCIICode==187||ASCIICode==27)
        const mathSymbol = ["+", "-", "*", "/"];
        var key = event.key;
        //console.log(key);
        if (key>=0||key<=9){
            addNumber(key);
        }
        else if (mathSymbol.includes(key)){
            addmathSymbol(key);
        }
        else if (key=="Backspace"){
            back();
        }
        else if (key=="."){
            addComma(key);
        }
        else if (key=="="){
            equal();
        }
        else if (key=="F9"){
            fpm();
        }
        else if (key=="Escape"){
            fclear();
        }
        else if (key=="%"){
            percent();
        }            
    return false;

    }

    //fun focus input (not use)
    function moveCursorToEnd(id) {
        var el = document.getElementById(id);
        el.focus();
        if (typeof el.selectionStart == "number") {
            el.selectionStart = el.selectionEnd = el.value.length;
        } else if (typeof el.createTextRange != "undefined") {           
            var range = el.createTextRange();
            range.collapse(false);
            range.select();
        }
      }
    
    //fun position input in end
    function PosEnd(end) {
        var len = end.value.length;
         
        // Mostly for Web Browsers
        if (end.setSelectionRange) {
            end.focus();
            end.setSelectionRange(len, len);
        } else if (end.createTextRange) {
            var t = end.createTextRange();
            t.collapse(true);
            t.moveEnd('character', len);
            t.moveStart('character', len);
            t.select();
        }
    }
        
    // fun percent    
        function percent(){
            var y = document.getElementById('result_txt').value;
            var result ='';
            const mathSymbol = ["+", "-", "*", "/"];
            if (mathSymbol.includes(y.substr(-1)) || y=='0') {
                y=y;
            }
            else {
                result=Number(y)/100;
                //console.log(result);
                y=result.toString();
            }
        document.getElementById("result_txt").value=y;
        }

    // fun plus/minus
        function fpm() {
            var y = document.getElementById('result_txt').value;
            const mathSymbol = ["+", "-", "*", "/"];
            var cnt=0;
            var minus = '-';
            for (var i=0; i<mathSymbol.length; i++) {
                if (y.substr(1,y.length).includes(mathSymbol[i])) {
                    cnt+=1;
                    break;
                }
            }
            if (y=='0') {
                y=y;
            }
            else if (cnt==0 && y.substr(0,1)==minus) { 
                y=y.substr(1,y.length);
            }
            else if (cnt==0 && y.substr(0,1)!=minus) {
                y=minus+y;
            }
            
        document.getElementById("result_txt").value=y; 
        }

    // fun clear
        function fclear() {
            document.getElementById("result_txt").value = '0';
        }
       
    // fun add number
        function addNumber(x) {
            const mathSymbol = ["+", "-", "*", "/"];
             var y = document.getElementById('result_txt').value;
             if (y==="0") { 
                 y=x;
             }
             else{
                 if (y.substr(-1)==="0" && mathSymbol.includes(y.substr(y.length-2,1))){
                    y=y;
                 }
                 else {
                 y=y+x;
                 }
             }
             console.log(y);
             document.getElementById("result_txt").value=y;  
        }
         
    // fun use math symbol
        function addmathSymbol(x) {
             const mathSymbol = ["+", "-", "*", "/"];
             var y = document.getElementById('result_txt').value;
             var cnt=0;
             var i=0;
             var minus = "-";
             var chekMinus = "";
             if (y.substr(0,1)==minus) {
                y=y.substr(1,y.length);
                chekMinus = minus;
             }
             for (var i=0; i<mathSymbol.length; i++) {
                 if (y.substr(0,y.length-1).includes(mathSymbol[i])) {
                 cnt +=1;
                 
                 }
                 //console.log(cnt);
             }
             if (mathSymbol.includes(y.substr(-1)) && cnt==0) {    
                 y=chekMinus+y.substr(0,y.length-1)+x;
                 document.getElementById("result_txt").value=y;
                 //console.log('one');
             }
             else if (!mathSymbol.includes(y.substr(-1)) && cnt>0) {
                //console.log('two');
                
                 equal();
                 y = document.getElementById('result_txt').value;
                 y=y+x;

                 document.getElementById("result_txt").value=y;
             }
             else{
                 //console.log('three');
                 y=chekMinus+y+x;
                 document.getElementById("result_txt").value=y;
             }
        }
         
    // fun equal
        function equal() {
             const mathSymbol = ["+", "-", "*", "/"];
             var y = document.getElementById('result_txt').value;
             var a = [];
             var list = [];
             list = y.split("");
             var b = "";
             var t = "";
             var rest = 0;
             var restStr = "";
             var s=0;
             var minus = "-";
             //console.log("start");
             if (y.substr(0,1)==minus) {
                t=t+minus;
                s=1;
             }
             for (i=s; i<list.length; i++) {
                    if (mathSymbol.includes(list[i])) {
                     b=list[i];
                     a.push(t);
                     t="";
                    }
                    else {
                    t+= list[i];
                    }
                    if (i==list.length-1) {
                     a.push(t); 
                    }
                 }
            if (Number(a[1])===""||b==="") {
                restStr=y;
                //console.log('chek');
            }
            else {
                 if (b=='+') {
                     rest = Number(a[0])+Number(a[1]);
                 }
                 else if (b=='-') {
                     rest = Number(a[0])-Number(a[1]);
                 }
                 else if (b=='*') {
                     rest = Number(a[0])*Number(a[1]);
                 }
                 else if (b=='/') {
                     rest = Number(a[0])/Number(a[1]);
                 }
             restStr=rest.toString();
            }    
             document.getElementById("result_txt").value=restStr;
        }
         
    // fun back
        function back() {
             var y = document.getElementById('result_txt').value;
             if (y.length==1) { 
                 y='0';
             }
             else{
                 y=y.substr(0,y.length-1);
             }
             document.getElementById("result_txt").value=y;  
        }
         
    // fun comma
        function addComma(x) {
             const mathSymbol = ["+", "-", "*", "/"];
             var y = document.getElementById('result_txt').value;
             var list = [];
             list = y.split("");
             var i=list.length-1;
             var checkMathSimbol=0;
             var checkComma=0
             var checkNumber=0;
             //console.log('start');
             while (i>=0) {
                 if ((mathSymbol.includes(list[i]) || list[i]==x) && i==list.length-1) {
                     //console.log('one');
                     break;
                     }
                     else if (mathSymbol.includes(list[i])) {
                             checkMathSimbol+=1;
                             //console.log('two');
                             break;
                     }
                     else if (list[i]==x){
                             checkComma+=1;
                             //console.log('three');
                             break;
                           }
                     else if (!mathSymbol.includes(list[i]) && list[i]!=x) {
                         //console.log('four');
                         checkNumber+=1;
                     }
                 i--;               
                 } 
             //console.log(checkNumber);
             //console.log(checkMathSimbol);
             //console.log(checkComma);
             if (checkNumber>0 && checkMathSimbol==1) {
                 y=y+x;
             }
             else if (checkNumber>0 && checkComma==1) {
                 y=y;
             }
             else if (checkNumber>0 && checkComma==0 && checkMathSimbol==0) {
                 y=y+x;
             }
         
         document.getElementById("result_txt").value=y;  
        }

