/** Constants */
const ntrials = 3;
const mask_duration = 300;
const fixation_duration = 500;


/** Prepare */
var subject_id = jsPsych.randomization.randomID();
var cafe_condition_assignment = jsPsych.randomization.sampleWithoutReplacement([ 'NietherA', 'NietherB','BothA', 'BothB'], 1)[0];

var frame_condition_assignment = jsPsych.randomization.sampleWithoutReplacement([ 'GainL', 'GainS','LossL', 'LossS'], 1)[0];

jsPsych.data.addProperties({
  subject: subject_id,
  cafeCond: cafe_condition_assignment,
  frameCond: frame_condition_assignment
});

var candyFiles = [
    "static/lib/img/ReesesPeanutButterCup.jpg",
    "static/lib/img/Snickers.jpg"
]

var sodaFiles = [
    "static/lib/img/brandedSoda.jpg",
    "static/lib/img/otherSoda.jpg"
]

var trial_count = 1;
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
  <p>short description of a social dillema. At first, some information will be hidden by a series of masking symbols (for example, <b>****</b>).</p>
  <p>After some time has passed, the masking symbols will disappear, and the information will be revealed. Once this information appears,</p>
  <p>you will be free to make a decision using the <b>F</b> and <b>J</b> keys.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']
}
timeline.push(instr1)

var instr2 = {
  type: 'html-keyboard-response',
  stimulus:`<p>You will now complete a practice round. In this scenario, you will be choosing whether or not to help a friend. We want you to say <b>Yes</b>.</p>
  <p>Remember, you will not be allowed to respond while the masking symbols remain on the screen.</p>
  <p>Try your best to respond as quickly as you can, in fewer than 4 seconds, but only after the masking symbols disappear.</p>
  <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin the practice round.<p>`,
  choices: ['space']
}
timeline.push(instr2)

var mask_err_slow = {
  type: 'html-keyboard-response',
  stimulus: `<p> Whoops, you went too slow! Let's try that again. </p> 
  <p>Try to respond as <b>quickly</b> as you can, in fewer than 4 seconds, once the masking symbols disappear.</p>
  <p>Remember, we want you to say <b>Yes</b> to your friend's request.</p>
  <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin the practice round.</p>
  `,
  choices: ['space']
}

var mask_err_acc = {
  type: 'html-keyboard-response',
  stimulus: `<p> Whoops! Let's try that again. </p> 
  <p>Remember, we want you to say <b>Yes</b> to your friend's request.</p>
  <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin the practice round.</p>
  `,
  choices: ['space']
}

var mask_err_fast = {
    type: 'html-keyboard-response',
    stimulus: `<p> Whoops, you went too fast! Let's try that again. </p> 
    <p>Make sure you read the information before making a response.</p>
    <p>Remember, we want you to say <b>Yes</b> to your friends request.</p>
    <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin the practice round.</p>
    `,
    choices: ['space']  
}

var mask_err_last_slow = {
  type: 'html-keyboard-response',
  stimulus: `<p>Your responses were too slow. For the actual task, please try to respond in <b>fewer than 4 seconds</b>.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']

}

var mask_err_last_fast = {
  type: 'html-keyboard-response',
  stimulus: `<p> Your responses was too fast. For the actual task, please try to read the information before making a response.</p>
  <p>Press the space bar to continue.</p>`,
  choices: ['space']
}

var mask_err_last_acc = {
  type: 'html-keyboard-response',
  stimulus: `<p> You failed to make the correct response. For the actual task, please try to be more careful when making a response.</p>
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
    if(data.rt >= 4000 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
}
timeline.push(conditional1_slow)

var conditional1_fast = {
  timeline: [mask_err_fast, fixation, testScenario_mask, testScenario_Choice2],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.rt <= 500 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
      return true;
    } else{
      return false;
    } 
  }
}
timeline.push(conditional1_fast)

var conditional1_acc = {
    timeline: [mask_err_acc, fixation, testScenario_mask, testScenario_Choice2],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')){
        return true;
      } else{
        return false;
      } 
    }
  }
timeline.push(conditional1_acc)

