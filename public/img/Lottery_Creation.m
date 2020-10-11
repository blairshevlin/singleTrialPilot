try
%%%%%%%%%%        Possible Lotteries       %%%%%%%%%%

%% Low Values
%%% 10% $2.00, 90% $1.60 vs. 10% $3.85, 90% $0.10 %%%
%%% 20% $2.00, 80% $1.60 vs. 20% $3.85, 80% $0.10 %%%
%%%                     ...                       %%%
%%% 100% $2.00, 0% $1.60 vs. 100% $3.85, 0% $0.10 %%%
%% High Values 
%%% 10% $40.00, 90% $32.00 vs. 10% $77.00, 90% $2.00 %%%
%%% 20% $40.00, 80% $32.00 vs. 20% $77.00, 80% $2.00 %%%
%%%                     ...                       %%%
%%% 100% $40.00, 0% $32.00 vs. 100% $77.00, 0% $2.00 %%%

%% Operating System Check%%
    KbName('UnifyKeyNames');
    if IsOSX==1
        TopPriority=0;
        sysTxtOff=0; % no text adjustments needed
        ptbPipeMode=kPsychNeedFastBackingStore; % enable imaging pipeline for mac
    elseif IsWin==1
        TopPriority=1;
        sysTxtOff=1; % windows draws text from the upper left corner instead of lower left. To correct
        % an adjustment factor of 1*letterheight is subtracted from the y coordinate of
        % the starting point
        ptbPipeMode=[]; % don't need to enable imaging pipeline
    else
        ListenChar(0); clear screen; error('Operating system not OS X or Windows.');
    end %if ismac
    
    if IsWin==1
        skipSync = 0;
    else
        skipSync = 0; %if necessary to skip sync
    end %if ispc
    
    %%% Keys %%%
    Nkey=KbName('space');
    RAkey=KbName('space');
    Lkey=KbName('leftarrow');
    Rkey=KbName('rightarrow');
    Upkey=KbName('uparrow');
    Downkey=KbName('downarrow');
    escKey=KbName('w');
    expKey=KbName('e');
    sixkey=KbName('q');
    leftButton=[KbName('1!') KbName('1') KbName(',<') KbName('leftarrow')];
    rightButton=[KbName('2@') KbName('2') KbName('.>') KbName('rightarrow')];
    if IsOSX==1
        enterButton=[KbName('enter') KbName('return')];
    else
        enterButton=KbName('return');
    end %if ismac
    
    %%% Font %%%
    mainFont = 'Arial';
    scaleSize = 55;
    ticLength = 12;
    ticWidth = 6;
    crossSize = 50; %size of fixation cross
    
    %%% Colors %%%
    whitecolor = [255 255 255]; %white
    redcol = [157 0 0]; %[206 0 0];
    marooncol = [60 0 0];
    greencol = [0 120 0]; %[0 90 0]; %[0 119 0];
    bluecol = [0 0 255];
    yellowcol = [165 165 0]; %[157 47 0]; %[200 69 0];
    purpcol = [135 0 130]; %[238 0 100]; %[238 0 238];
    slatecol = [50 50 169];
    aquacol = [0 204 255];
    cyancol = [0 142 142];
    orangecol = [157 90 0]; %more of a gold%[220 150 0];
    lavendercol = [102 22 255]; %[238 121 159];
    pericol = [113 113 198];
    greycol = 150;
ListenChar(2); %suppress keyboard output
screenCap = 1;
doLottery = 1;
doSure = 1;

