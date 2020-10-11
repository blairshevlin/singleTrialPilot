var timeline = [];

/** Fixation */
var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: fixation_duration,
};


/** Trials */
var fullscreen = {
  type: 'fullscreen',
  fullscreen_mode: true,
};
timeline.push(fullscreen)

/** STIMULI */

/** Instructions*/

var instr1 = {
  type: 'html-keyboard-response',
  stimulus:`<p>In this task, you will be making choices across a series of hypothetical situations. In each scenario, you will read a</p>
  <p>short description of a social dillema. At first, some information will be hidden by a series of asterisks (<b>**********</b>).</p>
  <p>After some time has passed, the asterisks will disappear, and the information will be revealed. Once this information appears,</p>
  <p>you will be free to make a decision using the <b>F</b> and <b>J</b> keys. </p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']
}
timeline.push(instr1)

var instr2 = {
  type: 'html-keyboard-response',
  stimulus:`<p>You will now complete a practice trial. In this scenario, you will be choosing whether or not to help a friend.</p>
  <p>Remember, you will not be allowed to respond while the asterisks remain on the screen.</p>
  <p>Try your best to respond as quickly as you can, but only when the asterisks disappear.</p>
  <p>When you are ready to begin, place your index fingers on the <b>F</b> and <b>J</b> keys, respectively. <p>
  <p>Press the space bar to start the practice trial.</p>`,
  choices: ['space']
}
timeline.push(instr2)

var mask_err_slow = {
  type: 'html-keyboard-response',
  stimulus: `<p> Whoops! Let's try that again. </p> 
  <p> Try to respond as <b>quickly</b> as you can once the asterisks disappear.</p>
  <p>When you are ready to begin, place your index fingers on the <b>F</b> and <b>J</b> keys, respectively.</p>
  <p>Press the space bar to try again. </p>`,
  choices: ['space']
}

var mask_err_fast = {
  type: 'html-keyboard-response',
  stimulus: `<p> Whoops! Let's try that again. </p> 
  <p>Make sure you read the information before making a response. </p>
  <p>When you are ready to begin, place your index fingers on the <b>F</b> and <b>J</b> keys, respectively.</p>
  <p>Press the space bar to try again. </p>`,
  choices: ['space']
}

var mask_err_last_slow = {
  type: 'html-keyboard-response',
  stimulus: `<p> Your responses was too slow. For the actual task, please try to respond more quickly.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']

}

var mask_err_last_fast = {
  type: 'html-keyboard-response',
  stimulus: `<p> Your responses was too fast. For the actual task, please try to read the information before making a response.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']
}

var testScenario_mask = {
  type: 'html-keyboard-response',
  stimulus: `<p>Imagine a friend sends you a text message. In the text message, your friend
  asks you to give them <b>**********</b>.</p>
  <p>Do you decide to help your friend?<p>
  <p><b>**********</b> or <b>**********</b></p>`,
  choices: jsPsych.NO_KEYS,
  trial_duration: mask_duration*27
}
timeline.push(fixation)
timeline.push(testScenario_mask)
var testScenario_Choice1 = {
  type: 'html-keyboard-response',
  stimulus: `<p>Imagine a friend sends you a text message. In the text message, your friend
  asks you to give them <b>a phone call</b>.</p>
  <p>Do you decide to help your friend?<p>
  <p><b>Give Call [ F ]</b> or <b>Do Not Call [ J ]</b></p>`,
  choices: ["F", "J"],
}
var testScenario_Choice2 = {
  type: 'html-keyboard-response',
  stimulus: `<p>Imagine a friend sends you a text message. In the text message, your friend
  asks you to give them <b>$500</b>.</p>
  <p>Do you decide to help your friend?<p>
  <p><b>Give $500 [ F ]</b> or <b>Do Not Give $500 [ J ]</b></p>`,
  choices: ["F", "J"],
}
var testScenario_Choice3 = {
  type: 'html-keyboard-response',
  stimulus: `<p>Imagine a friend sends you a text message. In the text message, your friend
  asks you to give them <b>$5</b>.</p>
  <p>Do you decide to help your friend?<p>
  <p><b>Give $5 [ F ]</b> or <b>Do Not Give $5 [ J ]</b></p>`,
  choices: ["F", "J"],
}
timeline.push(testScenario_Choice1)

var conditional1_slow = {
  timeline: [mask_err_slow, fixation, testScenario_mask, testScenario_Choice2],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.rt <= 4000){
      return false;
    } else{
      return true;
    } 
  }
}
timeline.push(conditional1_slow)

var conditional1_fast = {
  timeline: [mask_err_fast, fixation, testScenario_mask, testScenario_Choice2],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.rt >= 250){
      return false;
    } else{
      return true;
    } 
  }
}
timeline.push(conditional1_fast)

var conditional2_slow = {
  timeline: [mask_err_slow, fixation, testScenario_mask, testScenario_Choice3],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.rt <= 4000){
      return false;
    } else{
      return true;
    } 
  }
}
timeline.push(conditional2_slow)

var conditional2_fast = {
  timeline: [mask_err_fast, fixation, testScenario_mask, testScenario_Choice3],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.rt >= 250){
      return false;
    } else{
      return true;
    } 
  }
}
timeline.push(conditional2_fast)

var conditional3_slow = {
  timeline: [mask_err_last_slow],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.rt <= 4000){
      return false;
    } else{
      data.fail = 1;
      return true;
    } 
  }
}
timeline.push(conditional3_slow)

var conditional3_fast = {
  timeline: [mask_err_last_fast],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.rt >= 250){
      return false;
    } else{
      data.fail = 1;
      return true;
    } 
  }
}
timeline.push(conditional3_fast)

var practiceEnd ={
  type: 'html-keyboard-response',
  stimulus:`<p>You have completed the practice section. You will now begin the main task. </p>
  <p>Try to keep you fingers on the <b>F</b> and <b>J</b> keys while you read the scenario.<p>
  <p>And please respond as <b>quickly</b> as you can.</p>
  <p>Press the space bar to begin the task</p>`,
  choices: ['space']
}
timeline.push(practiceEnd)