var conditional2_slow = {
    timeline: [mask_err_slow, fixation, testScenario_mask, testScenario_Choice3],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.rt >= 4000 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
  }
  timeline.push(conditional2_slow)
  
  var conditional2_fast = {
    timeline: [mask_err_fast, fixation, testScenario_mask, testScenario_Choice3],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.rt <= 500 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
  }
  timeline.push(conditional2_fast)
  
  var conditional2_acc = {
      timeline: [mask_err_acc, fixation, testScenario_mask, testScenario_Choice3],
      conditional_function: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')){
          return true;
        } else{
          return false;
        } 
      }
    }
  timeline.push(conditional2_acc)

var conditional3_slow = {
    timeline: [mask_err_last_slow],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.rt >= 4000 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
  }
  timeline.push(conditional3_slow)
  
  var conditional3_fast = {
    timeline: [mask_err_last_fast],
    conditional_function: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.rt <= 500 && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')){
        return true;
      } else{
        return false;
      } 
    }
  }
  timeline.push(conditional3_fast)
  
var conditional3_acc = {
    timeline: [mask_err_last_acc],
    conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')){
        return true;
    } else{
        return false;
    } 
    }
}
timeline.push(conditional3_acc)

var practiceEnd ={
  type: 'html-keyboard-response',
  stimulus:`<p>You have completed the practice round. You will now begin the main task. </p>
  <p>Try to keep you fingers on the <b>F</b> and <b>J</b> keys while you read the scenario.<p>
  <p>And please respond as <b>quickly</b> as you can once the masking symbols disappear, in fewer than 4 seconds.</p>
  <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin to task.</p>`,
  choices: ['space']
}
timeline.push(practiceEnd)


/** COVID-19 */
var cafeMask = {
  type: 'html-keyboard-response',
  stimulus: `<div>Imagine that you walking on the side-walk in a nearby city. As you walk, you pass an open cafe and look into the window. You notice two close friends seated at a table inside. </div>
              <p>You stop and see that <b>**********</b> are wearing a mask.</p>
              <div>Do you decide to join your friends?</div>
              <p><b>**********</b> or <b>**********</b></p>`,
  choices: jsPsych.NO_KEYS,
  trial_duration: mask_duration*51
  //trial_duration: 50
};

var cafeMaskBoth = {
    type: 'html-keyboard-response',
    stimulus: `<div>Imagine that you walking on the side-walk in a nearby city. As you walk, you pass an open cafe and look into the window. You notice two close friends seated at a table inside. </div>
                <p>You stop and see that <b>***both***</b> are wearing a mask.</p>
                <div>Do you decide to join your friends?</div>
                <p><b>**********</b> or <b>**********</b></p>`,
    choices: jsPsych.NO_KEYS,
    trial_duration: mask_duration*51
    //trial_duration: 50
  };

  var cafeMaskNeither = {
    type: 'html-keyboard-response',
    stimulus: `<div>Imagine that you walking on the side-walk in a nearby city. As you walk, you pass an open cafe and look into the window. You notice two close friends seated at a table inside. </div>
                <p>You stop and see that <b>**neither**</b> are wearing a mask.</p>
                <div>Do you decide to join your friends?</div>
                <p><b>**********</b> or <b>**********</b></p>`,
    choices: jsPsych.NO_KEYS,
    trial_duration: mask_duration*51
    //trial_duration: 50
  };

var cafeChoiceNeitherA = {
  type: 'html-keyboard-response',
  stimulus: `<div>Imagine that you walking on the side-walk in a nearby city. As you walk, you pass an open cafe and look into the window. You notice two close friends seated at a table inside. </div>
              <p>You stop and see that <b>**neither**</b> are wearing a mask.</p>
              <div>Do you decide to join your friends?</div>
              <p><b>Yes [ F ]</b> or <b>No [ J ]</b></p>`,
  choices: ["F", "J"],
  //data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    data.choice = +(jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press) == 'f') == 1;
    data.trialN = trial_count;
    trial_count++;
  }
};

var cafeChoiceNeitherB = {
  type: 'html-keyboard-response',
  stimulus: `<div>Imagine that you walking on the side-walk in a nearby city. As you walk, you pass an open cafe and look into the window. You notice two close friends seated at a table inside. </div>
              <p>You stop and see that <b>**neither**</b> are wearing a mask.</p>
              <div>Do you decide to join your friends?</div>
              <p><b>Yes [ F ]</b> or <b>No [ J ]</b></p>`,
  choices: ["F", "J"],
  //data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    data.choice = +(jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press) == 'f') == 1;
    data.trialN = trial_count;
    trial_count++;
  }
};