%% Open Screen
Screen('Preference', 'SkipSyncTests', 1);
    %%% Screen Dimensions %%%
    screens = Screen('Screens'); %count the screen
    
    maxScreens = max(screens);
    [onScreen, screenRect] = Screen('OpenWindow', maxScreens); % Open the second window
    
    %[ScreenX, ScreenY] = WindowSize(onScreen);
    ScreenX = screenRect(3);
    ScreenY = screenRect(4);
    cx=(ScreenX/2); %Middle of screen on X-axis
    cy=(ScreenY/2); %Middle of screen on Y-axis
    quadX = ScreenX/4; % the middle of the left half of the screen
    
    ScreenRect = [0 0 ScreenX ScreenY]; %Rectangle = size of whole display
    
    %%% Screen Visuals %%%
    fixX=cx;
    fixY=cy;
    bcolor = 0;
    greyCol = 150;
    fixCol = 255;
    fizSize = 25;
    fixThresh = 75; % can look 50 pixels away from fixation before it gets mad
    
        
    
    %Rectangles and Frame
    exampleLeft = [0+(ScreenX/16); cy-0*(ScreenY/16);cx-(ScreenX/16);cy+(5*(ScreenY/16))];
    wouldnoteatbox = [cx-150 round(ScreenY*0.85) cx+150 round(ScreenY*0.95)];

    
    
    Screen('FillRect', onScreen, [0 0 0]); % Make the screen black
    HideCursor;
    Screen('BlendFunction', onScreen, GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    
    Screen('Flip', onScreen);
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% TASKS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   
    line1 = 'Press spacebar';
    
    % Draw all the text in one go
    Screen('TextSize',onScreen,scaleSize);
    DrawFormattedText(onScreen, line1,'center', ScreenY * 0.25, whitecolor, [], [], [], 1.5);
    
    Screen('Flip', onScreen);
    
    %Wait for button press
    while KbCheck
    end
    
    FlushEvents('keyDown');
    proceed = 0;
    while proceed == 0
        [keyIsDown, secs, keyCode] = KbCheck(-1);
        if keyIsDown
            if keyCode(escKey)
                ListenChar(0); clear screen; error('User terminated script with ESCAPE key.')
            elseif keyCode(RAkey)
                proceed = 1;
            end
        end
    end %while proceed
    
    WaitSecs(.1);
    
    while KbCheck % prevent keypress carryover from previous trials
    end
    
%% Actual Pie Creation
if doLottery == 1
leftPie = [(1/8)*ScreenX, (1/4)*ScreenY, (3/8)*ScreenX,(3/4)*ScreenY];
rightPie = [(5/8)*ScreenX, (1/4)*ScreenY, (7/8)*ScreenX,(3/4)*ScreenY];
centerPie = [cx - (1/5)*ScreenX, cy - (1/5)*ScreenX, cx + (1/5)*ScreenX, cy + (1/5)*ScreenX];
rad = (1/5)*ScreenX;
for j = 1:2
for k = 1:2
    if k == 1
        amounts = [2,1.6];
        type = 'A';
    else
        amounts = [3.85,.1];
        type = 'B';
    end
    if j == 2
        amounts = 20*amounts;
        cond = 'High';
    else
        cond = 'Low';
    end
    amount1 = sprintf('%.2f',amounts(1));
    amount2 = sprintf('%.2f',amounts(2));
for i = 1:10
  % Clear screen to black background:
    Screen('FillRect', onScreen, [0 0 0]);
    Screen('Flip', onScreen); 
  % Draw Pie Chart
    arcsize1 = 360*(.1*i);
    arcsize2 = 360-arcsize1;
    Screen('FillArc',onScreen, cyancol, centerPie, 0, arcsize1);
    Screen('FillArc',onScreen,redcol, centerPie, arcsize1, arcsize2);
    if i == 1 || i == 9
        disY1 = (1/2)*sind((arcsize1/2)-100)*rad;
        disX1 = (1/2)*cosd((arcsize1/2)-100)*rad;
        disY2 = (1/2)*rad*sind((arcsize2/2)-100+arcsize1);
        disX2 = (1/2)*rad*cosd((arcsize2/2)-100+arcsize1);
    else
        disY1 = (1/2)*sind((arcsize1/2)-90)*rad;
        disX1 = (1/2)*cosd((arcsize1/2)-90)*rad;
        disY2 = (3/4)*rad*sind((arcsize2/2)-90+arcsize1);
        disX2 = (3/4)*rad*cosd((arcsize2/2)-90+arcsize1);
    end
    if i ~= 10
        DrawFormattedText(onScreen, amount1, cx + disX1, cy+disY1, whitecolor, [], [], [], 1.5); 
        DrawFormattedText(onScreen, amount2, cx + disX2, cy + disY2, whitecolor, [], [], [], 1.5);
    else
        DrawFormattedText(onScreen, amount1, cx-25, cy, whitecolor, [], [], [], 1.5); 

    end
%   % Draw First Pie Chart
%     arcsize1 = 360*(.1*i);
%     arcsize2 = 360-arcsize1;
%     Screen('FillArc',onScreen, cyancol, leftPie, 0, arcsize1);
%     Screen('FillArc',onScreen,redcol, leftPie, arcsize1, arcsize2);
%   % Draw Second Pie Chart
%     arcsize1 = 360*(.1*i);
%     arcsize2 = 360-arcsize1;
%     Screen('FillArc',onScreen, cyancol, rightPie, 0, arcsize1);
%     Screen('FillArc',onScreen,redcol, rightPie, arcsize1, arcsize2);
  % Show it
    Screen('Flip', onScreen);
  % Take a pretty picture
    if screenCap == 1
                capSizeX=ScreenX; capSizeY=ScreenY;
                image=Screen('GetImage', onScreen, [cx-capSizeX/4 cy-(5/12)*capSizeY cx+capSizeX/4 cy+(5/12)*capSizeY]);
                imagenum = num2str(10*i);
                imagenumber = [imagenum 'percent'];
                imgname=[cond type imagenumber '.jpg'];
                imwrite(image, imgname, 'jpg'); 
    end
  %Wait for button press
    while KbCheck
    end
    
    FlushEvents('keyDown');
    proceed = 0;
    while proceed == 0
        [keyIsDown, secs, keyCode] = KbCheck(-1);
        if keyIsDown
            if keyCode(escKey)
                ListenChar(0); clear screen; error('User terminated script with ESCAPE key.')
            elseif keyCode(RAkey)
                proceed = 1;
            end
        end
    end %while proceed
    
    WaitSecs(.1);
    
    while KbCheck % prevent keypress carryover from previous trials
    end
end
end
end
end %if doLottery
%% Sure Thing Pie Charts %%
%%% For expected value given alpha = 0.85 %%%
centerPie = [cx - (1/5)*ScreenX, cy - (1/5)*ScreenX, cx + (1/5)*ScreenX, cy + (1/5)*ScreenX]; 
if doSure == 1
    for i = 1:4
    %Create Values
        if i < 3
            gam1 = 1.6;
            cond1 = '1.60';
        else
            gam1 = 2;
            cond1 = '2.00';
        end
        if i == 2 || i == 4
            gam1 = gam1*20;
            cond2 = 'high';
        else
            cond2 = 'low';
        end
        gam2 = 0;
        sureThing = (gam1^(.85))/2;
        gam1 = sprintf('%.2f',gam1);
        gam2 = sprintf('%.2f',gam2);
        sureThing = sprintf('%.2f',sureThing);
    % Clear screen to black background:
        Screen('FillRect', onScreen, [0 0 0]);
        Screen('Flip', onScreen); 
    % Draw Pie Chart for Sure Thing
        cond3 = 'Sure';
        Screen('FillArc',onScreen, purpcol, centerPie, 0, 360);
        DrawFormattedText(onScreen, [sureThing], cx-70, cy, whitecolor, [], [], [], 1.5); 
        % Show it 
    Screen('Flip', onScreen);
  % Take a pretty picture
    if screenCap == 1
                capSizeX=ScreenX; capSizeY=ScreenY;
                image=Screen('GetImage', onScreen, [cx-capSizeX/4 cy-(5/12)*capSizeY cx+capSizeX/4 cy+(5/12)*capSizeY]);
                imgname=[cond1 cond2 cond3 '.jpg'];
                imwrite(image, imgname, 'jpg'); 
    end
          %Wait for button press
            while KbCheck
            end

            FlushEvents('keyDown');
            proceed = 0;
            while proceed == 0
                [keyIsDown, secs, keyCode] = KbCheck(-1);
                if keyIsDown
                    if keyCode(escKey)
                        ListenChar(0); clear screen; error('User terminated script with ESCAPE key.')
                    elseif keyCode(RAkey)
                        proceed = 1;
                    end
                end
            end %while proceed

            WaitSecs(.1);

            while KbCheck % prevent keypress carryover from previous trials
            end
    % Clear screen to black background:
        Screen('FillRect', onScreen, [0 0 0]);
        Screen('Flip', onScreen); 
    % Draw Pie Chart for Lottery
        cond3 = 'Gam';
        Screen('FillArc',onScreen, cyancol, centerPie, 0, 180);
        Screen('FillArc',onScreen, redcol, centerPie, 180, 180);
        DrawFormattedText(onScreen, [gam1], cx-275, cy, whitecolor, [], [], [], 1.5); 
        DrawFormattedText(onScreen, [gam2], cx+125, cy, whitecolor, [], [], [], 1.5); 
        % Show it
    Screen('Flip', onScreen);
  % Take a pretty picture
    if screenCap == 1
                capSizeX=ScreenX; capSizeY=ScreenY;
                image=Screen('GetImage', onScreen, [cx-capSizeX/4 cy-(5/12)*capSizeY cx+capSizeX/4 cy+(5/12)*capSizeY]);
                imgname=[cond1 cond2 cond3 '.jpg'];
                imwrite(image, imgname, 'jpg'); 
    end
  %Wait for button press
    while KbCheck
    end
    
    FlushEvents('keyDown');
    proceed = 0;
    while proceed == 0
        [keyIsDown, secs, keyCode] = KbCheck(-1);
        if keyIsDown
            if keyCode(escKey)
                ListenChar(0); clear screen; error('User terminated script with ESCAPE key.')
            elseif keyCode(RAkey)
                proceed = 1;
            end
        end
    end %while proceed
    
    WaitSecs(.1);
    
    while KbCheck % prevent keypress carryover from previous trials
    end
    end
end %if doSure
%% End
    ListenChar(0);
    sca
    fclose('all');
    ShowCursor;
    Screen('CloseAll')
catch err  %quit out if the code encounters an error
    disp('There is an ERROR!');
    
    
    ListenChar(0); %restore normal keyboard use
    
    sca
    fclose('all');
    ShowCursor;
    Screen('CloseAll')
    rethrow(err);
end