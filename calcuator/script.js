// файл script.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    footer = document.getElementById("footer");
    //background
    background = document.body.style.backgroundColor;
    let originalBackground = true;
    let originalResult = true;

    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    document.getElementById("btn_op_color").onclick = function() {
        if (!originalResult){
            outputElement.style.background = '#121212';
        } else{
            outputElement.style.background ='#EF3124';
        }
        originalResult = !originalResult;
    }
    
    document.getElementById("btn_op_theme").onclick = function() { 
        if (!originalBackground){
            document.body.style.backgroundColor = '#121212';
            footer.style.background = '#121212';
        } else{
            document.body.style.backgroundColor ='rgb(44, 44, 44)';
            footer.style.background ='rgb(44, 44, 44)';
        }
        originalBackground = !originalBackground;
    }



    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        if (b != ''){
            switch (selectedOperation){
                case '+':
                    expressionResult = (+a) + (+b);
                    break;
                case '-':
                    expressionResult = (+a) - (+b);
                    break;
                    
            }
                
            
            a = expressionResult.toString();
            b = '';
            outputElement.innerHTML = a;
        }
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        if (b != ''){
            switch (selectedOperation){
                case '+':
                    expressionResult = (+a) + (+b);
                    break;
                case '-':
                    expressionResult = (+a) - (+b);
                    break;
            }
            a = expressionResult.toString();
            b = '';
            outputElement.innerHTML = a;
        }
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    document.getElementById("btn_op_sign").onclick = function() { 
        if (b == ''){
            minus_a = -(+a);
            a = minus_a.toString()
            outputElement.innerHTML = a;
        } else{
            minus_b = -(+b);
            b = minus_b.toString();
            outputElement.innerHTML = b;
        }
        
    }

    document.getElementById("btn_op_percent").onclick = function() { 
        if (b == ''){
            num_a = (+a)/100;
            a = num_a.toString()
            outputElement.innerHTML = a;
        } else{
            num_b = (+b)/100;
            b = num_b.toString()
            outputElement.innerHTML = b;
        }
    }    

    document.getElementById("btn_op_factorial").onclick = function() { 
        if (b == ''){
            if ((+a) < 0){
                return;
            }
            result = 1;
            for (i = 1;i <= a;i++){
                result *= i;
            }
            a = result.toString()
            outputElement.innerHTML = a;
        } else{
            if ((+b) < 0){
                return;
            }
            result = 1;
            for (i = 1;i <= b;i++){
                result *= i;
            }
            b = result.toString()
            outputElement.innerHTML = b;
        }
    }    

    document.getElementById("btn_op_sqrt").onclick = function() { 
        if (b == ''){
            num_a = Math.sqrt((+a));
            a = num_a.toString()
            outputElement.innerHTML = a;
        } else{
            num_b = Math.sqrt((+b));
            b = num_b.toString()
            outputElement.innerHTML = b;
        }
    }
    
    document.getElementById("btn_op_sqr").onclick = function() { 
        if (b == ''){
            num_a = (+a)*(+a);
            a = num_a.toString()
            outputElement.innerHTML = a;
        } else{
            num_b = (+b)*(+b);
            b = num_b.toString()
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_backspace").onclick = function() { 
        if (b == ''){
            a = a.slice(0, -1); 
            outputElement.innerHTML = a;
        } else{
            b = b.slice(0, -1); 
            outputElement.innerHTML = b;
        }
    }  

    document.getElementById("btn_op_special").onclick = function() { 
        const G = 6.67430;
        const M = 5.972 * Math.pow(10,10);
        const R = 6371000;
        if (b == ''){
            num_a = (M*G/((+a)*(+a))-R);
            a = num_a.toString()
            outputElement.innerHTML = a;
        } else{
            num_b = (M*G/((+b)*(+b))-R);
            b = num_b.toString()
            outputElement.innerHTML = b;
        }
    }  
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }

    };