var cafeChoiceBothA = {
  type: 'html-keyboard-response',
  stimulus: `<div>Imagine that you walking on the side-walk in a nearby city. As you walk, you pass an open cafe and look into the window. You notice two close friends seated at a table inside. </div>
              <p>You stop and see that <b>***both***</b> are wearing a mask</p>
              <div>Do you decide to join your friends?</div>
              <p><b>Yes [ F ]</b> or <b>No [ J ]</b></p>`,
  choices: ["F", "J"],
  //data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    data.choice = +(jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press) == 'f') == 1;
    data.trialN = trial_count;
    trial_count++;
  }
};

var cafeChoiceBothB = {
  type: 'html-keyboard-response',
  stimulus: `<div>Imagine that you walking on the side-walk in a nearby city. As you walk, you pass an open cafe and look into the window. You notice two close friends seated at a table inside. </div>
              <p>You stop and see that <b>***both***</b> are wearing a mask</p>
              <div>Do you decide to join your friends?</div>
              <p><b>Yes [ F ]</b> or <b>No [ J ]</b></p>`,
  choices: ["F", "J"],
  //data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    data.choice = +(jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press) == 'f') == 1;
    data.trialN = trial_count;
    trial_count++;
  }
};
var cafeTrial = [];

if (cafe_condition_assignment == "NietherA"){
  cafeTrial = {
    timeline:[
      fixation,
      cafeMask,
      cafeChoiceNeitherA
    ]
  }
} else if (cafe_condition_assignment == "NietherB"){
  cafeTrial = {
    timeline:[
      fixation,
      cafeMaskNeither,
      cafeChoiceNeitherB
    ]
  }
} else if (cafe_condition_assignment == "BothA"){
  cafeTrial = {
    timeline:[
      fixation,
      cafeMask,
      cafeChoiceBothA
    ]
  }
} else if (cafe_condition_assignment == "BothB"){
  cafeTrial = {
    timeline:[
      fixation,
      cafeMaskBoth,
      cafeChoiceBothB
    ]
  }
}

/** Crane */
var craneMask = {
  type: 'html-keyboard-response',
  stimulus: `<div>You are trying to repair an electric fence. You notice that a live wire is still connected to the fence. Also working on the fence is</div>
  <p><b>******************</b>.</p>
  <div>They will be killed by the electric wire if nothing is done. Next to the fence is</div>
  <p><b>##################</b>.</p>
  <div>You can choose to <b>$$$$$$$$$$$$$$$$$$</b>.</div>
  <p>Would you sacrifice <b>##################</b></p>
  <p>By <b>$$$$$$$$$$$$$$$$$$</b> to block the electric wire <b>[ F ]</b></p>
  <div>or</div>
  <p>Let <b>******************</b> die</p>
  <div>By leaving them in the electric wire's path <b>[ J ]</b></div>`,
  choices: jsPsych.NO_KEYS,
  trial_duration: mask_duration*69,
  //trial_duration: 10,
};
var craneChoicePersonal = {
  type: 'html-keyboard-response',
  stimulus: `<div>You are trying to repair an electric fence. You notice that a live wire is still connected to the fence. Also working on the fence is</div>
  <p><b>A GROUP OF FIVE WORKERS</b>.</p>
  <div>They will be killed by the electric wire if nothing is done. Next to the fence is</div>
  <p><b>ONE WORKER</b>.</p>
  <div>You can choose to <b>push them onto the eletric wire</b>.</div>
  <p>Would you sacrifice <b>ONE WORKER</b></p>
  <p>By <b>pushing them</b> to block the electric wire <b>[ F ]</b></p>
  <div>or</div>
  <p>Let <b>FIVE WORKERS</b> die</p>
  <div>By leaving them in the electric wire's path <b>[ J ]</b></div>`,
  choices: ["F", "J"],
  on_finish: function(data){
    data.choice = +(jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press) == 'f') == 1;
    data.trialN = trial_count;
    data.trolleyCond = 'personal';
    trial_count++;
  }
};
var craneTrialPersonal = {
  timeline: [
    fixation,
    craneMask,
    craneChoicePersonal
  ]
};
var craneChoiceImpersonal = {
    type: 'html-keyboard-response',
    stimulus: `<div>You are trying to repair an electric fence. You notice that a live wire is still connected to the fence. Also working on the fence is</div>
    <p><b>A GROUP OF FIVE WORKERS</b>.</p>
    <div>They will be killed by the electric wire if nothing is done. Next to the fence is</div>
    <p><b>ONE WORKER</b>.</p>
    <div>You can choose to <b>flip a switch to push them onto the eletric wire</b>.</div>
    <p>Would you sacrifice <b>ONE WORKER</b></p>
    <p>By <b>flipping a switch to push them</b> to block the electric wire <b>[ F ]</b></p>
    <div>or</div>
    <p>Let <b>FIVE WORKERS</b> die</p>
    <div>By leaving them in the electric wire's path <b>[ J ]</b></div>`,
    choices: ["F", "J"],
    on_finish: function(data){
      data.choice = +(jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press) == 'f') == 1;
      data.trialN = trial_count;
      data.trolleyCond = 'impersonal';
      trial_count++;
    }
  };
