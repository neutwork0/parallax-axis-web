import{i as e,n as t,t as n}from"./jsx-runtime-CU3EbJiN.js";var r=e(t(),1),i=n(),a=`
attribute vec2 aPosition;
varying vec2 vUv;
void main(){
  gl_Position=vec4(aPosition,0.0,1.0);
  vUv=vec2(aPosition.x*.5+.5,.5-aPosition.y*.5);
}`,o=`
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
}`;function s(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)}function c({src:e,center:t={x:50,y:50},mode:n=`idle`,spread:c=1,round:l=!1,auraDelay:u=0,rippleDelay:d=0,className:f=``}){let p=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let r=p.current;if(!r||!e||window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches)return;r.dataset.rippleState=`loading`;let i=r.getContext(`webgl`,{alpha:!0,antialias:!1,premultipliedAlpha:!0});if(!i){r.dataset.rippleState=`unsupported`;return}let f=s(i,i.VERTEX_SHADER,a),m=s(i,i.FRAGMENT_SHADER,o);if(!f||!m){r.dataset.rippleState=`shader-error`;return}let h=i.createProgram();if(i.attachShader(h,f),i.attachShader(h,m),i.linkProgram(h),!i.getProgramParameter(h,i.LINK_STATUS)){r.dataset.rippleState=`link-error`;return}i.useProgram(h);let g=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,g),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW);let _=i.getAttribLocation(h,`aPosition`);i.enableVertexAttribArray(_),i.vertexAttribPointer(_,2,i.FLOAT,!1,0,0);let v=i.createTexture();i.bindTexture(i.TEXTURE_2D,v),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,new Uint8Array([0,0,0,0]));let y=i.getUniformLocation(h,`uResolution`),b=i.getUniformLocation(h,`uCenter`),x=i.getUniformLocation(h,`uTime`),S=i.getUniformLocation(h,`uAuraTime`),C=i.getUniformLocation(h,`uRippleTime`),w=i.getUniformLocation(h,`uSeed`),T=i.getUniformLocation(h,`uAuraOrder`),E=i.getUniformLocation(h,`uMode`),D=i.getUniformLocation(h,`uSpread`),O=i.getUniformLocation(h,`uRound`),k=[i.getUniformLocation(h,`uPointerRippleA`),i.getUniformLocation(h,`uPointerRippleB`),i.getUniformLocation(h,`uPointerRippleC`)];i.uniform1i(i.getUniformLocation(h,`uTexture`),0),i.uniform2f(b,t.x/100,t.y/100),i.uniform1f(E,n===`impact`?1:n===`lobby`?2:0),i.uniform1f(D,c),i.uniform1f(O,+!!l);let A=[0,1,2,3];for(let e=A.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[A[e],A[t]]=[A[t],A[e]]}let j=[,,,,];A.forEach((e,t)=>{j[e]=t}),i.uniform1f(w,Math.random()*997+1),i.uniform4f(T,j[0],j[1],j[2],j[3]),k.forEach(e=>i.uniform3f(e,.5,.5,-100)),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE_MINUS_SRC_ALPHA);let M=0,N=!1,P=!1,F=performance.now(),I=0,L=!1,R={x:-999,y:-999,time:-999},z=e=>{if(n!==`idle`||!P)return;let a=r.closest(`.px-hall-concept-frame`)?.querySelector(`.px-hall-concept-stage-gate > button, .px-hall-concept-progress-field > span.is-next > button`);if(!a)return;let o=a.getBoundingClientRect();if(!(e.clientX>=o.left&&e.clientX<=o.right&&e.clientY>=o.top&&e.clientY<=o.bottom)){L=!1;return}let s=performance.now()-F;if(s<d)return;let c=!L;L=!0;let l=Math.hypot(e.clientX-R.x,e.clientY-R.y);if(!c&&(s-R.time<780||l<16))return;let u=t.x/100,f=t.y/100;i.useProgram(h),i.uniform3f(k[I],u,f,s/1e3),I=(I+1)%k.length,R={x:e.clientX,y:e.clientY,time:s}},B=()=>{let e=Math.min(window.devicePixelRatio||1,1.5),t=Math.max(1,Math.round(r.clientWidth*e)),n=Math.max(1,Math.round(r.clientHeight*e));(r.width!==t||r.height!==n)&&(r.width=t,r.height=n),i.viewport(0,0,t,n),i.uniform2f(y,t,n)},V=e=>{if(!N){if(B(),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),P){let t=(e-F)/1e3;i.uniform1f(x,t),i.uniform1f(S,t-u/1e3),i.uniform1f(C,t-d/1e3),i.drawArrays(i.TRIANGLE_STRIP,0,4)}M=requestAnimationFrame(V)}},H=new Image;return H.decoding=`async`,H.onload=()=>{N||(i.bindTexture(i.TEXTURE_2D,v),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,H),P=!0,r.dataset.rippleState=`ready`)},H.src=e,window.addEventListener(`pointermove`,z,{passive:!0}),M=requestAnimationFrame(V),()=>{N=!0,cancelAnimationFrame(M),window.removeEventListener(`pointermove`,z),i.deleteTexture(v),i.deleteBuffer(g),i.deleteProgram(h),i.deleteShader(f),i.deleteShader(m),delete r.dataset.rippleState}},[e,t.x,t.y,n,l,c,u,d]),(0,i.jsx)(`canvas`,{ref:p,className:`px-ripple-shader ${f}`.trim(),"aria-hidden":`true`})}export{c as t};