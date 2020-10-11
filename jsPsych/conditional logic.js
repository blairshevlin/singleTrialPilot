
var instructionsPageThree = {
    type: 'html-button-response',
    stimulus: '<p> Let\'s do a test trial. <br> The following screen will show a non-word. Press <strong> j </strong> </br> </p>',
    choices: ['Continue']
  }
  
  timeline.push(instructionsPageThree)
  
  
  var error_screen = {
    type: 'html-button-response',
    stimulus: '<p> Let\'s try that again. <br> The following screen will show a non-word. Press <strong> j </strong> </br> </p>',
    choices: ['Continue']
  }
  
  var error_screen_last = {
    type: 'html-button-response',
    stimulus: '<p> You failed. </p>',
    choices: ['Continue']
  }
  
  var testNonWord = {
    type: 'html-keyboard-response',
    stimulus: '<p>murkt</p>'
  }
  timeline.push(testNonWord)
  
  
  var conditional = {
    timeline: [error_screen, testNonWord],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')){
        return false;
      } else{
        return true;;
      } 
    }
  }
  timeline.push(conditional)
  
  
  var conditional2 = {
    timeline: [error_screen, testNonWord],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')){
        return false;
      } else{
        return true;;
      } 
    }
  }
  timeline.push(conditional2)
  
  var conditional3 = {
    timeline: [error_screen_last],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')){
        return false;
      } else{
        data.fail = 1;
        return true;
      } 
    }
  }
  timeline.push(conditional3)
  