var craneTrialImpersonal = {
    timeline: [
      fixation,
      craneMask,
      craneChoiceImpersonal
    ]
  };


/**Gain/loss Framing */
var lossFrameLarge_mask = {
  type: 'html-keyboard-response',
  stimulus: `<p>Imagine you manage a large company. Because of a serious financial crisis, your company is losing money. Without any action, the company you manage will cut 6,000 jobs. In order to save this money, two types of actions are possible.</p>
  <p>If you choose <b>Action A</b>, <b>******</b> jobs will be lost. If you choose <b>Action B</b>, there is a 33.3% chance that <b>******</b> jobs will be lost and a 66.6% chance that <b>******</b> jobs will be saved.</p>
  <p>Which action do you choose?</p>
  <p> <b>Action A [ F ]</b> or <b>Action B [ J ]</b></p>`,
  choices: jsPsych.NO_KEYS,
  trial_duration: mask_duration*83,
}
var lossFrameLarge_choice = {
  type: 'html-keyboard-response',
  stimulus: `<p>Imagine you manage a large company. Because of a serious financial crisis, your company is losing money. Without any action, the company you manage will cut 6,000 jobs. In order to save this money, two types of actions are possible.</p>
  <p>If you choose <b>Action A</b>, <b>4,000</b> jobs will be lost. If you choose <b>Action B</b>, there is a 33.3% chance that <b>0</b> jobs will be lost and a 66.6% chance that <b>6,000</b> jobs will be saved.</p>
  <p>Which action do you choose?</p>
  <p> <b>Action A [ F ]</b> or <b>Action B [ J ]</b></p>`,
  choices: ["F", "J"],
  on_finish: function(data){
    data.choice = +(jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press) == 'f') == 1;
    data.trialN = trial_count;
    trial_count++;
  }
}

var lossTrialLarge ={
  timeline: [
    fixation,
    lossFrameLarge_mask,
    lossFrameLarge_choice
  ]
}

var gainFrameLarge_mask = {
  type: 'html-keyboard-response',
  stimulus: `<p>Imagine you manage a large company. Because of a serious financial crisis, your company is losing money. Without any action, the company you manage will cut 6,000 jobs. In order to save this money, two types of actions are possible.</p>
  <p>If you choose <b>Action A</b>, <b>******</b> jobs will be saved. If you choose <b>Action B</b>, there is a 33.3% chance that <b>******</b> jobs will be saved and a 66.6% chance that <b>******</b> jobs will be saved.</p>
  <p>Which action do you choose?</p>
  <p> <b>Action A [ F ]</b> or <b>Action B [ J ]</b></p>`,
  choices: jsPsych.NO_KEYS,
  trial_duration: mask_duration*83,
}
var gainFrameLarge_choice = {
  type: 'html-keyboard-response',
  stimulus: `<p>Imagine you manage a large company. Because of a serious financial crisis, your company is losing money. Without any action, the company you manage will cut 6,000 jobs. In order to save this money, two types of actions are possible.</p>
  <p>If you choose <b>Action A</b>, <b>2,000</b> jobs will be saved. If you choose <b>Action B</b>, there is a 33.3% chance that <b>6,000</b> jobs will be saved and a 66.6% chance that <b>0</b> jobs will be saved.</p>
  <p>Which action do you choose?</p>
  <p> <b>Action A [ F ]</b> or <b>Action B [ J ]</b></p>`,
  choices: ["F", "J"],
  on_finish: function(data){
    data.choice = +(jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press) == 'f') == 1;
    data.trialN = trial_count;
    trial_count++;
  }
}

