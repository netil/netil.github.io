if(typeof window.nhn==="undefined"){window.nhn={}
};
jindo.Component=jindo.$Class({_htEventHandler:null,_htOption:null,$init:function(){var a=this.constructor.getInstance();
a.push(this);
this._htEventHandler={};
this._htOption={};
this._htOption._htSetter={}
},option:function(e,c){switch(typeof e){case"undefined":var d={};
for(var a in this._htOption){if(!(a=="htCustomEventHandler"||a=="_htSetter")){d[a]=this._htOption[a]
}}return d;
case"string":if(typeof c!="undefined"){if(e=="htCustomEventHandler"){if(typeof this._htOption[e]=="undefined"){this.attach(c)
}else{return this
}}this._htOption[e]=c;
if(typeof this._htOption._htSetter[e]=="function"){this._htOption._htSetter[e](c)
}}else{return this._htOption[e]
}break;
case"object":for(var b in e){if(b=="htCustomEventHandler"){if(typeof this._htOption[b]=="undefined"){this.attach(e[b])
}else{continue
}}if(b!=="_htSetter"){this._htOption[b]=e[b]
}if(typeof this._htOption._htSetter[b]=="function"){this._htOption._htSetter[b](e[b])
}}break
}return this
},optionSetter:function(c,a){switch(typeof c){case"undefined":return this._htOption._htSetter;
case"string":if(typeof a!="undefined"){this._htOption._htSetter[c]=jindo.$Fn(a,this).bind()
}else{return this._htOption._htSetter[c]
}break;
case"object":for(var b in c){this._htOption._htSetter[b]=jindo.$Fn(c[b],this).bind()
}break
}return this
},fireEvent:function(b,k){k=k||{};
var d=this["on"+b],c=this._htEventHandler[b]||[],h=typeof d=="function",g=c.length>0;
if(!h&&!g){return true
}c=c.concat();
k.sType=b;
if(typeof k._aExtend=="undefined"){k._aExtend=[];
k.stop=function(){if(k._aExtend.length>0){k._aExtend[k._aExtend.length-1].bCanceled=true
}}
}k._aExtend.push({sType:b,bCanceled:false});
var f=[k],e,j;
for(e=2,j=arguments.length;
e<j;
e++){f.push(arguments[e])
}if(h){d.apply(this,f)
}if(g){var a;
for(e=0,a;
(a=c[e]);
e++){a.apply(this,f)
}}return !k._aExtend.pop().bCanceled
},attach:function(c,a){if(arguments.length==1){jindo.$H(arguments[0]).forEach(jindo.$Fn(function(d,e){this.attach(e,d)
},this).bind());
return this
}var b=this._htEventHandler[c];
if(typeof b=="undefined"){b=this._htEventHandler[c]=[]
}b.push(a);
return this
},detach:function(e,b){if(arguments.length==1){jindo.$H(arguments[0]).forEach(jindo.$Fn(function(f,g){this.detach(g,f)
},this).bind());
return this
}var d=this._htEventHandler[e];
if(d){for(var a=0,c;
(c=d[a]);
a++){if(c===b){d=d.splice(a,1);
break
}}}return this
},detachAll:function(c){var b=this._htEventHandler;
if(arguments.length){if(typeof b[c]=="undefined"){return this
}delete b[c];
return this
}for(var a in b){delete b[a]
}return this
}});
jindo.Component.factory=function(b,f){var c=[],a;
if(typeof f=="undefined"){f={}
}for(var d=0,e;
(e=b[d]);
d++){a=new this(e,f);
c[c.length]=a
}return c
};
jindo.Component.getInstance=function(){if(typeof this._aInstance=="undefined"){this._aInstance=[]
}return this._aInstance
};
jindo.Component.VERSION="1.9.0";
jindo.UIComponent=jindo.$Class({$init:function(){this._bIsActivating=false
},isActivating:function(){return this._bIsActivating
},activate:function(){if(this.isActivating()){return this
}this._bIsActivating=true;
if(arguments.length>0){this._onActivate.apply(this,arguments)
}else{this._onActivate()
}return this
},deactivate:function(){if(!this.isActivating()){return this
}this._bIsActivating=false;
if(arguments.length>0){this._onDeactivate.apply(this,arguments)
}else{this._onDeactivate()
}return this
}}).extend(jindo.Component);
jindo.Calendar=jindo.$Class({$init:function(b,c){var a=this.constructor.getToday();
this.setToday(a.nYear,a.nMonth,a.nDate);
this._elLayer=jindo.$(b);
this._htDefaultOption={sClassPrefix:"calendar-",nYear:this._htToday.nYear,nMonth:this._htToday.nMonth,nDate:this._htToday.nDate,sTitleFormat:"yyyy-mm",sYearTitleFormat:"yyyy",sMonthTitleFormat:"m",aMonthTitle:["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],bDrawOnload:true};
this.option(this._htDefaultOption);
this.option(c||{});
this._assignHTMLElements();
this.activate();
this.setDate(this.option("nYear"),this.option("nMonth"),this.option("nDate"));
if(this.option("bDrawOnload")){this.draw()
}},getBaseElement:function(){return this._elLayer
},getDate:function(){return this._htDate
},getDateOfElement:function(b){var a=jindo.$A(this._aDateContainerElement).indexOf(b);
if(a>-1){return this._aMetaData[a]
}return null
},setToday:function(b,c,a){if(!this._htToday){this._htToday={}
}this._htToday.nYear=b;
this._htToday.nMonth=c;
this._htToday.nDate=a;
return this
},getToday:function(){return{nYear:this._htToday.nYear,nMonth:this._htToday.nMonth,nDate:this._htToday.nDate}
},setDate:function(b,c,a){this._htDate={nYear:b,nMonth:(c*1),nDate:(a*1)}
},getShownDate:function(){return this._getShownDate()
},_getShownDate:function(){return this.htShownDate||this.getDate()
},_setShownDate:function(a,b){this.htShownDate={nYear:a,nMonth:(b*1),nDate:1}
},_assignHTMLElements:function(){var c=this.option("sClassPrefix"),b=this.getBaseElement();
if((this.elBtnPrevYear=jindo.$$.getSingle(("."+c+"btn-prev-year"),b))){this.wfPrevYear=jindo.$Fn(function(d){d.stop(jindo.$Event.CANCEL_DEFAULT);
this.draw(-1,0,true)
},this)
}if((this.elBtnPrevMonth=jindo.$$.getSingle(("."+c+"btn-prev-mon"),b))){this.wfPrevMonth=jindo.$Fn(function(d){d.stop(jindo.$Event.CANCEL_DEFAULT);
this.draw(0,-1,true)
},this)
}if((this.elBtnNextMonth=jindo.$$.getSingle(("."+c+"btn-next-mon"),b))){this.wfNextMonth=jindo.$Fn(function(d){d.stop(jindo.$Event.CANCEL_DEFAULT);
this.draw(0,1,true)
},this)
}if((this.elBtnNextYear=jindo.$$.getSingle(("."+c+"btn-next-year"),b))){this.wfNextYear=jindo.$Fn(function(d){d.stop(jindo.$Event.CANCEL_DEFAULT);
this.draw(1,0,true)
},this)
}this.elTitle=jindo.$$.getSingle(("."+c+"title"),b);
this.elTitleYear=jindo.$$.getSingle(("."+c+"title-year"),b);
this.elTitleMonth=jindo.$$.getSingle(("."+c+"title-month"),b);
var a=jindo.$$.getSingle("."+c+"week",b);
this.elWeekTemplate=a.cloneNode(true);
this.elWeekAppendTarget=a.parentNode
},_setCalendarTitle:function(b,c,f){if(c<10){c=("0"+(c*1)).toString()
}var d=this.elTitle,e=this.option("sTitleFormat"),a;
if(typeof f!="undefined"){switch(f){case"year":d=this.elTitleYear;
e=this.option("sYearTitleFormat");
a=e.replace(/yyyy/g,b).replace(/y/g,(b).toString().substr(2,2));
break;
case"month":d=this.elTitleMonth;
e=this.option("sMonthTitleFormat");
a=e.replace(/mm/g,c).replace(/m/g,(c*1)).replace(/M/g,this.option("aMonthTitle")[c-1]);
break
}}else{a=e.replace(/yyyy/g,b).replace(/y/g,(b).toString().substr(2,2)).replace(/mm/g,c).replace(/m/g,(c*1)).replace(/M/g,this.option("aMonthTitle")[c-1])
}jindo.$Element(d).text(a)
},draw:function(p,s,a){var n=this.option("sClassPrefix"),l=this.getDate(),j=this._getShownDate();
if(j&&typeof a!="undefined"&&a){var w=this.constructor.getRelativeDate(p,s,0,j);
p=w.nYear;
s=w.nMonth
}else{if(typeof p=="undefined"&&typeof s=="undefined"&&typeof a=="undefined"){p=l.nYear;
s=l.nMonth
}else{p=p||j.nYear;
s=s||j.nMonth
}}if(this.fireEvent("beforeDraw",{nYear:p,nMonth:s})){if(this.elTitle){this._setCalendarTitle(p,s)
}if(this.elTitleYear){this._setCalendarTitle(p,s,"year")
}if(this.elTitleMonth){this._setCalendarTitle(p,s,"month")
}this._clear(jindo.Calendar.getWeeks(p,s));
this._setShownDate(p,s);
var e=this.getToday(),k=this.constructor.getFirstDay(p,s),q=this.constructor.getLastDay(p,s),z=this.constructor.getLastDate(p,s),m=0,d=this.constructor.getRelativeDate(0,-1,0,{nYear:p,nMonth:s,nDate:1}),g=this.constructor.getRelativeDate(0,1,0,{nYear:p,nMonth:s,nDate:1}),v=this.constructor.getLastDate(d.nYear,d.nMonth),A=[],r,t,y,b,h,f,o,x,u;
var c=this.constructor.getWeeks(p,s);
for(u=0;
u<c;
u++){x=this.elWeekTemplate.cloneNode(true);
jindo.$Element(x).appendTo(this.elWeekAppendTarget);
this._aWeekElement.push(x)
}this._aDateElement=jindo.$$("."+n+"date",this.elWeekAppendTarget);
this._aDateContainerElement=jindo.$$("."+n+"week > *",this.elWeekAppendTarget);
if(k>0){for(u=v-k;
u<v;
u++){A.push(u+1)
}}for(u=1;
u<z+1;
u++){A.push(u)
}o=A.length-1;
for(u=1;
u<7-q;
u++){A.push(u)
}for(u=0;
u<A.length;
u++){r=false;
t=false;
y=jindo.$Element(this._aDateContainerElement[u]);
b=p;
h=s;
if(u<k){r=true;
y.addClass(n+"prev-mon");
b=d.nYear;
h=d.nMonth
}else{if(u>o){t=true;
y.addClass(n+"next-mon");
b=g.nYear;
h=g.nMonth
}else{b=p;
h=s
}}if(m===0){y.addClass(n+"sun")
}if(m==6){y.addClass(n+"sat")
}if(b==e.nYear&&(h*1)==e.nMonth&&A[u]==e.nDate){y.addClass(n+"today")
}f={elDate:this._aDateElement[u],elDateContainer:y.$value(),nYear:b,nMonth:h,nDate:A[u],bPrevMonth:r,bNextMonth:t,sHTML:A[u]};
jindo.$Element(f.elDate).html(f.sHTML.toString());
this._aMetaData.push({nYear:b,nMonth:h,nDate:A[u]});
m=(m+1)%7;
this.fireEvent("draw",f)
}this.fireEvent("afterDraw",{nYear:p,nMonth:s})
}},_clear:function(a){this._aMetaData=[];
this._aWeekElement=[];
jindo.$Element(this.elWeekAppendTarget).empty()
},attachEvent:function(){this.activate()
},detachEvent:function(){this.deactivate()
},_onActivate:function(){if(this.elBtnPrevYear){this.wfPrevYear.attach(this.elBtnPrevYear,"click")
}if(this.elBtnPrevMonth){this.wfPrevMonth.attach(this.elBtnPrevMonth,"click")
}if(this.elBtnNextMonth){this.wfNextMonth.attach(this.elBtnNextMonth,"click")
}if(this.elBtnNextYear){this.wfNextYear.attach(this.elBtnNextYear,"click")
}},_onDeactivate:function(){if(this.elBtnPrevYear){this.wfPrevYear.detach(this.elBtnPrevYear,"click")
}if(this.elBtnPrevMonth){this.wfPrevMonth.detach(this.elBtnPrevMonth,"click")
}if(this.elBtnNextMonth){this.wfNextMonth.detach(this.elBtnNextMonth,"click")
}if(this.elBtnNextYear){this.wfNextYear.detach(this.elBtnNextYear,"click")
}}}).extend(jindo.UIComponent);
jindo.Calendar.setToday=function(b,c,a){if(!this._htToday){this._htToday={}
}this._htToday.nYear=b;
this._htToday.nMonth=c;
this._htToday.nDate=a;
return this
};
jindo.Calendar.getToday=function(){var a=this._htToday||this.getDateHashTable(new Date());
return{nYear:a.nYear,nMonth:a.nMonth,nDate:a.nDate}
};
jindo.Calendar.getDateObject=function(a){if(arguments.length==3){return new Date(arguments[0],arguments[1]-1,arguments[2])
}return new Date(a.nYear,a.nMonth-1,a.nDate)
};
jindo.Calendar.getDateHashTable=function(a){if(arguments.length==3){return{nYear:arguments[0],nMonth:arguments[1],nDate:arguments[2]}
}if(arguments.length<=1){a=a||new Date()
}return{nYear:a.getFullYear(),nMonth:a.getMonth()+1,nDate:a.getDate()}
};
jindo.Calendar.getTime=function(a){return this.getDateObject(a).getTime()
};
jindo.Calendar.getFirstDay=function(a,b){return new Date(a,b-1,1).getDay()
};
jindo.Calendar.getLastDay=function(a,b){return new Date(a,b,0).getDay()
};
jindo.Calendar.getLastDate=function(a,b){return new Date(a,b,0).getDate()
};
jindo.Calendar.getWeeks=function(a,c){var d=this.getFirstDay(a,c),b=this.getLastDate(a,c);
return Math.ceil((d+b)/7)
};
jindo.Calendar.getRelativeDate=function(e,f,c,b){var a=jindo.$Date(new Date(b.nYear,b.nMonth,b.nDate));
var d={"1":31,"2":28,"3":31,"4":30,"5":31,"6":30,"7":31,"8":31,"9":30,"10":31,"11":30,"12":31};
if(a.isLeapYear()){d={"1":31,"2":29,"3":31,"4":30,"5":31,"6":30,"7":31,"8":31,"9":30,"10":31,"11":30,"12":31}
}if(d[b.nMonth]==b.nDate){b.nDate=d[b.nMonth+f]
}var g=this.getDateHashTable(new Date(b.nYear+e,b.nMonth+f-1,b.nDate+c));
return this.getDateHashTable(new Date(b.nYear+e,b.nMonth+f-1,b.nDate+c))
};
jindo.Calendar.isValidDate=function(b,c,a){if(c<=12&&a<=this.getLastDate(b,c)){return true
}else{return false
}};
jindo.Calendar.isPast=function(a,b){if(this.getTime(a)<this.getTime(b)){return true
}return false
};
jindo.Calendar.isFuture=function(a,b){if(this.getTime(a)>this.getTime(b)){return true
}return false
};
jindo.Calendar.isSameDate=function(a,b){if(this.getTime(a)==this.getTime(b)){return true
}return false
};
jindo.Calendar.isBetween=function(a,c,b){if(this.isFuture(a,b)||this.isPast(a,c)){return false
}else{return true
}};
jindo.LazyLoading={_waLoading:jindo.$A([]),_waLoaded:jindo.$A([]),_whtScript:jindo.$H({}),_whtCallback:jindo.$H({})};
jindo.LazyLoading.load=function(b,l,c){if(typeof l!="function"){l=function(){}
}if(b instanceof Array){var e=arguments.callee;
var a=true;
var j=b.length;
var h=j;
for(var f=0;
f<j;
f++){a&=this.load(b[f],function(){h--;
if(h===0){l()
}},c)
}return a
}this._queueCallback(b,l);
if(this._checkIsLoading(b)){return false
}if(this._checkAlreadyLoaded(b)){this._doCallback(b);
return true
}this._waLoading.push(b);
var k=this;
var g=document.getElementsByTagName("head")[0];
var d=document.createElement("script");
d.type="text/javascript";
d.charset=c||"utf-8";
d.src=b;
this._whtScript.add(b,d);
if("onload" in d){d.onload=function(){k._waLoaded.push(b);
k._waLoading=k._waLoading.refuse(b);
k._doCallback(b)
}
}else{d.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){k._waLoaded.push(b);
k._waLoading=k._waLoading.refuse(b);
k._doCallback(b);
this.onreadystatechange=null
}}
}g.appendChild(d);
return true
};
jindo.LazyLoading._queueCallback=function(b,c){var a=this._whtCallback.$(b);
if(a){a.push(c)
}else{this._whtCallback.$(b,[c])
}};
jindo.LazyLoading._doCallback=function(c){var a=this._whtCallback.$(c).concat();
for(var b=0;
b<a.length;
b++){this._whtCallback.$(c).splice(b,1);
a[b]()
}};
jindo.LazyLoading.abort=function(b){if(this._checkIsLoading(b)){var a=this.getScriptElement(b);
this._waLoading=this._waLoading.refuse(b);
if("onload" in a){a.onload=null
}else{a.onreadystatechange=null
}jindo.$Element(a).leave();
this._whtScript.remove(b);
this._whtCallback.remove(b);
return true
}else{return false
}};
jindo.LazyLoading._checkAlreadyLoaded=function(a){return this._waLoaded.has(a)
};
jindo.LazyLoading._checkIsLoading=function(a){return this._waLoading.has(a)
};
jindo.LazyLoading.getLoaded=function(){return this._waLoaded.$value()
};
jindo.LazyLoading.getLoading=function(){return this._waLoading.$value()
};
jindo.LazyLoading.getScriptElement=function(a){return this._whtScript.$(a)||null
};
if(typeof nhn=="undefined"){nhn={}
}nhn.FlashObject=(function(){var d={};
var a="F"+new Date().getTime()+parseInt(Math.random()*1000000);
var k=/MSIE/i.test(navigator.userAgent);
var j=/FireFox/i.test(navigator.userAgent);
var i=/Chrome/i.test(navigator.userAgent);
var b="className, style, __flashID, classid, codebase, class, width, height, name, src, align, id, type, object, embed, movie";
var h=function(n,p,o){if(typeof n.attachEvent!="undefined"){n.attachEvent("on"+p,o)
}else{n.addEventListener(p,o,true)
}};
var f=function(n,q){var r="";
var v=true;
var o="";
var t;
for(var u in n){if(v){v=false
}else{r+=q
}t=n[u];
switch(typeof(t)){case"string":r+=u+"="+encodeURIComponent(t);
break;
case"number":r+=u+"="+encodeURIComponent(t.toString());
break;
case"boolean":r+=u+"="+(t?"true":"false");
break;
default:}}return r
};
var m=function(){obj=document.getElementsByTagName("OBJECT");
for(var o=0,n;
n=obj[o];
o++){n.style.display="none";
for(var q in n){if(typeof(n[q])=="function"){try{if(n.hasOwnProperty(q)){n[q]=null
}}catch(p){}}}}};
var e=function(r){r=r||window.event;
var q=r.wheelDelta/(i?360:120);
if(!q){q=-r.detail/3
}var o=r.target||r.srcElement;
if(!(new RegExp("(^|\b)"+a+"_([a-z0-9_$]+)(\b|$)","i").test(o.className))){return
}var n=RegExp.$2;
var t="layerX" in r?r.layerX:r.offsetX;
var s="layerY" in r?r.layerY:r.offsetY;
try{if(!o[n](q,t,s)){if(r.preventDefault){r.preventDefault()
}else{r.returnValue=false
}}}catch(p){}};
var g=function(o){var p=null;
var r=/Safari/.test(navigator.userAgent);
var n=/MSIE/.test(navigator.userAgent);
var s=function(u){var t={left:0,top:0};
if(u.parentNode.tagName.toLowerCase()=="object"){u=u.parentNode
}for(var w=u,v=w.offsetParent;
w=w.parentNode;
){if(w.offsetParent){t.left-=w.scrollLeft;
t.top-=w.scrollTop
}if(w==v){t.left+=u.offsetLeft+w.clientLeft;
t.top+=u.offsetTop+w.clientTop;
if(!w.offsetParent){t.left+=w.offsetLeft;
t.top+=w.offsetTop
}v=w.offsetParent;
u=w
}}return t
};
var q=function(u){var t={left:0,top:0};
for(var v=u;
v;
v=v.offsetParent){t.left+=v.offsetLeft;
t.top+=v.offsetTop
}for(var v=u.parentNode;
v;
v=v.parentNode){if(v.tagName=="BODY"){break
}if(v.tagName=="TR"){t.top+=2
}t.left-=v.scrollLeft;
t.top-=v.scrollTop
}return t
};
return(r?s:q)(o)
};
var c=function(){var n=/MSIE/.test(navigator.userAgent);
if(n){var p=document.documentElement.scrollLeft||document.body.scrollLeft;
var o=document.documentElement.scrollTop||document.body.scrollTop;
return{scrollX:p,scrollY:o}
}else{return{scrollX:window.pageXOffset,scrollY:window.pageYOffset}
}};
var l=function(){var n=/MSIE/.test(navigator.userAgent);
var o={};
if(n){o.nInnerWidth=document.documentElement.clientWidth||document.body.clientWidth;
o.nInnerHeight=document.documentElement.clientHeight||document.body.clientHeight
}else{o.nInnerWidth=window.innerWidth;
o.nInnerHeight=window.innerHeight
}return o
};
d.showAt=function(n,o){document.getElementById(n).innerHTML=o
};
d.show=function(q,r,s,t,v,n,u,p){var o=d.generateTag(r,s,t,v,n,u,p);
$Element(q).appendHTML(o)
};
d.generateTag=function(v,w,x,A,o,y,s){x=x||"100%";
A=A||"100%";
s=s||"9,0,0,0";
y=y||"middle";
var z=d.getDefaultOption();
var C="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
var r="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version="+s;
var p="position:relative !important;";
var q=a;
if(o){if(o.flashVars){if(typeof(o.flashVars)=="object"){o.flashVars=f(o.flashVars,"&")
}o.flashVars+="&"
}else{o.flashVars=""
}o.flashVars+="__flashID="+w;
p=o.style||p;
q=o.className||(q+"_"+o.wheelHandler);
for(var B in o){if(b.indexOf(B)>=0){continue
}z[B]=o[B]
}}var t=[];
var n=[];
t.push('<object classid="'+C+'" codebase="'+r+'" class="'+q+'" style="'+p+'" width="'+x+'" height="'+A+'" id="'+w+'" align="'+y+'">');
t.push('<param name="movie" value="'+v+'" />');
n.push('<embed width="'+x+'" height="'+A+'" name="'+w+'" class="'+q+'" style="'+p+'" src="'+v+'" align="'+y+'" ');
if(!k){n.push('id="'+w+'" ')
}for(var u in z){t.push('<param name="'+u+'" value="'+z[u]+'" />');
n.push(u+'="'+z[u]+'" ')
}n.push('type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
t.push(n.join(""));
t.push("</object>");
if(h){h(window,"unload",m);
h(document,!j?"mousewheel":"DOMMouseScroll",e);
h=null
}return(k)?t.join(""):n.join("")
};
d.getDefaultOption=function(){return{quality:"high",bgColor:"#FFFFFF",allowScriptAccess:"always",wmode:"window",menu:"false",allowFullScreen:"true"}
};
d.find=function(o,n){n=n||document;
try{return n[o]||n.all[o]
}catch(p){return null
}};
d.setWidth=function(n,o){d.find(n).width=o
};
d.setHeight=function(n,o){d.find(n).height=o
};
d.setSize=function(p,o,n){d.find(p).height=n;
d.find(p).width=o
};
d.getPositionObj=function(o){var p=d.find(o);
if(p==null){return null
}var n=g(p);
var q=c();
var r={};
r.absoluteX=n.left;
r.absoluteY=n.top;
r.scrolledX=r.absoluteX-q.scrollX;
r.scrolledY=r.absoluteY-q.scrollY;
r.browserWidth=l().nInnerWidth;
return r
};
d.getSSCLogParam=function(){var n=[];
if(window.g_ssc){n.push("ssc="+g_ssc)
}else{n.push("ssc=decide.me")
}if(window.g_pid){n.push("&p="+g_pid)
}if(window.g_query){n.push("&q="+encodeURIComponent(g_query))
}if(window.g_sid){n.push("&s="+g_sid)
}return n.join("")
};
return d
})();
if(typeof jsutility==="undefined"){jsutility={}
}(function(){jsutility.changeNumberFormat=function(b){var d="";
var c=b||0;
c=(typeof c!="String")?String(c):c;
if(c.indexOf(".")>-1){var a=c.split(".");
c=a[0];
d="."+a[1]
}return c.replace(/(\d)(?=(\d{3})+$)/igm,"$1,")+d
}
})();
ArticleUtils={requestCommentCount:function(b,c){var a=jindo.$Element("comment_count");
if(!a||!b||!c){return
}jindo.$Ajax("/api/comment/count.json?gno=news"+b+"%2C"+c,{onload:function(e){var f=e.json();
if(f.message.error||f.message.result.onOff!=="on"){a.leave();
return
}var d=jsutility.changeNumberFormat(f.message.result.count);
a.html(d)
}}).request()
},scrollToTitle:function(){var a=jindo.$Element("articleTitle");
if(!a){return
}window.scrollTo(0,a.offset().top)
}};
SocialCommentUtils={sSocialCommentId:"social-comment",nLoadCheckLimit:5,nLoadCheckCount:0,nLoadCheckDelayTime:50,pPathPattern:/\/comment\//,scrollToTop:function(){var b=document.location.href;
var a=jindo.$Element(this.sSocialCommentId);
if(!this.pPathPattern.test(b)||!a||this.nLoadCheckCount>=this.nLoadCheckLimit){return
}this._scrollToTopCheck(a)
},_scrollToTopCheck:function(b){if(!b.html()){this.nLoadCheckCount++;
var a=this;
setTimeout(function(){a._scrollToTopCheck(b)
},a.nLoadCheckDelayTime);
return
}setTimeout(function(){window.scrollTo(0,b.offset().top)
},300)
}};
if(typeof nhn==="undefined"){nhn={}
}nhn.m=nhn.m||{};
nhn.m.news=nhn.m.news||{};
(function(){nhn.m.news.util={useTransitionTimingFunction:(function(){var b=jindo.m.getDeviceInfo();
var a=jindo.$Agent();
var c=null;
c=!(a.navigator().mobile||a.os().ipad)?true:c;
c=(a.os().ios&&parseFloat(b.version,10)>=4)?true:c;
c=(b.android&&parseFloat(b.version,10)>=4)?true:c;
return function(){return c
}
})(),isMobileTablet:(function(){var a=jindo.$Agent().navigator().mobile||jindo.$Agent().os().ipad;
return function(){return a
}
})(),randomInRange:function(a,b){b=b||0;
return Math.floor(Math.random()*(a))+b
},isExistInViewportHeight:function(e){var b=jindo.$Element(e);
var f=document.body.scrollTop;
var d=window.innerHeight;
var c=b.offset().top,a=b.height();
if(c+a>=f&&c<=f+d){return true
}return false
},getElementsInViewportHeight:function(e){e=(e instanceof Array)?e:[e];
if(e.length===0){return[]
}var j=[];
var f=document.body.scrollTop;
var d=window.innerHeight;
var a=null;
var b=this.binarySearch(e,function(m){var k=jindo.$Element(m);
var l=k.offset().top,i=k.height();
if(l+i>=f&&l<=f+d){return 0
}if(l+i<f){return 1
}else{if(l>f+d){return -1
}}});
function h(k){a=jindo.$Element(e[k]);
var l=a.offset().top,i=a.height();
if(l+i>=f&&l<=f+d){return true
}return false
}var c=0;
if(b>=0){var g=e[b];
j.push(g);
for(c=b-1;
e[c]&&h(c);
c--){j.unshift(e[c])
}for(c=b+1;
e[c]&&h(c);
c++){j.push(e[c])
}}return j
},binarySearch:function(b,d){var f=0,a=b.length-1,c=Math.floor((a+f)/2);
while(b[c]&&f<a){var e=d(b[c]);
if(e===0){break
}if(e<0){a=c-1
}else{if(e>0){f=c+1
}}c=Math.floor((a+f)/2)
}return(!b[c]||d(b[c])!==0)?-1:c
},changeNumberFormat:function(b){var d="";
var c=b||0;
c=(typeof c!="String")?String(c):c;
if(c.indexOf(".")>-1){var a=c.split(".");
c=a[0];
d="."+a[1]
}return c.replace(/(\d)(?=(\d{3})+$)/igm,"$1,")+d
},convertGMTTimeToTimezoneOffsetTime:function(a){var b=new Date(a);
b.setTime(b.getTime()-b.getTimezoneOffset()*60000);
return b.getTime()
},changeSecondToTimeObject:function(b){b=(b||0)*1;
b=Math.ceil(b);
var c=60,a=c*c;
return{hour:parseInt(b/a,10),min:parseInt((b%a)/c,10),sec:(b%c)}
},disableSelection:function(a){var b=jindo.$Agent().navigator();
if(b.ie||b.opera){a.unselectable="on"
}else{if(b.safari||b.chrome){a.style.KhtmlUserSelect="none"
}else{a.style.MozUserSelect="-moz-none"
}}jindo.$Fn(function(c){c.stopDefault()
}).attach(a,"selectstart")
},noImage:function(a,b){if(!a){return
}b=b||{};
a.onerror=null;
for(var c in b){a[c]=b[c]
}},addNewAnchorTargetForNotSupportPageCache:function(b,c){var a=jindo.m.getDeviceInfo();
var d=(a.bInapp&&a.android&&parseFloat(a.version,10)>=4.4)?false:a.bInapp;
if(d||!a.bChrome){return
}b=b||[];
c=c||"_blank";
jindo.$A(b).forEach(function(g,f,h){var e=jindo.$Element(g);
g=e.$value();
if(g.tagName&&g.tagName.toUpperCase()=="A"){if(!e.attr("target")&&(e.attr("href").search("://")>=0||e.attr("href").indexOf("/")==0)){e.attr("target",c)
}}})
}}
})();
(function(a){a._rxClassName=function(b){return new RegExp("(^|\\s+)"+b+"(\\(([^\\)]*)\\))?(\\s+|$)","i")
};
a.setClass=function(d,b,c){if(this.getClass(d,b)){this.removeClass(d,b)
}d.className+=[(d.className?" ":""),b,(c instanceof Array?"("+c.join(",")+")":"")].join("");
return d
};
a.getClass=function(e,c){var d=this._rxClassName(c);
if(!d.test(e.className)){return null
}var b=[];
if(RegExp.$3){RegExp.$3.replace(/(\{[^\}]+\}|\[[^\]]+\]|[\-\+\=\/\s\w\.\*가-힣]+)|,(,+)/g,function(g,k,j){if(k){b.push(k)
}if(j){for(var h=0,f=j.length;
h<f;
h++){b.push("")
}}})
}return b
};
a.removeClass=function(d,b){var c=this._rxClassName(b);
d.className=this.trim(d.className.replace(c,"$4"));
return d
};
a.getParentByClass=function(h,b){var d=this._rxClassName(b);
var c=false;
var f="";
try{c="className" in h
}catch(g){}for(;
h&&c;
h=h.parentNode){f=typeof h.className=="object"?h.className.baseVal:h.className;
if(d.test(f)){RegExp.$0=RegExp.$3;
return h
}}return null
}
})(nhn.m.news.util);
(function(a){a.Bubbler=jindo.$Class({$init:function(b){this._el=b;
this._eventTypes={};
this._fpEventHandler=jindo.$Fn(this._eventHandler,this)
},attach:function(h,d){if(typeof h=="object"){var e=arguments.callee;
jindo.$H(h).forEach(function(l,j){e.call(this,j,l)
},this);
return this
}var b=h.split(":");
var c=b[0];
var i=b[1].toLowerCase();
var f=i;
if(f=="mouseenter"){f="mouseover"
}else{if(f=="mouseleave"){f="mouseout"
}}if(!(i in this._eventTypes)){this._eventTypes[i]=jindo.$H();
this._fpEventHandler.attach(this._el,f)
}var g=this._eventTypes[i];
if(!g.hasKey(c)){g.$(c,jindo.$A())
}g.$(c).push(d);
return this
},detach:function(c,h){if(typeof c=="object"){var g=arguments.callee;
jindo.$H(c).forEach(function(m,l){g.call(this,l,m)
},this);
return this
}var e=c.split(":");
var d=e[0];
var b=e[1].toLowerCase();
var j=this._eventTypes[b];
var i=j.$(d);
if(i){var f=i.indexOf(h);
if(f!=-1){i.splice(f,1)
}}},_eventHandler:function(d){var g=d.type.toLowerCase();
var f=null;
if(g=="mouseover"){f="mouseenter"
}else{if(g=="mouseout"){f="mouseleave"
}}var e=this._eventTypes[f||g];
if(e){var c=d.element;
var b=d.relatedElement;
e.forEach(function(h,i){var k=nhn.m.news.util.getParentByClass(c,i);
if(!k){jindo.$H.Continue()
}if(f){var j=nhn.m.news.util.getParentByClass(b,i);
if(k===j){jindo.$H.Continue()
}}var l=nhn.m.news.util.getClass(k,i);
h.forEach(function(m){m(d,k,l)
});
k=null
},this)
}d=null
}})
})(nhn.m.news.util);
(function(a){})(nhn.m.news.util);
var LnbScrollManager=jindo.$Class({$init:function(g){var d=jindo.$Element(g);
if(!d){return
}var a=d.query(".scroller");
if(!a){return
}var f=new jindo.m.Scroll(d,{bAutoResize:false,bUseHScroll:true,bUseVScroll:false,bUseScrollbar:false,bUseCss3d:this._useCss3dPatch(),nHeight:a.height()});
function i(){var j=a.query("li.selected");
if(j){var k=j.parent().offset().left-j.offset().left;
k+=parseInt((window.innerWidth-j.width())/2,10);
f.scrollTo(Math.min(0,k),0)
}}jindo.m.bindRotate(function(){f.refresh();
i()
});
var h=this;
var b=d.parent();
var c=b.query(".grd_prev"),e=b.query(".grd_next");
if(c&&e){f.attach({afterScroll:function(j){if(h._useGradientDimLayer()){c.visible(j.nLeft<0,"block");
e.visible(j.nLeft>j.nMaxScrollLeft,"block")
}},scroll:function(j){var k=(j.nDistanceX<0)?"lnb.flne":"lnb.flpr";
nclk(this,k,"","")
}})
}jindo.$Fn(i).delay(0)
},_useGradientDimLayer:function(){var b=jindo.m.getDeviceInfo();
var a=jindo.$Agent();
var c=false;
c=(a.os().ios&&parseFloat(b.version,10)>6)?true:c;
c=(b.android&&parseFloat(b.version,10)>=4)?true:c;
return c
},_useCss3dPatch:function(){var a=jindo.m.getDeviceInfo();
return(a.android&&parseFloat(a.version,10)===4)?false:jindo.m.useCss3d(true)
}});
var CalendarManager=jindo.$Class({$init:function(a){this.attr={currentDate:undefined,startDate:undefined,endDate:undefined,callback:function(e,f,d){},openCalendarCallback:function(d){},prevBtnDimmed:"prev_dmm",nextBtnDimmed:"next_dmm",currentDateTemplate:'<a onclick=\'javascript:calendarManager.openCalendar(); nclk(this,"pap.copen","",""); \'>{=YEAR}.{=MONTH}.{=DATE} <em>{=DAY}요일</em><button class=\'ico_cal\'>달력보기</button></a>',calendarTemplate:'<a href=\'javascript:calendarManager.select({=YEAR},{=MONTH},{=DATE});\' onclick=\'nclk(this,"pap.cdate","","");\'>{=DATE}</a>'};
for(var c in a){this.attr[c]=a[c]
}this.DAYS=["일","월","화","수","목","금","토"];
this.currentDateTemplate=this.attr.currentDateTemplate;
this.calendarTemplate=this.attr.calendarTemplate;
this.calendarNonclickTemplate="{=DATE}";
this.oToday=jindo.$Element("today");
this.oDateLayer=jindo.$Element("date_layer");
this.oCalendarLayer=jindo.$Element("calendar_layer");
this.initCalendar();
this.today=this.parseDate(this.attr.endDate);
this.now=new Date();
this.past=new Date();
this.oPrevDateBtn=jindo.$Element("prev_date_btn");
this.oNextDateBtn=jindo.$Element("next_date_btn");
this.oPrevCalendarBtn=jindo.$Element("prev_calendar_btn");
this.oNextCalendarBtn=jindo.$Element("next_calendar_btn");
this.prevBlock=false;
this.nextBlock=false;
if(!this.attr.currentDate){this.setCurrentDate()
}else{var b=this.parseDate(this.attr.currentDate);
this.now.setFullYear(b.getFullYear(),b.getMonth(),b.getDate());
this.setCurrentDate()
}},initCalendar:function(){this.oCalendar=new jindo.Calendar("calendar_layer",{sTitleFormat:"yyyy.mm"});
var a={};
if(this.attr.startDate&&this.attr.endDate){this.setStart();
this.setEnd();
a.beforeDraw=jindo.$Fn(function(b){this.setPrevBtnDmm(b);
this.setNextBtnDmm(b)
},this).bind()
}else{if(this.attr.startDate){this.setStart();
a.beforeDraw=jindo.$Fn(function(b){this.setPrevBtnDmm(b)
},this).bind()
}else{if(this.attr.endDate){this.setEnd();
a.beforeDraw=jindo.$Fn(function(b){this.setNextBtnDmm(b)
},this).bind()
}}}a.draw=jindo.$Fn(function(b){var e=new Date(b.nYear,b.nMonth-1,b.nDate);
var d=null;
if(b.nDate==this.today.getDate()&&b.nMonth-1==this.today.getMonth()&&b.nYear==this.today.getFullYear()){d=this.calendarTemplate
}else{if(e<this.today){d=this.calendarTemplate
}else{d=this.calendarNonclickTemplate
}}var c=jindo.$Template(d).process({YEAR:(b.nYear),MONTH:(b.nMonth),DATE:(b.nDate)});
b.elDate.innerHTML=c;
if(b.nMonth-1==this.current_month&&b.nDate==this.current_date){b.elDate.className+=" cal_today"
}},this).bind();
this.oCalendar.attach(a)
},setPrevBtnDmm:function(a){this.oPrevCalendarBtn.removeClass("bt_pv_dmm");
if(a.nYear==this.startDate.year&&a.nMonth==this.startDate.month){this.oPrevCalendarBtn.addClass("bt_pv_dmm")
}if((a.nYear==this.startDate.year&&a.nMonth<this.startDate.month)||(a.nYear+1==this.startDate.year&&(a.nMonth%12)<this.startDate.month)){this.oPrevCalendarBtn.addClass("bt_pv_dmm");
a.stop()
}},setNextBtnDmm:function(a){this.oNextCalendarBtn.removeClass("bt_nx_dmm");
if(a.nYear==this.endDate.year&&a.nMonth==this.endDate.month){this.oNextCalendarBtn.addClass("bt_nx_dmm")
}if((a.nYear==this.endDate.year&&a.nMonth>this.endDate.month)||(a.nYear-1==this.endDate.year&&a.nMonth>(this.endDate.month%12))){this.oNextCalendarBtn.addClass("bt_nx_dmm");
a.stop()
}},setStart:function(){this.startDate=this.makeDateformText(this.attr.startDate);
this.startDate.month++
},setEnd:function(){this.endDate=this.makeDateformText(this.attr.endDate);
this.endDate.month++
},setCurrentDate:function(){this.current_year=this.now.getFullYear();
this.current_month=this.now.getMonth();
this.current_date=this.now.getDate();
this.current_day=this.now.getDay();
var b=(this.current_year).toString();
var c=(this.current_month+1).toString();
var a=(this.current_date).toString();
c=c.length<2?"0"+c:c;
a=a.length<2?"0"+a:a;
var d=jindo.$Template(this.currentDateTemplate).process({YEAR:(b),MONTH:(c),DATE:(a),DAY:(this.DAYS[this.current_day])});
this.oToday.html(d);
if(this.attr.startDate){this.prevBlock=false;
this.oPrevDateBtn.removeClass(this.attr.prevBtnDimmed);
this.past.setFullYear(this.current_year,this.current_month,this.current_date-1);
if(this.startDate.timestamp>this.past.getTime()){this.oPrevDateBtn.addClass(this.attr.prevBtnDimmed);
this.prevBlock=true
}}if(this.attr.endDate){this.nextBlock=false;
this.oNextDateBtn.removeClass(this.attr.nextBtnDimmed);
this.past.setFullYear(this.current_year,this.current_month,this.current_date+1);
if(this.endDate.timestamp<this.past.getTime()){this.oNextDateBtn.addClass(this.attr.nextBtnDimmed);
this.nextBlock=true
}}this.oCalendar.setDate(this.current_year,this.current_month+1,this.current_date);
this.oCalendar.draw()
},makeDateformText:function(c){var a={};
a.year=parseInt(c.substring(0,4),10);
a.month=parseInt(c.substring(4,6),10)-1;
a.date=parseInt(c.substring(6),10);
if(this.attr.endDate==c){a.date++
}var b=new Date();
b.setFullYear(a.year,a.month,a.date);
b.setHours(0,0,0,0);
a.timestamp=b.getTime();
return a
},parseDate:function(c){var a={};
a.year=parseInt(c.substring(0,4),10);
a.month=parseInt(c.substring(4,6),10)-1;
a.date=parseInt(c.substring(6),10);
var b=new Date();
b.setFullYear(a.year,a.month,a.date);
b.setHours(0,0,0,0);
return b
},prevDay:function(){if(this.prevBlock){return
}this.now.setFullYear(this.current_year,this.current_month,this.current_date-1);
this.setCurrentDate();
this.getData(this.current_year,this.current_month+1,this.current_date)
},nextDay:function(){if(this.nextBlock){return
}this.now.setFullYear(this.current_year,this.current_month,this.current_date+1);
this.setCurrentDate();
this.getData(this.current_year,this.current_month+1,this.current_date)
},openCalendar:function(){this.oDateLayer.css("display","none");
this.oCalendarLayer.css("display","block");
this.attr.openCalendarCallback(true)
},closeCalendar:function(){this.oDateLayer.css("display","block");
this.oCalendarLayer.css("display","none");
this.attr.openCalendarCallback(false)
},select:function(b,c,a){this.past.setFullYear(b,c-1,a);
if(this.attr.startDate){if(this.startDate.timestamp>this.past.getTime()){return
}}if(this.attr.endDate){if(this.endDate.timestamp<this.past.getTime()){return
}}this.now.setFullYear(b,c-1,a);
this.setCurrentDate();
this.getData(b,c,a)
},getData:function(b,c,a){this.attr.callback(b,c,a)
},setNow:function(){this.now=new Date();
this.setCurrentDate();
this.getData(this.current_year,this.current_month+1,this.current_date)
},isStatus:function(){return this.oCalendarLayer.css("display")=="block"
},update:function(){this.getData(this.current_year,this.current_month+1,this.current_date)
}});
var FlickingManager=jindo.$Class({_bTouch:false,_bBlockFlickingNclkEvent:false,_pContextIndex:/[?&]?contextIndex=([0-9])/,$init:function(d,b,c,a){this._sWrapperId=b;
this._initOptions(a);
this._initVar(d);
this._elFlick=jindo.$(b);
this._initPageButton(c);
this._initFlicking(this._elFlick);
if(this.nContentIndex>0||this.option("bInitSetting")){this.update()
}},_initOptions:function(a){this.option({sPanelClass:"panel",sNumAreaClass:".pg_num_area",sPrevBtnClass:".pg_btn_prev",sNextBtnClass:".pg_btn_next",nContextIndex:1,bHistoryMemory:false,bInitSetting:false,sPrevNclkCode:undefined,sNextNclkCode:undefined,nMaxPageDot:null,fCallbackAfterFlicking:function(){}});
this.option(a||{})
},_getContextIndexParam:function(){var b=document.location.href;
var a=b.match(this._pContextIndex);
if(a){return a[1]
}return null
},_initVar:function(b){this.aContentsList=b;
this._oHistoryMemory=new UserStorage({sNamespace:this._getStorageNameSpace()});
var c=this._getContextIndexParam();
if(c){this.nContentIndex=parseInt(c,10)-1;
return
}if(this.option("bHistoryMemory")&&historyManager&&(historyManager.getState()==historyManager.oStateType.back)){var a=this._oHistoryMemory.getItem("contentIndex");
if(a<=this.aContentsList.length){this.nContentIndex=this._oHistoryMemory.getItem("contentIndex")
}else{this.nContentIndex=0
}}else{this.nContentIndex=this.option("nContextIndex")-1
}},_initPageButton:function(b){var d=jindo.$Element(b);
if(!d){return
}this.nMaxPageDot=this.option("nMaxPageDot");
this.welPage=d.query(this.option("sNumAreaClass"));
var a=d.query(this.option("sPrevBtnClass"));
var c=d.query(this.option("sNextBtnClass"));
a&&a.attach("click",jindo.$Fn(this.movePrev,this).bind());
c&&c.attach("click",jindo.$Fn(this.moveNext,this).bind())
},_initFlicking:function(a){var c={nTotalContents:this.aContentsList.length,bUseCircular:true,sContentClass:this.option("sPanelClass")};
var b=this;
this.oFlicking=new jindo.m.Flicking(a,c).attach({touchStart:function(d){b._bTouch=true
},touchEnd:function(d){b._bTouch=false
},afterFlicking:function(d){if(d.bLeft){b.nContentIndex=b._getNextContentIndex(b.nContentIndex)
}else{b.nContentIndex=b._getPrevContentIndex(b.nContentIndex)
}b.update(false);
if(b._bBlockFlickingNclkEvent){b._bBlockFlickingNclkEvent=false;
return
}if(d.bLeft&&b.option("sNextNclkCode")){nclk(a,b.option("sNextNclkCode"),"","")
}else{if(b.option("sPrevNclkCode")){nclk(a,b.option("sPrevNclkCode"),"","")
}}b.option("fCallbackAfterFlicking")()
}})
},update:function(a){a=(typeof a==="boolean")?a:true;
this._updatePanel(a);
this._updatePageCtrl();
this._updateHistory()
},_updatePanel:function(b){var a=this._getPrevContentIndex(this.nContentIndex);
var c=this._getNextContentIndex(this.nContentIndex);
if(b){this.oFlicking.getElement().html(this.aContentsList[this.nContentIndex])
}this.oFlicking.getNextElement().html(this.aContentsList[c]);
this.oFlicking.getPrevElement().html(this.aContentsList[a])
},_updatePageCtrl:function(b){var g=[];
var e="";
if(this.nMaxPageDot&&this.nMaxPageDot%2==1){var f=this.aContentsList.length<this.nMaxPageDot?this.aContentsList.length:this.nMaxPageDot;
var d=this.nContentIndex;
var c=Math.floor(this.nMaxPageDot/2);
if(this.aContentsList.length>this.nMaxPageDot){if(this.nContentIndex>c&&this.nContentIndex<this.aContentsList.length-c){d=c
}else{if(this.nContentIndex>=this.aContentsList.length-c){d=this.nMaxPageDot-(this.aContentsList.length-this.nContentIndex)
}}}for(var a=0;
a<f;
a++){if(a==d){e=' <em title="현재 페이지" class="pg_num pg_num_on">'+(a+1)+"</em> "
}else{e=' <span class="pg_num">'+(a+1)+"</span>"
}g.push(e)
}}else{for(var a=0;
a<this.aContentsList.length;
a++){if(a==this.nContentIndex){e=' <em title="현재 페이지" class="pg_num pg_num_on">'+(a+1)+"</em> "
}else{e=' <span class="pg_num">'+(a+1)+"</span>"
}g.push(e)
}}if(this.welPage){this.welPage.html(g.join(""))
}},_updateHistory:function(){if(!this.option("bHistoryMemory")){return
}this._oHistoryMemory.setItem("contentIndex",this.nContentIndex)
},movePrev:function(a){if(a){a.stopDefault()
}this._bBlockFlickingNclkEvent=true;
this.oFlicking.movePrev();
this.option("fCallbackAfterFlicking")()
},moveNext:function(a){if(a){a.stopDefault()
}this._bBlockFlickingNclkEvent=true;
this.oFlicking.moveNext();
this.option("fCallbackAfterFlicking")()
},_getPrevContentIndex:function(a){a--;
if(a<0){return this.aContentsList.length-1
}return a
},_getNextContentIndex:function(a){a++;
if(a>=this.aContentsList.length){return 0
}return a
},_getStorageNameSpace:function(){return this._sWrapperId+window.location.pathname
},setContents:function(a){this.aContentsList=a;
this._updatePanel(true)
},isActivating:function(){return this.oFlicking&&this.oFlicking.isActivating()
},isTouch:function(){return this._bTouch
}}).extend(jindo.m.Component);
var OfficeHomeManager=jindo.$Class({_wePressList:null,_aGroupTitle:null,_sUserStorageName:"category_group",_oUserStorage:null,$init:function(){this._initElement();
this._attachEvent();
this._setOfficeList()
},_initElement:function(){this._wePressList=jindo.$Element(jindo.$$.getSingle(".prs_list_wrp .prs_inner"));
this._aGroupTitle=jindo.$$(".prs_list .prl_tit a",this._wePressList);
this._oUserStorage=new UserStorage({sNamespace:this._sUserStorageName})
},_attachEvent:function(){jindo.$Fn(this._toggleOfficeList,this).attach(this._aGroupTitle,"click")
},_setOfficeList:function(){var d=jindo.$$(".prs_group",this._wePressList);
for(var c=0;
c<d.length;
c++){var b=jindo.$Element(d[c]);
var a=this._oUserStorage.getItem(this._sUserStorageName+c);
if(a=="true"){b.addClass("open")
}else{if(a=="false"){b.removeClass("open")
}}}},_toggleOfficeList:function(b){b.stopDefault();
var a=jindo.$Element(b.currentElement);
var c=a.parent().parent();
c.toggleClass("open");
this._setHeight();
nclk(this,"prs.ctg","","");
this._oUserStorage.setItem(c.$value().id,c.hasClass("open"))
},_setHeight:function(){},getPressListElement:function(){return this._wePressList
},getGroupTitleArray:function(){return this._aGroupTitle
},getUserStorage:function(){return this._oUserStorage
}});
var OfficeMainManager=jindo.$Class({_bIsOpen:false,$init:function(){},_initElement:function(){this.$super._initElement();
this._wePressList=this.$super.getPressListElement();
this.weContent=jindo.$Element("contentId");
this.weWrapper=jindo.$Element(jindo.$$.getSingle(".prs_wrp",this.weContent));
this.aTabButtons=jindo.$$(".prs_btn_slide",this.weWrapper);
this.oSlideEffect=new jindo.m.LayerEffect({nDuration:280,sTransitionTimingFunction:"ease-in-out"});
this.weNewsFlash=jindo.$Element(jindo.$$.getSingle(".prs_section_wrp .prs_inner",this.weWrapper));
this.weSectionButton=jindo.$Element(jindo.$$.getSingle(".prs_select",this.weNewsFlash));
this.weSectionList=jindo.$Element(jindo.$$.getSingle(".pr_cate_list",this.weNewsFlash));
this.weContent.height(this.weNewsFlash.height()+70)
},_attachEvent:function(){this.$super._attachEvent();
jindo.$Fn(this._onload,this).attach(window,"load");
jindo.$Fn(this._toggleTab,this).attach(this.aTabButtons,"click");
jindo.$Fn(this._toggleSectionLayer,this).attach(this.weSectionButton,"click");
var a=jindo.$Fn(this._rotate,this).bind();
jindo.m.bindRotate(a)
},_onload:function(b){var a=this;
jindo.$Fn(function(){a._setFontSizeManagerCallback();
a._setHeight()
}).delay(0.3)
},_setFontSizeManagerCallback:function(){var a=this;
if(fontSizeManager&&fontSizeManager.setCallback){fontSizeManager.setCallback(function(){a._setHeight()
})
}},_setHeight:function(){var a;
if(this._bIsOpen){a=this._wePressList.height()
}else{a=this.weNewsFlash.height()
}this.weContent.height(a)
},_toggleTab:function(a){a.stopDefault();
this._bIsOpen=!this._bIsOpen;
this._setHeight();
if(this._bIsOpen){this._slide("left");
this._loadSecondAd();
nclk(this,"prs.index","","")
}else{this._slide("right");
nclk(this,"prs.close","","")
}},_slide:function(b){var a=this;
this.oSlideEffect.slide(this.weWrapper.$value(),b,{nDuration:280,sTransitionTimingFunction:"ease-in-out",nDistance:a.weNewsFlash.width()})
},_loadSecondAd:function(){if(nbp_ad&&nbp_ad.mobilenetwork){nbp_ad.mobilenetwork.ad_div_id="adw_da2";
if(jindo&&jindo.LazyLoading){jindo.LazyLoading.load(nbp_ad.mobilenetwork._url,function(){})
}}},_toggleSectionLayer:function(a){a.stopDefault();
this.weSectionButton.toggleClass("open");
this.weSectionList.toggleClass("visible");
this._setHeight();
nclk(this,"prs.sort","","")
},_rotate:function(){if(this._bIsOpen){this.weWrapper.css("left",this.weNewsFlash.width()*(-1))
}this._setHeight()
}}).extend(OfficeHomeManager);
nhn.FontSizeManager=jindo.$Class({_localStorageKey:"newsFontSize",_fontSizeStep:0,_fontSizeClass:null,_fontSizeClassList:["","bfsize1","bfsize2"],_oSmallFontSizeBox:null,_oBigFontSizeBox:null,_floatingLayer:null,_floatingLayerWidth:0,_floatingLayerHeight:0,_isBlockFloatingLayer:false,_body:null,_callback:function(){},$init:function(a){this._oStorage=new UserStorage({sNamespace:"",sStorageType:"localStorage"});
this._fontSizeClass=this._oStorage.getItem(this._localStorageKey);
this._body=jindo.$Element(document.body);
this._oSmallFontSizeBox=jindo.$Element("news_small_font");
this._oBigFontSizeBox=jindo.$Element("news_big_font");
this._floatingLayer=a;
this._initializeFontSize();
this._attachEvent();
this._displayFontButton();
this.oLayerEffect=new jindo.m.LayerEffect()
},_initializeFontSize:function(){this._deleteBodyFontClass();
if(this._fontSizeClass){if(this._fontSizeClass=="bfsize1"){this._fontSizeStep=1
}else{if(this._fontSizeClass=="bfsize2"){this._fontSizeStep=2
}}this._saveLocalStorage();
this._changeFontSize()
}else{this._fontSizeStep=0
}this._floatingLayer.show();
this._floatingLayerWidth=this._floatingLayer.width();
this._floatingLayerHeight=this._floatingLayer.height();
this._floatingLayer.hide()
},_increaseFontSize:function(){if(this._fontSizeStep==2){if(!this._isBlockFloatingLayer){this._displayFontBiggerComment("가장 큰 글자 크기 입니다.")
}this._isBlockFloatingLayer=true
}else{this._deleteBodyFontClass();
this._fontSizeStep++;
this._saveLocalStorage();
this._changeFontSize();
this._displayFontBiggerComment("글자 크기가 커졌습니다.");
this._isBlockFloatingLayer=false
}this._displayFontButton()
},_decreaseFontSize:function(){if(this._fontSizeStep===0){if(!this._isBlockFloatingLayer){this._displayFontSmallerComment("가장 작은 글자 크기 입니다.")
}this._isBlockFloatingLayer=true
}else{this._deleteBodyFontClass();
this._fontSizeStep--;
this._saveLocalStorage();
this._changeFontSize();
this._displayFontSmallerComment("글자 크기가 작아졌습니다.");
this._isBlockFloatingLayer=false
}this._displayFontButton()
},_saveLocalStorage:function(){this._oStorage.setItem(this._localStorageKey,this._fontSizeClassList[this._fontSizeStep])
},_changeFontSize:function(){this._body.addClass(this._fontSizeClassList[this._fontSizeStep])
},_displayFontButton:function(){if(this._fontSizeStep===0){this._oSmallFontSizeBox.html("<span>가-</span>");
this._oBigFontSizeBox.html("<a>가+</a>")
}else{if(this._fontSizeStep==2){this._oSmallFontSizeBox.html("<a>가-</a>");
this._oBigFontSizeBox.html("<span>가+</span>")
}else{this._oSmallFontSizeBox.html("<a>가-</a>");
this._oBigFontSizeBox.html("<a>가+</a>")
}}this._callback()
},_deleteBodyFontClass:function(){this._body.removeClass("bfsize1 bfsize2")
},_displayFontBiggerComment:function(a){this._floatingLayer.text(a);
this._showFloatingLayer()
},_displayFontSmallerComment:function(a){this._floatingLayer.text(a);
this._showFloatingLayer()
},_showFloatingLayer:function(){this._floatingLayer.css("left",this._getFloatingLayerXPosition());
var a=jindo.$("newsFontLayer");
this.oLayerEffect.fade(a,"out",{nDuration:2000,sTransitionTimingFunction:"ease-in-out"})
},_getFloatingLayerXPosition:function(){return(window.innerWidth-this._floatingLayerWidth)*0.5
},_getFloatingLayerYPosition:function(){return jindo.$Document().scrollSize().height-jindo.$Document().scrollPosition().top-jindo.$Document().clientSize().height+this._floatingLayerHeight
},_attachEvent:function(){this._oSmallFontSizeBox.attach("click",jindo.$Fn(function(a){a.stopDefault();
if(this.oLayerEffect.isPlaying()){this.oLayerEffect.stop()
}this._decreaseFontSize();
nclk(this,"fot.zout","","")
},this).bind());
this._oBigFontSizeBox.attach("click",jindo.$Fn(function(a){a.stopDefault();
if(this.oLayerEffect.isPlaying()){this.oLayerEffect.stop()
}this._increaseFontSize();
nclk(this,"fot.zin","","")
},this).bind())
},setCallback:function(a){this._callback=(typeof a==="function")?a:function(){}
}});
var NewTimeline=jindo.$Class({$init:function(c,b,a){this.attr={nDuration:110,callback:function(){},index:0,date:undefined,nclkPartName:undefined};
for(var d in a){this.attr[d]=a[d]
}this.blockFlickingNclkEvent=false;
this.componentIndexMap={};
this.scrollFlag=false;
this.timelineId=c;
this.top=jindo.$Element(c).parent();
this.oContainer=jindo.$Element(b);
this.oLi=jindo.$Element(jindo.$$.getSingle("li",jindo.$(this.timelineId)));
this.parent=this.oContainer.parent();
this.htInfo=jindo.m.getDeviceInfo();
this.setItemCount();
this.setIndex();
this._initResize();
setTimeout(jindo.$Fn(function(){this.resize()
},this).bind(),1)
},setIndex:function(){this.index=this.attr.index;
if(this.attr.date){for(var a in this.componentIndexMap){if(this.componentIndexMap[a]==this.attr.date){this.index=parseInt(a,10);
break
}}}},click:function(a){if(this.attr.nclkPartName){this.blockFlickingNclkEvent=true
}this.moveTo(a)
},moveTo:function(b){var a=Math.abs(this.index-b)+1;
var c=this.liWidth*b;
this.index=b;
if(this.scrollFlag){this.oScroll.scrollTo(c,0,this.attr.nDuration*a);
this.attr.callback(this.componentIndexMap[b])
}},setScroll:function(){this.liWidth=this.oLi.width();
this.firstPos=13;
this.oContainer.css("margin-left",this.firstPos+"px");
this.parent.width(this.itemCount*this.liWidth+this.top.width()-this.liWidth+1);
if(!this.scrollFlag&&this.parent.width()>0){this.liHeight=this.oLi.height();
this.oScroll=new jindo.m.Scroll(this.timelineId,{bUseHScroll:true,bUseVScroll:false,bUseMomentum:true,nDeceleration:0.0005,bUseScrollbar:false,nHeight:this.liHeight}).attach({touchMove:jindo.$Fn(function(a){this.blockFlickingNclkEvent=false
},this).bind(),touchEnd:jindo.$Fn(function(a){if(this.blockFlickingNclkEvent){this.blockFlickingNclkEvent=false;
nclk(this,this.attr.nclkPartName+".itlsel","","")
}else{if(this.attr.nclkPartName){nclk(this,this.attr.nclkPartName+".itlfl","","")
}}},this).bind(),afterScroll:jindo.$Fn(function(a){if(this.parent.width()===0){return
}var b=this.getIndex(a.nLeft);
this.moveTo(b)
},this).bind()});
this.scrollFlag=true
}},setItemCount:function(){var a=this.oContainer.child();
this.itemCount=0;
a.forEach(jindo.$Fn(function(d,c,e){if(d.attr("id")){var b=d.child()[0].attr("id").substring(4);
this.componentIndexMap[c]=b;
this.itemCount++
}},this).bind())
},_initResize:function(){this.resize=jindo.$Fn(function(){this.setScroll(this.timelineId);
this.moveTo(this.index)
},this).bind();
jindo.$Fn(this.resize).attach(window,"resize")
},getIndex:function(c){var b,a=0;
if(c<0&&this.htInfo.android){b=Math.abs(c)/this.liWidth;
a=Math.floor(b)
}if(c<0){b=(Math.abs(c)+this.liWidth/2)/this.liWidth;
a=Math.floor(b)
}if(a>=this.itemCount){a=this.itemCount-1
}return a
}});
var UserStorage=jindo.$Class({$static:{_bSupported:null,isSupport:function(){if(typeof UserStorage._bSupported==="boolean"){return UserStorage._bSupported
}return UserStorage._bSupported=(function(){if((typeof(window.Storage)==="undefined")){return false
}var b="storage_test_key",c=window.localStorage;
try{c.setItem(b,"1");
c.removeItem(b);
return true
}catch(a){return false
}})()
}},$init:function(a){this._initOptions(a);
this._storage=this._getInstance()
},_initOptions:function(a){this.option({sNamespace:"",sStorageType:"sessionStorage"});
this.option(a||{})
},_getInstance:function(){return UserStorage.isSupport()?(function(a){return window[a]
})(this.option("sStorageType")):(function(b){var a=jindo.$Cookie();
var c=("localStorage"===b)?365:0;
return{setItem:function(d,e){return a.set(d,e,c)
},getItem:function(d){return a.get(d)
},removeItem:function(d){return a.remove(d)
}}
})(this.option("sStorageType"))
},_getNamespace:function(){return this.option("sNamespace")?this.option("sNamespace")+"_":""
},setItem:function(a,b){this._storage.setItem(this._getNamespace()+a,b)
},getItem:function(a){return this._storage.getItem(this._getNamespace()+a)
},removeItem:function(a){this._storage.removeItem(this._getNamespace()+a)
}}).extend(jindo.m.Component);
if(typeof window.nhn==="undefined"){window.nhn={}
}(function(){function f(h,i){if(!h&&h!==false){throw new Error("Invalidate"+(!!i?i:""))
}}function d(i,h,j){if(new jindo.$Date(i).time()>=new jindo.$Date(h).time()){throw new Error("Not Before"+(!!j?j:""))
}}function e(h,i){if(!/\d{4}-\d{2}-\d{2}/.test(h)){throw new Error("Invalidate"+(!!i?i:""))
}}function b(h,i){if(!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(h)){throw new Error("Invalidate"+(!!i?i:""))
}}var c={DAYS_OF_WEEK:["sun","mon","tue","wed","thu","fri","sat"],closeDayOfWeekHasRepetition:function(j,k){for(var h=0;
h<7;
h++){if(j.repetition[c.DAYS_OF_WEEK[(k+h)%7]]===true){return h
}}throw nhn.util.CalendarRepetition.INVALID_REPETITION
},hasDayOfWeek:function(h){return jindo.$A(c.DAYS_OF_WEEK).some(function(i){return h.repetition[i]===true
})
},between:function(i,j,h){return(!!i&&!!j&&!!h&&j<=h&&i>=j&&i<=h)
}};
var g={week:function(h){if(!c.hasDayOfWeek(h)){throw new Error("Invalidate"+(!!msg?msg:""))
}},"default":function(){},instance:function(h){return !!this[h]?this[h]:this["default"]
}};
var a=jindo.$Class({instance:function(h){return !!this[h]?this[h]:this["default"]
}});
closeRepeatDay=new a();
closeRepeatDay.day=function(l,i){var j=(!!i)?new jindo.$Date(i).time():new Date().getTime();
var h=new jindo.$Date(l.startDate).time();
var k=1000*60*60*24*l.repetition.repeatCycle;
var m=j+((k-((j-h)%k))%k);
return new Date(m)
};
closeRepeatDay.week=function(n,j){var k=(!!j)?new jindo.$Date(j).time():new Date().getTime();
var i=new jindo.$Date(n.startDate);
var h=i.time();
h+=(c.closeDayOfWeekHasRepetition(n,i.day())*1000*60*60*24);
var m=1000*60*60*24*7*n.repetition.repeatCycle;
var o=k+((m-((k-h)%m))%m);
var l=jindo.$Date(o).day();
return new Date(o+c.closeDayOfWeekHasRepetition(n,l)*1000*60*60*24)
};
nhn.Schedule=jindo.$Class({$init:function(h){this._htSchedule=h
},validate:function(){f(this._htSchedule.startDate,"startDate");
b(this._htSchedule.startDate,"startDate");
f(this._htSchedule.endDate,"endDate");
b(this._htSchedule.endDate,"endDate");
d(this._htSchedule.startDate,this._htSchedule.endDate);
f(this._htSchedule.content,"content");
f(this._htSchedule.pageInfo,"pageInfo");
if(this._htSchedule.repetitive){f(this._htSchedule.repetition);
f(this._htSchedule.repetition.type);
f(this._htSchedule.repetition.repeatCycle);
f(this._htSchedule.repetition.infinite);
if(!this._htSchedule.repetition.infinite){f(this._htSchedule.repetition.endDate);
e(this._htSchedule.repetition.endDate)
}g.instance(this._htSchedule.repetition.type)(this._htSchedule)
}},_isRepetitive:function(){return !!this._htSchedule.repetitive
},_isInfinite:function(){return !!this._htSchedule.repetition.infinite
},_getCloseRepeatDay:function(h){return closeRepeatDay.instance(this._htSchedule.repetition.type)(this._htSchedule,h)
},_getRepeatEndDateTime:function(){return new jindo.$Date(this._htSchedule.repetition.endDate+this._htSchedule.startDate.substr(10)).$value()
},_getIntervalWithStartAndEndDate:function(){return new jindo.$Date(this._htSchedule.endDate).time()-new jindo.$Date(this._htSchedule.startDate).time()
},adjustedSchedule:function(i){if(!this._htSchedule.serviceCode){this._htSchedule.serviceCode="58"
}if(!this._htSchedule.pageUrl){this._htSchedule.pageUrl=location.href
}if(!this._htSchedule.alarm){this._htSchedule.notifiable=true;
this._htSchedule.alarm={serviceCode:"58",scheduleTime:"10M",mediaType:{mail:1,sms:1}}
}this._htSchedule.stickerId=this._htSchedule.stickerId||64;
this._htSchedule.isAlldaySchedule=this._htSchedule.isAlldaySchedule||false;
this._htSchedule.important=this._htSchedule.important||false;
if(!!this._isRepetitive()){var h=this._getCloseRepeatDay(i);
if(!this._isInfinite()&&h.getTime()>this._getRepeatEndDateTime().getTime()){throw new Error("")
}var j=jindo.$Date(h).format("Y-m-d H:i:00");
var k=jindo.$Date(h.getTime()+this._getIntervalWithStartAndEndDate()).format("Y-m-d H:i:00");
this._htSchedule.startDate=j;
this._htSchedule.endDate=k
}return this._htSchedule
}})
})();
if(typeof window.nhn==="undefined"){window.nhn={}
}(function(){nhn.ImageLazyLoader=jindo.$Class({$init:function(a){this.oOptions=a||{attribute:"data-src"}
},load:function(k,j){j=(typeof j==="function")?{loadAll:j}:(j||{});
var d={load:function(i){},error:function(i){},loadAll:function(i){}};
for(var b in j){d[b]=j[b]
}var l=k?k.length:0;
if(l===0){d.loadAll(k);
return
}var m=this;
function h(o,p){p();
l--;
if(l===0){d.loadAll(k)
}var i=jindo.$Element(o);
if(!i){return
}i.attr(m.oOptions.attribute,null);
i.detach("load",c);
i.detach("error",f)
}function c(i){h(i.element,function(){d.load(i.element)
})
}function f(i){h(i.element,function(){d.error(i.element)
})
}var e,g,n=[];
for(e=0,g=k.length;
e<g;
e++){var a=jindo.$Element(k[e]);
if(!a){continue
}a.attach("load",c);
a.attach("error",f);
n.push({wel:a,src_attr:a.attr(m.oOptions.attribute)})
}for(e=0,g=n.length;
e<g;
e++){n[e].wel.attr("src",n[e].src_attr)
}}}).extend(jindo.m.Component||jindo.Component)
})();
ReadingObserver={_NABOUT_RELATED_ARTICLE_HEIGHT:270,_NREADING_TIME_WEIGHT:0.015,_SHIT_URL:"/hit.json",_SRECORD_URL:"/read.json",sContentsId:null,oOptions:{sRecordPrefixUrl:"http://s.news.naver.com/article",sContentBottomId:"adw_da",oid:null,aid:null,sid:null,articleType:null},bHalf:false,bRecorded:false,nConnectionTime:null,nScrollCount:0,nBackgroundCount:0,nAboutReadingTime:1000000000,nContentHeight:10000,nMinimumScrollCount:100,start:function(b,a){this.sContentsId=b;
for(var c in a){this.oOptions[c]=a[c]
}this.nConnectionTime=this.getTime();
this._initDocumentEvent();
this._attachEvent();
this._hit()
},_initDocumentEvent:function(){if(!document.getElementsByClassName){document.getElementsByClassName=function(g){var f=new RegExp("\\b"+g+"\\b"),d=document.getElementsByTagName("*"),c=[],e=0,b;
while(b=d[e++]){if(b.className&&b.className.indexOf(g)+1){if(b.className===g){c[c.length]=b;
continue
}f.test(b.className)?(c[c.length]=b):0
}}return c
}
}},_attachEvent:function(){if(window.attachEvent){window.attachEvent("onscroll",this.bind(this._scrollEnd,this));
window.attachEvent("onload",this.bind(this._setAboutReadingTime,this))
}else{if(document.addEventListener){window.addEventListener("scroll",this.bind(this._scrollEnd,this),false);
window.addEventListener("load",this.bind(this._setAboutReadingTime,this),false)
}}},_scrollEnd:function(){if(this.bRecorded){return
}this.nScrollCount++;
this._checkReadStatus();
setTimeout(this.bind(this._reconfirm,this),3000);
this.nBackgroundCount++
},_setAboutReadingTime:function(){this.nAboutReadingTime=this._getAboutReadingTime()
},_checkReadStatus:function(){this.nContentHeight=this._getContentHeight();
this.nMinimumScrollCount=this._getMinimumScrollCount();
if(this._isPassedContents()&&this._isTimeOver()&&this._iscountedScroll()){this._recordingAll()
}},_getAboutReadingTime:function(){var a=this.$(this.sContentsId).innerHTML.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/g,"");
var c="";
var b=this.$$("link_news");
if(b.length>0){c=b[0].innerHTML.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/g,"")
}return((a.length-c.length)*this._NREADING_TIME_WEIGHT)*1000
},_getContentHeight:function(){if(this.$(this.oOptions.sContentBottomId)){return this.$(this.oOptions.sContentBottomId).offsetTop-this._NABOUT_RELATED_ARTICLE_HEIGHT-document.documentElement.clientHeight
}else{return
}},_getMinimumScrollCount:function(){return(this.nContentHeight/document.documentElement.clientHeight)
},_hit:function(){(new Image()).src=this.oOptions.sRecordPrefixUrl+this._SHIT_URL+this._getParam()
},_recordingAll:function(){(new Image()).src=this.oOptions.sRecordPrefixUrl+this._SRECORD_URL+this._getParam();
this.bRecorded=true
},_getParam:function(){var a=[];
if(this.oOptions.oid){a.push("officeId="+this.oOptions.oid)
}if(this.oOptions.aid){a.push("articleId="+this.oOptions.aid)
}if(this.oOptions.sid){a.push("sectionId="+this.oOptions.sid)
}if(this.oOptions.articleType){a.push("articleType="+this.oOptions.articleType)
}if(this.oOptions.hitRefererType){a.push("hitRefererType="+this.oOptions.hitRefererType)
}return"?"+a.join("&")
},_reconfirm:function(){this.nBackgroundCount--;
if(this.bRecorded||this.nBackgroundCount>0){return
}this._checkReadStatus()
},_isPassedContents:function(){return this.getScrollTop()>=this.nContentHeight
},_isTimeOver:function(){return(this.nConnectionTime+this.nAboutReadingTime)<=this.getTime()
},_iscountedScroll:function(){return this.nScrollCount>=this.nMinimumScrollCount
},$:function(a){return document.getElementById(a)
},$$:function(a){return document.getElementsByClassName(a)
},bind:function(a,b){return function(){a.apply(b,arguments)
}
},getScrollTop:function(){return document.all?(!document.documentElement.scrollTop?document.body.scrollTop:document.documentElement.scrollTop):(window.pageYOffset?window.pageYOffset:window.scrollY)
},getTime:function(){return(new Date()).getTime()
}};
DateCustomSelectbox=$Class({$init:function(b,a){this._assignOption(b,a);
this._assignMemberVariable();
this._attachEventListener();
this._startApplication()
},_assignOption:function(b,a){a=a||{};
a.htScroll=a.htScroll||{};
$Jindo.isBoolean(a.bSolar)?0:a.bSolar=!0;
$Jindo.isBoolean(a.htScroll.bUseScrollbar)?0:a.htScroll.bUseScrollbar=!1;
this.option(a);
this.option("elRoot",b)
},_assignMemberVariable:function(){var a=this._getToday();
this._REAL_MIN_YEAR=1898;
this._DAYS=["일","월","화","수","목","금","토"];
this._oDate=new Date();
this._nYear=a.year;
this._nMonth=a.month;
this._nDay=a.day;
this._nHour=a.hour;
this._nMinute=a.minute;
this.welRoot=$Element(this.option("elRoot"));
this.welSelector=this.welRoot.query("._selector");
this.welStatus=this.welRoot.query("._selectorText");
this.welListRoot=this.welRoot.query("._selectorLayer");
this.welTimeSelector=this.welRoot.query("._time_selector");
this.welTimeStatus=this.welRoot.query("._time_selectorText");
this.welTimeListRoot=this.welRoot.query("._time_selectorLayer");
this._aLunarMonthTable=[[2,1,5,2,2,1,2,1,2,1,2,1],[2,1,2,1,2,1,2,2,1,2,1,2],[1,2,1,1,2,1,2,5,2,2,1,2],[1,2,1,1,2,1,2,1,2,2,2,1],[2,1,2,1,1,2,1,2,1,2,2,2],[1,2,1,2,3,2,1,1,2,2,1,2],[2,2,1,2,1,1,2,1,1,2,2,1],[2,2,1,2,2,1,1,2,1,2,1,2],[1,2,2,4,1,2,1,2,1,2,1,2],[1,2,1,2,1,2,2,1,2,1,2,1],[2,1,1,2,2,1,2,1,2,2,1,2],[1,5,1,2,1,2,1,2,2,2,1,2],[1,2,1,1,2,1,2,1,2,2,2,1],[2,1,2,1,1,5,1,2,2,1,2,2],[2,1,2,1,1,2,1,1,2,2,1,2],[2,2,1,2,1,1,2,1,1,2,1,2],[2,2,1,2,5,1,2,1,2,1,1,2],[2,1,2,2,1,2,1,2,1,2,1,2],[1,2,1,2,1,2,2,1,2,1,2,1],[2,3,2,1,2,2,1,2,2,1,2,1],[2,1,1,2,1,2,1,2,2,2,1,2],[1,2,1,1,2,1,5,2,2,1,2,2],[1,2,1,1,2,1,1,2,2,1,2,2],[2,1,2,1,1,2,1,1,2,1,2,2],[2,1,2,2,3,2,1,1,2,1,2,2],[1,2,2,1,2,1,2,1,2,1,1,2],[2,1,2,1,2,2,1,2,1,2,1,1],[2,1,2,5,2,1,2,2,1,2,1,2],[1,1,2,1,2,1,2,2,1,2,2,1],[2,1,1,2,1,2,1,2,2,1,2,2],[1,5,1,2,1,1,2,2,1,2,2,2],[1,2,1,1,2,1,1,2,1,2,2,2],[1,2,2,1,1,5,1,2,1,2,2,1],[2,2,2,1,1,2,1,1,2,1,2,1],[2,2,2,1,2,1,2,1,1,2,1,2],[1,2,2,1,6,1,2,1,2,1,1,2],[1,2,1,2,2,1,2,2,1,2,1,2],[1,1,2,1,2,1,2,2,1,2,2,1],[2,1,4,1,2,1,2,1,2,2,2,1],[2,1,1,2,1,1,2,1,2,2,2,1],[2,2,1,1,2,1,4,1,2,2,1,2],[2,2,1,1,2,1,1,2,1,2,1,2],[2,2,1,2,1,2,1,1,2,1,2,1],[2,2,1,2,2,4,1,1,2,1,2,1],[2,1,2,2,1,2,2,1,2,1,1,2],[1,2,1,2,1,2,2,1,2,2,1,2],[1,1,2,4,1,2,1,2,2,1,2,2],[1,1,2,1,1,2,1,2,2,2,1,2],[2,1,1,2,1,1,2,1,2,2,1,2],[2,5,1,2,1,1,2,1,2,1,2,2],[2,1,2,1,2,1,1,2,1,2,1,2],[2,2,1,2,1,2,3,2,1,2,1,2],[2,1,2,2,1,2,1,1,2,1,2,1],[2,1,2,2,1,2,1,2,1,2,1,2],[1,2,1,2,4,2,1,2,1,2,1,2],[1,2,1,1,2,2,1,2,2,1,2,2],[1,1,2,1,1,2,1,2,2,1,2,2],[2,1,4,1,1,2,1,2,1,2,2,2],[1,2,1,2,1,1,2,1,2,1,2,2],[2,1,2,1,2,1,1,5,2,1,2,2],[1,2,2,1,2,1,1,2,1,2,1,2],[1,2,2,1,2,1,2,1,2,1,2,1],[2,1,2,1,2,5,2,1,2,1,2,1],[2,1,2,1,2,1,2,2,1,2,1,2],[1,2,1,1,2,1,2,2,1,2,2,1],[2,1,2,3,2,1,2,1,2,2,2,1],[2,1,2,1,1,2,1,2,1,2,2,2],[1,2,1,2,1,1,2,1,1,2,2,2],[1,2,5,2,1,1,2,1,1,2,2,1],[2,2,1,2,2,1,1,2,1,2,1,2],[1,2,2,1,2,1,5,2,1,2,1,2],[1,2,1,2,1,2,2,1,2,1,2,1],[2,1,1,2,2,1,2,1,2,2,1,2],[1,2,1,1,5,2,1,2,2,2,1,2],[1,2,1,1,2,1,2,1,2,2,2,1],[2,1,2,1,1,2,1,1,2,2,2,1],[2,2,1,5,1,2,1,1,2,2,1,2],[2,2,1,2,1,1,2,1,1,2,1,2],[2,2,1,2,1,2,1,5,2,1,1,2],[2,1,2,2,1,2,1,2,1,2,1,1],[2,2,1,2,1,2,2,1,2,1,2,1],[2,1,1,2,1,6,1,2,2,1,2,1],[2,1,1,2,1,2,1,2,2,1,2,2],[1,2,1,1,2,1,1,2,2,1,2,2],[2,1,2,3,2,1,1,2,2,1,2,2],[2,1,2,1,1,2,1,1,2,1,2,2],[2,1,2,2,1,1,2,1,1,5,2,2],[1,2,2,1,2,1,2,1,1,2,1,2],[1,2,2,1,2,2,1,2,1,2,1,1],[2,1,2,2,1,5,2,2,1,2,1,2],[1,1,2,1,2,1,2,2,1,2,2,1],[2,1,1,2,1,2,1,2,2,1,2,2],[1,2,1,1,5,1,2,2,1,2,2,2],[1,2,1,1,2,1,1,2,1,2,2,2],[1,2,2,1,1,2,1,1,2,1,2,2],[1,2,5,2,1,2,1,1,2,1,2,1],[2,2,2,1,2,1,2,1,1,2,1,2],[1,2,2,1,2,2,1,5,2,1,1,2],[1,2,1,2,2,1,2,1,2,2,1,2],[1,1,2,1,2,1,2,2,1,2,2,1],[2,1,1,2,3,2,2,1,2,2,2,1],[2,1,1,2,1,1,2,1,2,2,2,1],[2,2,1,1,2,1,1,2,1,2,2,1],[2,2,2,3,2,1,1,2,1,2,1,2],[2,2,1,2,1,2,1,1,2,1,2,1],[2,2,1,2,2,1,2,1,1,2,1,2],[1,5,2,2,1,2,1,2,1,2,1,2],[1,2,1,2,1,2,2,1,2,2,1,1],[2,1,2,1,2,1,5,2,2,1,2,2],[1,1,2,1,1,2,1,2,2,2,1,2],[2,1,1,2,1,1,2,1,2,2,1,2],[2,2,1,1,5,1,2,1,2,1,2,2],[2,1,2,1,2,1,1,2,1,2,1,2],[2,1,2,2,1,2,1,1,2,1,2,1],[2,1,6,2,1,2,1,1,2,1,2,1],[2,1,2,2,1,2,1,2,1,2,1,2],[1,2,1,2,1,2,1,2,5,2,1,2],[1,2,1,1,2,1,2,2,2,1,2,1],[2,1,2,1,1,2,1,2,2,1,2,2],[1,2,1,2,3,2,1,2,1,2,2,2],[1,2,1,2,1,1,2,1,2,1,2,2],[2,1,2,1,2,1,1,2,1,2,1,2],[2,1,2,5,2,1,1,2,1,2,1,2],[1,2,2,1,2,1,2,1,2,1,2,1],[2,1,2,1,2,2,1,2,1,2,1,2],[1,5,2,1,2,1,2,2,1,2,1,2],[1,2,1,1,2,1,2,2,1,2,2,1],[2,1,2,1,1,5,2,1,2,2,2,1],[2,1,2,1,1,2,1,2,1,2,2,2],[1,2,1,2,1,1,2,1,1,2,2,2],[1,2,2,1,5,1,2,1,1,2,2,1],[2,2,1,2,2,1,1,2,1,1,2,2],[1,2,1,2,2,1,2,1,2,1,2,1],[2,1,5,2,1,2,2,1,2,1,2,1],[2,1,1,2,1,2,2,1,2,2,1,2],[1,2,1,1,2,1,2,1,2,2,5,2],[1,2,1,1,2,1,2,1,2,2,2,1],[2,1,2,1,1,2,1,1,2,2,1,2],[2,2,1,2,1,4,1,1,2,2,1,2],[2,2,1,2,1,1,2,1,1,2,1,2],[2,2,1,2,1,2,1,2,1,1,2,1],[2,2,1,2,5,2,1,2,1,2,1,1],[2,1,2,2,1,2,2,1,2,1,2,1],[2,1,1,2,1,2,2,1,2,2,1,2],[1,5,1,2,1,2,1,2,2,2,1,2],[1,2,1,1,2,1,1,2,2,1,2,2],[2,1,2,1,1,2,3,2,1,2,2,2],[2,1,2,1,1,2,1,1,2,1,2,2]];
var e=this.welListRoot.query("._year");
var c=this.welListRoot.query("._month");
var f=this.welListRoot.query("._day");
this._waWelScrollWrapper=$A([e,c,f]);
this._welYearList=e.query("._list");
this._welMonthList=c.query("._list");
this._welDateList=f.query("._list");
this._oYearScroll=this._getScrollComponent(e,this._selectYear);
this._oMonthScroll=this._getScrollComponent(c,this._selectMonth);
this._oDateScroll=this._getScrollComponent(f,this._selectDate);
this._waScroll=$A([this._oYearScroll,this._oMonthScroll,this._oDateScroll]);
if(this.welTimeSelector){var b=this.welTimeListRoot.query("._hour");
var d=this.welTimeListRoot.query("._minute");
this._waWelScrollWrapper.push(b,d);
this._welHourList=b.query("._list");
this._welMinuteList=d.query("._list");
this._oHourScroll=this._getScrollComponent(b,this._selectHour);
this._oMinuteScroll=this._getScrollComponent(d,this._selectMinute);
this._waScroll.push(this._oHourScroll,this._oMinuteScroll)
}},_attachEventListener:function(){this.welSelector.attach("click",$Fn(this._onTriggerClick,this).bind(true));
$Fn(this._onCloseBtnClick,this).attach(this.welRoot.queryAll("._close"),"click");
$Fn(this._onTodayBtnClick,this).attach(this.welRoot.queryAll("._today"),"click");
if(this.welRoot.query(".hn_prev_move")){this.welRoot.query(".hn_prev").attach("click",$Fn(this._onPrevBtnClick,this).bind())
}if(this.welRoot.query(".hn_next_move")){this.welRoot.query(".hn_next").attach("click",$Fn(this._onNextBtnClick,this).bind())
}if(this.welTimeSelector){this.welTimeSelector.attach("click",$Fn(this._onTriggerClick,this).bind(false))
}},_getScrollComponent:function(a,b){return(new jindo.m.Scroll(a,this.option("htScroll"))).attach({touchStart:$Fn(function(c){this._bIsTouchStart=!0
},this).bind(),touchMove:$Fn(function(c){this._bIsTouchStart=!1
},this).bind(),touchEnd:$Fn(function(d){var c=$Element(d.oEvent.element);
this._bIsTouchStart&&c.query("! ._list")&&c.tag!="li"&&(c=c.query("! li"),b.call(this,parseInt(c.attr("data-value"),10)))
},this).bind()})
},_selectYear:function(c,a){typeof a=="undefined"?a=!0:0,this._setYear(c),this._refreshDateList(),this._oDateScroll.refresh(),this._highlightItem(this._getItemByValue(this._welYearList,c)),this._updateSelector(this.getSelectedDate()),a&&(this.fireEvent("yearSelect",{nYear:c}),this.fireEvent("updateYear",this._getDefaultEventParam()))
},_selectMonth:function(c,a){typeof a=="undefined"?a=!0:0,this._setMonth(c),this._refreshDateList(),this._oDateScroll.refresh(),this._highlightItem(this._getItemByValue(this._welMonthList,c)),this._updateSelector(this.getSelectedDate()),a&&(this.fireEvent("monthSelect",{nMonth:c}),this.fireEvent("updateMonth",this._getDefaultEventParam()))
},_selectDate:function(c,a){typeof a=="undefined"?a=!0:0,this._setDate(c),this._highlightItem(this._getItemByValue(this._welDateList,c)),this._updateSelector(this.getSelectedDate()),a&&(this.fireEvent("dateSelect",{nDate:c}),this.fireEvent("updateDay",this._getDefaultEventParam()))
},_selectHour:function(c,a){typeof a=="undefined"?a=!0:0,this._setHour(c),this._highlightItem(this._getItemByValue(this._welHourList,c)),this._updateSelector(this.getSelectedDate()),a&&(this.fireEvent("hourSelect",{nHour:c}),this.fireEvent("updateHour",this._getDefaultEventParam()))
},_selectMinute:function(c,a){typeof a=="undefined"?a=!0:0,this._setMinute(c),this._highlightItem(this._getItemByValue(this._welMinuteList,c)),this._updateSelector(this.getSelectedDate()),a&&(this.fireEvent("minuteSelect",{nMinute:c}),this.fireEvent("updateMinute",this._getDefaultEventParam()))
},getDate:function(){return{year:this._nYear,month:this._nMonth,day:this._nDay,hour:this._nHour,minute:this._nMinute}
},_getToday:function(){var a=new Date();
return{year:a.getFullYear(),month:(a.getMonth()+1),day:a.getDate(),hour:a.getHours(),minute:a.getMinutes()}
},_getPrevday:function(){this._oDate.setFullYear(this._nYear,this._nMonth-1,this._nDay);
this._oDate.setDate(this._oDate.getDate()-1);
return{year:this._oDate.getFullYear(),month:(this._oDate.getMonth()+1),day:this._oDate.getDate(),hour:this._nHour,minute:this._nMinute}
},_getNextday:function(){this._oDate.setFullYear(this._nYear,this._nMonth-1,this._nDay);
this._oDate.setDate(this._oDate.getDate()+1);
return{year:this._oDate.getFullYear(),month:(this._oDate.getMonth()+1),day:this._oDate.getDate(),hour:this._nHour,minute:this._nMinute}
},setDateParam:function(d,e,b,a,f){d<this.option("nMin")?d=this.option("nMin"):0;
d>this.option("nMax")?d=this.option("nMax"):0;
this._selectYear(d*1,!1);
e<1?e=1:0;
e>12?e=12:0;
this._selectMonth(e*1,!1);
var c=this._getLastDate(this._nYear,this._nMonth);
b<1?b=1:0;
b>c?b=c:0;
this._selectDate(b*1,!1);
if(this.welTimeSelector){a<0?a=0:0;
a>23?a=23:0;
this._selectHour(a*1,!1);
f<0?f=0:0;
f>59?f=59:0;
this._selectMinute(f*1,!1)
}this._scrollToTurnOnItems()
},setDate:function(b){b.year<this.option("nMin")?b.year=this.option("nMin"):0;
b.year>this.option("nMax")?b.year=this.option("nMax"):0;
this._selectYear(b.year*1,!1);
b.month<1?b.month=1:0;
b.month>12?b.month=12:0;
this._selectMonth(b.month*1,!1);
var a=this._getLastDate(this._nYear,this._nMonth);
b.day<1?b.day=1:0;
b.day>a?b.day=a:0;
this._selectDate(b.day*1,!1);
if(this.welTimeSelector){b.hour<0?b.hour=0:0;
b.hour>23?b.hour=23:0;
this._selectHour(b.hour*1,!1);
b.minute<0?b.minute=0:0;
b.minute>59?b.minute=59:0;
this._selectMinute(b.minute*1,!1)
}this._scrollToTurnOnItems();
return this
},showList:function(a){typeof a=="undefined"?a=!0:0;
this.welListRoot.show();
this._scrollToTurnOnItems();
a&&(this.fireEvent("showOption"),this.fireEvent("showSelector",this._getDefaultEventParam()));
return this
},hideList:function(a){typeof a=="undefined"?a=!0:0;
this.welListRoot.hide();
a&&(this.fireEvent("hideOption"),this.fireEvent("hideSelector",this._getDefaultEventParam()));
return this
},showTimeList:function(a){typeof a=="undefined"?a=!0:0;
this.welTimeListRoot.show();
this._scrollToTurnOnItems();
a&&(this.fireEvent("showOption"),this.fireEvent("showSelector",this._getDefaultEventParam()));
return this
},hideTimeList:function(a){if(this.welTimeListRoot){typeof a=="undefined"?a=!0:0;
this.welTimeListRoot.hide();
a&&(this.fireEvent("hideOption"),this.fireEvent("hideSelector",this._getDefaultEventParam()))
}return this
},getCalendarType:function(){return this.option("bSolar")
},setCalendarType:function(a){return $Jindo.isBoolean(a)?0:a=!0,this.option("bSolar",a)
},refreshDateList:function(){return this._refreshDateList(),this._oDateScroll.refresh(),this._updateSelector(this.getSelectedDate()),this
},refreshToToday:function(){return this.updateDate(this._getToday(),!1),this
},isListShowed:function(){return this.welListRoot.visible()
},updateToday:function(){this.refreshToToday()
},showOptionList:function(a){typeof a=="undefined"?a=!1:0,this.showList(a)
},hideOptionList:function(a){typeof a=="undefined"?a=!1:0,this.hideList(a)
},setAutoDay:function(){this.refreshDateList()
},updateDate:function(d,c){this.setDate(d,c)
},getSelectedDate:function(){return this.getDate()
},setSolarType:function(a){this.setCalendarType(a)
},_startApplication:function(){this._renderLists(),this._updateSelector(this.getSelectedDate()),this.option("bDisplayOption")?this.showList():this.hideList()
},_highlightItem:function(c){var a=c?c.query("! ._list .on"):null;
a?a.removeClass("on"):0,c?c.addClass("on"):0
},_updateSelector:function(a){this.welStatus.attr("datetime",a.year+"-"+this._getDoubleFigureString(a.month)+"-"+this._getDoubleFigureString(a.day));
this.welStatus.html(this._getStatusString(a));
if(this.welTimeStatus){this.welTimeStatus.attr("datetime",a.hour+":"+this._getDoubleFigureString(a.minute));
this.welTimeStatus.html(a.hour+":"+this._getDoubleFigureString(a.minute))
}},_getStatusString:function(a){this._oDate.setFullYear(a.year,a.month-1,a.day);
return a.year+"."+a.month+"."+a.day+" <em>"+this._DAYS[this._oDate.getDay()]+"</em>"
},_getDoubleFigureString:function(b){return typeof b=="string"?b.length==1?"0"+b:b:b<10?"0"+b:b
},_refreshDateList:function(){var e=this._nDay,d=this._getLastDate(this._nYear,this._nMonth),f=e>d?d:e;
this._setDate(f),this._renderDateList(1,d,f)
},_setYear:function(a){this._nYear=a
},_setMonth:function(a){this._nMonth=a
},_setDate:function(a){this._nDay=a
},_setHour:function(a){this._nHour=a
},_setMinute:function(a){this._nMinute=a
},_scrollToTurnOnItems:function(){this._waWelScrollWrapper.forEach($Fn(function(f,e,h){var g=this._waScroll.get(e);
g.refresh(),g.scrollTo(0,this._getTop(f))
},this).bind())
},_renderLists:function(){this._welYearList.html(this._getListHTML(this.option("nMin"),this.option("nMax"),this._nYear,"년"));
this._welMonthList.html(this._getListHTML(1,12,this._nMonth,"월"));
this._renderDateList(1,this._getLastDate(this._nYear,this._nMonth),this._nDay);
if(this._welHourList){this._welHourList.html(this._getListHTML(0,23,this._nHour,"시"));
this._welMinuteList.html(this._getListHTML(0,59,this._nMinute,"분"))
}},_renderDateList:function(e,d,f){this._welDateList.html(this._getListHTML(e,d,f,"일"))
},_getListHTML:function(h,f,l){var k=[],j=h,i=$Template(this.option("sOptionTpl"));
for(j;
j<=f;
j++){k.push(i.process({idx:j,keyword:l}))
}return k.join("")
},_getItemByValue:function(b,c){var a;
return $A(b.queryAll("li")).forEach(function(e,f,d){parseInt(e.attr("data-value"),10)==c&&(a=e,$A.Break())
}),a
},_getTop:function(b){var f=b.query("li.on"),c=f?f.$value().offsetTop*1:0,h=f?f.height()*1/2:0,g=b.height()*1/2,a=c>h*2?c-g+h:0;
return a
},_getDateOfLunarMonthType:function(d){var c={nMonthDate:0,nLeapMonthDate:0};
switch(d){case 1:c.nMonthDate=29,c.nLeapMonthDate=0;
break;
case 2:c.nMonthDate=30,c.nLeapMonthDate=0;
break;
case 3:c.nMonthDate=29,c.nLeapMonthDate=29;
break;
case 4:c.nMonthDate=29,c.nLeapMonthDate=30;
break;
case 5:c.nMonthDate=30,c.nLeapMonthDate=29;
break;
case 6:c.nMonthDate=30,c.nLeapMonthDate=30
}return c
},_getLastDate:function(h,g){var l=0,k,j,i,l;
if(!this.option("bSolar")){k=this._aLunarMonthTable[h-this._REAL_MIN_YEAR],j=this._getDateOfLunarMonthType(k[g-1]),l=j.nMonthDate
}else{if(g>12||g<1){i=new Date(h,g-1,1),h=i.getFullYear(),g=i.getMonth()+1
}l=0;
switch(g){case 1:case 3:case 5:case 7:case 8:case 10:case 12:l=31;
break;
case 4:case 6:case 9:case 11:l=30;
break;
case 2:h%4===0&&h%100!==0||h%400===0?l=29:l=28
}}return parseInt(l,10)
},_getDefaultEventParam:function(){return{elSelector:this.welSelector.$value(),elOption:this.welListRoot.$value()}
},_onTriggerClick:function(a,c){c.stopDefault();
var b="his_lst.";
if(location.pathname=="/historyMainPanel.nhn"){b="his_pan."
}if(a){this.welListRoot.visible()?this.hideList():(this.hideTimeList(),this.showList());
b+="date"
}else{this.welTimeListRoot.visible()?this.hideTimeList():(this.hideList(),this.showTimeList());
b+="time"
}nclk(this,b,"","");
this.fireEvent("clickSelector")
},_onCloseBtnClick:function(b){b.stopDefault();
var a="his_lst.";
if(location.pathname=="/historyMainPanel.nhn"){a="his_pan."
}if(b.element.id=="timeClose"){a+="clkok"
}else{a+="calok"
}nclk(this,a,"","");
this.fireEvent("clickClose")&&(this.hideList(),this.hideTimeList());
this.fireEvent("hideClose",{elSelector:this.welSelector.$value()});
location.href=location.pathname+"?searchYmdt="+this._generateHistoryDateFormat()
},_generateHistoryDateFormat:function(){return this._nYear+"-"+this._paddingZero(this._nMonth)+"-"+this._paddingZero(this._nDay)+" "+this._paddingZero(this._nHour)+":"+this._paddingZero(this._nMinute)
},_paddingZero:function(b){var a=b;
if(b<10){a="0"+b
}return a
},_onTodayBtnClick:function(b){b.stopDefault();
var a="his_lst.today";
if(location.pathname=="/historyMainPanel.nhn"){a="his_pan.today"
}nclk(this,a,"","");
this.updateToday();
location.href=location.pathname+"?searchYmdt="+this._generateHistoryDateFormat()
},_onPrevBtnClick:function(b){b.stopDefault();
var a="his_lst.prev";
if(location.pathname=="/historyMainPanel.nhn"){a="his_pan.prev"
}nclk(this,a,"","");
this.updateDate(this._getPrevday(),!1);
location.href=location.pathname+"?searchYmdt="+this._generateHistoryDateFormat()
},_onNextBtnClick:function(b){b.stopDefault();
var a="his_lst.next";
if(location.pathname=="/historyMainPanel.nhn"){a="his_pan.next"
}nclk(this,a,"","");
this.updateDate(this._getNextday(),!1);
location.href=location.pathname+"?searchYmdt="+this._generateHistoryDateFormat()
}}).extend(jindo.m.Component);
var SafariPageNavigation=jindo.$Class({_requestMoreLook:null,_moreLook:null,_noMoreLook:null,_moreLookArea:null,_navigationArea:null,_page:2,_url:"",_id:"",_callback:null,$init:function(d,g,c,b,e,a,f){this._requestMoreLook=d;
this._moreLook=g;
this._noMoreLook=c;
this._moreLookArea=b;
this._navigationArea=e;
this._url=a;
this._callback=f==undefined?function(){}:f
},_clickEventHandler:function(){jindo.$Element("progress").show("block");
var a=new jindo.$Ajax(this._url,{type:"xhr",method:"get",onload:jindo.$Fn(function(c){var e=this._requestMoreLook.attr("id");
var d=this._moreLook.attr("id");
this._moreLook?this._moreLookArea.remove(this._moreLook):"";
this._noMoreLook?this._moreLookArea.remove(this._noMoreLook):"";
var b=c.text().split("<!--#DELIMITER#-->");
this._moreLookArea.appendHTML(b[0]);
this._navigationArea.appendHTML(b[1]);
this._requestMoreLook=jindo.$Element(e);
this._moreLook=jindo.$Element(d);
this._requestMoreLook?this.listenClickEvent():"";
this._page++;
this._callback()
},this).bind(),async:true});
a.request({page:this._page})
},listenClickEvent:function(){jindo.$Fn(this._clickEventHandler,this).attach(this._requestMoreLook,"click")
}});
if(typeof nhn==="undefined"){nhn={}
}nhn.m=nhn.m||{};
nhn.m.news=nhn.m.news||{};
(function(){nhn.m.news.ScrollChangeDetecter=jindo.$Class({$init:function(){this._welDoc=jindo.$Document();
this._oPosition=this._welDoc.scrollPosition();
this._attachEvents()
},_attachEvents:function(){var a=jindo.$Fn(this._onScrollHandler,this).bind();
var b=jindo.$Fn(this._onResizeHandler,this).bind();
if(nhn.m.news.util.isMobileTablet()){new jindo.m.ScrollEnd().attach("scrollEnd",a);
jindo.m.bindRotate(b)
}else{jindo.$Element(document).attach("scroll",a);
jindo.$Element(window).attach("resize",b)
}},_onScrollHandler:function(){this.fireEvent("scroll",{});
this._fireScrollChangedEvent()
},_onResizeHandler:function(){this.fireEvent("resize",{});
this._fireScrollChangedEvent()
},_fireScrollChangedEvent:function(){var a=this._oPosition,c=this._welDoc.scrollPosition();
var b=(a.top!==c.top||a.left!==c.left);
if(b){this.fireEvent("scrollChanged",{prevPosition:a,position:c,changed:b});
this._oPosition=c
}}}).extend(jindo.m.Component)
})(nhn.m.news);
if(typeof nhn==="undefined"){nhn={}
}nhn.m=nhn.m||{};
nhn.m.news=nhn.m.news||{};
(function(){nhn.m.news.ElementInViewportFinder=jindo.$Class({$init:function(c,b){this.wel=jindo.$Element(c);
var a={};
this.option(a);
this.option(b||{});
this._attachEvents()
},_attachEvents:function(){new nhn.m.news.ScrollChangeDetecter().attach("scrollChanged",jindo.$Fn(function(a){if(this.isVisibleInViewport()){this.fireEvent("find",{el:this.wel.$value()})
}},this).bind())
},isVisibleInViewport:function(){return this.wel&&this.wel.visible()&&nhn.m.news.util.isExistInViewportHeight(this.wel.$value())
}}).extend(jindo.m.Component)
})(nhn.m.news);
nhn.m.news.ResWebFontSizeManager=jindo.$Class({STORAGE_KEY:"newsFontSize",FONTSIZE_CLASSLIST:jindo.$A(["","bfsize1","bfsize2"]),$init:function(c,b){this._welBody=jindo.$Element(document.body);
this._welBase=jindo.$Element(c);
this._oOption=b;
this._welNotifyLayer=this._welBase.query(".lyr_fsize");
this._welFontSize=this._welBase.query(".r_footer_fontsize");
this._oLayerEffect=new jindo.m.LayerEffect().attach({afterEffect:jindo.$Fn(function(d){jindo.$Element(d.elLayer).hide()
},this).bind()});
this.oUserStorage=new UserStorage({sStorageType:"localStorage"});
this._welTrigger=this._welFontSize.query(".fsize_trigger");
this._waTriggerbuttonList=jindo.$A(this._welFontSize.queryAll("li"));
var a=this.oUserStorage.getItem(this.STORAGE_KEY)||this.FONTSIZE_CLASSLIST.get(0);
this._nFontSizeStep=Math.max(0,this.FONTSIZE_CLASSLIST.indexOf(a));
this._changeFontSizeByStep(this._nFontSizeStep);
this._attachEvent()
},_attachEvent:function(){this._welFontSize.attach({"click@.smaller_size":jindo.$Fn(function(b){b.stopDefault();
var a=this._nFontSizeStep-1;
this._notifyMinFontSizeMsgLayer(a);
this._changeFontSizeByStep(a)
},this).bind(),"click@.bigger_size":jindo.$Fn(function(b){b.stopDefault();
var a=this._nFontSizeStep+1;
this._notifyMinFontSizeMsgLayer(a);
this._changeFontSizeByStep(a)
},this).bind(),"click@li[data-size]":jindo.$Fn(function(b){b.stopDefault();
var a=parseInt(jindo.$Element(b.element).data("size"),10);
this._notifyMinFontSizeMsgLayer(a);
this._changeFontSizeByStep(a)
},this).bind()})
},_changeFontSizeByStep:function(a){a=Math.min(2,Math.max(0,a));
this._nFontSizeStep=a;
this.oUserStorage.setItem(this.STORAGE_KEY,this.FONTSIZE_CLASSLIST.get(this._nFontSizeStep));
this._displayFontButton(this._nFontSizeStep)
},_displayFontButton:function(a){this._welBody.removeClass(this.FONTSIZE_CLASSLIST.$value().join(" "));
this._welBody.addClass(this.FONTSIZE_CLASSLIST.get(a));
var b=["{if step <= 0}<span class='smaller_size'>가-</span>{else}<a href='#' class='smaller_size' onclick='nclk(this, \"{=prefix}.fctext\",\"\",\"\")'>가-</a>{/if}","{if step >= 2}<span class='bigger_size'>가+</span>{else}<a href='#' class='bigger_size' onclick='nclk(this, \"{=prefix}.fctext\",\"\",\"\");'>가+</a>{/if}"].join("");
this._welTrigger.html(jindo.$Template(b).process({step:a,prefix:this._oOption.prefix}));
this._waTriggerbuttonList.forEach(function(c,d,e){c[(d===a)?"addClass":"removeClass"]("on")
})
},_notifyMinFontSizeMsgLayer:function(a){a=Math.min(2,Math.max(0,a));
var b="";
if(a===this._nFontSizeStep){b=(a===0)?"가장 작은 글자 크기 입니다.":"가장 큰 글자 크기 입니다."
}else{b=(a<this._nFontSizeStep)?"글자 크기가 작아졌습니다.":"글자 크기가 커졌습니다."
}this._oLayerEffect.stop();
this._welNotifyLayer.html(b).show().css("left",(window.innerWidth-this._welNotifyLayer.width())/2);
this._oLayerEffect.fade(this._welNotifyLayer.$value(),"out",{nDuration:1500,sTransitionTimingFunction:"ease-in-out"})
}});
var PullDownEffect=jindo.$Class({$init:function(a,b){this.option({initMargin:-50});
this.option(b||{});
this._initElement(a);
this._attachEvent()
},_initElement:function(a){this._welBase=jindo.$Element(a);
this._welFrontMoreBar=this._welBase.query(".r_more");
this._oTouch=new jindo.m.Touch(a);
this._oMorph=new jindo.m.Morph({fEffect:jindo.m.Effect.linear});
this._doc=jindo.$Document()
},_attachEvent:function(){var a=this;
this._oTouch.attach({touchStart:function(b){a._touchStart()
},touchEnd:function(b){a.up()
},touchMove:function(b){a._pullDown(b)
}})
},_touchStart:function(){this._isActivate=this._doc.scrollPosition().top<=2
},_pullDown:function(b){var a=parseInt(this._welFrontMoreBar.css("margin-top"));
if(!this._oMorph.isPlaying()&&this._isActivate&&b.nDistanceY>10&&a<=-10){b.oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
this._welFrontMoreBar.css("margin-top",(a+10)+"px")
}},up:function(){var a=parseInt(this._welFrontMoreBar.css("margin-top"));
if(a<=this.option("initMargin")){return
}if(a>=0){this._welFrontMoreBar.css("margin-top","-10px");
this._welFrontMoreBar.removeClass("r_more_stop");
this._welFrontMoreBar.addClass("r_more_load");
this._welFrontMoreBar.html("<p>새로고침 중</p>");
this._oMorph.pushWait(600)
}this._oMorph.pushAnimate(100,[this._welFrontMoreBar,{"@marginTop":this.option("initMargin")+"px"}]);
if(a>=0){var b=this;
this._oMorph.pushCall(function(){b.fireEvent("afterPullDown")
})
}else{this._oMorph.pushCall(jindo.$Fn(this._endUp,this))
}this._oMorph.play()
},_endUp:function(){this._welFrontMoreBar.removeClass("r_more_load");
this._welFrontMoreBar.addClass("r_more_stop");
this._welFrontMoreBar.html("<p>업데이트하려면 당겼다 놓으세요.</p>");
this._oMorph.clear()
},setInitMargin:function(a){this.option("initMargin",a);
this._welFrontMoreBar.css("margin-top",a+"px")
}}).extend(jindo.Component);
var NewsHomeManager=jindo.$Class({oHTML:['<div class="r_group{if className} {=className}{/if}"><div class="r_group_lft"><ul class="r_news_normal">',"{for num:each in list}","{if num < leftSize}",'<li{if each.isNew} class="animate"{/if}>',"<a class=\"r_news_drw\" href=\"{=each.linkUrl}\" onclick=\"nclk(this,'hom.card','00000{=each.officeId}_00000000000000{=each.articleId}','{=num+1}');\">","{if each.viewPhoto}",'<div class="r_news_im">','<img src="{=each.imageUrl}?type=nf154_120" width="77" height="60" alt="{=each.title}">','{if each.videoType}<span class="r_ico r_vod">동영상뉴스</span>{/if}',"</div>","{/if}",'<div class="r_news_tx">','<span class="r_news_tit"><strong>{=each.title}</strong></span>','<span class="r_ico_b r_modify">{=each.serviceTimeForCardList}</span><em class="r_press">{=each.officeName}</em>',"</div>","</a>","</li>","{/if}","{/for}","</ul></div>",'<div class="r_group_rgt"><ul class="r_news_normal">',"{for num:each in list}","{if num >= leftSize}",'<li{if each.isNew} class="animate"{/if}>',"<a class=\"r_news_drw\" href=\"{=each.linkUrl}\" onclick=\"nclk(this,'hom.card','00000{=each.officeId}_00000000000000{=each.articleId}','{=num+1}');\">","{if each.viewPhoto}",'<div class="r_news_im">','<img src="{=each.imageUrl}?type=nf154_120" width="77" height="60" alt="{=each.title}">','{if each.videoType}<span class="r_ico r_vod">동영상뉴스</span>{/if}',"</div>","{/if}",'<div class="r_news_tx">','<span class="r_news_tit"><strong>{=each.title}</strong></span>','<span class="r_ico_b r_modify">{=each.serviceTimeForCardList}</span><em class="r_press">{=each.officeName}</em>',"</div>","</a>","</li>","{/if}","{/for}",'</ul></div><div class="r_group_cl"></div></div>'].join(""),oOmbudsmanNoticeHTML:['<div class="r_footer_noti">','<a href="/ombudsman/noticeread.nhn?notiId={=ombudsmanNotice.notiId }"><strong>공지</strong> {=ombudsmanNotice.notiTitle }</a>',"</div>"].join(""),$init:function(a){this._initElement(a)
},_initElement:function(a){this._welBase=jindo.$Element(a);
this._weMoreBar=jindo.$Element("moreLoad");
this._welFrontMoreBar=this._welBase.query(".r_more");
this._welAdBox=this._welBase.query(".ad_box");
this._welPopular=this._welBase.query("._popular");
this._welMemo=this._welBase.query("._memo");
this._welFooter=this._welBase.query(".r_group_footer");
this._welSectionNavi=this._welBase.query(".section_list_box");
this._oAjax=new jindo.$Ajax("/mainNews/moreMainNews.json",{onload:jindo.$Fn(this._viewContents,this).bind()});
this._tpl=jindo.$Template(this.oHTML);
this._oPullDown=new PullDownEffect(a,{initMargin:parseInt(this._welFrontMoreBar.css("margin-top"),10)}).attach({afterPullDown:jindo.$Fn(this._frontAction,this).bind()});
this._nPage=2;
this._nPageSize=20;
this._oFirstArticle={articleId:this._welBase.data("first-articleid"),officeId:this._welBase.data("first-officeid")};
this._oLastArticle={articleId:this._welBase.data("last-articleid"),officeId:this._welBase.data("last-officeid"),itemId:this._welBase.data("last-itemid")};
var b=new nhn.m.news.ElementInViewportFinder(this._weMoreBar);
b.attach({find:jindo.$Fn(this._action,this).bind()});
jindo.m.bindPageshow(jindo.$Fn(function(d){var c=(d._event.persisted)?0.5:0;
jindo.$Fn(function(){if(b.isVisibleInViewport()){this._action()
}},this).delay(c)
},this).bind())
},_frontAction:function(){nclk(this,"hom.pulldown","","");
location.href="/home.nhn?serviceTime="+this._welBase.data("servicetime")
},_action:function(){if(this._oAjax.isIdle()){nclk(this,"hom.scroll","",this._nPage);
this._oAjax.request({articleId:this._oLastArticle.articleId,officeId:this._oLastArticle.officeId,pageSize:this._nPageSize,page:this._nPage,itemId:this._oLastArticle.itemId})
}},_viewContents:function(d){var e=d.json().message;
var a=e.itemList;
this._oPullDown.up();
if(e.success==false||a.length==0){this._weMoreBar.hide();
return
}this._oLastArticle=a[a.length-1];
if(e.page==1){if(!a[0]["new"]){return
}this._resetContents();
this._welFrontMoreBar.afterHTML(this._tpl.process({list:a,leftSize:10}));
this._oFirstArticle=a[0];
var f=this._welBase.queryAll(".r_group");
if(this._welAdBox){f[f.length-1].after(this._welAdBox)
}if(this._welPopular){f[f.length-1].after(this._welPopular)
}}else{if(e.page==2){this._weMoreBar.beforeHTML(this._tpl.process({list:a,leftSize:10}));
var f=this._welBase.queryAll(".r_group");
if(this._welMemo){f[f.length-1].after(this._welMemo.show("block"))
}}else{if(e.page==3){var b=e.ombudsmanNotice;
this._weMoreBar.beforeHTML(this._tpl.process({list:a,leftSize:10}));
var f=this._welBase.queryAll(".r_group");
if(this._welFooter){f[f.length-1].after(this._welFooter.show("block"));
if(b){var c=jindo.$Template(this.oOmbudsmanNoticeHTML).process({ombudsmanNotice:b});
this._welFooter.appendHTML(c)
}}}else{if(e.page==4){this._weMoreBar.beforeHTML(this._tpl.process({list:a,leftSize:10}));
var f=this._welBase.queryAll(".r_group");
if(this._welSectionNavi){f[f.length-1].after(this._welSectionNavi.show("block"))
}}else{this._weMoreBar.beforeHTML(this._tpl.process({list:a,leftSize:10}))
}}}}this._nPage=e.page+1
},_resetContents:function(){this._welMemo.hide();
this._welFooter.hide();
jindo.$A(this._welBase.queryAll(".r_group")).forEach(function(c,d,b){c.leave()
})
},});
(function(b){var a=jindo.$Class({$static:{TEMPLATES:{MAINNEWS_WRAP_TPL:'<div class="r_group"></div>',MAINNEWS_LIST_TPL:'<div class="r_group_lft">					<div class="r_sect_box">					<div class="r_main_box">					<ul class="r_news_normal">					{set leftItemList = (=articles.slice(0,10))}					{for idx:item in leftItemList}					<li>					<a class="r_news_drw" href="{=item.linkUrl}" onclick="nclk(this,\'{js =nclkprefix}.card\',\'00000{=item.officeId}_00000000000000{=item.articleId}\',\'{js =idx+1}\');">					{if item.imageUrl}					<div class="r_news_im">					<img src="{=item.imageUrl}?type=nf154_120" width="77" height="60" alt="{=item.title}">					{if item.videoType}<span class="r_ico r_vod">동영상뉴스</span>{/if}					</div>					{/if}					<div class="r_news_tx">					<span class="r_news_tit"><strong>{=item.title}</strong></span>					<span class="r_ico_b r_modify">{=item.serviceTimeForCardList}</span><em class="r_press">{=item.officeName}</em>					</div>					</a>					</li>					{/for}					</ul>					</div>					</div>					</div>					<div class="r_group_rgt">					<div class="r_sect_box">					<div class="r_main_box">					<ul class="r_news_normal">					{set rightItemList = (=articles.slice(10,20))}					{for idx:item in rightItemList}					<li>					<a class="r_news_drw" href="{=item.linkUrl}" onclick="nclk(this,\'{js =nclkprefix}.card\',\'00000{=item.officeId}_00000000000000{=item.articleId}\',\'{js =idx+1}\');">					{if item.imageUrl}					<div class="r_news_im">					<img src="{=item.imageUrl}?type=nf154_120" width="77" height="60" alt="{=item.title}">					{if item.videoType}<span class="r_ico r_vod">동영상뉴스</span>{/if}					</div>					{/if}					<div class="r_news_tx">					<span class="r_news_tit"><strong>{=item.title}</strong></span>					<span class="r_ico_b r_modify">{=item.serviceTimeForCardList}</span><em class="r_press">{=item.officeName}</em>					</div>					</a>					</li>					{/for}					</ul>					</div>					</div>					</div>					<div class="r_group_cl"></div>'}},$init:function(m){var c=jindo.$Element(document.body).queryAll(".r_group:not([data-empty])");
var e=1+c.length;
for(var f=0;
f<e;
f++){jindo.$ElementList(jindo.$Element(document.body).queryAll("*[data-groupindex="+f+"]")).show("block")
}var h=m.wel.container;
var l=m.wel.moreLoad;
var j=m.api.params;
var g=new jindo.$Ajax(m.api.url,{onload:jindo.$Fn(function(p){var o=p.json().message;
if(!o||!o.success){l.hide();
return
}var r=o.contents;
if(r.articles.length===0){l.hide();
return
}var s=jindo.$Element(document.body).queryAll(".r_group[data-empty]");
var n=s[0];
if(!n){n=jindo.$Element(jindo.$Template(a.TEMPLATES.MAINNEWS_WRAP_TPL).process({}));
jindo.$Element("moreLoad").before(n)
}var i=jindo.$Template(a.TEMPLATES.MAINNEWS_LIST_TPL).process({articles:r.articles,nclkprefix:m.nclkprefix});
n.html(i);
n.attr("data-empty",null);
var q=jindo.$Element(document.body).queryAll("*[data-groupindex="+e+"]");
jindo.$ElementList(q).show("block");
j.itemId=r.articles[r.articles.length-1].itemId;
j.componentId=r.componentId;
e++
},this).bind()});
function d(){if(g.isIdle()){nclk(this,m.nclkprefix+".scroll","",e);
g.request(j)
}}var k=new nhn.m.news.ElementInViewportFinder(l);
k.attach({find:function(i){d()
}});
jindo.m.bindPageshow(function(n){var i=(n._event.persisted)?0.5:0;
jindo.$Fn(function(){if(k.isVisibleInViewport()){d()
}}).delay(i)
})
}});
b.SectionHomeManager=a
})(window);
(function(b){var a=jindo.$Class({$static:{TEMPLATES:{ISSUEGROUP_WRAP_TPL:'<div class="r_group"></div>',ISSUEGROUP_LIST_TPL:'<div class="r_group_lft">					<div class="r_sect_box">						<div class="r_main_box">						<ul class="r_news_normal">							{set sliceValue = (=articles.length / 2)}							{if (sliceValue%1) > 0}								{set sliceValue = (=sliceValue - (=sliceValue%1) + 1)}							{/if}							{set leftItemList = (=articles.slice(0,=sliceValue))}							{for idx:item in leftItemList}							<li{if item.lineOfDate} class="fir"{/if}>								{if item.lineOfDate}<strong class="r_news_h">{=item.lineOfDate}</strong>{/if}								<a class="r_news_drw" href="{=item.linkUrl}" onclick="nclk(this,\'{js =nclkprefix}.tlist\',\'00000{=item.officeId}_00000000000000{=item.articleId}\',\'{js =idx+1}\');">									{if item.imageUrl}									<div class="r_news_im">										<img src="{=item.imageUrl}?type=nf154_120" width="77" height="60" alt="{=item.title}">										{if item.videoType}<span class="r_ico r_vod">동영상뉴스</span>{/if}									</div>									{/if}									<div class="r_news_tx">										<span class="r_news_tit"><strong>{=item.title}</strong></span>										<span class="r_ico_b r_modify">{=item.serviceTimeForCardList}</span><em class="r_press">{=item.officeName}</em>									</div>								</a>							</li>							{/for}						</ul>						</div>						</div>					</div>					<div class="r_group_rgt">						<div class="r_sect_box">						<div class="r_main_box">						<ul class="r_news_normal">							{set rightItemList = (=articles.slice(=sliceValue,20))}							{for idx:item in rightItemList}							<li{if item.lineOfDate} class="fir"{/if}>								{if item.lineOfDate}<strong class="r_news_h">{=item.lineOfDate}</strong>{/if}								<a class="r_news_drw" href="{=item.linkUrl}" onclick="nclk(this,\'{js =nclkprefix}.tlist\',\'00000{=item.officeId}_00000000000000{=item.articleId}\',\'{js =idx+1}\');">									{if item.imageUrl}									<div class="r_news_im">										<img src="{=item.imageUrl}?type=nf154_120" width="77" height="60" alt="{=item.title}">										{if item.videoType}<span class="r_ico r_vod">동영상뉴스</span>{/if}									</div>									{/if}									<div class="r_news_tx">										<span class="r_news_tit"><strong>{=item.title}</strong></span>										<span class="r_ico_b r_modify">{=item.serviceTimeForCardList}</span><em class="r_press">{=item.officeName}</em>									</div>								</a>							</li>							{/for}						</ul>						</div>						</div>					</div>					<div class="r_group_cl"></div>',ENTERTAINMENT_ISSUEGROUP_LIST_TPL:'<div class="r_group_lft">						<div class="r_sect_box">							<ul class="block">								{set sliceValue = (=articles.length / 2)}								{if (sliceValue%1) > 0}									{set sliceValue = (=sliceValue - (=sliceValue%1) + 1)}								{/if}								{set leftItemList = (=articles.slice(0,=sliceValue))}								{for idx:item in leftItemList}								<li class="type_b">									<a href="{=item.linkUrl}" onclick="nclk(this,\'{js =nclkprefix}.tlist\',\'00000{=item.officeId}_00000000000000{=item.articleId}\',\'{js =idx+1}\');">										<b class="case_elip">{=item.title}<span class="by">{=item.officeName}</span></b>									</a>									{if item.imageUrl}									<a href="{=item.linkUrl}" onclick="nclk(this,\'{js =nclkprefix}.tlist\',\'00000{=item.officeId}_00000000000000{=item.articleId}\',\'{js =idx+1}\');">										<img src="{=item.imageUrl}?type=nf104" width="60" height="60" alt="{=item.title}" class="size10">										{if item.videoType}<span class="mov"><span class="u_vc">[동영상]</span></span>{/if}										{if item.photoSlideOpt == \'Y\'}<span class="pht"><span class="u_vc">포토 슬라이드</span></span>{/if}									</a>									{/if}								</li>								{/for}							</ul>							</div>						</div>						<div class="r_group_rgt">							<div class="r_sect_box">							<ul class="block">								{set rightItemList = (=articles.slice(=sliceValue,20))}								{for idx:item in rightItemList}								<li class="type_b">									<a href="{=item.linkUrl}" onclick="nclk(this,\'{js =nclkprefix}.tlist\',\'00000{=item.officeId}_00000000000000{=item.articleId}\',\'{js =idx+1}\');">										<b class="case_elip">{=item.title}<span class="by">{=item.officeName}</span></b>									</a>									{if item.imageUrl}									<a href="{=item.linkUrl}" onclick="nclk(this,\'{js =nclkprefix}.tlist\',\'00000{=item.officeId}_00000000000000{=item.articleId}\',\'{js =idx+1}\');">										<img src="{=item.imageUrl}?type=nf104" width="60" height="60" alt="{=item.title}" class="size10">										{if item.videoType}<span class="mov"><span class="u_vc">[동영상]</span></span>{/if}										{if item.photoSlideOpt == \'Y\'}<span class="pht"><span class="u_vc">포토 슬라이드</span></span>{/if}									</a>									{/if}								</li>								{/for}							</ul>							</div>						</div>						<div class="r_group_cl"></div>'}},$init:function(q){var c=jindo.$Element(document.body).queryAll(".r_group:not([data-empty])");
var g=1+c.length;
for(var h=0;
h<g;
h++){jindo.$ElementList(jindo.$Element(document.body).queryAll("*[data-groupindex="+h+"]")).show("block")
}var m=q.wel.container;
var p=q.wel.moreLoad;
var d=q.wel.moreCopymsg;
var k=true;
var l=q.api.params;
var e=jindo.$Element(document.body).query(".ico_hotissue");
var o="aiscroll";
if(!!e&&e.text().indexOf("연재")>-1){o="asscroll"
}var j=new jindo.$Ajax(q.api.url,{onload:jindo.$Fn(function(t){var s=t.json().message;
if(!s||!s.success){p.hide();
d.hide();
return
}var u=s.contents;
if(u.articles.length===0){p.hide();
d.hide();
return
}var v=jindo.$Element(document.body).queryAll(".r_group[data-empty]");
var r=v[0];
if(!r){r=jindo.$Element(jindo.$Template(SectionHomeManager.TEMPLATES.MAINNEWS_WRAP_TPL).process({}));
jindo.$Element("moreLoad").before(r)
}var i=jindo.$Template((s.section=="ENTERTAINMENTS")?a.TEMPLATES.ENTERTAINMENT_ISSUEGROUP_LIST_TPL:a.TEMPLATES.ISSUEGROUP_LIST_TPL).process({articles:u.articles,nclkprefix:q.nclkprefix});
r.html(i);
if(s.contents.pageNavigation.displayedCount>=s.contents.pageNavigation.totalCount){k=false;
jindo.$Element("moreLoad").hide();
jindo.$Element("moreCopymsg").hide();
return
}l.itemId=u.articles[u.articles.length-1].itemId;
l.componentId=u.componentId;
g++
},this).bind()});
function f(){if(j.isIdle()){j.request(l)
}}var n=new nhn.m.news.ElementInViewportFinder(p);
n.attach({find:function(i){nclk(this,q.nclkprefix+"."+o,"","");
f()
}});
jindo.m.bindPageshow(function(r){var i=(r._event.persisted)?0.5:0;
jindo.$Fn(function(){if(n.isVisibleInViewport()){f()
}}).delay(i)
})
}});
b.IssueGroupManager=a
})(window);
nhn.FlashAudioPlayer=$Class({_term:0,_uniqid:"mp3_swf",_mp3_url:null,_document_id:null,_flash_obj:"/statics/tts/mp3_nhn.swf",$static:{supportFlash:function(){return((typeof navigator.plugins!=="undefined"&&typeof navigator.plugins["Shockwave Flash"]==="object")||(typeof window.ActiveXObject!=="undefined"&&(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))!==false))
}},$init:function(b){var a=this;
this._document_id=b;
this._uniqid="mp3_swf";
this._loadFlash();
window.flashSoundStart=function(){a.fireEvent("start")
};
window.flashSoundEnd=function(){a.fireEvent("end")
}
},_loadFlash:function(){var a={};
a.wmode="window";
a.bgColor="#888888";
a.allowAccessScript="always";
nhn.FlashObject.show(this._document_id,this._flash_obj,this._uniqid,1,1,a)
},_getFlash:function(){return nhn.FlashObject.find(this._uniqid)
},play:function(a){this._mp3_url=a;
try{this._getFlash().callback_play(this._mp3_url)
}catch(b){}},resume:function(){try{if(!this._mp3_url){this._mp3_url=""
}this._getFlash().callback_play(this._mp3_url)
}catch(a){}},pause:function(){try{this._getFlash().callback_pause()
}catch(a){}},stop:function(){try{this._getFlash().callback_stop()
}catch(a){}},setTerm:function(a){try{if(typeof a!=="undefined"){this._term=a
}this._getFlash().flashSetTerm(this._term)
}catch(b){}}}).extend(jindo.Component);
nhn.Html5AudioPlayer=jindo.$Class({$static:{canPlayMp3:function(){var b=document.createElement("audio");
return !!(b.canPlayType&&b.canPlayType("audio/mpeg;").replace(/no/,""))
}},$init:function(){this.playing=false;
this.loading=false;
this.loaded=false;
this.stoped=false;
this.playCount=0;
this.term=0;
var b=(document.createDocumentFragment)?document.createDocumentFragment():document.createElement("div");
var a=document.createElement("div");
a.id="nhn_html_stack";
b.appendChild(a);
a.innerHTML="<audio></audio>";
this.audio=a.firstChild;
this._hTimeout=null;
this._loopTimeout=null;
this._attachEvents()
},play:function(a){this._mp3_url=a;
this.pause();
this.playCount=0;
this.stoped=false;
this._loadAudio()
},resume:function(){this.loading=true;
this.playing=false;
this.audio.play()
},pause:function(){this.stoped=true;
this._clearLoopTimeout();
if(this.loading||this.playing){this.audio.pause();
this._playEnd()
}},stop:function(){this.stoped=true;
this._clearLoopTimeout();
this.audio.src="";
this.loaded=false;
this.audio.load();
this.loading=false;
this.playing=false;
this._playEnd()
},setTerm:function(a){if(typeof a!=="undefined"){this.term=a
}},_loadAudio:function(){this.loaded=false;
if(this._mp3_url==""){this.audio.pause();
this._playEnd()
}else{if(this.audio.src!==this._mp3_url||!this.loaded){this.audio.src=this._mp3_url;
this.loaded=false;
this.audio.load();
this.loading=true;
this.playing=false;
this._delayLoading()
}else{try{this.audio.currentTime=0
}catch(a){}this.loading=true;
this.playing=false;
this.audio.play()
}}},_attachEvents:function(){jindo.$Fn(this._canplay,this).attach(this.audio,"canplay");
jindo.$Fn(this._load,this).attach(this.audio,"loadstart");
jindo.$Fn(this._playStart,this).attach(this.audio,"play");
jindo.$Fn(this._playEnd,this).attach(this.audio,"ended");
jindo.$Fn(this._playError,this).attach(this.audio,"error");
jindo.$Fn(this._playWait,this).attach(this.audio,"waiting");
if(!this._btnStatusTimeout){this._btnStatusTimeout=setInterval(jindo.$Fn(function(){if(this.audio.ended===true&&!this.loading&&this.playing){this._playEnd()
}},this).bind(),300)
}},_canplay:function(){if(0.1>this.audio.volume){this.audio.volume=1
}this.audio.play()
},_load:function(){this.loading=true
},_playStart:function(){this.loading=false;
this.playing=true;
this.loaded=true;
this.playCount++;
if(this.playCount==1){this.fireEvent("start")
}},_playWait:function(){this.audio.pause();
this._playEnd()
},_playError:function(a){this.audio.pause();
this._playEnd()
},_playEnd:function(a){this.loading=false;
this.playing=false;
this.fireEvent("end");
sendToJavaScript("end")
},_clearLoopTimeout:function(){if(this._loopTimeout!==null){clearTimeout(this._loopTimeout);
this._loopTimeout=null;
this._playEnd()
}},_clearTimeout:function(){if(this._hTimeout!==null){clearTimeout(this._hTimeout);
this._hTimeout=null
}},_delayLoading:function(){this._clearTimeout();
this._hTimeout=setTimeout(jindo.$Fn(function(){if(this.loading&&!this.playing){alert("로딩이 지연되었습니다.\n다시 시도해 주시기 바랍니다.");
this._playEnd()
}},this).bind(),30000)
}}).extend(jindo.Component);
nhn.NewsTTSPlayer=$Class({_localStorageKey:"playbackRate",_tts_url:"http://tts.news.naver.net/mp3/",_lang_code:"en",_start_comment:"이동통신망을 이용하여 음성을 재생하면 별도의 데이터 통화료가 부과될 수 있습니다.",_end_comment:"음성 서비스가 제공중입니다. 종료하시겠습니까?",_player:null,_tts_btn_male:null,_tts_btn_female:null,_playback_rate:null,_documentId:null,_office_id:null,_article_id:null,_service_date:null,_gender_type:null,$init:function(a){this.RATE_TYPE={MAX:6,MIN:2,DEFAULT:4};
this._document_id=a.document_id;
this._office_id=a.office_id;
this._article_id=a.article_id;
this._service_date=a.service_date;
if(typeof a.tts_url!="undefined"){this._tts_url=a.tts_url+"/mp3/"
}this._player=nhn.Html5AudioPlayer.canPlayMp3()?new nhn.Html5AudioPlayer():(nhn.FlashAudioPlayer.supportFlash()?new nhn.FlashAudioPlayer(this._document_id):null);
this._tts_box=$Element($$.getSingle(".tts_box"));
this._tts_btn_male=$Element("tts_btn_male");
this._tts_btn_female=$Element("tts_btn_female");
this._tts_btn_spd=$Element($$.getSingle(".tts_btn_spd"));
if(this._service_date>=20130501){this._tts_btn_spd.addClass("tts_btn_on");
this._playback_rate=parseInt(window.localStorage.getItem(this._localStorageKey),10);
this._playback_rate=isNaN(this._playback_rate)?this.RATE_TYPE.DEFAULT:this._playback_rate;
this._playback_rate=Math.min(this.RATE_TYPE.MAX,Math.max(this.RATE_TYPE.MIN,this._playback_rate));
this._setPlaybackRate($A($$(".spdbar_btn")).get(this._playback_rate/2-1))
}this._attachEvents()
},stop:function(){if(this._tts_btn_male.hasClass("tts_btn_on")||this._tts_btn_female.hasClass("tts_btn_on")){if(confirm(this._end_comment)){this._player.stop();
this._tts_btn_male.removeClass("tts_btn_on");
this._tts_btn_female.removeClass("tts_btn_on")
}}},play:function(e,d,a){var b=[this._tts_url,this._office_id,"_",this._service_date,"/",this._article_id].join("");
var c=this._tts_btn_male.hasClass("tts_btn_on");
var f=this._tts_btn_female.hasClass("tts_btn_on");
if(d){this._playback_rate=parseInt(d,10)
}this._gender_type=e;
b=[b,"_",this._lang_code,"_",this._gender_type,((this._playback_rate===this.RATE_TYPE.DEFAULT||!this._playback_rate)?"":this._playback_rate),".mp3"].join("");
if(this._gender_type=="m"){if(c){if(a){if(confirm("재생속도를 변경하시겠습니까? 다시 처음으로 돌아갑니다.")){this.stopSilent();
this._player.play(b);
this._tts_btn_male.addClass("tts_btn_on");
return true
}}else{this.stop()
}}else{if(f){if(confirm("남성 음성으로 변경하시겠습니까? 다시 처음으로 돌아갑니다.")){this.stopSilent();
this._player.play(b);
this._tts_btn_male.addClass("tts_btn_on");
nclk(this,"art.mtts","","")
}}else{if(!a&&confirm(this._start_comment)){this._player.play(b);
this._tts_btn_male.addClass("tts_btn_on");
nclk(this,"art.mtts","","")
}else{return true
}}}}else{if(this._gender_type=="f"){if(f){if(a){if(confirm("재생속도를 변경하시겠습니까? 다시 처음으로 돌아갑니다.")){this.stopSilent();
this._player.play(b);
this._tts_btn_female.addClass("tts_btn_on");
return true
}}else{this.stop()
}}else{if(c){if(confirm("여성 음성으로 변경하시겠습니까? 다시 처음으로 돌아갑니다.")){this.stopSilent();
this._player.play(b);
this._tts_btn_female.addClass("tts_btn_on");
nclk(this,"art.wtts","","")
}}else{if(!a&&confirm(this._start_comment)){this._player.play(b);
this._tts_btn_female.addClass("tts_btn_on");
nclk(this,"art.wtts","","")
}else{return true
}}}}else{if(!a){alert("남성/여성을 선택하여 주시기 바랍니다.")
}else{return true
}}}},_buttonOn:function(){if(maleOnBtn){this._tts_btn_male.addClass("tts_btn_on");
return true
}else{if(femaleOnBtn){this._tts_btn_female.addClass("tts_btn_on");
return true
}else{return false
}}},_buttonOff:function(){maleOnBtn=this._tts_btn_male.hasClass("tts_btn_on");
femaleOnBtn=this._tts_btn_female.hasClass("tts_btn_on");
if(maleOnBtn){this._tts_btn_male.removeClass("tts_btn_on");
return true
}else{if(femaleOnBtn){this._tts_btn_female.removeClass("tts_btn_on");
return true
}else{return false
}}},pause:function(){if(this._buttonOff()){this._player.pause()
}},resume:function(){if(this._buttonOn()){this._player.resume()
}},stopSilent:function(){this._player.pause();
this._tts_btn_male.removeClass("tts_btn_on");
this._tts_btn_female.removeClass("tts_btn_on")
},end:function(){this.stopSilent()
},_controlLayer:function(){this._tts_box.toggleClass("lyr_spd_open");
this._tts_btn_spd.toggleClass("tts_btn_open")
},controlSpeed:function(a){this._playback_rate=a.value;
if(this.play(this._gender_type,this._playback_rate,true)){this._setPlaybackRate(a)
}},_attachEvents:function(){this._tts_btn_male.attach("click",$Fn(function(a){a.stopDefault();
this.play("m")
},this).bind());
this._tts_btn_female.attach("click",$Fn(function(a){a.stopDefault();
this.play("f")
},this).bind());
if($$.getSingle(".tts_btn_spd.tts_btn_on")){$Element($$.getSingle(".tts_btn_spd.tts_btn_on")).attach("click",$Fn(function(a){a.stopDefault();
this._controlLayer()
},this).bind());
$Element($$.getSingle(".tts_spdbar")).delegate("click",".spdbar_btn",$Fn(function(a){this.controlSpeed(a.element)
},this).bind())
}},_setPlaybackRate:function(a){this._initPlaybackRate();
var b=$Element(a);
b.addClass("sbb_on");
var c=b.html();
b.html(c+" 현재속도");
window.localStorage.setItem(this._localStorageKey,this._playback_rate)
},_initPlaybackRate:function(){var a=$Element($$.getSingle(".sbb_on"));
a.removeClass("sbb_on");
var b=a.html();
a.html(b.substring(0,2))
}}).extend(jindo.Component);
var setNotFoundTvImage=function(b,a,c){jindo.$(b).src="${env.staticImageDomain}news/m/2011/renew/preparing_97x60.png";
jindo.$(b).onerror=""
};
var HeadlineFlickingManager=jindo.$Class({$init:function(e,a,d,c,b){this._initOptions(b);
this.aContentsList=e;
this.aTitleList=a;
this.sContentId=d;
this.sTitleId=c;
this._bBlockFlickingNclkEvent=false;
this.nContentIndex=this.oOptions.nContextIndex-1;
this._initElements();
this._initFlicking();
this._initButton();
this.update();
this._initAutoPlay()
},_initOptions:function(a){this.oOptions={bAutoPlay:true,nAutoDuration:5,sPrevBtnClass:".prev",sNextBtnClass:".next",sPageClass:".cnt",pageTemplate:"<span>{=PAGE}</span> / <span>{=max}</span>",nContextIndex:1,sPanelClass:"panel",sNclkPrev:undefined,sNclkNext:undefined};
for(var b in a){this.oOptions[b]=a[b]
}},_initElements:function(){this.oFlick=jindo.$(this.sContentId);
this.oPage=jindo.$Element(jindo.$$.getSingle(this.oOptions.sPageClass,this.oFlick))
},_initFlicking:function(){var a=this;
this.oFlicking=new jindo.m.Flicking(this.oFlick,{bUseCircular:true,sContentClass:this.oOptions.sPanelClass}).attach({afterFlicking:function(b){if(b.bLeft){a.nContentIndex=a._getNextContentIndex(a.nContentIndex);
if(a._bBlockFlickingNclkEvent){a._bBlockFlickingNclkEvent=false
}else{if(a.oOptions.sNclkNext){nclk(this,a.oOptions.sNclkNext,"","")
}}}else{a.nContentIndex=a._getPrevContentIndex(a.nContentIndex);
if(a._bBlockFlickingNclkEvent){a._bBlockFlickingNclkEvent=false
}else{if(a.oOptions.sNclkPrev){nclk(this,a.oOptions.sNclkPrev,"","")
}}}a.update();
if(a.oOptions.bAutoPlay){a._nLastMotionTimes=(new Date()).getTime()
}}});
if(this.oOptions.bAutoPlay){this.oFlicking.attach({touchStart:function(b){clearInterval(a.nAutoPlayIntervalId);
if(a.nTouchMoveCheckId===0){a.nTouchMoveCheckId=setInterval(jindo.$Fn(function(){if((new Date()).getTime()>=(a._nLastMotionTimes+300)){a._watchTouch();
clearInterval(a.nTouchMoveCheckId);
a.nTouchMoveCheckId=0
}},a).bind(),100)
}},touchMove:function(b){a._nLastMotionTimes=(new Date()).getTime()
}})
}},_initButton:function(){var b=jindo.$$(this.oOptions.sPrevBtnClass,this.oFlick);
if(b.length===0){b=jindo.$$(this.oOptions.sPrevBtnClass,jindo.$Element(this.sContentId).parent())
}jindo.$Fn(function(){this._bBlockFlickingNclkEvent=true;
this.oFlicking.movePrev()
},this).attach(b,"click");
var a=jindo.$$(this.oOptions.sNextBtnClass,this.oFlick);
if(a.length===0){a=jindo.$$(this.oOptions.sNextBtnClass,jindo.$Element(this.sContentId).parent())
}jindo.$Fn(function(){this._bBlockFlickingNclkEvent=true;
this.oFlicking.moveNext()
},this).attach(a,"click")
},_initAutoPlay:function(){if(this.oOptions.bAutoPlay){this.nTouchMoveCheckId=0;
this.nAutoDuration=this.oOptions.nAutoDuration*1000;
this.startPlay()
}},_watchTouch:function(){clearInterval(this.nAutoPlayIntervalId);
this.nAutoPlayIntervalId=setInterval(jindo.$Fn(function(){if(((new Date()).getTime()>=(this._nLastMotionTimes+this.nAutoDuration))&&this.oOptions.bAutoPlay){this._bBlockFlickingNclkEvent=true;
this.oFlicking.moveNext()
}},this).bind(),500)
},startPlay:function(){this._nLastMotionTimes=(new Date()).getTime();
this._watchTouch()
},stopPlay:function(){clearInterval(this.nAutoPlayIntervalId)
},setContents:function(c,a,b){if(typeof b!=="undefined"){this.nContentIndex=b
}this.aContentsList=c;
this.aTitleList=a;
this.update()
},setNclk:function(b,a){this.oOptions.sPrevBtnClass=b;
this.oOptions.sNextBtnClass=a
},update:function(){this._updatePanel();
this._updatePageCtrl();
this._updateTitle()
},_updatePanel:function(){var a=this._getPrevContentIndex(this.nContentIndex);
var b=this._getNextContentIndex(this.nContentIndex);
this.oFlicking.getElement().html(this.aContentsList[this.nContentIndex]);
this.oFlicking.getNextElement().html(this.aContentsList[b]);
this.oFlicking.getPrevElement().html(this.aContentsList[a])
},_updatePageCtrl:function(){if(!this.oPage){return
}var a=jindo.$Template(this.oOptions.pageTemplate).process({PAGE:this.nContentIndex+1,max:this.aContentsList.length});
this.oPage.html(a)
},_updateTitle:function(){jindo.$Element(this.sTitleId).replace(this.aTitleList[this.nContentIndex])
},_getPrevContentIndex:function(a){a--;
if(a<0){return this.aContentsList.length-1
}return a
},_getNextContentIndex:function(a){a++;
if(a>=this.aContentsList.length){return 0
}return a
}});
