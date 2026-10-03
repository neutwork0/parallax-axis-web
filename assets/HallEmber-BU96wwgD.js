import{i as e,n as t,t as n}from"./jsx-runtime-CU3EbJiN.js";import{U as r}from"./index-67qDJ7vW.js";var i=e(t(),1),a=n(),o=`
attribute vec2 aPosition;
uniform float uUvTop;
varying vec2 vUv;
void main(){
  gl_Position=vec4(aPosition,0.0,1.0);
  float rawY=.5-aPosition.y*.5;
  vUv=vec2(aPosition.x*.5+.5,mix(uUvTop,1.0,rawY));
}`,s=`
precision mediump float;
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uCenter;
uniform float uTime;
uniform float uAuraTime;
uniform float uRippleTime;
uniform float uSeed;
uniform vec4 uAuraOrder;
uniform float uMode;
uniform float uSpread;
uniform float uRound;
uniform vec3 uPointerRippleA;
uniform vec3 uPointerRippleB;
uniform vec3 uPointerRippleC;
varying vec2 vUv;

float band(float distanceValue,float radius,float widthValue){
  float value=(distanceValue-radius)/max(widthValue,.0001);
  return exp(-value*value);
}

float hash21(vec2 value){
  value=fract(value*vec2(123.34,456.21));
  value+=dot(value,value+45.32);
  return fract(value.x*value.y);
}

vec4 pointerRipple(vec3 pulse,vec2 uv,float horizontalScale,float verticalScale,float spreadValue,float timeValue){
  float age=timeValue-pulse.z;
  float active=smoothstep(0.0,.14,age)*(1.0-smoothstep(2.8,4.2,age));
  vec2 delta=uv-pulse.xy;
  vec2 plane=vec2(delta.x*horizontalScale,delta.y*verticalScale)/max(spreadValue,.1);
  float distanceValue=length(plane);
  vec2 direction=plane/(distanceValue+.0001);
  float angle=atan(plane.y,plane.x);
  float radius=.02+age*.071;
  float uneven=.004*sin(angle*5.0+age*.3)+.0022*sin(angle*9.0-age*.2);
  float envelope=band(distanceValue,radius+uneven,.017+age*.003)*active;
  float wave=sin((distanceValue-radius-uneven)*190.0)*envelope;
  return vec4(direction.x/horizontalScale*wave*spreadValue,direction.y/verticalScale*wave*spreadValue,abs(wave),max(wave,0.0));
}

void main(){
  float aspect=uResolution.x/max(uResolution.y,1.0);
  vec2 offsetUv=vec2(0.0);
  float alpha=0.0;
  float crest=0.0;
  float trough=0.0;
  float auraGlow=0.0;
  vec3 auraTint=vec3(0.0);
  float auraPocket=0.0;
  float auraVoid=0.0;
  float whiteCore=0.0;
  float colourAccentStrength=0.0;
  vec3 colourAccent=vec3(0.0);
  float starDust=0.0;
  vec3 starTint=vec3(1.0);
  float auraReveal=1.0;

  if(uMode<.5){
    float auraTime=max(uAuraTime,0.0);
    float rippleTime=max(uRippleTime,0.0);
    /* 마지막 색층과 첫 물결 사이에서 밝기가 튀지 않도록 둘 다 긴 곡선으로 연다. */
    float rippleActive=smoothstep(0.0,.6,uRippleTime);
    float baseVeil=smoothstep(0.0,.58,auraTime)*.2;
    float ivoryBloom=1.0-pow(1.0-clamp((auraTime-uAuraOrder.x*.1)/.55,0.0,1.0),1.7);
    float mintBloom=1.0-pow(1.0-clamp((auraTime-uAuraOrder.y*.1)/.55,0.0,1.0),1.7);
    float peachBloom=1.0-pow(1.0-clamp((auraTime-uAuraOrder.z*.1)/.55,0.0,1.0),1.7);
    float lilacBloom=1.0-pow(1.0-clamp((auraTime-uAuraOrder.w*.1)/.55,0.0,1.0),1.7);
    float ivoryReveal=mix(baseVeil,1.0,ivoryBloom);
    float mintReveal=mix(baseVeil,1.0,mintBloom);
    float peachReveal=mix(baseVeil,1.0,peachBloom);
    float lilacReveal=mix(baseVeil,1.0,lilacBloom);
    auraReveal=max(max(ivoryReveal,mintReveal),max(peachReveal,lilacReveal));
    vec2 delta=vUv-uCenter;
    float verticalScale=mix(2.85,aspect,uRound);
    float horizontalScale=aspect*mix(1.0,1.16,uRound);
    vec2 plane=vec2(delta.x*horizontalScale,delta.y*verticalScale)/max(uSpread,.1);
    float distanceValue=length(plane);
    vec2 direction=plane/(distanceValue+.0001);
    float angle=atan(plane.y,plane.x);
    float cycleA=fract(rippleTime/7.6);
    float cycleB=fract(rippleTime/9.4+.46);
    float radiusA=.025+cycleA*.46;
    float radiusB=.018+cycleB*.38;
    float unevenA=.0045*sin(angle*5.0+rippleTime*.28)+.0025*sin(angle*9.0-rippleTime*.2);
    float unevenB=.0035*sin(angle*6.0-rippleTime*.24)+.002*sin(angle*11.0+rippleTime*.16);
    float envelopeA=band(distanceValue,radiusA+unevenA,.018+cycleA*.012)*sin(3.14159*cycleA)*rippleActive;
    float envelopeB=band(distanceValue,radiusB+unevenB,.015+cycleB*.01)*sin(3.14159*cycleB)*.62*rippleActive;
    float waveA=sin((distanceValue-radiusA-unevenA)*190.0)*envelopeA;
    float waveB=sin((distanceValue-radiusB-unevenB)*214.0+1.2)*envelopeB;
    float wave=waveA+waveB;
    float dentPulse=.88+.12*sin(rippleTime*.62);
    float dent=exp(-distanceValue*distanceValue/.064)*dentPulse*rippleActive;
    float dentRim=band(distanceValue,.25,.072)*dentPulse*rippleActive;
    float colourDrift=sin(auraTime*.17)*.018;
    float ivoryJitter=(hash21(vec2(uSeed,1.17))-.5)*.072;
    float mintJitter=(hash21(vec2(uSeed,2.31))-.5)*.07;
    float peachJitter=(hash21(vec2(uSeed,3.73))-.5)*.07;
    float lilacJitter=(hash21(vec2(uSeed,5.09))-.5)*.072;
    float ivoryY=(hash21(vec2(uSeed,7.13))-.5)*.045;
    float mintY=(hash21(vec2(uSeed,8.27))-.5)*.045;
    float peachY=(hash21(vec2(uSeed,9.41))-.5)*.045;
    float lilacY=(hash21(vec2(uSeed,10.83))-.5)*.045;
    vec2 ivoryDelta=plane-vec2(-.29+colourDrift+ivoryJitter,-.025+ivoryY);
    vec2 mintDelta=plane-vec2(-.105-colourDrift+mintJitter,.018+mintY);
    vec2 peachDelta=plane-vec2(.115+colourDrift+peachJitter,-.018+peachY);
    vec2 lilacDelta=plane-vec2(.31-colourDrift+lilacJitter,.026+lilacY);
    float ivoryField=exp(-dot(ivoryDelta,ivoryDelta)/.055)*ivoryReveal;
    float mintField=exp(-dot(mintDelta,mintDelta)/.064)*mintReveal;
    float peachField=exp(-dot(peachDelta,peachDelta)/.082)*peachReveal;
    float lilacField=exp(-dot(lilacDelta,lilacDelta)/.06)*lilacReveal;
    float colourWeight=ivoryField+mintField+peachField+lilacField+.001;
    auraTint=(ivoryField*vec3(1.0,.87,.66)+mintField*vec3(.28,1.0,.78)+
      peachField*vec3(1.0,.58,.47)+lilacField*vec3(.78,.4,1.0))/colourWeight;
    float softAura=min(.105,(ivoryField+mintField+peachField+lilacField)*.042);
    vec2 whiteDeltaA=plane-vec2(-.285+colourDrift,-.006);
    vec2 whiteDeltaB=plane-vec2(.075-colourDrift,.014);
    vec2 whiteDeltaC=plane-vec2(.34+colourDrift,-.01);
    float whiteA=exp(-dot(whiteDeltaA,whiteDeltaA)/.009);
    float whiteB=exp(-dot(whiteDeltaB,whiteDeltaB)/.014);
    float whiteC=exp(-dot(whiteDeltaC,whiteDeltaC)/.01);
    vec2 voidDeltaA=plane-vec2(-.175-colourDrift,.012);
    vec2 voidDeltaB=plane-vec2(.235+colourDrift,-.015);
    float voidA=exp(-dot(voidDeltaA,voidDeltaA)/.011);
    float voidB=exp(-dot(voidDeltaB,voidDeltaB)/.013);
    auraVoid=clamp(voidA*.82+voidB*.74,0.0,.9);
    auraPocket=clamp(max(max(mintField*.9,peachField),lilacField)-.25,0.0,1.0);
    float mintHot=exp(-dot(mintDelta,mintDelta)/.017)*mintReveal;
    float peachHot=exp(-dot(peachDelta,peachDelta)/.02)*peachReveal;
    float lilacHot=exp(-dot(lilacDelta,lilacDelta)/.017)*lilacReveal;
    float accentWeight=mintHot+peachHot+lilacHot+.001;
    colourAccent=(mintHot*vec3(.28,1.0,.78)+peachHot*vec3(1.0,.48,.38)+lilacHot*vec3(.72,.38,1.0))/accentWeight;
    colourAccentStrength=min(.29,(mintHot+peachHot+lilacHot)*.21)*(1.0-auraVoid*.84);
    whiteCore=min(.34,whiteA*.16*ivoryReveal+whiteB*.24*peachReveal+whiteC*.15*lilacReveal)*(.88+.12*sin(auraTime*.23));
    auraGlow=softAura*(1.0-auraVoid)*(.92+.08*sin(auraTime*.31));
    float upperLight=max(-direction.y,0.0);
    float lowerShade=max(direction.y,0.0);
    offsetUv=vec2(direction.x/horizontalScale,direction.y/verticalScale)*(wave*.003-dent*.0062);
    alpha=min(.68,max(max(abs(waveA)*.24+abs(waveB)*.18,dent*.14+dentRim*.25),auraGlow*.52));
    alpha=max(alpha,whiteCore*.62);
    alpha=max(alpha,colourAccentStrength*.52);
    crest=max(wave,0.0)*.13+dentRim*(.14+upperLight*.18);
    trough=max(-wave,0.0)*.075+dent*.16+dentRim*lowerShade*.1;
    float outerFade=1.0-smoothstep(.18,.46,distanceValue);
    float outerSoft=mix(.24,1.0,outerFade);
    alpha*=mix(.28,1.0,outerFade);
    crest*=outerSoft;
    trough*=mix(.4,1.0,outerFade);
    auraGlow*=mix(.2,1.0,outerFade);
    colourAccentStrength*=mix(.24,1.0,outerFade);
    whiteCore*=mix(.3,1.0,outerFade);
    offsetUv*=mix(.45,1.0,outerFade);
  }else if(uMode<1.5){
    float progress=clamp(uTime/1.24,0.0,1.0);
    vec2 delta=vUv-uCenter;
    vec2 plane=vec2(delta.x*aspect,delta.y*2.75);
    float distanceValue=length(plane);
    vec2 direction=plane/(distanceValue+.0001);
    float angle=atan(plane.y,plane.x);
    float contact=smoothstep(.17,.27,progress);
    float radius=mix(.008,.62,smoothstep(.2,.94,progress));
    float uneven=.008*sin(angle*5.0+progress*4.0)+.0045*sin(angle*11.0-progress*3.2);
    float widthValue=mix(.011,.021,progress);
    float envelope=band(distanceValue,radius+uneven,widthValue)*contact;
    float wave=sin((distanceValue-radius-uneven)*176.0-progress*5.0)*envelope;
    float dent=exp(-distanceValue*distanceValue/0.0032)*sin(min(1.0,progress/.44)*3.14159)*contact;
    float fade=1.0-smoothstep(.42,.98,progress);
    float ivoryField=exp(-dot(plane-vec2(-.25,-.012),plane-vec2(-.25,-.012))/.078);
    float mintField=exp(-dot(plane-vec2(-.08,.018),plane-vec2(-.08,.018))/.064);
    float peachField=exp(-dot(plane-vec2(.14,-.018),plane-vec2(.14,-.018))/.062);
    float lilacField=exp(-dot(plane-vec2(.32,.012),plane-vec2(.32,.012))/.076);
    float colourWeight=ivoryField+mintField+peachField+lilacField+.001;
    auraTint=(ivoryField*vec3(1.0,.87,.66)+mintField*vec3(.43,1.0,.87)+
      peachField*vec3(1.0,.61,.51)+lilacField*vec3(.76,.52,1.0))/colourWeight;
    float softAura=min(.075,(ivoryField+mintField+peachField+lilacField)*.022);
    float travellingAura=min(.235,envelope*.19+max(wave,0.0)*.055);
    vec2 whiteDeltaA=plane-vec2(-.25,-.008);
    vec2 whiteDeltaB=plane-vec2(.075,.014);
    vec2 whiteDeltaC=plane-vec2(.33,-.01);
    float whiteA=exp(-dot(whiteDeltaA,whiteDeltaA)/.01);
    float whiteB=exp(-dot(whiteDeltaB,whiteDeltaB)/.008);
    float whiteC=exp(-dot(whiteDeltaC,whiteDeltaC)/.011);
    vec2 voidDeltaA=plane-vec2(-.16,.012);
    vec2 voidDeltaB=plane-vec2(.225,-.015);
    float voidA=exp(-dot(voidDeltaA,voidDeltaA)/.012);
    float voidB=exp(-dot(voidDeltaB,voidDeltaB)/.014);
    auraVoid=clamp(voidA*.8+voidB*.72,0.0,.88);
    auraPocket=clamp(max(max(mintField*.9,peachField),lilacField)-.25,0.0,1.0);
    float mintHot=exp(-dot(plane-vec2(-.07,.024),plane-vec2(-.07,.024))/.019);
    float peachHot=exp(-dot(plane-vec2(.15,-.024),plane-vec2(.15,-.024))/.017);
    float lilacHot=exp(-dot(plane-vec2(.3,.018),plane-vec2(.3,.018))/.02);
    float accentWeight=mintHot+peachHot+lilacHot+.001;
    colourAccent=(mintHot*vec3(.28,1.0,.78)+peachHot*vec3(1.0,.48,.38)+lilacHot*vec3(.72,.38,1.0))/accentWeight;
    colourAccentStrength=min(.34,(mintHot+peachHot+lilacHot)*.26)*(1.0-auraVoid*.82)*contact*fade;
    whiteCore=min(.56,whiteA*.36+whiteB*.5+whiteC*.34)*contact*fade;
    auraGlow=(softAura+travellingAura)*(1.0-auraVoid)*contact*fade;
    offsetUv=vec2(direction.x/aspect,direction.y/2.75)*(wave*.012-dent*.008)*fade;
    alpha=min(.9,max((envelope*.78+dent*.5)*fade,auraGlow*.92));
    alpha=max(alpha,whiteCore*.66);
    alpha=max(alpha,colourAccentStrength*.56);
    crest=max(wave,0.0)*.27*fade+dent*.06;
    trough=max(-wave,0.0)*.17*fade+dent*.09;
  }else{
    vec2 centreLeft=uCenter+vec2(-.235,0.0);
    vec2 centreRight=uCenter+vec2(.235,.012);
    vec2 deltaLeft=vUv-centreLeft;
    vec2 deltaRight=vUv-centreRight;
    vec2 planeLeft=vec2(deltaLeft.x*aspect,deltaLeft.y*3.25);
    vec2 planeRight=vec2(deltaRight.x*aspect,deltaRight.y*3.25);
    float distanceLeft=length(planeLeft);
    float distanceRight=length(planeRight);
    vec2 directionLeft=planeLeft/(distanceLeft+.0001);
    vec2 directionRight=planeRight/(distanceRight+.0001);
    float cycleLeft=fract(uTime/9.2);
    float cycleRight=fract(uTime/10.8+.38);
    float radiusLeft=.025+cycleLeft*.34;
    float radiusRight=.02+cycleRight*.3;
    float envelopeLeft=band(distanceLeft,radiusLeft,.018+cycleLeft*.012)*sin(3.14159*cycleLeft);
    float envelopeRight=band(distanceRight,radiusRight,.016+cycleRight*.011)*sin(3.14159*cycleRight);
    float waveLeft=sin((distanceLeft-radiusLeft)*182.0)*envelopeLeft;
    float waveRight=sin((distanceRight-radiusRight)*205.0+.8)*envelopeRight;
    offsetUv=vec2(directionLeft.x/aspect,directionLeft.y/3.25)*waveLeft*.0017+
      vec2(directionRight.x/aspect,directionRight.y/3.25)*waveRight*.0015;
    alpha=min(.2,abs(waveLeft)*.12+abs(waveRight)*.1);
    crest=(max(waveLeft,0.0)+max(waveRight,0.0))*.055;
    trough=(max(-waveLeft,0.0)+max(-waveRight,0.0))*.035;
  }

  if(uMode<.5){
    float pointerVerticalScale=mix(2.85,aspect,uRound);
    float pointerHorizontalScale=aspect*mix(1.0,1.16,uRound);
    vec4 pointerA=pointerRipple(uPointerRippleA,vUv,pointerHorizontalScale,pointerVerticalScale,uSpread,uTime);
    vec4 pointerB=pointerRipple(uPointerRippleB,vUv,pointerHorizontalScale,pointerVerticalScale,uSpread,uTime);
    vec4 pointerC=pointerRipple(uPointerRippleC,vUv,pointerHorizontalScale,pointerVerticalScale,uSpread,uTime);
    vec2 pointerOffset=pointerA.xy+pointerB.xy+pointerC.xy;
    float pointerEnergy=min(1.0,pointerA.z+pointerB.z+pointerC.z);
    float pointerCrest=min(1.0,pointerA.w+pointerB.w+pointerC.w);
    offsetUv+=pointerOffset*.0035;
    alpha=max(alpha,pointerEnergy*.2);
    crest+=pointerCrest*.075;
    trough+=(pointerEnergy-pointerCrest)*.035;
    auraGlow+=pointerEnergy*.022;
  }

  if(uMode<1.5){
    float starVerticalScale=mix(2.55,aspect,uRound);
    float starHorizontalScale=aspect*mix(1.0,1.16,uRound);
    vec2 starPlane=vec2((vUv.x-uCenter.x)*starHorizontalScale,(vUv.y-uCenter.y)*starVerticalScale)/max(uSpread,.1);
    float galaxyLine=starPlane.y-.026*sin(starPlane.x*8.0+uTime*.045)-.011*sin(starPlane.x*17.0-uTime*.025);
    float galaxyBand=exp(-(galaxyLine*galaxyLine)/.0115)*exp(-(starPlane.x*starPlane.x)/.5);
    vec2 grainPosition=vec2(vUv.x*uResolution.x,vUv.y*uResolution.y)/8.5;
    vec2 grainCell=floor(grainPosition);
    vec2 grainLocal=fract(grainPosition)-.5;
    float grainSeed=hash21(grainCell);
    float grainShape=smoothstep(.17,.018,length(grainLocal));
    float grainPresence=step(.955,grainSeed);
    float faintGrainPresence=step(.825,grainSeed)*.22;
    float grainTwinkle=.62+.38*sin(uTime*(.42+hash21(grainCell+7.3)*.68)+grainSeed*6.28318);
    starDust=grainShape*(grainPresence+faintGrainPresence)*galaxyBand*(.12+.17*grainTwinkle)*auraReveal;
    starTint=mix(vec3(1.0,.9,.69),mix(vec3(.55,1.0,.9),vec3(.78,.62,1.0),hash21(grainCell+19.4)),.58);
  }

  vec2 sampleUv=clamp(vUv+offsetUv,vec2(.001),vec2(.999));
  vec4 colour=texture2D(uTexture,sampleUv);
  vec3 softenedAura=mix(vec3(.91,.95,.9),auraTint,.48+auraPocket*.42);
  colour.rgb=colour.rgb*(1.0-trough)+crest*mix(vec3(.92,1.0,.9),auraTint,.28)+
    softenedAura*auraGlow*1.16+colourAccent*colourAccentStrength*1.22+
    vec3(1.0,.985,.92)*whiteCore*1.38;
  float rippleAlpha=alpha*colour.a;
  float outputAlpha=rippleAlpha+starDust*(1.0-rippleAlpha);
  vec3 outputColour=colour.rgb*rippleAlpha*(1.0-starDust)+starTint*starDust;
  gl_FragColor=vec4(outputColour,outputAlpha);
}`;function c(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)}function l({src:e,center:t={x:50,y:50},mode:n=`idle`,spread:r=1,round:l=!1,auraDelay:u=0,rippleDelay:d=0,cropTop:f=0,className:p=``}){let m=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let i=m.current;if(!i||!e||window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches)return;i.dataset.rippleState=`loading`;let a=i.getContext(`webgl`,{alpha:!0,antialias:!1,premultipliedAlpha:!0});if(!a){i.dataset.rippleState=`unsupported`;return}let p=c(a,a.VERTEX_SHADER,o),h=c(a,a.FRAGMENT_SHADER,s);if(!p||!h){i.dataset.rippleState=`shader-error`;return}let g=a.createProgram();if(a.attachShader(g,p),a.attachShader(g,h),a.linkProgram(g),!a.getProgramParameter(g,a.LINK_STATUS)){i.dataset.rippleState=`link-error`;return}a.useProgram(g);let _=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,_),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),a.STATIC_DRAW);let v=a.getAttribLocation(g,`aPosition`);a.enableVertexAttribArray(v),a.vertexAttribPointer(v,2,a.FLOAT,!1,0,0);let y=a.createTexture();a.bindTexture(a.TEXTURE_2D,y),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,new Uint8Array([0,0,0,0]));let ee=a.getUniformLocation(g,`uResolution`),te=a.getUniformLocation(g,`uUvTop`),ne=a.getUniformLocation(g,`uCenter`),b=a.getUniformLocation(g,`uTime`),re=a.getUniformLocation(g,`uAuraTime`),x=a.getUniformLocation(g,`uRippleTime`),ie=a.getUniformLocation(g,`uSeed`),ae=a.getUniformLocation(g,`uAuraOrder`),S=a.getUniformLocation(g,`uMode`),oe=a.getUniformLocation(g,`uSpread`),C=a.getUniformLocation(g,`uRound`),se=[a.getUniformLocation(g,`uPointerRippleA`),a.getUniformLocation(g,`uPointerRippleB`),a.getUniformLocation(g,`uPointerRippleC`)];a.uniform1i(a.getUniformLocation(g,`uTexture`),0),a.uniform1f(te,Math.max(0,Math.min(.9,f))),a.uniform2f(ne,t.x/100,t.y/100),a.uniform1f(S,n===`impact`?1:n===`lobby`?2:0),a.uniform1f(oe,r),a.uniform1f(C,+!!l);let w=[0,1,2,3];for(let e=w.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[w[e],w[t]]=[w[t],w[e]]}let T=[,,,,];w.forEach((e,t)=>{T[e]=t}),a.uniform1f(ie,Math.random()*997+1),a.uniform4f(ae,T[0],T[1],T[2],T[3]),se.forEach(e=>a.uniform3f(e,.5,.5,-100)),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA);let ce=0,E=!1,D=!1,O=performance.now(),k=0,A=!1,j={x:-999,y:-999,time:-999},le=!document.hidden,ue=!0,de=0,M=n===`lobby`?1e3/30:0,N=null,P=e=>{n!==`idle`||!D||!le||!ue||(N={clientX:e.clientX,clientY:e.clientY,target:e.target})},fe=e=>{if(n!==`idle`||!D)return;let r=e.target instanceof Element?e.target.closest(`.px-hall-concept-stage-gate > button, .px-hall-concept-progress-field > span.is-next > button`):null;if(!(r&&r.closest(`.px-hall-concept-frame`)===i.closest(`.px-hall-concept-frame`))){A=!1;return}let o=performance.now()-O;if(o<d)return;let s=!A;A=!0;let c=Math.hypot(e.clientX-j.x,e.clientY-j.y);if(!s&&(o-j.time<780||c<16))return;let l=t.x/100,u=t.y/100;a.useProgram(g),a.uniform3f(se[k],l,u,o/1e3),k=(k+1)%se.length,j={x:e.clientX,y:e.clientY,time:o}},pe=()=>{let e=Math.min(window.devicePixelRatio||1,n===`lobby`?1:1.5),t=Math.max(1,Math.round(i.clientWidth*e)),r=Math.max(1,Math.round(i.clientHeight*e)),o=Math.max(1,Math.round(r/Math.max(.1,1-f)));(i.width!==t||i.height!==r)&&(i.width=t,i.height=r),a.viewport(0,0,t,r),a.uniform2f(ee,t,o)},F=()=>{le=!document.hidden,le&&(de=0)},I=typeof ResizeObserver<`u`?new ResizeObserver(pe):null,L=typeof IntersectionObserver<`u`?new IntersectionObserver(e=>{ue=e[0]?.isIntersecting??!0,ue&&(de=0)},{threshold:0}):null,R=e=>{if(E)return;let t=le&&ue&&(!M||e-de>=M);if(t&&(de=e,a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT)),t&&D){N&&(fe(N),N=null);let t=(e-O)/1e3;a.uniform1f(b,t),a.uniform1f(re,t-u/1e3),a.uniform1f(x,t-d/1e3),a.drawArrays(a.TRIANGLE_STRIP,0,4)}ce=requestAnimationFrame(R)},z=new Image;return z.decoding=`async`,z.onload=()=>{E||(a.bindTexture(a.TEXTURE_2D,y),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,z),D=!0,i.dataset.rippleState=`ready`)},z.src=e,pe(),I?.observe(i),L?.observe(i),document.addEventListener(`visibilitychange`,F),I||window.addEventListener(`resize`,pe,{passive:!0}),window.addEventListener(`pointermove`,P,{passive:!0}),ce=requestAnimationFrame(R),()=>{E=!0,cancelAnimationFrame(ce),I?.disconnect(),L?.disconnect(),document.removeEventListener(`visibilitychange`,F),I||window.removeEventListener(`resize`,pe),window.removeEventListener(`pointermove`,P),a.deleteTexture(y),a.deleteBuffer(_),a.deleteProgram(g),a.deleteShader(p),a.deleteShader(h),delete i.dataset.rippleState}},[e,t.x,t.y,n,l,r,u,d,f]),(0,a.jsx)(`canvas`,{ref:m,className:`px-ripple-shader ${p}`.trim(),"aria-hidden":`true`})}var u=.3;function d(e=Math.random){let t=[{x:1330,y:170,scale:.65,ids:[`D01`,`V06`,`V07`,`C01`]},{x:240,y:240,scale:.68,ids:[`C02`,`V01`,`V02`,`V03`,`T01`,`T02`]},{x:230,y:565,scale:.94,ids:[`V04`,`V05`,`T03`,`T04`,`T05`,`T06`,`T07`,`T08`,`B01`]},{x:1370,y:500,scale:.9,ids:[`T09`,`T10`,`T11`,`T12`,`T13`,`V08`,`V09`,`V10`]}],n=(e()<.5?[0,1,2,3]:[1,0,3,2]).map(n=>({...t[n],x:t[n].x+(e()-.5)*70,y:t[n].y+(e()-.5)*40})),r={...n[0],x:n[0].x+(n[0].x>800?100:-100),y:n[0].y-45},i=n.map((e,t)=>{let i=t?n[t-1]:r;return Math.hypot(e.x-i.x,e.y-i.y)}),a=i.reduce((e,t)=>e+t,0),o={},s=0;return{start:r,stops:n,legs:n.map((t,n)=>{let r=.28+3.88*i[n]/a,c=.22+e()*.1,l={start:s,moveTime:r,end:s+r+.4};return t.ids.forEach(e=>{o[e]=u+s+r+c}),s=l.end,l}),duration:s,delays:o}}var f=[{x:1400,y:85,scale:.62,ids:[`D01`]},{x:1450,y:218,scale:.72,ids:[`V06`,`V07`]},{x:1150,y:165,scale:.58,ids:[`C01`]},{x:305,y:145,scale:.58,ids:[`C02`]},{x:120,y:270,scale:.75,ids:[`V01`,`V02`,`V03`,`T01`,`T02`]},{x:225,y:405,scale:.86,ids:[`V04`,`T03`,`T04`,`T05`,`T06`]},{x:170,y:650,scale:1,ids:[`V05`,`T07`,`T08`]},{x:690,y:685,scale:.86,ids:[`B01`]},{x:1320,y:365,scale:.78,ids:[`T09`,`T10`,`T11`,`V08`]},{x:1420,y:560,scale:.94,ids:[`T12`,`T13`,`V09`,`V10`]}],p=120,m=.7,h=.06;function g(e){return e>5?Math.max(1.4,Math.ceil(e/p/m)*m):0}var _=0,v=f.map((e,t)=>{let n=t?f[t-1]:{x:1500,y:150};return Math.hypot(e.x-n.x,e.y-n.y)}).reduce((e,t)=>e+t,0);f.map((e,t)=>{let n=t?f[t-1]:{x:1500,y:150},r=5.1*Math.hypot(e.x-n.x,e.y-n.y)/v,i={start:_,moveTime:r,end:_+r+h+.04};return _=i.end,i});var y=e=>{let t=Math.max(0,Math.min(1,e));return t*t*(3-2*t)};function ee(e,{target:t={x:1280,y:710,scale:.96},lookHeading:n=-.7}={}){let r=Math.hypot(t.x-e.x,t.y-e.y),i=Math.max(1.5,Math.min(2.7,r/340));return{from:{x:e.x,y:e.y,scale:e.scale},target:t,lookHeading:n,moveTime:i,hops:Math.max(2,Math.min(4,Math.ceil(r/240))),danceAt:i+1.8,end:i+5.9}}function te(e,t,n=!1){if(n)return{p:e.from,moving:!1,hop:0,bouncePhase:0,heading:0,tilt:0,joy:1-y((t-.6)/.6),dance:0,danceAge:0,phase:`greeting`,done:t>=1.2};let r=Math.max(0,Math.min(1,t/e.moveTime)),i=Math.min(e.hops-1e-5,r*e.hops),a=i%1,o=Math.min(1,a/.84),s=r>=1?1:(Math.floor(i)+y(o))/e.hops,{from:c,target:l}=e,u=l.x-c.x,d=l.y-c.y,f=Math.max(1,Math.hypot(u,d)),p=Math.sin(Math.PI*s)*Math.min(42,f*.06),m={x:c.x+u*s+d/f*p,y:c.y+d*s-u/f*p,scale:c.scale+(l.scale-c.scale)*s},h=t-e.moveTime,g=Math.max(0,t-e.danceAt),_=y((h-1.15)/.65),v=y(g/.5)*(1-y((g-3.25)/.85));return{p:m,moving:r<1,hop:r<1?Math.sin(Math.PI*o)*30:0,bouncePhase:o,heading:r<1?Math.atan2(u,40):e.lookHeading*(1-_),tilt:r<1?-.12:.1*(1-_),joy:y((h-1.15)/.65)*(1-y((g-3.4)/.7)),dance:v,danceAge:g,phase:r<1?`approach`:h<1.15?`admire`:h<1.8?`turn`:g<3.25?`dance`:`settle`,done:t>=e.end}}function ne({entryPlan:e,enter:t=!0,departure:n=null,tourStops:o=null,idleActions:s=!1,idleActionInterval:c=16,idleActionJitter:l=9,idleActionDelay:u=0,celebration:d=null}){let p=(0,i.useRef)(n);p.current=n;let h=(0,i.useRef)(d);h.current=d;let _=e.delay??.3,v=e.duration,y=e.stops.length,ne=e.legs,b=(0,i.useRef)(null),re=(0,i.useRef)(null),x=(0,i.useRef)(null),ie=(0,i.useRef)(null),ae=(0,i.useRef)(null),S=(0,i.useRef)(()=>{});return(0,i.useEffect)(()=>{let n=b.current,i=matchMedia(`(prefers-reduced-motion: reduce)`),a=!1,d=()=>!a&&n?.isConnected&&b.current===n&&ie.current&&ae.current&&re.current&&x.current,oe=[e.start,...e.stops],C=null;if(e.path){let t=document.createElementNS(`http://www.w3.org/2000/svg`,`path`);t.setAttribute(`d`,e.path);let n=t.getTotalLength(),[r,i]=e.pathSize??[1600,900];C=Array.from({length:257},(e,a)=>{let o=t.getPointAtLength(n*a/256);return{x:o.x*1600/r,y:o.y*900/i}})}let se=(e,t)=>Math.abs(t.x-e.x)>450&&Math.abs(t.x-e.x)>Math.abs(t.y-e.y)*1.5?Math.min(4,Math.max(3,Math.ceil(Math.abs(t.x-e.x)/330))):1,w=(e,t,n,r=!1)=>{let i=t.x-e.x,a=t.y-e.y,o=Math.max(1,Math.hypot(i,a)),s=Math.abs(i)/o,c=r?12+88*s*s:55,l=r?se(e,t):1,u=Math.abs(Math.sin(Math.PI*n*l))*Math.min(c/Math.sqrt(l),o*.16);return{x:e.x+i*n+a/o*u,y:e.y+a*n-Math.abs(i)/o*u,scale:e.scale+(t.scale-e.scale)*n}},T=t=>{if(C){let n=Math.max(0,Math.min(1,t)),r=n*256,i=Math.min(255,Math.floor(r)),a=r-i;return{x:C[i].x+(C[i+1].x-C[i].x)*a,y:C[i].y+(C[i+1].y-C[i].y)*a,scale:e.start.scale+(e.stops.at(-1).scale-e.start.scale)*n}}let n=Math.max(0,Math.min(1,t))*y,r=Math.min(y-1,Math.floor(n)),i=n-r,a=oe[r],o=oe[r+1];return w(a,o,i,!0)},ce,E=null,D=0,O=0,k=0,A=0,j=0,le=0,ue=!1,de=e=>(T(e).scale-.7)*220;try{ce=r(n,{optimized:!0,pixelRatioCap:1.1,sortInterval:150,nacre:!0,whistleNotes:s})}catch(e){console.warn(`Hall companion unavailable`,e);return}let M=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e)),N=[],P=[],fe=-1/0,pe=!1,F=-1/0,I=0,L=`happy`,R=0,z=0,B=null,me=null,he=0,ge=n.closest(`.px-hall-concept-frame`),_e=()=>{ge&&delete ge.dataset.poemCelebration};S.current=()=>{if(!d())return;let e=performance.now();p.current||B||e-F<120||L===`angry`&&e-fe<2800||(I=e-F<1400?I+1:1,F=e,L=I>=4?`angry`:I>=2?`surprised`:`happy`,fe=e,pe=!0,G())};let V=o?[...o]:[9,8,1,0,3,4,5,6,5,4,3,0,1,8].map(e=>f[e]).filter(e=>e.ids.some(e=>n.parentElement.querySelector(`.px-meridian-environment__layer.is-${e.toLowerCase()}`))),H=T(1);V.length||V.push(H);let ve=0;function ye(e){let t=V.reduce((t,n,r)=>Math.hypot(n.x-e.x,n.y-e.y)<Math.hypot(V[t].x-e.x,V[t].y-e.y)?r:t,0),n=[...V.slice(t),...V.slice(0,t),V[t]];return ve=0,n.map((t,r)=>{let i=r===0?e:n[r-1],a=g(Math.hypot(t.x-i.x,t.y-i.y)),o={from:i,to:t,start:ve,movingTime:a,duration:a+7.5};return ve+=o.duration,o})}let be=ye(H),xe=Array.from(n.parentElement.querySelectorAll(`.px-meridian-environment__layer`)).map(e=>({node:e,original:e.style.filter,base:getComputedStyle(e).filter,brightness:1,asset:f.find(t=>t.ids.some(t=>e.classList.contains(`is-${t.toLowerCase()}`)))}));for(let e of xe)e.filters=Array.from({length:25},(t,n)=>n===0?e.original:`${e.base===`none`?``:e.base} brightness(${1+n*.03})`);function Se(e){let t=be[0].duration,n=e<t?e:t+(e-t)%(ve-t),r=be.find(e=>n<e.start+e.duration)||be.at(-1),{from:i,to:a,movingTime:o}=r,s=n-r.start,c=o?Math.min(1,s/o):1,l=M((s-o)/1.2)*(1-M((s-r.duration+1.2)/1.2)),u=w(i,a,c);return{x:u.x+Math.sin(e*.47)*20*l,y:u.y+Math.sin(e*.31+1)*12*l,scale:u.scale,target:a,moving:s<o,restFor:s-o,remaining:r.duration-s,phase:s%m/m}}let Ce=-1,we=0,Te=-1/0,U=null,Ee=v+_+5+Math.random()*5,De=-1/0,W=null,Oe=-1,ke=u,Ae=null,je=()=>{Ae?.(),Ae=null},Me=Array.from(re.current.children),Ne=Array.from(x.current.children);function Pe(r){if(E=null,!d()||document.hidden)return;if(D&&r-D<1e3/30){E=requestAnimationFrame(Pe);return}let a=D?Math.min(.1,(r-D)/1e3):0;D=r,z+=a;let o=Number.isFinite(fe)?(r-fe)/1e3:100,u=L===`angry`?2.8:1.6,f=Number(o<u)*(1-M((o-u*.55)/(u*.45)));R+=(f-R)*(1-Math.exp(-a/.085));let g=R>.005,b=L===`happy`?R:0,x=L===`surprised`?R:0,S=L===`angry`?R:0;!i.matches&&!(g&&(!t||O>_+v+1))&&(O+=a);let w=t&&!i.matches,F=Math.max(0,O-_),I=ne.findIndex(e=>F<e.end),V=I<0?y-1:I,H=ne[V],ve=w&&O>=_&&F<v,G=Math.min(1,Math.max(0,(F-H.start)/H.moveTime)),K=C?Math.max(1,Math.round(H.moveTime/.72)):se(oe[V],oe[V+1]),Fe=Math.min(K-1,Math.floor(G*K)),Ie=G*K-Fe,Le=Fe<K-1?C?.82:.88:1,Re=K>1&&Fe<K-1&&Ie>=Le,ze=Math.min(1,Ie/Le),Be=K>1?(Fe+(C?M(ze):ze))/K:G,Ve=w?(V+Be)/y:1,He=ve&&Be<1&&!Re,Ue=C?ze:Be*(K>1?K:Math.max(1,Math.round(H.moveTime/m)))%1,We=He?4*Ue*(1-Ue)*(C?48:26):0,Ge=F-H.start-H.moveTime,Ke=w&&Re?Math.exp(-(Ie-Le)*H.moveTime/K/.065):w&&ve&&Ge>=0?Math.exp(-Ge/.065):0,qe=O-_-v,Je=(w?Math.max(0,O-_-v-1):O)-he,q=!i.matches&&(!w||O>_+v+1)?Se(Je):null,J=q||T(Ve),Ye=h.current;Ye&&Ye.id!==me&&!B&&!p.current&&(i.matches||!w||O>_+v+1)&&(me=Ye.id,B={...ee(J,Ye),at:z,onFinish:Ye.onFinish,scattered:!1},W=null,je());let Y=null;if(B&&p.current&&(B=null,_e(),n.dataset.celebration=`cancelled`),B){if(Y=te(B,z-B.at,i.matches),J=Y.p,We=Y.hop,q=null,n.dataset.celebration=Y.phase,ge&&!B.poemLit&&(Y.phase===`admire`||Y.phase===`greeting`)&&(B.poemLit=!0,ge.dataset.poemCelebration=i.matches?`greeting`:`lit`),Y.danceAge>.55&&!B.scattered&&!i.matches){B.scattered=!0;for(let e=0;e<12;e++){let t=e*2.399;P.push({x:J.x,y:J.y-18,born:O,phase:t,vx:Math.cos(t)*42,vy:Math.sin(t)*24-34,life:1.35+e%3*.1,burst:!0})}}if(Y.done){let e=B.onFinish;B=null,be=ye(J),he=w?Math.max(0,O-_-v-1):O,ke=z+c,Ee=O+8,_e(),n.dataset.celebration=`complete`,e?.()}}if(p.current&&!U){let e=p.current,t=Math.max(3,Math.min(5,Math.ceil(Math.hypot(e.target.x-J.x,e.target.y-J.y)/220)));U={...e,from:{...J},at:O,done:!1,hops:t,hopTime:.46,moveTime:t*.46}}let Xe=1,Ze=1,Qe=0,X=-1,$e=0,et=0;if(U){let e=O-U.at,t=Math.min(U.hops,e/U.hopTime),n=Math.min(U.hops-1,Math.floor(t)),r=t-n;$e=Math.min(1,r/.82);let a=Math.min(1,(n+M($e))/U.hops);J={x:U.from.x+(U.target.x-U.from.x)*a,y:U.from.y+(U.target.y-U.from.y)*a,scale:U.from.scale+(.7-U.from.scale)*a},We=e<U.moveTime?Math.sin(Math.PI*$e)*46:0;let o=U.target.x-U.from.x,s=U.target.y-U.from.y,c=Math.max(1,Math.hypot(o,s)),l=Math.sin(Math.PI*a)*Math.min(32,c*.05);if(J.x+=s/c*l,J.y-=o/c*l,et=e<U.moveTime&&r>=.82?Math.exp(-(r-.82)*U.hopTime/.065):0,Qe=Math.sin(Math.PI*M((e-U.moveTime)/.55)),X=e-U.moveTime-.55,U.burstY=U.target.y-18,X>=0&&!U.ignited&&!i.matches){U.ignited=!0,re.current.style.zIndex=`21`;for(let e=0;e<14;e++){let t=e*2.399,n=85+e%4*22;P.push({x:U.target.x,y:U.burstY,born:O,phase:t,vx:Math.cos(t)*n,vy:Math.sin(t)*n*.65-32,life:1.05+e%3*.04,burst:!0})}}if(Xe=(1+Qe*.08)*(1-M((X+.04)/.24)),Ze=1-M((X-.08)/.14),X>=.14&&!U.done&&(U.done=!0,U.onArrive?.(),!d()))return}Ne.forEach((e,t)=>{if(!U||X<0||X>1||i.matches){e.setAttribute(`opacity`,`0`);return}let n=Math.min(1,X),r=1-(1-n)**2.5;if(t===0){e.setAttribute(`transform`,`translate(${U.target.x} ${U.burstY}) scale(${.3+r*2.6})`),e.setAttribute(`opacity`,String((1-n)**3*.95));return}let a=t*2.399+r*.3*Math.sin(t),o=(36+t%5*16)*r;e.setAttribute(`transform`,`translate(${U.target.x+Math.cos(a)*o} ${U.burstY+Math.sin(a)*o*.8}) rotate(${a*180/Math.PI+n*90}) scale(${(.65+t%3*.23)*(1-n*.65)})`),e.setAttribute(`opacity`,String((1-n)**1.4))});let tt=(J.scale-.7)*220;!U&&q?.moving&&(We=4*q.phase*(1-q.phase)*24);let nt=Math.max(.004,Math.min(.996,Ve)),rt=T(nt-.004),it=T(nt+.004),at=it.x-rt.x,ot=rt.y-it.y,st=de(nt+.004)-de(nt-.004),Z=Math.atan2(at,st),Q=-Math.atan2(ot,Math.max(.001,Math.hypot(at,st)))*.3;ue||(k=Z,A=Q,ue=!0);let ct=w?M(qe/.8):1;if(Z*=1-ct,Q*=1-ct,w&&ve&&!He&&(Z=Math.sin(O*1.15)*.28,Q=-.08+Math.sin(O*1.7)*.05),q){let e=Se(Je+.025),t=e.x-J.x,n=J.y-e.y,r=(e.scale-J.scale)*220;q.moving&&Math.hypot(t,n)>.01?(Z=Math.atan2(t,r),Q=-Math.atan2(n,Math.max(.01,Math.hypot(t,r)))*.3):(Z=Math.sin(Je*1.15)*.28,Q=-.08+Math.sin(Je*1.7)*.05)}if(U){let e=M((O-U.at-U.moveTime)/.25);Z=Math.atan2(U.target.x-U.from.x,40)*(1-e),Q=-.15*(1-e)}Y&&(Z=Y.heading,Q=Y.tilt);let lt=1-Math.exp(-a/.12);g&&(Z*=1-R,Q=Q*(1-R)-S*.1),k+=Math.atan2(Math.sin(Z-k),Math.cos(Z-k))*lt,A+=(Q-A)*lt,i.matches&&(k=0,A=0);let ut=U?O-U.at<U.moveTime&&$e<1:Y?Y.moving:q?q.moving:He;!W&&!U&&q&&!ut&&!i.matches&&!g&&O>=Ee&&(De=O,Ee=O+10+Math.random()*9);let dt=O-De,ft=!i.matches&&dt<.22?Math.sin(Math.PI*dt/.22):0,$=Math.max(!i.matches&&dt>=.22&&dt<3.6?M((dt-.22)/.2)*Math.exp(-Math.max(0,dt-1.5)*1.05)*(1-M((dt-2.8)/.8)):0,i.matches?0:S*.85),pt=s&&q&&!ut&&!U&&!g&&!i.matches&&$<.01;if(W&&!pt&&W.cancelAt==null&&(W.cancelAt=z,je()),pt&&!W&&z>=ke&&q.restFor>1.1&&q.remaining>4.4){let e=[0,1,2].filter(e=>e!==Oe),t=e[Math.floor(Math.random()*e.length)];W={kind:t,start:z,cancelAt:null},Oe=t,ke=z+c+Math.random()*l,Ee=Math.max(Ee,O+6),t===0&&(Ae=window.ParallaxAudio?.companionWhistle?.())}let mt=W?z-W.start:0,ht=W?M(mt/.45)*(1-M((mt-3.4)/.8))*(W.cancelAt==null?1:1-M((z-W.cancelAt)/.25)):0,gt=W?.kind;W&&(mt>=4.2||W.cancelAt!=null&&z-W.cancelAt>=.25)&&(W=null,je());let _t=U?$e:Y?Y.bouncePhase:q?q.phase:Ue,vt=ut?.38*Math.sin(Math.PI*_t):0;j+=(vt-j)*(1-Math.exp(-a/(vt<j?.11:.07))),le+=(j-le)*(1-Math.exp(-a/.14));let yt=Math.cos(k),bt=Math.sin(k),xt=Math.cos(A),St=Math.sin(A),Ct=[yt,0,-bt,bt*St,xt,yt*St,bt*xt,-St,yt*xt],wt=Y?.joy??0,Tt=i.matches?0:U?-We-Qe*9:-We+Math.sin(O*1.7)*3*ct-b*14-x*7+S*Math.sin(o*18)*1.5;if(n.style.left=`${J.x/16}%`,n.style.top=`${(J.y+Tt)/9}%`,n.style.opacity=U?String(Ze):w?String(M((O-_)/.3)):`.9`,n.style.filter=$>.01?`brightness(${1+$*.3})`:`none`,ae.current.style.left=n.style.left,ae.current.style.top=n.style.top,ae.current.style.visibility=!U&&!B&&Number(n.style.opacity)>.5?`visible`:`hidden`,pe){if(!i.matches)for(let e=0;e<7;e++)P.push({x:J.x+Math.cos(e*2.399)*9,y:J.y+Tt+Math.sin(e*2.399)*7,born:O,phase:we++*2.399,life:.7+e*.03});pe=!1}N.push({t:O,p:[J.x,J.y+Tt,tt]});let Et=B?.target||q?.target||e.stops[Math.min(V,y-1)],Dt=Math.hypot(J.x-Et.x,J.y+Tt-Et.y),Ot=i.matches?0:Math.max(0,1-Dt/115)*(.22+.025*Math.sin(O*2.3)+$*.15);if(ie.current.style.left=`${J.x/16}%`,ie.current.style.top=`${(J.y+Tt)/9}%`,ie.current.style.opacity=String(Ot),ie.current.style.transform=`translate(-50%,-50%) scale(${J.scale})`,r-Te>=100){Te=r;for(let e of xe){if(!e.asset)continue;let t=i.matches?0:Math.max(0,1-Math.hypot(J.x-e.asset.x,J.y+Tt-e.asset.y)/155),n=1+Math.round(t*24)*.03;n!==e.brightness&&(e.brightness=n,e.node.style.filter=e.filters[Math.round(t*24)])}}for(;N.length>2&&N[1].t<O-.5;)N.shift();let kt=1+.15*M((J.scale-.7)/.25),At=Array.from({length:5},(e,t)=>{let n=O-t*.055,r=N[0].p;for(let e=1;e<N.length;e++){let t=N[e-1],i=N[e];if(i.t>=n){let e=Math.max(0,Math.min(1,(n-t.t)/Math.max(.001,i.t-t.t)));r=t.p.map((t,n)=>t+(i.p[n]-t)*e);break}r=i.p}let i=1.014*J.scale*kt,a=[(r[0]-J.x)/i,(J.y+Tt-r[1])/i,(r[2]-tt)/i],o=Math.hypot(...a);if(o>110)for(let e=0;e<3;e++)a[e]*=110/o;return[0,1,2].map(e=>Ct[e*3]*a[0]+Ct[e*3+1]*a[1]+Ct[e*3+2]*a[2])}),jt=$>.15?.045:Y?.12:q?q.moving?.1:.32:.065;for(!i.matches&&(!U||X<0)&&(Y||q||w&&O>_)&&(Y||q||Ve<.998)&&O-Ce>jt&&(P.push({x:J.x,y:J.y+Tt,born:O,phase:we++*2.399,life:.65+we%4*.09}),Ce=O);P.length&&(O-P[0].born>P[0].life||P.length>16);)P.shift();Me.forEach((e,t)=>{let n=P[t],r=n?O-n.born:0;if(!n||i.matches||r>n.life){e.setAttribute(`opacity`,`0`);return}let a=r/n.life,o=n.burst?(1-Math.exp(-r*2))/2:r;e.setAttribute(`transform`,`translate(${n.x+(n.vx??Math.sin(n.phase)*12)*o} ${n.y+(n.vy??-15)*o-r*r*8}) scale(${(1-a*.7)*(1.3+Math.sin(n.phase)*.2)})`),e.setAttribute(`opacity`,String(Math.sin(Math.min(1,r/.07)*Math.PI/2)*(n.burst?1-M((a-.35)/.65):(1-a)**1.4*.85)))});let Mt=i.matches?1:O%5.3>5.13?.2:1;ce.draw(0,0,!0,i.matches?1.8:z,{reaction:[Math.max(b,wt*.7),x,S],...s?{whistle:gt===0?ht:0,noteAge:gt===0?mt:-1,dance:Y?[Y.dance,Y.danceAge*Math.PI,1]:[gt>0?ht:0,mt*Math.PI,+(gt===2)]}:{},screenAnchor:[0,0],scale:.563333/1.15*J.scale*kt*Math.max(.01,Xe),matrix:Ct,trail:At,stretch:j,tipStretch:le,sortInterval:!ut&&!g&&$<.01&&j<.02?300:150,bodyScale:[1+Ke*.025+ft*.04+$*.12+et*.05+S*.1,1-Ke*.04-ft*.08+$*.38-et*.08-x*.06,1+Ke*.025+$*.12+et*.05+S*.1],expression:[1+ct*.08+b*.15+wt*.15+$*.08+Qe*.16+x*.2-S*.12,Mt*(1-ct*.25-Ke*.3-b*.35-wt*.4-$*.15-Qe*.4+x*.5-S*.3),ct*.65+Ke*.5+b+wt+$*.5+Qe-S*1.7-x*.5],tailLife:i.matches?0:.18+j*.45+$*.75}),d()&&(!i.matches||B||o<u||g)&&(E=requestAnimationFrame(Pe))}let G=()=>{D=0,cancelAnimationFrame(E),E=null,(document.hidden||i.matches)&&(je(),W=null),d()&&!document.hidden&&(E=requestAnimationFrame(Pe))};document.addEventListener(`visibilitychange`,G),i.addEventListener(`change`,G);let K=new ResizeObserver(G);return K.observe(n),G(),()=>{a=!0,_e(),je(),S.current=()=>{},cancelAnimationFrame(E),E=null,K.disconnect(),document.removeEventListener(`visibilitychange`,G),i.removeEventListener(`change`,G);for(let e of xe)e.node.style.filter=e.original;ce.dispose()}},[e,t,v,_,o,s,c,l,u]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`div`,{ref:ie,"aria-hidden":`true`,style:{position:`absolute`,width:`18%`,height:`25%`,pointerEvents:`none`,zIndex:16,opacity:0,mixBlendMode:`screen`,background:`radial-gradient(ellipse,rgba(255,216,154,.85),rgba(245,184,112,.32) 38%,transparent 72%)`,transition:`opacity .15s`}}),(0,a.jsx)(`svg`,{ref:re,viewBox:`0 0 1600 900`,"aria-hidden":`true`,style:{position:`absolute`,inset:0,width:`100%`,height:`100%`,pointerEvents:`none`,zIndex:17},children:Array.from({length:16},(e,t)=>(0,a.jsxs)(`g`,{opacity:`0`,children:[(0,a.jsx)(`ellipse`,{rx:`3`,ry:`4`,fill:`#84bdea`,opacity:`.2`}),(0,a.jsx)(`ellipse`,{rx:`.9`,ry:`1.6`,fill:`#dbfff1`})]},t))}),(0,a.jsxs)(`svg`,{ref:x,viewBox:`0 0 1600 900`,"aria-hidden":`true`,style:{position:`absolute`,inset:0,width:`100%`,height:`100%`,pointerEvents:`none`,zIndex:20},children:[(0,a.jsxs)(`g`,{opacity:`0`,children:[(0,a.jsx)(`circle`,{r:`25`,fill:`#f2dbe9`,opacity:`.08`}),(0,a.jsx)(`circle`,{r:`18`,fill:`#fff1d5`,opacity:`.18`}),(0,a.jsx)(`circle`,{r:`9`,fill:`#fff8e9`,opacity:`.5`}),(0,a.jsx)(`circle`,{r:`21`,fill:`none`,stroke:`#fff1d5`,strokeWidth:`.8`}),(0,a.jsx)(`ellipse`,{rx:`26`,ry:`15`,fill:`none`,stroke:`#d8e9e8`,strokeWidth:`.45`,opacity:`.65`})]}),Array.from({length:32},(e,t)=>(0,a.jsxs)(`g`,{opacity:`0`,children:[(0,a.jsx)(`path`,{d:t%3==0?`M-7 0 Q0 -4 10 0 Q0 3 -7 0`:`M-5 0 Q0 -3 8 0 Q0 3 -5 0`,fill:[`#f2e8ce`,`#d8e9e8`,`#e4dbee`,`#eacfd9`][t%4]}),(0,a.jsx)(`path`,{d:`M-3 0 Q1 -1 5 0`,fill:`none`,stroke:`#fffaf1`,strokeWidth:`.65`,opacity:`.8`}),(0,a.jsx)(`circle`,{cx:`-10`,cy:`3`,r:`.8`,fill:`#fff5dc`,opacity:`.7`})]},t))]}),(0,a.jsx)(`canvas`,{ref:b,"aria-hidden":`true`,style:{position:`absolute`,width:`25.875%`,height:`46%`,transform:`translate(-50%,-50%)`,pointerEvents:`none`,zIndex:18,opacity:0}}),(0,a.jsx)(`button`,{ref:ae,type:`button`,"aria-label":`여울과 인사하기`,onClick:e=>{e.stopPropagation(),S.current()},style:{position:`absolute`,width:`44px`,height:`52px`,transform:`translate(-50%,-65%)`,background:`transparent`,border:0,borderRadius:`50%`,cursor:`pointer`,zIndex:19,visibility:`hidden`}})]})}export{l as i,u as n,d as r,ne as t};