var gainTrialLarge ={
  timeline: [
    fixation,
    gainFrameLarge_mask,
    gainFrameLarge_choice
  ]
}

var lossFrameSmall_mask = {
  type: 'html-keyboard-response',
  stimulus: `<p>Imagine you manage a small company. Because of a serious financial crisis, your company is losing money. Without any action, the company you manage will cut 6 jobs. In order to save this money, two types of actions are possible.</p>
  <p>If you choose <b>Action A</b>, <b>******</b> jobs will be lost. If you choose <b>Action B</b>, there is a 33.3% chance that <b>******</b> jobs will be lost and a 66.6% chance that <b>******</b> jobs will be saved.</p>
  <p>Which action do you choose?</p>
  <p> <b>Action A [ F ]</b> or <b>Action B [ J ]</b></p>`,
  choices: jsPsych.NO_KEYS,
  trial_duration: mask_duration*83,
}
var lossFrameSmall_choice = {
  type: 'html-keyboard-response',
  stimulus: `<p>Imagine you manage a small company. Because of a serious financial crisis, your company is losing money. Without any action, the company you manage will cut 6 jobs. In order to save this money, two types of actions are possible.</p>
  <p>If you choose <b>Action A</b>, <b>4</b> jobs will be lost. If you choose <b>Action B</b>, there is a 33.3% chance that <b>0</b> jobs will be lost and a 66.6% chance that <b>6</b> jobs will be saved.</p>
  <p>Which action do you choose?</p>
  <p> <b>Action A [ F ]</b> or <b>Action B [ J ]</b></p>`,
  choices: ["F", "J"],
  on_finish: function(data){
    data.choice = +(jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press) == 'f') == 1;
    data.trialN = trial_count;
    trial_count++;
  }
}

var lossTrialSmall ={
  timeline: [
    fixation,
    lossFrameSmall_mask,
    lossFrameSmall_choice
  ]
}

var gainFrameSmall_mask = {
  type: 'html-keyboard-response',
  stimulus: `<p>Imagine you manage a small company. Because of a serious financial crisis, your company is losing money. Without any action, the company you manage will cut 6 jobs. In order to save this money, two types of actions are possible.</p>
  <p>If you choose <b>Action A</b>, <b>******</b> jobs will be saved. If you choose <b>Action B</b>, there is a 33.3% chance that <b>******</b> jobs will be saved and a 66.6% chance that <b>******</b> jobs will be saved.</p>
  <p>Which action do you choose?</p>
  <p> <b>Action A [ F ]</b> or <b>Action B [ J ]</b></p>`,
  choices: jsPsych.NO_KEYS,
  trial_duration: mask_duration*83,
}
var gainFrameSmall_choice = {
  type: 'html-keyboard-response',
  stimulus: `<p>Imagine you manage a small company. Because of a serious financial crisis, your company is losing money. Without any action, the company you manage will cut 6 jobs. In order to save this money, two types of actions are possible.</p>
  <p>If you choose <b>Action A</b>, <b>2</b> jobs will be saved. If you choose <b>Action B</b>, there is a 33.3% chance that <b>6</b> jobs will be saved and a 66.6% chance that <b>0</b> jobs will be saved.</p>
  <p>Which action do you choose?</p>
  <p> <b>Action A [ F ]</b> or <b>Action B [ J ]</b></p>`,
  choices: ["F", "J"],
  on_finish: function(data){
    data.choice = +(jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press) == 'f') == 1;
    data.trialN = trial_count;
    trial_count++;
  }
}

var gainTrialSmall ={
  timeline: [
    fixation,
    gainFrameSmall_mask,
    gainFrameSmall_choice
  ]
}

if(frame_condition_assignment==='GainL'){
  framingTrial = gainTrialLarge;
} else if(frame_condition_assignment==='GainS') {
  framingTrial = gainTrialSmall;
} else if(frame_condition_assignment==='LossL') {
  framingTrial = lossTrialLarge;
} else if(frame_condition_assignment==='LossS') {
  framingTrial = lossTrialSmall;
} 

