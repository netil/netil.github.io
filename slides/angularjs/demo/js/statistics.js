if(typeof nclk=="undefined"){nclk={}
}if(!g_pid){var g_pid=""
}if(!g_sid){var g_sid=""
}if(!ccsrv){var ccsrv="cc.naver.com"
}if(!nsc){var nsc="Mnews.v2"
}nclk.vs="0.1.6";
nclk.md="cc";
nclk.pt=(window.location.protocol=="https:")?"https:":"http:";
nclk.ct=0;
nclk.gct=0;
nclk.ec=encodeURIComponent;
nclk.st=0;
if(window.g_ssc!=undefined&&window.g_query!=undefined){nclk.st=1
}else{nclk.st=0
}nclk.iss=(navigator.userAgent.toLowerCase().indexOf("safari")!=-1?true:false);
function nclk(r,i,m,t,s,l){var q,o,a;
var g=window.event;
if(!s){s=0
}if(!l){l=""
}q=nclk.m(r,s);
a=nclk.gl(i,m,t,"",0,nclk.st,l);
o=nclk.l(r,a);
if(q==1&&nclk.iss&&g.preventDefault){g.preventDefault();
nclk.sd(o,function(){nclk.go(r)
})
}else{nclk.sd(o)
}return true
}nclk.l=function(i,f){var g,h,j;
if(i&&i.href){h=i.tagName.toLowerCase();
j=i.href.toLowerCase();
if(j&&j.indexOf(nclk.pt+"//"+ccsrv)==0){g=i.href
}else{if(j&&j.indexOf(nclk.pt+"//"+ccsrv)!=0&&h&&h!="img"){g=f+"&u="+nclk.ec(i.href)
}}return g
}return f+"&u=about%3Ablank"
};
nclk.m=function(k,m){var i,j,l,n,h;
if(m==1){i=0
}else{if(k.href){j=k.tagName.toLowerCase();
l=k.href.toLowerCase();
n=k.target;
h=k.getAttribute("href",2);
if((n&&n!="_self"&&n!="_top"&&n!="_parent")||(l.indexOf("javascript:")!=-1)||(h&&h.charAt(0)=="#")||(l.indexOf("#")!=-1&&(l.substr(0,k.href.indexOf("#"))==document.URL))||j=="img"){i=0
}else{i=1
}}else{i=0
}}return i
};
nclk.sd=function(h,l){var k=0;
var i;
if(nclk.ct>0){var f=new Date().getTime();
h+="&nt="+f
}if(typeof l=="function"){k=1
}var j=new Image();
j.src=h;
j.onload=function(){if(i){clearTimeout(i)
}if(k){l()
}j.onload=null;
return
};
if(k){i=setTimeout(function(){l()
},5000)
}nclk.ct++
};
nclk.gl=function(o,m,g,n,a,l,i){if(a==undefined){a=1
}if(l==undefined){l=0
}if(!i){i=""
}var p=nclk.pt+"//"+ccsrv+"/"+nclk.md+"?a="+o+"&r="+g+"&i="+m+"&m="+a;
if(l==1){p+="&ssc="+g_ssc+"&q="+nclk.ec(g_query)+"&s="+g_sid+"&p="+g_pid+"&g="+i
}else{p+="&nsc="+nsc
}return p
};
nclk.al=function(f,d){var e=window;
if(e.addEventListener){e.addEventListener(f,d,false)
}else{if(e.attachEvent){e.attachEvent("on"+f,d)
}}};
nclk.oo="";
nclk.of="";
if("onpageshow" in window){nclk.al("pageshow",function(){nclk.oo.onclick=nclk.of
})
}nclk.go=function(f){var d=f.onclick;
f.onclick="";
nclk.oo=f;
nclk.of=d;
if(document.createEvent){var e=document.createEvent("MouseEvents");
e.initMouseEvent("click",false,true,window,0,0,0,0,0,false,false,false,false,0,null);
f.dispatchEvent(e)
}else{if(document.createEventObject){f.fireEvent("onclick")
}}f.onclick=d
};
function nclkR(a,g,f,h){window.location.href=nclk.gl(a,g,f,h,1,nclk.st)
}function nclkF(j,i,h,f){var a=nclk.gl(j,i,h,"about%3Ablank",0,nclk.st);
nclk.sd(a,f)
}function nclkTF(f,k,j,i,h){var a=nclk.gl(k,j,i,"about%3Ablank",0,nclk.st);
nclk.sd(nclk.l(f,a),h)
};
(function(f){var h,d,g=f.document;
if(typeof BMR==="undefined"){BMR={}
}if(BMR.v){return
}h={v:"t5",cN:"BMR=",bU:"",aL:function(a,b){if(f.addEventListener){f.addEventListener(a,b,false)
}else{if(f.attachEvent){f.attachEvent("on"+a,b)
}}},sT:function(){h.sC({s:new Date().getTime(),r:g.URL.replace(/#.*/,""),r2:g.referrer.replace(/#.*/,"")})
},eU:function(a){return encodeURIComponent(a)
},sC:function(b){var a="",c;
for(c in b){if(b.hasOwnProperty(c)){a+="&"+h.eU(c)+"="+h.eU(b[c])
}}a=a.replace(/^&/,"");
g.cookie=h.cN+a+"; path=/; domain="+f.location.hostname.replace(/.*?([^.]+\.[^.]+)\.?$/,"$1").toLowerCase()
},gC:function(){var c,e=g.cookie+";",i,l,a,b={};
if(!((c=e.indexOf(h.cN))>=0)){return null
}c+=h.cN.length;
i=e.substring(c,e.indexOf(";",c)).split("&");
if(i.length===0){return null
}for(c=0,l=i.length;
c<l;
c++){a=i[c].split("=");
a.push("");
b[decodeURIComponent(a[0])]=decodeURIComponent(a[1])
}return b
},run:function(a){if(!a){return
}var b=function(){if(h.sT){h.sT.call()
}h.sT=null
};
h.bU=a;
if("onpagehide" in f){h.aL("pagehide",b)
}else{h.aL("unload",b);
h.aL("beforeunload",b)
}h.aL(("onpageshow" in f)?"pageshow":"load",function(){h.done.call()
})
},done:function(){var c,e,j=g.URL.replace(/#.*/,""),a=r2=g.referrer.replace(/#.*/,""),b=h.gC();
h.sC({});
if(b!=null){a=b.r;
if(a==r2&&(a!=b.r2||a!=j)){e=new Date().getTime()-parseInt(b.s,10);
j=h.bU+"?v="+h.v+"&t="+e+"&u="+h.eU(j)+"&r="+h.eU(a);
(new Image()).src=j
}}}};
for(d in h){if(h.hasOwnProperty(d)){BMR[d]=h[d]
}}}(window));
var lcs_add={};
var lcs_ver="v0.4.15.m";
var lcs_cnt=0;
function lcs_do(c){if(!window.lcs_SerName){window.lcs_SerName="lcs.naver.com"
}var d="";
var h;
var j=document;
var b=window.location;
try{var g=(b.protocol?b.protocol:"http:")+"//"+window.lcs_SerName+"/m?"
}catch(i){return
}try{d=g+"u="+encodeURIComponent(b.href)+"&e="+(j.referrer?encodeURIComponent(j.referrer):"")
}catch(i){}try{if(typeof lcs_add.i=="undefined"){lcs_add.i=""
}for(var h in lcs_add){if(typeof lcs_add[h]!="function"){d+="&"+h+"="+encodeURIComponent(lcs_add[h])
}}for(var h in c){if((h.length>=3&&(typeof c[h]!="function"))||h=="qy"){d+="&"+h+"="+encodeURIComponent(c[h])
}}if(lcs_cnt>0){var a=(new Date).getTime();
d+="&ts="+a
}d+="&EOU";
var f=(new Image());
f.src=d;
f.onload=function(){f.onload=null;
return
};
lcs_cnt++
}catch(i){return
}}function lcs_do_gdid(b,a){try{if(b){lcs_add.i=b;
if(a){lcs_do(a)
}else{lcs_do()
}}}catch(c){}};
var historyManager={oStateType:{first:1,back:2,refresh:3},_state:null,init:function(c,a){this._sReferrerHistoryName=c+"_referrer";
this._sCurrentHistoryName=c+"_currrent";
this._sReferrer=a;
var d=window.sessionStorage.getItem(this._sReferrerHistoryName);
var b=window.sessionStorage.getItem(this._sCurrentHistoryName);
if(!d||!b){this._initStorage();
this._state=this.oStateType.first;
return
}this._definitionHistoryObject();
this._oReferrerHistory=new this._oHistory(d);
this._oCurrentHistory=new this._oHistory(b);
this._checkHistory()
},getState:function(){return this._state
},_checkHistory:function(){if(this._isBackEvent()){this._removeLastInfoInStorage();
this._state=this.oStateType.back
}else{if(this._isRefreshEvent()){this._state=this.oStateType.refresh
}else{if(this._isMainAccess()){this._initStorage();
this._state=this.oStateType.first
}else{this._addCurrentInfoToStorage();
this._state=this.oStateType.first
}}}},_setReferrerHistory:function(a){window.sessionStorage.setItem(this._sReferrerHistoryName,a)
},_setCurrentHistory:function(a){window.sessionStorage.setItem(this._sCurrentHistoryName,a)
},_initStorage:function(){this._setReferrerHistory(this._sReferrer);
this._setCurrentHistory(window.location.href)
},_removeLastInfoInStorage:function(){this._oReferrerHistory.pop();
this._oCurrentHistory.pop();
this._setReferrerHistory(this._oReferrerHistory.valueOf());
this._setCurrentHistory(this._oCurrentHistory.valueOf())
},_addCurrentInfoToStorage:function(){this._oReferrerHistory.add(this._sReferrer);
this._oCurrentHistory.add(window.location.href);
this._setReferrerHistory(this._oReferrerHistory.valueOf());
this._setCurrentHistory(this._oCurrentHistory.valueOf())
},_isBackEvent:function(){var b=this._oReferrerHistory.get();
var a=this._oCurrentHistory.get();
if(!this._sReferrer&&(window.location.href==b)){return true
}return(window.location.href==b)&&(this._oCurrentHistory.size()>1)&&(window.location.href==this._oCurrentHistory.get(this._oCurrentHistory.size()-2))&&(a!=this._sReferrer)
},_isRefreshEvent:function(){var b=this._oReferrerHistory.get();
var a=this._oCurrentHistory.get();
return(b==this._sReferrer)&&(a==window.location.href)
},_isMainAccess:function(){return this._sReferrer.indexOf("m.naver.com")>0
},_definitionHistoryObject:function(){this._oHistory=function(a){this._sSplitMark="@||@";
if((a=="")||!a){this._aData=[]
}else{this._aData=a.split(this._sSplitMark)
}};
this._oHistory.prototype.push=function(a){this._aData.push(a)
},this._oHistory.prototype.add=function(a){this.push(a)
},this._oHistory.prototype.get=function(a){if((a==undefined)||(a==null)){return this._aData[this._aData.length-1]
}return this._aData[a]
},this._oHistory.prototype.pop=function(){return this._aData.pop()
},this._oHistory.prototype.remove=function(){this.pop()
},this._oHistory.prototype.size=function(){return this._aData.length
},this._oHistory.prototype.valueOf=function(){return this._aData.join(this._sSplitMark)
}
}};