/** Trials END */
trialOptions = [craneTrialImpersonal,craneTrialPersonal,cafeTrial, framingTrial]
trialOrder = jsPsych.randomization.sampleWithoutReplacement(trialOptions, trialOptions.length);

timeline.push(trialOrder[0])
timeline.push(trialOrder[1])
timeline.push(trialOrder[2])
timeline.push(trialOrder[3])


/** Food Task*/

var instrFood1 = {
    type: 'html-keyboard-response',
    stimulus:`<p>In this task, you will be making choices between consumer goods. Before each decision, you will be given some information about the options</p>
    <p>To select the option on the left, use <b>F</b> key. And to select the option on the right, use the <b>J</b> key.</p>
    <p>Press the space bar to continue.</p>`,
    choices: ['space']
  }
  timeline.push(instrFood1)
  
  var preRecommendL = {
    type: 'html-keyboard-response',
    stimulus:`<p>In the next round, our team recommends the item on the <b>left</b>.</p>
    <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin.</p>`,
    choices: ['space'],
    on_finish: function(data){
      data.condRec = "left"
  }
  }
  var preRecommendR = {
      type: 'html-keyboard-response',
      stimulus:`<p>In the next round, our team recommends the item on the <b>right</b>.</p>
      <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin.</p>`,
      choices: ['space'],
      on_finish: function(data){
          data.condRec = "right"
      }
    }
  
  var recSide = jsPsych.randomization.sampleWithoutReplacement(['right','left'],1);
  
  if(recSide=='right'){
      preRecommend = preRecommendR;
  } else{
      preRecommend = preRecommendL;
  }
  
  var choiceRecommend = {
      type: 'binary-choice-shifted',
      stimulus: () => jsPsych.randomization.sampleWithoutReplacement(candyFiles, 2) ,
      choices: ["F", "J"],
      on_finish: function(data){
          data.trialN = trial_count;
          data.cond = recSide;
          trial_count++;
      }
  }
  var recommendBlock = {
      timeline: [fixation,preRecommend, choiceRecommend]
  }
  
  //Brand Trial
  var preBrandR = {
    type: 'html-keyboard-response',
    stimulus:`<p>In the next round, the option on the <b>right</b> a name-brand good, and the option on the <b>left</b> is a generic brand.</p>
    <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin.</p>`,
    choices: ['space'],
  };

  var preBrandL = {
    type: 'html-keyboard-response',
    stimulus:`<p>In the next round, the option on the <b>left</b> a name-brand good, and the option on the <b>right</b> is a generic brand.</p>
    <p>When you are ready, rest your fingers on the <b>F</b> and <b>J</b> keys, and press the spacebar to begin.</p>`,
    choices: ['space'],
  };

var choiceBrandL = {
    type: 'binary-choice-shifted',
    stimulus: [sodaFiles[0],sodaFiles[1]],
    choices: ["F", "J"],
    on_finish: function(data){
        data.trialN = trial_count;
        data.cond = 'left'
        trial_count++;
    }
}

var choiceBrandR = {
    type: 'binary-choice-shifted',
    stimulus: [sodaFiles[1],sodaFiles[0]],
    choices: ["F", "J"],
    on_finish: function(data){
        data.trialN = trial_count;
        data.cond = 'right'
        trial_count++;
    }
}

  var brandSide = jsPsych.randomization.sampleWithoutReplacement(['right','left'],1);
  
  if(brandSide=='right'){
    var brandBlock = {
        timeline: [fixation,preBrandR, choiceBrandR]
    }
  } else{
    var brandBlock = {
        timeline: [fixation,preBrandL, choiceBrandL]
    }
  }
    
  trialOptionsFood = [recommendBlock, brandBlock]
  trialOrderFood = jsPsych.randomization.sampleWithoutReplacement(trialOptionsFood, trialOptionsFood.length);
  timeline.push(trialOrderFood[0])
  timeline.push(trialOrderFood[1])

var end = {
  type: "html-keyboard-response",
  stimulus: `<p>You have completed the task. Press any key to exit.</p>`
};
timeline.push(end)


function startExperiment() {
 /** jsPsych.init({
    timeline: [
      fullscreen,
      instr,
      trialOrder[0],
      trialOrder[1],
      end
    ],*/ 
    jsPsych.init({
    timeline: timeline,
    on_finish: () => jsPsych.data.displayData('csv'),
  });
}

