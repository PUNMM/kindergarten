/* flex gap 运行时检测（旧版内核兼容）
   实测支持后给 <html> 加 .supports-flex-gap，CSS 增强层清零 margin 基线、由 gap 接管 */
(function(){
  try{
    var d = document;
    var el = d.createElement('div');
    el.style.cssText = 'display:flex;flex-direction:column;row-gap:1px;width:10px;height:auto';
    var a = d.createElement('div'); a.style.height = '0';
    var b = d.createElement('div'); b.style.height = '0';
    el.appendChild(a); el.appendChild(b);
    d.body.appendChild(el);
    var ok = (el.scrollHeight === 1);
    d.body.removeChild(el);
    if(ok){ d.documentElement.classList.add('supports-flex-gap'); }
  }catch(e){}
})();

/* ===== 二维码存档依赖库（内联，无外部资源）===== */
var qrcode=function(){var t=function(t,r){var e=t,n=g[r],o=null,i=0,a=null,u=[],f={},c=function(t,r){o=function(t){for(var r=new Array(t),e=0;e<t;e+=1){r[e]=new Array(t);for(var n=0;n<t;n+=1)r[e][n]=null}return r}(i=4*e+17),l(0,0),l(i-7,0),l(0,i-7),s(),h(),d(t,r),e>=7&&v(t),null==a&&(a=p(e,n,u)),w(a,r)},l=function(t,r){for(var e=-1;e<=7;e+=1)if(!(t+e<=-1||i<=t+e))for(var n=-1;n<=7;n+=1)r+n<=-1||i<=r+n||(o[t+e][r+n]=0<=e&&e<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==e||6==e)||2<=e&&e<=4&&2<=n&&n<=4)},h=function(){for(var t=8;t<i-8;t+=1)null==o[t][6]&&(o[t][6]=t%2==0);for(var r=8;r<i-8;r+=1)null==o[6][r]&&(o[6][r]=r%2==0)},s=function(){for(var t=B.getPatternPosition(e),r=0;r<t.length;r+=1)for(var n=0;n<t.length;n+=1){var i=t[r],a=t[n];if(null==o[i][a])for(var u=-2;u<=2;u+=1)for(var f=-2;f<=2;f+=1)o[i+u][a+f]=-2==u||2==u||-2==f||2==f||0==u&&0==f}},v=function(t){for(var r=B.getBCHTypeNumber(e),n=0;n<18;n+=1){var a=!t&&1==(r>>n&1);o[Math.floor(n/3)][n%3+i-8-3]=a}for(n=0;n<18;n+=1){a=!t&&1==(r>>n&1);o[n%3+i-8-3][Math.floor(n/3)]=a}},d=function(t,r){for(var e=n<<3|r,a=B.getBCHTypeInfo(e),u=0;u<15;u+=1){var f=!t&&1==(a>>u&1);u<6?o[u][8]=f:u<8?o[u+1][8]=f:o[i-15+u][8]=f}for(u=0;u<15;u+=1){f=!t&&1==(a>>u&1);u<8?o[8][i-u-1]=f:u<9?o[8][15-u-1+1]=f:o[8][15-u-1]=f}o[i-8][8]=!t},w=function(t,r){for(var e=-1,n=i-1,a=7,u=0,f=B.getMaskFunction(r),c=i-1;c>0;c-=2)for(6==c&&(c-=1);;){for(var g=0;g<2;g+=1)if(null==o[n][c-g]){var l=!1;u<t.length&&(l=1==(t[u]>>>a&1)),f(n,c-g)&&(l=!l),o[n][c-g]=l,-1==(a-=1)&&(u+=1,a=7)}if((n+=e)<0||i<=n){n-=e,e=-e;break}}},p=function(t,r,e){for(var n=A.getRSBlocks(t,r),o=b(),i=0;i<e.length;i+=1){var a=e[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var u=0;for(i=0;i<n.length;i+=1)u+=n[i].dataCount;if(o.getLengthInBits()>8*u)throw"code length overflow. ("+o.getLengthInBits()+">"+8*u+")";for(o.getLengthInBits()+4<=8*u&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*u||(o.put(236,8),o.getLengthInBits()>=8*u));)o.put(17,8);return function(t,r){for(var e=0,n=0,o=0,i=new Array(r.length),a=new Array(r.length),u=0;u<r.length;u+=1){var f=r[u].dataCount,c=r[u].totalCount-f;n=Math.max(n,f),o=Math.max(o,c),i[u]=new Array(f);for(var g=0;g<i[u].length;g+=1)i[u][g]=255&t.getBuffer()[g+e];e+=f;var l=B.getErrorCorrectPolynomial(c),h=k(i[u],l.getLength()-1).mod(l);for(a[u]=new Array(l.getLength()-1),g=0;g<a[u].length;g+=1){var s=g+h.getLength()-a[u].length;a[u][g]=s>=0?h.getAt(s):0}}var v=0;for(g=0;g<r.length;g+=1)v+=r[g].totalCount;var d=new Array(v),w=0;for(g=0;g<n;g+=1)for(u=0;u<r.length;u+=1)g<i[u].length&&(d[w]=i[u][g],w+=1);for(g=0;g<o;g+=1)for(u=0;u<r.length;u+=1)g<a[u].length&&(d[w]=a[u][g],w+=1);return d}(o,n)};f.addData=function(t,r){var e=null;switch(r=r||"Byte"){case"Numeric":e=M(t);break;case"Alphanumeric":e=x(t);break;case"Byte":e=m(t);break;case"Kanji":e=L(t);break;default:throw"mode:"+r}u.push(e),a=null},f.isDark=function(t,r){if(t<0||i<=t||r<0||i<=r)throw t+","+r;return o[t][r]},f.getModuleCount=function(){return i},f.make=function(){if(e<1){for(var t=1;t<40;t++){for(var r=A.getRSBlocks(t,n),o=b(),i=0;i<u.length;i++){var a=u[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var g=0;for(i=0;i<r.length;i++)g+=r[i].dataCount;if(o.getLengthInBits()<=8*g)break}e=t}c(!1,function(){for(var t=0,r=0,e=0;e<8;e+=1){c(!0,e);var n=B.getLostPoint(f);(0==e||t>n)&&(t=n,r=e)}return r}())},f.createTableTag=function(t,r){t=t||2;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+(r=void 0===r?4*t:r)+"px;",e+='">',e+="<tbody>";for(var n=0;n<f.getModuleCount();n+=1){e+="<tr>";for(var o=0;o<f.getModuleCount();o+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+t+"px;",e+=" height: "+t+"px;",e+=" background-color: ",e+=f.isDark(n,o)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>"},f.createSvgTag=function(t,r,e,n){var o={};"object"==typeof arguments[0]&&(t=(o=arguments[0]).cellSize,r=o.margin,e=o.alt,n=o.title),t=t||2,r=void 0===r?4*t:r,(e="string"==typeof e?{text:e}:e||{}).text=e.text||null,e.id=e.text?e.id||"qrcode-description":null,(n="string"==typeof n?{text:n}:n||{}).text=n.text||null,n.id=n.text?n.id||"qrcode-title":null;var i,a,u,c,g=f.getModuleCount()*t+2*r,l="";for(c="l"+t+",0 0,"+t+" -"+t+",0 0,-"+t+"z ",l+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',l+=o.scalable?"":' width="'+g+'px" height="'+g+'px"',l+=' viewBox="0 0 '+g+" "+g+'" ',l+=' preserveAspectRatio="xMinYMin meet"',l+=n.text||e.text?' role="img" aria-labelledby="'+y([n.id,e.id].join(" ").trim())+'"':"",l+=">",l+=n.text?'<title id="'+y(n.id)+'">'+y(n.text)+"</title>":"",l+=e.text?'<description id="'+y(e.id)+'">'+y(e.text)+"</description>":"",l+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',l+='<path d="',a=0;a<f.getModuleCount();a+=1)for(u=a*t+r,i=0;i<f.getModuleCount();i+=1)f.isDark(a,i)&&(l+="M"+(i*t+r)+","+u+c);return l+='" stroke="transparent" fill="black"/>',l+="</svg>"},f.createDataURL=function(t,r){t=t||2,r=void 0===r?4*t:r;var e=f.getModuleCount()*t+2*r,n=r,o=e-r;return I(e,e,(function(r,e){if(n<=r&&r<o&&n<=e&&e<o){var i=Math.floor((r-n)/t),a=Math.floor((e-n)/t);return f.isDark(a,i)?0:1}return 1}))},f.createImgTag=function(t,r,e){t=t||2,r=void 0===r?4*t:r;var n=f.getModuleCount()*t+2*r,o="";return o+="<img",o+=' src="',o+=f.createDataURL(t,r),o+='"',o+=' width="',o+=n,o+='"',o+=' height="',o+=n,o+='"',e&&(o+=' alt="',o+=y(e),o+='"'),o+="/>"};var y=function(t){for(var r="",e=0;e<t.length;e+=1){var n=t.charAt(e);switch(n){case"<":r+="&lt;";break;case">":r+="&gt;";break;case"&":r+="&amp;";break;case'"':r+="&quot;";break;default:r+=n}}return r};return f.createASCII=function(t,r){if((t=t||1)<2)return function(t){t=void 0===t?2:t;var r,e,n,o,i,a=1*f.getModuleCount()+2*t,u=t,c=a-t,g={"██":"█","█ ":"▀"," █":"▄","  ":" "},l={"██":"▀","█ ":"▀"," █":" ","  ":" "},h="";for(r=0;r<a;r+=2){for(n=Math.floor((r-u)/1),o=Math.floor((r+1-u)/1),e=0;e<a;e+=1)i="█",u<=e&&e<c&&u<=r&&r<c&&f.isDark(n,Math.floor((e-u)/1))&&(i=" "),u<=e&&e<c&&u<=r+1&&r+1<c&&f.isDark(o,Math.floor((e-u)/1))?i+=" ":i+="█",h+=t<1&&r+1>=c?l[i]:g[i];h+="\n"}return a%2&&t>0?h.substring(0,h.length-a-1)+Array(a+1).join("▀"):h.substring(0,h.length-1)}(r);t-=1,r=void 0===r?2*t:r;var e,n,o,i,a=f.getModuleCount()*t+2*r,u=r,c=a-r,g=Array(t+1).join("██"),l=Array(t+1).join("  "),h="",s="";for(e=0;e<a;e+=1){for(o=Math.floor((e-u)/t),s="",n=0;n<a;n+=1)i=1,u<=n&&n<c&&u<=e&&e<c&&f.isDark(o,Math.floor((n-u)/t))&&(i=0),s+=i?g:l;for(o=0;o<t;o+=1)h+=s+"\n"}return h.substring(0,h.length-1)},f.renderTo2dContext=function(t,r){r=r||2;for(var e=f.getModuleCount(),n=0;n<e;n++)for(var o=0;o<e;o++)t.fillStyle=f.isDark(n,o)?"black":"white",t.fillRect(n*r,o*r,r,r)},f};t.stringToBytes=(t.stringToBytesFuncs={default:function(t){for(var r=[],e=0;e<t.length;e+=1){var n=t.charCodeAt(e);r.push(255&n)}return r}}).default,t.createStringToBytes=function(t,r){var e=function(){for(var e=S(t),n=function(){var t=e.read();if(-1==t)throw"eof";return t},o=0,i={};;){var a=e.read();if(-1==a)break;var u=n(),f=n()<<8|n();i[String.fromCharCode(a<<8|u)]=f,o+=1}if(o!=r)throw o+" != "+r;return i}(),n="?".charCodeAt(0);return function(t){for(var r=[],o=0;o<t.length;o+=1){var i=t.charCodeAt(o);if(i<128)r.push(i);else{var a=e[t.charAt(o)];"number"==typeof a?(255&a)==a?r.push(a):(r.push(a>>>8),r.push(255&a)):r.push(n)}}return r}};var r,e,n,o,i,a=1,u=2,f=4,c=8,g={L:1,M:0,Q:3,H:2},l=0,h=1,s=2,v=3,d=4,w=5,p=6,y=7,B=(r=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],e=1335,n=7973,i=function(t){for(var r=0;0!=t;)r+=1,t>>>=1;return r},(o={}).getBCHTypeInfo=function(t){for(var r=t<<10;i(r)-i(e)>=0;)r^=e<<i(r)-i(e);return 21522^(t<<10|r)},o.getBCHTypeNumber=function(t){for(var r=t<<12;i(r)-i(n)>=0;)r^=n<<i(r)-i(n);return t<<12|r},o.getPatternPosition=function(t){return r[t-1]},o.getMaskFunction=function(t){switch(t){case l:return function(t,r){return(t+r)%2==0};case h:return function(t,r){return t%2==0};case s:return function(t,r){return r%3==0};case v:return function(t,r){return(t+r)%3==0};case d:return function(t,r){return(Math.floor(t/2)+Math.floor(r/3))%2==0};case w:return function(t,r){return t*r%2+t*r%3==0};case p:return function(t,r){return(t*r%2+t*r%3)%2==0};case y:return function(t,r){return(t*r%3+(t+r)%2)%2==0};default:throw"bad maskPattern:"+t}},o.getErrorCorrectPolynomial=function(t){for(var r=k([1],0),e=0;e<t;e+=1)r=r.multiply(k([1,C.gexp(e)],0));return r},o.getLengthInBits=function(t,r){if(1<=r&&r<10)switch(t){case a:return 10;case u:return 9;case f:case c:return 8;default:throw"mode:"+t}else if(r<27)switch(t){case a:return 12;case u:return 11;case f:return 16;case c:return 10;default:throw"mode:"+t}else{if(!(r<41))throw"type:"+r;switch(t){case a:return 14;case u:return 13;case f:return 16;case c:return 12;default:throw"mode:"+t}}},o.getLostPoint=function(t){for(var r=t.getModuleCount(),e=0,n=0;n<r;n+=1)for(var o=0;o<r;o+=1){for(var i=0,a=t.isDark(n,o),u=-1;u<=1;u+=1)if(!(n+u<0||r<=n+u))for(var f=-1;f<=1;f+=1)o+f<0||r<=o+f||0==u&&0==f||a==t.isDark(n+u,o+f)&&(i+=1);i>5&&(e+=3+i-5)}for(n=0;n<r-1;n+=1)for(o=0;o<r-1;o+=1){var c=0;t.isDark(n,o)&&(c+=1),t.isDark(n+1,o)&&(c+=1),t.isDark(n,o+1)&&(c+=1),t.isDark(n+1,o+1)&&(c+=1),0!=c&&4!=c||(e+=3)}for(n=0;n<r;n+=1)for(o=0;o<r-6;o+=1)t.isDark(n,o)&&!t.isDark(n,o+1)&&t.isDark(n,o+2)&&t.isDark(n,o+3)&&t.isDark(n,o+4)&&!t.isDark(n,o+5)&&t.isDark(n,o+6)&&(e+=40);for(o=0;o<r;o+=1)for(n=0;n<r-6;n+=1)t.isDark(n,o)&&!t.isDark(n+1,o)&&t.isDark(n+2,o)&&t.isDark(n+3,o)&&t.isDark(n+4,o)&&!t.isDark(n+5,o)&&t.isDark(n+6,o)&&(e+=40);var g=0;for(o=0;o<r;o+=1)for(n=0;n<r;n+=1)t.isDark(n,o)&&(g+=1);return e+=Math.abs(100*g/r/r-50)/5*10},o),C=function(){for(var t=new Array(256),r=new Array(256),e=0;e<8;e+=1)t[e]=1<<e;for(e=8;e<256;e+=1)t[e]=t[e-4]^t[e-5]^t[e-6]^t[e-8];for(e=0;e<255;e+=1)r[t[e]]=e;var n={glog:function(t){if(t<1)throw"glog("+t+")";return r[t]},gexp:function(r){for(;r<0;)r+=255;for(;r>=256;)r-=255;return t[r]}};return n}();function k(t,r){if(void 0===t.length)throw t.length+"/"+r;var e=function(){for(var e=0;e<t.length&&0==t[e];)e+=1;for(var n=new Array(t.length-e+r),o=0;o<t.length-e;o+=1)n[o]=t[o+e];return n}(),n={getAt:function(t){return e[t]},getLength:function(){return e.length},multiply:function(t){for(var r=new Array(n.getLength()+t.getLength()-1),e=0;e<n.getLength();e+=1)for(var o=0;o<t.getLength();o+=1)r[e+o]^=C.gexp(C.glog(n.getAt(e))+C.glog(t.getAt(o)));return k(r,0)},mod:function(t){if(n.getLength()-t.getLength()<0)return n;for(var r=C.glog(n.getAt(0))-C.glog(t.getAt(0)),e=new Array(n.getLength()),o=0;o<n.getLength();o+=1)e[o]=n.getAt(o);for(o=0;o<t.getLength();o+=1)e[o]^=C.gexp(C.glog(t.getAt(o))+r);return k(e,0).mod(t)}};return n}var A=function(){var t=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],r=function(t,r){var e={};return e.totalCount=t,e.dataCount=r,e},e={};return e.getRSBlocks=function(e,n){var o=function(r,e){switch(e){case g.L:return t[4*(r-1)+0];case g.M:return t[4*(r-1)+1];case g.Q:return t[4*(r-1)+2];case g.H:return t[4*(r-1)+3];default:return}}(e,n);if(void 0===o)throw"bad rs block @ typeNumber:"+e+"/errorCorrectionLevel:"+n;for(var i=o.length/3,a=[],u=0;u<i;u+=1)for(var f=o[3*u+0],c=o[3*u+1],l=o[3*u+2],h=0;h<f;h+=1)a.push(r(c,l));return a},e}(),b=function(){var t=[],r=0,e={getBuffer:function(){return t},getAt:function(r){var e=Math.floor(r/8);return 1==(t[e]>>>7-r%8&1)},put:function(t,r){for(var n=0;n<r;n+=1)e.putBit(1==(t>>>r-n-1&1))},getLengthInBits:function(){return r},putBit:function(e){var n=Math.floor(r/8);t.length<=n&&t.push(0),e&&(t[n]|=128>>>r%8),r+=1}};return e},M=function(t){var r=a,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+2<r.length;)t.put(o(r.substring(n,n+3)),10),n+=3;n<r.length&&(r.length-n==1?t.put(o(r.substring(n,n+1)),4):r.length-n==2&&t.put(o(r.substring(n,n+2)),7))}},o=function(t){for(var r=0,e=0;e<t.length;e+=1)r=10*r+i(t.charAt(e));return r},i=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+t};return n},x=function(t){var r=u,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+1<r.length;)t.put(45*o(r.charAt(n))+o(r.charAt(n+1)),11),n+=2;n<r.length&&t.put(o(r.charAt(n)),6)}},o=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);if("A"<=t&&t<="Z")return t.charCodeAt(0)-"A".charCodeAt(0)+10;switch(t){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+t}};return n},m=function(r){var e=f,n=t.stringToBytes(r),o={getMode:function(){return e},getLength:function(t){return n.length},write:function(t){for(var r=0;r<n.length;r+=1)t.put(n[r],8)}};return o},L=function(r){var e=c,n=t.stringToBytesFuncs.SJIS;if(!n)throw"sjis not supported.";!function(){var t=n("友");if(2!=t.length||38726!=(t[0]<<8|t[1]))throw"sjis not supported."}();var o=n(r),i={getMode:function(){return e},getLength:function(t){return~~(o.length/2)},write:function(t){for(var r=o,e=0;e+1<r.length;){var n=(255&r[e])<<8|255&r[e+1];if(33088<=n&&n<=40956)n-=33088;else{if(!(57408<=n&&n<=60351))throw"illegal char at "+(e+1)+"/"+n;n-=49472}n=192*(n>>>8&255)+(255&n),t.put(n,13),e+=2}if(e<r.length)throw"illegal char at "+(e+1)}};return i},D=function(){var t=[],r={writeByte:function(r){t.push(255&r)},writeShort:function(t){r.writeByte(t),r.writeByte(t>>>8)},writeBytes:function(t,e,n){e=e||0,n=n||t.length;for(var o=0;o<n;o+=1)r.writeByte(t[o+e])},writeString:function(t){for(var e=0;e<t.length;e+=1)r.writeByte(t.charCodeAt(e))},toByteArray:function(){return t},toString:function(){var r="";r+="[";for(var e=0;e<t.length;e+=1)e>0&&(r+=","),r+=t[e];return r+="]"}};return r},S=function(t){var r=t,e=0,n=0,o=0,i={read:function(){for(;o<8;){if(e>=r.length){if(0==o)return-1;throw"unexpected end of file./"+o}var t=r.charAt(e);if(e+=1,"="==t)return o=0,-1;t.match(/^\s$/)||(n=n<<6|a(t.charCodeAt(0)),o+=6)}var i=n>>>o-8&255;return o-=8,i}},a=function(t){if(65<=t&&t<=90)return t-65;if(97<=t&&t<=122)return t-97+26;if(48<=t&&t<=57)return t-48+52;if(43==t)return 62;if(47==t)return 63;throw"c:"+t};return i},I=function(t,r,e){for(var n=function(t,r){var e=t,n=r,o=new Array(t*r),i={setPixel:function(t,r,n){o[r*e+t]=n},write:function(t){t.writeString("GIF87a"),t.writeShort(e),t.writeShort(n),t.writeByte(128),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(255),t.writeByte(255),t.writeByte(255),t.writeString(","),t.writeShort(0),t.writeShort(0),t.writeShort(e),t.writeShort(n),t.writeByte(0);var r=a(2);t.writeByte(2);for(var o=0;r.length-o>255;)t.writeByte(255),t.writeBytes(r,o,255),o+=255;t.writeByte(r.length-o),t.writeBytes(r,o,r.length-o),t.writeByte(0),t.writeString(";")}},a=function(t){for(var r=1<<t,e=1+(1<<t),n=t+1,i=u(),a=0;a<r;a+=1)i.add(String.fromCharCode(a));i.add(String.fromCharCode(r)),i.add(String.fromCharCode(e));var f,c,g,l=D(),h=(f=l,c=0,g=0,{write:function(t,r){if(t>>>r!=0)throw"length over";for(;c+r>=8;)f.writeByte(255&(t<<c|g)),r-=8-c,t>>>=8-c,g=0,c=0;g|=t<<c,c+=r},flush:function(){c>0&&f.writeByte(g)}});h.write(r,n);var s=0,v=String.fromCharCode(o[s]);for(s+=1;s<o.length;){var d=String.fromCharCode(o[s]);s+=1,i.contains(v+d)?v+=d:(h.write(i.indexOf(v),n),i.size()<4095&&(i.size()==1<<n&&(n+=1),i.add(v+d)),v=d)}return h.write(i.indexOf(v),n),h.write(e,n),h.flush(),l.toByteArray()},u=function(){var t={},r=0,e={add:function(n){if(e.contains(n))throw"dup key:"+n;t[n]=r,r+=1},size:function(){return r},indexOf:function(r){return t[r]},contains:function(r){return void 0!==t[r]}};return e};return i}(t,r),o=0;o<r;o+=1)for(var i=0;i<t;i+=1)n.setPixel(i,o,e(i,o));var a=D();n.write(a);for(var u=function(){var t=0,r=0,e=0,n="",o={},i=function(t){n+=String.fromCharCode(a(63&t))},a=function(t){if(t<0);else{if(t<26)return 65+t;if(t<52)return t-26+97;if(t<62)return t-52+48;if(62==t)return 43;if(63==t)return 47}throw"n:"+t};return o.writeByte=function(n){for(t=t<<8|255&n,r+=8,e+=1;r>=6;)i(t>>>r-6),r-=6},o.flush=function(){if(r>0&&(i(t<<6-r),t=0,r=0),e%3!=0)for(var o=3-e%3,a=0;a<o;a+=1)n+="="},o.toString=function(){return n},o}(),f=a.toByteArray(),c=0;c<f.length;c+=1)u.writeByte(f[c]);return u.flush(),"data:image/gif;base64,"+u};return t}();qrcode.stringToBytesFuncs["UTF-8"]=function(t){return function(t){for(var r=[],e=0;e<t.length;e++){var n=t.charCodeAt(e);n<128?r.push(n):n<2048?r.push(192|n>>6,128|63&n):n<55296||n>=57344?r.push(224|n>>12,128|n>>6&63,128|63&n):(e++,n=65536+((1023&n)<<10|1023&t.charCodeAt(e)),r.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n))}return r}(t)},function(t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports&&(module.exports=t())}((function(){return qrcode}));
var LZString=function(){var r=String.fromCharCode,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",e={};function t(r,o){if(!e[r]){e[r]={};for(var n=0;n<r.length;n++)e[r][r.charAt(n)]=n}return e[r][o]}var i={compressToBase64:function(r){if(null==r)return"";var n=i._compress(r,6,function(r){return o.charAt(r)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(n){return t(o,r.charAt(n))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(r){return null==r?"":""==r?null:i._decompress(r.length,16384,function(o){return r.charCodeAt(o)-32})},compressToUint8Array:function(r){for(var o=i.compress(r),n=new Uint8Array(2*o.length),e=0,t=o.length;e<t;e++){var s=o.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null==o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;e<t;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(r){return null==r?"":i._compress(r,6,function(r){return n.charAt(r)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(o){return t(n,r.charAt(o))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(r,o,n){if(null==r)return"";var e,t,i,s={},u={},a="",p="",c="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<r.length;i+=1)if(a=r.charAt(i),Object.prototype.hasOwnProperty.call(s,a)||(s[a]=f++,u[a]=!0),p=c+a,Object.prototype.hasOwnProperty.call(s,p))c=p;else{if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,d.push(n(m)),m=0):v++;for(t=c.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=c.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++),s[p]=f++,c=String(a)}if(""!==c){if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,d.push(n(m)),m=0):v++;for(t=c.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=c.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==o-1){d.push(n(m));break}v++}return d.join("")},decompress:function(r){return null==r?"":""==r?null:i._decompress(r.length,32768,function(o){return r.charCodeAt(o)})},_decompress:function(o,n,e){var t,i,s,u,a,p,c,l=[],f=4,h=4,d=3,m="",v=[],g={val:e(0),position:n,index:1};for(t=0;t<3;t+=1)l[t]=t;for(s=0,a=Math.pow(2,2),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;switch(s){case 0:for(s=0,a=Math.pow(2,8),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 1:for(s=0,a=Math.pow(2,16),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 2:return""}for(l[3]=c,i=c,v.push(c);;){if(g.index>o)return"";for(s=0,a=Math.pow(2,d),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;switch(c=s){case 0:for(s=0,a=Math.pow(2,8),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 1:for(s=0,a=Math.pow(2,16),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 2:return v.join("")}if(0==f&&(f=Math.pow(2,d),d++),l[c])m=l[c];else{if(c!==h)return null;m=i+i.charAt(0)}v.push(m),l[h++]=i+m.charAt(0),i=m,0==--f&&(f=Math.pow(2,d),d++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module?module.exports=LZString:"undefined"!=typeof angular&&null!=angular&&angular.module("LZString",[]).factory("LZString",function(){return LZString});
!function(o,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.jsQR=e():o.jsQR=e()}("undefined"!=typeof self?self:this,(function(){return function(o){var e={};function r(t){if(e[t])return e[t].exports;var c=e[t]={i:t,l:!1,exports:{}};return o[t].call(c.exports,c,c.exports,r),c.l=!0,c.exports}return r.m=o,r.c=e,r.d=function(o,e,t){r.o(o,e)||Object.defineProperty(o,e,{configurable:!1,enumerable:!0,get:t})},r.n=function(o){var e=o&&o.__esModule?function(){return o.default}:function(){return o};return r.d(e,"a",e),e},r.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},r.p="",r(r.s=3)}([function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function o(o,e){this.width=e,this.height=o.length/e,this.data=o}return o.createEmpty=function(e,r){return new o(new Uint8ClampedArray(e*r),e)},o.prototype.get=function(o,e){return!(o<0||o>=this.width||e<0||e>=this.height)&&!!this.data[e*this.width+o]},o.prototype.set=function(o,e,r){this.data[e*this.width+o]=r?1:0},o.prototype.setRegion=function(o,e,r,t,c){for(var s=e;s<e+t;s++)for(var a=o;a<o+r;a++)this.set(a,s,!!c)},o}();e.BitMatrix=t},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(2);e.addOrSubtractGF=function(o,e){return o^e};var c=function(){function o(o,e,r){this.primitive=o,this.size=e,this.generatorBase=r,this.expTable=new Array(this.size),this.logTable=new Array(this.size);for(var c=1,s=0;s<this.size;s++)this.expTable[s]=c,(c*=2)>=this.size&&(c=(c^this.primitive)&this.size-1);for(s=0;s<this.size-1;s++)this.logTable[this.expTable[s]]=s;this.zero=new t.default(this,Uint8ClampedArray.from([0])),this.one=new t.default(this,Uint8ClampedArray.from([1]))}return o.prototype.multiply=function(o,e){return 0===o||0===e?0:this.expTable[(this.logTable[o]+this.logTable[e])%(this.size-1)]},o.prototype.inverse=function(o){if(0===o)throw new Error("Can't invert 0");return this.expTable[this.size-this.logTable[o]-1]},o.prototype.buildMonomial=function(o,e){if(o<0)throw new Error("Invalid monomial degree less than 0");if(0===e)return this.zero;var r=new Uint8ClampedArray(o+1);return r[0]=e,new t.default(this,r)},o.prototype.log=function(o){if(0===o)throw new Error("Can't take log(0)");return this.logTable[o]},o.prototype.exp=function(o){return this.expTable[o]},o}();e.default=c},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(1),c=function(){function o(o,e){if(0===e.length)throw new Error("No coefficients.");this.field=o;var r=e.length;if(r>1&&0===e[0]){for(var t=1;t<r&&0===e[t];)t++;if(t===r)this.coefficients=o.zero.coefficients;else{this.coefficients=new Uint8ClampedArray(r-t);for(var c=0;c<this.coefficients.length;c++)this.coefficients[c]=e[t+c]}}else this.coefficients=e}return o.prototype.degree=function(){return this.coefficients.length-1},o.prototype.isZero=function(){return 0===this.coefficients[0]},o.prototype.getCoefficient=function(o){return this.coefficients[this.coefficients.length-1-o]},o.prototype.addOrSubtract=function(e){var r;if(this.isZero())return e;if(e.isZero())return this;var c=this.coefficients,s=e.coefficients;c.length>s.length&&(c=(r=[s,c])[0],s=r[1]);for(var a=new Uint8ClampedArray(s.length),n=s.length-c.length,d=0;d<n;d++)a[d]=s[d];for(d=n;d<s.length;d++)a[d]=t.addOrSubtractGF(c[d-n],s[d]);return new o(this.field,a)},o.prototype.multiply=function(e){if(0===e)return this.field.zero;if(1===e)return this;for(var r=this.coefficients.length,t=new Uint8ClampedArray(r),c=0;c<r;c++)t[c]=this.field.multiply(this.coefficients[c],e);return new o(this.field,t)},o.prototype.multiplyPoly=function(e){if(this.isZero()||e.isZero())return this.field.zero;for(var r=this.coefficients,c=r.length,s=e.coefficients,a=s.length,n=new Uint8ClampedArray(c+a-1),d=0;d<c;d++)for(var l=r[d],i=0;i<a;i++)n[d+i]=t.addOrSubtractGF(n[d+i],this.field.multiply(l,s[i]));return new o(this.field,n)},o.prototype.multiplyByMonomial=function(e,r){if(e<0)throw new Error("Invalid degree less than 0");if(0===r)return this.field.zero;for(var t=this.coefficients.length,c=new Uint8ClampedArray(t+e),s=0;s<t;s++)c[s]=this.field.multiply(this.coefficients[s],r);return new o(this.field,c)},o.prototype.evaluateAt=function(o){var e=0;if(0===o)return this.getCoefficient(0);var r=this.coefficients.length;if(1===o)return this.coefficients.forEach((function(o){e=t.addOrSubtractGF(e,o)})),e;e=this.coefficients[0];for(var c=1;c<r;c++)e=t.addOrSubtractGF(this.field.multiply(o,e),this.coefficients[c]);return e},o}();e.default=c},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(4),c=r(5),s=r(11),a=r(12);function n(o){var e=a.locate(o);if(!e)return null;for(var r=0,t=e;r<t.length;r++){var n=t[r],d=s.extract(o,n),l=c.decode(d.matrix);if(l)return{binaryData:l.bytes,data:l.text,chunks:l.chunks,version:l.version,location:{topRightCorner:d.mappingFunction(n.dimension,0),topLeftCorner:d.mappingFunction(0,0),bottomRightCorner:d.mappingFunction(n.dimension,n.dimension),bottomLeftCorner:d.mappingFunction(0,n.dimension),topRightFinderPattern:n.topRight,topLeftFinderPattern:n.topLeft,bottomLeftFinderPattern:n.bottomLeft,bottomRightAlignmentPattern:n.alignmentPattern}}}return null}var d={inversionAttempts:"attemptBoth"};function l(o,e,r,c){void 0===c&&(c={});var s=d;Object.keys(s||{}).forEach((function(o){s[o]=c[o]||s[o]}));var a="attemptBoth"===s.inversionAttempts||"invertFirst"===s.inversionAttempts,l="onlyInvert"===s.inversionAttempts||"invertFirst"===s.inversionAttempts,i=t.binarize(o,e,r,a),B=i.binarized,k=i.inverted,u=n(l?k:B);return u||"attemptBoth"!==s.inversionAttempts&&"invertFirst"!==s.inversionAttempts||(u=n(l?B:k)),u}l.default=l,e.default=l},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(0);function c(o,e,r){return o<e?e:o>r?r:o}var s=function(){function o(o,e){this.width=o,this.data=new Uint8ClampedArray(o*e)}return o.prototype.get=function(o,e){return this.data[e*this.width+o]},o.prototype.set=function(o,e,r){this.data[e*this.width+o]=r},o}();e.binarize=function(o,e,r,a){if(o.length!==e*r*4)throw new Error("Malformed data passed to binarizer.");for(var n=new s(e,r),d=0;d<e;d++)for(var l=0;l<r;l++){var i=o[4*(l*e+d)+0],B=o[4*(l*e+d)+1],k=o[4*(l*e+d)+2];n.set(d,l,.2126*i+.7152*B+.0722*k)}for(var u=Math.ceil(e/8),C=Math.ceil(r/8),m=new s(u,C),f=0;f<C;f++)for(var w=0;w<u;w++){var P=0,v=1/0,h=0;for(l=0;l<8;l++)for(d=0;d<8;d++){var y=n.get(8*w+d,8*f+l);P+=y,v=Math.min(v,y),h=Math.max(h,y)}var p=P/Math.pow(8,2);if(h-v<=24&&(p=v/2,f>0&&w>0)){var b=(m.get(w,f-1)+2*m.get(w-1,f)+m.get(w-1,f-1))/4;v<b&&(p=b)}m.set(w,f,p)}var g=t.BitMatrix.createEmpty(e,r),x=null;for(a&&(x=t.BitMatrix.createEmpty(e,r)),f=0;f<C;f++)for(w=0;w<u;w++){for(var M=c(w,2,u-3),L=c(f,2,C-3),N=(P=0,-2);N<=2;N++)for(var I=-2;I<=2;I++)P+=m.get(M+N,L+I);var O=P/25;for(N=0;N<8;N++)for(I=0;I<8;I++){d=8*w+N,l=8*f+I;var z=n.get(d,l);g.set(d,l,z<=O),a&&x.set(d,l,!(z<=O))}}return a?{binarized:g,inverted:x}:{binarized:g}}},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(0),c=r(6),s=r(9),a=r(10);function n(o,e){for(var r=o^e,t=0;r;)t++,r&=r-1;return t}function d(o,e){return e<<1|o}var l=[{bits:21522,formatInfo:{errorCorrectionLevel:1,dataMask:0}},{bits:20773,formatInfo:{errorCorrectionLevel:1,dataMask:1}},{bits:24188,formatInfo:{errorCorrectionLevel:1,dataMask:2}},{bits:23371,formatInfo:{errorCorrectionLevel:1,dataMask:3}},{bits:17913,formatInfo:{errorCorrectionLevel:1,dataMask:4}},{bits:16590,formatInfo:{errorCorrectionLevel:1,dataMask:5}},{bits:20375,formatInfo:{errorCorrectionLevel:1,dataMask:6}},{bits:19104,formatInfo:{errorCorrectionLevel:1,dataMask:7}},{bits:30660,formatInfo:{errorCorrectionLevel:0,dataMask:0}},{bits:29427,formatInfo:{errorCorrectionLevel:0,dataMask:1}},{bits:32170,formatInfo:{errorCorrectionLevel:0,dataMask:2}},{bits:30877,formatInfo:{errorCorrectionLevel:0,dataMask:3}},{bits:26159,formatInfo:{errorCorrectionLevel:0,dataMask:4}},{bits:25368,formatInfo:{errorCorrectionLevel:0,dataMask:5}},{bits:27713,formatInfo:{errorCorrectionLevel:0,dataMask:6}},{bits:26998,formatInfo:{errorCorrectionLevel:0,dataMask:7}},{bits:5769,formatInfo:{errorCorrectionLevel:3,dataMask:0}},{bits:5054,formatInfo:{errorCorrectionLevel:3,dataMask:1}},{bits:7399,formatInfo:{errorCorrectionLevel:3,dataMask:2}},{bits:6608,formatInfo:{errorCorrectionLevel:3,dataMask:3}},{bits:1890,formatInfo:{errorCorrectionLevel:3,dataMask:4}},{bits:597,formatInfo:{errorCorrectionLevel:3,dataMask:5}},{bits:3340,formatInfo:{errorCorrectionLevel:3,dataMask:6}},{bits:2107,formatInfo:{errorCorrectionLevel:3,dataMask:7}},{bits:13663,formatInfo:{errorCorrectionLevel:2,dataMask:0}},{bits:12392,formatInfo:{errorCorrectionLevel:2,dataMask:1}},{bits:16177,formatInfo:{errorCorrectionLevel:2,dataMask:2}},{bits:14854,formatInfo:{errorCorrectionLevel:2,dataMask:3}},{bits:9396,formatInfo:{errorCorrectionLevel:2,dataMask:4}},{bits:8579,formatInfo:{errorCorrectionLevel:2,dataMask:5}},{bits:11994,formatInfo:{errorCorrectionLevel:2,dataMask:6}},{bits:11245,formatInfo:{errorCorrectionLevel:2,dataMask:7}}],i=[function(o){return(o.y+o.x)%2==0},function(o){return o.y%2==0},function(o){return o.x%3==0},function(o){return(o.y+o.x)%3==0},function(o){return(Math.floor(o.y/2)+Math.floor(o.x/3))%2==0},function(o){return o.x*o.y%2+o.x*o.y%3==0},function(o){return(o.y*o.x%2+o.y*o.x%3)%2==0},function(o){return((o.y+o.x)%2+o.y*o.x%3)%2==0}];function B(o,e,r){for(var c=i[r.dataMask],s=o.height,a=function(o){var e=17+4*o.versionNumber,r=t.BitMatrix.createEmpty(e,e);r.setRegion(0,0,9,9,!0),r.setRegion(e-8,0,8,9,!0),r.setRegion(0,e-8,9,8,!0);for(var c=0,s=o.alignmentPatternCenters;c<s.length;c++)for(var a=s[c],n=0,d=o.alignmentPatternCenters;n<d.length;n++){var l=d[n];6===a&&6===l||6===a&&l===e-7||a===e-7&&6===l||r.setRegion(a-2,l-2,5,5,!0)}return r.setRegion(6,9,1,e-17,!0),r.setRegion(9,6,e-17,1,!0),o.versionNumber>6&&(r.setRegion(e-11,0,3,6,!0),r.setRegion(0,e-11,6,3,!0)),r}(e),n=[],l=0,B=0,k=!0,u=s-1;u>0;u-=2){6===u&&u--;for(var C=0;C<s;C++)for(var m=k?s-1-C:C,f=0;f<2;f++){var w=u-f;if(!a.get(w,m)){B++;var P=o.get(w,m);c({y:m,x:w})&&(P=!P),l=d(P,l),8===B&&(n.push(l),B=0,l=0)}}k=!k}return n}function k(o){var e=function(o){var e=o.height,r=Math.floor((e-17)/4);if(r<=6)return a.VERSIONS[r-1];for(var t=0,c=5;c>=0;c--)for(var s=e-9;s>=e-11;s--)t=d(o.get(s,c),t);var l=0;for(s=5;s>=0;s--)for(c=e-9;c>=e-11;c--)l=d(o.get(s,c),l);for(var i,B=1/0,k=0,u=a.VERSIONS;k<u.length;k++){var C=u[k];if(C.infoBits===t||C.infoBits===l)return C;var m=n(t,C.infoBits);m<B&&(i=C,B=m),(m=n(l,C.infoBits))<B&&(i=C,B=m)}return B<=3?i:void 0}(o);if(!e)return null;var r=function(o){for(var e=0,r=0;r<=8;r++)6!==r&&(e=d(o.get(r,8),e));for(var t=7;t>=0;t--)6!==t&&(e=d(o.get(8,t),e));var c=o.height,s=0;for(t=c-1;t>=c-7;t--)s=d(o.get(8,t),s);for(r=c-8;r<c;r++)s=d(o.get(r,8),s);for(var a=1/0,i=null,B=0,k=l;B<k.length;B++){var u=k[B],C=u.bits,m=u.formatInfo;if(C===e||C===s)return m;var f=n(e,C);f<a&&(i=m,a=f),e!==s&&(f=n(s,C))<a&&(i=m,a=f)}return a<=3?i:null}(o);if(!r)return null;var t=function(o,e,r){var t=e.errorCorrectionLevels[r],c=[],s=0;if(t.ecBlocks.forEach((function(o){for(var e=0;e<o.numBlocks;e++)c.push({numDataCodewords:o.dataCodewordsPerBlock,codewords:[]}),s+=o.dataCodewordsPerBlock+t.ecCodewordsPerBlock})),o.length<s)return null;o=o.slice(0,s);for(var a=t.ecBlocks[0].dataCodewordsPerBlock,n=0;n<a;n++)for(var d=0,l=c;d<l.length;d++)l[d].codewords.push(o.shift());if(t.ecBlocks.length>1){var i=t.ecBlocks[0].numBlocks,B=t.ecBlocks[1].numBlocks;for(n=0;n<B;n++)c[i+n].codewords.push(o.shift())}for(;o.length>0;)for(var k=0,u=c;k<u.length;k++)u[k].codewords.push(o.shift());return c}(B(o,e,r),e,r.errorCorrectionLevel);if(!t)return null;for(var i=t.reduce((function(o,e){return o+e.numDataCodewords}),0),k=new Uint8ClampedArray(i),u=0,C=0,m=t;C<m.length;C++){var f=m[C],w=s.decode(f.codewords,f.codewords.length-f.numDataCodewords);if(!w)return null;for(var P=0;P<f.numDataCodewords;P++)k[u++]=w[P]}try{return c.decode(k,e.versionNumber)}catch(o){return null}}e.decode=function(o){if(null==o)return null;var e=k(o);if(e)return e;for(var r=0;r<o.width;r++)for(var t=r+1;t<o.height;t++)o.get(r,t)!==o.get(t,r)&&(o.set(r,t,!o.get(r,t)),o.set(t,r,!o.get(t,r)));return k(o)}},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t,c,s=r(7),a=r(8);function n(o,e){for(var r=[],t="",c=[10,12,14][e],s=o.readBits(c);s>=3;){if((l=o.readBits(10))>=1e3)throw new Error("Invalid numeric value above 999");var a=Math.floor(l/100),n=Math.floor(l/10)%10,d=l%10;r.push(48+a,48+n,48+d),t+=a.toString()+n.toString()+d.toString(),s-=3}if(2===s){if((l=o.readBits(7))>=100)throw new Error("Invalid numeric value above 99");a=Math.floor(l/10),n=l%10;r.push(48+a,48+n),t+=a.toString()+n.toString()}else if(1===s){var l;if((l=o.readBits(4))>=10)throw new Error("Invalid numeric value above 9");r.push(48+l),t+=l.toString()}return{bytes:r,text:t}}!function(o){o.Numeric="numeric",o.Alphanumeric="alphanumeric",o.Byte="byte",o.Kanji="kanji",o.ECI="eci"}(t=e.Mode||(e.Mode={})),function(o){o[o.Terminator=0]="Terminator",o[o.Numeric=1]="Numeric",o[o.Alphanumeric=2]="Alphanumeric",o[o.Byte=4]="Byte",o[o.Kanji=8]="Kanji",o[o.ECI=7]="ECI"}(c||(c={}));var d=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function l(o,e){for(var r=[],t="",c=[9,11,13][e],s=o.readBits(c);s>=2;){var a=o.readBits(11),n=Math.floor(a/45),l=a%45;r.push(d[n].charCodeAt(0),d[l].charCodeAt(0)),t+=d[n]+d[l],s-=2}if(1===s){n=o.readBits(6);r.push(d[n].charCodeAt(0)),t+=d[n]}return{bytes:r,text:t}}function i(o,e){for(var r=[],t="",c=[8,16,16][e],s=o.readBits(c),a=0;a<s;a++){var n=o.readBits(8);r.push(n)}try{t+=decodeURIComponent(r.map((function(o){return"%"+("0"+o.toString(16)).substr(-2)})).join(""))}catch(o){}return{bytes:r,text:t}}function B(o,e){for(var r=[],t="",c=[8,10,12][e],s=o.readBits(c),n=0;n<s;n++){var d=o.readBits(13),l=Math.floor(d/192)<<8|d%192;l+=l<7936?33088:49472,r.push(l>>8,255&l),t+=String.fromCharCode(a.shiftJISTable[l])}return{bytes:r,text:t}}e.decode=function(o,e){for(var r,a,d,k,u=new s.BitStream(o),C=e<=9?0:e<=26?1:2,m={text:"",bytes:[],chunks:[],version:e};u.available()>=4;){var f=u.readBits(4);if(f===c.Terminator)return m;if(f===c.ECI)0===u.readBits(1)?m.chunks.push({type:t.ECI,assignmentNumber:u.readBits(7)}):0===u.readBits(1)?m.chunks.push({type:t.ECI,assignmentNumber:u.readBits(14)}):0===u.readBits(1)?m.chunks.push({type:t.ECI,assignmentNumber:u.readBits(21)}):m.chunks.push({type:t.ECI,assignmentNumber:-1});else if(f===c.Numeric){var w=n(u,C);m.text+=w.text,(r=m.bytes).push.apply(r,w.bytes),m.chunks.push({type:t.Numeric,text:w.text})}else if(f===c.Alphanumeric){var P=l(u,C);m.text+=P.text,(a=m.bytes).push.apply(a,P.bytes),m.chunks.push({type:t.Alphanumeric,text:P.text})}else if(f===c.Byte){var v=i(u,C);m.text+=v.text,(d=m.bytes).push.apply(d,v.bytes),m.chunks.push({type:t.Byte,bytes:v.bytes,text:v.text})}else if(f===c.Kanji){var h=B(u,C);m.text+=h.text,(k=m.bytes).push.apply(k,h.bytes),m.chunks.push({type:t.Kanji,bytes:h.bytes,text:h.text})}}if(0===u.available()||0===u.readBits(u.available()))return m}},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function o(o){this.byteOffset=0,this.bitOffset=0,this.bytes=o}return o.prototype.readBits=function(o){if(o<1||o>32||o>this.available())throw new Error("Cannot read "+o.toString()+" bits");var e=0;if(this.bitOffset>0){var r=8-this.bitOffset,t=o<r?o:r,c=255>>8-t<<(s=r-t);e=(this.bytes[this.byteOffset]&c)>>s,o-=t,this.bitOffset+=t,8===this.bitOffset&&(this.bitOffset=0,this.byteOffset++)}if(o>0){for(;o>=8;)e=e<<8|255&this.bytes[this.byteOffset],this.byteOffset++,o-=8;if(o>0){var s;c=255>>(s=8-o)<<s;e=e<<o|(this.bytes[this.byteOffset]&c)>>s,this.bitOffset+=o}}return e},o.prototype.available=function(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset},o}();e.BitStream=t},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.shiftJISTable={32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,50:50,51:51,52:52,53:53,54:54,55:55,56:56,57:57,58:58,59:59,60:60,61:61,62:62,63:63,64:64,65:65,66:66,67:67,68:68,69:69,70:70,71:71,72:72,73:73,74:74,75:75,76:76,77:77,78:78,79:79,80:80,81:81,82:82,83:83,84:84,85:85,86:86,87:87,88:88,89:89,90:90,91:91,92:165,93:93,94:94,95:95,96:96,97:97,98:98,99:99,100:100,101:101,102:102,103:103,104:104,105:105,106:106,107:107,108:108,109:109,110:110,111:111,112:112,113:113,114:114,115:115,116:116,117:117,118:118,119:119,120:120,121:121,122:122,123:123,124:124,125:125,126:8254,33088:12288,33089:12289,33090:12290,33091:65292,33092:65294,33093:12539,33094:65306,33095:65307,33096:65311,33097:65281,33098:12443,33099:12444,33100:180,33101:65344,33102:168,33103:65342,33104:65507,33105:65343,33106:12541,33107:12542,33108:12445,33109:12446,33110:12291,33111:20189,33112:12293,33113:12294,33114:12295,33115:12540,33116:8213,33117:8208,33118:65295,33119:92,33120:12316,33121:8214,33122:65372,33123:8230,33124:8229,33125:8216,33126:8217,33127:8220,33128:8221,33129:65288,33130:65289,33131:12308,33132:12309,33133:65339,33134:65341,33135:65371,33136:65373,33137:12296,33138:12297,33139:12298,33140:12299,33141:12300,33142:12301,33143:12302,33144:12303,33145:12304,33146:12305,33147:65291,33148:8722,33149:177,33150:215,33152:247,33153:65309,33154:8800,33155:65308,33156:65310,33157:8806,33158:8807,33159:8734,33160:8756,33161:9794,33162:9792,33163:176,33164:8242,33165:8243,33166:8451,33167:65509,33168:65284,33169:162,33170:163,33171:65285,33172:65283,33173:65286,33174:65290,33175:65312,33176:167,33177:9734,33178:9733,33179:9675,33180:9679,33181:9678,33182:9671,33183:9670,33184:9633,33185:9632,33186:9651,33187:9650,33188:9661,33189:9660,33190:8251,33191:12306,33192:8594,33193:8592,33194:8593,33195:8595,33196:12307,33208:8712,33209:8715,33210:8838,33211:8839,33212:8834,33213:8835,33214:8746,33215:8745,33224:8743,33225:8744,33226:172,33227:8658,33228:8660,33229:8704,33230:8707,33242:8736,33243:8869,33244:8978,33245:8706,33246:8711,33247:8801,33248:8786,33249:8810,33250:8811,33251:8730,33252:8765,33253:8733,33254:8757,33255:8747,33256:8748,33264:8491,33265:8240,33266:9839,33267:9837,33268:9834,33269:8224,33270:8225,33271:182,33276:9711,33359:65296,33360:65297,33361:65298,33362:65299,33363:65300,33364:65301,33365:65302,33366:65303,33367:65304,33368:65305,33376:65313,33377:65314,33378:65315,33379:65316,33380:65317,33381:65318,33382:65319,33383:65320,33384:65321,33385:65322,33386:65323,33387:65324,33388:65325,33389:65326,33390:65327,33391:65328,33392:65329,33393:65330,33394:65331,33395:65332,33396:65333,33397:65334,33398:65335,33399:65336,33400:65337,33401:65338,33409:65345,33410:65346,33411:65347,33412:65348,33413:65349,33414:65350,33415:65351,33416:65352,33417:65353,33418:65354,33419:65355,33420:65356,33421:65357,33422:65358,33423:65359,33424:65360,33425:65361,33426:65362,33427:65363,33428:65364,33429:65365,33430:65366,33431:65367,33432:65368,33433:65369,33434:65370,33439:12353,33440:12354,33441:12355,33442:12356,33443:12357,33444:12358,33445:12359,33446:12360,33447:12361,33448:12362,33449:12363,33450:12364,33451:12365,33452:12366,33453:12367,33454:12368,33455:12369,33456:12370,33457:12371,33458:12372,33459:12373,33460:12374,33461:12375,33462:12376,33463:12377,33464:12378,33465:12379,33466:12380,33467:12381,33468:12382,33469:12383,33470:12384,33471:12385,33472:12386,33473:12387,33474:12388,33475:12389,33476:12390,33477:12391,33478:12392,33479:12393,33480:12394,33481:12395,33482:12396,33483:12397,33484:12398,33485:12399,33486:12400,33487:12401,33488:12402,33489:12403,33490:12404,33491:12405,33492:12406,33493:12407,33494:12408,33495:12409,33496:12410,33497:12411,33498:12412,33499:12413,33500:12414,33501:12415,33502:12416,33503:12417,33504:12418,33505:12419,33506:12420,33507:12421,33508:12422,33509:12423,33510:12424,33511:12425,33512:12426,33513:12427,33514:12428,33515:12429,33516:12430,33517:12431,33518:12432,33519:12433,33520:12434,33521:12435,33600:12449,33601:12450,33602:12451,33603:12452,33604:12453,33605:12454,33606:12455,33607:12456,33608:12457,33609:12458,33610:12459,33611:12460,33612:12461,33613:12462,33614:12463,33615:12464,33616:12465,33617:12466,33618:12467,33619:12468,33620:12469,33621:12470,33622:12471,33623:12472,33624:12473,33625:12474,33626:12475,33627:12476,33628:12477,33629:12478,33630:12479,33631:12480,33632:12481,33633:12482,33634:12483,33635:12484,33636:12485,33637:12486,33638:12487,33639:12488,33640:12489,33641:12490,33642:12491,33643:12492,33644:12493,33645:12494,33646:12495,33647:12496,33648:12497,33649:12498,33650:12499,33651:12500,33652:12501,33653:12502,33654:12503,33655:12504,33656:12505,33657:12506,33658:12507,33659:12508,33660:12509,33661:12510,33662:12511,33664:12512,33665:12513,33666:12514,33667:12515,33668:12516,33669:12517,33670:12518,33671:12519,33672:12520,33673:12521,33674:12522,33675:12523,33676:12524,33677:12525,33678:12526,33679:12527,33680:12528,33681:12529,33682:12530,33683:12531,33684:12532,33685:12533,33686:12534,33695:913,33696:914,33697:915,33698:916,33699:917,33700:918,33701:919,33702:920,33703:921,33704:922,33705:923,33706:924,33707:925,33708:926,33709:927,33710:928,33711:929,33712:931,33713:932,33714:933,33715:934,33716:935,33717:936,33718:937,33727:945,33728:946,33729:947,33730:948,33731:949,33732:950,33733:951,33734:952,33735:953,33736:954,33737:955,33738:956,33739:957,33740:958,33741:959,33742:960,33743:961,33744:963,33745:964,33746:965,33747:966,33748:967,33749:968,33750:969,33856:1040,33857:1041,33858:1042,33859:1043,33860:1044,33861:1045,33862:1025,33863:1046,33864:1047,33865:1048,33866:1049,33867:1050,33868:1051,33869:1052,33870:1053,33871:1054,33872:1055,33873:1056,33874:1057,33875:1058,33876:1059,33877:1060,33878:1061,33879:1062,33880:1063,33881:1064,33882:1065,33883:1066,33884:1067,33885:1068,33886:1069,33887:1070,33888:1071,33904:1072,33905:1073,33906:1074,33907:1075,33908:1076,33909:1077,33910:1105,33911:1078,33912:1079,33913:1080,33914:1081,33915:1082,33916:1083,33917:1084,33918:1085,33920:1086,33921:1087,33922:1088,33923:1089,33924:1090,33925:1091,33926:1092,33927:1093,33928:1094,33929:1095,33930:1096,33931:1097,33932:1098,33933:1099,33934:1100,33935:1101,33936:1102,33937:1103,33951:9472,33952:9474,33953:9484,33954:9488,33955:9496,33956:9492,33957:9500,33958:9516,33959:9508,33960:9524,33961:9532,33962:9473,33963:9475,33964:9487,33965:9491,33966:9499,33967:9495,33968:9507,33969:9523,33970:9515,33971:9531,33972:9547,33973:9504,33974:9519,33975:9512,33976:9527,33977:9535,33978:9501,33979:9520,33980:9509,33981:9528,33982:9538,34975:20124,34976:21782,34977:23043,34978:38463,34979:21696,34980:24859,34981:25384,34982:23030,34983:36898,34984:33909,34985:33564,34986:31312,34987:24746,34988:25569,34989:28197,34990:26093,34991:33894,34992:33446,34993:39925,34994:26771,34995:22311,34996:26017,34997:25201,34998:23451,34999:22992,35e3:34427,35001:39156,35002:32098,35003:32190,35004:39822,35005:25110,35006:31903,35007:34999,35008:23433,35009:24245,35010:25353,35011:26263,35012:26696,35013:38343,35014:38797,35015:26447,35016:20197,35017:20234,35018:20301,35019:20381,35020:20553,35021:22258,35022:22839,35023:22996,35024:23041,35025:23561,35026:24799,35027:24847,35028:24944,35029:26131,35030:26885,35031:28858,35032:30031,35033:30064,35034:31227,35035:32173,35036:32239,35037:32963,35038:33806,35039:34915,35040:35586,35041:36949,35042:36986,35043:21307,35044:20117,35045:20133,35046:22495,35047:32946,35048:37057,35049:30959,35050:19968,35051:22769,35052:28322,35053:36920,35054:31282,35055:33576,35056:33419,35057:39983,35058:20801,35059:21360,35060:21693,35061:21729,35062:22240,35063:23035,35064:24341,35065:39154,35066:28139,35067:32996,35068:34093,35136:38498,35137:38512,35138:38560,35139:38907,35140:21515,35141:21491,35142:23431,35143:28879,35144:32701,35145:36802,35146:38632,35147:21359,35148:40284,35149:31418,35150:19985,35151:30867,35152:33276,35153:28198,35154:22040,35155:21764,35156:27421,35157:34074,35158:39995,35159:23013,35160:21417,35161:28006,35162:29916,35163:38287,35164:22082,35165:20113,35166:36939,35167:38642,35168:33615,35169:39180,35170:21473,35171:21942,35172:23344,35173:24433,35174:26144,35175:26355,35176:26628,35177:27704,35178:27891,35179:27945,35180:29787,35181:30408,35182:31310,35183:38964,35184:33521,35185:34907,35186:35424,35187:37613,35188:28082,35189:30123,35190:30410,35191:39365,35192:24742,35193:35585,35194:36234,35195:38322,35196:27022,35197:21421,35198:20870,35200:22290,35201:22576,35202:22852,35203:23476,35204:24310,35205:24616,35206:25513,35207:25588,35208:27839,35209:28436,35210:28814,35211:28948,35212:29017,35213:29141,35214:29503,35215:32257,35216:33398,35217:33489,35218:34199,35219:36960,35220:37467,35221:40219,35222:22633,35223:26044,35224:27738,35225:29989,35226:20985,35227:22830,35228:22885,35229:24448,35230:24540,35231:25276,35232:26106,35233:27178,35234:27431,35235:27572,35236:29579,35237:32705,35238:35158,35239:40236,35240:40206,35241:40644,35242:23713,35243:27798,35244:33659,35245:20740,35246:23627,35247:25014,35248:33222,35249:26742,35250:29281,35251:20057,35252:20474,35253:21368,35254:24681,35255:28201,35256:31311,35257:38899,35258:19979,35259:21270,35260:20206,35261:20309,35262:20285,35263:20385,35264:20339,35265:21152,35266:21487,35267:22025,35268:22799,35269:23233,35270:23478,35271:23521,35272:31185,35273:26247,35274:26524,35275:26550,35276:27468,35277:27827,35278:28779,35279:29634,35280:31117,35281:31166,35282:31292,35283:31623,35284:33457,35285:33499,35286:33540,35287:33655,35288:33775,35289:33747,35290:34662,35291:35506,35292:22057,35293:36008,35294:36838,35295:36942,35296:38686,35297:34442,35298:20420,35299:23784,35300:25105,35301:29273,35302:30011,35303:33253,35304:33469,35305:34558,35306:36032,35307:38597,35308:39187,35309:39381,35310:20171,35311:20250,35312:35299,35313:22238,35314:22602,35315:22730,35316:24315,35317:24555,35318:24618,35319:24724,35320:24674,35321:25040,35322:25106,35323:25296,35324:25913,35392:39745,35393:26214,35394:26800,35395:28023,35396:28784,35397:30028,35398:30342,35399:32117,35400:33445,35401:34809,35402:38283,35403:38542,35404:35997,35405:20977,35406:21182,35407:22806,35408:21683,35409:23475,35410:23830,35411:24936,35412:27010,35413:28079,35414:30861,35415:33995,35416:34903,35417:35442,35418:37799,35419:39608,35420:28012,35421:39336,35422:34521,35423:22435,35424:26623,35425:34510,35426:37390,35427:21123,35428:22151,35429:21508,35430:24275,35431:25313,35432:25785,35433:26684,35434:26680,35435:27579,35436:29554,35437:30906,35438:31339,35439:35226,35440:35282,35441:36203,35442:36611,35443:37101,35444:38307,35445:38548,35446:38761,35447:23398,35448:23731,35449:27005,35450:38989,35451:38990,35452:25499,35453:31520,35454:27179,35456:27263,35457:26806,35458:39949,35459:28511,35460:21106,35461:21917,35462:24688,35463:25324,35464:27963,35465:28167,35466:28369,35467:33883,35468:35088,35469:36676,35470:19988,35471:39993,35472:21494,35473:26907,35474:27194,35475:38788,35476:26666,35477:20828,35478:31427,35479:33970,35480:37340,35481:37772,35482:22107,35483:40232,35484:26658,35485:33541,35486:33841,35487:31909,35488:21e3,35489:33477,35490:29926,35491:20094,35492:20355,35493:20896,35494:23506,35495:21002,35496:21208,35497:21223,35498:24059,35499:21914,35500:22570,35501:23014,35502:23436,35503:23448,35504:23515,35505:24178,35506:24185,35507:24739,35508:24863,35509:24931,35510:25022,35511:25563,35512:25954,35513:26577,35514:26707,35515:26874,35516:27454,35517:27475,35518:27735,35519:28450,35520:28567,35521:28485,35522:29872,35523:29976,35524:30435,35525:30475,35526:31487,35527:31649,35528:31777,35529:32233,35530:32566,35531:32752,35532:32925,35533:33382,35534:33694,35535:35251,35536:35532,35537:36011,35538:36996,35539:37969,35540:38291,35541:38289,35542:38306,35543:38501,35544:38867,35545:39208,35546:33304,35547:20024,35548:21547,35549:23736,35550:24012,35551:29609,35552:30284,35553:30524,35554:23721,35555:32747,35556:36107,35557:38593,35558:38929,35559:38996,35560:39e3,35561:20225,35562:20238,35563:21361,35564:21916,35565:22120,35566:22522,35567:22855,35568:23305,35569:23492,35570:23696,35571:24076,35572:24190,35573:24524,35574:25582,35575:26426,35576:26071,35577:26082,35578:26399,35579:26827,35580:26820,35648:27231,35649:24112,35650:27589,35651:27671,35652:27773,35653:30079,35654:31048,35655:23395,35656:31232,35657:32e3,35658:24509,35659:35215,35660:35352,35661:36020,35662:36215,35663:36556,35664:36637,35665:39138,35666:39438,35667:39740,35668:20096,35669:20605,35670:20736,35671:22931,35672:23452,35673:25135,35674:25216,35675:25836,35676:27450,35677:29344,35678:30097,35679:31047,35680:32681,35681:34811,35682:35516,35683:35696,35684:25516,35685:33738,35686:38816,35687:21513,35688:21507,35689:21931,35690:26708,35691:27224,35692:35440,35693:30759,35694:26485,35695:40653,35696:21364,35697:23458,35698:33050,35699:34384,35700:36870,35701:19992,35702:20037,35703:20167,35704:20241,35705:21450,35706:21560,35707:23470,35708:24339,35709:24613,35710:25937,35712:26429,35713:27714,35714:27762,35715:27875,35716:28792,35717:29699,35718:31350,35719:31406,35720:31496,35721:32026,35722:31998,35723:32102,35724:26087,35725:29275,35726:21435,35727:23621,35728:24040,35729:25298,35730:25312,35731:25369,35732:28192,35733:34394,35734:35377,35735:36317,35736:37624,35737:28417,35738:31142,35739:39770,35740:20136,35741:20139,35742:20140,35743:20379,35744:20384,35745:20689,35746:20807,35747:31478,35748:20849,35749:20982,35750:21332,35751:21281,35752:21375,35753:21483,35754:21932,35755:22659,35756:23777,35757:24375,35758:24394,35759:24623,35760:24656,35761:24685,35762:25375,35763:25945,35764:27211,35765:27841,35766:29378,35767:29421,35768:30703,35769:33016,35770:33029,35771:33288,35772:34126,35773:37111,35774:37857,35775:38911,35776:39255,35777:39514,35778:20208,35779:20957,35780:23597,35781:26241,35782:26989,35783:23616,35784:26354,35785:26997,35786:29577,35787:26704,35788:31873,35789:20677,35790:21220,35791:22343,35792:24062,35793:37670,35794:26020,35795:27427,35796:27453,35797:29748,35798:31105,35799:31165,35800:31563,35801:32202,35802:33465,35803:33740,35804:34943,35805:35167,35806:35641,35807:36817,35808:37329,35809:21535,35810:37504,35811:20061,35812:20534,35813:21477,35814:21306,35815:29399,35816:29590,35817:30697,35818:33510,35819:36527,35820:39366,35821:39368,35822:39378,35823:20855,35824:24858,35825:34398,35826:21936,35827:31354,35828:20598,35829:23507,35830:36935,35831:38533,35832:20018,35833:27355,35834:37351,35835:23633,35836:23624,35904:25496,35905:31391,35906:27795,35907:38772,35908:36705,35909:31402,35910:29066,35911:38536,35912:31874,35913:26647,35914:32368,35915:26705,35916:37740,35917:21234,35918:21531,35919:34219,35920:35347,35921:32676,35922:36557,35923:37089,35924:21350,35925:34952,35926:31041,35927:20418,35928:20670,35929:21009,35930:20804,35931:21843,35932:22317,35933:29674,35934:22411,35935:22865,35936:24418,35937:24452,35938:24693,35939:24950,35940:24935,35941:25001,35942:25522,35943:25658,35944:25964,35945:26223,35946:26690,35947:28179,35948:30054,35949:31293,35950:31995,35951:32076,35952:32153,35953:32331,35954:32619,35955:33550,35956:33610,35957:34509,35958:35336,35959:35427,35960:35686,35961:36605,35962:38938,35963:40335,35964:33464,35965:36814,35966:39912,35968:21127,35969:25119,35970:25731,35971:28608,35972:38553,35973:26689,35974:20625,35975:27424,35976:27770,35977:28500,35978:31348,35979:32080,35980:34880,35981:35363,35982:26376,35983:20214,35984:20537,35985:20518,35986:20581,35987:20860,35988:21048,35989:21091,35990:21927,35991:22287,35992:22533,35993:23244,35994:24314,35995:25010,35996:25080,35997:25331,35998:25458,35999:26908,36e3:27177,36001:29309,36002:29356,36003:29486,36004:30740,36005:30831,36006:32121,36007:30476,36008:32937,36009:35211,36010:35609,36011:36066,36012:36562,36013:36963,36014:37749,36015:38522,36016:38997,36017:39443,36018:40568,36019:20803,36020:21407,36021:21427,36022:24187,36023:24358,36024:28187,36025:28304,36026:29572,36027:29694,36028:32067,36029:33335,36030:35328,36031:35578,36032:38480,36033:20046,36034:20491,36035:21476,36036:21628,36037:22266,36038:22993,36039:23396,36040:24049,36041:24235,36042:24359,36043:25144,36044:25925,36045:26543,36046:28246,36047:29392,36048:31946,36049:34996,36050:32929,36051:32993,36052:33776,36053:34382,36054:35463,36055:36328,36056:37431,36057:38599,36058:39015,36059:40723,36060:20116,36061:20114,36062:20237,36063:21320,36064:21577,36065:21566,36066:23087,36067:24460,36068:24481,36069:24735,36070:26791,36071:27278,36072:29786,36073:30849,36074:35486,36075:35492,36076:35703,36077:37264,36078:20062,36079:39881,36080:20132,36081:20348,36082:20399,36083:20505,36084:20502,36085:20809,36086:20844,36087:21151,36088:21177,36089:21246,36090:21402,36091:21475,36092:21521,36160:21518,36161:21897,36162:22353,36163:22434,36164:22909,36165:23380,36166:23389,36167:23439,36168:24037,36169:24039,36170:24055,36171:24184,36172:24195,36173:24218,36174:24247,36175:24344,36176:24658,36177:24908,36178:25239,36179:25304,36180:25511,36181:25915,36182:26114,36183:26179,36184:26356,36185:26477,36186:26657,36187:26775,36188:27083,36189:27743,36190:27946,36191:28009,36192:28207,36193:28317,36194:30002,36195:30343,36196:30828,36197:31295,36198:31968,36199:32005,36200:32024,36201:32094,36202:32177,36203:32789,36204:32771,36205:32943,36206:32945,36207:33108,36208:33167,36209:33322,36210:33618,36211:34892,36212:34913,36213:35611,36214:36002,36215:36092,36216:37066,36217:37237,36218:37489,36219:30783,36220:37628,36221:38308,36222:38477,36224:38917,36225:39321,36226:39640,36227:40251,36228:21083,36229:21163,36230:21495,36231:21512,36232:22741,36233:25335,36234:28640,36235:35946,36236:36703,36237:40633,36238:20811,36239:21051,36240:21578,36241:22269,36242:31296,36243:37239,36244:40288,36245:40658,36246:29508,36247:28425,36248:33136,36249:29969,36250:24573,36251:24794,36252:39592,36253:29403,36254:36796,36255:27492,36256:38915,36257:20170,36258:22256,36259:22372,36260:22718,36261:23130,36262:24680,36263:25031,36264:26127,36265:26118,36266:26681,36267:26801,36268:28151,36269:30165,36270:32058,36271:33390,36272:39746,36273:20123,36274:20304,36275:21449,36276:21766,36277:23919,36278:24038,36279:24046,36280:26619,36281:27801,36282:29811,36283:30722,36284:35408,36285:37782,36286:35039,36287:22352,36288:24231,36289:25387,36290:20661,36291:20652,36292:20877,36293:26368,36294:21705,36295:22622,36296:22971,36297:23472,36298:24425,36299:25165,36300:25505,36301:26685,36302:27507,36303:28168,36304:28797,36305:37319,36306:29312,36307:30741,36308:30758,36309:31085,36310:25998,36311:32048,36312:33756,36313:35009,36314:36617,36315:38555,36316:21092,36317:22312,36318:26448,36319:32618,36320:36001,36321:20916,36322:22338,36323:38442,36324:22586,36325:27018,36326:32948,36327:21682,36328:23822,36329:22524,36330:30869,36331:40442,36332:20316,36333:21066,36334:21643,36335:25662,36336:26152,36337:26388,36338:26613,36339:31364,36340:31574,36341:32034,36342:37679,36343:26716,36344:39853,36345:31545,36346:21273,36347:20874,36348:21047,36416:23519,36417:25334,36418:25774,36419:25830,36420:26413,36421:27578,36422:34217,36423:38609,36424:30352,36425:39894,36426:25420,36427:37638,36428:39851,36429:30399,36430:26194,36431:19977,36432:20632,36433:21442,36434:23665,36435:24808,36436:25746,36437:25955,36438:26719,36439:29158,36440:29642,36441:29987,36442:31639,36443:32386,36444:34453,36445:35715,36446:36059,36447:37240,36448:39184,36449:26028,36450:26283,36451:27531,36452:20181,36453:20180,36454:20282,36455:20351,36456:21050,36457:21496,36458:21490,36459:21987,36460:22235,36461:22763,36462:22987,36463:22985,36464:23039,36465:23376,36466:23629,36467:24066,36468:24107,36469:24535,36470:24605,36471:25351,36472:25903,36473:23388,36474:26031,36475:26045,36476:26088,36477:26525,36478:27490,36480:27515,36481:27663,36482:29509,36483:31049,36484:31169,36485:31992,36486:32025,36487:32043,36488:32930,36489:33026,36490:33267,36491:35222,36492:35422,36493:35433,36494:35430,36495:35468,36496:35566,36497:36039,36498:36060,36499:38604,36500:39164,36501:27503,36502:20107,36503:20284,36504:20365,36505:20816,36506:23383,36507:23546,36508:24904,36509:25345,36510:26178,36511:27425,36512:28363,36513:27835,36514:29246,36515:29885,36516:30164,36517:30913,36518:31034,36519:32780,36520:32819,36521:33258,36522:33940,36523:36766,36524:27728,36525:40575,36526:24335,36527:35672,36528:40235,36529:31482,36530:36600,36531:23437,36532:38635,36533:19971,36534:21489,36535:22519,36536:22833,36537:23241,36538:23460,36539:24713,36540:28287,36541:28422,36542:30142,36543:36074,36544:23455,36545:34048,36546:31712,36547:20594,36548:26612,36549:33437,36550:23649,36551:34122,36552:32286,36553:33294,36554:20889,36555:23556,36556:25448,36557:36198,36558:26012,36559:29038,36560:31038,36561:32023,36562:32773,36563:35613,36564:36554,36565:36974,36566:34503,36567:37034,36568:20511,36569:21242,36570:23610,36571:26451,36572:28796,36573:29237,36574:37196,36575:37320,36576:37675,36577:33509,36578:23490,36579:24369,36580:24825,36581:20027,36582:21462,36583:23432,36584:25163,36585:26417,36586:27530,36587:29417,36588:29664,36589:31278,36590:33131,36591:36259,36592:37202,36593:39318,36594:20754,36595:21463,36596:21610,36597:23551,36598:25480,36599:27193,36600:32172,36601:38656,36602:22234,36603:21454,36604:21608,36672:23447,36673:23601,36674:24030,36675:20462,36676:24833,36677:25342,36678:27954,36679:31168,36680:31179,36681:32066,36682:32333,36683:32722,36684:33261,36685:33311,36686:33936,36687:34886,36688:35186,36689:35728,36690:36468,36691:36655,36692:36913,36693:37195,36694:37228,36695:38598,36696:37276,36697:20160,36698:20303,36699:20805,36700:21313,36701:24467,36702:25102,36703:26580,36704:27713,36705:28171,36706:29539,36707:32294,36708:37325,36709:37507,36710:21460,36711:22809,36712:23487,36713:28113,36714:31069,36715:32302,36716:31899,36717:22654,36718:29087,36719:20986,36720:34899,36721:36848,36722:20426,36723:23803,36724:26149,36725:30636,36726:31459,36727:33308,36728:39423,36729:20934,36730:24490,36731:26092,36732:26991,36733:27529,36734:28147,36736:28310,36737:28516,36738:30462,36739:32020,36740:24033,36741:36981,36742:37255,36743:38918,36744:20966,36745:21021,36746:25152,36747:26257,36748:26329,36749:28186,36750:24246,36751:32210,36752:32626,36753:26360,36754:34223,36755:34295,36756:35576,36757:21161,36758:21465,36759:22899,36760:24207,36761:24464,36762:24661,36763:37604,36764:38500,36765:20663,36766:20767,36767:21213,36768:21280,36769:21319,36770:21484,36771:21736,36772:21830,36773:21809,36774:22039,36775:22888,36776:22974,36777:23100,36778:23477,36779:23558,36780:23567,36781:23569,36782:23578,36783:24196,36784:24202,36785:24288,36786:24432,36787:25215,36788:25220,36789:25307,36790:25484,36791:25463,36792:26119,36793:26124,36794:26157,36795:26230,36796:26494,36797:26786,36798:27167,36799:27189,36800:27836,36801:28040,36802:28169,36803:28248,36804:28988,36805:28966,36806:29031,36807:30151,36808:30465,36809:30813,36810:30977,36811:31077,36812:31216,36813:31456,36814:31505,36815:31911,36816:32057,36817:32918,36818:33750,36819:33931,36820:34121,36821:34909,36822:35059,36823:35359,36824:35388,36825:35412,36826:35443,36827:35937,36828:36062,36829:37284,36830:37478,36831:37758,36832:37912,36833:38556,36834:38808,36835:19978,36836:19976,36837:19998,36838:20055,36839:20887,36840:21104,36841:22478,36842:22580,36843:22732,36844:23330,36845:24120,36846:24773,36847:25854,36848:26465,36849:26454,36850:27972,36851:29366,36852:30067,36853:31331,36854:33976,36855:35698,36856:37304,36857:37664,36858:22065,36859:22516,36860:39166,36928:25325,36929:26893,36930:27542,36931:29165,36932:32340,36933:32887,36934:33394,36935:35302,36936:39135,36937:34645,36938:36785,36939:23611,36940:20280,36941:20449,36942:20405,36943:21767,36944:23072,36945:23517,36946:23529,36947:24515,36948:24910,36949:25391,36950:26032,36951:26187,36952:26862,36953:27035,36954:28024,36955:28145,36956:30003,36957:30137,36958:30495,36959:31070,36960:31206,36961:32051,36962:33251,36963:33455,36964:34218,36965:35242,36966:35386,36967:36523,36968:36763,36969:36914,36970:37341,36971:38663,36972:20154,36973:20161,36974:20995,36975:22645,36976:22764,36977:23563,36978:29978,36979:23613,36980:33102,36981:35338,36982:36805,36983:38499,36984:38765,36985:31525,36986:35535,36987:38920,36988:37218,36989:22259,36990:21416,36992:36887,36993:21561,36994:22402,36995:24101,36996:25512,36997:27700,36998:28810,36999:30561,37e3:31883,37001:32736,37002:34928,37003:36930,37004:37204,37005:37648,37006:37656,37007:38543,37008:29790,37009:39620,37010:23815,37011:23913,37012:25968,37013:26530,37014:36264,37015:38619,37016:25454,37017:26441,37018:26905,37019:33733,37020:38935,37021:38592,37022:35070,37023:28548,37024:25722,37025:23544,37026:19990,37027:28716,37028:30045,37029:26159,37030:20932,37031:21046,37032:21218,37033:22995,37034:24449,37035:24615,37036:25104,37037:25919,37038:25972,37039:26143,37040:26228,37041:26866,37042:26646,37043:27491,37044:28165,37045:29298,37046:29983,37047:30427,37048:31934,37049:32854,37050:22768,37051:35069,37052:35199,37053:35488,37054:35475,37055:35531,37056:36893,37057:37266,37058:38738,37059:38745,37060:25993,37061:31246,37062:33030,37063:38587,37064:24109,37065:24796,37066:25114,37067:26021,37068:26132,37069:26512,37070:30707,37071:31309,37072:31821,37073:32318,37074:33034,37075:36012,37076:36196,37077:36321,37078:36447,37079:30889,37080:20999,37081:25305,37082:25509,37083:25666,37084:25240,37085:35373,37086:31363,37087:31680,37088:35500,37089:38634,37090:32118,37091:33292,37092:34633,37093:20185,37094:20808,37095:21315,37096:21344,37097:23459,37098:23554,37099:23574,37100:24029,37101:25126,37102:25159,37103:25776,37104:26643,37105:26676,37106:27849,37107:27973,37108:27927,37109:26579,37110:28508,37111:29006,37112:29053,37113:26059,37114:31359,37115:31661,37116:32218,37184:32330,37185:32680,37186:33146,37187:33307,37188:33337,37189:34214,37190:35438,37191:36046,37192:36341,37193:36984,37194:36983,37195:37549,37196:37521,37197:38275,37198:39854,37199:21069,37200:21892,37201:28472,37202:28982,37203:20840,37204:31109,37205:32341,37206:33203,37207:31950,37208:22092,37209:22609,37210:23720,37211:25514,37212:26366,37213:26365,37214:26970,37215:29401,37216:30095,37217:30094,37218:30990,37219:31062,37220:31199,37221:31895,37222:32032,37223:32068,37224:34311,37225:35380,37226:38459,37227:36961,37228:40736,37229:20711,37230:21109,37231:21452,37232:21474,37233:20489,37234:21930,37235:22766,37236:22863,37237:29245,37238:23435,37239:23652,37240:21277,37241:24803,37242:24819,37243:25436,37244:25475,37245:25407,37246:25531,37248:25805,37249:26089,37250:26361,37251:24035,37252:27085,37253:27133,37254:28437,37255:29157,37256:20105,37257:30185,37258:30456,37259:31379,37260:31967,37261:32207,37262:32156,37263:32865,37264:33609,37265:33624,37266:33900,37267:33980,37268:34299,37269:35013,37270:36208,37271:36865,37272:36973,37273:37783,37274:38684,37275:39442,37276:20687,37277:22679,37278:24974,37279:33235,37280:34101,37281:36104,37282:36896,37283:20419,37284:20596,37285:21063,37286:21363,37287:24687,37288:25417,37289:26463,37290:28204,37291:36275,37292:36895,37293:20439,37294:23646,37295:36042,37296:26063,37297:32154,37298:21330,37299:34966,37300:20854,37301:25539,37302:23384,37303:23403,37304:23562,37305:25613,37306:26449,37307:36956,37308:20182,37309:22810,37310:22826,37311:27760,37312:35409,37313:21822,37314:22549,37315:22949,37316:24816,37317:25171,37318:26561,37319:33333,37320:26965,37321:38464,37322:39364,37323:39464,37324:20307,37325:22534,37326:23550,37327:32784,37328:23729,37329:24111,37330:24453,37331:24608,37332:24907,37333:25140,37334:26367,37335:27888,37336:28382,37337:32974,37338:33151,37339:33492,37340:34955,37341:36024,37342:36864,37343:36910,37344:38538,37345:40667,37346:39899,37347:20195,37348:21488,37349:22823,37350:31532,37351:37261,37352:38988,37353:40441,37354:28381,37355:28711,37356:21331,37357:21828,37358:23429,37359:25176,37360:25246,37361:25299,37362:27810,37363:28655,37364:29730,37365:35351,37366:37944,37367:28609,37368:35582,37369:33592,37370:20967,37371:34552,37372:21482,37440:21481,37441:20294,37442:36948,37443:36784,37444:22890,37445:33073,37446:24061,37447:31466,37448:36799,37449:26842,37450:35895,37451:29432,37452:40008,37453:27197,37454:35504,37455:20025,37456:21336,37457:22022,37458:22374,37459:25285,37460:25506,37461:26086,37462:27470,37463:28129,37464:28251,37465:28845,37466:30701,37467:31471,37468:31658,37469:32187,37470:32829,37471:32966,37472:34507,37473:35477,37474:37723,37475:22243,37476:22727,37477:24382,37478:26029,37479:26262,37480:27264,37481:27573,37482:30007,37483:35527,37484:20516,37485:30693,37486:22320,37487:24347,37488:24677,37489:26234,37490:27744,37491:30196,37492:31258,37493:32622,37494:33268,37495:34584,37496:36933,37497:39347,37498:31689,37499:30044,37500:31481,37501:31569,37502:33988,37504:36880,37505:31209,37506:31378,37507:33590,37508:23265,37509:30528,37510:20013,37511:20210,37512:23449,37513:24544,37514:25277,37515:26172,37516:26609,37517:27880,37518:34411,37519:34935,37520:35387,37521:37198,37522:37619,37523:39376,37524:27159,37525:28710,37526:29482,37527:33511,37528:33879,37529:36015,37530:19969,37531:20806,37532:20939,37533:21899,37534:23541,37535:24086,37536:24115,37537:24193,37538:24340,37539:24373,37540:24427,37541:24500,37542:25074,37543:25361,37544:26274,37545:26397,37546:28526,37547:29266,37548:30010,37549:30522,37550:32884,37551:33081,37552:33144,37553:34678,37554:35519,37555:35548,37556:36229,37557:36339,37558:37530,37559:38263,37560:38914,37561:40165,37562:21189,37563:25431,37564:30452,37565:26389,37566:27784,37567:29645,37568:36035,37569:37806,37570:38515,37571:27941,37572:22684,37573:26894,37574:27084,37575:36861,37576:37786,37577:30171,37578:36890,37579:22618,37580:26626,37581:25524,37582:27131,37583:20291,37584:28460,37585:26584,37586:36795,37587:34086,37588:32180,37589:37716,37590:26943,37591:28528,37592:22378,37593:22775,37594:23340,37595:32044,37596:29226,37597:21514,37598:37347,37599:40372,37600:20141,37601:20302,37602:20572,37603:20597,37604:21059,37605:35998,37606:21576,37607:22564,37608:23450,37609:24093,37610:24213,37611:24237,37612:24311,37613:24351,37614:24716,37615:25269,37616:25402,37617:25552,37618:26799,37619:27712,37620:30855,37621:31118,37622:31243,37623:32224,37624:33351,37625:35330,37626:35558,37627:36420,37628:36883,37696:37048,37697:37165,37698:37336,37699:40718,37700:27877,37701:25688,37702:25826,37703:25973,37704:28404,37705:30340,37706:31515,37707:36969,37708:37841,37709:28346,37710:21746,37711:24505,37712:25764,37713:36685,37714:36845,37715:37444,37716:20856,37717:22635,37718:22825,37719:23637,37720:24215,37721:28155,37722:32399,37723:29980,37724:36028,37725:36578,37726:39003,37727:28857,37728:20253,37729:27583,37730:28593,37731:3e4,37732:38651,37733:20814,37734:21520,37735:22581,37736:22615,37737:22956,37738:23648,37739:24466,37740:26007,37741:26460,37742:28193,37743:30331,37744:33759,37745:36077,37746:36884,37747:37117,37748:37709,37749:30757,37750:30778,37751:21162,37752:24230,37753:22303,37754:22900,37755:24594,37756:20498,37757:20826,37758:20908,37760:20941,37761:20992,37762:21776,37763:22612,37764:22616,37765:22871,37766:23445,37767:23798,37768:23947,37769:24764,37770:25237,37771:25645,37772:26481,37773:26691,37774:26812,37775:26847,37776:30423,37777:28120,37778:28271,37779:28059,37780:28783,37781:29128,37782:24403,37783:30168,37784:31095,37785:31561,37786:31572,37787:31570,37788:31958,37789:32113,37790:21040,37791:33891,37792:34153,37793:34276,37794:35342,37795:35588,37796:35910,37797:36367,37798:36867,37799:36879,37800:37913,37801:38518,37802:38957,37803:39472,37804:38360,37805:20685,37806:21205,37807:21516,37808:22530,37809:23566,37810:24999,37811:25758,37812:27934,37813:30643,37814:31461,37815:33012,37816:33796,37817:36947,37818:37509,37819:23776,37820:40199,37821:21311,37822:24471,37823:24499,37824:28060,37825:29305,37826:30563,37827:31167,37828:31716,37829:27602,37830:29420,37831:35501,37832:26627,37833:27233,37834:20984,37835:31361,37836:26932,37837:23626,37838:40182,37839:33515,37840:23493,37841:37193,37842:28702,37843:22136,37844:23663,37845:24775,37846:25958,37847:27788,37848:35930,37849:36929,37850:38931,37851:21585,37852:26311,37853:37389,37854:22856,37855:37027,37856:20869,37857:20045,37858:20970,37859:34201,37860:35598,37861:28760,37862:25466,37863:37707,37864:26978,37865:39348,37866:32260,37867:30071,37868:21335,37869:26976,37870:36575,37871:38627,37872:27741,37873:20108,37874:23612,37875:24336,37876:36841,37877:21250,37878:36049,37879:32905,37880:34425,37881:24319,37882:26085,37883:20083,37884:20837,37952:22914,37953:23615,37954:38894,37955:20219,37956:22922,37957:24525,37958:35469,37959:28641,37960:31152,37961:31074,37962:23527,37963:33905,37964:29483,37965:29105,37966:24180,37967:24565,37968:25467,37969:25754,37970:29123,37971:31896,37972:20035,37973:24316,37974:20043,37975:22492,37976:22178,37977:24745,37978:28611,37979:32013,37980:33021,37981:33075,37982:33215,37983:36786,37984:35223,37985:34468,37986:24052,37987:25226,37988:25773,37989:35207,37990:26487,37991:27874,37992:27966,37993:29750,37994:30772,37995:23110,37996:32629,37997:33453,37998:39340,37999:20467,38e3:24259,38001:25309,38002:25490,38003:25943,38004:26479,38005:30403,38006:29260,38007:32972,38008:32954,38009:36649,38010:37197,38011:20493,38012:22521,38013:23186,38014:26757,38016:26995,38017:29028,38018:29437,38019:36023,38020:22770,38021:36064,38022:38506,38023:36889,38024:34687,38025:31204,38026:30695,38027:33833,38028:20271,38029:21093,38030:21338,38031:25293,38032:26575,38033:27850,38034:30333,38035:31636,38036:31893,38037:33334,38038:34180,38039:36843,38040:26333,38041:28448,38042:29190,38043:32283,38044:33707,38045:39361,38046:40614,38047:20989,38048:31665,38049:30834,38050:31672,38051:32903,38052:31560,38053:27368,38054:24161,38055:32908,38056:30033,38057:30048,38058:20843,38059:37474,38060:28300,38061:30330,38062:37271,38063:39658,38064:20240,38065:32624,38066:25244,38067:31567,38068:38309,38069:40169,38070:22138,38071:22617,38072:34532,38073:38588,38074:20276,38075:21028,38076:21322,38077:21453,38078:21467,38079:24070,38080:25644,38081:26001,38082:26495,38083:27710,38084:27726,38085:29256,38086:29359,38087:29677,38088:30036,38089:32321,38090:33324,38091:34281,38092:36009,38093:31684,38094:37318,38095:29033,38096:38930,38097:39151,38098:25405,38099:26217,38100:30058,38101:30436,38102:30928,38103:34115,38104:34542,38105:21290,38106:21329,38107:21542,38108:22915,38109:24199,38110:24444,38111:24754,38112:25161,38113:25209,38114:25259,38115:26e3,38116:27604,38117:27852,38118:30130,38119:30382,38120:30865,38121:31192,38122:32203,38123:32631,38124:32933,38125:34987,38126:35513,38127:36027,38128:36991,38129:38750,38130:39131,38131:27147,38132:31800,38133:20633,38134:23614,38135:24494,38136:26503,38137:27608,38138:29749,38139:30473,38140:32654,38208:40763,38209:26570,38210:31255,38211:21305,38212:30091,38213:39661,38214:24422,38215:33181,38216:33777,38217:32920,38218:24380,38219:24517,38220:30050,38221:31558,38222:36924,38223:26727,38224:23019,38225:23195,38226:32016,38227:30334,38228:35628,38229:20469,38230:24426,38231:27161,38232:27703,38233:28418,38234:29922,38235:31080,38236:34920,38237:35413,38238:35961,38239:24287,38240:25551,38241:30149,38242:31186,38243:33495,38244:37672,38245:37618,38246:33948,38247:34541,38248:39981,38249:21697,38250:24428,38251:25996,38252:27996,38253:28693,38254:36007,38255:36051,38256:38971,38257:25935,38258:29942,38259:19981,38260:20184,38261:22496,38262:22827,38263:23142,38264:23500,38265:20904,38266:24067,38267:24220,38268:24598,38269:25206,38270:25975,38272:26023,38273:26222,38274:28014,38275:29238,38276:31526,38277:33104,38278:33178,38279:33433,38280:35676,38281:36e3,38282:36070,38283:36212,38284:38428,38285:38468,38286:20398,38287:25771,38288:27494,38289:33310,38290:33889,38291:34154,38292:37096,38293:23553,38294:26963,38295:39080,38296:33914,38297:34135,38298:20239,38299:21103,38300:24489,38301:24133,38302:26381,38303:31119,38304:33145,38305:35079,38306:35206,38307:28149,38308:24343,38309:25173,38310:27832,38311:20175,38312:29289,38313:39826,38314:20998,38315:21563,38316:22132,38317:22707,38318:24996,38319:25198,38320:28954,38321:22894,38322:31881,38323:31966,38324:32027,38325:38640,38326:25991,38327:32862,38328:19993,38329:20341,38330:20853,38331:22592,38332:24163,38333:24179,38334:24330,38335:26564,38336:20006,38337:34109,38338:38281,38339:38491,38340:31859,38341:38913,38342:20731,38343:22721,38344:30294,38345:30887,38346:21029,38347:30629,38348:34065,38349:31622,38350:20559,38351:22793,38352:29255,38353:31687,38354:32232,38355:36794,38356:36820,38357:36941,38358:20415,38359:21193,38360:23081,38361:24321,38362:38829,38363:20445,38364:33303,38365:37610,38366:22275,38367:25429,38368:27497,38369:29995,38370:35036,38371:36628,38372:31298,38373:21215,38374:22675,38375:24917,38376:25098,38377:26286,38378:27597,38379:31807,38380:33769,38381:20515,38382:20472,38383:21253,38384:21574,38385:22577,38386:22857,38387:23453,38388:23792,38389:23791,38390:23849,38391:24214,38392:25265,38393:25447,38394:25918,38395:26041,38396:26379,38464:27861,38465:27873,38466:28921,38467:30770,38468:32299,38469:32990,38470:33459,38471:33804,38472:34028,38473:34562,38474:35090,38475:35370,38476:35914,38477:37030,38478:37586,38479:39165,38480:40179,38481:40300,38482:20047,38483:20129,38484:20621,38485:21078,38486:22346,38487:22952,38488:24125,38489:24536,38490:24537,38491:25151,38492:26292,38493:26395,38494:26576,38495:26834,38496:20882,38497:32033,38498:32938,38499:33192,38500:35584,38501:35980,38502:36031,38503:37502,38504:38450,38505:21536,38506:38956,38507:21271,38508:20693,38509:21340,38510:22696,38511:25778,38512:26420,38513:29287,38514:30566,38515:31302,38516:37350,38517:21187,38518:27809,38519:27526,38520:22528,38521:24140,38522:22868,38523:26412,38524:32763,38525:20961,38526:30406,38528:25705,38529:30952,38530:39764,38531:40635,38532:22475,38533:22969,38534:26151,38535:26522,38536:27598,38537:21737,38538:27097,38539:24149,38540:33180,38541:26517,38542:39850,38543:26622,38544:40018,38545:26717,38546:20134,38547:20451,38548:21448,38549:25273,38550:26411,38551:27819,38552:36804,38553:20397,38554:32365,38555:40639,38556:19975,38557:24930,38558:28288,38559:28459,38560:34067,38561:21619,38562:26410,38563:39749,38564:24051,38565:31637,38566:23724,38567:23494,38568:34588,38569:28234,38570:34001,38571:31252,38572:33032,38573:22937,38574:31885,38575:27665,38576:30496,38577:21209,38578:22818,38579:28961,38580:29279,38581:30683,38582:38695,38583:40289,38584:26891,38585:23167,38586:23064,38587:20901,38588:21517,38589:21629,38590:26126,38591:30431,38592:36855,38593:37528,38594:40180,38595:23018,38596:29277,38597:28357,38598:20813,38599:26825,38600:32191,38601:32236,38602:38754,38603:40634,38604:25720,38605:27169,38606:33538,38607:22916,38608:23391,38609:27611,38610:29467,38611:30450,38612:32178,38613:32791,38614:33945,38615:20786,38616:26408,38617:40665,38618:30446,38619:26466,38620:21247,38621:39173,38622:23588,38623:25147,38624:31870,38625:36016,38626:21839,38627:24758,38628:32011,38629:38272,38630:21249,38631:20063,38632:20918,38633:22812,38634:29242,38635:32822,38636:37326,38637:24357,38638:30690,38639:21380,38640:24441,38641:32004,38642:34220,38643:35379,38644:36493,38645:38742,38646:26611,38647:34222,38648:37971,38649:24841,38650:24840,38651:27833,38652:30290,38720:35565,38721:36664,38722:21807,38723:20305,38724:20778,38725:21191,38726:21451,38727:23461,38728:24189,38729:24736,38730:24962,38731:25558,38732:26377,38733:26586,38734:28263,38735:28044,38736:29494,38737:29495,38738:30001,38739:31056,38740:35029,38741:35480,38742:36938,38743:37009,38744:37109,38745:38596,38746:34701,38747:22805,38748:20104,38749:20313,38750:19982,38751:35465,38752:36671,38753:38928,38754:20653,38755:24188,38756:22934,38757:23481,38758:24248,38759:25562,38760:25594,38761:25793,38762:26332,38763:26954,38764:27096,38765:27915,38766:28342,38767:29076,38768:29992,38769:31407,38770:32650,38771:32768,38772:33865,38773:33993,38774:35201,38775:35617,38776:36362,38777:36965,38778:38525,38779:39178,38780:24958,38781:25233,38782:27442,38784:27779,38785:28020,38786:32716,38787:32764,38788:28096,38789:32645,38790:34746,38791:35064,38792:26469,38793:33713,38794:38972,38795:38647,38796:27931,38797:32097,38798:33853,38799:37226,38800:20081,38801:21365,38802:23888,38803:27396,38804:28651,38805:34253,38806:34349,38807:35239,38808:21033,38809:21519,38810:23653,38811:26446,38812:26792,38813:29702,38814:29827,38815:30178,38816:35023,38817:35041,38818:37324,38819:38626,38820:38520,38821:24459,38822:29575,38823:31435,38824:33870,38825:25504,38826:30053,38827:21129,38828:27969,38829:28316,38830:29705,38831:30041,38832:30827,38833:31890,38834:38534,38835:31452,38836:40845,38837:20406,38838:24942,38839:26053,38840:34396,38841:20102,38842:20142,38843:20698,38844:20001,38845:20940,38846:23534,38847:26009,38848:26753,38849:28092,38850:29471,38851:30274,38852:30637,38853:31260,38854:31975,38855:33391,38856:35538,38857:36988,38858:37327,38859:38517,38860:38936,38861:21147,38862:32209,38863:20523,38864:21400,38865:26519,38866:28107,38867:29136,38868:29747,38869:33256,38870:36650,38871:38563,38872:40023,38873:40607,38874:29792,38875:22593,38876:28057,38877:32047,38878:39006,38879:20196,38880:20278,38881:20363,38882:20919,38883:21169,38884:23994,38885:24604,38886:29618,38887:31036,38888:33491,38889:37428,38890:38583,38891:38646,38892:38666,38893:40599,38894:40802,38895:26278,38896:27508,38897:21015,38898:21155,38899:28872,38900:35010,38901:24265,38902:24651,38903:24976,38904:28451,38905:29001,38906:31806,38907:32244,38908:32879,38976:34030,38977:36899,38978:37676,38979:21570,38980:39791,38981:27347,38982:28809,38983:36034,38984:36335,38985:38706,38986:21172,38987:23105,38988:24266,38989:24324,38990:26391,38991:27004,38992:27028,38993:28010,38994:28431,38995:29282,38996:29436,38997:31725,38998:32769,38999:32894,39e3:34635,39001:37070,39002:20845,39003:40595,39004:31108,39005:32907,39006:37682,39007:35542,39008:20525,39009:21644,39010:35441,39011:27498,39012:36036,39013:33031,39014:24785,39015:26528,39016:40434,39017:20121,39018:20120,39019:39952,39020:35435,39021:34241,39022:34152,39023:26880,39024:28286,39025:30871,39026:33109,39071:24332,39072:19984,39073:19989,39074:20010,39075:20017,39076:20022,39077:20028,39078:20031,39079:20034,39080:20054,39081:20056,39082:20098,39083:20101,39084:35947,39085:20106,39086:33298,39087:24333,39088:20110,39089:20126,39090:20127,39091:20128,39092:20130,39093:20144,39094:20147,39095:20150,39096:20174,39097:20173,39098:20164,39099:20166,39100:20162,39101:20183,39102:20190,39103:20205,39104:20191,39105:20215,39106:20233,39107:20314,39108:20272,39109:20315,39110:20317,39111:20311,39112:20295,39113:20342,39114:20360,39115:20367,39116:20376,39117:20347,39118:20329,39119:20336,39120:20369,39121:20335,39122:20358,39123:20374,39124:20760,39125:20436,39126:20447,39127:20430,39128:20440,39129:20443,39130:20433,39131:20442,39132:20432,39133:20452,39134:20453,39135:20506,39136:20520,39137:20500,39138:20522,39139:20517,39140:20485,39141:20252,39142:20470,39143:20513,39144:20521,39145:20524,39146:20478,39147:20463,39148:20497,39149:20486,39150:20547,39151:20551,39152:26371,39153:20565,39154:20560,39155:20552,39156:20570,39157:20566,39158:20588,39159:20600,39160:20608,39161:20634,39162:20613,39163:20660,39164:20658,39232:20681,39233:20682,39234:20659,39235:20674,39236:20694,39237:20702,39238:20709,39239:20717,39240:20707,39241:20718,39242:20729,39243:20725,39244:20745,39245:20737,39246:20738,39247:20758,39248:20757,39249:20756,39250:20762,39251:20769,39252:20794,39253:20791,39254:20796,39255:20795,39256:20799,39257:20800,39258:20818,39259:20812,39260:20820,39261:20834,39262:31480,39263:20841,39264:20842,39265:20846,39266:20864,39267:20866,39268:22232,39269:20876,39270:20873,39271:20879,39272:20881,39273:20883,39274:20885,39275:20886,39276:20900,39277:20902,39278:20898,39279:20905,39280:20906,39281:20907,39282:20915,39283:20913,39284:20914,39285:20912,39286:20917,39287:20925,39288:20933,39289:20937,39290:20955,39291:20960,39292:34389,39293:20969,39294:20973,39296:20976,39297:20981,39298:20990,39299:20996,39300:21003,39301:21012,39302:21006,39303:21031,39304:21034,39305:21038,39306:21043,39307:21049,39308:21071,39309:21060,39310:21067,39311:21068,39312:21086,39313:21076,39314:21098,39315:21108,39316:21097,39317:21107,39318:21119,39319:21117,39320:21133,39321:21140,39322:21138,39323:21105,39324:21128,39325:21137,39326:36776,39327:36775,39328:21164,39329:21165,39330:21180,39331:21173,39332:21185,39333:21197,39334:21207,39335:21214,39336:21219,39337:21222,39338:39149,39339:21216,39340:21235,39341:21237,39342:21240,39343:21241,39344:21254,39345:21256,39346:30008,39347:21261,39348:21264,39349:21263,39350:21269,39351:21274,39352:21283,39353:21295,39354:21297,39355:21299,39356:21304,39357:21312,39358:21318,39359:21317,39360:19991,39361:21321,39362:21325,39363:20950,39364:21342,39365:21353,39366:21358,39367:22808,39368:21371,39369:21367,39370:21378,39371:21398,39372:21408,39373:21414,39374:21413,39375:21422,39376:21424,39377:21430,39378:21443,39379:31762,39380:38617,39381:21471,39382:26364,39383:29166,39384:21486,39385:21480,39386:21485,39387:21498,39388:21505,39389:21565,39390:21568,39391:21548,39392:21549,39393:21564,39394:21550,39395:21558,39396:21545,39397:21533,39398:21582,39399:21647,39400:21621,39401:21646,39402:21599,39403:21617,39404:21623,39405:21616,39406:21650,39407:21627,39408:21632,39409:21622,39410:21636,39411:21648,39412:21638,39413:21703,39414:21666,39415:21688,39416:21669,39417:21676,39418:21700,39419:21704,39420:21672,39488:21675,39489:21698,39490:21668,39491:21694,39492:21692,39493:21720,39494:21733,39495:21734,39496:21775,39497:21780,39498:21757,39499:21742,39500:21741,39501:21754,39502:21730,39503:21817,39504:21824,39505:21859,39506:21836,39507:21806,39508:21852,39509:21829,39510:21846,39511:21847,39512:21816,39513:21811,39514:21853,39515:21913,39516:21888,39517:21679,39518:21898,39519:21919,39520:21883,39521:21886,39522:21912,39523:21918,39524:21934,39525:21884,39526:21891,39527:21929,39528:21895,39529:21928,39530:21978,39531:21957,39532:21983,39533:21956,39534:21980,39535:21988,39536:21972,39537:22036,39538:22007,39539:22038,39540:22014,39541:22013,39542:22043,39543:22009,39544:22094,39545:22096,39546:29151,39547:22068,39548:22070,39549:22066,39550:22072,39552:22123,39553:22116,39554:22063,39555:22124,39556:22122,39557:22150,39558:22144,39559:22154,39560:22176,39561:22164,39562:22159,39563:22181,39564:22190,39565:22198,39566:22196,39567:22210,39568:22204,39569:22209,39570:22211,39571:22208,39572:22216,39573:22222,39574:22225,39575:22227,39576:22231,39577:22254,39578:22265,39579:22272,39580:22271,39581:22276,39582:22281,39583:22280,39584:22283,39585:22285,39586:22291,39587:22296,39588:22294,39589:21959,39590:22300,39591:22310,39592:22327,39593:22328,39594:22350,39595:22331,39596:22336,39597:22351,39598:22377,39599:22464,39600:22408,39601:22369,39602:22399,39603:22409,39604:22419,39605:22432,39606:22451,39607:22436,39608:22442,39609:22448,39610:22467,39611:22470,39612:22484,39613:22482,39614:22483,39615:22538,39616:22486,39617:22499,39618:22539,39619:22553,39620:22557,39621:22642,39622:22561,39623:22626,39624:22603,39625:22640,39626:27584,39627:22610,39628:22589,39629:22649,39630:22661,39631:22713,39632:22687,39633:22699,39634:22714,39635:22750,39636:22715,39637:22712,39638:22702,39639:22725,39640:22739,39641:22737,39642:22743,39643:22745,39644:22744,39645:22757,39646:22748,39647:22756,39648:22751,39649:22767,39650:22778,39651:22777,39652:22779,39653:22780,39654:22781,39655:22786,39656:22794,39657:22800,39658:22811,39659:26790,39660:22821,39661:22828,39662:22829,39663:22834,39664:22840,39665:22846,39666:31442,39667:22869,39668:22864,39669:22862,39670:22874,39671:22872,39672:22882,39673:22880,39674:22887,39675:22892,39676:22889,39744:22904,39745:22913,39746:22941,39747:20318,39748:20395,39749:22947,39750:22962,39751:22982,39752:23016,39753:23004,39754:22925,39755:23001,39756:23002,39757:23077,39758:23071,39759:23057,39760:23068,39761:23049,39762:23066,39763:23104,39764:23148,39765:23113,39766:23093,39767:23094,39768:23138,39769:23146,39770:23194,39771:23228,39772:23230,39773:23243,39774:23234,39775:23229,39776:23267,39777:23255,39778:23270,39779:23273,39780:23254,39781:23290,39782:23291,39783:23308,39784:23307,39785:23318,39786:23346,39787:23248,39788:23338,39789:23350,39790:23358,39791:23363,39792:23365,39793:23360,39794:23377,39795:23381,39796:23386,39797:23387,39798:23397,39799:23401,39800:23408,39801:23411,39802:23413,39803:23416,39804:25992,39805:23418,39806:23424,39808:23427,39809:23462,39810:23480,39811:23491,39812:23495,39813:23497,39814:23508,39815:23504,39816:23524,39817:23526,39818:23522,39819:23518,39820:23525,39821:23531,39822:23536,39823:23542,39824:23539,39825:23557,39826:23559,39827:23560,39828:23565,39829:23571,39830:23584,39831:23586,39832:23592,39833:23608,39834:23609,39835:23617,39836:23622,39837:23630,39838:23635,39839:23632,39840:23631,39841:23409,39842:23660,39843:23662,39844:20066,39845:23670,39846:23673,39847:23692,39848:23697,39849:23700,39850:22939,39851:23723,39852:23739,39853:23734,39854:23740,39855:23735,39856:23749,39857:23742,39858:23751,39859:23769,39860:23785,39861:23805,39862:23802,39863:23789,39864:23948,39865:23786,39866:23819,39867:23829,39868:23831,39869:23900,39870:23839,39871:23835,39872:23825,39873:23828,39874:23842,39875:23834,39876:23833,39877:23832,39878:23884,39879:23890,39880:23886,39881:23883,39882:23916,39883:23923,39884:23926,39885:23943,39886:23940,39887:23938,39888:23970,39889:23965,39890:23980,39891:23982,39892:23997,39893:23952,39894:23991,39895:23996,39896:24009,39897:24013,39898:24019,39899:24018,39900:24022,39901:24027,39902:24043,39903:24050,39904:24053,39905:24075,39906:24090,39907:24089,39908:24081,39909:24091,39910:24118,39911:24119,39912:24132,39913:24131,39914:24128,39915:24142,39916:24151,39917:24148,39918:24159,39919:24162,39920:24164,39921:24135,39922:24181,39923:24182,39924:24186,39925:40636,39926:24191,39927:24224,39928:24257,39929:24258,39930:24264,39931:24272,39932:24271,4e4:24278,40001:24291,40002:24285,40003:24282,40004:24283,40005:24290,40006:24289,40007:24296,40008:24297,40009:24300,40010:24305,40011:24307,40012:24304,40013:24308,40014:24312,40015:24318,40016:24323,40017:24329,40018:24413,40019:24412,40020:24331,40021:24337,40022:24342,40023:24361,40024:24365,40025:24376,40026:24385,40027:24392,40028:24396,40029:24398,40030:24367,40031:24401,40032:24406,40033:24407,40034:24409,40035:24417,40036:24429,40037:24435,40038:24439,40039:24451,40040:24450,40041:24447,40042:24458,40043:24456,40044:24465,40045:24455,40046:24478,40047:24473,40048:24472,40049:24480,40050:24488,40051:24493,40052:24508,40053:24534,40054:24571,40055:24548,40056:24568,40057:24561,40058:24541,40059:24755,40060:24575,40061:24609,40062:24672,40064:24601,40065:24592,40066:24617,40067:24590,40068:24625,40069:24603,40070:24597,40071:24619,40072:24614,40073:24591,40074:24634,40075:24666,40076:24641,40077:24682,40078:24695,40079:24671,40080:24650,40081:24646,40082:24653,40083:24675,40084:24643,40085:24676,40086:24642,40087:24684,40088:24683,40089:24665,40090:24705,40091:24717,40092:24807,40093:24707,40094:24730,40095:24708,40096:24731,40097:24726,40098:24727,40099:24722,40100:24743,40101:24715,40102:24801,40103:24760,40104:24800,40105:24787,40106:24756,40107:24560,40108:24765,40109:24774,40110:24757,40111:24792,40112:24909,40113:24853,40114:24838,40115:24822,40116:24823,40117:24832,40118:24820,40119:24826,40120:24835,40121:24865,40122:24827,40123:24817,40124:24845,40125:24846,40126:24903,40127:24894,40128:24872,40129:24871,40130:24906,40131:24895,40132:24892,40133:24876,40134:24884,40135:24893,40136:24898,40137:24900,40138:24947,40139:24951,40140:24920,40141:24921,40142:24922,40143:24939,40144:24948,40145:24943,40146:24933,40147:24945,40148:24927,40149:24925,40150:24915,40151:24949,40152:24985,40153:24982,40154:24967,40155:25004,40156:24980,40157:24986,40158:24970,40159:24977,40160:25003,40161:25006,40162:25036,40163:25034,40164:25033,40165:25079,40166:25032,40167:25027,40168:25030,40169:25018,40170:25035,40171:32633,40172:25037,40173:25062,40174:25059,40175:25078,40176:25082,40177:25076,40178:25087,40179:25085,40180:25084,40181:25086,40182:25088,40183:25096,40184:25097,40185:25101,40186:25100,40187:25108,40188:25115,40256:25118,40257:25121,40258:25130,40259:25134,40260:25136,40261:25138,40262:25139,40263:25153,40264:25166,40265:25182,40266:25187,40267:25179,40268:25184,40269:25192,40270:25212,40271:25218,40272:25225,40273:25214,40274:25234,40275:25235,40276:25238,40277:25300,40278:25219,40279:25236,40280:25303,40281:25297,40282:25275,40283:25295,40284:25343,40285:25286,40286:25812,40287:25288,40288:25308,40289:25292,40290:25290,40291:25282,40292:25287,40293:25243,40294:25289,40295:25356,40296:25326,40297:25329,40298:25383,40299:25346,40300:25352,40301:25327,40302:25333,40303:25424,40304:25406,40305:25421,40306:25628,40307:25423,40308:25494,40309:25486,40310:25472,40311:25515,40312:25462,40313:25507,40314:25487,40315:25481,40316:25503,40317:25525,40318:25451,40320:25449,40321:25534,40322:25577,40323:25536,40324:25542,40325:25571,40326:25545,40327:25554,40328:25590,40329:25540,40330:25622,40331:25652,40332:25606,40333:25619,40334:25638,40335:25654,40336:25885,40337:25623,40338:25640,40339:25615,40340:25703,40341:25711,40342:25718,40343:25678,40344:25898,40345:25749,40346:25747,40347:25765,40348:25769,40349:25736,40350:25788,40351:25818,40352:25810,40353:25797,40354:25799,40355:25787,40356:25816,40357:25794,40358:25841,40359:25831,40360:33289,40361:25824,40362:25825,40363:25260,40364:25827,40365:25839,40366:25900,40367:25846,40368:25844,40369:25842,40370:25850,40371:25856,40372:25853,40373:25880,40374:25884,40375:25861,40376:25892,40377:25891,40378:25899,40379:25908,40380:25909,40381:25911,40382:25910,40383:25912,40384:30027,40385:25928,40386:25942,40387:25941,40388:25933,40389:25944,40390:25950,40391:25949,40392:25970,40393:25976,40394:25986,40395:25987,40396:35722,40397:26011,40398:26015,40399:26027,40400:26039,40401:26051,40402:26054,40403:26049,40404:26052,40405:26060,40406:26066,40407:26075,40408:26073,40409:26080,40410:26081,40411:26097,40412:26482,40413:26122,40414:26115,40415:26107,40416:26483,40417:26165,40418:26166,40419:26164,40420:26140,40421:26191,40422:26180,40423:26185,40424:26177,40425:26206,40426:26205,40427:26212,40428:26215,40429:26216,40430:26207,40431:26210,40432:26224,40433:26243,40434:26248,40435:26254,40436:26249,40437:26244,40438:26264,40439:26269,40440:26305,40441:26297,40442:26313,40443:26302,40444:26300,40512:26308,40513:26296,40514:26326,40515:26330,40516:26336,40517:26175,40518:26342,40519:26345,40520:26352,40521:26357,40522:26359,40523:26383,40524:26390,40525:26398,40526:26406,40527:26407,40528:38712,40529:26414,40530:26431,40531:26422,40532:26433,40533:26424,40534:26423,40535:26438,40536:26462,40537:26464,40538:26457,40539:26467,40540:26468,40541:26505,40542:26480,40543:26537,40544:26492,40545:26474,40546:26508,40547:26507,40548:26534,40549:26529,40550:26501,40551:26551,40552:26607,40553:26548,40554:26604,40555:26547,40556:26601,40557:26552,40558:26596,40559:26590,40560:26589,40561:26594,40562:26606,40563:26553,40564:26574,40565:26566,40566:26599,40567:27292,40568:26654,40569:26694,40570:26665,40571:26688,40572:26701,40573:26674,40574:26702,40576:26803,40577:26667,40578:26713,40579:26723,40580:26743,40581:26751,40582:26783,40583:26767,40584:26797,40585:26772,40586:26781,40587:26779,40588:26755,40589:27310,40590:26809,40591:26740,40592:26805,40593:26784,40594:26810,40595:26895,40596:26765,40597:26750,40598:26881,40599:26826,40600:26888,40601:26840,40602:26914,40603:26918,40604:26849,40605:26892,40606:26829,40607:26836,40608:26855,40609:26837,40610:26934,40611:26898,40612:26884,40613:26839,40614:26851,40615:26917,40616:26873,40617:26848,40618:26863,40619:26920,40620:26922,40621:26906,40622:26915,40623:26913,40624:26822,40625:27001,40626:26999,40627:26972,40628:27e3,40629:26987,40630:26964,40631:27006,40632:26990,40633:26937,40634:26996,40635:26941,40636:26969,40637:26928,40638:26977,40639:26974,40640:26973,40641:27009,40642:26986,40643:27058,40644:27054,40645:27088,40646:27071,40647:27073,40648:27091,40649:27070,40650:27086,40651:23528,40652:27082,40653:27101,40654:27067,40655:27075,40656:27047,40657:27182,40658:27025,40659:27040,40660:27036,40661:27029,40662:27060,40663:27102,40664:27112,40665:27138,40666:27163,40667:27135,40668:27402,40669:27129,40670:27122,40671:27111,40672:27141,40673:27057,40674:27166,40675:27117,40676:27156,40677:27115,40678:27146,40679:27154,40680:27329,40681:27171,40682:27155,40683:27204,40684:27148,40685:27250,40686:27190,40687:27256,40688:27207,40689:27234,40690:27225,40691:27238,40692:27208,40693:27192,40694:27170,40695:27280,40696:27277,40697:27296,40698:27268,40699:27298,40700:27299,40768:27287,40769:34327,40770:27323,40771:27331,40772:27330,40773:27320,40774:27315,40775:27308,40776:27358,40777:27345,40778:27359,40779:27306,40780:27354,40781:27370,40782:27387,40783:27397,40784:34326,40785:27386,40786:27410,40787:27414,40788:39729,40789:27423,40790:27448,40791:27447,40792:30428,40793:27449,40794:39150,40795:27463,40796:27459,40797:27465,40798:27472,40799:27481,40800:27476,40801:27483,40802:27487,40803:27489,40804:27512,40805:27513,40806:27519,40807:27520,40808:27524,40809:27523,40810:27533,40811:27544,40812:27541,40813:27550,40814:27556,40815:27562,40816:27563,40817:27567,40818:27570,40819:27569,40820:27571,40821:27575,40822:27580,40823:27590,40824:27595,40825:27603,40826:27615,40827:27628,40828:27627,40829:27635,40830:27631,40832:40638,40833:27656,40834:27667,40835:27668,40836:27675,40837:27684,40838:27683,40839:27742,40840:27733,40841:27746,40842:27754,40843:27778,40844:27789,40845:27802,40846:27777,40847:27803,40848:27774,40849:27752,40850:27763,40851:27794,40852:27792,40853:27844,40854:27889,40855:27859,40856:27837,40857:27863,40858:27845,40859:27869,40860:27822,40861:27825,40862:27838,40863:27834,40864:27867,40865:27887,40866:27865,40867:27882,40868:27935,40869:34893,40870:27958,40871:27947,40872:27965,40873:27960,40874:27929,40875:27957,40876:27955,40877:27922,40878:27916,40879:28003,40880:28051,40881:28004,40882:27994,40883:28025,40884:27993,40885:28046,40886:28053,40887:28644,40888:28037,40889:28153,40890:28181,40891:28170,40892:28085,40893:28103,40894:28134,40895:28088,40896:28102,40897:28140,40898:28126,40899:28108,40900:28136,40901:28114,40902:28101,40903:28154,40904:28121,40905:28132,40906:28117,40907:28138,40908:28142,40909:28205,40910:28270,40911:28206,40912:28185,40913:28274,40914:28255,40915:28222,40916:28195,40917:28267,40918:28203,40919:28278,40920:28237,40921:28191,40922:28227,40923:28218,40924:28238,40925:28196,40926:28415,40927:28189,40928:28216,40929:28290,40930:28330,40931:28312,40932:28361,40933:28343,40934:28371,40935:28349,40936:28335,40937:28356,40938:28338,40939:28372,40940:28373,40941:28303,40942:28325,40943:28354,40944:28319,40945:28481,40946:28433,40947:28748,40948:28396,40949:28408,40950:28414,40951:28479,40952:28402,40953:28465,40954:28399,40955:28466,40956:28364,161:65377,162:65378,163:65379,164:65380,165:65381,166:65382,167:65383,168:65384,169:65385,170:65386,171:65387,172:65388,173:65389,174:65390,175:65391,176:65392,177:65393,178:65394,179:65395,180:65396,181:65397,182:65398,183:65399,184:65400,185:65401,186:65402,187:65403,188:65404,189:65405,190:65406,191:65407,192:65408,193:65409,194:65410,195:65411,196:65412,197:65413,198:65414,199:65415,200:65416,201:65417,202:65418,203:65419,204:65420,205:65421,206:65422,207:65423,208:65424,209:65425,210:65426,211:65427,212:65428,213:65429,214:65430,215:65431,216:65432,217:65433,218:65434,219:65435,220:65436,221:65437,222:65438,223:65439,57408:28478,57409:28435,57410:28407,57411:28550,57412:28538,57413:28536,57414:28545,57415:28544,57416:28527,57417:28507,57418:28659,57419:28525,57420:28546,57421:28540,57422:28504,57423:28558,57424:28561,57425:28610,57426:28518,57427:28595,57428:28579,57429:28577,57430:28580,57431:28601,57432:28614,57433:28586,57434:28639,57435:28629,57436:28652,57437:28628,57438:28632,57439:28657,57440:28654,57441:28635,57442:28681,57443:28683,57444:28666,57445:28689,57446:28673,57447:28687,57448:28670,57449:28699,57450:28698,57451:28532,57452:28701,57453:28696,57454:28703,57455:28720,57456:28734,57457:28722,57458:28753,57459:28771,57460:28825,57461:28818,57462:28847,57463:28913,57464:28844,57465:28856,57466:28851,57467:28846,57468:28895,57469:28875,57470:28893,57472:28889,57473:28937,57474:28925,57475:28956,57476:28953,57477:29029,57478:29013,57479:29064,57480:29030,57481:29026,57482:29004,57483:29014,57484:29036,57485:29071,57486:29179,57487:29060,57488:29077,57489:29096,57490:29100,57491:29143,57492:29113,57493:29118,57494:29138,57495:29129,57496:29140,57497:29134,57498:29152,57499:29164,57500:29159,57501:29173,57502:29180,57503:29177,57504:29183,57505:29197,57506:29200,57507:29211,57508:29224,57509:29229,57510:29228,57511:29232,57512:29234,57513:29243,57514:29244,57515:29247,57516:29248,57517:29254,57518:29259,57519:29272,57520:29300,57521:29310,57522:29314,57523:29313,57524:29319,57525:29330,57526:29334,57527:29346,57528:29351,57529:29369,57530:29362,57531:29379,57532:29382,57533:29380,57534:29390,57535:29394,57536:29410,57537:29408,57538:29409,57539:29433,57540:29431,57541:20495,57542:29463,57543:29450,57544:29468,57545:29462,57546:29469,57547:29492,57548:29487,57549:29481,57550:29477,57551:29502,57552:29518,57553:29519,57554:40664,57555:29527,57556:29546,57557:29544,57558:29552,57559:29560,57560:29557,57561:29563,57562:29562,57563:29640,57564:29619,57565:29646,57566:29627,57567:29632,57568:29669,57569:29678,57570:29662,57571:29858,57572:29701,57573:29807,57574:29733,57575:29688,57576:29746,57577:29754,57578:29781,57579:29759,57580:29791,57581:29785,57582:29761,57583:29788,57584:29801,57585:29808,57586:29795,57587:29802,57588:29814,57589:29822,57590:29835,57591:29854,57592:29863,57593:29898,57594:29903,57595:29908,57596:29681,57664:29920,57665:29923,57666:29927,57667:29929,57668:29934,57669:29938,57670:29936,57671:29937,57672:29944,57673:29943,57674:29956,57675:29955,57676:29957,57677:29964,57678:29966,57679:29965,57680:29973,57681:29971,57682:29982,57683:29990,57684:29996,57685:30012,57686:30020,57687:30029,57688:30026,57689:30025,57690:30043,57691:30022,57692:30042,57693:30057,57694:30052,57695:30055,57696:30059,57697:30061,57698:30072,57699:30070,57700:30086,57701:30087,57702:30068,57703:30090,57704:30089,57705:30082,57706:30100,57707:30106,57708:30109,57709:30117,57710:30115,57711:30146,57712:30131,57713:30147,57714:30133,57715:30141,57716:30136,57717:30140,57718:30129,57719:30157,57720:30154,57721:30162,57722:30169,57723:30179,57724:30174,57725:30206,57726:30207,57728:30204,57729:30209,57730:30192,57731:30202,57732:30194,57733:30195,57734:30219,57735:30221,57736:30217,57737:30239,57738:30247,57739:30240,57740:30241,57741:30242,57742:30244,57743:30260,57744:30256,57745:30267,57746:30279,57747:30280,57748:30278,57749:30300,57750:30296,57751:30305,57752:30306,57753:30312,57754:30313,57755:30314,57756:30311,57757:30316,57758:30320,57759:30322,57760:30326,57761:30328,57762:30332,57763:30336,57764:30339,57765:30344,57766:30347,57767:30350,57768:30358,57769:30355,57770:30361,57771:30362,57772:30384,57773:30388,57774:30392,57775:30393,57776:30394,57777:30402,57778:30413,57779:30422,57780:30418,57781:30430,57782:30433,57783:30437,57784:30439,57785:30442,57786:34351,57787:30459,57788:30472,57789:30471,57790:30468,57791:30505,57792:30500,57793:30494,57794:30501,57795:30502,57796:30491,57797:30519,57798:30520,57799:30535,57800:30554,57801:30568,57802:30571,57803:30555,57804:30565,57805:30591,57806:30590,57807:30585,57808:30606,57809:30603,57810:30609,57811:30624,57812:30622,57813:30640,57814:30646,57815:30649,57816:30655,57817:30652,57818:30653,57819:30651,57820:30663,57821:30669,57822:30679,57823:30682,57824:30684,57825:30691,57826:30702,57827:30716,57828:30732,57829:30738,57830:31014,57831:30752,57832:31018,57833:30789,57834:30862,57835:30836,57836:30854,57837:30844,57838:30874,57839:30860,57840:30883,57841:30901,57842:30890,57843:30895,57844:30929,57845:30918,57846:30923,57847:30932,57848:30910,57849:30908,57850:30917,57851:30922,57852:30956,57920:30951,57921:30938,57922:30973,57923:30964,57924:30983,57925:30994,57926:30993,57927:31001,57928:31020,57929:31019,57930:31040,57931:31072,57932:31063,57933:31071,57934:31066,57935:31061,57936:31059,57937:31098,57938:31103,57939:31114,57940:31133,57941:31143,57942:40779,57943:31146,57944:31150,57945:31155,57946:31161,57947:31162,57948:31177,57949:31189,57950:31207,57951:31212,57952:31201,57953:31203,57954:31240,57955:31245,57956:31256,57957:31257,57958:31264,57959:31263,57960:31104,57961:31281,57962:31291,57963:31294,57964:31287,57965:31299,57966:31319,57967:31305,57968:31329,57969:31330,57970:31337,57971:40861,57972:31344,57973:31353,57974:31357,57975:31368,57976:31383,57977:31381,57978:31384,57979:31382,57980:31401,57981:31432,57982:31408,57984:31414,57985:31429,57986:31428,57987:31423,57988:36995,57989:31431,57990:31434,57991:31437,57992:31439,57993:31445,57994:31443,57995:31449,57996:31450,57997:31453,57998:31457,57999:31458,58e3:31462,58001:31469,58002:31472,58003:31490,58004:31503,58005:31498,58006:31494,58007:31539,58008:31512,58009:31513,58010:31518,58011:31541,58012:31528,58013:31542,58014:31568,58015:31610,58016:31492,58017:31565,58018:31499,58019:31564,58020:31557,58021:31605,58022:31589,58023:31604,58024:31591,58025:31600,58026:31601,58027:31596,58028:31598,58029:31645,58030:31640,58031:31647,58032:31629,58033:31644,58034:31642,58035:31627,58036:31634,58037:31631,58038:31581,58039:31641,58040:31691,58041:31681,58042:31692,58043:31695,58044:31668,58045:31686,58046:31709,58047:31721,58048:31761,58049:31764,58050:31718,58051:31717,58052:31840,58053:31744,58054:31751,58055:31763,58056:31731,58057:31735,58058:31767,58059:31757,58060:31734,58061:31779,58062:31783,58063:31786,58064:31775,58065:31799,58066:31787,58067:31805,58068:31820,58069:31811,58070:31828,58071:31823,58072:31808,58073:31824,58074:31832,58075:31839,58076:31844,58077:31830,58078:31845,58079:31852,58080:31861,58081:31875,58082:31888,58083:31908,58084:31917,58085:31906,58086:31915,58087:31905,58088:31912,58089:31923,58090:31922,58091:31921,58092:31918,58093:31929,58094:31933,58095:31936,58096:31941,58097:31938,58098:31960,58099:31954,58100:31964,58101:31970,58102:39739,58103:31983,58104:31986,58105:31988,58106:31990,58107:31994,58108:32006,58176:32002,58177:32028,58178:32021,58179:32010,58180:32069,58181:32075,58182:32046,58183:32050,58184:32063,58185:32053,58186:32070,58187:32115,58188:32086,58189:32078,58190:32114,58191:32104,58192:32110,58193:32079,58194:32099,58195:32147,58196:32137,58197:32091,58198:32143,58199:32125,58200:32155,58201:32186,58202:32174,58203:32163,58204:32181,58205:32199,58206:32189,58207:32171,58208:32317,58209:32162,58210:32175,58211:32220,58212:32184,58213:32159,58214:32176,58215:32216,58216:32221,58217:32228,58218:32222,58219:32251,58220:32242,58221:32225,58222:32261,58223:32266,58224:32291,58225:32289,58226:32274,58227:32305,58228:32287,58229:32265,58230:32267,58231:32290,58232:32326,58233:32358,58234:32315,58235:32309,58236:32313,58237:32323,58238:32311,58240:32306,58241:32314,58242:32359,58243:32349,58244:32342,58245:32350,58246:32345,58247:32346,58248:32377,58249:32362,58250:32361,58251:32380,58252:32379,58253:32387,58254:32213,58255:32381,58256:36782,58257:32383,58258:32392,58259:32393,58260:32396,58261:32402,58262:32400,58263:32403,58264:32404,58265:32406,58266:32398,58267:32411,58268:32412,58269:32568,58270:32570,58271:32581,58272:32588,58273:32589,58274:32590,58275:32592,58276:32593,58277:32597,58278:32596,58279:32600,58280:32607,58281:32608,58282:32616,58283:32617,58284:32615,58285:32632,58286:32642,58287:32646,58288:32643,58289:32648,58290:32647,58291:32652,58292:32660,58293:32670,58294:32669,58295:32666,58296:32675,58297:32687,58298:32690,58299:32697,58300:32686,58301:32694,58302:32696,58303:35697,58304:32709,58305:32710,58306:32714,58307:32725,58308:32724,58309:32737,58310:32742,58311:32745,58312:32755,58313:32761,58314:39132,58315:32774,58316:32772,58317:32779,58318:32786,58319:32792,58320:32793,58321:32796,58322:32801,58323:32808,58324:32831,58325:32827,58326:32842,58327:32838,58328:32850,58329:32856,58330:32858,58331:32863,58332:32866,58333:32872,58334:32883,58335:32882,58336:32880,58337:32886,58338:32889,58339:32893,58340:32895,58341:32900,58342:32902,58343:32901,58344:32923,58345:32915,58346:32922,58347:32941,58348:20880,58349:32940,58350:32987,58351:32997,58352:32985,58353:32989,58354:32964,58355:32986,58356:32982,58357:33033,58358:33007,58359:33009,58360:33051,58361:33065,58362:33059,58363:33071,58364:33099,58432:38539,58433:33094,58434:33086,58435:33107,58436:33105,58437:33020,58438:33137,58439:33134,58440:33125,58441:33126,58442:33140,58443:33155,58444:33160,58445:33162,58446:33152,58447:33154,58448:33184,58449:33173,58450:33188,58451:33187,58452:33119,58453:33171,58454:33193,58455:33200,58456:33205,58457:33214,58458:33208,58459:33213,58460:33216,58461:33218,58462:33210,58463:33225,58464:33229,58465:33233,58466:33241,58467:33240,58468:33224,58469:33242,58470:33247,58471:33248,58472:33255,58473:33274,58474:33275,58475:33278,58476:33281,58477:33282,58478:33285,58479:33287,58480:33290,58481:33293,58482:33296,58483:33302,58484:33321,58485:33323,58486:33336,58487:33331,58488:33344,58489:33369,58490:33368,58491:33373,58492:33370,58493:33375,58494:33380,58496:33378,58497:33384,58498:33386,58499:33387,58500:33326,58501:33393,58502:33399,58503:33400,58504:33406,58505:33421,58506:33426,58507:33451,58508:33439,58509:33467,58510:33452,58511:33505,58512:33507,58513:33503,58514:33490,58515:33524,58516:33523,58517:33530,58518:33683,58519:33539,58520:33531,58521:33529,58522:33502,58523:33542,58524:33500,58525:33545,58526:33497,58527:33589,58528:33588,58529:33558,58530:33586,58531:33585,58532:33600,58533:33593,58534:33616,58535:33605,58536:33583,58537:33579,58538:33559,58539:33560,58540:33669,58541:33690,58542:33706,58543:33695,58544:33698,58545:33686,58546:33571,58547:33678,58548:33671,58549:33674,58550:33660,58551:33717,58552:33651,58553:33653,58554:33696,58555:33673,58556:33704,58557:33780,58558:33811,58559:33771,58560:33742,58561:33789,58562:33795,58563:33752,58564:33803,58565:33729,58566:33783,58567:33799,58568:33760,58569:33778,58570:33805,58571:33826,58572:33824,58573:33725,58574:33848,58575:34054,58576:33787,58577:33901,58578:33834,58579:33852,58580:34138,58581:33924,58582:33911,58583:33899,58584:33965,58585:33902,58586:33922,58587:33897,58588:33862,58589:33836,58590:33903,58591:33913,58592:33845,58593:33994,58594:33890,58595:33977,58596:33983,58597:33951,58598:34009,58599:33997,58600:33979,58601:34010,58602:34e3,58603:33985,58604:33990,58605:34006,58606:33953,58607:34081,58608:34047,58609:34036,58610:34071,58611:34072,58612:34092,58613:34079,58614:34069,58615:34068,58616:34044,58617:34112,58618:34147,58619:34136,58620:34120,58688:34113,58689:34306,58690:34123,58691:34133,58692:34176,58693:34212,58694:34184,58695:34193,58696:34186,58697:34216,58698:34157,58699:34196,58700:34203,58701:34282,58702:34183,58703:34204,58704:34167,58705:34174,58706:34192,58707:34249,58708:34234,58709:34255,58710:34233,58711:34256,58712:34261,58713:34269,58714:34277,58715:34268,58716:34297,58717:34314,58718:34323,58719:34315,58720:34302,58721:34298,58722:34310,58723:34338,58724:34330,58725:34352,58726:34367,58727:34381,58728:20053,58729:34388,58730:34399,58731:34407,58732:34417,58733:34451,58734:34467,58735:34473,58736:34474,58737:34443,58738:34444,58739:34486,58740:34479,58741:34500,58742:34502,58743:34480,58744:34505,58745:34851,58746:34475,58747:34516,58748:34526,58749:34537,58750:34540,58752:34527,58753:34523,58754:34543,58755:34578,58756:34566,58757:34568,58758:34560,58759:34563,58760:34555,58761:34577,58762:34569,58763:34573,58764:34553,58765:34570,58766:34612,58767:34623,58768:34615,58769:34619,58770:34597,58771:34601,58772:34586,58773:34656,58774:34655,58775:34680,58776:34636,58777:34638,58778:34676,58779:34647,58780:34664,58781:34670,58782:34649,58783:34643,58784:34659,58785:34666,58786:34821,58787:34722,58788:34719,58789:34690,58790:34735,58791:34763,58792:34749,58793:34752,58794:34768,58795:38614,58796:34731,58797:34756,58798:34739,58799:34759,58800:34758,58801:34747,58802:34799,58803:34802,58804:34784,58805:34831,58806:34829,58807:34814,58808:34806,58809:34807,58810:34830,58811:34770,58812:34833,58813:34838,58814:34837,58815:34850,58816:34849,58817:34865,58818:34870,58819:34873,58820:34855,58821:34875,58822:34884,58823:34882,58824:34898,58825:34905,58826:34910,58827:34914,58828:34923,58829:34945,58830:34942,58831:34974,58832:34933,58833:34941,58834:34997,58835:34930,58836:34946,58837:34967,58838:34962,58839:34990,58840:34969,58841:34978,58842:34957,58843:34980,58844:34992,58845:35007,58846:34993,58847:35011,58848:35012,58849:35028,58850:35032,58851:35033,58852:35037,58853:35065,58854:35074,58855:35068,58856:35060,58857:35048,58858:35058,58859:35076,58860:35084,58861:35082,58862:35091,58863:35139,58864:35102,58865:35109,58866:35114,58867:35115,58868:35137,58869:35140,58870:35131,58871:35126,58872:35128,58873:35148,58874:35101,58875:35168,58876:35166,58944:35174,58945:35172,58946:35181,58947:35178,58948:35183,58949:35188,58950:35191,58951:35198,58952:35203,58953:35208,58954:35210,58955:35219,58956:35224,58957:35233,58958:35241,58959:35238,58960:35244,58961:35247,58962:35250,58963:35258,58964:35261,58965:35263,58966:35264,58967:35290,58968:35292,58969:35293,58970:35303,58971:35316,58972:35320,58973:35331,58974:35350,58975:35344,58976:35340,58977:35355,58978:35357,58979:35365,58980:35382,58981:35393,58982:35419,58983:35410,58984:35398,58985:35400,58986:35452,58987:35437,58988:35436,58989:35426,58990:35461,58991:35458,58992:35460,58993:35496,58994:35489,58995:35473,58996:35493,58997:35494,58998:35482,58999:35491,59e3:35524,59001:35533,59002:35522,59003:35546,59004:35563,59005:35571,59006:35559,59008:35556,59009:35569,59010:35604,59011:35552,59012:35554,59013:35575,59014:35550,59015:35547,59016:35596,59017:35591,59018:35610,59019:35553,59020:35606,59021:35600,59022:35607,59023:35616,59024:35635,59025:38827,59026:35622,59027:35627,59028:35646,59029:35624,59030:35649,59031:35660,59032:35663,59033:35662,59034:35657,59035:35670,59036:35675,59037:35674,59038:35691,59039:35679,59040:35692,59041:35695,59042:35700,59043:35709,59044:35712,59045:35724,59046:35726,59047:35730,59048:35731,59049:35734,59050:35737,59051:35738,59052:35898,59053:35905,59054:35903,59055:35912,59056:35916,59057:35918,59058:35920,59059:35925,59060:35938,59061:35948,59062:35960,59063:35962,59064:35970,59065:35977,59066:35973,59067:35978,59068:35981,59069:35982,59070:35988,59071:35964,59072:35992,59073:25117,59074:36013,59075:36010,59076:36029,59077:36018,59078:36019,59079:36014,59080:36022,59081:36040,59082:36033,59083:36068,59084:36067,59085:36058,59086:36093,59087:36090,59088:36091,59089:36100,59090:36101,59091:36106,59092:36103,59093:36111,59094:36109,59095:36112,59096:40782,59097:36115,59098:36045,59099:36116,59100:36118,59101:36199,59102:36205,59103:36209,59104:36211,59105:36225,59106:36249,59107:36290,59108:36286,59109:36282,59110:36303,59111:36314,59112:36310,59113:36300,59114:36315,59115:36299,59116:36330,59117:36331,59118:36319,59119:36323,59120:36348,59121:36360,59122:36361,59123:36351,59124:36381,59125:36382,59126:36368,59127:36383,59128:36418,59129:36405,59130:36400,59131:36404,59132:36426,59200:36423,59201:36425,59202:36428,59203:36432,59204:36424,59205:36441,59206:36452,59207:36448,59208:36394,59209:36451,59210:36437,59211:36470,59212:36466,59213:36476,59214:36481,59215:36487,59216:36485,59217:36484,59218:36491,59219:36490,59220:36499,59221:36497,59222:36500,59223:36505,59224:36522,59225:36513,59226:36524,59227:36528,59228:36550,59229:36529,59230:36542,59231:36549,59232:36552,59233:36555,59234:36571,59235:36579,59236:36604,59237:36603,59238:36587,59239:36606,59240:36618,59241:36613,59242:36629,59243:36626,59244:36633,59245:36627,59246:36636,59247:36639,59248:36635,59249:36620,59250:36646,59251:36659,59252:36667,59253:36665,59254:36677,59255:36674,59256:36670,59257:36684,59258:36681,59259:36678,59260:36686,59261:36695,59262:36700,59264:36706,59265:36707,59266:36708,59267:36764,59268:36767,59269:36771,59270:36781,59271:36783,59272:36791,59273:36826,59274:36837,59275:36834,59276:36842,59277:36847,59278:36999,59279:36852,59280:36869,59281:36857,59282:36858,59283:36881,59284:36885,59285:36897,59286:36877,59287:36894,59288:36886,59289:36875,59290:36903,59291:36918,59292:36917,59293:36921,59294:36856,59295:36943,59296:36944,59297:36945,59298:36946,59299:36878,59300:36937,59301:36926,59302:36950,59303:36952,59304:36958,59305:36968,59306:36975,59307:36982,59308:38568,59309:36978,59310:36994,59311:36989,59312:36993,59313:36992,59314:37002,59315:37001,59316:37007,59317:37032,59318:37039,59319:37041,59320:37045,59321:37090,59322:37092,59323:25160,59324:37083,59325:37122,59326:37138,59327:37145,59328:37170,59329:37168,59330:37194,59331:37206,59332:37208,59333:37219,59334:37221,59335:37225,59336:37235,59337:37234,59338:37259,59339:37257,59340:37250,59341:37282,59342:37291,59343:37295,59344:37290,59345:37301,59346:37300,59347:37306,59348:37312,59349:37313,59350:37321,59351:37323,59352:37328,59353:37334,59354:37343,59355:37345,59356:37339,59357:37372,59358:37365,59359:37366,59360:37406,59361:37375,59362:37396,59363:37420,59364:37397,59365:37393,59366:37470,59367:37463,59368:37445,59369:37449,59370:37476,59371:37448,59372:37525,59373:37439,59374:37451,59375:37456,59376:37532,59377:37526,59378:37523,59379:37531,59380:37466,59381:37583,59382:37561,59383:37559,59384:37609,59385:37647,59386:37626,59387:37700,59388:37678,59456:37657,59457:37666,59458:37658,59459:37667,59460:37690,59461:37685,59462:37691,59463:37724,59464:37728,59465:37756,59466:37742,59467:37718,59468:37808,59469:37804,59470:37805,59471:37780,59472:37817,59473:37846,59474:37847,59475:37864,59476:37861,59477:37848,59478:37827,59479:37853,59480:37840,59481:37832,59482:37860,59483:37914,59484:37908,59485:37907,59486:37891,59487:37895,59488:37904,59489:37942,59490:37931,59491:37941,59492:37921,59493:37946,59494:37953,59495:37970,59496:37956,59497:37979,59498:37984,59499:37986,59500:37982,59501:37994,59502:37417,59503:38e3,59504:38005,59505:38007,59506:38013,59507:37978,59508:38012,59509:38014,59510:38017,59511:38015,59512:38274,59513:38279,59514:38282,59515:38292,59516:38294,59517:38296,59518:38297,59520:38304,59521:38312,59522:38311,59523:38317,59524:38332,59525:38331,59526:38329,59527:38334,59528:38346,59529:28662,59530:38339,59531:38349,59532:38348,59533:38357,59534:38356,59535:38358,59536:38364,59537:38369,59538:38373,59539:38370,59540:38433,59541:38440,59542:38446,59543:38447,59544:38466,59545:38476,59546:38479,59547:38475,59548:38519,59549:38492,59550:38494,59551:38493,59552:38495,59553:38502,59554:38514,59555:38508,59556:38541,59557:38552,59558:38549,59559:38551,59560:38570,59561:38567,59562:38577,59563:38578,59564:38576,59565:38580,59566:38582,59567:38584,59568:38585,59569:38606,59570:38603,59571:38601,59572:38605,59573:35149,59574:38620,59575:38669,59576:38613,59577:38649,59578:38660,59579:38662,59580:38664,59581:38675,59582:38670,59583:38673,59584:38671,59585:38678,59586:38681,59587:38692,59588:38698,59589:38704,59590:38713,59591:38717,59592:38718,59593:38724,59594:38726,59595:38728,59596:38722,59597:38729,59598:38748,59599:38752,59600:38756,59601:38758,59602:38760,59603:21202,59604:38763,59605:38769,59606:38777,59607:38789,59608:38780,59609:38785,59610:38778,59611:38790,59612:38795,59613:38799,59614:38800,59615:38812,59616:38824,59617:38822,59618:38819,59619:38835,59620:38836,59621:38851,59622:38854,59623:38856,59624:38859,59625:38876,59626:38893,59627:40783,59628:38898,59629:31455,59630:38902,59631:38901,59632:38927,59633:38924,59634:38968,59635:38948,59636:38945,59637:38967,59638:38973,59639:38982,59640:38991,59641:38987,59642:39019,59643:39023,59644:39024,59712:39025,59713:39028,59714:39027,59715:39082,59716:39087,59717:39089,59718:39094,59719:39108,59720:39107,59721:39110,59722:39145,59723:39147,59724:39171,59725:39177,59726:39186,59727:39188,59728:39192,59729:39201,59730:39197,59731:39198,59732:39204,59733:39200,59734:39212,59735:39214,59736:39229,59737:39230,59738:39234,59739:39241,59740:39237,59741:39248,59742:39243,59743:39249,59744:39250,59745:39244,59746:39253,59747:39319,59748:39320,59749:39333,59750:39341,59751:39342,59752:39356,59753:39391,59754:39387,59755:39389,59756:39384,59757:39377,59758:39405,59759:39406,59760:39409,59761:39410,59762:39419,59763:39416,59764:39425,59765:39439,59766:39429,59767:39394,59768:39449,59769:39467,59770:39479,59771:39493,59772:39490,59773:39488,59774:39491,59776:39486,59777:39509,59778:39501,59779:39515,59780:39511,59781:39519,59782:39522,59783:39525,59784:39524,59785:39529,59786:39531,59787:39530,59788:39597,59789:39600,59790:39612,59791:39616,59792:39631,59793:39633,59794:39635,59795:39636,59796:39646,59797:39647,59798:39650,59799:39651,59800:39654,59801:39663,59802:39659,59803:39662,59804:39668,59805:39665,59806:39671,59807:39675,59808:39686,59809:39704,59810:39706,59811:39711,59812:39714,59813:39715,59814:39717,59815:39719,59816:39720,59817:39721,59818:39722,59819:39726,59820:39727,59821:39730,59822:39748,59823:39747,59824:39759,59825:39757,59826:39758,59827:39761,59828:39768,59829:39796,59830:39827,59831:39811,59832:39825,59833:39830,59834:39831,59835:39839,59836:39840,59837:39848,59838:39860,59839:39872,59840:39882,59841:39865,59842:39878,59843:39887,59844:39889,59845:39890,59846:39907,59847:39906,59848:39908,59849:39892,59850:39905,59851:39994,59852:39922,59853:39921,59854:39920,59855:39957,59856:39956,59857:39945,59858:39955,59859:39948,59860:39942,59861:39944,59862:39954,59863:39946,59864:39940,59865:39982,59866:39963,59867:39973,59868:39972,59869:39969,59870:39984,59871:40007,59872:39986,59873:40006,59874:39998,59875:40026,59876:40032,59877:40039,59878:40054,59879:40056,59880:40167,59881:40172,59882:40176,59883:40201,59884:40200,59885:40171,59886:40195,59887:40198,59888:40234,59889:40230,59890:40367,59891:40227,59892:40223,59893:40260,59894:40213,59895:40210,59896:40257,59897:40255,59898:40254,59899:40262,59900:40264,59968:40285,59969:40286,59970:40292,59971:40273,59972:40272,59973:40281,59974:40306,59975:40329,59976:40327,59977:40363,59978:40303,59979:40314,59980:40346,59981:40356,59982:40361,59983:40370,59984:40388,59985:40385,59986:40379,59987:40376,59988:40378,59989:40390,59990:40399,59991:40386,59992:40409,59993:40403,59994:40440,59995:40422,59996:40429,59997:40431,59998:40445,59999:40474,6e4:40475,60001:40478,60002:40565,60003:40569,60004:40573,60005:40577,60006:40584,60007:40587,60008:40588,60009:40594,60010:40597,60011:40593,60012:40605,60013:40613,60014:40617,60015:40632,60016:40618,60017:40621,60018:38753,60019:40652,60020:40654,60021:40655,60022:40656,60023:40660,60024:40668,60025:40670,60026:40669,60027:40672,60028:40677,60029:40680,60030:40687,60032:40692,60033:40694,60034:40695,60035:40697,60036:40699,60037:40700,60038:40701,60039:40711,60040:40712,60041:30391,60042:40725,60043:40737,60044:40748,60045:40766,60046:40778,60047:40786,60048:40788,60049:40803,60050:40799,60051:40800,60052:40801,60053:40806,60054:40807,60055:40812,60056:40810,60057:40823,60058:40818,60059:40822,60060:40853,60061:40860,60062:40864,60063:22575,60064:27079,60065:36953,60066:29796,60067:20956,60068:29081}},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(1),c=r(2);e.decode=function(o,e){var r=new Uint8ClampedArray(o.length);r.set(o);for(var s=new t.default(285,256,0),a=new c.default(s,r),n=new Uint8ClampedArray(e),d=!1,l=0;l<e;l++){var i=a.evaluateAt(s.exp(l+s.generatorBase));n[n.length-1-l]=i,0!==i&&(d=!0)}if(!d)return r;var B=new c.default(s,n),k=function(o,e,r,t){var c;e.degree()<r.degree()&&(e=(c=[r,e])[0],r=c[1]);for(var s=e,a=r,n=o.zero,d=o.one;a.degree()>=t/2;){var l=s,i=n;if(n=d,(s=a).isZero())return null;a=l;for(var B=o.zero,k=s.getCoefficient(s.degree()),u=o.inverse(k);a.degree()>=s.degree()&&!a.isZero();){var C=a.degree()-s.degree(),m=o.multiply(a.getCoefficient(a.degree()),u);B=B.addOrSubtract(o.buildMonomial(C,m)),a=a.addOrSubtract(s.multiplyByMonomial(C,m))}if(d=B.multiplyPoly(n).addOrSubtract(i),a.degree()>=s.degree())return null}var f=d.getCoefficient(0);if(0===f)return null;var w=o.inverse(f);return[d.multiply(w),a.multiply(w)]}(s,s.buildMonomial(e,1),B,e);if(null===k)return null;var u=function(o,e){var r=e.degree();if(1===r)return[e.getCoefficient(1)];for(var t=new Array(r),c=0,s=1;s<o.size&&c<r;s++)0===e.evaluateAt(s)&&(t[c]=o.inverse(s),c++);return c!==r?null:t}(s,k[0]);if(null==u)return null;for(var C=function(o,e,r){for(var c=r.length,s=new Array(c),a=0;a<c;a++){for(var n=o.inverse(r[a]),d=1,l=0;l<c;l++)a!==l&&(d=o.multiply(d,t.addOrSubtractGF(1,o.multiply(r[l],n))));s[a]=o.multiply(e.evaluateAt(n),o.inverse(d)),0!==o.generatorBase&&(s[a]=o.multiply(s[a],n))}return s}(s,k[1],u),m=0;m<u.length;m++){var f=r.length-1-s.log(u[m]);if(f<0)return null;r[f]=t.addOrSubtractGF(r[f],C[m])}return r}},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VERSIONS=[{infoBits:null,versionNumber:1,alignmentPatternCenters:[],errorCorrectionLevels:[{ecCodewordsPerBlock:7,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:13,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:13}]},{ecCodewordsPerBlock:17,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:2,alignmentPatternCenters:[6,18],errorCorrectionLevels:[{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:34}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:28}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]}]},{infoBits:null,versionNumber:3,alignmentPatternCenters:[6,22],errorCorrectionLevels:[{ecCodewordsPerBlock:15,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:55}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:13}]}]},{infoBits:null,versionNumber:4,alignmentPatternCenters:[6,26],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:80}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:32}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:5,alignmentPatternCenters:[6,30],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:43}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:11},{numBlocks:2,dataCodewordsPerBlock:12}]}]},{infoBits:null,versionNumber:6,alignmentPatternCenters:[6,34],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:27}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:31892,versionNumber:7,alignmentPatternCenters:[6,22,38],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:78}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:31}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:13},{numBlocks:1,dataCodewordsPerBlock:14}]}]},{infoBits:34236,versionNumber:8,alignmentPatternCenters:[6,24,42],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:97}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:38},{numBlocks:2,dataCodewordsPerBlock:39}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:18},{numBlocks:2,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:14},{numBlocks:2,dataCodewordsPerBlock:15}]}]},{infoBits:39577,versionNumber:9,alignmentPatternCenters:[6,26,46],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:12},{numBlocks:4,dataCodewordsPerBlock:13}]}]},{infoBits:42195,versionNumber:10,alignmentPatternCenters:[6,28,50],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68},{numBlocks:2,dataCodewordsPerBlock:69}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:43},{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]}]},{infoBits:48118,versionNumber:11,alignmentPatternCenters:[6,30,54],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:81}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:50},{numBlocks:4,dataCodewordsPerBlock:51}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:22},{numBlocks:4,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:12},{numBlocks:8,dataCodewordsPerBlock:13}]}]},{infoBits:51042,versionNumber:12,alignmentPatternCenters:[6,32,58],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:92},{numBlocks:2,dataCodewordsPerBlock:93}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:20},{numBlocks:6,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:55367,versionNumber:13,alignmentPatternCenters:[6,34,62],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:37},{numBlocks:1,dataCodewordsPerBlock:38}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:20},{numBlocks:4,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:11},{numBlocks:4,dataCodewordsPerBlock:12}]}]},{infoBits:58893,versionNumber:14,alignmentPatternCenters:[6,26,46,66],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:40},{numBlocks:5,dataCodewordsPerBlock:41}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:16},{numBlocks:5,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:5,dataCodewordsPerBlock:13}]}]},{infoBits:63784,versionNumber:15,alignmentPatternCenters:[6,26,48,70],errorCorrectionLevels:[{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:87},{numBlocks:1,dataCodewordsPerBlock:88}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:41},{numBlocks:5,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:7,dataCodewordsPerBlock:13}]}]},{infoBits:68472,versionNumber:16,alignmentPatternCenters:[6,26,50,74],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:98},{numBlocks:1,dataCodewordsPerBlock:99}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:70749,versionNumber:17,alignmentPatternCenters:[6,30,54,78],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:1,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22},{numBlocks:15,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:17,dataCodewordsPerBlock:15}]}]},{infoBits:76311,versionNumber:18,alignmentPatternCenters:[6,30,56,82],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:120},{numBlocks:1,dataCodewordsPerBlock:121}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:43},{numBlocks:4,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:1,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:19,dataCodewordsPerBlock:15}]}]},{infoBits:79154,versionNumber:19,alignmentPatternCenters:[6,30,58,86],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:113},{numBlocks:4,dataCodewordsPerBlock:114}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:44},{numBlocks:11,dataCodewordsPerBlock:45}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:21},{numBlocks:4,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:13},{numBlocks:16,dataCodewordsPerBlock:14}]}]},{infoBits:84390,versionNumber:20,alignmentPatternCenters:[6,34,62,90],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:41},{numBlocks:13,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:5,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:15},{numBlocks:10,dataCodewordsPerBlock:16}]}]},{infoBits:87683,versionNumber:21,alignmentPatternCenters:[6,28,50,72,94],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:116},{numBlocks:4,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:16},{numBlocks:6,dataCodewordsPerBlock:17}]}]},{infoBits:92361,versionNumber:22,alignmentPatternCenters:[6,26,50,74,98],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:111},{numBlocks:7,dataCodewordsPerBlock:112}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:13}]}]},{infoBits:96236,versionNumber:23,alignmentPatternCenters:[6,30,54,74,102],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:121},{numBlocks:5,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:47},{numBlocks:14,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:16,dataCodewordsPerBlock:15},{numBlocks:14,dataCodewordsPerBlock:16}]}]},{infoBits:102084,versionNumber:24,alignmentPatternCenters:[6,28,54,80,106],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:45},{numBlocks:14,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:30,dataCodewordsPerBlock:16},{numBlocks:2,dataCodewordsPerBlock:17}]}]},{infoBits:102881,versionNumber:25,alignmentPatternCenters:[6,32,58,84,110],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:106},{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:47},{numBlocks:13,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:110507,versionNumber:26,alignmentPatternCenters:[6,30,58,86,114],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:114},{numBlocks:2,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:46},{numBlocks:4,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:28,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:33,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]}]},{infoBits:110734,versionNumber:27,alignmentPatternCenters:[6,34,62,90,118],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:23},{numBlocks:26,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:117786,versionNumber:28,alignmentPatternCenters:[6,26,50,74,98,122],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:117},{numBlocks:10,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:45},{numBlocks:23,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:24},{numBlocks:31,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:31,dataCodewordsPerBlock:16}]}]},{infoBits:119615,versionNumber:29,alignmentPatternCenters:[6,30,54,78,102,126],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:116},{numBlocks:7,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:21,dataCodewordsPerBlock:45},{numBlocks:7,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:23},{numBlocks:37,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:26,dataCodewordsPerBlock:16}]}]},{infoBits:126325,versionNumber:30,alignmentPatternCenters:[6,26,52,78,104,130],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:115},{numBlocks:10,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:47},{numBlocks:10,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:25,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:25,dataCodewordsPerBlock:16}]}]},{infoBits:127568,versionNumber:31,alignmentPatternCenters:[6,30,56,82,108,134],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:3,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:46},{numBlocks:29,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:24},{numBlocks:1,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:133589,versionNumber:32,alignmentPatternCenters:[6,34,60,86,112,138],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:24},{numBlocks:35,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:35,dataCodewordsPerBlock:16}]}]},{infoBits:136944,versionNumber:33,alignmentPatternCenters:[6,30,58,86,114,142],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:21,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:24},{numBlocks:19,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:141498,versionNumber:34,alignmentPatternCenters:[6,34,62,90,118,146],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:6,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:44,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:59,dataCodewordsPerBlock:16},{numBlocks:1,dataCodewordsPerBlock:17}]}]},{infoBits:145311,versionNumber:35,alignmentPatternCenters:[6,30,54,78,102,126,150],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:121},{numBlocks:7,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:47},{numBlocks:26,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:39,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:41,dataCodewordsPerBlock:16}]}]},{infoBits:150283,versionNumber:36,alignmentPatternCenters:[6,24,50,76,102,128,154],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:121},{numBlocks:14,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:47},{numBlocks:34,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:46,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:64,dataCodewordsPerBlock:16}]}]},{infoBits:152622,versionNumber:37,alignmentPatternCenters:[6,28,54,80,106,132,158],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:46},{numBlocks:14,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:49,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:24,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:158308,versionNumber:38,alignmentPatternCenters:[6,32,58,84,110,136,162],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:122},{numBlocks:18,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:46},{numBlocks:32,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:48,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:15},{numBlocks:32,dataCodewordsPerBlock:16}]}]},{infoBits:161089,versionNumber:39,alignmentPatternCenters:[6,26,54,82,110,138,166],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:40,dataCodewordsPerBlock:47},{numBlocks:7,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:43,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:15},{numBlocks:67,dataCodewordsPerBlock:16}]}]},{infoBits:167017,versionNumber:40,alignmentPatternCenters:[6,30,58,86,114,142,170],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:118},{numBlocks:6,dataCodewordsPerBlock:119}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:18,dataCodewordsPerBlock:47},{numBlocks:31,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:24},{numBlocks:34,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:15},{numBlocks:61,dataCodewordsPerBlock:16}]}]}]},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(0);function c(o,e,r,t){var c=o.x-e.x+r.x-t.x,s=o.y-e.y+r.y-t.y;if(0===c&&0===s)return{a11:e.x-o.x,a12:e.y-o.y,a13:0,a21:r.x-e.x,a22:r.y-e.y,a23:0,a31:o.x,a32:o.y,a33:1};var a=e.x-r.x,n=t.x-r.x,d=e.y-r.y,l=t.y-r.y,i=a*l-n*d,B=(c*l-n*s)/i,k=(a*s-c*d)/i;return{a11:e.x-o.x+B*e.x,a12:e.y-o.y+B*e.y,a13:B,a21:t.x-o.x+k*t.x,a22:t.y-o.y+k*t.y,a23:k,a31:o.x,a32:o.y,a33:1}}e.extract=function(o,e){for(var r,s,a=function(o,e,r,t){var s=c(o,e,r,t);return{a11:s.a22*s.a33-s.a23*s.a32,a12:s.a13*s.a32-s.a12*s.a33,a13:s.a12*s.a23-s.a13*s.a22,a21:s.a23*s.a31-s.a21*s.a33,a22:s.a11*s.a33-s.a13*s.a31,a23:s.a13*s.a21-s.a11*s.a23,a31:s.a21*s.a32-s.a22*s.a31,a32:s.a12*s.a31-s.a11*s.a32,a33:s.a11*s.a22-s.a12*s.a21}}({x:3.5,y:3.5},{x:e.dimension-3.5,y:3.5},{x:e.dimension-6.5,y:e.dimension-6.5},{x:3.5,y:e.dimension-3.5}),n=c(e.topLeft,e.topRight,e.alignmentPattern,e.bottomLeft),d=(s=a,{a11:(r=n).a11*s.a11+r.a21*s.a12+r.a31*s.a13,a12:r.a12*s.a11+r.a22*s.a12+r.a32*s.a13,a13:r.a13*s.a11+r.a23*s.a12+r.a33*s.a13,a21:r.a11*s.a21+r.a21*s.a22+r.a31*s.a23,a22:r.a12*s.a21+r.a22*s.a22+r.a32*s.a23,a23:r.a13*s.a21+r.a23*s.a22+r.a33*s.a23,a31:r.a11*s.a31+r.a21*s.a32+r.a31*s.a33,a32:r.a12*s.a31+r.a22*s.a32+r.a32*s.a33,a33:r.a13*s.a31+r.a23*s.a32+r.a33*s.a33}),l=t.BitMatrix.createEmpty(e.dimension,e.dimension),i=function(o,e){var r=d.a13*o+d.a23*e+d.a33;return{x:(d.a11*o+d.a21*e+d.a31)/r,y:(d.a12*o+d.a22*e+d.a32)/r}},B=0;B<e.dimension;B++)for(var k=0;k<e.dimension;k++){var u=i(k+.5,B+.5);l.set(k,B,o.get(Math.floor(u.x),Math.floor(u.y)))}return{matrix:l,mappingFunction:i}}},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(o,e){return Math.sqrt(Math.pow(e.x-o.x,2)+Math.pow(e.y-o.y,2))};function c(o){return o.reduce((function(o,e){return o+e}))}function s(o,e,r,c){var s,a,n,d,l=[{x:Math.floor(o.x),y:Math.floor(o.y)}],i=Math.abs(e.y-o.y)>Math.abs(e.x-o.x);i?(s=Math.floor(o.y),a=Math.floor(o.x),n=Math.floor(e.y),d=Math.floor(e.x)):(s=Math.floor(o.x),a=Math.floor(o.y),n=Math.floor(e.x),d=Math.floor(e.y));for(var B=Math.abs(n-s),k=Math.abs(d-a),u=Math.floor(-B/2),C=s<n?1:-1,m=a<d?1:-1,f=!0,w=s,P=a;w!==n+C;w+=C){var v=i?P:w,h=i?w:P;if(r.get(v,h)!==f&&(f=!f,l.push({x:v,y:h}),l.length===c+1))break;if((u+=k)>0){if(P===d)break;P+=m,u-=B}}for(var y=[],p=0;p<c;p++)l[p]&&l[p+1]?y.push(t(l[p],l[p+1])):y.push(0);return y}function a(o,e,r,t){var c,a=e.y-o.y,n=e.x-o.x,d=s(o,e,r,Math.ceil(t/2)),l=s(o,{x:o.x-n,y:o.y-a},r,Math.ceil(t/2)),i=d.shift()+l.shift()-1;return(c=l.concat(i)).concat.apply(c,d)}function n(o,e){var r=c(o)/c(e),t=0;return e.forEach((function(e,c){t+=Math.pow(o[c]-e*r,2)})),{averageSize:r,error:t}}function d(o,e,r){try{var t=a(o,{x:-1,y:o.y},r,e.length),c=a(o,{x:o.x,y:-1},r,e.length),s=a(o,{x:Math.max(0,o.x-o.y)-1,y:Math.max(0,o.y-o.x)-1},r,e.length),d=a(o,{x:Math.min(r.width,o.x+o.y)+1,y:Math.min(r.height,o.y+o.x)+1},r,e.length),l=n(t,e),i=n(c,e),B=n(s,e),k=n(d,e),u=Math.sqrt(l.error*l.error+i.error*i.error+B.error*B.error+k.error*k.error),C=(l.averageSize+i.averageSize+B.averageSize+k.averageSize)/4;return u+(Math.pow(l.averageSize-C,2)+Math.pow(i.averageSize-C,2)+Math.pow(B.averageSize-C,2)+Math.pow(k.averageSize-C,2))/C}catch(o){return 1/0}}function l(o,e){for(var r=Math.round(e.x);o.get(r,Math.round(e.y));)r--;for(var t=Math.round(e.x);o.get(t,Math.round(e.y));)t++;for(var c=(r+t)/2,s=Math.round(e.y);o.get(Math.round(c),s);)s--;for(var a=Math.round(e.y);o.get(Math.round(c),a);)a++;return{x:c,y:(s+a)/2}}function i(o,e,r,s,n){var l,i,B;try{l=function(o,e,r,s){var n=(c(a(o,r,s,5))/7+c(a(o,e,s,5))/7+c(a(r,o,s,5))/7+c(a(e,o,s,5))/7)/4;if(n<1)throw new Error("Invalid module size");var d=Math.round(t(o,e)/n),l=Math.round(t(o,r)/n),i=Math.floor((d+l)/2)+7;switch(i%4){case 0:i++;break;case 2:i--}return{dimension:i,moduleSize:n}}(s,r,n,o),i=l.dimension,B=l.moduleSize}catch(o){return null}var k=r.x-s.x+n.x,u=r.y-s.y+n.y,C=(t(s,n)+t(s,r))/2/B,m=1-3/C,f={x:s.x+m*(k-s.x),y:s.y+m*(u-s.y)},w=e.map((function(e){var r=(e.top.startX+e.top.endX+e.bottom.startX+e.bottom.endX)/4,s=(e.top.y+e.bottom.y+1)/2;if(o.get(Math.floor(r),Math.floor(s))){var a=[e.top.endX-e.top.startX,e.bottom.endX-e.bottom.startX,e.bottom.y-e.top.y+1];c(a);return{x:r,y:s,score:d({x:Math.floor(r),y:Math.floor(s)},[1,1,1],o)+t({x:r,y:s},f)}}})).filter((function(o){return!!o})).sort((function(o,e){return o.score-e.score}));return{alignmentPattern:C>=15&&w.length?w[0]:f,dimension:i}}e.locate=function(o){for(var e=[],r=[],s=[],a=[],n=function(t){for(var n=0,d=!1,l=[0,0,0,0,0],i=function(e){var s=o.get(e,t);if(s===d)n++;else{l=[l[1],l[2],l[3],l[4],n],n=1,d=s;var i=c(l)/7,B=Math.abs(l[0]-i)<i&&Math.abs(l[1]-i)<i&&Math.abs(l[2]-3*i)<3*i&&Math.abs(l[3]-i)<i&&Math.abs(l[4]-i)<i&&!s,k=c(l.slice(-3))/3,u=Math.abs(l[2]-k)<k&&Math.abs(l[3]-k)<k&&Math.abs(l[4]-k)<k&&s;if(B){var C=e-l[3]-l[4],m=C-l[2],f={startX:m,endX:C,y:t};(w=r.filter((function(o){return m>=o.bottom.startX&&m<=o.bottom.endX||C>=o.bottom.startX&&m<=o.bottom.endX||m<=o.bottom.startX&&C>=o.bottom.endX&&l[2]/(o.bottom.endX-o.bottom.startX)<1.5&&l[2]/(o.bottom.endX-o.bottom.startX)>.5}))).length>0?w[0].bottom=f:r.push({top:f,bottom:f})}if(u){var w,P=e-l[4],v=P-l[3];f={startX:v,y:t,endX:P};(w=a.filter((function(o){return v>=o.bottom.startX&&v<=o.bottom.endX||P>=o.bottom.startX&&v<=o.bottom.endX||v<=o.bottom.startX&&P>=o.bottom.endX&&l[2]/(o.bottom.endX-o.bottom.startX)<1.5&&l[2]/(o.bottom.endX-o.bottom.startX)>.5}))).length>0?w[0].bottom=f:a.push({top:f,bottom:f})}}},B=-1;B<=o.width;B++)i(B);e.push.apply(e,r.filter((function(o){return o.bottom.y!==t&&o.bottom.y-o.top.y>=2}))),r=r.filter((function(o){return o.bottom.y===t})),s.push.apply(s,a.filter((function(o){return o.bottom.y!==t}))),a=a.filter((function(o){return o.bottom.y===t}))},B=0;B<=o.height;B++)n(B);e.push.apply(e,r.filter((function(o){return o.bottom.y-o.top.y>=2}))),s.push.apply(s,a);var k=e.filter((function(o){return o.bottom.y-o.top.y>=2})).map((function(e){var r=(e.top.startX+e.top.endX+e.bottom.startX+e.bottom.endX)/4,t=(e.top.y+e.bottom.y+1)/2;if(o.get(Math.round(r),Math.round(t))){var s=[e.top.endX-e.top.startX,e.bottom.endX-e.bottom.startX,e.bottom.y-e.top.y+1],a=c(s)/s.length;return{score:d({x:Math.round(r),y:Math.round(t)},[1,1,3,1,1],o),x:r,y:t,size:a}}})).filter((function(o){return!!o})).sort((function(o,e){return o.score-e.score})).map((function(o,e,r){if(e>4)return null;var t=r.filter((function(o,r){return e!==r})).map((function(e){return{x:e.x,y:e.y,score:e.score+Math.pow(e.size-o.size,2)/o.size,size:e.size}})).sort((function(o,e){return o.score-e.score}));if(t.length<2)return null;var c=o.score+t[0].score+t[1].score;return{points:[o].concat(t.slice(0,2)),score:c}})).filter((function(o){return!!o})).sort((function(o,e){return o.score-e.score}));if(0===k.length)return null;var u=function(o,e,r){var c,s,a,n,d,l,i,B=t(o,e),k=t(e,r),u=t(o,r);return k>=B&&k>=u?(d=(c=[e,o,r])[0],l=c[1],i=c[2]):u>=k&&u>=B?(d=(s=[o,e,r])[0],l=s[1],i=s[2]):(d=(a=[o,r,e])[0],l=a[1],i=a[2]),(i.x-l.x)*(d.y-l.y)-(i.y-l.y)*(d.x-l.x)<0&&(d=(n=[i,d])[0],i=n[1]),{bottomLeft:d,topLeft:l,topRight:i}}(k[0].points[0],k[0].points[1],k[0].points[2]),C=u.topRight,m=u.topLeft,f=u.bottomLeft,w=i(o,s,C,m,f),P=[];w&&P.push({alignmentPattern:{x:w.alignmentPattern.x,y:w.alignmentPattern.y},bottomLeft:{x:f.x,y:f.y},dimension:w.dimension,topLeft:{x:m.x,y:m.y},topRight:{x:C.x,y:C.y}});var v=l(o,C),h=l(o,m),y=l(o,f),p=i(o,s,v,h,y);return p&&P.push({alignmentPattern:{x:p.alignmentPattern.x,y:p.alignmentPattern.y},bottomLeft:{x:y.x,y:y.y},topLeft:{x:h.x,y:h.y},topRight:{x:v.x,y:v.y},dimension:p.dimension}),0===P.length?null:P}}]).default}));
/* ===== 库结束 ===== */
/* ================================================================
 * 末日带娃100天 · 第一阶段（框架+主页+三时段循环）
 * 结构：状态管理 -> 存档 -> 渲染 -> 行动(外出/照顾/加固) -> 夜晚结算
 * 备注：外出暂为简版搜刮事件，第二阶段替换为7地点挑战小游戏
 * ================================================================ */

/* ---------- 常量数据 ---------- */
// 图片（复用开场页已加载的老师立绘，避免base64重复内嵌）
// 注意必须用 getAttribute 拿「./assets/xx.png」原始相对路径；
// 直接读 .src 会被浏览器解析成绝对 URL，在小红书小工具沙箱（opaque origin）里解析失败 → 老师照片破图
const IMG_TEACHER = {
  male:   document.querySelector('#pick-male img').getAttribute('src'),
  female: document.querySelector('#pick-female img').getAttribute('src')
};

// 食物表：v=饱腹恢复值，mood=额外情绪
/* ---------- 病症系统：3种常见病 + 对应药品 ---------- */
const SICKNESSES = {
  fever:  {e:'🤒', n:'发烧',  med:'feverMed', medE:'💊', medN:'退烧药', hpDmg:8, moodDmg:5, herb:false},
  cough:  {e:'🤧', n:'咳嗽',  med:'coughMed', medE:'🍯', medN:'止咳糖浆', hpDmg:5, moodDmg:3, herb:true},
  injury: {e:'🩹', n:'受伤',  med:'bandage',  medE:'🩹', medN:'绷带',     hpDmg:10, moodDmg:2, herb:false},
};
const SICK_KEYS = Object.keys(SICKNESSES);

// v=饱腹恢复，sta=体力恢复（吃东西=补充能量，老师靠它在白天恢复外出体力），mood=心情
const FOODS = {
  apple :{e:'🍎', n:'苹果', v:10, sta:3, mood:2},
  bread :{e:'🍞', n:'面包', v:15, sta:5, mood:2},
  can   :{e:'🥫', n:'罐头', v:15, sta:5, mood:2},
  milk  :{e:'🥛', n:'牛奶', v:10, sta:6, mood:3},
  veg   :{e:'🥬', n:'蔬菜', v:12, sta:4, mood:3},
  noodle:{e:'🍜', n:'面条', v:18, sta:8, mood:5},
  cookie:{e:'🍪', n:'饼干', v:8, sta:3, mood:8},
  candy :{e:'🍬', n:'糖果', v:5, sta:4, mood:8},
  soda  :{e:'🥤', n:'汽水', v:8, sta:7, mood:8},
  cake  :{e:'🧁', n:'蛋糕', v:8, sta:4, mood:8},
  pudding:{e:'🍮',n:'布丁', v:5, sta:3, mood:8},
  // 💧水（游泳馆唯一产出，库存平铺在 inv.water 而非 inv.food）：廉价补水品，老师喝补体力、孩子喝补饱腹+心情，还能浇菜园
  water  :{e:'💧', n:'水', v:5, sta:6, mood:3},
};

// 三个孩子（性格固定）
const KIDS_DEF = [
  {id:'an',  name:'小安', trait:'安静胆小', idx:0, emoji:'👦'},
  {id:'le',  name:'小乐', trait:'活泼好动', idx:1, emoji:'👧'},
  {id:'nian',name:'小念', trait:'聪明敏感', idx:2, emoji:'👦'},
];

// 各孩子的等级技能解锁表（lv2~lv5）
// 孩子技能池：每孩子封顶 2 个技能。
// base=第1阶觉醒固定给；weak/mid/strong=第2/3/4阶各 2 选 1（第3/4阶为替换）
const KID_SKILL_POOL = {
  an:   { base:'医疗助手', weak:['耐心倾听','守夜小卫士'], mid:['夜间守护','天使之光'], strong:['温暖抱抱','应急处理'] },
  le:   { base:'跑腿能手', weak:['诱饵帮手','细心收拾'], mid:['敏捷闪避','认路'],     strong:['希望之心','小勇士'] },
  nian: { base:'观察力',   weak:['记忆力','过目不忘'],   mid:['冷静分析','知识之光'], strong:['一眼看中','灵感'] },
};
// 全部技能的展示信息（emoji + 描述）
const SKILL_INFO = {
  '医疗助手':{e:'🩺',d:'急救包/草药治疗量 +50%'},
  '耐心倾听':{e:'💕',d:'每日自动安抚 1 次（情绪 +8）'},
  '守夜小卫士':{e:'🛏️',d:'夜间情绪惩罚减半'},
  '夜间守护':{e:'🛡️',d:'夜袭 10% 概率全员防御 +2'},
  '天使之光':{e:'☀️',d:'全队 HP 每日 +5'},
  '温暖抱抱':{e:'💖',d:'孩子倒下被救治时，HP 额外恢复 +10'},
  '应急处理':{e:'🩹',d:'孩子首次受伤/生病，40% 概率被化解'},
  '跑腿能手':{e:'💨',d:'外出体力消耗 -2'},
  '诱饵帮手':{e:'📢',d:'声音诱饵诱走 +1 只'},
  '细心收拾':{e:'🎒',d:'外出战利品概率多 1 件基础材料'},
  '敏捷闪避':{e:'💨',d:'夜袭受击损伤减半'},
  '认路':{e:'🗺️',d:'雾/雨外出不额外消耗体力'},
  '希望之心':{e:'🌟',d:'全队情绪每日 +3'},
  '小勇士':{e:'🦸',d:'挑战失败时健康损失减半'},
  '观察力':{e:'🧠',d:'战利品候选 +1（5→6 格可选，不带回家）'},
  '记忆力':{e:'🧠',d:'夜袭丧尸数量 -1'},
  '过目不忘':{e:'📖',d:'捡到图纸的概率提升'},
  '冷静分析':{e:'🧮',d:'外出高级材料出现率提升'},
  '知识之光':{e:'🔍',d:'每日 35% 概率额外发生 1 件温情小事'},
  '一眼看中':{e:'👁️',d:'外出战利品多带 1 件'},
  '灵感':{e:'💡',d:'制作/升级 25% 概率不消耗体力'},
};
// 兼容旧引用：按 coreLv 取「该阶默认技能」（仅迁移/显示兜底，真实生效以 k.skills 为准）
const KID_SKILLS = {
  an:   [null, {n:'医疗助手',d:SKILL_INFO['医疗助手'].d}, {n:'耐心倾听',d:SKILL_INFO['耐心倾听'].d}, {n:'夜间守护',d:SKILL_INFO['夜间守护'].d}, {n:'天使之光',d:SKILL_INFO['天使之光'].d}],
  le:   [null, {n:'跑腿能手',d:SKILL_INFO['跑腿能手'].d}, {n:'诱饵帮手',d:SKILL_INFO['诱饵帮手'].d}, {n:'敏捷闪避',d:SKILL_INFO['敏捷闪避'].d}, {n:'希望之心',d:SKILL_INFO['希望之心'].d}],
  nian: [null, {n:'观察力',d:SKILL_INFO['观察力'].d}, {n:'记忆力',d:SKILL_INFO['记忆力'].d}, {n:'冷静分析',d:SKILL_INFO['冷静分析'].d}, {n:'知识之光',d:SKILL_INFO['知识之光'].d}],
};

// 每日事件池：按 day 区间触发（early 1-30 / mid 31-60 / late 61+）
// effect(kids, state, logs) 可改孩子/物资/状态，返回一段中文叙事
const DAILY_EVENTS = [
  // --- early 1-30：日常温情 ---
  {days:[1,30], p:0.35, t:'小安在墙角发现一只还活着的小麻雀，小心翼翼捧到你面前。', eff:(kids,s,log)=>{ kids[0].mood=clamp(kids[0].mood+10,0,100); kids[0].trust+=2; log.push('你帮他把麻雀放进纸盒里养着，小安紧张又兴奋，一整天都守着它。（小安 情绪+10 信任+2）'); }},
  {days:[1,30], p:0.3, t:'小乐把报纸折成帽子分给大家，三个人笑成一团。', eff:(kids,s,log)=>{ kids.forEach(k=>{k.mood=clamp(k.mood+5,0,100);k.trust+=1;}); log.push('你也戴上了一顶歪歪的帽子，孩子们笑得东倒西歪，屋子里好久没这么热闹了。（全员 情绪+5 信任+1）'); }},
  {days:[1,30], p:0.3, t:'小念用粉笔在地板上画了一朵花，花瓣里写着每个家人的名字。', eff:(kids,s,log)=>{ kids[2].mood=clamp(kids[2].mood+8,0,100); kids[2].trust+=2; log.push('你蹲下来看了好久，小念害羞地把你也画进了那朵花里。（小念 情绪+8 信任+2）'); }},
  {days:[1,30], p:0.25, t:'你翻冰箱时发现半罐可乐，三个人分着喝，笑得眼睛都弯了。', eff:(kids,s,log)=>{ if(s.inv.food.cookie>0||s.inv.food.milk>0){ s.inv.food.cookie=Math.max(0,(s.inv.food.cookie||0)-1); kids.forEach(k=>{k.mood=clamp(k.mood+6,0,100);k.fed=clamp(k.fed+5,0,100);}); log.push('你把可乐兑了点水，三个人分着喝，甜得眼睛都弯了。（消耗食物×1，全员 情绪+6 饱腹+5）'); } else { kids[1].mood=clamp(kids[1].mood-5,0,100); log.push('可乐早空了，小乐有点难过，你答应他明天再找找。（小乐 情绪-5）'); } }},
  {days:[1,30], p:0.25, t:'外面传来几声狗叫，不像丧尸，像是还活着的狗。', eff:(kids,s,log)=>{ kids[1].mood=clamp(kids[1].mood+5,0,100); log.push('小乐竖着耳朵听了半天，小声问「也有狗狗在外面活着对不对」，你点了点头。（小乐 情绪+5）'); }},
  {days:[1,30], p:0.2, t:'小安半夜从噩梦里哭醒，你抱着他坐了好久。', eff:(kids,s,log)=>{ kids[0].mood=clamp(kids[0].mood+8,0,100); kids[0].trust+=2; kids[0].comforted=true; log.push('你抱着他坐了好久，直到他在你怀里睡着，小手还紧紧抓着你的衣角。（小安 情绪+8 信任+2，可安抚）'); }},
  {days:[1,30], p:0.22, t:'雨停了，天边挂出一道彩虹。三个孩子扒着窗看了好久，小念说那是云在画画。', eff:(kids,s,log)=>{ kids.forEach(k=>{k.mood=clamp(k.mood+6,0,100);k.trust+=1;}); log.push('你陪他们看完了整道彩虹，屋子里的气氛温暖得不像末日。（全员 情绪+6 信任+1）'); }},
  {days:[1,30], p:0.2, t:'小乐今天第一次自己把鞋子穿对了，举着脚给每个人看，骄傲得不得了。', eff:(kids,s,log)=>{ kids[1].mood=clamp(kids[1].mood+8,0,100); kids[1].trust+=2; log.push('你夸了他好久，他一整天都把脚抬得高高的走路。（小乐 情绪+8 信任+2）'); }},
  {days:[1,30], p:0.2, t:'夜里有点凉，小安把自己的小毯子分了一半给缩成一团的小念。', eff:(kids,s,log)=>{ kids[0].trust+=2; kids.forEach(k=>k.mood=clamp(k.mood+3,0,100)); log.push('你看着这一幕，心里软了一块，悄悄把窗缝又堵严了些。（小安 信任+2，全员 情绪+3）'); }},
  {days:[1,30], p:0.18, t:'停电的晚上，你们挤在天台数星星。小乐数到三就数乱了，大家笑成一团。', eff:(kids,s,log)=>{ kids.forEach(k=>{k.mood=clamp(k.mood+7,0,100);k.trust+=1;}); log.push('那是很久以来，第一个让人忘记害怕的夜晚。（全员 情绪+7 信任+1）'); }},

  // --- early 1-30：小冒险 ---
  {days:[1,30], p:0.18, t:'围墙外传来一个小孩的哭声，断断续续的，分不清是真是假。',
    choices:[
      {label:'冒险开门去看一眼', eff:(kids,s,log)=>{ const r=Math.random(); if(r<0.35){ s.inv.food.cookie=(s.inv.food.cookie||0)+2; log.push('你在大门边捡到一袋被落下的饼干，赶紧退了回来。（获得 🍪×2）'); } else if(r<0.7){ s.teacher.sta=clamp(s.teacher.sta-6,0,100); s.teacher.san=clamp(s.teacher.san-4,0,100); log.push('哭声突然停了，你什么都没找到，腿软着退回来。（体力-6 理智-4）'); } else { s.teacher.sta=clamp(s.teacher.sta-10,0,100); s.teacher.san=clamp(s.teacher.san-8,0,100); log.push('那不是小孩，是丧尸学的声音！你拼命往回跑。（体力-10 理智-8）'); } }},
      {label:'关紧门，抱紧自己的孩子', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san+2,0,100); kids.forEach(k=>k.mood=clamp(k.mood-3,0,100)); log.push('你不敢赌。小安问为什么不去救，你只能说我们先保护好自己。（理智+2，全员 情绪-3）'); }},
    ]},
  {days:[1,30], p:0.18, t:'一只鼓鼓的塑料袋被风吹到了天台，里面不知道装了什么。',
    choices:[
      {label:'打开看看', eff:(kids,s,log)=>{ if(Math.random()<0.6){ s.inv.food.candy=(s.inv.food.candy||0)+1; log.push('里面是一包糖果，运气不错。（获得 🍬×1）'); } else { kids.forEach(k=>k.mood=clamp(k.mood-2,0,100)); log.push('是空的，你白高兴一场。（全员 情绪-2）'); } }},
      {label:'不去碰，扔下去', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san+2,0,100); log.push('不碰来路不明的东西，心里踏实。（理智+2）'); }},
    ]},
  {days:[1,30], p:0.18, t:'半夜，窗外有一点亮光在远处晃，像手电筒，又像手机。',
    choices:[
      {label:'用镜子反射回应', eff:(kids,s,log)=>{ if(Math.random()<0.5){ s.teacher.san=clamp(s.teacher.san+3,0,100); kids.forEach(k=>k.mood=clamp(k.mood+3,0,100)); log.push('那边也闪了三下，像有人在打招呼，你心里暖了一下。（理智+3，全员 情绪+3）'); } else { s.teacher.san=clamp(s.teacher.san-4,0,100); log.push('亮光突然灭了，你后怕了好久。（理智-4）'); } }},
      {label:'拉好窗帘睡觉', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san+2,0,100); kids.forEach(k=>k.mood=clamp(k.mood-2,0,100)); log.push('你选择不去招惹未知。（理智+2，全员 情绪-2）'); }},
    ]},

  // --- mid 31-60：紧张抉择 ---
  {days:[31,60], p:0.25, t:'你在幼儿园门口发现了隔壁张阿姨落下的购物袋，还没拆封。但她人……', eff:(kids,s,log)=>{ s.inv.food.bread=(s.inv.food.bread||0)+1; s.inv.food.can=(s.inv.food.can||0)+1; kids.forEach(k=>{k.mood=clamp(k.mood+3,0,100);}); log.push('你默默把袋子拎了回来，心里说不出的滋味，孩子们看到吃的却高兴坏了。（获得 🥖×1 🥫×1，全员 情绪+3）'); }},
  {days:[31,60], p:0.2, t:'小念在阁楼翻出一本儿童医学手册，里面夹着一张你多年前的照片。', eff:(kids,s,log)=>{ kids[2].trust+=2; kids[2].mood=clamp(kids[2].mood+5,0,100); log.push('照片上的你笑得很开心。小念说「老师以前也这么好看」，你摸了摸他的头。（小念 信任+2 情绪+5）'); }},
  {days:[31,60], p:0.2, t:'一个幸存者敲了敲幼儿园的门，用手势比着"食物换药品"。',
    choices:[
      {label:'用 🩺×1 换他的 🥫×2', eff:(kids,s,log)=>{ if((s.inv.med||0)>=1){ s.inv.med--; s.inv.food.can=(s.inv.food.can||0)+2; kids.forEach(k=>k.mood=clamp(k.mood+3,0,100)); log.push('你做了这笔交易。孩子们看着新来的罐头，眼睛都亮了。（获得 🥫×2，全员 情绪+3）'); } else { log.push('你没有急救包可换。'); } }},
      {label:'婉拒他，让他快点走', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san+5,0,100); log.push('你关上了门。外面还有人在挣扎，可你实在顾不了那么多，心里沉甸甸的。（理智+5）'); }},
    ]},
  {days:[31,60], p:0.18, t:'小乐从后院捡回来一把还能用的锤子。', eff:(kids,s,log)=>{ s.inv.part=(s.inv.part||0)+1; s.inv.mat=(s.inv.mat||0)+2; kids[1].trust+=2; kids[1].mood=clamp(kids[1].mood+5,0,100); log.push('他举着锤子跑得气喘吁吁，说「老师这个能钉钉子！」，满脸都是骄傲。（获得 ⚙️×1 🪵×2，小乐 信任+2 情绪+5）'); }},
  {days:[31,60], p:0.18, t:'幼儿园广播突然响了一下，又断了。三个人都愣住了。',
    choices:[
      {label:'关窗锁门，假装什么都没发生', eff:(kids,s,log)=>{ kids.forEach(k=>k.mood=clamp(k.mood-3,0,100)); s.teacher.san=clamp(s.teacher.san+3,0,100); log.push('你选了最安全的做法，可孩子们被那声响吓得不轻，谁都不敢说话。（理智+3，全员 情绪-3）'); }},
      {label:'悄悄推开一条缝，听听是不是有人', eff:(kids,s,log)=>{ if(Math.random()<0.5){ s.inv.food.apple=(s.inv.food.apple||0)+1; kids[1].trust+=2; log.push('你捡到一个滚过来的苹果，小乐信任地看着你。（获得 🍎×1，小乐 信任+2）'); } else { s.teacher.san=clamp(s.teacher.san-8,0,100); kids.forEach(k=>k.mood=clamp(k.mood-8,0,100)); log.push('外面什么都没有，只有嘶吼声更近了。你退回屋里，心跳得厉害。（理智-8，全员 情绪-8）'); } }},
    ]},
  {days:[31,60], p:0.2, t:'傍晚的天红得像着了火，三个孩子坐在台阶上看，谁都没说话。', eff:(kids,s,log)=>{ kids.forEach(k=>k.mood=clamp(k.mood+4,0,100)); log.push('你不知道这片天还能看多久，只想把这一刻记在心里。（全员 情绪+4）'); }},
  {days:[31,60], p:0.2, t:'有人从门缝塞进一封信，信封上没有署名。',
    choices:[
      {label:'拆开看看', eff:(kids,s,log)=>{ if(Math.random()<0.5){ s.teacher.san=clamp(s.teacher.san+3,0,100); log.push('信上画了一张附近的路线图，你认真收了起来。（理智+3）'); } else { s.teacher.san=clamp(s.teacher.san-6,0,100); kids.forEach(k=>k.mood=clamp(k.mood-4,0,100)); log.push('信上只有一句威胁的话，你心里发寒。（理智-6，全员 情绪-4）'); } }},
      {label:'不拆，直接烧掉', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san+3,0,100); kids.forEach(k=>k.mood=clamp(k.mood-2,0,100)); log.push('你不想被外人左右。少了一个麻烦，孩子们却问那是谁写的。（理智+3，全员 情绪-2）'); }},
    ]},
  {days:[31,60], p:0.18, t:'小念指着招牌上认识的字念给你听，念错了好几个，你还是夸了他。', eff:(kids,s,log)=>{ kids[2].trust+=2; kids[2].mood=clamp(kids[2].mood+6,0,100); log.push('他越念越大声，小乐也跟着乱念，屋子里全是读书声。（小念 信任+2 情绪+6）'); }},
  {days:[31,60], p:0.18, t:'不知道是谁的生日，你们用泥巴捏了个蛋糕，插了三根草当蜡烛。', eff:(kids,s,log)=>{ kids.forEach(k=>{k.mood=clamp(k.mood+8,0,100);k.trust+=1;}); log.push('三个人许愿许了好久，小安许的是「希望每天都有饭吃」。（全员 情绪+8 信任+1）'); }},

  // --- mid 31-60：冒险抉择 ---
  {days:[31,60], p:0.2, t:'门外传来罐头滚动的声音，不知道是谁放在那儿的。',
    choices:[
      {label:'悄悄出去捡', eff:(kids,s,log)=>{ if(Math.random()<0.6){ s.inv.food.can=(s.inv.food.can||0)+2; log.push('你捡到两罐罐头，没惊动任何东西。（获得 🥫×2）'); } else { s.teacher.sta=clamp(s.teacher.sta-8,0,100); s.teacher.san=clamp(s.teacher.san-5,0,100); log.push('罐头是个诱饵，你撞见一只丧尸，狼狈退回。（体力-8 理智-5）'); } }},
      {label:'当没听见', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san+3,0,100); kids.forEach(k=>k.mood=clamp(k.mood-2,0,100)); log.push('多一事不如少一事。（理智+3，全员 情绪-2）'); }},
    ]},
  {days:[31,60], p:0.2, t:'小乐说屋顶的天线好像亮了一下，也许能收到广播。',
    choices:[
      {label:'冒险爬上去调试', eff:(kids,s,log)=>{ const r=Math.random(); if(r<0.4){ s.teacher.san=clamp(s.teacher.san+5,0,100); kids.forEach(k=>k.mood=clamp(k.mood+3,0,100)); log.push('你收到一段模糊的新闻，知道了外面的一些消息。（理智+5，全员 情绪+3）'); } else if(r<0.7){ s.teacher.sta=clamp(s.teacher.sta-8,0,100); log.push('什么都没收到，还差点摔下来。（体力-8）'); } else { s.teacher.sta=clamp(s.teacher.sta-6,0,100); s.teacher.san=clamp(s.teacher.san-6,0,100); log.push('天线引来了附近的丧尸，你赶紧下来加固门窗。（体力-6 理智-6）'); } }},
      {label:'算了，太危险', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san+2,0,100); kids[1].mood=clamp(kids[1].mood-3,0,100); log.push('你不想拿命去赌一条广播，小乐有点失望。（理智+2，小乐 情绪-3）'); }},
    ]},
  {days:[31,60], p:0.2, t:'一个老人路过幼儿园门口，有气无力地朝你挥手。',
    choices:[
      {label:'隔着铁门递点食物给他', eff:(kids,s,log)=>{ if((s.inv.food.bread||0)>=1){ s.inv.food.bread--; s.teacher.san=clamp(s.teacher.san+3,0,100); kids.forEach(k=>k.mood=clamp(k.mood+2,0,100)); log.push('你递了半块面包出去，老人感激地作揖。你没开门，却也没冷眼旁观。（消耗 🍞×1，理智+3，全员 情绪+2）'); } else { log.push('你没有多余的食物可分。'); } }},
      {label:'转身不看', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san+2,0,100); kids.forEach(k=>k.mood=clamp(k.mood-3,0,100)); log.push('你转过了身，可那个画面一直在脑子里。（理智+2，全员 情绪-3）'); }},
    ]},

  // --- late 61+：危险抉择 ---
  {days:[61,99], p:0.22, t:'有人在围墙外用喇叭喊"我们有救了！"——但声音在半分钟后戛然而止。',
    choices:[
      {label:'让孩子们待在屋里，你出去看一眼', eff:(kids,s,log)=>{ const r = Math.random(); if(r<0.4){ s.inv.food.can=(s.inv.food.can||0)+3; log.push('你在大门外发现了三罐被遗弃的罐头，赶紧拎了回来。（获得 🥫×3）'); } else if(r<0.7){ s.inv.mat=(s.inv.mat||0)+3; log.push('你安全回来了，还带回一些材料，孩子们欢呼起来。（获得 🪵×3）'); } else { s.teacher.sta=clamp(s.teacher.sta-10,0,100); s.teacher.san=clamp(s.teacher.san-10,0,100); log.push('你看见喇叭掉在地上，旁边一个人都没有。你不敢再想下去，腿都站不稳。（体力-10 理智-10）'); } }},
      {label:'假装没听见，关紧窗户', eff:(kids,s,log)=>{ kids.forEach(k=>k.mood=clamp(k.mood-10,0,100)); s.teacher.san=clamp(s.teacher.san-5,0,100); log.push('孩子们也听到了。没人说话，空气变得很沉，谁都没睡好。（全员 情绪-10，理智-5）'); }},
    ]},
  {days:[61,99], p:0.2, t:'小念把自己的画纸全部铺在地上，拼成一张"未来的家"。', eff:(kids,s,log)=>{ kids[2].trust+=2; kids[2].mood=clamp(kids[2].mood+10,0,100); log.push('小念把大家未来的样子都画了进去，你看着看着就红了眼眶。（小念 信任+2 情绪+10）'); }},
  {days:[61,99], p:0.2, t:'小安主动帮你整理物资清单，手指抖得厉害但字很工整。', eff:(kids,s,log)=>{ kids[0].trust+=2; kids[0].mood=clamp(kids[0].mood+5,0,100); log.push('他拼命想帮上忙，你忍住眼泪，夸他写得真好看。（小安 信任+2 情绪+5）'); }},
  {days:[61,99], p:0.18, t:'小乐偷偷把自己的面包分了一半给倒下的小安。', eff:(kids,s,log)=>{ if(kids[0].down){ kids[0].hp=clamp(kids[0].hp+20,0,100); kids[1].trust+=2; kids[1].fed=clamp(kids[1].fed-10,0,100); log.push('小乐把面包塞到小安嘴边，自己饿着肚子说「你先吃」。（小安 健康+20，小乐 信任+2 饱腹-10）'); } else { kids[1].trust+=2; kids[0].trust+=2; log.push('小乐把面包掰成两半，硬塞了一半给小安。（小乐 信任+2，小安 信任+2）'); } }},

  // --- late 61-80：挣扎抉择 ---
  {days:[61,80], p:0.2, t:'远处马路上有车队慢慢开过，车灯扫过幼儿园的围墙，又开走了。',
    choices:[
      {label:'冒险上天台，用手电筒发信号', eff:(kids,s,log)=>{ if(Math.random()<0.5){ s.inv.food.can=(s.inv.food.can||0)+2; s.inv.food.bread=(s.inv.food.bread||0)+1; log.push('车队真的回了信号，第二天你在围墙边发现了两罐罐头和一袋面包，又紧张又庆幸。（获得 🥫×2 🥖×1）'); } else { s.teacher.sta=clamp(s.teacher.sta-8,0,100); s.teacher.san=clamp(s.teacher.san-6,0,100); log.push('信号没引来车队，反而惊动了附近游荡的丧尸，你跌跌撞撞退回来，腿都软了。（体力-8 理智-6）'); } }},
      {label:'熄灯、拉紧窗帘假装没人', eff:(kids,s,log)=>{ kids.forEach(k=>k.mood=clamp(k.mood-4,0,100)); s.teacher.san=clamp(s.teacher.san+3,0,100); log.push('你熄了灯，听着车声远去。孩子们也扒着窗户看见了车灯，失望地睡不着。（情绪-4，理智+3）'); }},
    ]},
  {days:[61,80], p:0.2, t:'一个浑身是血的男人拍着大门哭喊，说他知道救援集结点，求你给他口水喝。',
    choices:[
      {label:'开门递水，听他说完', eff:(kids,s,log)=>{ if(Math.random()<0.3){ s.inv.med=(s.inv.med||0)+1; log.push('他感激地留下一个急救包就走了，你没敢追问集结点的真假，关上门后手还在抖。（获得 🩺×1）'); } else { s.teacher.sta=clamp(s.teacher.sta-5,0,100); s.teacher.san=clamp(s.teacher.san-4,0,100); log.push('他说得颠三倒四，喝完水就消失了，你什么都没换到，却一直担心他会不会带丧尸回来。（体力-5 理智-4）'); } }},
      {label:'从门缝递水，不让他进', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san+2,0,100); kids.forEach(k=>k.mood=clamp(k.mood-2,0,100)); log.push('你隔着门递了水，没让他进来。保持警惕让你安心些，可他的哭声把孩子们也吓到了。（理智+2，全员 情绪-2）'); }},
    ]},
  {days:[61,80], p:0.18, t:'小乐把废报纸剪得歪歪扭扭，做成三张「奖状」，他还不是很认识字，在上面涂了很多花花草草，一人一张。', eff:(kids,s,log)=>{ kids.forEach(k=>{k.mood=clamp(k.mood+8,0,100);k.trust+=1;}); log.push('虽然字一个都不对，可三张奖状被你们郑重地贴在了墙上。（全员 情绪+8 信任+1）'); }},
  {days:[61,80], p:0.18, t:'你撞见小安在偷偷画画，他赶紧把本子合上。后来你看到上面画着幼儿园里的四人手牵着手，还画了很多爱心。', eff:(kids,s,log)=>{ kids[0].trust+=2; kids[0].mood=clamp(kids[0].mood+6,0,100); log.push('那幅画被你悄悄收进了抽屉，打算等一切结束了再还给他。（小安 信任+2 情绪+6）'); }},
  {days:[61,80], p:0.15, t:'深夜，收音机自己响了一下，传来一段陌生的童谣，又变成刺耳的杂音。三个孩子都醒了，挤到你身边。', eff:(kids,s,log)=>{ kids.forEach(k=>k.mood=clamp(k.mood-4,0,100)); s.teacher.san=clamp(s.teacher.san-2,0,100); log.push('你把收音电池抠了出来，可那段童谣一直在脑子里响。（全员 情绪-4，理智-2）'); }},
  {days:[61,80], p:0.18, t:'天台角落挂着一架坠毁的无人机，零件还很新。',
    choices:[
      {label:'拆下零件带走', eff:(kids,s,log)=>{ s.inv.chip=(s.inv.chip||0)+1; s.inv.alloy=(s.inv.alloy||0)+1; s.teacher.san=clamp(s.teacher.san-3,0,100); log.push('你拆下了芯片和合金，可拆的时候一直怕发出声响引来丧尸，手心全是汗。（获得 🖥️×1 🔩×1，理智-3）'); }},
      {label:'不去碰，保持安静', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san+2,0,100); kids.forEach(k=>k.mood=clamp(k.mood+1,0,100)); log.push('你决定不冒险。保持安静让你松了口气，孩子们也安安静静的。（理智+2，全员 情绪+1）'); }},
    ]},

  // --- late 81-99：末日前夜 ---
  {days:[81,99], p:0.18, t:'后半夜，三个孩子都醒了。远处城市的方向，火光把半边天都映成暗红色，像有什么东西在燃烧。', eff:(kids,s,log)=>{ kids.forEach(k=>k.mood=clamp(k.mood-5,0,100)); s.teacher.san=clamp(s.teacher.san-4,0,100); log.push('你把窗帘拉得严严实实，可那片红光一直烙在脑海里，谁都没再睡着。（全员 情绪-5，理智-4）'); }},
  {days:[81,99], p:0.18, t:'小念把「未来的家」那幅画翻到背面，用铅笔在角落写了「爸爸妈妈我好想你们」，又赶紧涂掉。', eff:(kids,s,log)=>{ kids[2].trust+=2; kids[2].mood=clamp(kids[2].mood+4,0,100); s.teacher.san=clamp(s.teacher.san-2,0,100); log.push('你假装没看见，背过身去擦了擦眼睛。（小念 信任+2 情绪+4，理智-2）'); }},
  {days:[81,99], p:0.2, t:'无线电里传来断断续续的人声："……第100天……城北广场……集合……"信号就断了。',
    choices:[
      {label:'记下坐标，到时候赌一把去', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san-3,0,100); kids.forEach(k=>k.mood=clamp(k.mood+4,0,100)); log.push('你脑海里一直在推敲这件事的真假，连饭都吃不香了。孩子们什么都不懂，以为是有人来救援了，非常开心。（理智-3，全员 情绪+4）'); }},
      {label:'当没听见，守在这里', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san+2,0,100); kids.forEach(k=>k.mood=clamp(k.mood-3,0,100)); log.push('你把这个念头压了下去，可那串坐标还是会偶尔冒出来。孩子们有点失望，以为你没听到。（理智+2，全员 情绪-3）'); }},
    ]},
  {days:[81,99], p:0.18, t:'临睡前三个小家伙抱成一团小声说话。小安拍拍心口说「别怕，老师会保护我们的」，小乐说「老师说我们还有很多饭吃」，小念说「我可以少吃一点的，但是就是会有一点点饿」。', eff:(kids,s,log)=>{ kids.forEach(k=>{k.mood=clamp(k.mood+10,0,100);k.trust+=1;}); log.push('你站在门口听了好久，没敢出声，也没敢让他们看见你哭。（全员 情绪+10 信任+1）'); }},
  {days:[81,99], p:0.2, t:'围墙外被扔进来一个旧背包，里面有动静，也不知道是谁丢的。',
    choices:[
      {label:'打开检查', eff:(kids,s,log)=>{ const r=Math.random(); if(r<0.4){ s.inv.food.bread=(s.inv.food.bread||0)+1; s.inv.food.can=(s.inv.food.can||0)+1; s.inv.food.apple=(s.inv.food.apple||0)+1; log.push('里面是罐头、面包和苹果，像有人特意留给你们的，孩子们高兴坏了。（获得 食物×3）'); } else if(r<0.7){ s.inv.mat=(s.inv.mat||0)+2; log.push('里面是一些能用的材料，虽然不知是谁丢的，但能用上就好。（获得 🪵×2）'); } else { kids.forEach(k=>k.mood=clamp(k.mood-5,0,100)); log.push('里面空空的，什么都没有。你被自己的期待吓了一跳，孩子们也有些失落。（全员 情绪-5）'); } }},
      {label:'原封不动丢回去', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san+2,0,100); log.push('你把背包丢了出去，不碰来路不明的东西，心里踏实多了。（理智+2）'); }},
    ]},
  {days:[81,99], p:0.15, t:'今晚太安静了，安静得不正常。连往常的嘶吼声都没有，你反而更睡不着。', eff:(kids,s,log)=>{ s.teacher.san=clamp(s.teacher.san-3,0,100); kids.forEach(k=>k.mood=clamp(k.mood-2,0,100)); log.push('你握着木棍坐了一夜，越是安静，心里越是发毛。（理智-3，全员 情绪-2）'); }},
];

// 加固点位（Lv0破败/Lv1修补/Lv2坚固/Lv3铜墙/Lv4堡垒/Lv5要塞；可被打到负数——夜晚系统第四阶段接入）
const SPOTS = [
  {k:'win', n:'窗户', e:'🪟'},
  {k:'door',n:'大门', e:'🚪'},
  {k:'wall',n:'围墙', e:'🧱'},
  {k:'back',n:'后门', e:'🚪'},
  {k:'roof',n:'屋顶', e:'🏚️'},
  {k:'top', n:'天台', e:'🌤️'},
];
// 加固升级消耗（按点位分，每个点位3级升级消耗不同）
// 格式：win:[Lv0->1, Lv1->2, Lv2->3]
const FORT_COST = {
  win:  [{mat:2},            {mat:4,bat:1},      {mat:8,bat:2},          {mat:12,part:3,glass:1},  {mat:18,part:5,alloy:2}],       // 窗户
  door: [{mat:3},            {mat:6,part:1},     {mat:10,part:2},       {mat:15,steel:2,part:3},  {mat:22,steel:4,alloy:3}],      // 大门
  wall: [{mat:4},            {mat:8,wire:1},     {mat:12,wire:2},       {mat:18,steel:3,wire:3},  {mat:25,steel:5,alloy:2}],      // 围墙
  roof: [{mat:3},            {mat:6,part:1},     {mat:10,part:2},       {mat:14,chip:2,part:3},   {mat:20,chip:4,alloy:3}],       // 屋顶
  back: [{mat:2},            {mat:5,wire:1},     {mat:8,wire:2},        {mat:12,steel:1,wire:3},  {mat:18,steel:3,alloy:2}],      // 后门
  top:  [{mat:5},            {mat:10,bat:2},     {mat:15,bat:3},        {mat:22,chip:3,part:3},   {mat:30,chip:5,alloy:4}],       // 天台
};
// 修复消耗（被丧尸打到负数时）：从当前等级恢复到 target（破损前的等级）
// 规则：逐级取 FORT_COST 的升级消耗，乘以1.5向上取整后累加，一次点击补回全部掉级
function repairCost(k, lv, target){
  if(target===undefined) target = Math.max(0, lv) + 1;
  const c = {};
  // 逐级恢复：负数级（破损/崩塌）按 Lv0->1 的消耗算，之后按对应等级消耗累加
  for(let cur = lv; cur < target; cur++){
    const up = FORT_COST[k][Math.max(0, cur)] || FORT_COST[k][0];
    if(!up) continue;
    for(const key in up) c[key] = (c[key] || 0) + Math.ceil(up[key] * 1.5);
  }
  return c;
}
// 缺料明细文本：只列出不够的材料（图标+名称×还差多少）
function lackText(cost){
  return Object.entries(cost)
    .filter(([k,v])=> (state.inv[k]||0) < v)
    .map(([k,v])=> `${(ITEM_INFO[k]||{}).e||''}${(ITEM_INFO[k]||{}).n||k}×${v-(state.inv[k]||0)}`)
    .join('、');
}
// 检查消耗是否足够
function canAfford(cost){
  for(const key in cost){ if((state.inv[key]||0) < cost[key]) return false; }
  return true;
}
// 扣除消耗
function payCost(cost){
  for(const key in cost){ state.inv[key] -= cost[key]; }
}
// 消耗文本：图标 + 拥有/需要（拥有够=绿，不够=灰，需要=红）
function costText(cost){
  return Object.entries(cost).map(([k,v])=>{
    const have = state.inv[k] || 0;
    const e = (ITEM_INFO[k]||{}).e || '';
    const haveColor = have>=v ? '#2E7D32' : '#999';
    return `<span title="${(ITEM_INFO[k]||{}).n||k}：你有 ${have}，需要 ${v}">${e}<b style="color:${haveColor}">${have}</b><small style="color:#bbb">/</small><b style="color:#E74C3C">${v}</b></span>`;
  }).join(' ');
}
// 防御度计算：每个点位等级对应防御值，加上设备加成
// Lv-2=-2, Lv-1=0, Lv0=1, Lv1=2, Lv2=4, Lv3=8
const LV_DEFENSE = {'-2':-2, '-1':0, '0':1, '1':2, '2':4, '3':7, '4':11, '5':16};
// 设备不再直接加防御值，改为放置在点位上于夜袭时触发击杀/削弱效果
function spotDefense(k){ return LV_DEFENSE[state.fort[k]] || 0; }
function calcDefense(){
  // 仅统计6个加固点位的防御值
  return Math.max(0, SPOTS.reduce((s,sp)=>s+spotDefense(sp.k), 0));
}
// 最大防御度（6点位全Lv5 = 16×6 = 96）
const MAX_DEFENSE = 96;

// 加固点位等级文本与样式
function lvText(lv){
  return lv>=5?'Lv5 要塞':lv===4?'Lv4 堡垒':lv===3?'Lv3 铜墙':lv===2?'Lv2 坚固':lv===1?'Lv1 修补':lv===0?'Lv0 破败':lv===-1?'破损':'崩塌';
}
function lvClass(lv){
  return lv>=2?'lv-ok':lv>=1?'lv-mid':lv===0?'lv-low':'lv-broken';
}

// 时段定义：上午3节 + 下午3节 共6节可外出，晚上只能在家
const SLOTS = [
  {k:'morning',    name:'早上 6:00'},
  {k:'forenoon1',  name:'上午 9:00'},
  {k:'forenoon2',  name:'上午 11:00'},
  {k:'afternoon1', name:'下午 13:00'},
  {k:'afternoon2', name:'下午 15:00'},
  {k:'dusk',       name:'傍晚 18:00'},
  {k:'evening',    name:'晚上 21:00'},
];
const DAY_OUT_MAX = 6; // 每天最多6节外出（上午3节+下午3节），用完或主动「回家」后进入夜晚
const NIGHT_SLOT = 6;  // 晚上时段编号
const LATE_FROM = 5;   // 从第5节外出起天色渐晚、风险升高（前4节安稳）

// 每日随机天气（纯氛围，每天清晨刷新；w为权重，越大越常见）
const WEATHERS = [
  {k:'sun',      e:'☀️', n:'晴',     w:28, flavor:'阳光照进教室，是难得的温暖一天。'},
  {k:'cloud',    e:'⛅', n:'多云',   w:24, flavor:'云层很厚，天色灰灰的。'},
  {k:'overcast', e:'☁️', n:'阴',     w:18, flavor:'阴沉的天，孩子们也安静了些。'},
  {k:'fog',      e:'🌫️', n:'雾',    w:10, flavor:'浓雾把城市藏了起来，看不清楼下。'},
  {k:'rain',     e:'🌧️', n:'小雨',  w:12, flavor:'淅淅沥沥的雨声，适合待在家里。'},
  {k:'storm',    e:'⛈️', n:'雷阵雨', w:5,  flavor:'雷声滚过楼顶，小乐捂住了耳朵。'},
  {k:'wind',     e:'💨', n:'大风',  w:3,  flavor:'风呜呜地灌进巷子，天台要小心。'},
];
function rollWeather(){
  const total = WEATHERS.reduce((a,x)=>a+x.w,0);
  let r = Math.random()*total;
  for(const x of WEATHERS){ r -= x.w; if(r<0) return x.k; }
  return 'sun';
}
function weatherInfo(k){ return WEATHERS.find(x=>x.k===k) || WEATHERS[0]; }
// 天气实际效果（轻度，避免叠加崩档）：
// staOut=外出额外体力消耗  moodNight=孩子夜间情绪回复修正  staRest=老师夜间额外体力回复
// nightZ=夜袭丧尸数量修正  decoyBlock=今夜声音诱饵失效  sanNight=老师夜间健康变化
const WEATHER_FX = {
  sun:      {moodNight:2, fxText:'孩子们的情绪会恢复得更好'},
  cloud:    {fxText:'一切平常'},
  overcast: {moodNight:-3, fxText:'孩子们今晚情绪难以平复'},
  fog:      {staOut:5, nightZ:-1, fxText:'外出更耗体力，但雾气掩护减少了夜袭'},
  rain:     {staOut:5, staRest:8, fxText:'外出更耗体力，但雨声助眠、恢复体力'},
  storm:    {nightZ:1, decoyBlock:true, sanNight:-2, fxText:'今夜丧尸更躁动，声音诱饵失效，你的健康受影响'},
  wind:     {moodNight:-2, fxText:'风声呜咽，孩子们睡得不安稳'},
};
function weatherFX(){ return WEATHER_FX[state.weather] || {}; }

// 简版外出事件池（第二阶段替换为地点小游戏；每项：故事+随机物资）
const OUT_EVENTS = [
  {t:'你摸进便利店，货架倒了大半。\n灰尘里翻出几件没过期的吃的。\n收银台后好像有东西动了一下——你不敢多看。', food:[1,2], mat:[0,1]},
  {t:'街角的报刊亭还立着。\n头版日期停在了三个月前。\n你扯下塑料棚布，还挺结实，能用来补窗户。', food:[0,1], mat:[1,2]},
  {t:'一辆送货面包车停在路边，车门敞着。\n车厢里散落着一箱饼干。\n远处传来拖沓的脚步声，你抓紧离开。', food:[2,3], mat:[0,0]},
  {t:'你绕到小区垃圾站，想碰碰运气。\n翻到半瓶跌打损伤喷雾和几节旧电池。\n这不算丰收，但聊胜于无。', food:[0,1], mat:[1,1], med:0, bat:1},
  {t:'药店的后门虚掩着。\n柜台上剩下几盒退烧药和创可贴。\n你默念着孩子们的名字，把它们收进包里。', food:[0,0], mat:[0,0], med:1},
  {t:'五金店卷帘门只拉下一半。\n你匍匐钻进去，摸到一捆铁丝和几根钢管。\n铁锈味呛得你直咳嗽。', food:[0,0], mat:[2,3]},
];

// 夜间小故事池（3-5行，第二阶段扩充并接入剧情系统）
const NIGHT_STORIES = [
  '夜里有风，把窗纸吹得哒哒响。\n小安把被子拉过了头顶。\n你在黑暗里坐了很久，直到风停。',
  '小乐半夜说梦话，喊着「再来一次」。\n大概是梦见滑梯了。\n你替她掖好被角，忽然有点想哭。',
  '小念悄悄问你：「老师，爸爸妈妈会来接我们吗？」\n你说：「会的，等雨停了就来了。」\n其实今晚没有下雨。',
  '远处传来几声闷响，像是倒塌。\n孩子们没醒。\n你数着声响，一直到天快亮。',
  '月光从云缝里漏下来，教室里泛着淡蓝色。\n三个小床排成一排，呼吸声轻轻的。\n这一刻，末日好像也变得温柔。',
  '你检查了一遍门闩，又检查了一遍。\n明明都锁好了，还是不放心。\n为人父母大概就是这样，哪怕只当了三个月。',
  '小安抱着她那只脏兔子，缩成一团。\n你犹豫了一下，躺在她旁边，轻轻拍她的背。\n「老师以前也这样睡不着。」',
  '小乐不知道什么时候学会了翻墙。\n你抓到她第三次的时候，她说想看看外面的小朋友是不是也躲起来了。\n你没有回答她。',
  '凌晨三点，你听见有东西在走廊里走。\n不是丧尸的脚步，比较轻，比较慢。\n你推开门，什么也没有，只有一盏小灯泡还亮着。',
  '小念在睡梦里嘟囔着一道数学题。\n你凑近听了半天，也没算出答案。\n算了，反正世界都这样了。',
  '你梦见自己回到了开学第一天。\n阳光很好，孩子们叽叽喳喳。\n醒来的时候，教室里只有呼吸声和风声。',
  '小安尿床了，自己偷偷换了裤子。\n你假装没看见，第二天把床单泡在盆里。\n他红着脸说了声谢谢。',
  '小乐半夜爬起来，对着窗外的月亮敬礼。\n她说在跟月亮说晚安。\n你陪她站了一会儿，月亮也没回应。',
  '走廊的灯闪了三下，又灭了。\n你摸黑走到电闸那里，推上去。\n回来时小念醒了，说「老师你是超人吗」。',
  '你翻出以前的备课本，念了一篇课文。\n三个孩子闭着眼听，没人打断你。\n念到「春天来了」的时候，窗外开始下雨。',
  '小安抱着你送的那只布熊，说它会保护大家。\n你说对，它很厉害。\n其实那只熊的耳朵都快掉了。',
  '小乐说她听见了音乐。\n你屏住呼吸听了很久，什么也没有。\n她说是她脑子里在响，是幼儿园早操的歌。',
  '小念把白天捡的石子摆成一排。\n她说这是她的家人，一颗是爸爸，一颗是妈妈。\n剩下的那颗，她说留给你。',
  '你数了数剩下的电池，还够撑两周。\n然后把手电关了，摸黑躺下。\n黑暗里，有人轻轻握住了你的手。',
  '远处有汽车警报响了一下，又停了。\n孩子们翻了个身，继续睡。\n你盯着天花板，想着明天还要去搜物资。',
  '小安发烧了，额头烫得吓人。\n你用湿毛巾敷在他额头上，守了一整夜。\n天快亮的时候，他的体温终于降下来了。',
  '小乐偷偷把最后一块饼干塞给你。\n你说老师不饿，你吃。\n她摇头，说你比我们更需要力气。',
  '小念在本子上写日记，写了满满一页。\n你凑过去看，上面只有三个字：「活下去」。\n她把本子合上，说这是秘密。',
  '你听见窗外有鸟叫。\n已经很久没听过鸟叫了。\n三个孩子也醒了，趴在窗边看了很久。',
  '小安的布熊丢了，哭了一整晚。\n你打着电筒在教室里找了三遍。\n最后在钢琴底下找到了，熊的眼睛掉了一颗。',
  '小乐说她梦见妈妈了。\n妈妈给她煮了一碗面，加了荷包蛋。\n她说面很好吃，就是醒了之后更饿了。',
  '小念用粉笔在墙上画了一幅画。\n画里有太阳、有花、有四个小人手拉手。\n你站在画前看了很久，没舍得擦掉。',
  '你把所有的刀都藏了起来。\n不是怕孩子，是怕自己。\n小安问你为什么把厨房锁了，你说在修水管。',
  '小乐半夜坐起来，盯着门口看。\n你问她怎么了，她说有个影子在看我们。\n你开灯看了看，是外套挂在门后面。',
  '小念说她不怕丧尸。\n你问为什么，她说丧尸不会做数学题。\n你笑了，这大概是末日后第一次笑出声。',
  '你在抽屉里翻出一根蜡烛。\n点上之后，整个教室都暖了起来。\n三个孩子围过来，像围在篝火旁。',
  '小安说他想上厕所，但怕黑。\n你陪他走到走廊，站在门口等他。\n他在里面喊：「老师你还在吗？」你说在。',
  '小乐把袜子套在手上当木偶。\n她演了一出戏，讲的是一个不怕丧尸的小女孩。\n演到最后，小女孩也变成了丧尸。',
  '小念说她长大了想当医生。\n你说很好。\n她说这样就能治好所有生病的人，包括她妈妈。',
  '你听见隔壁楼有人在喊救命。\n喊了几声，就没了。\n小安问你那是什么声音，你说是风。',
  '小安把自己的被子分给你一半。\n他说老师一个人睡会冷。\n你抱着被子，鼻子有点酸。',
  '小乐说她听见大海的声音。\n你说我们离海很远。\n她说可能是脑子里的海，一直在响。',
  '小念教你背乘法口诀。\n背到「三七二十一」的时候，她睡着了。\n你接着背完了剩下的。',
  '你把最后一粒维生素分给了小安。\n他掰成三份，每人一份。\n你说老师不需要，他说你也是我们的家人。',
  '窗外有一只猫在叫。\n小乐说它一定是饿了。\n你找了点剩饭放在窗台上，猫跳下来吃掉了。',
  '小安问你：「老师，我们会死吗？」\n你说不会，我们会活下去。\n他说：「拉钩。」你们拉了钩。',
  '小乐说她想给你唱首歌。\n她唱的是生日歌，跑调跑得厉害。\n你还是哭了，因为已经很久没人给你唱歌了。',
  '小念说她看见星星了。\n你抬头看，云很厚，什么也没有。\n她说：「在我心里。」',
  '你翻出一盒火柴，划了一根。\n火光很小，但三个孩子都凑过来看。\n火柴灭了之后，你又划了一根。',
  '小安说他不怕丧尸了。\n因为有老师在。\n你摸了摸他的头，没说自己其实也很怕。',
  '小乐偷偷在你口袋里塞了一颗糖。\n你不知道她什么时候藏的。\n糖纸已经皱了，但还是甜的。',
  '小念说她做了一个梦。\n梦里世界恢复了原样，爸爸妈妈来接她。\n她说梦醒了之后，她还是很高兴。',
  '你把教室的窗帘拉得严严实实。\n小安问为什么，你说不让月亮偷看我们睡觉。\n他笑了，说月亮也会害羞吗。',
  '小乐说她长大想当消防员。\n你说为什么，她说消防员可以救人。\n你说那你现在就是小消防员。',
  '小念把白天画的画贴在墙上。\n画里的太阳是蓝色的，因为她说蓝色比较安全。\n你觉得她说得对。',
];

// 项链激发/升级故事（按孩子+等级）
const WEAR_STORIES = {
  an: { 1: '小安戴上晶核项链的瞬间，眼睛亮了一下。\n他说好像听见了什么声音，是心跳声。\n从那天起，他总能在别人受伤之前察觉。',
         2: '项链升到第二级那天，小安主动走到受伤的小朋友面前。\n他的手轻轻放在伤口上，血居然止住了。\n你看着这一幕，说不出话。',
         3: '深夜，小安突然坐起来。\n他说有东西要来了，让大家快躲好。\n五分钟后，丧尸果然撞开了大门——幸好你们早有准备。',
         4: '最后的升级完成时，整个教室被柔和的金光笼罩。\n小安的眼睛里映着光，他说他能感觉到每个人的痛。\n从那天起，没有一个孩子再受过重伤。' },
  le: { 1: '小乐戴上项链后，跑起来像一阵风。\n你让她去对面楼取东西，她来回只用了三分钟。\n她喘着气说：「老师，我是不是很厉害！」',
         2: '项链升级后，小乐学会了布置陷阱。\n她在走廊里撒了一些碎玻璃，居然真的困住了一只丧尸。\n她得意地说这叫「诱捕计划」。',
         3: '丧尸破窗而入的瞬间，小乐一把推开了同伴。\n她自己被碎片划伤了，但笑得很开心。\n「老师，我是不是很敏捷！」',
         4: '满级的小乐成了所有人的希望。\n她每天早上都会给每个人一个拥抱。\n「抱抱就不害怕了！」她说，然后整个教室真的暖了起来。' },
  nian: { 1: '小念戴上项链后，眼睛变得特别亮。\n她指着地上的痕迹说：「有人来过这里，三天前。」\n你看了看，果然有脚印。',
         2: '升级后的小念开始在夜里数丧尸的脚步。\n「今天有七只，比昨天少两只。」\n她的预测从来没有错过。',
         3: '物资快耗尽的时候，小念翻出了一堆废品。\n她东拼西凑，居然做出了一个能用的捕兽夹。\n「材料不够的时候，脑子要够。」她说。',
         4: '满级的小念总能在最绝望的时候找到出路。\n她会带你发现被遗忘的地下室、藏起来的物资、甚至其他幸存者。\n「知识就是光。」她说。' },
};

// 孩子不信任故事（信任度为0时触发）
const DISTRUST_STORIES = {
  an: ['小安缩在墙角，背对着你。\n你叫他吃饭，他只是摇头。\n你把碗放在他身边，他等你走远了才偷偷吃。',
       '小安把你送他的布熊还给了你。\n他说他不想要了。\n你看见熊的眼睛又掉了一颗。',
       '小安半夜偷偷收拾了一个小包。\n你问他要去哪里，他说他自己能活下去。\n你没拦他，只是坐在门口陪了他一整夜。'],
  le: ['小乐不再笑了。\n她把折好的纸帽子都撕了。\n教室里第一次变得这么安静。',
       '小乐说她不相信你能保护她们。\n她要自己出去找食物。\n你拦不住她，只能跟在她后面。',
       '小乐把自己关在储藏室里。\n你敲门，她在里面喊「走开」。\n你隔着门说：「老师在外面等你。」'],
  nian: ['小念不再画画了。\n她把所有的画都撕了。\n碎片散了一地，像碎掉的希望。',
       '小念说她不需要你。\n她一个人也能算出怎么活下去。\n你看见她在本子上写的数字，全是错的。',
       '小念整夜整夜地不睡觉。\n你劝她，她说睡着了就会梦见妈妈。\n「醒着反而比较不痛。」'],
};

// 菜园故事
const GARDEN_STORIES = [
  '天台的风很大，种子被吹得满地都是。\n你蹲在地上捡了很久，小安帮你一起捡。\n最后只捡回来一半，但你们都笑了。',
  '第一颗种子发芽的那天，三个孩子围在花盆旁边看了一整天。\n小念说它像一个绿色的小拳头。\n小乐说要给它取名字，叫「小强」。',
  '夜里下了一场大雨，你冲上天台收花盆。\n小乐也跟着跑上来，两个人在雨里淋得透湿。\n花盆保住了，你们俩都感冒了。',
  '小安偷偷把自己的牛奶倒在了花盆里。\n他说植物也需要营养。\n你没告诉他牛奶会把花烧死，只是默默地换了土。',
  '菜园里长出了第一棵蔬菜，是一颗小白菜。\n三个孩子轮流摸了摸叶子。\n小念说：「这是我们种出来的。」',
  '一只乌鸦偷走了一颗种子。\n小乐追了它半条街，空手而归。\n你给她做了一个稻草人，她说比真的还管用。',
  '天台的土壤太硬了，种子发不出芽。\n小念从教室里找来了旧报纸，铺在土上面。\n她说这样可以保持水分，果然有效。',
  '菜园丰收的那天，你们做了一锅蔬菜汤。\n虽然没有什么味道，但每个人都喝了两大碗。\n小安说这是他喝过最好喝的汤。',
  '你在菜园里发现了一只蜗牛。\n小念蹲在旁边看了半个小时。\n她说蜗牛也在末日里努力地活着。',
  '小乐把自己的玩具铲子埋在了菜园里。\n她说这样菜就会有玩具玩。\n你没告诉她铲子会生锈，只是又给她买了一把。',
  '天台的晚霞特别美。\n你和三个孩子坐在菜园边看天。\n小安说：「老师，明天还会有晚霞吗？」你说会的。',
  '菜园里的菜被虫子咬了几个洞。\n小安心疼得快哭了。\n你教他用手抓虫子，他抓了满满一罐子。',
  '你在菜园角落里发现了一株野草。\n小念说它不是杂草，是草药。\n果然，煮了之后能治咳嗽。',
  '小乐在菜园旁边画了一幅画。\n画里的菜园长满了各种蔬菜，还有太阳。\n你把画贴在墙上，说这是我们的目标。',
  '天台的水管坏了，菜园快干死了。\n三个孩子轮流用小桶拎水。\n一桶水要爬六层楼，他们拎了整整一下午。',
];

// 外出故事（搜刮归来后的小插曲）
const OUT_STORIES = [
  '你从超市回来，身上沾满了灰尘。\n小乐帮你拍了拍衣服，说「老师辛苦了」。\n你把藏在怀里的面包拿出来，还是热的。',
  '你在商场里发现了一个布偶。\n虽然有点脏，但你还是带了回来。\n小安看到后，眼睛亮了一整天。',
  '回来的路上，你差点被丧尸发现。\n你躲在垃圾桶后面，屏住呼吸。\n安全回来后，小念给你倒了一杯水，手还在抖。',
  '你在公园里捡到了一本童话书。\n晚上你念给孩子们听。\n念到「从此他们幸福地生活在一起」时，教室里安静了很久。',
  '你在医院里找到了一些药品。\n回来的路上摔了一跤，膝盖破了。\n小安看见后，偷偷在你的伤口上贴了一个创可贴。',
  '你带回了一支彩色铅笔。\n小念用它在墙上画了一幅很大的画。\n画里有幼儿园、有你们四个、还有一个大大的太阳。',
  '搜物资的时候，你听见了婴儿的哭声。\n你找了半天，发现是一只玩具娃娃在响。\n你把它带了回来，小乐抱着它睡了一整夜。',
  '外面下起了暴雨，你被困在了加油站。\n等雨停了才回来，浑身湿透。\n三个孩子拿着毛巾等在门口，像三个小卫士。',
  '你在中学里找到了一箱粉笔。\n小乐用它在地上画了一个跳房子。\n你们玩了一下午，好像末日从未发生过。',
  '你在大楼的办公室里发现了一盆还活着的植物。\n你把它抱回了幼儿园。\n小念说它是「生命的奇迹」。',
  '搜物资回来时，你发现背包破了一个洞。\n你一路捡回来的东西掉了一半。\n小安说：「没关系，老师平安回来就好。」',
  '你在游泳馆里找到了一些干净的毛巾。\n那天晚上，三个孩子都洗了个澡。\n小乐说这是末日以来最香的一天。',
  '你在街边发现了一辆还能用的自行车。\n你骑了回来，三个孩子围着它转。\n小乐说她学会了骑车之后，要带大家去看海。',
  '你在废墟里翻出了一个旧收音机。\n打开之后，只有沙沙的杂音。\n小念说杂音里藏着别的幸存者的信号。',
  '外出的时候，你看到了天边的彩虹。\n你站在原地看了很久，忘记了搜物资。\n回来后你跟孩子们描述了彩虹，他们听得入了迷。',
];

/* ---------- 物品表 ---------- */
const ITEM_INFO = {
  apple :{e:'🍎',n:'苹果',t:'food'}, bread :{e:'🍞',n:'面包',t:'food'},
  can   :{e:'🥫',n:'罐头',t:'food'}, milk  :{e:'🥛',n:'牛奶',t:'food'},
  cookie:{e:'🍪',n:'饼干',t:'food'},
  veg:{e:'🥬',n:'蔬菜',t:'food'}, noodle:{e:'🍜',n:'面条',t:'food'},
  candy:{e:'🍬',n:'糖果',t:'food'}, soda:{e:'🥤',n:'汽水',t:'food'},
  cake:{e:'🧁',n:'蛋糕',t:'food'}, pudding:{e:'🍮',n:'布丁',t:'food'},
  mat:{e:'🪵',n:'材料',t:'mat'}, med:{e:'🩺',n:'急救包',t:'med'}, steel:{e:'🔩',n:'钢板',t:'mat'}, chip:{e:'📟',n:'电子元件',t:'mat'}, glass:{e:'🪟',n:'防弹玻璃',t:'mat'}, alloy:{e:'🧲',n:'合金',t:'mat'},
  bat:{e:'🔋',n:'电池',t:'bat'}, chem:{e:'🧪',n:'化学剂',t:'chem'},
  oil:{e:'🛢️',n:'汽油',t:'oil'}, wire:{e:'🪡',n:'铁丝',t:'wire'},
  part:{e:'⚙️',n:'零件',t:'part'}, horn:{e:'📢',n:'喇叭',t:'horn'},
  // 新物资（公园/游泳馆产出）
  seed:{e:'🌱',n:'种子',t:'seed'}, treeSeed:{e:'🌰',n:'树种',t:'seed'}, herb:{e:'🌿',n:'草药',t:'herb'},
  water:{e:'💧',n:'水',t:'water'}, swim:{e:'👙',n:'泳衣',t:'swim'},
  // 丧尸晶核（击杀丧尸掉落，day21+出现）
  core:{e:'💎',n:'丧尸晶核',t:'core'},
  feverMed:{e:'💊',n:'退烧药',t:'feverMed'}, coughMed:{e:'🍯',n:'止咳糖浆',t:'coughMed'},
  bandage:{e:'🩹',n:'绷带',t:'bandage'}, vitamin:{e:'🍊',n:'维生素',t:'vitamin'},
  energy:{e:'💉',n:'体力液',t:'energy'}, // 医院搜刮：体力+10 但健康-5，应急兴奋剂
  // 装饰物品（放在教室装饰架上，非消耗品）
  doll:{e:'🧸',n:'布偶',t:'decor'}, painting:{e:'🖼️',n:'儿童画',t:'decor'},
  storybook:{e:'📖',n:'童话书',t:'decor'}, crayon:{e:'✏️',n:'彩色铅笔',t:'decor'},
  musicbox:{e:'🎵',n:'音乐盒',t:'decor'}, vase:{e:'🏺',n:'小花瓶',t:'decor'},
  balloon:{e:'🎈',n:'气球',t:'decor'}, star:{e:'⭐',n:'星星贴纸',t:'decor'},
};
// 装饰物品定义：key + 掉落地点(loc) + 最早出现天数(minDay)
// 每件全游戏唯一1个，按丧尸进化四阶段分批开放：1-20 / 21-45 / 46-70 / 71-99
// 注意：地点与阶段不在图鉴中向玩家展示，留给玩家外出时自行探索发现
const DECOR_ITEMS = {
  doll:{e:'🧸',n:'布偶',loc:'super',minDay:1,desc:'一只掉了一只眼睛的小熊，孩子们抢着抱它。'},
  vase:{e:'🏺',n:'小花瓶',loc:'park',minDay:1,desc:'裂了一道缝，插上野花刚刚好。'},
  painting:{e:'🖼️',n:'儿童画',loc:'mall',minDay:21,desc:'蜡笔画的太阳和房子，颜色很鲜艳。'},
  storybook:{e:'📖',n:'童话书',loc:'school',minDay:21,desc:'书页卷了边，但故事还完整。'},
  musicbox:{e:'🎵',n:'音乐盒',loc:'mall',minDay:46,desc:'拧一下还能响，旋律有点走调。'},
  crayon:{e:'✏️',n:'彩色铅笔',loc:'school',minDay:46,desc:'只剩六支了，但孩子们已经很满足。'},
  balloon:{e:'🎈',n:'气球',loc:'park',minDay:71,desc:'没气了，但系在窗台很好看。'},
  star:{e:'⭐',n:'星星贴纸',loc:'building',minDay:71,desc:'一整张，贴在墙上像银河。'},
};
function itemHTML(k){ const i=ITEM_INFO[k]; return `${i.e}${i.n}`; }
function addItem(k){
  const i = ITEM_INFO[k];
  if(i.t==='food'){ state.inv.food[k]=(state.inv.food[k]||0)+1; }
  // 其余一律按「物品key」入库存（mat/seed/herb/bat/chem 等）。
  // 注意不能按类型 t 存：seed/treeSeed 的 t 都是 'seed'，按 t 会把树种混进种子、导致带回的树种消失。
  else { state.inv[k]=(state.inv[k]||0)+1; }
}

/* ---------- 7个地点 ---------- */
// game: shelf(超市货架) sneak(商场潜行) dodge(街上躲避) math(中学速答) logic(大楼推理) match(医院配药) pump(加油站抽油)
const LOCATIONS = [
  {k:'super',   n:'超市便利店', e:'🏪', scene:'./assets/img05.jpg', game:'shelf',
   loot:['apple','bread','can','milk','cookie','bread','can','apple'],
   desc:'货架倒了大半，食物散落一地。'},
  {k:'park',    n:'公园植物园', e:'🌳', scene:'./assets/img06.jpg', game:'memory',
   loot:['seed','herb','apple','herb','cookie','seed','apple'],
   chanceLoot:{treeSeed:0.4}, // 公园：40%概率在可选池中出现🌰树种
   special:'garden_manual',
   desc:'藤蔓爬满滑梯，杂草里藏着能吃的东西。'},
  {k:'mall',    n:'商场', e:'🏬', scene:'./assets/img07.jpg', game:'sneak',
   loot:['candy','soda','cake','pudding','noodle','cookie','bat','glass'], // 商场=小零食宝库（甜品店/便利店/美食广场）；bat=电器店电池，glass=珠宝柜台防弹玻璃（唯一来源，31天后出现）
   desc:'阴暗走廊里，有东西在缓缓移动。'},
    {k:'school',  n:'中学', e:'🏫', scene:'./assets/img08.jpg', game:'math',
   loot:['bat','chip','part','bread','chip','alloy','bat','mat'],
   special:'blueprint',
   desc:'黑板上还留着最后一节课的板书。'},
  {k:'building',n:'大楼', e:'🏢', scene:'./assets/img09.jpg', game:'logic',
   loot:['part','bat','mat','steel','can','mat','bat','steel'],
   desc:'写字楼电梯停了，楼梯间一片漆黑。'},
  {k:'hospital',n:'医院', e:'🏥', scene:'./assets/img10.jpg', game:'match',
   loot:['med','chem','med','bread','alloy','med','can','alloy','feverMed','coughMed','bandage','vitamin','energy','energy'],
   desc:'消毒水味混着腐臭，推车翻倒在走廊。'},
  {k:'gas',     n:'加油站', e:'⛽', scene:'./assets/img11.jpg', game:'pump',
   loot:['oil','wire','steel','oil','mat','oil','alloy','steel'],
   desc:'加油机还在滴答作响，地上留着油迹。'},

  {k:'pool',    n:'游泳馆', e:'🏊', scene:'./assets/img12.jpg', game:'breath',
   loot:['water','med','water','bread','water','med'],
   desc:'泳池水泛着诡异的绿光，躺椅翻倒一地。'},
];
// 地点特色概率掉落：loc.chanceLoot = {物品key:概率}，命中则把该物品注入可选池（替换1格，保证本次「出现」）
function applyChanceLoot(pool, loc){
  if(!loc.chanceLoot) return;
  for(const it in loc.chanceLoot){
    if(Math.random() < loc.chanceLoot[it] && !pool.includes(it)){
      pool[Math.floor(Math.random()*pool.length)] = it;
    }
  }
}

/* ---------- 地点叙事文本（氛围/丧尸/胜利/失败，随机抽取） ---------- */
const LOC_STORIES = {
  super:{ // 超市便利店
    enter:[
      '玻璃门碎了一地，冷风从缺口灌进来。货架东倒西歪，过期的罐头滚得到处都是。',
      '收银台还亮着微弱的红光，像是在等谁来结账。空气里混着变质牛奶和消毒水的味道。',
      '你踩着碎玻璃小心前行，零食袋被风刮得沙沙响，总觉得货架后面有东西在动。'
    ],
    zombie:[
      '过道尽头传来沉重的拖拽声——一只丧尸正啃着什么，听见动静缓缓抬起头。',
      '冷藏柜突然砰地一声打开，几只丧尸从里面跌跌撞撞地扑了出来！',
      '货架后方传来低吼，你回头看见三只丧尸堵死了退路，只能硬着头皮冲过去。'
    ],
    win:[
      '你塞了满满一包食物，趁丧尸没追上来快步溜出了超市。',
      '搜刮完毕，你回头看了一眼昏暗的货架——下次还敢来吗？'
    ],
    lose:[
      '丧尸的嘶吼越来越近，你丢下背包拼命往外跑，食物散落一地。',
      '你连滚带爬地逃出超市，什么也没带回来，心跳快得像要炸开。'
    ]
  },
  park:{ // 公园植物园
    enter:[
      '藤蔓缠住了滑梯，野花从地砖缝里钻出来。这里安静得不像末日，只有鸟鸣。',
      '植物园的玻璃温室裂了大半，热带植物疯长到了外面，空气中有湿润的泥土味。',
      '你穿过生锈的铁门，看见秋千在无风自动。花圃里似乎还藏着能吃的东西。'
    ],
    zombie:[
      '灌木丛突然摇晃，一只浑身沾满泥土的丧尸扑了出来，脸上还挂着树叶。',
      '温室里传来碰撞声，你推门进去，几只丧尸正被玻璃反光吸引，笨拙地撞着墙。',
      '你弯腰采草药时，身后的池塘里哗啦一声——有东西爬上来了！'
    ],
    win:[
      '你采了一兜草药和种子，这可是末日里最珍贵的绿色希望。',
      '捧着新鲜的种子，你仿佛已经看到天台上长出青菜的样子。'
    ],
    lose:[
      '丧尸从四面八方围过来，你慌忙丢下采到的东西，翻墙逃了出去。',
      '你一路狂奔出公园，草药撒了一路，身后是越来越近的嘶吼。'
    ]
  },
  mall:{ // 商场
    enter:[
      '自动门早就没电了，你侧身挤过缝隙。一楼大厅一片漆黑，只有应急灯泛着绿光。',
      '商铺的卷帘门拉了一半，橱窗里的模特落满灰尘，远远看去像站着一排人。',
      '电梯停在半空，你只能走楼梯。每一层都静悄悄的，只有自己的脚步声在回荡。'
    ],
    zombie:[
      '试衣间的帘子突然被拉开，一只丧尸歪着头走了出来，手里还攥着一件外套。',
      '楼梯间传来密集的脚步声，好几只丧尸正从楼上往下冲！',
      '你路过珠宝柜台时，玻璃后面突然伸出一只手——有丧尸被困在里面！'
    ],
    win:[
      '你在甜品店和便利店翻出不少零食，背包塞得鼓鼓的——孩子们要是看见了，肯定要高兴坏了。',
      '满载而归，你甚至顺手拿了个新背包——旧的早就磨破了。'
    ],
    lose:[
      '丧尸从扶梯两头包抄过来，你只能从安全通道狼狈逃出，东西全丢了。',
      '你慌不择路地跑出商场，口袋空空，只有一身冷汗。'
    ]
  },
  school:{ // 中学
    enter:[
      '教学楼的走廊里飘着粉笔灰，教室门上还贴着课程表，时间仿佛停在了末日那天。',
      '操场上杂草丛生，篮球架锈迹斑斑。你小心翼翼地走向教学楼，希望能找到图纸。',
      '广播室的喇叭突然刺啦响了一声，又归于寂静。你握紧了手里的棍子。'
    ],
    zombie:[
      '教室后门吱呀一声打开，一只穿着校服的丧尸走了出来，手里还攥着一支笔。',
      '楼梯转角处，几只丧尸正围着什么东西啃食，听见你的脚步声齐齐转过头。',
      '你推开实验室的门，一股福尔马林味扑面而来——几只丧尸正泡在标本罐旁边！'
    ],
    win:[
      '你在教务处翻到了几张设备图纸，这东西比食物还值钱！',
      '图纸到手！你小心翼翼地折好放进口袋，这些可是活下去的关键。'
    ],
    lose:[
      '丧尸从各个教室涌出来，你把图纸塞回抽屉就跑，什么也没拿到。',
      '你冲出校门时摔了一跤，手里的东西全撒了，只能空手而归。'
    ]
  },
  building:{ // 大楼
    enter:[
      '写字楼的大厅金碧辉煌却空无一人，前台的电脑还亮着待机画面。',
      '电梯停了，你只能爬楼梯。每一层办公区都散落着文件，像下了一场纸雪。',
      '玻璃幕墙映出灰蒙蒙的天空，你踩着碎纸走进办公区，到处是翻倒的椅子。'
    ],
    zombie:[
      '会议室的门突然被撞开，几只穿西装的丧尸冲了出来，领带还一丝不苟。',
      '你刚走到茶水间，就看见一只丧尸正对着饮水机发呆，水流了一地。',
      '楼梯间传来沉重的脚步声，越来越近——有丧尸正在下楼！'
    ],
    win:[
      '你从办公室里翻出了不少五金材料，这些白领大概没想到末日还有人来收废品。',
      '满载而归，钢筋水泥的大楼里总算还有点能用的东西。'
    ],
    lose:[
      '丧尸堵死了楼梯，你只能从消防通道滑下去，包里的东西全掉了。',
      '你连滚带爬地逃出大楼，什么也没带回来，手心全是汗。'
    ]
  },
  hospital:{ // 医院
    enter:[
      '消毒水味混着腐臭，走廊的灯忽明忽暗。推车上的药品散落一地，没人来收。',
      '挂号大厅空无一人，叫号机还在机械地报号。你屏住呼吸往药房走。',
      '病房的门开着，里面的被子叠得整整齐齐，仿佛病人只是出去散步了。'
    ],
    zombie:[
      '推车突然自己动了起来，一只丧尸从白布下钻出来，脸上还缠着绷带！',
      '手术室的门打开，几只穿着手术服的丧尸晃了出来，手里还拿着手术刀。',
      '你刚拿起一瓶药，身后传来嘶吼——药房里还有一只丧尸！'
    ],
    win:[
      '你拿到了急需的药品和化学剂，这些东西在末日里比黄金还值钱。',
      '满载而归，你甚至找到了几管抗生素，这可是救命的东西。'
    ],
    lose:[
      '丧尸从病房里涌出来，你丢下药品就跑，什么也没拿到。',
      '你冲出医院大门，手里空空，只有消毒水味沾在衣服上挥之不去。'
    ]
  },
  gas:{ // 加油站
    enter:[
      '加油机还在滴答作响，地上留着黑色的油迹。便利店的门半开着，里面漆黑一片。',
      '你闻见浓重的汽油味，赶紧熄了打火机。加油站的牌子在风中嘎吱作响。',
      '油罐车翻倒在路边，汽油流了一地。你小心翼翼地避开油迹，走向储藏间。'
    ],
    zombie:[
      '便利店的冰柜后面突然探出一个头，一只满身油污的丧尸扑了出来！',
      '油罐车后面传来低吼，你探头一看，三只丧尸正围着什么东西打转。',
      '你正在抽油，加油机突然砰地一声炸开，几只丧尸被爆炸声吸引了过来！'
    ],
    win:[
      '你灌了满满一桶汽油，这些够火焰桶烧好一阵子了。',
      '满载而归，汽油味熏得你头晕，但这些都是硬通货。'
    ],
    lose:[
      '丧尸围了过来，你丢下油桶就跑，汽油洒了一路差点烧起来。',
      '你慌忙逃出加油站，油桶丢了，什么也没带回来。'
    ]
  },
  pool:{ // 游泳馆
    enter:[
      '泳池水泛着诡异的绿光，水面飘着落叶。更衣室的门大开着，拖鞋散落一地。',
      '跳台上落满灰尘，池水已经很久没换了。你屏住呼吸走向储物间，希望能找到水。',
      '游泳馆里回荡着滴水声，你踩着湿漉漉的地板往前走，总觉得水里有什么东西。'
    ],
    zombie:[
      '泳池水面突然炸开，一只浑身湿透的丧尸爬了出来，皮肤泡得发白！',
      '更衣室里传来哐当声，你推门进去，几只丧尸正对着镜子发呆。',
      '你正在接水，身后突然传来嘶吼——有丧尸从泳池里爬上来了！'
    ],
    win:[
      '你接了好几瓶干净的水，末日里最珍贵的就是这些透明的液体。',
      '满载而归，你甚至找到了几条干净的毛巾，孩子们会很高兴。'
    ],
    lose:[
      '丧尸从泳池里爬出来，你丢下水瓶就跑，鞋都跑掉了一只。',
      '你冲出游泳馆，手里空空，只有湿漉漉的裤脚证明你来过。'
    ]
  }
};
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/* ---------- 设备图纸（中学掉落） ---------- */
const BLUEPRINT_INFO = {
  trap :{e:'🪤',n:'捕兽夹图纸'},
  shock:{e:'⚡',n:'电击网图纸'},
  flame:{e:'🔥',n:'火焰桶图纸'},
  acid :{e:'🧪',n:'腐蚀瓶图纸'},
  decoy:{e:'📢',n:'声音诱饵图纸'},
};
const BLUEPRINT_ORDER = ['shock','trap','flame','acid','decoy']; // 永久设备排前面，一次性排后面

/* ---------- 防御设备（中学图纸解锁后可制作） ---------- */
const EQUIPMENT = {
  trap :{e:'🪤',n:'捕兽夹',   bp:'trap', cost:{wire:2,mat:3},   type:'one', kill:1, desc:'一次性，击杀1只来袭丧尸'},
  shock:{e:'⚡',n:'电击网',   bp:'shock',cost:{part:3,mat:5},   type:'per', kill:2, desc:'永久，每耗电池×1击杀2只，电池够就能连续击杀'},
  flame:{e:'🔥',n:'火焰桶',   bp:'flame',cost:{oil:2,mat:4,wire:2}, type:'one', kill:3, desc:'一次性，击杀3只来袭丧尸'},
  acid :{e:'🧪',n:'腐蚀瓶',   bp:'acid', cost:{chem:3,mat:2},   type:'one', weak:1, desc:'一次性，削弱来袭丧尸攻击-1'},
  decoy:{e:'📢',n:'声音诱饵', bp:'decoy',cost:{horn:2,bat:2},   type:'one', lure:2, desc:'一次性，诱走2只丧尸不来袭击'},
  birdnet:{e:'🕸️',n:'防鸟网', bp:null,  cost:{wire:2,mat:2},   type:'one', spot:'top', desc:'一次性，夜里护住天台菜园不被乌鸦啄食（只能放在天台）'},
};
// 晶核项链：给孩子佩戴以激发/升级技能，制作难度递增
const CORE_PENDANTS = [
  null,
  {lv:1, e:'📿', n:'晶核项链·初', cost:{core:1, wire:2},              desc:'激发孩子第1个技能'},
  {lv:2, e:'📿', n:'晶核项链·巧', cost:{core:3, alloy:1, wire:3},      desc:'升级孩子到第2个技能'},
  {lv:3, e:'💠', n:'晶核项链·精', cost:{core:6, alloy:2, chip:1},      desc:'升级孩子到第3个技能'},
  {lv:4, e:'🔮', n:'晶核项链·极', cost:{core:9, alloy:3, chip:2, oil:1}, desc:'升级孩子到第4个技能（满）'},
];

/* ---------- 丧尸类型 ---------- */
// 随天数进化：T1普通(1-20) / T2疾跑(21-45) / T3变异(46-70) / T4猎手(71-99) / 尸王(100)
const ZOMBIE_TYPES = {
  T1: {n:'普通丧尸', e:'🧟', dmg:1, target:'random'},
  T2: {n:'疾跑丧尸', e:'🏃', dmg:1, target:'door'},   // 优先攻击门/窗/后门
  T3: {n:'变异丧尸', e:'👹', dmg:2, target:'random'}, // 伤害翻倍
  T4: {n:'猎手丧尸', e:'🦇', dmg:2, target:'weak'},   // 攻击最弱点位
};
function zombieTier(day){
  if(day>=71) return 'T4';
  if(day>=46) return 'T3';
  if(day>=21) return 'T2';
  return 'T1';
}
// 丧尸攻击特点描述（用于预警和晨报告提醒玩家）
function zombieTraitText(day){
  const tier = zombieTier(day);
  switch(tier){
    case 'T2': return '🏃 疾跑丧尸会专攻门窗（大门/窗户/后门），优先加固这些点位';
    case 'T3': return '👹 变异丧尸伤害翻倍，且61天起会破防，满防也会受损';
    case 'T4': return '🦇 猎手丧尸专攻弱点防线（防御最低的点位），注意均衡加固';
    default: return '';
  }
}

/* ---------- 游戏状态 ---------- */
const SAVE_KEY = 'kindergarten_v1';
const SAVE_BAK = 'kindergarten_v1_bak'; // 备份键：每次存档双写，主档损坏时兜底恢复
const SAVE_ENDINGS = 'kindergarten_endings'; // 结局收集图鉴（独立存档）
let state = null;
let pendingGender = null; // 开场临时选择
let fedFoodPick = null;   // 照顾弹窗中老师当前选中的食物
let medPick = null;       // 照顾弹窗中老师当前选中的药品（inv 的 key）
let kidFoodPicks = [];    // 照顾弹窗中每个孩子各自选中的食物 key（按孩子索引）
let kidPendantPicks = []; // 照顾弹窗中每个孩子各自选中的项链等级（1~4，按孩子索引；可直接戴高阶）
let careSkillTip = {};    // 照顾弹窗中每个孩子当前展开说明的技能名（按孩子索引）

function newState(gender){
  return {
    gender, day:1, slot:0, weather:rollWeather(),
    teacher:{sta:90, san:80, fed:80, sick:null},
    // 三个孩子状态：fed饱腹 mood情绪 hp健康 down倒下
    // 养成：trust信任度(触发成长) exp成长值 lv等级(1-5) skills已解锁技能
    kids: KIDS_DEF.map(k=>({fed:75+Math.random()*15|0, mood:70, hp:100, down:false, downDays:0, dead:false, comforted:false, fedMeal:0, fedTrustGain:0, tantrum:false, trust:30, exp:0, lv:1, skills:[], coreLv:0, sick:null, immuneDays:0})),
    inv:{ food:{apple:2,bread:1,can:1,milk:2,cookie:1,veg:0,noodle:0,candy:0,soda:0,cake:0,pudding:0}, mat:4, med:1, bat:2, chem:0, oil:0, wire:0, part:0, horn:0, seed:0, treeSeed:0, herb:0, water:0, steel:0, chip:0, glass:0, alloy:0, core:0, feverMed:0, coughMed:0, bandage:0, vitamin:0, energy:0 },
    fort:{win:0,door:0,wall:0,roof:0,back:0,top:0},
    fortBase:{win:0,door:0,wall:0,roof:0,back:0,top:0}, // 破损前等级：修复一次直接回到这里
    devices:{trap:0,shock:0,flame:0,acid:0,decoy:0,birdnet:0}, corePendants:{1:0,2:0,3:0,4:0},
    placed:{           // 各点位已放置的设备（每点位上限2件）
      win: {trap:0,shock:0,flame:0,acid:0,decoy:0},
      door:{trap:0,shock:0,flame:0,acid:0,decoy:0},
      wall:{trap:0,shock:0,flame:0,acid:0,decoy:0},
      roof:{trap:0,shock:0,flame:0,acid:0,decoy:0},
      back:{trap:0,shock:0,flame:0,acid:0,decoy:0},
      top: {trap:0,shock:0,flame:0,acid:0,decoy:0,birdnet:0},
    },
    defenseLog:[],     // 最近5条夜袭防御日志
    outCount:0,        // 今日外出次数
    failedToday:0,     // 今日挑战失败次数（影响夜间丧尸数量）
    blueprints:[],     // 已获得的设备图纸（中学掉落）
    gardenManual:false,// 园艺手册（公园掉落，解锁天台种植）
    decor:[],          // 已收集的装饰物品 key 列表（放装饰架）
    decorSeen:0,       // 装饰架：上次查看时的已收集数量（用于角标"新"提示，看完即消）
    foundCore:false,   // 是否捡到过第一颗丧尸晶核（解锁加固页的晶核项链入口）
    logicRecent:[],    // 大楼推理：最近出过的题目文本（去重，避免连续重复）
    mathRecent:[],     // 中学找不同：最近出过的差异签名（去重，避免连续重复）
    fdSkillUsed:0,     // 中学找不同：小念观察力今日已用次数（每日限 2 次，随日期推进清零）
    pendantUnlock:1,   // 晶核项链：制作页已解锁可见的最高阶（1~4），做出上一阶才显示下一阶
  };
}

/* ---------- 存档 ---------- */
function saveState(){
  try{
    const raw = JSON.stringify(state);
    localStorage.setItem(SAVE_KEY, raw);
    localStorage.setItem(SAVE_BAK, raw); // 双写备份：写入中断/主档损坏时有兜底
  }catch(e){}
}
// 自动存档：每30秒保存一次
let _autoSaveTimer = setInterval(()=>{ if(state) saveState(); }, 30000);
// 页面关闭/切后台时兜底存档（小红书 WebView 杀后台前不保证30秒心跳刚好跑过）
window.addEventListener('beforeunload', ()=>{ if(state) saveState(); });
window.addEventListener('pagehide', ()=>{ if(state) saveState(); });
document.addEventListener('visibilitychange', ()=>{ if(document.hidden && state) saveState(); });
function loadState(){
  // 1. 先读主存档
  try{
    const s = localStorage.getItem(SAVE_KEY);
    if(s){ const d = JSON.parse(s); if(d && d.day) return d; }
  }catch(e){}
  // 2. 主存档缺失或损坏 → 尝试从备份恢复并回写主档
  try{
    const b = localStorage.getItem(SAVE_BAK);
    if(b){ const d = JSON.parse(b); if(d && d.day){ localStorage.setItem(SAVE_KEY, b); return d; } }
  }catch(e){}
  return null;
}
function clearSave(){ localStorage.removeItem(SAVE_KEY); localStorage.removeItem(SAVE_BAK); }
// --- 结局收集图鉴（独立存档，跨周目累计）---
function loadEndings(){
  try{ const s = localStorage.getItem(SAVE_ENDINGS); return s ? JSON.parse(s) : {}; }
  catch(e){ return {}; }
}
function recordEnding(type, meta){
  const all = loadEndings();
  // 去重：同类型只保留最新的一次（含更好的等级/防御/更具体的死亡名单）
  all[type] = Object.assign(all[type] || {}, meta, { unlockedAt: Date.now() });
  try{ localStorage.setItem(SAVE_ENDINGS, JSON.stringify(all)); }catch(e){}
}
function totalEndings(){ return Object.keys(loadEndings()).length; }

/* ---------- 工具 ---------- */
const $ = id => document.getElementById(id);
function toast(msg){
  const t=$('toast'); t.textContent=msg; t.style.display='block';
  clearTimeout(t._tm); t._tm=setTimeout(()=>t.style.display='none',1800);
}
function rnd(a,b){ return a + Math.floor(Math.random()*(b-a+1)); }
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

/* ---------- 音效系统（Web Audio 合成，无需外部文件） ---------- */
let _actx=null, _noiseBuf=null;
// 预生成白噪声缓冲（风声/打击质感用）
function noiseBuf(ctx){
  if(_noiseBuf) return _noiseBuf;
  const len = ctx.sampleRate * 1.0;
  _noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = _noiseBuf.getChannelData(0);
  for(let i=0;i<len;i++) d[i] = Math.random()*2-1;
  return _noiseBuf;
}
function sfx(type){
  if(!sfxOn()) return; // 音效开关
  try{
    if(!_actx) _actx = new (window.AudioContext||window.webkitAudioContext)();
    if(_actx.state==='suspended') _actx.resume();
    const ctx=_actx, t=ctx.currentTime;
    const dest = ctx.destination;

    if(type==='dodge'){
      // 闪避：白噪声 + 带通滤波（频率上扫）= "嗖"的风声
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf(ctx);
      const bp = ctx.createBiquadFilter();
      bp.type='bandpass'; bp.Q.value=1.2;
      bp.frequency.setValueAtTime(400, t);
      bp.frequency.exponentialRampToValueAtTime(2200, t+0.18);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.35, t+0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t+0.20);
      src.connect(bp); bp.connect(g); g.connect(dest);
      src.start(t); src.stop(t+0.22);
      return;
    }

    if(type==='kill'){
      // 击杀：高频瞬态 + 短噪声burst = 清脆击打
      // 1) 高频正弦"叮"
      const o = ctx.createOscillator();
      o.type='triangle';
      o.frequency.setValueAtTime(1600, t);
      o.frequency.exponentialRampToValueAtTime(900, t+0.08);
      const og = ctx.createGain();
      og.gain.setValueAtTime(0.0001, t);
      og.gain.exponentialRampToValueAtTime(0.25, t+0.002);
      og.gain.exponentialRampToValueAtTime(0.0001, t+0.10);
      o.connect(og); og.connect(dest);
      o.start(t); o.stop(t+0.12);
      // 2) 噪声 burst（击打质感）
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf(ctx);
      const hp = ctx.createBiquadFilter();
      hp.type='highpass'; hp.frequency.value=2000;
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(0.0001, t);
      ng.gain.exponentialRampToValueAtTime(0.18, t+0.001);
      ng.gain.exponentialRampToValueAtTime(0.0001, t+0.05);
      src.connect(hp); hp.connect(ng); ng.connect(dest);
      src.start(t); src.stop(t+0.06);
      return;
    }

    if(type==='hurt'){
      // 被抓：失真锯齿波（低频下滑）+ 低频轰鸣 = 疼痛感
      const o = ctx.createOscillator();
      o.type='sawtooth';
      o.frequency.setValueAtTime(320, t);
      o.frequency.exponentialRampToValueAtTime(55, t+0.30);
      // 失真：用高 gain 推过载 + lowpass 软化
      const drive = ctx.createGain(); drive.gain.value=8;
      const lp = ctx.createBiquadFilter();
      lp.type='lowpass'; lp.frequency.value=1200;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.22, t+0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t+0.32);
      o.connect(drive); drive.connect(lp); lp.connect(g); g.connect(dest);
      o.start(t); o.stop(t+0.34);
      // 低频轰鸣垫底
      const o2 = ctx.createOscillator();
      o2.type='sine'; o2.frequency.setValueAtTime(90, t);
      o2.frequency.exponentialRampToValueAtTime(40, t+0.30);
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.0001, t);
      g2.gain.exponentialRampToValueAtTime(0.15, t+0.02);
      g2.gain.exponentialRampToValueAtTime(0.0001, t+0.30);
      o2.connect(g2); g2.connect(dest);
      o2.start(t); o2.stop(t+0.32);
      return;
    }

    if(type==='attack'){
      // 反击：方波短促打击
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.type='square';
      o.frequency.setValueAtTime(600, t);
      o.frequency.exponentialRampToValueAtTime(140, t+0.10);
      const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=1800;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.20, t+0.002);
      g.gain.exponentialRampToValueAtTime(0.0001, t+0.11);
      o.connect(lp); lp.connect(g); g.connect(dest);
      o.start(t); o.stop(t+0.13);
      return;
    }

    if(type==='miss'){
      // 点空：短促低音
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.type='sine';
      o.frequency.setValueAtTime(220, t);
      o.frequency.exponentialRampToValueAtTime(110, t+0.07);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.10, t+0.002);
      g.gain.exponentialRampToValueAtTime(0.0001, t+0.08);
      o.connect(g); g.connect(dest);
      o.start(t); o.stop(t+0.10);
      return;
    }

    if(type==='raid'){
      // 夜袭低鸣：低频正弦缓慢涌起 + 远处嘶吼质感的带通噪声
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.type='sine';
      o.frequency.setValueAtTime(48, t);
      o.frequency.linearRampToValueAtTime(42, t+1.1);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.14, t+0.25);
      g.gain.exponentialRampToValueAtTime(0.0001, t+1.2);
      o.connect(g); g.connect(dest);
      o.start(t); o.stop(t+1.25);
      const src=ctx.createBufferSource(); src.buffer=noiseBuf(ctx); src.loop=true;
      const bp=ctx.createBiquadFilter(); bp.type='bandpass'; bp.Q.value=0.8; bp.frequency.value=180;
      const ng=ctx.createGain();
      ng.gain.setValueAtTime(0.0001, t);
      ng.gain.exponentialRampToValueAtTime(0.06, t+0.35);
      ng.gain.exponentialRampToValueAtTime(0.0001, t+1.1);
      src.connect(bp); bp.connect(ng); ng.connect(dest);
      src.start(t); src.stop(t+1.2);
      return;
    }

    if(type==='thunder'){
      // 远雷：低通噪声由远及近地一滚 + 50Hz 沉闷一击
      const src=ctx.createBufferSource(); src.buffer=noiseBuf(ctx);
      const lp=ctx.createBiquadFilter(); lp.type='lowpass';
      lp.frequency.setValueAtTime(220, t);
      lp.frequency.exponentialRampToValueAtTime(900, t+0.12);
      lp.frequency.exponentialRampToValueAtTime(160, t+1.4);
      const g=ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.16, t+0.10);
      g.gain.exponentialRampToValueAtTime(0.0001, t+1.5);
      src.connect(lp); lp.connect(g); g.connect(dest);
      src.start(t); src.stop(t+1.55);
      const o=ctx.createOscillator(), og=ctx.createGain();
      o.type='sine'; o.frequency.setValueAtTime(52, t);
      o.frequency.exponentialRampToValueAtTime(34, t+0.9);
      og.gain.setValueAtTime(0.0001, t);
      og.gain.exponentialRampToValueAtTime(0.12, t+0.08);
      og.gain.exponentialRampToValueAtTime(0.0001, t+1.1);
      o.connect(og); og.connect(dest);
      o.start(t); o.stop(t+1.2);
      return;
    }

    if(type==='dive'){
      // 入水憋气：正弦下划"噗通"+一小截低通噪声水花
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.type='sine';
      o.frequency.setValueAtTime(520, t);
      o.frequency.exponentialRampToValueAtTime(160, t+0.14);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.20, t+0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t+0.16);
      o.connect(g); g.connect(dest);
      o.start(t); o.stop(t+0.18);
      const src=ctx.createBufferSource(); src.buffer=noiseBuf(ctx);
      const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=900;
      const ng=ctx.createGain();
      ng.gain.setValueAtTime(0.0001,t);
      ng.gain.exponentialRampToValueAtTime(0.10,t+0.01);
      ng.gain.exponentialRampToValueAtTime(0.0001,t+0.12);
      src.connect(lp); lp.connect(ng); ng.connect(dest);
      src.start(t); src.stop(t+0.14);
      return;
    }

    if(type==='warn'){
      // 危急提示：低短"嘟"（憋气濒临极限/低氧警告）
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.type='square';
      o.frequency.value=200;
      const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=700;
      g.gain.setValueAtTime(0.0001,t);
      g.gain.exponentialRampToValueAtTime(0.12,t+0.008);
      g.gain.exponentialRampToValueAtTime(0.0001,t+0.09);
      o.connect(lp); lp.connect(g); g.connect(dest);
      o.start(t); o.stop(t+0.10);
      return;
    }

    if(type==='reward'){
      // 获得物资：上行五声音阶小铃音（叮-咚-叮）
      const notes=[523.25,659.25,783.99];
      notes.forEach((f,i)=>{
        const o=ctx.createOscillator(), g=ctx.createGain();
        const st=t+i*0.09;
        o.type='triangle'; o.frequency.value=f;
        g.gain.setValueAtTime(0.0001, st);
        g.gain.exponentialRampToValueAtTime(0.16, st+0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, st+0.22);
        o.connect(g); g.connect(dest);
        o.start(st); o.stop(st+0.25);
      });
      return;
    }
  }catch(e){ /* 忽略音频错误 */ }
}

/* ---------- 音乐系统（程序合成原创BGM，无外部音频文件；白天温暖/夜晚低沉） ---------- */
const SET_SFX='kg_sfx_v1', SET_BGM='kg_bgm_v1';
function sfxOn(){ return localStorage.getItem(SET_SFX)!=='0'; } // 默认开
function bgmOn(){ return localStorage.getItem(SET_BGM)!=='0'; } // 默认开
// 移动WebView要求音频必须由用户手势触发；任意点击/触摸即解锁
function unlockAudio(){
  try{
    if(!_actx) _actx = new (window.AudioContext||window.webkitAudioContext)();
    if(_actx.state==='suspended') _actx.resume();
  }catch(e){}
}
function audioGesture(){ unlockAudio(); if(bgmOn()) bgmStart(); }
document.addEventListener('click', audioGesture, true);
document.addEventListener('touchend', audioGesture, {capture:true,passive:true});

function midiToFreq(n){ return 440*Math.pow(2,(n-69)/12); }
const BGM = {
  timer:null, step:0, nextT:0, mode:'day', master:null,
  // 白天：C大调，88bpm，固定轻快八音盒旋律 + C-G-Am-F 明亮进行，像孩子们在教室里玩耍
  day:{ bpm:88,
    chords:[[60,64,67],[55,59,62],[57,60,64],[53,57,60]], // C - G - Am - F（I-V-vi-IV）
    mel:[76,79,76,74, 79,71,74,71, 69,72,76,72, 77,76,74,72], // 16步旋律，结尾下行解决后循环
    bell:0.06, lp:1500 },
  // 夜晚：音区更低、速度更慢、旋律稀疏，守夜时的安静
  night:{ bpm:44,
    chords:[[45,52,57],[41,48,53],[38,45,50],[40,47,52]], // Am-F-Dm-Em
    mel:[57,60,62,64,67], bell:0.035, lp:600 },
};
// 柔和pad：三角波+慢起音+低通，铺一小节
function bgmPad(notes,t,dur,mode){
  const sp=BGM[mode], ctx=_actx;
  const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=sp.lp;
  const g=ctx.createGain();
  g.gain.setValueAtTime(0.0001,t);
  g.gain.exponentialRampToValueAtTime(0.016,t+Math.min(1.6,dur*0.4));
  g.gain.setValueAtTime(0.016,t+dur*0.65);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  lp.connect(g); g.connect(BGM.master);
  notes.forEach(n=>{
    const o=ctx.createOscillator(); o.type='triangle'; o.frequency.value=midiToFreq(n);
    o.connect(lp); o.start(t); o.stop(t+dur+0.05);
  });
}
// 音乐盒音：正弦+轻微失谐高八度泛音，指数衰减；volMul 控制相对音量（装饰音更轻）
function bgmBell(n,t,dur,mode,volMul){
  const sp=BGM[mode], ctx=_actx;
  const g=ctx.createGain();
  g.gain.setValueAtTime(0.0001,t);
  g.gain.exponentialRampToValueAtTime(sp.bell*(volMul||1),t+0.015);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  g.connect(BGM.master);
  [[n,1],[n+12,0.25]].forEach(([nn,vol])=>{
    const o=ctx.createOscillator(); o.type='sine'; o.frequency.value=midiToFreq(nn);
    const og=ctx.createGain(); og.gain.value=vol;
    o.connect(og); og.connect(g); o.start(t); o.stop(t+dur+0.05);
  });
}
function bgmSchedule(step,sp,t,beat){
  if(step%4===0){ bgmPad(sp.chords[(step/4|0)%sp.chords.length], t, beat*4, BGM.mode); }
  if(BGM.mode==='day'){
    // 白天：固定旋律线，每拍一个八音盒音（16步循环）
    const n=sp.mel[step%sp.mel.length];
    bgmBell(n,t,beat*0.95,'day');
    // 30% 概率在半拍后补一个轻轻的上行邻音，营造蹦跳的轻快感觉
    if(Math.random()<0.30){
      bgmBell(n+(Math.random()<0.5?2:3), t+beat*0.5, beat*0.55, 'day', 0.5);
    }
  } else if(Math.random()<0.16){
    // 夜晚：稀疏随机单音，守夜的安静
    const n=sp.mel[Math.floor(Math.random()*sp.mel.length)];
    bgmBell(n,t,beat*2.2,'night');
  }
}
function bgmTick(){
  if(!_actx) return;
  const sp=BGM[BGM.mode], beat=60/sp.bpm;
  while(BGM.nextT < _actx.currentTime+0.35){
    bgmSchedule(BGM.step,sp,BGM.nextT,beat);
    BGM.nextT+=beat; BGM.step++;
  }
}
function bgmStart(){
  if(!bgmOn() || BGM.timer) return;
  unlockAudio(); if(!_actx) return;
  if(!BGM.master){ BGM.master=_actx.createGain(); BGM.master.gain.value=0.0001; BGM.master.connect(_actx.destination); }
  BGM.nextT=_actx.currentTime+0.15; BGM.step=0;
  BGM.master.gain.cancelScheduledValues(_actx.currentTime);
  BGM.master.gain.setTargetAtTime(0.9,_actx.currentTime,1.0);
  BGM.timer=setInterval(bgmTick,200);
}
function bgmStop(){
  if(!BGM.timer){ return; }
  clearInterval(BGM.timer); BGM.timer=null;
  if(_actx && BGM.master){
    try{
      BGM.master.gain.cancelScheduledValues(_actx.currentTime);
      BGM.master.gain.setTargetAtTime(0.0001,_actx.currentTime,0.3);
    }catch(e){}
  }
}
function bgmSetMode(m){
  if(BGM.mode!==m){ BGM.mode=m; BGM.step=0; }
}
// 设置内切换
function toggleSfx(){
  localStorage.setItem(SET_SFX, sfxOn()?'0':'1');
  if(sfxOn()){ unlockAudio(); setTimeout(()=>sfx('kill'),30); }
}
function toggleBgm(){
  localStorage.setItem(SET_BGM, bgmOn()?'0':'1');
  if(bgmOn()){ unlockAudio(); bgmStart(); } else bgmStop();
}

/* ---------- 天气粒子引擎（canvas 手绘：雨丝/雾气/风卷尘叶/雷闪/晴日微尘，零外部资源） ---------- */
const FX = {
  cv:null, ctx:null, w:0, h:0,
  weather:null, parts:[], raf:null, last:0, nextBolt:0,
  init(){
    if(this.cv) return;
    this.cv=$('fx-canvas'); if(!this.cv) return;
    this.ctx=this.cv.getContext('2d');
    this.resize();
    window.addEventListener('resize', ()=>this.resize());
    // 切到后台标签页时暂停动画，省电
    document.addEventListener('visibilitychange', ()=>{
      if(document.hidden) this.stop(); else this.start();
    });
    this.start();
  },
  resize(){
    if(!this.cv) return;
    const r=this.cv.getBoundingClientRect();
    const dpr=Math.min(window.devicePixelRatio||1, 2);
    this.w=Math.max(1,Math.round(r.width)); this.h=Math.max(1,Math.round(r.height));
    this.cv.width=this.w*dpr; this.cv.height=this.h*dpr;
    this.ctx.setTransform(dpr,0,0,dpr,0,0);
    this.build();
  },
  start(){ if(this.cv && !this.raf){ this.last=0; this.raf=requestAnimationFrame(ts=>this.loop(ts)); } },
  stop(){ if(this.raf){ cancelAnimationFrame(this.raf); this.raf=null; } },
  // 渲染循环调用：天气没变就不重建粒子
  go(w){
    this.init();
    if(w!==this.weather){ this.weather=w; this.build(); }
  },
  build(){
    const w=this.weather, W=this.w, H=this.h, P=[];
    const R=(a,b)=>a+Math.random()*(b-a);
    if(w==='rain'){
      for(let i=0;i<55;i++) P.push({k:'rain',x:Math.random()*W,y:Math.random()*H,l:R(8,16),v:R(380,520)});
    }else if(w==='storm'){
      for(let i=0;i<105;i++) P.push({k:'rain',x:Math.random()*W,y:Math.random()*H,l:R(10,20),v:R(620,860)});
      this.nextBolt=performance.now()+R(2200,6500);
    }else if(w==='fog'){
      for(let i=0;i<7;i++) P.push({k:'fog',x:Math.random()*W,y:R(H*.25,H*.95),r:R(80,140),v:R(8,18),a:R(.05,.10)});
    }else if(w==='overcast'){
      for(let i=0;i<4;i++) P.push({k:'fog',x:Math.random()*W,y:R(H*.3,H*.9),r:R(60,100),v:R(5,10),a:R(.03,.06)});
    }else if(w==='wind'){
      // 风：细尘线 + 少量🍂落叶
      for(let i=0;i<22;i++) P.push({k:'dust',x:Math.random()*W,y:Math.random()*H,vx:R(120,220),vy:R(20,60),l:R(6,14)});
      for(let i=0;i<5;i++) P.push({k:'leaf',x:Math.random()*W,y:Math.random()*H,vx:R(90,150),vy:R(18,40),rot:Math.random()*6.28,vr:R(-1.5,1.5)});
    }else if(w==='sun'||w==='cloud'){
      // 晴/多云：光柱里浮动的微尘，暖色调
      for(let i=0;i<16;i++) P.push({k:'mote',x:Math.random()*W,y:Math.random()*H,r:R(.8,2),v:R(-14,-7),a:R(.15,.4),ph:Math.random()*6.28});
    }
    this.parts=P;
  },
  bolt(){
    const el=$('fx-flash'); if(!el) return;
    el.classList.remove('lightning'); void el.offsetWidth; el.classList.add('lightning');
    setTimeout(()=>el.classList.remove('lightning'), 720);
    sfx('thunder');
  },
  loop(ts){
    this.raf=requestAnimationFrame(t=>this.loop(t));
    if(!this.last) this.last=ts;
    let dt=(ts-this.last)/1000; this.last=ts;
    if(dt>0.05) dt=0.05; // 切后台后的大跳帧，避免粒子瞬移
    const c=this.ctx, W=this.w, H=this.h;
    c.clearRect(0,0,W,H);
    const night=document.body.classList.contains('night');
    // 雷暴偶发闪电（白天也会闪，夜晚更吓人）
    if(this.weather==='storm' && ts>this.nextBolt){ this.bolt(); this.nextBolt=ts+ (night?(2600+Math.random()*4400):(5000+Math.random()*6000)); }
    for(const p of this.parts){
      if(p.k==='rain'){
        p.x-=p.v*dt*0.22; p.y+=p.v*dt;
        if(p.y>H){ p.y=-p.l; p.x=Math.random()*(W+60); }
        if(p.x<-30) p.x=W+20;
        c.strokeStyle = night?'rgba(174,196,230,.5)':'rgba(90,120,160,.42)';
        c.lineWidth=1;
        c.beginPath(); c.moveTo(p.x,p.y); c.lineTo(p.x-p.l*0.22,p.y+p.l); c.stroke();
      }else if(p.k==='fog'){
        p.x+=p.v*dt; if(p.x-p.r>W) p.x=-p.r;
        const g=c.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
        g.addColorStop(0,`rgba(226,232,240,${p.a})`);
        g.addColorStop(1,'rgba(226,232,240,0)');
        c.fillStyle=g;
        c.beginPath(); c.arc(p.x,p.y,p.r,0,6.283); c.fill();
      }else if(p.k==='dust'){
        p.x+=p.vx*dt; p.y+=p.vy*dt + Math.sin(ts/300+p.y)*0.3;
        if(p.x>W+20){ p.x=-20; p.y=Math.random()*H; }
        if(p.y>H){ p.y=0; p.x=Math.random()*W; }
        c.strokeStyle=night?'rgba(200,190,170,.28)':'rgba(120,110,90,.25)';
        c.lineWidth=1;
        c.beginPath(); c.moveTo(p.x,p.y); c.lineTo(p.x-p.l,p.y-p.l*0.25); c.stroke();
      }else if(p.k==='leaf'){
        p.x+=p.vx*dt; p.y+=p.vy*dt + Math.sin(ts/260+p.x)*0.9; p.rot+=p.vr*dt;
        if(p.x>W+24){ p.x=-24; p.y=Math.random()*H; }
        if(p.y>H+24){ p.y=-24; p.x=Math.random()*W; }
        c.save(); c.translate(p.x,p.y); c.rotate(p.rot);
        c.font='13px serif'; c.globalAlpha=.9; c.fillText('🍂',-6,5); c.globalAlpha=1; c.restore();
      }else if(p.k==='mote'){
        p.y+=p.v*dt; p.x+=Math.sin(ts/900+p.ph)*0.15;
        if(p.y<-4){ p.y=H+4; p.x=Math.random()*W; }
        c.fillStyle = `rgba(255,236,190,${p.a*(night?0.25:1)})`;
        c.beginPath(); c.arc(p.x,p.y,p.r,0,6.283); c.fill();
      }
    }
  }
};

function showPopup(html){ $('popup').innerHTML=html; $('mask').classList.add('show'); }
function closePopup(){ $('popup').style.overflow=''; $('popup').style.touchAction=''; $('mask').classList.remove('show'); clearGameTimers(); render(); }
function totalFood(){ return Object.values(state.inv.food).reduce((a,b)=>a+b,0); }

/* ---------- 渲染 ---------- */
// 首页立绘：孩子们是一张合影像素，按左/中/右在每个孩子头顶放一颗立体紫爱心（各自由该孩子觉醒状态控制）
function decorateKidPortraits(){
  const row = document.querySelector('.photo .p-row');
  if(!row || !state || !state.kids) return;
  const kidImg = row.querySelector('img.p-kids');
  if(!kidImg) return;
  let wrap = kidImg.parentElement && kidImg.parentElement.classList.contains('kp') ? kidImg.parentElement : null;
  if(!wrap){
    wrap = document.createElement('span');
    wrap.className = 'kp';
    kidImg.parentNode.insertBefore(wrap, kidImg);
    wrap.appendChild(kidImg);
  }
  // 合影里三个孩子头顶的横向位置（占图片宽度的百分比，可按实际构图微调）
  const XS = ['20%', '50%', '80%'];
  for(let i=0;i<3;i++){
    let nk = wrap.querySelector('.kp-nk[data-i="'+i+'"]');
    if(!nk){
      nk = document.createElement('span');
      nk.className = 'kp-nk';
      nk.setAttribute('data-i', i);
      nk.style.left = XS[i];
      const grad = '<defs><radialGradient id="nkGrad'+i+'" cx="36%" cy="30%" r="78%">'
        +'<stop offset="0%" stop-color="#F3E5F5"/><stop offset="35%" stop-color="#CE93D8"/>'
        +'<stop offset="70%" stop-color="#AB47BC"/><stop offset="100%" stop-color="#6A1B9A"/>'
        +'</radialGradient></defs>';
      const heart = '<path d="M10 15.8 C 3.2 10.5, 4.2 4.6, 7.5 4.6 C 9 4.6, 10 5.8, 10 7.2 C 10 5.8, 11 4.6, 12.5 4.6 C 15.8 4.6, 16.8 10.5, 10 15.8 Z" fill="url(#nkGrad'+i+')"/>'
        +'<ellipse cx="8" cy="6.6" rx="2.4" ry="1.5" fill="#fff" opacity=".6"/>'
        +'<path d="M10 15.8 C 5.4 12, 6.2 8.8, 8.4 7.8 C 9.3 7.4, 9.9 8.1, 10 9.1 Z" fill="#4A148C" opacity=".3"/>';
      const glow = `<svg viewBox="0 0 20 18" width="22" height="20" style="position:absolute;left:0;top:0;filter:blur(2.5px);opacity:.55" aria-hidden="true">${grad}<path d="M10 15.8 C 3.2 10.5, 4.2 4.6, 7.5 4.6 C 9 4.6, 10 5.8, 10 7.2 C 10 5.8, 11 4.6, 12.5 4.6 C 15.8 4.6, 16.8 10.5, 10 15.8 Z" fill="#CE93D8"/></svg>`;
      nk.innerHTML = glow + `<svg viewBox="0 0 20 18" width="22" height="20" style="position:absolute;left:0;top:0" aria-hidden="true">${grad}${heart}</svg>`;
      wrap.appendChild(nk);
    }
    const k = state.kids[i];
    nk.classList.toggle('wears', !!(k && (k.coreLv||0)>0 && !k.dead));
  }
}
function render(){
  if(!state) return;
  decorateKidPortraits();
  // BGM 随时段切换：早/中温暖，夜晚低沉
  bgmSetMode(state.slot===NIGHT_SLOT?'night':'day');
  // 夜晚压暗氛围（清晨弹窗关闭后随 slot=0 自动撤去）
  document.body.classList.toggle('night', state.slot===NIGHT_SLOT);
  // 天气粒子跟随当日天气
  FX.go(state.weather);
  // 顶栏
  $('day-show').innerHTML = `第 ${state.day} 天<small>${SLOTS[state.slot].name}</small>`;
  const wEl = $('weather-show');
  if(wEl){ const w = weatherInfo(state.weather); wEl.textContent = `${w.e} ${w.n}`; wEl.title = w.flavor + '\n' + ((weatherFX().fxText)||''); }
  // 更新防御度条
  const defVal = calcDefense();
  const defPct = Math.min(100, Math.round(defVal/MAX_DEFENSE*100));
  $('def-val').textContent = `${defVal} / ${MAX_DEFENSE}`;
  const defFill = $('def-fill');
  defFill.style.width = defPct + '%';
  defFill.style.background = defPct>=60?'var(--health)':defPct>=30?'var(--warm)':'var(--alert)';
  // 老师状态
  const t = state.teacher;
  $('teacher-stats').innerHTML = [
    {n:'健康', v:t.san,c:'hp'},{n:'饱腹', v:t.fed,c:'fed'},{n:'体力', v:t.sta,c:'sta'}
  ].map(s=>`<div class="stat ${s.c}${s.v<30?' low':''}"><div class="stat-row"><span class="name">${s.n}</span><span class="val">${s.v}/100</span></div>
    <div class="bar"><i style="width:${clamp(s.v,0,100)}%"></i></div></div>`).join('');
  // 孩子卡片（含养成信息：等级、信任度、技能、死亡/倒下标记）
  $('kids-cards').innerHTML = state.kids.map((k,i)=>{
    const d=KIDS_DEF[i];
    if(k.dead){
      return `<div class="kid" style="opacity:.45;background:#EEE">
        <div class="k-name">${d.name} <small style="color:#999">💀 已去世</small></div>
        <div class="k-trait">${d.trait}</div>
        <div class="k-bars"><div class="k-bar" style="color:#999"><span>💀</span><div class="kb h"><i style="width:0%"></i></div></div></div>
        <div class="k-state">撑过了第 ${k.downDays||3} 天，还是没能活下来</div>
      </div>`;
    }
    // 技能位：未觉醒显示虚线预留槽；觉醒后每个技能一个小胶囊，上下堆叠（最多2个）
    const skillCount = k.skills.length;
    let slotHtml;
    if(skillCount>0){
      const lv = k.coreLv || skillCount;
      const on = skillsActive(k);
      const tip = `已觉醒（${skillCount}/2）：${k.skills.join('、')}${on?'':'（闹脾气中，暂不生效）'}`;
      const chips = k.skills.map(n=>`<div class="k-chip">${SKILL_INFO[n]?SKILL_INFO[n].e:''} ${n}</div>`).join('');
      slotHtml = `<div class="k-skills${on?'':' off'}" title="${tip}">${chips}</div>`;
    }else{
      slotHtml = `<div class="k-slot">✦ 潜能未觉醒</div>`;
    }
    return `<div class="kid${k.down?' down':''}">
      <div class="k-name">${d.name}</div>
      <div class="k-trait">${d.trait}</div>
      ${slotHtml}
      <div class="k-bars">
        <div class="k-bar"><span>健康</span><div class="kb h${k.hp<30?' low':''}"><i style="width:${clamp(k.hp,0,100)}%"></i></div></div>
        <div class="k-bar"><span>饱腹</span><div class="kb f${k.fed<30?' low':''}"><i style="width:${clamp(k.fed,0,100)}%"></i></div></div>
        <div class="k-bar"><span>情绪</span><div class="kb m${k.mood<30?' low':''}"><i style="width:${clamp(k.mood,0,100)}%"></i></div></div>
      </div>
      ${(k.down||k.tantrum)?`<div class="k-state" title="喂他吃东西、再哄哄他，每次都会涨信任，哄回来就原谅你">${k.down?`虚弱倒下(${k.downDays}/3天)`:'闹脾气中，快去哄！'}</div>`:''}
    </div>`;
  }).join('');
  // 物资箱分类（键→物品列表）
  const BOXES = [
    { k:'food',    e:'🍱', n:'食物箱',   bg:'#FFF3E0', border:'#B8956A', items:[
      {k:'apple',n:'苹果',e:'🍎'}, {k:'bread',n:'面包',e:'🍞'},
      {k:'can',n:'罐头',e:'🥫'}, {k:'milk',n:'牛奶',e:'🥛'},
      {k:'cookie',n:'饼干',e:'🍪'}, {k:'water',n:'水',e:'💧'},
      {k:'veg',n:'蔬菜',e:'🥬'}, {k:'noodle',n:'面条',e:'🍜'},
      {k:'candy',n:'糖果',e:'🍬'}, {k:'soda',n:'汽水',e:'🥤'},
      {k:'cake',n:'蛋糕',e:'🧁'}, {k:'pudding',n:'布丁',e:'🍮'},
    ]},
    { k:'med',     e:'💊', n:'医疗箱',   bg:'#FFEBEE', border:'#B8956A', items:[
      {k:'med',n:'急救包',e:'🩺', d:'<span style="color:#27AE60">❤️健康+20</span><span style="color:#7F8C9A"> ·可救活虚弱的孩子（不治病症）</span>'},
      {k:'feverMed',n:'退烧药',e:'💊', d:'<span style="color:#7F8C9A">治愈🤒发烧 </span><span style="color:#27AE60">❤️+8</span>'},
      {k:'coughMed',n:'止咳糖浆',e:'🍯', d:'<span style="color:#7F8C9A">治愈🤧咳嗽 </span><span style="color:#27AE60">❤️+5</span>'},
      {k:'bandage',n:'绷带',e:'🩹', d:'<span style="color:#7F8C9A">治愈🩹受伤 </span><span style="color:#27AE60">❤️+10</span>'},
      {k:'vitamin',n:'维生素',e:'🍊', d:'<span style="color:#4A90D9">🛡️孩子服用·3天不生病</span>'},
      {k:'energy',n:'体力液',e:'💉', d:'<span style="color:#4A90D9">⚡体力+10</span> <span style="color:#E74C3C">❤️健康-5</span>'},
    ]},
    { k:'tool',    e:'🧰', n:'工具箱',   bg:'#E3F2FD', border:'#B8956A', items:[
      {k:'mat',n:'材料',e:'🪵'}, {k:'wire',n:'线',e:'🪡'},
      {k:'part',n:'零件',e:'⚙️'}, {k:'horn',n:'喇叭',e:'📢'},
      {k:'oil',n:'油',e:'🛢️'}, {k:'chem',n:'化学剂',e:'🧪'},
      {k:'bat',n:'电池',e:'🔋'},
      {k:'steel',n:'钢材',e:'🔩'}, {k:'chip',n:'芯片',e:'📟'},
      {k:'glass',n:'玻璃',e:'🪟'}, {k:'alloy',n:'合金',e:'🧲'},
    ]},
    { k:'seed',    e:'🌱', n:'种子箱',   bg:'#E8F5E9', border:'#B8956A', items:[
      {k:'seed',n:'种子',e:'🌱', d:`<span style="color:#7F8C9A">种植后可得🥬蔬菜×2（${CROP_NEED.veg}天成熟）</span>`},
      {k:'treeSeed',n:'树种',e:'🌰', d:`<span style="color:#7F8C9A">种植后可得🪵材料×4（${CROP_NEED.tree}天成熟）</span>`},
      {k:'herb',n:'草药',e:'🌿', d:`<span style="color:#7F8C9A">种植后可得🌿草药×2（${CROP_NEED.herb}天成熟）</span><br><span style="color:#27AE60">也可直接服用：❤️健康+10 · 可治咳嗽</span>`},
    ]},
    { k:'core',    e:'💎', n:'晶核箱',   bg:'#F3E5F5', border:'#B8956A', items:[ {k:'core',n:'丧尸晶核',e:'💎'} ], needDay:21 },
  ];
  // 空箱子时的搜刮引导（只在箱子空时出现，平时不占列表长度）
  const BOX_EMPTY_HINT = {
    food:'🍚 还没有食物<br>去超市、商场、游泳馆搜刮吧',
    tool:'🧰 还没有材料<br>去中学、大楼、加油站找找',
    med:'🩺 还没有急救包<br>去医院搜刮吧',
    seed:'🌱 还没有种子、树种和草药<br>去公园植物园找找',
    core:'💎 还没有丧尸晶核<br>夜里击杀丧尸有机会获得'
  };
  // 显示哪些箱子（按天数过滤）
  const visibleBoxes = BOXES.filter(b => !b.needDay || state.day >= b.needDay);
  // 计算每个箱子的总件数（只算 state.inv 里存在且 > 0 的物品）
  function boxCount(b){
    return b.items.reduce((sum,it)=>{
      if(b.k==='food') return sum + (it.k==='water' ? (state.inv.water||0) : (state.inv.food[it.k]||0));
      return sum + (state.inv[it.k] || 0);
    }, 0);
  }
  // 渲染箱子：一行并排（flex，窄屏横向滚动）
  $('inv-bar').innerHTML = `<div class="fg" style="--g:6px">
    ${visibleBoxes.map(b=>{
      const cnt = boxCount(b);
      return `<div class="inv-box" data-box="${b.k}" style="flex:1;min-width:0;background:var(--card);border:1.5px solid ${b.border};border-radius:10px;padding:7px 4px;text-align:center;cursor:pointer;position:relative;transition:transform .12s;box-shadow:0 2px 6px rgba(0,0,0,.08)">
        <div style="font-size:22px;line-height:1">${b.e}</div>
        <div style="font-size:10.5px;color:var(--ink);font-weight:bold;margin-top:3px">${b.n}</div>
      </div>`;
    }).join('')}
  </div>`;
  // 绑定点击 → 显示箱子详情
  document.querySelectorAll('.inv-box').forEach(boxEl=>{
    boxEl.onclick = ()=>{
      const bk = boxEl.dataset.box;
      const box = BOXES.find(x=>x.k===bk);
      if(!box) return;
      // 列出箱子里所有有库存的物品（食物存于 inv.food 嵌套层，水在顶层 inv.water，其余平铺）
      const cnt = it => box.k==='food'
        ? (it.k==='water' ? (state.inv.water||0) : (state.inv.food[it.k]||0))
        : (state.inv[it.k]||0);
      // 所有箱子统一：只显示已拥有的物品（没找到/数量为0的不显示，列表保持精简）
      const list = box.items.filter(it => cnt(it) > 0);
      const rows = list.length ? list.map(it=>{
        const n = cnt(it);
        // 功效行：食物走 FOODS（🍚饱腹/⚡体力/😊心情）；药品/种子等用物品自带的 d 描述
        let statHtml = '';
        if(box.k==='food'){
          const f = FOODS[it.k];
          statHtml = `<div class="fgw" style="--g:7px;font-size:10.5px;margin-top:2px">
            <span style="color:#F5A623">🍚饱腹+${f.v}</span>
            <span style="color:#4A90D9">⚡体力+${f.sta||0}</span>
            ${f.mood?`<span style="color:#D9738E">😊心情+${f.mood}</span>`:''}
          </div>`;
        }else if(it.d){
          statHtml = `<div class="fgw" style="--g:7px;font-size:10.5px;margin-top:2px">${it.d}</div>`;
        }
        return `<div class="fg" style="--g:8px;justify-content:space-between;align-items:flex-start;padding:7px 4px;border-bottom:1px solid #DDE4E1">
          <div style="min-width:0">
            <span style="font-size:14px">${it.e} ${it.n}</span>
            ${statHtml}
          </div>
          <span style="font-weight:bold;color:#4A90D9;flex-shrink:0">× ${n}</span>
        </div>`;
      }).join('') : `<div style="color:#7F8C9A;text-align:center;padding:14px 8px;font-size:13px;line-height:1.7">${BOX_EMPTY_HINT[box.k]||'这个箱子还是空的...'}</div>`;
      showPopup(`
        <h3>${box.e} ${box.n}</h3>
        <div style="margin:8px 0 12px">${rows}</div>
        <div class="btns"><button id="pp-cancel">关闭</button></div>`);
      const cancelBtn = $('pp-cancel'); if(cancelBtn) cancelBtn.onclick = closePopup;
    };
  });
  // 加固点位一览（防御度下方一行排列，可点击查看局部升级图）
  const spotHtml = SPOTS.map(s=>{
    const lv = state.fort[s.k];
    return `<div data-spot="${s.k}" style="flex:1;min-width:0;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:4px 2px;text-align:center;font-size:11px;cursor:pointer;transition:transform .12s" title="点击查看升级详情">
      <div style="font-size:14px">${s.e}</div>
      <div style="font-size:9px;color:var(--soft)">${s.n}</div>
      <span class="${lvClass(lv)}" style="font-size:10px;padding:0 3px;border-radius:3px">${lvText(lv)}</span>
    </div>`;
  }).join('');
  const fs = $('fort-spots');
  if(fs){ fs.innerHTML = spotHtml; fs.querySelectorAll('[data-spot]').forEach(el=>{ el.onclick=()=>showSpotDetail(el.dataset.spot); }); }
  // 清除图片上的旧徽章层
  const oldLayer = document.querySelector('.spot-layer');
  if(oldLayer) oldLayer.remove();
  // 行动按钮
  renderActions();
  // 照片里的老师
  $('photo-teacher').src = IMG_TEACHER[state.gender];
  // 装饰架：角标只显示"未查看的新物品数"（decorSeen 为上次查看时的收集量）
  const shelf = $('decor-shelf');
  if(shelf){
    const decors = state.decor||[];
    const newCount = Math.max(0, decors.length - (state.decorSeen||0));
    shelf.innerHTML = '🧸' + (newCount>0 ? `<i class="ds-cnt">${newCount}</i>` : '');
    shelf.style.opacity = decors.length===0 ? '.55' : '1';
    shelf.onclick = showDecorShelf;
  }
}

function renderActions(){
  const bar = $('action-bar');
  const isEvening = state.slot === NIGHT_SLOT; // 晚上21:00后只能在家
  const tired = state.teacher.sta < 10;
  const remain = DAY_OUT_MAX - state.outCount;
  const outMax = remain <= 0;
  if(isEvening){
    bar.style.flexWrap='nowrap';
    bar.innerHTML = `
      <button data-act="care"><span class="emoji">🤱</span>照顾</button>
      <button data-act="fortify"><span class="emoji">🔧</span>加固</button>
      <button data-act="garden"><span class="emoji">🌱</span>菜园</button>
      <button data-act="night" class="night-btn"><span class="emoji">🌙</span>度过夜晚</button>`;
  }else{
    // 白天6节外出：剩余次数浓缩为按钮右上角倒数角标；第5节起角标转红提示风险
    const late = state.outCount>=LATE_FROM-1;
    const outCls = 'out-btn' + (late?' out-late':'') + (outMax?' out-zero':'');
    const outTitle = tired ? '体力不足，无法外出' : outMax ? '今天外出次数已用完' : late ? '天色渐晚，外出风险高' : '';
    bar.style.flexWrap='wrap';
    // 体力不足时在按钮上方给出出路提示（吃东西补体力 / 回家守夜睡到明天）
    const tiredHint = tired ? `<div style="flex:0 0 100%;font-size:11px;color:var(--alert);background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.25);border-radius:8px;padding:5px 8px;margin-bottom:2px">😮‍💨 体力不足 ${state.teacher.sta}，无法外出——去「🤱照顾」里吃点东西补体力，或「回家守夜」睡到明天</div>` : '';
    bar.innerHTML = `
      ${tiredHint}
      <button data-act="out" class="${outCls}" title="${outTitle}" ${tired||outMax?'disabled':''}><span class="emoji">🚶</span>外出<i class="out-cnt">${remain}</i></button>
      <button data-act="care"><span class="emoji">🤱</span>照顾</button>
      <button data-act="fortify"><span class="emoji">🔧</span>加固</button>
      <button data-act="garden"><span class="emoji">🌱</span>菜园</button>
      <button data-act="gohome" style="flex:0 0 100%;min-height:36px;font-size:12px;background:transparent;border-style:dashed;color:var(--soft)"><span style="font-size:13px">🏠</span> 不再外出，回家守夜</button>`;
  }
  bar.querySelectorAll('button').forEach(b=>{
    b.onclick = ()=>doAction(b.dataset.act);
  });
}

/* ---------- 行动 ---------- */
/* ================================================================
 * 7个地点挑战小游戏
 * 每个函数签名：gameXXX(onWin, onLose)
 * 渲染到 #popup，用 setInterval/setTimeout 计时，结束回调
 * ================================================================ */
let _gameTimers = [];
function clearGameTimers(){ _gameTimers.forEach(t=>clearTimeout(t)); _gameTimers=[]; }
function setGT(fn,ms){ const t=setTimeout(fn,ms); _gameTimers.push(t); return t; }

/* --- 公共：游戏头/尾 --- */
// 小游戏横幅主题：八个地点 + 丧尸战，各配一个淡淡的道具水印
const MG_THEME_EMOJI = {shelf:'🛒',sneak:'👁️',dodge:'🚧',math:'✏️',logic:'🗝️',match:'🩺',pump:'⛽',memory:'🌿',breath:'💧',zombie:'🩸'};
function gameHeader(title, subtitle, theme){
  const th = theme || 'shelf';
  return `<div class="mg-banner mg-b-${th}" data-deco="${MG_THEME_EMOJI[th]||'🎒'}">
    <div class="mg-b-title">${title}</div>
    <div class="mg-b-sub">${subtitle}</div>
  </div>`;
}
function gameEnd(win, onWin, onLose, msg){
  clearGameTimers();
  showPopup(`<h3>${win?'✓ 挑战成功':'✗ 挑战失败'}</h3>
    <div class="story" style="text-align:center">${msg}</div>
    <div class="btns"><button class="primary" id="ge-ok">确定</button></div>`);
  $('ge-ok').onclick = ()=>{ closePopup(); win?onWin():onLose(); };
}

/* 1) 超市·货架限时捡：15秒内点中6个食物，避开腐烂 */
function gameShelf(onWin, onLose){
  const foods = ['🍎','🍞','🥫','🥛','🍪','🥕','🧀','🍌'];
  const bad = ['💀','🤮','🦠','☠️'];
  let hits=0, bads=0, time=15, running=true;
  showPopup(gameHeader('🏪 货架限时捡','15秒内捡到6个食物，避开腐烂物！','shelf')+`
    <div style="display:flex;justify-content:space-between;font-size:14px;margin:6px 0">
      <span>⏱️ <b id="s-time">15</b>s</span>
      <span>食物 <b id="s-hit">0</b>/6　腐烂 <b id="s-bad">0</b></span>
    </div>
    <div id="shelf" style="display:grid;grid-template-columns:repeat(4,1fr);grid-gap:6px;gap:6px;background:var(--bg);border-radius:10px;padding:8px;min-height:180px"></div>
    <div class="btns" style="margin-top:8px"><button id="s-quit">放弃</button></div>`);
  function refresh(){
    if(!running) return;
    const grid=$('shelf'); grid.innerHTML='';
    for(let i=0;i<8;i++){
      const isBad = Math.random()<0.3;
      const e = isBad ? bad[rnd(0,bad.length-1)] : foods[rnd(0,foods.length-1)];
      const b=document.createElement('button');
      b.style.cssText='height:40px;font-size:22px;background:#fff;color:var(--ink);border-color:var(--line);border:1px solid var(--line);border-radius:8px;cursor:pointer';
      b.textContent=e;
      b.onclick=()=>{
        if(!running) return;
        b.classList.remove('item-pop'); void b.offsetWidth; b.classList.add('item-pop');
        if(isBad){ bads++; $('s-bad').textContent=bads; b.style.background='#FADBD8'; sfx('miss'); if(bads>=2){ running=false; gameEnd(false,onWin,onLose,'踩到腐烂物！食物全毁了...'); } }
        else { hits++; $('s-hit').textContent=hits; b.style.background='#D5F5E3'; sfx('attack'); if(hits>=6){ running=false; gameEnd(true,onWin,onLose,'成功装满一袋食物！'); } }
      };
      grid.appendChild(b);
    }
    setGT(refresh, 1200);
  }
  refresh();
  const iv = setInterval(()=>{
    if(!running){ clearInterval(iv); return; }
    time--; $('s-time').textContent=time;
    if(time<=0){ running=false; clearInterval(iv); gameEnd(hits>=6,onWin,onLose, hits>=6?'时间到！刚好捡够6个':'时间到，只捡到'+hits+'个，不够...'); }
  },1000);
  $('s-quit').onclick=()=>{ running=false; clearInterval(iv); gameEnd(false,onWin,onLose,'你放弃了搜刮。'); };
}

/* 2) 商场·静默潜行：怪物眼睛闭着时才能点"移动"，睁眼时点=被发现 */
function gameSneak(onWin, onLose){
  let steps=0, safe=true, time=18, running=true, caught=0;
  showPopup(gameHeader('🏬 静默潜行','怪物闭眼时点击"前进"，睁眼时别动！前进5步成功。','sneak')+`
    <div style="text-align:center;font-size:48px;margin:14px 0" id="sn-eye">👁️</div>
    <div style="display:flex;justify-content:space-between;font-size:14px;margin:6px 0">
      <span>⏱️ <b id="sn-time">18</b>s</span><span>前进 <b id="sn-step">0</b>/5</span><span>被发现 <b id="sn-c">0</b>/2</span>
    </div>
    <div class="btns"><button id="sn-move" style="font-size:16px;min-height:56px">🚶 前 进</button></div>
    <div class="btns" style="margin-top:6px"><button id="sn-quit">放弃</button></div>`);
  function flip(){
    if(!running) return;
    safe = Math.random()<0.55;
    const eye=$('sn-eye');
    eye.textContent = safe?'🙈':'👁️';
    eye.style.color = safe?'var(--accent2)':'var(--alert)';
    eye.style.transform='scale(.72)';
    setGT(()=>{ if(eye) eye.style.transform='scale(1.15)'; }, 60);
    setGT(flip, safe?rnd(1200,2200):rnd(900,1600));
  }
  flip();
  $('sn-move').onclick=()=>{
    if(!running) return;
    if(safe){ steps++; $('sn-step').textContent=steps; sfx('dodge'); if(steps>=5){ running=false; gameEnd(true,onWin,onLose,'你悄无声息地穿过了商场！'); } }
    else { caught++; $('sn-c').textContent=caught; sfx('hurt'); if(caught>=2){ running=false; gameEnd(false,onWin,onLose,'被怪物发现了！你慌忙逃跑...'); } }
  };
  const iv=setInterval(()=>{ if(!running){clearInterval(iv);return;} time--; $('sn-time').textContent=time; if(time<=0){running=false;clearInterval(iv);gameEnd(false,onWin,onLose,'时间耗尽，你没能穿过商场。');} },1000);
  $('sn-quit').onclick=()=>{ running=false; clearInterval(iv); gameEnd(false,onWin,onLose,'你放弃了。'); };
}

/* 3) 街上·躲避：20秒内左右闪避，3次碰撞失败 */
function gameDodge(onWin, onLose){
  let pos=1, hits=0, time=20, running=true, spawnIv;
  const lanes=['⬜','⬜','⬜'];
  showPopup(gameHeader('🛣️ 躲避丧尸','点击左右闪避，撑过20秒！撞到3次失败。','dodge')+`
    <div style="display:flex;justify-content:space-between;font-size:14px;margin:6px 0">
      <span>⏱️ <b id="d-time">20</b>s</span><span>撞击 <b id="d-hit">0</b>/3</span>
    </div>
    <div id="d-road" style="background:#1a1a1a;border-radius:10px;padding:10px;height:200px;position:relative;overflow:hidden">
      <div id="d-row" style="position:absolute;bottom:10px;left:0;right:0;display:flex;justify-content:space-around;align-items:flex-end;font-size:32px">
        <span>🧟</span><span>🧍</span><span>🧟</span>
      </div>
    </div>
    <div class="btns" style="margin-top:8px">
      <button id="d-left" style="font-size:18px">⬅️ 左</button>
      <button id="d-right" style="font-size:18px">右 ➡️</button>
    </div>`);
  // 玩家位置
  function drawPlayer(){
    const row=$('d-row');
    row.children[0].textContent = pos===0?'🏃':'🧟';
    row.children[1].textContent = pos===1?'🏃':'🧟';
    row.children[2].textContent = pos===2?'🏃':'🧟';
  }
  drawPlayer();
  $('d-left').onclick=()=>{ if(!running)return; pos=Math.max(0,pos-1); drawPlayer(); };
  $('d-right').onclick=()=>{ if(!running)return; pos=Math.min(2,pos+1); drawPlayer(); };
  // 生成威胁：先让来袭车道的丧尸发红扑来（500ms预警），玩家所在车道被扑中算撞击
  function spawn(){
    if(!running) return;
    const threatLane = rnd(0,2);
    const row=$('d-row');
    const target=row.children[threatLane];
    // 预警：目标车道放大+红光（如果红光是自己，赶紧躲！）
    if(target){ target.style.transform='scale(1.55)'; target.style.filter='drop-shadow(0 0 10px rgba(231,76,60,.95))'; }
    setTimeout(()=>{
      if(target){ target.style.transform=''; target.style.filter=''; }
      if(!running) return;
      if(pos===threatLane){
        hits++; $('d-hit').textContent=hits;
        sfx('hurt');
        row.style.transition='none'; row.style.background='rgba(192,57,43,.4)';
        setGT(()=>{ if(row)row.style.background='transparent'; }, 200);
        if(hits>=3){ running=false; gameEnd(false,onWin,onLose,'你被丧尸扑倒了！'); }
      } else { sfx('miss'); }
      drawPlayer();
      setGT(spawn, rnd(700,1200));
    }, 500);
  }
  setGT(spawn, 800);
  const iv=setInterval(()=>{ if(!running){clearInterval(iv);return;} time--; $('d-time').textContent=time; if(time<=0){running=false;clearInterval(iv);gameEnd(true,onWin,onLose,'你撑过了20秒，安全脱身！');} },1000);
}

/* 4) 中学·教室搜证：emoji 找不同，3 组里找到 2 组过关。
   动态生成关卡（36 格选 2~3 处差异，从 emoji 池随机排布），理论上永不重复。
   难度曲线：天数越大差异越多/时间越紧。
   利用小念「观察力」技能：点一次自动高亮 1 处未找到的差异。 */
const FD_BASE_EMOJI = ['🏫','🪟','📚','🖍️','🧸','🪴','🎒','🍎','🍌','🍵','🔔','🔒','🩹','💧','🔧','📏']; // 完好教室常见物
const FD_DIFF_EMOJI = ['🔥','💀','⚠️','🕳️','🦴','🩸','🦇','🕷️','🔌','🖊️','🍭','🪫'];                        // 废墟痕迹（替换差异用）
function gameFindDiff(onWin, onLose){
  const day = (typeof state!=='undefined' && state) ? state.day : 1;
  // 难度：1-30天 2处/45s；31-60天 2处/35s；61+天 3处/40s
  const diffCount = day>=61 ? 3 : 2;
  const levelTime = day<=30 ? 45 : (day<=60 ? 35 : 40);
  const totalLevels = 3;
  const passAtLeast = 2; // 3 组对 2 组过关

  // 动态生成一关：避开最近 10 次用过的「差异签名」
  const recent = new Set((state && state.mathRecent) || []);
  function makeLevel(){
    for(let attempt=0; attempt<30; attempt++){
      // a: 36 格随机排布 base emoji
      const a = Array.from({length:36}, ()=>FD_BASE_EMOJI[Math.floor(Math.random()*FD_BASE_EMOJI.length)]);
      // b: 选 diffCount 个不重复位置 + 不重复差异 emoji
      const allIdx = Array.from({length:36}, (_,i)=>i).sort(()=>Math.random()-0.5);
      const diffIdx = allIdx.slice(0, diffCount);
      const diffVals = FD_DIFF_EMOJI.slice().sort(()=>Math.random()-0.5).slice(0, diffCount);
      // 确保差异 emoji 和原位置 emoji 不同
      diffVals.forEach((v,i)=>{ if(v===a[diffIdx[i]]) diffVals[i]=FD_DIFF_EMOJI[(FD_DIFF_EMOJI.indexOf(v)+1+Math.floor(Math.random()*FD_DIFF_EMOJI.length))%FD_DIFF_EMOJI.length]; });
      const b = a.slice();
      diffIdx.forEach((idx,i)=>{ b[idx]=diffVals[i]; });
      const sig = diffIdx.sort((x,y)=>x-y).join('-'); // 签名如 "4-19"
      if(!recent.has(sig)){ return {a,b,diffIdx,sig}; }
    }
    // 兜底：放弃去重
    const a = Array.from({length:36}, ()=>FD_BASE_EMOJI[Math.floor(Math.random()*FD_BASE_EMOJI.length)]);
    const allIdx = Array.from({length:36}, (_,i)=>i).sort(()=>Math.random()-0.5);
    const diffIdx = allIdx.slice(0, diffCount);
    const diffVals = FD_DIFF_EMOJI.slice(0, diffCount);
    const b = a.slice(); diffIdx.forEach((idx,i)=>{ b[idx]=diffVals[i]; });
    return {a,b,diffIdx,sig:diffIdx.join('-')};
  }

  const levels = [];
  const usedSignatures = new Set();
  for(let i=0;i<totalLevels;i++){
    let lv;
    do { lv = makeLevel(); } while(usedSignatures.has(lv.sig));
    usedSignatures.add(lv.sig);
    levels.push(lv);
  }
  // 记录到 state（复用 mathRecent 字段名兼容老存档）
  if(state){
    levels.forEach(l=>{ if(!state.mathRecent.includes(l.sig)) state.mathRecent.unshift(l.sig); });
    state.mathRecent = state.mathRecent.slice(0, 10); // 保留最近 10 组签名
    saveState();
  }

  let li=0, passed=0, found=0, running=true, iv, timeLeft;
  // 小念「观察力」技能：每日限 2 次（跨关卡共用，随日期推进清零）
  let skillLeft = (anySkill('观察力') && state) ? Math.max(0, 2 - (state.fdSkillUsed||0)) : 0;
  function gridHtml(arr, diffIdx, isB){
    return arr.map((c,i)=>`<div class="fd-cell" data-i="${i}" data-is-b="${isB?1:0}">${c}</div>`).join('');
  }
  function render(){
    const L = levels[li];
    timeLeft = levelTime; found = 0;
    // 隐藏标记（diffIdx 只在内部）
    showPopup(gameHeader('🔍 教室搜证',`第 ${li+1}/${totalLevels} 组　已过 ${passed}/${passAtLeast}　⏱️ ${timeLeft}s`,'match')+`
      <div style="display:flex;gap:8px;justify-content:center;margin:8px 0 2px">
        <div class="fd-panel">
          <div class="fd-panel-title">📖 完好的教室</div>
          <div class="fd-grid" id="fd-g1">${gridHtml(L.a, L.diffIdx, false)}</div>
        </div>
        <div class="fd-panel">
          <div class="fd-panel-title">🩸 废墟的教室</div>
          <div class="fd-grid" id="fd-g2">${gridHtml(L.b, L.diffIdx, true)}</div>
        </div>
      </div>
      <div style="text-align:center;font-size:12px;color:var(--soft);margin-top:6px">找出 <b>${diffCount}</b> 处不同，点两边格子标记</div>
      ${skillLeft>0
        ? `<div style="text-align:center;margin-top:6px"><button class="primary" id="fd-skill" style="min-height:32px;font-size:12px;padding:4px 14px">🧠 小念·观察力（今日剩余 ${skillLeft}）</button></div>`
        : (anySkill('观察力') ? `<div style="text-align:center;margin-top:6px;font-size:11px;color:var(--soft)">🧠 观察力今日已用完（每日限 2 次）</div>` : '')}
    `);
    // 绑定格子点击
    const marked = new Set(); // 点过的 idx
    document.querySelectorAll('.fd-cell').forEach(c=>{
      c.onclick = ()=>{
        if(!running) return;
        const idx = +c.dataset.i;
        const L2 = levels[li];
        if(!L2.diffIdx.includes(idx)){
          // 错：闪红
          c.classList.add('fd-wrong');
          setTimeout(()=>c.classList.remove('fd-wrong'), 300);
          sfx('miss');
          return;
        }
        if(marked.has(idx)) return;
        marked.add(idx);
        found++;
        sfx('kill');
        // 两边同步标记
        document.querySelectorAll(`.fd-cell[data-i="${idx}"]`).forEach(x=>{ x.classList.add('fd-mark'); });
        if(found >= L2.diffIdx.length){ clearInterval(iv); running=false; setGT(()=>{ nextLevel(); }, 500); }
      };
    });
    // 技能按钮
    const sb = $('fd-skill'); if(sb){
      sb.onclick = ()=>{
        if(skillLeft<=0) return;
        const L2 = levels[li];
        // 找出未标记的差异
        const markedSet = new Set();
        document.querySelectorAll('.fd-cell.fd-mark').forEach(x=>markedSet.add(+x.dataset.i));
        const remain = L2.diffIdx.filter(i=>!markedSet.has(i));
        if(remain.length){
          const pick = remain[0];
          document.querySelectorAll(`.fd-cell[data-i="${pick}"]`).forEach(x=>{ x.classList.add('fd-mark'); });
          found++;
          if(found >= L2.diffIdx.length){ clearInterval(iv); running=false; setGT(()=>{ nextLevel(); }, 400); }
        }
        skillLeft--;
        if(state){ state.fdSkillUsed = (state.fdSkillUsed||0)+1; saveState(); }
        sb.textContent = `🧠 小念·观察力（今日剩余 ${skillLeft}）`;
        if(skillLeft<=0) sb.disabled = true;
      };
    }
    // 计时
    running = true;
    iv = setInterval(()=>{
      if(!running){ clearInterval(iv); return; }
      timeLeft--;
      document.querySelector('#popup h3')?.appendChild; // noop
      // 用 setAttribute 更新 header 里的时间太麻烦，直接重新 showPopup 会重置 UI。
      // 简化：时间到了就算失败
      if(timeLeft<=0){ running=false; clearInterval(iv); setGT(()=>{ nextLevel(false); }, 400); }
    }, 1000);
  }
  function nextLevel(pass){
    if(pass===false && found < levels[li].diffIdx.length){
      // 超时未全找到：本组失败
      sfx('miss');
    } else {
      passed++;
      sfx('kill');
    }
    li++;
    if(li < totalLevels){ render(); } else { finish(); }
  }
  function finish(){ gameEnd(passed >= passAtLeast, onWin, onLose, passed>=passAtLeast?`在废墟教室翻出了图纸（通过 ${passed}/${totalLevels}）`:`没全部找到线索（通过 ${passed}/${totalLevels}）...`); }
  render();
}

/* 5) 大楼·多层推理：4道逻辑题，答对3题通过。题库含生活推理+经典脑筋急转弯，降低重复率 */
const LOGIC_POOL = [
  {q:'甲、乙、丙、丁四人比身高：丙比丁高，丁比甲高，甲比乙高。谁最矮？', o:['甲','乙','丙','丁'], a:1},
  {q:'苹果、香蕉、橘子各有一个，小红和小明各吃一个，两人吃的水果不重复。小红吃橘子，小明不吃香蕉。小明吃什么？', o:['苹果','香蕉','橘子','不确定'], a:0},
  {q:'1号楼在2号楼左边，3号楼在1号楼左边。最右边是几号楼？', o:['1号楼','2号楼','3号楼','都不对'], a:1},
  {q:'A>B，B>C，C>D。最小的是？', o:['A','B','C','D'], a:3},
  {q:'今天不是周一也不是周二，前天是周四。今天周几？', o:['周五','周六','周日','周三'], a:1},
  {q:'小明比小红高，小红比小刚高。最矮的是？', o:['小明','小红','小刚','一样高'], a:2},
  {q:'甲说乙说谎，乙说丙说谎，丙说甲乙都说谎。谁说真话？', o:['甲','乙','丙','都说谎'], a:1},
  {q:'甲乙丙丁四人赛跑：丙比丁快，丁跑在乙前面，乙又比甲快。谁跑得最快？', o:['甲','乙','丙','丁'], a:2},
  {q:'甲、乙、丙三个盒子分别装着红球、蓝球、绿球（每盒一种，互不重复）。乙盒装蓝球，甲盒装的不是红球，绿球在哪个盒子里？', o:['甲盒','乙盒','丙盒','无法确定'], a:0},
  {q:'3天前是星期三，后天是星期几？', o:['星期六','星期日','星期一','星期二'], a:2},
  {q:'甲乙丙三人，一个是老师，一个是医生，一个是工程师。丙比工程师大，甲和医生不同岁，医生比乙小。谁是工程师？', o:['甲','乙','丙','无法确定'], a:0},
  {q:'有3个盒子，分别标着"苹果""橘子""混合"，但标签全贴错了。从标"混合"的盒子拿一个水果，能确定所有标签吗？', o:['能','不能','只能确定1个','只能确定2个'], a:0},
  {q:'一个农夫带狼、羊、白菜过河，船每次只能带一样。怎样安全过河？', o:['先带羊','先带狼','先带白菜','无法过河'], a:0},
  {q:'甲乙丙三人中只有一人会开车。甲说"我会"，乙说"我不会"，丙说"甲不会"。只有一人说真话，谁会开车？', o:['甲','乙','丙','无法确定'], a:1},
  {q:'小红、小明、小刚三人比体重：小红比小明轻，小刚比小红重。谁最轻？', o:['小红','小明','小刚','一样重'], a:0},
  {q:'一杯牛奶，小明先喝半杯，用水加满，再喝半杯，再用水加满，最后全喝完。小明喝了几杯牛奶？', o:['半杯','1杯','1杯半','2杯'], a:1},
  {q:'甲乙两人比赛爬楼梯，甲到4楼时乙到3楼。照此速度，甲到16楼时乙到几楼？', o:['10楼','11楼','12楼','13楼'], a:1},
  {q:'小明、小红、小刚各拿一个水果：苹果、香蕉、橘子。小明不拿苹果，小红不拿香蕉，小刚拿橘子。小明拿什么？', o:['苹果','香蕉','橘子','不确定'], a:1},
  {q:'甲乙丙三人住同一栋楼，甲住的楼层是乙的2倍，丙住的比甲高1层。乙住3楼，丙住几楼？', o:['6楼','7楼','8楼','9楼'], a:1},
  {q:'甲乙丙三人各有一些糖，甲给乙5颗后，乙比甲多3颗。原来甲比乙多几颗？', o:['5颗','7颗','8颗','10颗'], a:1},
  {q:'甲乙丙丁四人排成一队：丙排在最前面，甲紧跟在乙后面，丁不在最后。下面哪个队伍符合条件？', o:['丙乙甲丁','丙丁乙甲','乙甲丙丁','丙甲乙丁'], a:1},
  {q:'甲乙两人同时出发，甲向东走，乙向西走。甲每小时比乙多走2公里，3小时后两人相距30公里。乙每小时走几公里？', o:['3公里','4公里','5公里','6公里'], a:1},
  {q:'甲乙丙三人猜谜语，甲猜对的概率比乙大，乙猜对的概率比丙大。谁最可能猜错？', o:['甲','乙','丙','一样大'], a:2},
  {q:'五个小朋友围成一圈做游戏，每两人之间握手一次。共握手几次？', o:['8次','9次','10次','12次'], a:2},
  {q:'甲乙丙三人各带了不同颜色的帽子：红、蓝、绿。甲不戴红，乙不戴蓝，丙戴绿。甲戴什么颜色？', o:['红','蓝','绿','不确定'], a:1},
  {q:'一辆车从A到B，去时每小时40公里，回时每小时60公里。往返平均速度是多少？', o:['45公里','48公里','50公里','55公里'], a:1},
  {q:'有红、黄、蓝三个球：黄球比蓝球小，蓝球不是最大的，红球不是最小的。最大的是？', o:['红球','黄球','蓝球','无法确定'], a:0},
  {q:'有苹果、香蕉、橘子三种水果，妈妈买了其中两种，没有买香蕉。妈妈买了哪两种？', o:['苹果和橘子','苹果和香蕉','香蕉和橘子','不确定'], a:0},
  {q:'甲乙丙三人下棋，每两人下一盘。共下几盘？', o:['2盘','3盘','4盘','6盘'], a:1},
  {q:'小明从家走到学校要15分钟。他7:30出门，几点能到学校？', o:['7:15','7:45','8:00','7:50'], a:1},
  {q:'甲乙两人同时从两地相向而行，甲走完全程要6小时，乙要4小时。出发后几小时相遇？', o:['2小时','2.4小时','3小时','3.5小时'], a:1},
  {q:'有5个钥匙开5把锁，最多试几次能全部配对？', o:['10次','12次','15次','25次'], a:0},
  {q:'甲乙丙三人共有糖若干颗。甲给乙8颗，乙给丙5颗后，三人一样多。原来乙比丙多几颗？', o:['2颗','3颗','5颗','8颗'], a:0},
  {q:'一列队伍，小明前面有5人，后面有8人。这列队伍共多少人？', o:['12人','13人','14人','15人'], a:2},
  {q:'甲乙两人各有若干本书。甲给乙10本后，甲比乙少5本。原来甲比乙多几本？', o:['10本','12本','15本','20本'], a:2},
  {q:'三个盒子里分别有2个红球、2个蓝球、1红1蓝。标签全贴错了。从标"1红1蓝"的盒子拿1个球是红色，这个盒子里另一个球是什么颜色？', o:['红色','蓝色','不确定','没有另一个球'], a:0},
  {q:'书架上有3本书：语文书在数学书上面，英语书又在语文书上面。最下面的是哪本书？', o:['语文书','数学书','英语书','都一样'], a:1},
  {q:'小明把一根绳子对折3次后从中间剪断，绳子变成几段？', o:['7段','8段','9段','10段'], a:2},
  {q:'小明、小红、小刚三人赛跑，小明不是最快的，小刚比小红慢。谁跑得最快？', o:['小明','小红','小刚','无法确定'], a:1},
  {q:'5个连续偶数的和是80，最大的数是？', o:['14','16','18','20'], a:3},
  {q:'甲乙两地相距60公里，小明骑车每小时15公里，小红步行每小时5公里。两人同时相向出发，几小时相遇？', o:['2小时','3小时','4小时','6小时'], a:1},
  {q:'有红黄绿蓝4种颜色的球各3个，至少拿几个能保证每种颜色都有？', o:['8个','9个','10个','12个'], a:2},
  {q:'甲乙丙三人年龄和是62岁，甲比乙大4岁，乙比丙大2岁。甲多少岁？', o:['20岁','22岁','24岁','26岁'], a:2},
  {q:'一个人花8元买了只鸡，9元卖掉，又花10元买回，11元卖掉。他赚了多少？', o:['1元','2元','3元','没赚'], a:1},
  {q:'甲乙两人共有书60本，甲给乙5本后两人相等。甲原来有多少本？', o:['30本','32本','35本','40本'], a:2},
  {q:'时钟敲3下用6秒，敲6下用几秒？', o:['10秒','12秒','15秒','18秒'], a:2},
  {q:'甲乙丙丁四人比赛跑步，甲不是最后一名，乙不是第一名，丙比甲快，丁的名次没有任何限制。谁是第一名？', o:['甲','乙','丙','无法确定'], a:3},
  {q:'哥哥比弟弟大3岁，妹妹比弟弟小2岁。三人中谁最大？', o:['哥哥','弟弟','妹妹','一样大'], a:0},
  {q:'甲乙丙三人各拿不同的水果：苹果、梨、桃。甲不拿苹果，乙不拿梨，丙拿桃。乙拿什么？', o:['苹果','梨','桃','不确定'], a:0},
  {q:'有两筐苹果，从第一筐拿8个放入第二筐后，两筐一样多。原来第一筐比第二筐多几个？', o:['8个','12个','16个','20个'], a:2},
  {q:'甲乙两人同时从A到B，甲用了2小时，乙用了3小时。甲乙速度比是？', o:['2:3','3:2','4:3','3:4'], a:1},
  {q:'3个空瓶可以换1瓶汽水（可以先向老板借1个空瓶，喝完再把空瓶还给他），买了10瓶汽水，最多能喝几瓶？', o:['13瓶','14瓶','15瓶','16瓶'], a:2},
  {q:'甲乙丙丁四人排成一排，甲不站两边，有几种站法？', o:['8种','12种','16种','24种'], a:1},
  {q:'甲乙两人各有若干元，甲的1/3等于乙的1/4。甲和乙的钱数比是？', o:['3:4','4:3','1:1','2:3'], a:0},
  {q:'一个数比10大、比20小，十位和个位上的数字相同。这个数是？', o:['11','12','18','22'], a:0},
  {q:'红、黄、蓝三个球，红球比黄球大，蓝球比红球大。最大的球是？', o:['红球','黄球','蓝球','一样大'], a:2},
  {q:'甲乙两人沿400米环形跑道跑步，甲每秒5米，乙每秒3米。两人同时同地同向出发，几秒后甲第一次追上乙？', o:['100秒','150秒','200秒','250秒'], a:2},
  {q:'有5个连续自然数，最大的是最小的2倍。这5个数的和是？', o:['30','35','40','45'], a:0},
  // ---------- 生活推理（简单直观）----------
  {q:'三个小朋友比身高：小华比小杰高，小杰比小强高。谁最高？', o:['小华','小杰','小强','一样高'], a:0},
  {q:'妈妈买了苹果和梨，苹果比梨多3个，梨有5个。苹果有几个？', o:['6个','7个','8个','9个'], a:2},
  {q:'小红每天看5页书，看了4天，第5天应从第几页开始看？', o:['20页','21页','22页','25页'], a:1},
  {q:'钟面上3点整，时针和分针成什么角？', o:['锐角','直角','钝角','平角'], a:1},
  {q:'1千克棉花和1千克铁，哪个更重？', o:['棉花','铁','一样重','无法比较'], a:2},
  {q:'把一根木头锯成3段，需要锯几次？', o:['1次','2次','3次','4次'], a:1},
  {q:'小明有3颗糖，比小红少2颗。小红有几颗糖？', o:['1颗','2颗','5颗','6颗'], a:2},
  {q:'哥哥今年8岁，比弟弟大3岁。弟弟今年几岁？', o:['3岁','4岁','5岁','11岁'], a:2},
  {q:'一个数加上5等于12，这个数是？', o:['5','6','7','8'], a:2},
  {q:'小红前面有4人，后面有3人，这一队共有几人？', o:['7人','8人','9人','10人'], a:1},
  {q:'把10个苹果平均分给2个小朋友，每人分几个？', o:['2个','4个','5个','10个'], a:2},
  {q:'一只蜗牛爬5米高的树，白天爬3米，晚上滑下2米。第几天能爬到树顶？', o:['3天','4天','5天','6天'], a:0},
  {q:'停车场有8辆车，开走3辆，又开来5辆，现在有几辆？', o:['8辆','9辆','10辆','13辆'], a:1},
  {q:'小明比小红高，小红比小刚高。三人中谁最矮？', o:['小明','小红','小刚','一样高'], a:2},
  {q:'一本书共40页，小明看了15页，还剩多少页？', o:['15页','20页','25页','35页'], a:2},
  {q:'用1元和5角硬币凑成2元5角，最少要几枚硬币？', o:['2枚','3枚','4枚','5枚'], a:1},
  {q:'闰年的2月有多少天？', o:['28天','29天','30天','31天'], a:1},
  {q:'一个长方形长6米、宽4米，它的周长是多少米？', o:['10米','20米','24米','40米'], a:1},
  {q:'小明从1楼到3楼用了2分钟，照这样的速度，到5楼要几分钟？', o:['3分钟','4分钟','5分钟','6分钟'], a:1},
  {q:'三个杯子，第一个比第二个高，第三个比第一个矮。最高的是哪个？', o:['第一个','第二个','第三个','一样高'], a:0},
  {q:'三人摘苹果，小红比小明多摘5个，小刚比小明少摘2个。谁摘得最多？', o:['小红','小明','小刚','一样多'], a:0},
  {q:'一个数的3倍是24，这个数是？', o:['6','7','8','9'], a:2},
  {q:'把15平均分成3份，每份是多少？', o:['3','4','5','6'], a:2},
  {q:'钟表上的分针走一圈是多长时间？', o:['1分钟','5分钟','30分钟','1小时'], a:3},
  {q:'一根绳子对折后从中间剪一刀，绳子变成几段？', o:['2段','3段','4段','5段'], a:1},
  // ---------- 经典脑筋急转弯 ----------
  {q:'小明的爸爸有三个儿子，大儿子叫大毛，二儿子叫二毛，三儿子叫什么？', o:['小明','三毛','小毛','无法确定'], a:0},
  {q:'什么东西越洗越脏？', o:['衣服','手','水','碗'], a:2},
  {q:'什么门永远关不上？', o:['大门','球门','房门','脑门'], a:1},
  {q:'什么布剪不断？', o:['棉布','瀑布','麻布','胶布'], a:1},
  {q:'什么帽子不能戴？', o:['草帽','螺丝帽','棉帽','安全帽'], a:1},
  {q:'打死什么动物，流的却是你的血？', o:['苍蝇','蚊子','蜘蛛','蟑螂'], a:1},
  {q:'"太平洋"三个字的中间是什么？', o:['水','平','岛屿','海水'], a:1},
  {q:'什么蛋中看不中吃？', o:['鸡蛋','脸蛋','鸭蛋','恐龙蛋'], a:1},
  {q:'什么球不能踢？', o:['足球','地球','篮球','皮球'], a:1},
  {q:'什么鱼不能吃？', o:['鲤鱼','木鱼','草鱼','金鱼'], a:1},
  {q:'什么虎不吃人？', o:['老虎','壁虎','狮子','豹子'], a:1},
  {q:'什么猫不抓老鼠？', o:['小猫','熊猫','花猫','黑猫'], a:1},
  {q:'什么马不能骑？', o:['斑马','海马','木马','骏马'], a:1},
  {q:'什么花不会结果？', o:['桃花','雪花','梨花','苹果花'], a:1},
  {q:'什么东西天气越热，它爬得越高？', o:['蚂蚁','温度计','太阳','烟'], a:1},
  {q:'什么东西越擦越小？', o:['毛巾','橡皮','桌子','镜子'], a:1},
  {q:'你的左手能拿、右手却拿不到的是什么？', o:['杯子','右手','手机','书本'], a:1},
  {q:'什么东西有五个头，人却不觉得它奇怪？', o:['手','头发','星星','花朵'], a:0},
  {q:'什么路最窄？', o:['小路','冤家路','山路','水路'], a:1},
  {q:'什么东西要打破了才能吃？', o:['苹果','鸡蛋','核桃','面包'], a:1},
  {q:'什么东西你越生气，它就越大？', o:['气球','脾气','火','海绵'], a:1},
  {q:'什么东西没吃时是绿的，吃下去是红的，吐出来是黑的？', o:['黄瓜','西瓜','苦瓜','菠菜'], a:1},
  {q:'什么牛不吃草？', o:['黄牛','蜗牛','水牛','奶牛'], a:1},
  {q:'什么狗不会咬人？', o:['小狗','热狗','警犬','猎狗'], a:1},
  {q:'什么鸡没有毛？', o:['公鸡','田鸡','母鸡','小鸡'], a:1},
  {q:'树上有5只鸟，猎人开枪打死1只，树上还剩几只？', o:['0只','4只','5只','1只'], a:0},
  {q:'房间里有4盏灯，关掉1盏，房间里还剩几盏灯？', o:['1盏','2盏','3盏','4盏'], a:3},
  {q:'什么东西越剪越大？', o:['头发','洞','指甲','绳子'], a:1},
];
function gameLogic(onWin, onLose){
  let qi=0, correct=0, running=true;
  // 抽4题：优先避开最近出过的题（降低重复感），候选不足4题时回退全库
  const recent = new Set((state && state.logicRecent) || []);
  let pool = LOGIC_POOL.filter(q=>!recent.has(q.q));
  if(pool.length < 4) pool = LOGIC_POOL.slice();
  pool.sort(()=>Math.random()-0.5);
  const pick = pool.slice(0,4);
  // 记录本局题目到近期纪录（最多20条，最新在前），下次抽题自动避开
  if(state){
    pick.forEach(q=>{ if(!state.logicRecent.includes(q.q)) state.logicRecent.unshift(q.q); });
    state.logicRecent = state.logicRecent.slice(0,20);
    saveState();
  }
  function render(){
    const q=pick[qi];
    showPopup(gameHeader('🏢 多层推理',`第 ${qi+1} 题（共4题）· 答对3题即可通过`,'logic')+`
      <div style="background:var(--bg);border-radius:10px;padding:14px;text-align:center;font-size:14px;margin:8px 0;line-height:1.7">${q.q}</div>
      <div style="text-align:center;font-size:13px;color:var(--soft);margin-bottom:6px">已答对 <b>${correct}</b>/3</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;grid-gap:6px;gap:6px">
        ${q.o.map((o,i)=>`<button class="l-opt" data-i="${i}" style="min-height:44px;background:#fff;color:var(--ink);border-color:var(--line);border:1px solid var(--line);border-radius:8px;font-size:14px;cursor:pointer">${o}</button>`).join('')}
      </div>`);
    document.querySelectorAll('.l-opt').forEach(b=>{
      b.onclick=()=>{
        if(!running) return;
        running=false;
        const ok=+b.dataset.i===q.a;
        b.style.background=ok?'#D5F5E3':'#FADBD8';
        document.querySelectorAll('.l-opt').forEach(x=>{
          if(+x.dataset.i===q.a && !ok) x.style.background='#D5F5E3';
          x.disabled=true;
        });
        sfx(ok?'kill':'miss');
        if(ok){
          correct++;
          toast('答对了！');
        } else {
          toast('答错了，下一题...');
        }
        qi++;
        if(qi>=pick.length || correct>=3){
          setGT(()=>gameEnd(correct>=3,onWin,onLose, correct>=3?`答对${correct}题，推理通过！`:`只答对${correct}题，推理失败...`), 550);
        } else {
          setGT(()=>{ running=true; render(); }, 650);
        }
      };
    });
  }
  render();
}

/* 6) 医院·症状配药：3个病人+5种药，30秒内配对正确 */
function gameMatch(onWin, onLose){
  const pool = [
    {sym:'🤒', med:'💊', name:'退烧药', symText:'发烧'},
    {sym:'🤕', med:'🩹', name:'创可贴', symText:'外伤出血'},
    {sym:'🤢', med:'🧪', name:'止吐药', symText:'恶心反胃'},
    {sym:'😷', med:'💊', name:'消炎药', symText:'伤口发炎'},
    {sym:'🤧', med:'🧪', name:'抗过敏', symText:'过敏瘙痒'},
    {sym:'🤮', med:'🧪', name:'止吐药', symText:'呕吐不止'},
    {sym:'😵', med:'💊', name:'止痛药', symText:'头痛欲裂'},
    {sym:'😨', med:'🧪', name:'镇定剂', symText:'焦虑恐慌'},
    {sym:'🩸', med:'🩹', name:'止血带', symText:'流血不止'},
    {sym:'🥵', med:'🧪', name:'降温药', symText:'高烧不退'},
    {sym:'🤒', med:'🧪', name:'感冒药', symText:'感冒流涕'},
    {sym:'😣', med:'💊', name:'止痛药', symText:'浑身疼痛'},
    {sym:'🤧', med:'🧪', name:'止咳药', symText:'咳嗽不停'},
    {sym:'🤢', med:'💊', name:'肠胃药', symText:'胃痛痉挛'},
    {sym:'😷', med:'🧪', name:'抗生素', symText:'细菌感染'},
    {sym:'😵', med:'🧪', name:'葡萄糖', symText:'虚脱乏力'},
    {sym:'🤕', med:'💊', name:'消炎药', symText:'伤口红肿'},
    {sym:'🥶', med:'🧪', name:'暖身药', symText:'发冷寒颤'},
    {sym:'🥴', med:'💊', name:'晕车药', symText:'头晕目眩'},
    {sym:'🦷', med:'💊', name:'止痛药', symText:'牙痛难忍'},
    {sym:'😪', med:'🧪', name:'提神药', symText:'嗜睡无力'},
    {sym:'🤒', med:'🧪', name:'退烧针', symText:'持续高热'},
    {sym:'😤', med:'🧪', name:'降压药', symText:'血压偏高'},
    {sym:'🩸', med:'💊', name:'补血药', symText:'贫血头晕'},
    {sym:'🤢', med:'💊', name:'胃药', symText:'胃酸过多'},
    {sym:'😷', med:'💊', name:'感冒药', symText:'重感冒'},
    {sym:'🥵', med:'🧪', name:'解暑药', symText:'中暑虚脱'},
    {sym:'🤧', med:'💊', name:'感冒药', symText:'流感症状'},
    {sym:'😣', med:'🧪', name:'解痉药', symText:'腹部绞痛'},
    {sym:'🤕', med:'🩹', name:'绷带', symText:'大面积擦伤'},
  ];
  // 选3个病人
  const patients = pool.sort(()=>Math.random()-0.5).slice(0,3);
  // 药打乱顺序
  const meds = patients.map(p=>({sym:p.sym, med:p.med, name:p.name})).sort(()=>Math.random()-0.5);
  let time=30, running=true, matched=0, selMed=null;
  // 给每个病人加 locked 标记（配错后封锁）
  patients.forEach(p=>p.locked=false);
  function render(){
    showPopup(gameHeader('🏥 症状配药',`30秒内为3位病人配上正确的药。配错的病人将被封锁！`,'match')+`
      <div style="display:flex;justify-content:space-between;font-size:13px;margin:6px 0"><span>⏱️ <b id="mt-time">30</b>s</span><span>已配 <b id="mt-m">0</b>/3</span></div>
      <div style="background:var(--bg);border-radius:10px;padding:8px;margin:6px 0" id="mt-pats">
        ${patients.map((p,i)=>`<div class="pat" data-i="${i}" data-locked="${p.locked}" style="display:flex;align-items:center;gap:8px;padding:6px;border-bottom:1px solid var(--line);${p.locked?'opacity:.45;background:#F5F0EA;pointer-events:none':''}"><span style="font-size:24px">${p.sym}</span><span style="flex:1;font-size:13px">${p.locked?'<span style="color:var(--alert)">已配错</span>':p.symText}</span><span class="pat-slot" style="font-size:22px;width:32px;text-align:center;border:1px dashed var(--line);border-radius:6px">${p.locked?'✕':'?'}</span></div>`).join('')}
      </div>
      <div class="fgw" style="--g:6px;justify-content:center;margin-top:6px">
        ${meds.map((m,i)=>`<button class="mcard" data-mi="${i}" style="font-size:11px;min-width:56px;height:52px;background:#fff;color:var(--ink);border-color:var(--line);border:1px solid var(--line);border-radius:8px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2px"><span style="font-size:20px">${m.med}</span><span style="font-size:10px;color:var(--soft)">${m.name}</span></button>`).join('')}
      </div>`);
    document.querySelectorAll('.mcard').forEach(b=>{
      b.onclick=()=>{ if(!running||b.disabled)return; selMed=+b.dataset.mi; document.querySelectorAll('.mcard').forEach(x=>{ if(!x.disabled) x.style.background='#fff'; }); b.style.background='#DDE4E1'; };
    });
    document.querySelectorAll('.pat').forEach(d=>{
      d.onclick=()=>{
        if(!running||selMed===null) return;
        if(d.dataset.locked==='true') return; // 已配错的病人封锁
        const pi=+d.dataset.i;
        const m=meds[selMed];
        const p=patients[pi];
        if(!m||!p) return;
        if(p.med===m.med){
          matched++; $('mt-m').textContent=matched;
          sfx('reward');
          const slot=d.querySelector('.pat-slot');
          if(slot){ slot.textContent=m.med; slot.classList.add('item-pop'); }
          d.style.background='#D5F5E3';
          const card=document.querySelector('.mcard[data-mi="'+selMed+'"]');
          if(card){ card.style.opacity='.3'; card.disabled=true; card.style.background='#fff'; }
          selMed=null;
          // 3个病人都处理完（配对或配错）就立即结束，不再干等倒计时
          const remain = patients.filter(pp=>!pp.locked).length - matched;
          if(matched>=3 || remain<=0){ running=false; gameEnd(matched>=3,onWin,onLose, matched>=3?'3位病人都得到了正确的药！':'配错太多，失败了...'); }
        } else {
          // 配错：只封锁该病人，药卡不禁用（可继续用于其他病人）
          sfx('hurt');
          p.locked=true;
          d.dataset.locked="true";
          d.style.opacity=".45";
          d.style.background="#F5F0EA";
          d.style.pointerEvents="none";
          const slot=d.querySelector(".pat-slot");
          if(slot){
            slot.textContent="✕";
            slot.style.borderColor="#E74C3C";
            slot.style.color="#E74C3C";
          }
          const nameSpan=d.querySelector("span:nth-child(2)");
          if(nameSpan) nameSpan.innerHTML='<span style="color:#E74C3C">已配错</span>';
          selMed=null;
          // 检查是否所有未封锁的病人都配好了
          const remain = patients.filter(pp=>!pp.locked).length - matched;
          if(remain<=0){ running=false; gameEnd(matched>=3,onWin,onLose, matched>=3?"配药完成！":"配错太多，失败了..."); }
        }
      };
    });
  }
  render();
  const iv=setInterval(()=>{ if(!running){clearInterval(iv);return;} time--; const t=$('mt-time'); if(t)t.textContent=time; if(time<=0){running=false;clearInterval(iv);gameEnd(matched>=3,onWin,onLose, matched>=3?'刚好配完！':'时间到，只配了'+matched+'个...');} },1000);
}

/* 7) 加油站·抽油桶：点绿桶加油，避红桶(爆炸)，20秒满10桶通关 */
function gamePump(onWin, onLose){
  let fuel=0, time=20, running=true;
  showPopup(gameHeader('⛽ 抽油桶','点绿色油桶加油，避开红色爆炸桶！满10桶通关。','pump')+`
    <div style="display:flex;justify-content:space-between;font-size:13px;margin:6px 0"><span>⏱️ <b id="p-time">20</b>s</span><span>油 <b id="p-fuel">0</b>/10</span></div>
    <div id="p-field" style="background:var(--bg);border-radius:10px;padding:8px;height:180px;position:relative"></div>`);
  const field=$('p-field');
  function spawn(){
    if(!running) return;
    const b=document.createElement('button');
    const isRed = Math.random()<0.32;
    b.style.cssText=`position:absolute;font-size:28px;background:${isRed?'#E74C3C':'#27AE60'};color:#fff;border:none;border-radius:50%;width:44px;height:44px;left:${rnd(2,85)}%;top:${rnd(2,75)}%;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.2)`;
    b.textContent=isRed?'💥':'🛢️';
    b.onclick=()=>{
      if(!running) return;
      if(isRed){
        // 爆炸：先看到火光炸开再结算
        running=false; sfx('hurt');
        b.textContent='💥'; b.style.background='transparent'; b.style.boxShadow='none';
        b.animate([{transform:'scale(.6)'},{transform:'scale(2.6)'}],{duration:320,easing:'ease-out',fill:'forwards'});
        setGT(()=>gameEnd(false,onWin,onLose,'💥 引爆了油桶！'), 330);
      } else {
        fuel++; $('p-fuel').textContent=fuel; sfx('attack');
        b.animate([{transform:'scale(1)'},{transform:'scale(1.35)'},{transform:'scale(0)'}],{duration:200,easing:'ease-out',fill:'forwards'});
        setGT(()=>b.remove(), 200);
        if(fuel>=10){ running=false; setGT(()=>gameEnd(true,onWin,onLose,'装满了10桶油！'), 240); }
      }
    };
    field.appendChild(b);
    // 油桶“啵”地冒出来
    b.animate([{transform:'scale(0)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:200,easing:'cubic-bezier(.2,.8,.3,1.4)'});
    setGT(()=>{ if(b.parentNode) b.remove(); }, rnd(1200,1800));
    setGT(spawn, rnd(500,900));
  }
  setGT(spawn, 400);
  const iv=setInterval(()=>{ if(!running){clearInterval(iv);return;} time--; $('p-time').textContent=time; if(time<=0){running=false;clearInterval(iv);gameEnd(fuel>=10,onWin,onLose, fuel>=10?'刚好装满！':'时间到，只装了'+fuel+'桶...');} },1000);
}

/* 8) 公园·寻物记忆：12张卡片翻面，凑齐4对通关 */
function gameMemory(onWin, onLose){
  const pairs = ['🌱','🌿','🍓','🌻','🍄','🐛']; // 6种植物/虫，共6对12张
  const deck = [...pairs, ...pairs].sort(()=>Math.random()-0.5);
  let flipped=[], matched=0, time=30, running=true, lock=false;
  showPopup(gameHeader('🌳 寻物记忆','翻开卡片凑齐4对植物，30秒内完成！','memory')+`
    <div style="display:flex;justify-content:space-between;font-size:13px;margin:6px 0">
      <span>⏱️ <b id="me-time">30</b>s</span><span>配对 <b id="me-m">0</b>/4</span>
    </div>
    <div id="me-grid" style="display:grid;grid-template-columns:repeat(4,1fr);grid-gap:6px;gap:6px;background:var(--bg);border-radius:10px;padding:8px"></div>`);
  const grid=$('me-grid');
  // 卡片三态全部用 CSS 类控制（不用内联 color:transparent / var()，规避部分手机 WebView 不生效导致白屏无内容）
  deck.forEach((e,i)=>{
    const c=document.createElement('button');
    c.className='me-card';
    c.dataset.idx=i; c.dataset.emoji=e;
    // 背面暗纹 🌿 + 正面 emoji（正面常驻 DOM，仅靠类切换显隐）
    c.innerHTML='<span class="me-back">🌿</span><span class="me-em">'+e+'</span>';
    c.onclick=()=>{
      if(!running||lock||c.classList.contains('done')||c.classList.contains('open')) return;
      c.classList.add('open');
      sfx('dodge');
      flipped.push(c);
      if(flipped.length===2){
        lock=true;
        const [a,b]=flipped;
        if(a.dataset.emoji===b.dataset.emoji){
          a.classList.add('done'); b.classList.add('done');
          a.classList.remove('item-pop'); b.classList.remove('item-pop');
          void a.offsetWidth;
          a.classList.add('item-pop'); b.classList.add('item-pop');
          sfx('reward');
          matched++; $('me-m').textContent=matched; flipped=[]; lock=false;
          if(matched>=4){ running=false; gameEnd(true,onWin,onLose,'凑齐了4对！'); }
        } else {
          sfx('miss');
          setGT(()=>{
            a.classList.remove('open'); b.classList.remove('open');
            flipped=[]; lock=false;
          }, 700);
        }
      }
    };
    grid.appendChild(c);
  });
  const iv=setInterval(()=>{ if(!running){clearInterval(iv);return;} time--; $('me-time').textContent=time; if(time<=0){running=false;clearInterval(iv);gameEnd(matched>=4,onWin,onLose, matched>=4?'刚好凑齐！':'时间到，只凑了'+matched+'对...');} },1000);
}

/* 9) 游泳馆·憋气计时：按住按钮憋气，肺活量条见底前松手，连过3关 */
let _breathSeq = 0; // 局号令牌：防止上一局的计时器/回调影响到新一局
function gameBreath(onWin, onLose){
  const token = ++_breathSeq;
  let round=0, pass=0, running=true, holding=false, breath=100, dropSpeed=0, lastWarn=0;
  const need=[50, 65, 78]; // 每关需要憋气达到的百分比（逐关递增）
  showPopup(gameHeader('🏊 憋气计时','按住"憋气"按钮，肺活量条见底前松手，达到目标线算过！连过3关。','breath')+`
    <div style="text-align:center;font-size:13px;margin:6px 0">第 <b id="br-r">1</b>/3 关　目标：憋气到 <b id="br-goal">60</b>%</div>
    <div style="background:var(--bg);border-radius:10px;padding:8px;margin:6px 0">
      <div style="height:24px;background:#C9D2CF;border-radius:12px;overflow:hidden;position:relative">
        <div id="br-bar" style="height:100%;width:100%;background:var(--accent);border-radius:12px;transition:width .05s linear"></div>
        <div id="br-goal-line" style="position:absolute;top:0;bottom:0;width:2px;background:var(--alert);left:60%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--soft);margin-top:4px">
        <span>肺活量 <b id="br-val">100</b>%</span><span id="br-status">按住开始</span>
      </div>
    </div>
    <div class="btns" style="gap:8px"><button id="br-hold" style="flex:1;font-size:16px;min-height:56px;background:var(--accent);color:#fff;border:none;border-radius:12px;cursor:pointer;touch-action:none;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none">🫁 按住憋气</button><button id="br-quit" style="flex:0 0 86px;font-size:14px;min-height:56px;background:var(--bg);color:var(--soft);border:1px solid var(--line);border-radius:12px;cursor:pointer">放弃</button></div>`);
  const bar=$('br-bar'), goalLine=$('br-goal-line'), val=$('br-val'), status=$('br-status'), rEl=$('br-r'), goalEl=$('br-goal');
  const pop=$('popup');
  // 长按期间锁住弹窗滚动，避免手指轻微抖动被 WebView 判定为滚动而丢失结束事件
  function lockScroll(){ pop.style.overflow='hidden'; pop.style.touchAction='none'; }
  function unlockScroll(){ pop.style.overflow=''; pop.style.touchAction=''; }
  function setupRound(){
    if(token!==_breathSeq) return; // 旧局回调，直接忽略
    if(round>=3){ running=false; unlockScroll(); gameEnd(true,onWin,onLose,'3关全过！你是憋气高手！'); return; }
    breath=100; bar.style.width='100%'; val.textContent='100';
    const g=need[round]; goalEl.textContent=g; goalLine.style.left=g+'%';
    rEl.textContent=round+1; status.textContent='按住开始'; holding=false;
    unlockScroll();
  }
  setupRound();
  let iv=null;
  const btn=$('br-hold');
  btn.addEventListener('pointerdown', e=>{
    if(e.pointerId!==undefined){ try{ btn.setPointerCapture(e.pointerId); }catch(_){} }
    if(e.cancelable) e.preventDefault();
    startHold();
  });
  btn.addEventListener('pointerup', e=>{ if(e.cancelable) e.preventDefault(); endHold(); });
  btn.addEventListener('pointercancel', ()=>{ endHold(); });          // 系统手势/来电打断
  btn.addEventListener('pointerleave', ()=>{ endHold(); });           // 手指滑出按钮（未捕获时）
  btn.addEventListener('lostpointercapture', ()=>{ endHold(); });     // 指针捕获被系统收回
  btn.addEventListener('contextmenu', e=>e.preventDefault());        // 抑制长按菜单
  // 放弃：按"和其他挑战一致"处理——视为本局失败，走同一套失败结算，但立刻结束、不再掉肺活量
  $('br-quit').onclick = ()=>{
    if(!running) return;
    running=false; holding=false; clearInterval(iv); unlockScroll();
    sfx('miss'); gameEnd(false,onWin,onLose,'你主动放弃了这次憋气挑战，白跑一趟...');
  };
  function startHold(){
    if(token!==_breathSeq||!running||holding) return;
    holding=true; lastWarn=0; status.textContent='憋住...别松手太早！';
    lockScroll();
    sfx('dive'); // 入水"噗通"
    dropSpeed = 0.5 + round*0.25; // 越往后掉越快（第1关10/秒、第2关15/秒、第3关20/秒）
    iv=setInterval(()=>{
      if(token!==_breathSeq){ clearInterval(iv); return; } // 上一局的计时器，直接停
      breath -= dropSpeed;
      if(breath<=0){ breath=0; bar.style.width='0%'; val.textContent='0'; clearInterval(iv);
        unlockScroll(); sfx('hurt'); running=false; gameEnd(false,onWin,onLose,'呛水了！肺活量耗尽...'); return; }
      // 肺活量低于25%：每0.45秒一声低"嘟"警告，催玩家松手
      if(breath<=25 && Date.now()-lastWarn>450){ lastWarn=Date.now(); sfx('warn'); }
      bar.style.width=breath+'%'; val.textContent=breath|0;
    },50);
    _gameTimers.push(iv); // 注册进统一计时器：关窗/结束/异常时一并清理
  }
  function endHold(){
    if(token!==_breathSeq||!running||!holding) return;
    holding=false; clearInterval(iv); unlockScroll();
    status.textContent='松手！';
    const g=need[round];
    if(breath>=g){ sfx('reward'); pass++; toast(`第${round+1}关通过！`); round++; setGT(setupRound, 600); }
    else { sfx('miss'); running=false; gameEnd(false,onWin,onLose,`没憋够，只到${breath|0}%（需${g}%）`); }
  }
}

/* 游戏总入口 */
function runMiniGame(type, onWin, onLose){
  const map={shelf:gameShelf, sneak:gameSneak, memory:gameMemory, math:gameFindDiff, logic:gameLogic, match:gameMatch, pump:gamePump, breath:gameBreath};
  (map[type]||gameShelf)(onWin, onLose);
}

/* ---------- 丧尸战斗小游戏 ---------- */
// 根据天数决定丧尸种类和数量
function zombieCombatParams(){
  const day = state.day;
  const tier = zombieTier(day);
  const zt = ZOMBIE_TYPES[tier];
  // 数量随天数增加：1-45天5只 / 46-70天6只 / 71+天7只
  const need = day>=71?7 : day>=46?6 : 5;
  return {tier, zt, need};
}

// 随机选择战斗玩法（4种等概率）
function runZombieGame(loc, onWin, onLose){
  const games=[gameZombieClick, gameZombieRapid, gameZombieTrap, gameZombieBomb];
  games[Math.floor(Math.random()*games.length)](onWin, onLose);
}

/* 丧尸战1：点击击杀 —— 丧尸从上方落下，点中击杀，落到底部扣血 */
function gameZombieClick(onWin, onLose){
  const {zt, need} = zombieCombatParams();
  let kills=0, hp=100, time=30, running=true;
  showPopup(gameHeader(`🧟 击杀丧尸（${zt.n}）`,'点中丧尸击杀！让它落到底部会抓伤你。','zombie')+`
    <div style="display:flex;justify-content:space-between;font-size:13px;margin:6px 0">
      <span>⏱️ <b id="zc-time">30</b>s</span>
      <span>击杀 <b id="zc-kill">0</b>/${need}</span>
      <span>❤️ <b id="zc-hp">100</b></span>
    </div>
    <div id="zc-arena" style="position:relative;height:280px;background:var(--bg);border-radius:10px;overflow:hidden;border:2px solid var(--line)">
      <div id="zc-floor" style="position:absolute;bottom:0;left:0;right:0;height:6px;background:var(--alert);opacity:.5"></div>
    </div>
    <div class="hint">点击出现的丧尸！血量归零或超时则失败</div>`);
  const arena=$('zc-arena');
  const W = arena.clientWidth || 300;
  function spawn(){
    if(!running) return;
    const z=document.createElement('div');
    z.style.cssText=`position:absolute;font-size:36px;cursor:pointer;left:${Math.random()*(W-40)}px;top:-40px;transition:top .1s linear;user-select:none`;
    z.textContent=zt.e;
    let top=-40;
    // 每只丧尸随机三档下落速度（慢35%/普通40%/快25%），避免全都慢吞吞；基础速度随天数提升
    const baseFall = 1.8 + state.day*0.025; // px/50ms：第1天1.8、第50天3.05、第80天3.8
    const fallRoll = Math.random();
    const fallMult = fallRoll<0.35 ? 0.75 : fallRoll<0.75 ? 1.0 : 1.5;
    const speed = baseFall * fallMult;
    const iv=setInterval(()=>{
      if(!running){ clearInterval(iv); return; }
      top+=speed;
      z.style.top=top+'px';
      if(top>=240){ // 落到底部
        clearInterval(iv);
        z.remove();
        if(running){ sfx('hurt'); hp-=20; $('zc-hp').textContent=hp; flashArena(); if(hp<=0) end(false); }
      }
    },50);
    _gameTimers.push(iv); // 注册进统一计时器，gameEnd/异常关窗时一并清理
    z.onclick=()=>{
      if(!running) return;
      sfx('kill');
      clearInterval(iv);
      // 命中位置爆出一团火光
      const hit=document.createElement('span');
      hit.className='z-hit'; hit.textContent='💥';
      hit.style.left=z.style.left; hit.style.top=z.style.top;
      arena.appendChild(hit); setGT(()=>hit.remove(),250);
      z.remove();
      kills++; $('zc-kill').textContent=kills;
      if(kills>=need) end(true);
    };
    arena.appendChild(z);
  }
  function flashArena(){ arena.style.boxShadow='0 0 0 3px var(--alert) inset'; setTimeout(()=>{ if(arena) arena.style.boxShadow='none'; },150); }
  function end(win){
    if(!running) return;
    running=false; clearInterval(tickIv);
    gameEnd(win,onWin,onLose, win?`击杀全部 ${need} 只丧尸！`:`被丧尸抓伤，不得不撤退...`);
  }
  // 计时
  const tickIv=setInterval(()=>{
    if(!running){ clearInterval(tickIv); return; }
    time--; $('zc-time').textContent=time;
    if(time<=0) end(false);
  },1000);
  _gameTimers.push(tickIv);
  // 持续生成丧尸
  const spawnIv=setInterval(()=>{ if(running && kills<need) spawn(); }, 1200);
  _gameTimers.push(spawnIv);
  setGT(()=>spawn(), 100); // 第一只
}

/* 丧尸战2：狂点连打 —— 丧尸站在面前，疯狂点击场地把它打退，别让反扑槽蓄满（零门槛解压玩法） */
function gameZombieRapid(onWin, onLose){
  const {zt, need} = zombieCombatParams();
  let kills=0, hp=100, running=true;
  let zHp=100, rage=0;
  const TAP=14;          // 每拳伤害：约8拳打退一只
  const RAGE_INC=1.4;    // 反扑蓄力：约7秒蓄满，逼玩家持续输出
  const rageDmg=zt.dmg*15;
  showPopup(gameHeader(`👊 击退丧尸（${zt.n}）`,'疯狂点击场地击退丧尸！别让反扑槽蓄满！','zombie')+`
    <div style="display:flex;justify-content:space-between;font-size:13px;margin:6px 0">
      <span>击退 <b id="zr-kill">0</b>/${need}</span>
      <span>❤️ <b id="zr-hp">100</b></span>
    </div>
    <div id="zr-arena" style="position:relative;height:230px;background:var(--bg);border-radius:10px;overflow:hidden;border:2px solid var(--line);cursor:pointer;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent">
      <div style="position:absolute;top:8px;left:10px;right:10px">
        <div style="font-size:10px;color:var(--alert);margin-bottom:2px">丧尸体力</div>
        <div style="height:8px;background:#E2E7E4;border-radius:4px;overflow:hidden"><div id="zr-zhp" style="height:100%;width:100%;background:var(--alert);border-radius:4px"></div></div>
      </div>
      <div id="zr-z" style="position:absolute;left:50%;top:48%;transform:translate(-50%,-50%);font-size:72px;line-height:1;filter:drop-shadow(0 4px 4px rgba(0,0,0,.25))">${zt.e}</div>
      <div style="position:absolute;bottom:8px;left:10px;right:10px">
        <div style="font-size:10px;color:var(--warm);margin-bottom:2px">反扑蓄力 <span id="zr-warn"></span></div>
        <div style="height:8px;background:#E2E7E4;border-radius:4px;overflow:hidden"><div id="zr-rage" style="height:100%;width:0%;background:var(--warm);border-radius:4px"></div></div>
      </div>
    </div>
    <div class="hint">疯狂点击场地！打退 ${need} 只丧尸即胜利</div>`);
  const arena=$('zr-arena'), zEl=$('zr-z'), zBar=$('zr-zhp'), rageBar=$('zr-rage'), warn=$('zr-warn');
  // 命中飘字
  function floatText(x,y,txt,color){
    const f=document.createElement('span');
    f.textContent=txt;
    f.style.cssText=`position:absolute;left:${x}px;top:${y}px;color:${color};font-weight:bold;font-size:15px;pointer-events:none;z-index:5;text-shadow:0 1px 2px #fff;transition:transform .3s,opacity .3s`;
    arena.appendChild(f);
    requestAnimationFrame(()=>{ f.style.transform='translateY(-26px)'; f.style.opacity='0'; });
    setGT(()=>f.remove(), 320);
  }
  // 下一只丧尸：满血满槽、随机大小、弹跳入場
  function spawn(){
    zHp=100; rage=0;
    zBar.style.width='100%'; rageBar.style.width='0%'; warn.textContent='';
    zEl.textContent=zt.e;
    zEl.style.fontSize=(62+Math.random()*18)+'px';
    zEl.style.opacity='1';
    zEl.style.transition='transform .22s ease-out';
    zEl.style.transform='translate(-50%,-50%) scale(.5)';
    void zEl.offsetWidth;
    zEl.style.transform='translate(-50%,-50%) scale(1)';
  }
  function end(win){
    if(!running) return;
    running=false; clearInterval(iv);
    gameEnd(win,onWin,onLose, win?`打退了全部 ${need} 只丧尸！`:`被丧尸扑倒，不得不撤退...`);
  }
  // 点场地任意位置=挥拳命中（不要求点中丧尸，手机零门槛）
  arena.addEventListener('pointerdown', e=>{
    if(!running) return;
    e.preventDefault();
    const rect=arena.getBoundingClientRect();
    zHp-=TAP;
    zBar.style.width=Math.max(0,zHp)+'%';
    sfx('attack');
    // 丧尸被打得左右晃
    zEl.style.transition='transform .05s';
    zEl.style.transform=`translate(calc(-50% + ${(Math.random()*8-4).toFixed(0)}px),-50%) rotate(${(Math.random()*10-5).toFixed(0)}deg)`;
    setGT(()=>{ if(running){ zEl.style.transition='transform .12s'; zEl.style.transform='translate(-50%,-50%) rotate(0)'; } },70);
    floatText(e.clientX-rect.left-12, e.clientY-rect.top-10, '-'+TAP, 'var(--alert)');
    if(zHp<=0){
      sfx('kill');
      kills++; $('zr-kill').textContent=kills;
      zEl.style.transition='transform .3s,opacity .3s';
      zEl.style.transform='translate(-50%,-50%) scale(0) rotate(180deg)';
      zEl.style.opacity='0';
      floatText(arena.clientWidth/2-22, arena.clientHeight/2-24, '💥击倒', 'var(--warm)');
      if(kills>=need){ end(true); return; }
      setGT(spawn, 400);
    }
  });
  // 反扑槽：蓄满没打死就被抓
  const iv=setInterval(()=>{
    if(!running){ clearInterval(iv); return; }
    rage+=RAGE_INC;
    rageBar.style.width=Math.min(100,rage)+'%';
    if(rage>75){ if(warn) warn.textContent='⚠️要扑过来了，快打！'; }
    if(rage>=100){
      rage=0; if(rageBar) rageBar.style.width='0%'; if(warn) warn.textContent='';
      sfx('hurt');
      hp-=rageDmg; const hpm2=$('zr-hp'); if(hpm2) hpm2.textContent=hp;
      zEl.style.transition='transform .12s'; zEl.style.transform='translate(-50%,-50%) scale(1.25)';
      setGT(()=>{ if(running){ zEl.style.transform='translate(-50%,-50%) scale(1)'; } },180);
      arena.style.boxShadow='0 0 0 3px var(--alert) inset';
      setGT(()=>{ if(arena) arena.style.boxShadow='none'; },150);
      if(hp<=0) end(false);
    }
  },100);
  _gameTimers.push(iv);
  spawn();
}

/* 丧尸战3：捕兽夹布置 —— 3条通道，点击通道底部放捕兽夹，丧尸从随机通道走来，踩到即死（一夹一尸） */
function gameZombieTrap(onWin, onLose){
  clearGameTimers(); // 清理上一局殘留計時器
  const {zt, need} = zombieCombatParams();
  // 夹子数 = 需击杀数 + 1 缓冲（容错一次），迫使玩家预判通道选择
  const TRAPS = need + 1;
  let kills=0, traps=TRAPS, hp=100, time=30, running=true;
  const lanes=[false,false,false]; // 每条通道当前是否有夹子
  showPopup(gameHeader(`🪤 布夹阻击（${zt.n}）`,'点击通道底部放置捕兽夹，丧尸踩到即死！一夹只能夹一只。','zombie')+`
    <div style="display:flex;justify-content:space-between;font-size:13px;margin:6px 0">
      <span>⏱️ <b id="zt-time">30</b>s</span>
      <span>击杀 <b id="zt-kill">0</b>/${need}</span>
      <span>🪤 <b id="zt-trap">${TRAPS}</b>　❤️ <b id="zt-hp">100</b></span>
    </div>
    <div id="zt-arena" style="position:relative;height:300px;background:var(--bg);border-radius:10px;overflow:hidden;border:2px solid var(--line)">
      <div id="zt-floor" style="position:absolute;bottom:0;left:0;right:0;height:8px;background:var(--alert);opacity:.4"></div>
    </div>
    <div class="hint">点击通道底部放夹（共 ${TRAPS} 个），让丧尸落到底前被夹住</div>`);
  const arena=$('zt-arena');
  const W = arena.clientWidth || 300;
  const laneW = W/3;
  // 三条通道分隔线
  for(let i=1;i<3;i++){
    const line=document.createElement('div');
    line.style.cssText=`position:absolute;top:0;bottom:0;left:${i*laneW}px;width:1px;background:var(--line);opacity:.4`;
    arena.appendChild(line);
  }
  // 三条通道的放夹按钮（底部点击区）
  const slotBtns=[0,1,2].map(li=>{
    const b=document.createElement('button');
    b.style.cssText=`position:absolute;bottom:0;left:${li*laneW}px;width:${laneW}px;height:44px;background:transparent;border:none;border-top:2px dashed var(--soft);cursor:pointer;font-size:20px`;
    b.textContent=lanes[li]?'🪤':'';
    b.onclick=()=>placeTrap(li);
    arena.appendChild(b);
    return b;
  });
  function placeTrap(li){
    if(!running) return;
    if(lanes[li]){ toast('这里已经有夹子了'); return; }
    if(traps<=0){ sfx('miss'); toast('夹子用完了！'); return; }
    lanes[li]=true; traps--; $('zt-trap').textContent=traps;
    slotBtns[li].textContent='🪤';
    sfx('attack');
  }
  function flashArena(){ arena.style.boxShadow='0 0 0 3px var(--alert) inset'; setGT(()=>{ if(arena) arena.style.boxShadow='none'; },150); }
  function spawnZombie(){
    if(!running || kills>=need) return;
    const li=rnd(0,2);
    const z=document.createElement('div');
    z.style.cssText=`position:absolute;font-size:32px;left:${li*laneW+laneW/2-16}px;top:-36px;transition:top .1s linear;user-select:none;pointer-events:none`;
    z.textContent=zt.e;
    let top=-36;
    // 基础速度随天数提升
    const speed = 2.0 + state.day*0.02;
    const iv=setInterval(()=>{
      if(!running){ clearInterval(iv); return; }
      top+=speed;
      z.style.top=top+'px';
      if(top>=252){ // 到达底部
        clearInterval(iv);
        z.remove();
        if(lanes[li]){
          // 踩到夹子
          lanes[li]=false; slotBtns[li].textContent='';
          const hit=document.createElement('span');
          hit.className='z-hit'; hit.textContent='🪤';
          hit.style.left=(li*laneW+laneW/2-14)+'px'; hit.style.top='230px';
          arena.appendChild(hit); setGT(()=>hit.remove(),300);
          sfx('kill');
          kills++; const km=$('zt-kill'); if(km) km.textContent=kills;
          if(kills>=need) end(true);
        } else {
          // 没夹子，抓伤
          sfx('hurt'); hp-=zt.dmg*20; const hpm=$('zt-hp'); if(hpm) hpm.textContent=Math.max(0,hp); flashArena();
          if(hp<=0) end(false);
        }
      }
    },50);
    _gameTimers.push(iv);
    arena.appendChild(z);
  }
  function end(win){
    if(!running) return;
    running=false; clearInterval(tickIv); clearInterval(spawnIv);
    gameEnd(win,onWin,onLose, win?`夹住了全部 ${need} 只丧尸！`:`夹子用光，被丧尸突破...`);
  }
  const tickIv=setInterval(()=>{
    if(!running){ clearInterval(tickIv); return; }
    time--; const tm=$('zt-time'); if(tm) tm.textContent=time;
    if(time<=0) end(false);
  },1000);
  _gameTimers.push(tickIv);
  // 持续放丧尸，间隔随天数缩短
  const spawnInt = Math.max(700, 1400 - state.day*6);
  const spawnIv=setInterval(()=>{ if(running && kills<need) spawnZombie(); }, spawnInt);
  _gameTimers.push(spawnIv);
  setGT(spawnZombie, 200);
}

/* 丧尸战4：投掷燃烧瓶 —— 拖拽屏幕瞄准角度，松手投出，燃烧瓶走抛物线命中丧尸即烧死 */
function gameZombieBomb(onWin, onLose){
  clearGameTimers(); // 清理上一局殘留計時器
  const {zt, need} = zombieCombatParams();
  const BOTTLES = need + 1; // 容错一瓶
  let kills=0, bottles=BOTTLES, hp=100, running=true;
  let aiming=false, startX=0, startY=0, curX=0, curY=0;
  showPopup(gameHeader(`🔥 燃烧瓶（${zt.n}）`,'拖拽屏幕瞄准方向，松手投出燃烧瓶！投偏会炸伤自己。','zombie')+`
    <div style="display:flex;justify-content:space-between;font-size:13px;margin:6px 0">
      <span>击杀 <b id="zb-kill">0</b>/${need}</span>
      <span>🔥 <b id="zb-bot">${BOTTLES}</b>　❤️ <b id="zb-hp">100</b></span>
    </div>
    <div id="zb-arena" style="position:relative;height:280px;background:linear-gradient(180deg,#CFD8DC 0%,#B0BEC5 60%,#8D6E63 60%,#6D4C41 100%);border-radius:10px;overflow:hidden;border:2px solid var(--line);touch-action:none;user-select:none">
      <div id="zb-thrower" style="position:absolute;left:14px;bottom:18px;font-size:34px;line-height:1">🧑‍🏫</div>
      <div id="zb-zombie" style="position:absolute;font-size:48px;line-height:1;bottom:14px;transition:left .3s">${zt.e}</div>
      <div id="zb-aim" style="position:absolute;left:30px;bottom:42px;width:0;height:0;border-top:3px dashed var(--alert);transform-origin:left center;pointer-events:none;display:none"></div>
    </div>
    <div class="hint">从老师处向丧尸方向拖拽瞄准，松手投掷（共 ${BOTTLES} 瓶）</div>`);
  const arena=$('zb-arena'), zEl=$('zb-zombie'), aimEl=$('zb-aim');
  const A=arena.clientWidth||300, H=280;
  const throwerX=30, throwerY=H-42;
  function placeZombie(){
    // 右侧随机距离，难度越高越远
    const minX=Math.min(A*0.45, 150);
    zEl.style.left=(minX + Math.random()*(A-minX-60))+'px';
    zEl.style.fontSize=(44+Math.random()*10)+'px';
  }
  placeZombie();
  function throwBottle(dx, dy){
    if(bottles<=0){ end(false); return; } // 瓶子已用完且未达标 → 立即判负退出，不再卡死
    bottles--; $('zb-bot').textContent=bottles;
    sfx('attack');
    // 方向向量归一化，力度由拖拽距离决定（上限）
    const dist=Math.min(180, Math.hypot(dx,dy));
    const vx = dx/dist * 11;
    const vy = dy/dist * 11; // dy 为负(向上)才合理
    let x=throwerX, y=throwerY;
    const b=document.createElement('div');
    b.style.cssText=`position:absolute;font-size:24px;left:${x}px;top:${y}px;pointer-events:none`;
    b.textContent='🍾';
    arena.appendChild(b);
    let t=0;
    const fly=setInterval(()=>{
      if(!running){ clearInterval(fly); b.remove(); return; }
      t++;
      x += vx;
      y += vy + 0.6*t; // 重力
      b.style.left=x+'px'; b.style.top=y+'px';
      // 命中判定：燃烧瓶中心接近丧尸中心
      const zRect=zEl.getBoundingClientRect();
      const aRect=arena.getBoundingClientRect();
      const zx = zRect.left - aRect.left + zRect.width/2;
      const zy = zRect.top - aRect.top + zRect.height/2;
      if(Math.abs(x-zx)<26 && Math.abs(y-zy)<30){
        clearInterval(fly); b.remove();
        sfx('kill');
        const boom=document.createElement('span');
        boom.textContent='🔥'; boom.style.cssText=`position:absolute;left:${zx-14}px;top:${zy-14}px;font-size:32px`;
        arena.appendChild(boom); setGT(()=>boom.remove(),400);
        kills++; $('zb-kill').textContent=kills;
        if(kills>=need){ end(true); return; }
        // 命中但瓶子已空、还没杀完 → 判负退出，避免放新僵尸后卡死
        if(bottles<=0){ end(false); return; }
        setGT(placeZombie, 350);
        return;
      }
      // 落地/出界
      if(y>H-10 || x<0 || x>A){
        clearInterval(fly); b.remove();
        // 投偏：爆炸溅伤
        sfx('hurt');
        hp-=12; $('zb-hp').textContent=Math.max(0,hp);
        arena.style.boxShadow='0 0 0 3px var(--alert) inset';
        setGT(()=>{ if(arena) arena.style.boxShadow='none'; },150);
        if(hp<=0){ end(false); return; }
        if(bottles<=0 && kills<need){ end(false); return; }
      }
    },30);
    _gameTimers.push(fly);
  }
  function end(win){
    if(!running) return;
    running=false;
    gameEnd(win,onWin,onLose, win?`烧死了全部 ${need} 只丧尸！`:`燃烧瓶用完/受伤过重，撤退...`);
  }
  // 拖拽瞄准
  function getPos(e){
    const r=arena.getBoundingClientRect();
    const p=e.touches?e.touches[0]:e;
    return {x:p.clientX-r.left, y:p.clientY-r.top};
  }
  arena.addEventListener('pointerdown', e=>{
    if(!running) return;
    e.preventDefault();
    aiming=true;
    const p=getPos(e); startX=p.x; startY=p.y; curX=p.x; curY=p.y;
    aimEl.style.display='block';
  });
  arena.addEventListener('pointermove', e=>{
    if(!aiming||!running) return;
    e.preventDefault();
    const p=getPos(e); curX=p.x; curY=p.y;
    const dx=p.x-throwerX, dy=p.y-throwerY;
    const ang=Math.atan2(dy,dx)*180/Math.PI;
    const len=Math.min(160,Math.hypot(dx,dy));
    aimEl.style.width=len+'px';
    aimEl.style.transform=`rotate(${ang}deg)`;
  });
  function onUp(e){
    if(!aiming) return;
    aiming=false;
    aimEl.style.display='none';
    const dx=curX-throwerX, dy=curY-throwerY;
    if(dy>=-5){ sfx('miss'); return; } // 必须向上投
    throwBottle(dx, dy);
  }
  arena.addEventListener('pointerup', onUp);
  arena.addEventListener('pointercancel', onUp);
}

function doAction(act){
  if(act==='out') return actOut();
  if(act==='gohome') return actGoHome();
  if(act==='care') return actCare();
  if(act==='fortify') return actFortify();
  if(act==='garden') return actGarden();
  if(act==='night') return actNight();
}

// 主动结束今天的外出：跳过剩余白天时段直接入夜，并给出入夜观察预警
function actGoHome(){
  if(state.slot >= NIGHT_SLOT) return;
  state.slot = NIGHT_SLOT;
  saveState();
  render();
  showNightWarning();
}

/* ---------- 加固：点位升级 + 设备制作/布防 ---------- */
function actFortify(){
  const defTotal = calcDefense();
  // 6个点位卡片：大图标 + 等级徽章 + 防御进度条 + 设备行 + 升级按钮
  const spotCards = SPOTS.map(s=>{
    const lv = state.fort[s.k], def = spotDefense(s.k);
    const isMax = lv >= 5;
    const isBroken = lv < 0;
    // 破损前等级：优先取 fortBase 记录，旧档无记录兜底回 Lv0
    const baseLv = Math.max(0, Math.min(5, (state.fortBase && typeof state.fortBase[s.k]==='number') ? state.fortBase[s.k] : 0));
    const cost = isBroken ? repairCost(s.k, lv, baseLv) : (isMax ? null : FORT_COST[s.k][lv]);
    const can = cost ? canAfford(cost) : false;
    // 防御数字颜色：Lv0 红、Lv1-2 橙、Lv3+ 绿、破损红（靠数字颜色区分强弱）
    const defColor = isBroken ? '#E74C3C' : lv>=3 ? '#27AE60' : lv>=1 ? '#E67E22' : '#E74C3C';
    // 已放置设备图标：按数量重复显示（无数字），每个可点击移除一件
    const placedHtml = Object.entries(state.placed[s.k]||{}).filter(([k,v])=>v>0).map(([k,v])=>
      Array(v).fill(`<span class="placed-icon" data-unplace="${s.k}:${k}">${EQUIPMENT[k].e}</span>`).join('')
    ).join('') || '<span class="no-placed">未布防</span>';
    const upLabel = isBroken ? '🔨修复至 Lv'+baseLv : (isMax ? '已满级' : '⬆️升至 Lv'+(lv+1));
    // 材料行：紧凑「拥有/需要」单排显示（拥有够=绿，不够=灰，需要=红）
    const costHtml = cost ? Object.entries(cost).map(([k,v])=>{
      const have = state.inv[k]||0, e = (ITEM_INFO[k]||{}).e || '';
      const haveColor = have>=v ? '#2E7D32' : '#999';
      return `<span title="${(ITEM_INFO[k]||{}).n||k}：你有 ${have}，需要 ${v}">${e}<b style="color:${haveColor}">${have}</b><small style="color:#bbb">/</small><b style="color:#E74C3C">${v}</b></span>`;
    }).join('') : '';
    // 丧尸威胁提示：根据当前天数可能出现的丧尸类型，标注该点位是否被针对
    const day = state.day;
    const threats = [];
    const doorSpots = ['door','win','back'];
    if(day>=21) threats.push({zt:ZOMBIE_TYPES.T2, hit:doorSpots.includes(s.k)});
    if(day>=46) threats.push({zt:ZOMBIE_TYPES.T3, hit:true}); // 随机攻击=全点位
    if(day>=71) threats.push({zt:ZOMBIE_TYPES.T4, hit:true}); // 攻击最弱=全点位都有风险
    const threatHtml = threats.length
      ? `<div class="fc-threat">${threats.map(t=>`<span style="color:${t.hit?'#E74C3C':'#8a7a60'}">${t.zt.e}${t.zt.n}${t.hit?'⚡':''}</span>`).join(' ')}</div>`
      : '';
    // 5 格装甲刻度（绿色）；破损态改为警告文字
    const lvMeter = isBroken
      ? `<div class="fc-warn">⚠ ${lv===-1?'破损':'崩塌'}，夜袭会失守！</div>`
      : `<div class="fc-pips">${[0,1,2,3,4].map(p=>`<i class="${p<lv?'on':''}"></i>`).join('')}</div>`;
    const lvLabel = isBroken ? '破损' : 'Lv'+Math.max(0,lv);
    return `<div class="fort-card${isBroken?' fc-broken':''}${isMax?' fc-max':''}">
      <div class="fc-head">
        <div class="fc-ico">${s.e}</div>
        <div class="fc-id">
          <span class="fc-name">${s.n}</span><span class="fc-lvtext">${lvLabel}</span>
        </div>
        <span class="fc-defbadge" style="color:${defColor}">🛡️<b>${def}</b></span>
      </div>
      ${lvMeter}
      ${threatHtml}
      <div class="fc-foot">
        ${isBroken
          ? `<button class="fc-up" data-repair="${s.k}" style="border-color:#E74C3C;color:#C0392B">${upLabel}</button>`
          : (cost ? `<button class="fc-up" data-fort="${s.k}" ${can?'':'disabled'}>${upLabel}</button>` : '<button class="fc-up" disabled>已满级</button>')}
        <div class="fc-cost">${costHtml}</div>
      </div>
      <div class="fc-equip">
        <div class="fc-placed">${placedHtml}</div>
        <button class="fc-gear" data-place="${s.k}" title="布防设备">⚙️布防</button>
      </div>
    </div>`;
  }).join('');
  // 设备制作 / 晶核项链制作收进二级页面，缩短加固主列表
  const coreN = state.inv.core || 0;
  // 我的库存快查条：加固会用到的材料一览（玩家常问「我到底有几个电池」）
  const MAT_KEYS = ['mat','wire','part','bat','steel','chip','glass','alloy'];
  const stockBar = `<div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;margin:0 0 8px">`
    + MAT_KEYS.map(k=>`<span style="font-size:10.5px;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:2px 6px;color:${(state.inv[k]||0)>0?'#2E7D32':'#999'}">${(ITEM_INFO[k]||{}).e||''}${state.inv[k]||0}</span>`).join('')
    + `</div>`;
  showPopup(`
    <h3>🔧 加固防御</h3>
    <div style="text-align:center;font-size:13px;margin-bottom:6px">🛡️ 总防御度 <b style="color:var(--accent)">${defTotal}/${MAX_DEFENSE}</b></div>
    ${stockBar}
    <div class="fort-grid">${spotCards}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;grid-gap:8px;gap:8px;margin-top:10px">
      <button id="pp-make-dev" style="${state.foundCore?'':'grid-column:1/-1;'}min-height:48px;border:1.5px solid var(--accent);background:var(--card);color:var(--ink);border-radius:12px;font-size:13px;cursor:pointer">🛠️ 制作防御设备</button>
      ${state.foundCore ? `<button id="pp-make-pendant" style="min-height:48px;border:1.5px solid #BA68C8;background:var(--card);color:#7B1FA2;border-radius:12px;font-size:13px;cursor:pointer">📿 制作晶核项链</button>` : ''}
    </div>
    <div class="hint">材料显示为「拥有 / 需要」；升级/制作消耗体力，布防不消耗</div>
    <div class="btns"><button id="pp-cancel" class="primary">返回</button></div>
  `);
  // 二级页面入口
  const btnDev = $('pp-make-dev'); if(btnDev) btnDev.onclick = openDevMakeMenu;
  const btnPendant = $('pp-make-pendant'); if(btnPendant) btnPendant.onclick = openPendantMenu;
  wireCare();
}

// 二级页面：制作防御设备（从加固页进入，做好后在点位卡 ⚙️ 布防）
function openDevMakeMenu(){
  // 全部设备都列出：没图纸的标「图纸未获得」并写明来源；材料/体力不足也直接标原因
  const devRows = Object.entries(EQUIPMENT).map(([k,e])=>{
    const have = state.devices[k] || 0;
    const locked = !!e.bp && !state.blueprints.includes(e.bp);
    const can = canAfford(e.cost);
    const staOk = state.teacher.sta >= 5;
    let reason = '';
    if(locked) reason = '🔒 图纸未获得 · 去中学找到新的设备图纸（搜刮首次必得，之后有概率再出）';
    else if(!can) reason = '材料不足：缺 ' + lackText(e.cost);
    else if(!staOk) reason = '体力不足（制作需 5 点体力）';
    return `<div class="fort-row"${locked?' style="opacity:.72"':''}>
      <div class="f-info">
        ${e.e} <b>${e.n}</b>
        <small class="dev-stock">库存×${have}</small>
        <span class="dev-desc">${e.desc}</span>
        <span class="cost-line">${costText(e.cost)}</span>
        ${reason?`<span style="display:block;font-size:10.5px;color:#E74C3C;margin-top:3px">${reason}</span>`:''}
      </div>
      <button data-dev="${k}"${locked?' style="border-color:#ccc;color:#999"':''}>制作</button>
    </div>`;
  }).join('');
  showPopup(`
    <h3>🛠️ 制作防御设备</h3>
    <div style="font-size:11.5px;color:var(--soft);text-align:center;margin-bottom:8px">🔒 图纸未获得？去中学搜刮，首次必得、之后有概率再出</div>
    <div>${devRows}</div>
    <div class="hint">制作消耗体力 -5；按钮可点，点了会告诉你能不能做、缺什么</div>
    <div class="btns"><button id="pp-back" class="primary">返回加固</button></div>
  `);
  $('pp-back').onclick = actFortify;
  document.querySelectorAll('[data-dev]').forEach(b=>{
    b.onclick = ()=>{
      const k = b.dataset.dev, e = EQUIPMENT[k];
      if(e.bp && !state.blueprints.includes(e.bp)){ toast('🔒 图纸未获得：去中学找到新的设备图纸'); return; }
      if(!canAfford(e.cost)){ toast('材料不足：缺 '+lackText(e.cost)); return; }
      if(state.teacher.sta < 5){ toast('体力不足（制作需 5 点体力），先休息一下'); return; }
      payCost(e.cost);
      state.devices[k] = (state.devices[k]||0)+1;
      if(anySkill('灵感') && Math.random()<0.25){ toast('💡 '+skillTag('灵感')+'：灵机一动，制作没耗体力！'); }
      else { state.teacher.sta = clamp(state.teacher.sta-5, 0, 100); }
      saveState();
      toast(`制作了 ${e.e} ${e.n}！`);
      openDevMakeMenu(); // 留在制作列表
    };
  });
}

// 二级页面：晶核项链（捡到第一颗晶核后才解锁，逻辑层兜底）
function openPendantMenu(){
  if(!state.foundCore) return;
  // 只显示已解锁可见的阶（pendantUnlock 以内）；做出上一阶才会显示下一阶
  const pendantRows = CORE_PENDANTS.filter(p=>p && p.lv <= state.pendantUnlock).map(p=>{
    const have = state.corePendants[p.lv] || 0;
    const can = canAfford(p.cost);
    const refund = Object.keys(p.cost).map(m=>`${(ITEM_INFO[m]&&ITEM_INFO[m].e)||'📦'}×${Math.floor(p.cost[m]/2)}`).join(' ');
    return `<div class="pend-card">
      <div class="pend-head">
        <span class="pend-ico">${p.e}</span>
        <b>${p.n}</b>
        <small class="pend-stock">库存×${have}</small>
      </div>
      <div class="pend-btns">
        <button data-pendant="${p.lv}" ${can?'':'disabled'}>制作</button>
        <button data-unmake="${p.lv}" ${have>0?'':'disabled'} title="分解退回：${refund}">分解</button>
      </div>
      <div class="pend-cost">${costText(p.cost)}</div>
    </div>`;
  }).join('');
  const lockedHint = state.pendantUnlock < 4
    ? `<div style="font-size:11px;color:var(--soft);text-align:center;margin:6px 0">🔒 做出「${CORE_PENDANTS[state.pendantUnlock].n}」后解锁下一阶</div>`
    : '';
  showPopup(`
    <h3>📿 晶核项链</h3>
    <div style="font-size:11.5px;color:var(--soft);text-align:center;margin-bottom:8px">💎 目前持有晶核 <b style="color:#7B1FA2">${state.inv.core||0}</b> 颗 ·<br>多余项链可「分解」退回一半材料。<br>在「照顾」界面给孩子佩戴以激发技能。</div>
    <div>${pendantRows}</div>
    ${lockedHint}
    <div class="hint">制作消耗体力 -5</div>
    <div class="btns"><button id="pp-back" class="primary">返回加固</button></div>
  `);
  $('pp-back').onclick = actFortify;
  document.querySelectorAll('[data-pendant]').forEach(b=>{
    b.onclick = ()=>{
      const lv = +b.dataset.pendant, p = CORE_PENDANTS[lv];
      payCost(p.cost);
      state.corePendants[lv] = (state.corePendants[lv]||0)+1;
      // 做出本阶后，解锁下一阶的可见性（不超过4阶；只增不减）
      state.pendantUnlock = Math.min(4, Math.max(state.pendantUnlock, lv+1));
      state.teacher.sta = clamp(state.teacher.sta-5, 0, 100);
      saveState();
      toast(`制作了 ${p.e} ${p.n}！去照顾界面给孩子佩戴`);
      openPendantMenu(); // 留在制作列表（下一阶会自动出现）
    };
  });
  document.querySelectorAll('[data-unmake]').forEach(b=>{
    b.onclick = ()=>{
      const lv = +b.dataset.unmake, p = CORE_PENDANTS[lv];
      if((state.corePendants[lv]||0)<=0){ toast('没有可分解的项链'); return; }
      state.corePendants[lv] -= 1;
      // 退回一半材料（每项向下取整，≤0 的不退）
      const back=[];
      Object.keys(p.cost).forEach(m=>{ const n=Math.floor(p.cost[m]/2); if(n>0){ state.inv[m]=(state.inv[m]||0)+n; back.push(`${(ITEM_INFO[m]&&ITEM_INFO[m].e)||'📦'}×${n}`); } });
      saveState();
      toast(`分解了 ${p.n}，退回 ${back.join(' ')||'材料'}（减半）`);
      openPendantMenu();
    };
  });
}

/* ---------- 天台菜园：开垦/播种/收获 ---------- */
const GARDEN_COST = [null,{mat:4},{mat:6,part:3},{wire:4,part:6},{alloy:2,steel:2},{alloy:4,chip:3}];
const CROP_NEED = {veg:3, herb:5, tree:3};      // 作物成熟天数（唯一数据源：生长/收获/浇水/UI 文案都读这里）
function actGarden(){
  if(!state.gardenManual){
    showPopup(`<h3>🌱 天台菜园</h3><div class="story">天台的风很大，几个空花箱歪歪斜斜地摆在那儿。<br>你完全不懂种植——也许<b>公园的园艺角</b>能找到一本手册？</div><div class="hint">去公园植物园搜刮，有机会捡到「园艺手册」</div><div class="btns"><button id="pp-cancel" class="primary">知道了</button></div>`);
    const cancelBtn = $('pp-cancel'); if(cancelBtn) cancelBtn.onclick = closePopup; return;
  }
  if(!state.garden){ state.garden = {plots:[null,null,null,null,null,null], unlocked:1}; }
  const g = state.garden, seedN = state.inv.seed||0, treeSeedN = state.inv.treeSeed||0, herbN = state.inv.herb||0;
  const CROP_E = {veg:'🥬', herb:'🌿', tree:'🌳'};
  const CROP_SEED = {veg:'seed', herb:'herb', tree:'treeSeed'}; // 播种消耗（蔬菜=🌱种子 / 小树=🌰树种 / 草药=🌿药草）
  const CROP_NAME = {veg:'🥬蔬菜', herb:'🌿草药', tree:'🌳小树'};
  // 单个泡沫箱：locked 未开垦 / empty 空箱 / growing 生长中 / mature 成熟
  const tiles = g.plots.map((p,i)=>{
    const no = `<span class="gd-no">${i+1}</span>`;
    // 未开垦：灰色空泡沫箱，整块点击开垦（材料不足则不可点）
    if(i >= g.unlocked){
      const c = GARDEN_COST[i], can = canAfford(c);
      return `<div class="gd-tile locked${can?'':' cant'}" ${can?`data-unlock="${i}"`:''}>
        ${no}<span class="gd-lockico">🔒</span>
        <span class="gd-lockcost">${costText(c)}</span>
      </div>`;
    }
    // 空箱：点整格 → 弹出选种浮层
    if(!p){
      return `<div class="gd-tile empty" data-sow="${i}">
        ${no}<div class="gd-soil"><span class="gd-plus">＋</span></div>
      </div>`;
    }
    const need = CROP_NEED[p.c] || CROP_NEED.herb, left = Math.max(0, p.d + need - state.day);
    // 成熟：箱口金边呼吸 + 跳动的作物，点击收获（不显示文字）
    if(left <= 0){
      return `<div class="gd-tile mature" data-harvest="${i}">
        ${no}<div class="gd-soil"><span class="gd-crop">${CROP_E[p.c]}</span></div>
      </div>`;
    }
    // 生长中：幼苗阶段（🌱→🪴→作物）+ 箱体下缘极简「N天」小标；浇过水的箱子右上💧角标、不可再浇
    const grown = state.day - p.d, prog = grown/need;
    const stageE = prog < 0.34 ? '🌱' : prog < 0.67 ? '🪴' : CROP_E[p.c];
    const waterAttr = p.watered ? '' : ` data-water="${i}"`;
    return `<div class="gd-tile growing"${waterAttr}>
      ${no}${p.watered?'<span class="gd-watered">💧</span>':''}<div class="gd-soil"><span class="gd-crop" style="${prog>=0.67?'opacity:.78':''}">${stageE}</span></div>
      <span class="gd-days">${left}天</span>
    </div>`;
  }).join('');
  const waterN = state.inv.water||0;
  showPopup(`<h3>🌱 天台菜园</h3>
    <div style="font-size:12px;color:var(--soft);text-align:center;margin-bottom:8px">🫘 蔬菜种子×${seedN} · 🌰 树种×${treeSeedN} · 🌿 药草×${herbN} · 💧 水×${waterN}<br><span style="color:var(--alert)">🐦 夜里可能有乌鸦，天台需要布防🕸️防鸟网</span></div>
    <div class="gd-grid">${tiles}</div>
    <div class="hint">每株植物可使用1次💧水加速成长1天</div>
    <div class="btns"><button id="pp-cancel">返回</button></div>`);
  // 未开垦 → 点击直接开垦
  document.querySelectorAll('[data-unlock]').forEach(b=>{ b.onclick = ()=>{ const i=+b.dataset.unlock,c=GARDEN_COST[i]; if(!canAfford(c)){toast('材料不够');return;} payCost(c); state.garden.unlocked=Math.max(state.garden.unlocked,i+1); saveState(); toast(`第${i+1}块地开垦好了！`); actGarden(); }; });
  // 空地 → 半透明浮层选种（蔬菜消耗🌱种子 / 草药消耗🌿药草苗，二者不能混用）
  document.querySelectorAll('[data-sow]').forEach(t=>{
    t.onclick = ()=>{
      const i = +t.dataset.sow;
      if(seedN<=0 && herbN<=0 && treeSeedN<=0){ toast('种子和药草都没有，去外出搜刮吧'); return; }
      const overlay = document.createElement('div');
      overlay.className = 'ck-overlay';
      overlay.innerHTML = `<div class="ck-overlay-panel">
        <h4>第${i+1}个箱子 · 种点什么？</h4>
        <div class="op-grid">
          <button data-plant="${i}:veg" ${seedN<=0?'disabled':''}>🥬 蔬菜<br><small>耗🌱种子×1 · ${CROP_NEED.veg}天收🥬×2${seedN<=0?' · 没有种子':''}</small></button>
          <button data-plant="${i}:herb" ${herbN<=0?'disabled':''}>🌿 草药<br><small>耗🌿药草×1 · ${CROP_NEED.herb}天收🌿×2${herbN<=0?' · 没有药草':''}</small></button>
          <button data-plant="${i}:tree" ${treeSeedN<=0?'disabled':''}>🌳 小树<br><small>耗🌰树种×1 · ${CROP_NEED.tree}天收🪵×4${treeSeedN<=0?' · 没有树种':''}</small></button>
        </div>
        <button class="ck-close">取消</button>
      </div>`;
      document.getElementById('popup').appendChild(overlay);
      const close = ()=>{ if(overlay.parentNode) overlay.parentNode.removeChild(overlay); };
      overlay.querySelectorAll('[data-plant]').forEach(b=>b.onclick=()=>{
        if(b.disabled) return;
        const parts=b.dataset.plant.split(':'), idx=+parts[0], crop=parts[1];
        // 各作物扣各自的种苗：蔬菜=🌱种子，小树=🌰树种，草药=🌿药草苗
        const sk = CROP_SEED[crop];
        if((state.inv[sk]||0)<=0){ toast(`没有${ITEM_INFO[sk].n}可作种苗`); return; }
        state.inv[sk]--;
        close();
        state.garden.plots[idx]={c:crop,d:state.day}; saveState();
        toast(`种下了${CROP_NAME[crop]}（消耗${ITEM_INFO[sk].e}${ITEM_INFO[sk].n}×1）`); actGarden();
      });
      overlay.querySelector('.ck-close').onclick = close;
      overlay.addEventListener('click', e=>{ if(e.target===overlay) close(); });
    };
  });
  // 成熟 → 点击收获（ready 为夜间结算打的成熟标记，同样可收）
  document.querySelectorAll('[data-harvest]').forEach(b=>{ b.onclick = ()=>{ const i=+b.dataset.harvest,p=state.garden.plots[i]; if(!p)return; const need=CROP_NEED[p.c]||5; if(state.day<p.d+need && !p.ready){toast('还没熟');return;} if(p.c==='veg'){state.inv.food.veg=(state.inv.food.veg||0)+2;toast('收获 🥬蔬菜×2！');} else if(p.c==='herb'){state.inv.herb=(state.inv.herb||0)+2;toast('收获 🌿草药×2！');} else {state.inv.mat=(state.inv.mat||0)+4;toast('收获 🪵材料×4！');} state.garden.plots[i]=null; saveState(); actGarden(); }; });
  // 生长中且未浇水 → 点整格浇水：耗💧水×1，播种日前移1天=提前1天成熟（每株限1次；剩1天时浇完当场成熟可收）
  document.querySelectorAll('[data-water]').forEach(t=>{ t.onclick = ()=>{
    const i = +t.dataset.water, p = state.garden.plots[i];
    if(!p || p.watered) return;
    if((state.inv.water||0) <= 0){ toast('没有水了，去游泳馆找找'); return; }
    state.inv.water--; p.d--; p.watered = true;
    const need = CROP_NEED[p.c] || CROP_NEED.herb;
    const ripe = state.day >= p.d + need;
    saveState();
    toast(ripe ? `💧浇足了水，${CROP_NAME[p.c]}当场就能收了！` : '💧浇了水，作物提前1天成熟');
    actGarden();
  };});
  const cancelBtn = $('pp-cancel'); if(cancelBtn) cancelBtn.onclick = closePopup;
}

// 外出：选地点 -> 挑战小游戏 -> 成功挑2件物资 / 失败扣健康并引来丧尸
function actOut(){
  // 第5节起外出前明确风险提示：物资与回不来的风险由玩家自己权衡
  const nth = state.outCount + 1;
  const riskBanner = nth >= LATE_FROM
    ? `<div style="font-size:11px;color:var(--alert);text-align:center;margin-bottom:8px;background:rgba(192,57,43,.08);border:1px solid rgba(192,57,43,.25);border-radius:8px;padding:6px 8px">
       ⚠️ 这是今天第 ${nth} 节外出，天色渐晚、丧尸开始活跃。<br>再出这趟门，未必回得来——要继续这一趟，还是回家守夜？
       </div>`
    : `<div style="font-size:11px;color:var(--soft);text-align:center;margin-bottom:8px">每个地点都有挑战，成功可挑2件物资带走</div>`;
  showPopup(`<h3>🚶 选择目的地</h3>
    ${riskBanner}
    <div style="display:grid;grid-template-columns:1fr 1fr;grid-gap:8px;gap:8px" id="loc-list"></div>
    <div class="btns" style="margin-top:8px"><button id="loc-cancel">返回</button></div>`);
  $('loc-cancel').onclick = closePopup;
  const list = $('loc-list');
  LOCATIONS.forEach(loc=>{
    const card = document.createElement('div');
    card.style.cssText = 'background:var(--bg);border:1px solid var(--line);border-radius:10px;overflow:hidden;cursor:pointer';
    card.innerHTML = `<img src="${loc.scene}" style="width:100%;display:block;height:64px;object-fit:cover">
      <div style="padding:6px 8px;font-size:13px"><b>${loc.e} ${loc.n}</b></div>`;
    card.onclick = ()=>enterLocation(loc);
    list.appendChild(card);
  });
}

function enterLocation(loc){
  const st = LOC_STORIES[loc.k] || {};
  const enterTxt = st.enter ? pick(st.enter) : loc.desc;
  // 30% 概率遭遇丧尸战，70% 原解谜小游戏
  const isZombie = Math.random() < 0.3;
  const hint = isZombie
    ? '⚠️ 你听见了低吼——这里有丧尸！击败它们才能搜刮物资。'
    : '挑战成功可挑 2 件物资；失败会扣健康并吸引丧尸注意';
  showPopup(`<h3>${loc.e} ${loc.n}</h3>
    <img src="${loc.scene}" style="width:100%;border-radius:10px;margin:6px 0">
    <div class="story" style="font-size:13px">${enterTxt}</div>
    <div class="hint" style="${isZombie?'color:var(--alert)':''}">${hint}</div>
    <div class="btns"><button class="primary" id="loc-start">${isZombie?'迎战':'开始挑战'}</button><button id="loc-back">离开</button></div>`);
  $('loc-back').onclick = ()=>actOut();
  $('loc-start').onclick = ()=>{
    if(isZombie){
      // 丧尸遭遇叙事
      const zTxt = st.zombie ? pick(st.zombie) : '丧尸扑了过来！';
      showPopup(`<h3>🧟 遭遇丧尸！</h3>
        <div class="story" style="font-size:13px">${zTxt}</div>
        <div class="hint">击杀所有丧尸才能搜刮物资；被抓伤会损失健康</div>
        <div class="btns"><button class="primary" id="z-start">战斗！</button></div>`);
      $('z-start').onclick = ()=>runZombieGame(loc,
        ()=>onZombieWin(loc),
        ()=>onChallengeLose(loc));
    } else {
      runMiniGame(loc.game,
        ()=>onChallengeWin(loc),
        ()=>onChallengeLose(loc));
    }
  };
}

// 挑战成功：战利品选择（5件里挑2件；跑腿能手减体力/观察力加线索）
function onChallengeWin(loc){
  let staCost = 10; // 6节外出节奏：单次外出-10体力
  const runErrand = anySkill('跑腿能手');
  if(runErrand){ staCost -= 2; } // 小乐：外出体力-2
  const knowWay = anySkill('认路');
  const staOut = weatherFX().staOut||0;
  if(staOut>0 && !knowWay){ staCost += staOut; } // 雾/雨更耗体力（认路可免）
  state.teacher.sta = clamp(state.teacher.sta-staCost, 0, 100);
  state.outCount++;
  // 高级材料解锁：day<31 只掉基础材料；day≥31 解锁 steel/chip/glass/alloy
  const ADV = ['steel','chip','glass','alloy'];
  let availableLoot = loc.loot.filter(it => state.day < 31 ? !ADV.includes(it) : true);
  // 冷静分析：day≥31 时保证候选里至少有 1 件高级材料
  if(anySkill('冷静分析') && state.day>=31){
    const advHas = ADV.filter(a=>loc.loot.includes(a));
    if(advHas.length && !availableLoot.some(x=>ADV.includes(x))){ availableLoot.push(advHas[Math.floor(Math.random()*advHas.length)]); }
  }
  let poolSize = 5;
  if(anySkill('观察力')){ poolSize = 6; } // 小念：多1件线索
  while (availableLoot.length < poolSize) availableLoot.push('mat'); // 兜底到 poolSize，否则观察力+1格会缺料
  const takeCount = anySkill('一眼看中') ? 3 : 2; // 小念：多带1件
  const pool = availableLoot.slice().sort(()=>Math.random()-0.5).slice(0, poolSize);
  applyChanceLoot(pool, loc); // 地点特色概率掉落（如公园40%出🌰树种）
  let picked = [];
  function renderLoot(){
    const lootHint = (anySkill('观察力')?'<div style="font-size:11px;color:var(--accent2);text-align:center;margin-bottom:4px">🧠 '+skillTag('观察力')+'：候选 5→'+poolSize+' 格（只多 1 件可选，不增加带走件数）</div>':'')
      + (anySkill('一眼看中')?'<div style="font-size:11px;color:var(--accent2);text-align:center;margin-bottom:4px">👁️ '+skillTag('一眼看中')+'：可多带 1 件（共'+takeCount+'件）</div>':'');
    showPopup(`<h3>✓ 挑战成功！挑选 ${takeCount} 件带走</h3>
      ${lootHint}
      <div style="font-size:12px;color:var(--soft);text-align:center;margin-bottom:8px">已选 <b id="lp-cnt">0</b>/${takeCount}　点物品选择/取消</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;grid-gap:6px;gap:6px" id="lp-grid">
        ${pool.map((k,i)=>{
          const info=ITEM_INFO[k];
          const sel = picked.includes(i);
          return `<button data-i="${i}" class="lp-item" style="min-height:52px;background:${sel?'#DDE4E1':'#fff'};border:1.5px solid ${sel?'var(--accent)':'var(--line)'};border-radius:10px;font-size:14px;cursor:pointer">
            ${info.e} ${info.n}${sel?' ✓':''}</button>`;
        }).join('')}
      </div>
      <div class="btns" style="margin-top:8px"><button class="primary" id="lp-take" ${picked.length!==takeCount?'disabled':''}>带走选中物资</button></div>`);
    $('lp-cnt').textContent = picked.length;
    document.querySelectorAll('.lp-item').forEach(b=>{
      b.onclick = ()=>{
        const i=+b.dataset.i;
        if(picked.includes(i)){ picked = picked.filter(x=>x!==i); }
        else { if(picked.length>=takeCount){ toast('最多挑'+takeCount+'件'); return; } picked.push(i); }
        renderLoot();
      };
    });
    $('lp-take').onclick = ()=>{
      if(picked.length!==takeCount) return;
      picked.forEach(i=>addItem(pool[i]));
      // 细心收拾：25% 概率多 1 件基础材料
      let tidyMsg = '';
      if(anySkill('细心收拾') && Math.random()<0.25){ addItem('mat'); tidyMsg = '<div class="story" style="text-align:center;color:var(--accent2)">🎒 '+skillTag('细心收拾')+'：多收拾了 1 份🪵材料</div>'; }
      // 特殊掉落
      let bpMsg='';
      if(loc.special==='blueprint'){
        const got = grantBlueprint();
        if(got) bpMsg = `<div class="story" style="text-align:center;color:var(--warm)">📜 你在抽屉里发现了一张图纸：<b>${BLUEPRINT_INFO[got].e} ${BLUEPRINT_INFO[got].n}</b>！${anySkill('过目不忘')?'<br><span style="color:var(--accent2)">📖'+skillTag('过目不忘')+'</span>':''}</div>`;
      } else if(loc.special==='garden_manual'){
        state.gardenTries = (state.gardenTries||0)+1;
        if(!state.gardenManual){
          const got = state.gardenTries >= 11 || Math.random() < 0.25;
          if(got){ state.gardenManual = true; bpMsg = `<div class="story" style="text-align:center;color:var(--accent2)">📗 捡到<b>园艺手册</b>！点「🌱菜园」开垦天台。</div>`; }
        }
      }
      // 装饰物品掉落：该地点特色装饰，须达到对应天数阶段才出现，20%概率（每件全游戏唯一）
      const decorPool = Object.entries(DECOR_ITEMS).filter(([k,v])=>v.loc===loc.k && state.day>=v.minDay && !state.decor.includes(k));
      let decorMsg = '';
      if(decorPool.length>0 && Math.random()<0.20){
        const [dk, dv] = decorPool[Math.floor(Math.random()*decorPool.length)];
        state.decor.push(dk);
        decorMsg = `<div class="story" style="text-align:center;color:var(--accent2)">${dv.e} 你还捡到了一个<b>${dv.n}</b>！可以放在教室装饰架上。</div>`;
      }
      const names = picked.map(i=>ITEM_INFO[pool[i]].e+ITEM_INFO[pool[i]].n).join('、');
      // 物资名逐个弹跳出现（错开半拍，像真的被放进背包）
      const namesHtml = picked.map((i,idx)=>`<span class="item-pop" style="display:inline-block;animation-delay:${(idx*0.12+0.08).toFixed(2)}s">${ITEM_INFO[pool[i]].e}${ITEM_INFO[pool[i]].n}</span>`).join('、');
      const winTxt = (LOC_STORIES[loc.k]&&LOC_STORIES[loc.k].win) ? pick(LOC_STORIES[loc.k].win) : '';
      const outStory = Math.random() < 0.6 ? pick(OUT_STORIES) : '';
      saveState();
      sfx('reward');
      showPopup(`<h3>🎉 搜刮完成</h3>
        <div class="story" style="text-align:center">${winTxt}</div>
        ${outStory?`<div class="story">${outStory}</div>`:''}
        <div class="story" style="text-align:center">带回了：<b>${namesHtml}</b></div>
        ${bpMsg}
        ${decorMsg}
        ${tidyMsg}
        <div class="hint">体力 -${staCost}${runErrand?'（💨'+skillTag('跑腿能手')+' 省 2）':''}${knowWay&&staOut>0?'（🗺️'+skillTag('认路')+' 免天气体力）':''}</div>
        <div class="btns"><button class="primary" id="lp-done">回幼儿园</button></div>`);
      $('lp-done').onclick = ()=>{ closePopup(); nextSlot(); };
    };
  }
  renderLoot();
}

// 给一张未获得的图纸；首次必给，之后30%概率
function grantBlueprint(){
  const have = new Set(state.blueprints);
  const remain = BLUEPRINT_ORDER.filter(k=>!have.has(k));
  if(remain.length===0) return null;
  const firstTime = state.blueprints.length===0;
  const rate = anySkill('过目不忘') ? 0.55 : 0.3; // 小念Lv2 过目不忘：图纸发现率 30%→55%
  if(firstTime || Math.random()<rate){
    const k = remain[0];
    state.blueprints.push(k);
    return k;
  }
  return null;
}

// 挑战失败：扣健康 + 失败计数（影响夜间丧尸）
function onChallengeLose(loc){
  const brave = anySkill('小勇士');
  const sanLoss = brave ? 4 : 7; // 小乐Lv5 小勇士：失败健康惩罚减半
  state.teacher.san = clamp(state.teacher.san-sanLoss, 0, 100); // 失败健康-7（原-10，配合6节节奏放宽）
  state.teacher.sta = clamp(state.teacher.sta-10, 0, 100);
  state.failedToday++;
  state.outCount++;
  // 失败的骚动会吓到家里的孩子：全员情绪-3（倒下/已死亡除外）
  state.kids.forEach(k=>{ if(!k.down && !k.dead) k.mood = clamp(k.mood-3, 0, 100); });
  const loseTxt = (LOC_STORIES[loc.k]&&LOC_STORIES[loc.k].lose) ? pick(LOC_STORIES[loc.k].lose) : `你慌忙从${loc.n}逃了出来，什么也没带回来。`;
  // 每天首次失败不引尸（手滑保护）：第2次起才引丧尸，且逐次递增
  let extra = '';
  if(state.failedToday === 2) extra = '\n> 这次的动静引来了什么东西，今夜恐怕不安生...';
  else if(state.failedToday >= 3) extra = '\n> 反复的骚动让越来越多的影子聚向幼儿园，今晚将有一场恶战...';
  saveState();
  showPopup(`<h3>✗ 挑战失败</h3>
    <div class="story">${loseTxt}${extra}</div>
    <div class="hint">健康 -${sanLoss}${brave?'（'+skillTag('小勇士')+' 减半）':''}　体力 -10　孩子们情绪 -3　（今日失败 ${state.failedToday}/${DAY_OUT_MAX} 节${state.failedToday===1?'：第一次失败不引尸':'：失败会引来丧尸'}）</div>
    <div class="btns"><button class="primary" id="lf-done">回幼儿园</button></div>`);
  $('lf-done').onclick = ()=>{ closePopup(); nextSlot(); };
}

// 丧尸战胜利：晶核掉落 + 物资搜刮
function onZombieWin(loc){
  let staCost = 10; // 与普通外出统一：单次外出（含丧尸战）-10体力
  const runErrand = anySkill('跑腿能手');
  if(runErrand){ staCost -= 2; }
  const knowWay = anySkill('认路');
  const staOut = weatherFX().staOut||0;
  if(staOut>0 && !knowWay){ staCost += staOut; }
  state.teacher.sta = clamp(state.teacher.sta-staCost, 0, 100);
  state.outCount++;
  // 晶核掉落：day≥21 才会掉，每只丧尸 12% 概率掉 1 颗（3孩全觉醒约需57颗，预计day70-80集满）
  const {need} = zombieCombatParams();
  let coreGot = 0;
  if(state.day >= 21){
    for(let i=0;i<need;i++){ if(Math.random()<0.12) coreGot++; }
  }
  for(let i=0;i<coreGot;i++) addItem('core');
  // 捡到第一颗晶核：永久解锁加固页的「晶核项链」制作入口
  if(coreGot>0 && !state.foundCore){ state.foundCore = true; }
  // 额外材料掉落：30% 概率掉 1 件该地点基础材料
  let extraDrop='';
  if(Math.random()<0.3){
    const baseLoot = loc.loot.filter(it=>!['steel','chip','glass','alloy'].includes(it));
    if(baseLoot.length){
      const k = baseLoot[Math.floor(Math.random()*baseLoot.length)];
      addItem(k);
      extraDrop = `<div class="story" style="text-align:center;color:var(--warm)">💥 丧尸身上搜出：<b>${ITEM_INFO[k].e}${ITEM_INFO[k].n}</b> ×1</div>`;
    }
  }
  const coreMsg = coreGot>0 ? `<div class="story" style="text-align:center;color:var(--accent2)">💎 击杀掉落 <b>丧尸晶核 ×${coreGot}</b>！</div>` : '';
  // 进入物资选择（同解谜胜利）
  const ADV = ['steel','chip','glass','alloy'];
  let availableLoot = loc.loot.filter(it => state.day < 31 ? !ADV.includes(it) : true);
  if(anySkill('冷静分析') && state.day>=31){
    const advHas = ADV.filter(a=>loc.loot.includes(a));
    if(advHas.length && !availableLoot.some(x=>ADV.includes(x))){ availableLoot.push(advHas[Math.floor(Math.random()*advHas.length)]); }
  }
  let poolSize = 5;
  if(anySkill('观察力')){ poolSize = 6; }
  while (availableLoot.length < poolSize) availableLoot.push('mat');
  const takeCount = anySkill('一眼看中') ? 3 : 2;
  const pool = availableLoot.slice().sort(()=>Math.random()-0.5).slice(0, poolSize);
  applyChanceLoot(pool, loc); // 地点特色概率掉落（如公园40%出🌰树种）
  let picked = [];
  function renderLoot(){
    const lootHint = (anySkill('观察力')?'<div style="font-size:11px;color:var(--accent2);text-align:center;margin:4px 0">🧠 '+skillTag('观察力')+'：候选 5→'+poolSize+' 格（只多 1 件可选，不增加带走件数）</div>':'')
      + (anySkill('一眼看中')?'<div style="font-size:11px;color:var(--accent2);text-align:center;margin:4px 0">👁️ '+skillTag('一眼看中')+'：可多带 1 件（共'+takeCount+'件）</div>':'');
    showPopup(`<h3>✓ 丧尸击退！挑选 ${takeCount} 件物资</h3>
      ${coreMsg}${extraDrop}
      ${lootHint}
      <div style="font-size:12px;color:var(--soft);text-align:center;margin:6px 0">已选 <b id="lp-cnt">0</b>/${takeCount}　点物品选择/取消</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;grid-gap:6px;gap:6px" id="lp-grid">
        ${pool.map((k,i)=>{
          const info=ITEM_INFO[k];
          const sel = picked.includes(i);
          return `<button data-i="${i}" class="lp-item" style="min-height:52px;background:${sel?'#DDE4E1':'#fff'};border:1.5px solid ${sel?'var(--accent)':'var(--line)'};border-radius:10px;font-size:14px;cursor:pointer">
            ${info.e} ${info.n}${sel?' ✓':''}</button>`;
        }).join('')}
      </div>
      <div class="btns" style="margin-top:8px"><button class="primary" id="lp-take" ${picked.length!==takeCount?'disabled':''}>带走选中物资</button></div>`);
    $('lp-cnt').textContent = picked.length;
    document.querySelectorAll('.lp-item').forEach(b=>{
      b.onclick = ()=>{
        const i=+b.dataset.i;
        if(picked.includes(i)){ picked = picked.filter(x=>x!==i); }
        else { if(picked.length>=takeCount){ toast('最多挑'+takeCount+'件'); return; } picked.push(i); }
        renderLoot();
      };
    });
    $('lp-take').onclick = ()=>{
      if(picked.length!==takeCount) return;
      picked.forEach(i=>addItem(pool[i]));
      let bpMsg='';
      if(loc.special==='blueprint'){
        const got = grantBlueprint();
        if(got) bpMsg = `<div class="story" style="text-align:center;color:var(--warm)">📜 你在抽屉里发现了一张图纸：<b>${BLUEPRINT_INFO[got].e} ${BLUEPRINT_INFO[got].n}</b>！${anySkill('过目不忘')?' <span style="font-size:11px">（'+skillTag('过目不忘')+'）</span>':''}</div>`;
      } else if(loc.special==='garden_manual'){
        state.gardenTries = (state.gardenTries||0)+1;
        if(!state.gardenManual){
          const got = state.gardenTries >= 11 || Math.random() < 0.25;
          if(got){ state.gardenManual = true; bpMsg = `<div class="story" style="text-align:center;color:var(--accent2)">📗 捡到<b>园艺手册</b>！点「🌱菜园」开垦天台。</div>`; }
        }
      }
      const names = picked.map(i=>ITEM_INFO[pool[i]].e+ITEM_INFO[pool[i]].n).join('、');
      // 物资名逐个弹跳出现（错开半拍，像真的被放进背包）
      const namesHtml = picked.map((i,idx)=>`<span class="item-pop" style="display:inline-block;animation-delay:${(idx*0.12+0.08).toFixed(2)}s">${ITEM_INFO[pool[i]].e}${ITEM_INFO[pool[i]].n}</span>`).join('、');
      const winTxt = (LOC_STORIES[loc.k]&&LOC_STORIES[loc.k].win) ? pick(LOC_STORIES[loc.k].win) : '';
      const outStory = Math.random() < 0.6 ? pick(OUT_STORIES) : '';
      saveState();
      sfx('reward');
      showPopup(`<h3>🎉 搜刮完成</h3>
        <div class="story" style="text-align:center">${winTxt}</div>
        ${outStory?`<div class="story">${outStory}</div>`:''}
        <div class="story" style="text-align:center">带回了：<b>${namesHtml}</b></div>
        ${coreMsg}${extraDrop}${bpMsg}
        <div class="hint">体力 -${staCost}${runErrand?'（💨'+skillTag('跑腿能手')+' 省 2）':''}${knowWay&&staOut>0?'（🗺️'+skillTag('认路')+' 免天气体力）':''}</div>
        <div class="btns"><button class="primary" id="lp-done">回幼儿园</button></div>`);
      $('lp-done').onclick = ()=>{ closePopup(); nextSlot(); };
    };
  }
  renderLoot();
}

// 照顾：喂食/安抚/吃饭（不占用时段；每天只有「外出」会推进早→中→晚）
function actCare(){
  fedFoodPick = null;
  medPick = null;
  kidFoodPicks = state.kids.map(()=>null);
  kidPendantPicks = state.kids.map(()=>null);
  careSkillTip = {};
  renderCare();
}
// 刷新照顾界面（动作后重渲染；选中品库存耗尽自动清空）
function refreshCare(){
  if(fedFoodPick && foodCount(fedFoodPick)<=0) fedFoodPick = null;
  if(medPick && (state.inv[medPick]||0)<=0) medPick = null;
  state.kids.forEach((k,i)=>{
    if(kidFoodPicks[i] && foodCount(kidFoodPicks[i])<=0) kidFoodPicks[i]=null;
    const pl = kidPendantPicks[i];
    if(pl && ((state.corePendants[pl]||0)<=0 || pl<=(k.coreLv||0))) kidPendantPicks[i]=null;
  });
  renderCare();
}
// 老师可选药品清单：通用药品/草药/体力液 + 生病时的对症药
function teacherMedList(){
  const list = [];
  if((state.inv.med||0)>0)  list.push({k:'med',  e:ITEM_INFO.med.e, n:ITEM_INFO.med.n, v:20});
  if((state.inv.herb||0)>0) list.push({k:'herb', e:'🌿', n:'草药', v:10});
  if((state.inv.energy||0)>0) list.push({k:'energy', e:'💉', n:'体力液', energy:true}); // 应急：体力+10 健康-5
  const t = state.teacher;
  if(t.sick){
    const sk = SICKNESSES[t.sick];
    if((state.inv[sk.med]||0)>0) list.push({k:sk.med, e:sk.medE, n:sk.medN, v:sk.hpDmg, cure:true});
  }
  // 去重（对症药可能与通用药品同 key 的极端情况）
  const seen = new Set();
  return list.filter(m=>!seen.has(m.k) && seen.add(m.k));
}
// 通用数值条（照顾页）：标签 + 条 + 数字（低于30自动转红警告）
function ckStatRow(lbl,val,color){
  const low = val < 30;
  const c = low ? '#E74C3C' : color;
  return `<div class="ck-stat${low?' low':''}"><span class="lbl">${lbl}</span>
    <span class="track"><i style="width:${clamp(val,0,100)}%;background:${c}"></i></span>
    <span class="num">${Math.round(val)}</span></div>`;
}
// 照顧頁：信任條/Lv 徽章的升級提示，點擊展開/收合（記住每個孩子的開關狀態）
const _trustHintOpen = new Set();
function toggleTrustHint(i){
  if(_trustHintOpen.has(i)) _trustHintOpen.delete(i); else _trustHintOpen.add(i);
  if(typeof actCare==='function') actCare();
}
function renderCare(){
  const t = state.teacher;
  const selFood = fedFoodPick && FOODS[fedFoodPick] ? FOODS[fedFoodPick] : null;
  const medList = teacherMedList();
  const selMed = medPick ? medList.find(m=>m.k===medPick) : null;
  const sickTag = t.sick ? `<span style="color:#E65100">${SICKNESSES[t.sick].e}${SICKNESSES[t.sick].n}</span>` : '<span style="color:#2E7D32">✓健康</span>';
  // 老师卡：数值条 + 并排两列（吃饭 + pick-box + 按钮 / 服用 + pick-box + 按钮）
  const teacherHtml = `<div class="ck-card" style="margin-bottom:10px">
    <div class="ck-head"><b>👩‍🏫 你自己</b><span class="ck-meta">${sickTag}</span></div>
    ${ckStatRow('健康',t.san,'#27AE60')}
    ${ckStatRow('饱腹',t.fed,'#F5A623')}
    ${ckStatRow('体力',t.sta,'#4A90D9')}
    <div class="ck-teacher-rows">
      <div class="ck-userow">
        <span class="pick-box${selFood?' has':''}" data-open="food" title="点我选择食物">${selFood?selFood.e+'<i class="pb-cnt">×'+foodCount(fedFoodPick)+'</i>':'＋'}</span>
        <button class="use-btn" id="pp-eat" ${!selFood?'disabled':''}>🍚 吃饭</button>
      </div>
      <div class="ck-userow">
        <span class="pick-box med${selMed?' has':''}" data-open="med" title="点我选择药品">${selMed?selMed.e+'<i class="pb-cnt">×'+state.inv[selMed.k]+'</i>':'＋'}</span>
        <button class="use-btn med" id="pp-meduse" ${!selMed?'disabled':''}>💊 服用</button>
      </div>
    </div>
  </div>`;
  const html = `
    <h3>🤱 照顾</h3>
    ${teacherHtml}
    <div class="ps-title" style="margin:2px 0 4px;font-size:11px;color:var(--soft)">👶 孩子们</div>
    <div id="care-list" style="display:grid;gap:8px">${state.kids.map((k,i)=>careRow(k,i)).join('')}</div>
    <div class="btns" style="margin-top:10px">
      <button class="primary" id="pp-done">完成照顾</button>
    </div>`;
  showPopup(html);
  wireCare();
}
function careRow(k,i){
  const d=KIDS_DEF[i];
  const medAvail = (state.inv.med||0) > 0;
  const herbAvail = (state.inv.herb||0) > 0;
  const medHeal = anySkill('医疗助手') ? 15 : 10;
  const herbHeal = anySkill('医疗助手') ? 8 : 5;
  if(k.dead){
    return `<div class="ck-card" style="opacity:.5"><div class="ck-head"><b style="color:#999">${d.emoji}${d.name}</b><span class="ck-meta">已去世</span></div></div>`;
  }
  // 状态标签
  const stateTag = k.down?`<span style="color:#E53935">💔倒下${k.downDays}/3</span>`
    : k.sick?`<span style="color:#E65100">${SICKNESSES[k.sick].e}${SICKNESSES[k.sick].n}</span>`
    : k.tantrum?`<span style="color:#E53935">💔闹脾气</span>`
    : (k.immuneDays||0)>0?`<span style="color:#2E7D32">🍊免疫${k.immuneDays}天</span>`
    : `<span style="color:#2E7D32">✓健康</span>`;
  // 技能
  const cl = k.coreLv||0, maxLv=4, isMax=cl>=maxLv;
  const nextLv = cl+1;
  const pendant = isMax?null:CORE_PENDANTS[nextLv];
  const havePendant = pendant && (state.corePendants[nextLv]||0)>0;
  const skills = k.skills.filter(n=>SKILL_INFO[n]).map(n=>({n, e:SKILL_INFO[n].e, d:SKILL_INFO[n].d}));
  const lvBadge = cl>0 ? `<span style="display:inline-block;font-size:11px;font-weight:700;color:#7B1FA2;background:transparent;border:none;border-radius:0;padding:0;margin-right:4px;white-space:nowrap" title="晶核觉醒等级，首页立绘头顶的爱心也是它">💎觉醒 Lv.${cl}</span>` : '';
  // 技能可点击：点一下在下方展开一行说明文字（再点同技能或点说明行收起）
  const tipName = careSkillTip[i];
  const tipSkill = tipName && SKILL_INFO[tipName] ? SKILL_INFO[tipName] : null;
  const tipHtml = tipSkill ? `<div class="ck-skilltip" data-skilltipclose="${i}" title="点此收起">${tipSkill.e} <b>${tipName}</b>：${tipSkill.d}</div>` : '';
  const skillsHtml = (skills.length || cl>0)
    ? `<div class="ck-skills">${lvBadge}${skills.map(s=>`<span data-skilltip="${i}|${s.n}" title="点我查看说明：${s.d}" style="cursor:pointer">${s.e}${s.n}</span>`).join('')}</div>${tipHtml}` : '';
  // 底排按钮（按状态显示，两排布局）
  let actionBtns = '';
  if(k.down){
    actionBtns = `<div class="ck-actions"><button class="ck-heal" data-heal="${i}:med" ${!medAvail?'disabled':''}>🩺救+${medHeal}</button>
      <button class="ck-heal" data-heal="${i}:herb" ${!herbAvail?'disabled':''}>🌿救+${herbHeal}</button></div>`;
  }else if(k.sick){
    const sk=SICKNESSES[k.sick], have=(state.inv[sk.med]||0)>0, herbOk=sk.herb&&(state.inv.herb||0)>0;
    actionBtns = `<div class="ck-actions"><button class="ck-heal" data-cure="${i}:med" ${!have?'disabled':''}>${sk.medE}${sk.medN}</button>${sk.herb?`<button class="ck-heal" data-cure="${i}:herb" ${!herbOk?'disabled':''}>🌿草药治</button>`:''}</div>`;
  }else{
    // 正常态：三列网格两行——第一排 选食物/喂食/补品；第二排 选项链/佩戴/安抚
    const kidFoodPick = kidFoodPicks[i];
    const selFood = kidFoodPick && FOODS[kidFoodPick] ? FOODS[kidFoodPick] : null;
    const vitDisabled = (state.inv.vitamin||0)<=0||(k.immuneDays||0)>0;
    // 项链选择：玩家可选已拥有的任意高阶项链直接佩戴（不必从 lv1 一步步升）
    const kpp = kidPendantPicks[i];
    const selPLv = (kpp && kpp>cl && (state.corePendants[kpp]||0)>0) ? kpp : null;
    const selPendant = selPLv ? CORE_PENDANTS[selPLv] : null;
    const wearLv = selPLv || nextLv;
    const wearPendant = CORE_PENDANTS[wearLv];
    const haveWear = !isMax && (state.corePendants[wearLv]||0)>0;
    // 第二排：满觉醒显示「📿满级」，否则 选项链框 + 佩戴按钮；安抚固定在最右
    const row2Pendant = isMax
      ? `<span class="pick-box" style="opacity:.4;cursor:default;border-style:dashed">－</span>
         <span style="font-size:11px;color:#7B1FA2;white-space:nowrap;text-align:center;align-self:center">📿满级</span>`
      : `<span class="pick-box ppick${selPendant?' has':''}" data-kidpendant="${i}" title="项链上限＝成长 Lv${k.lv}（最多戴${maxPendantLv(k)}阶）。信任归零闹脾气时项链会脱落。点我选择要佩戴的项链">${selPendant?'<span style="font-size:12.5px;font-weight:600">Lv'+selPLv+'</span>':'＋'}</span>
         <button class="ck-pendant" data-wear="${i}" ${!haveWear?'disabled':''} title="佩戴晶核项链激发技能">📿佩戴</button>`;
    actionBtns = `<div class="ck-kid-actions">
      <span class="pick-box${selFood?' has':''}" data-kidfood="${i}" title="点我选择食物">${selFood?selFood.e+'<i class="pb-cnt">×'+foodCount(kidFoodPick)+'</i>':'＋'}</span>
      <button class="use-btn ck-feed" data-i="${i}" ${!selFood?'disabled':''}>🍚喂食</button>
      <button class="use-btn" data-vitamin="${i}" ${vitDisabled?'disabled':''} style="border-color:#66BB6A;background:#66BB6A">🍊补品</button>
      ${row2Pendant}
      <button class="use-btn" data-comfort="${i}" ${k.comforted?'disabled':''} style="border-color:#F06292;background:#F06292">😊安抚</button>
    </div>`;
  }
  // 闹脾气提示：告诉玩家当天怎么哄回来（闹脾气且没倒下时）
  const tantrumHint = (!k.down && k.tantrum)
    ? `<div style="font-size:10.5px;color:#E53935;line-height:1.5;margin-top:3px">🫶 ：请喂饱孩子、哄哄孩子，孩子应该很快就会原谅你</div>`
    : '';
  // 信任成長條：信任灌滿直接升級，Lv 徽章固定在條尾端
  const _need = k.lv<5 ? TRUST_LV[k.lv-1] : TRUST_LV[3];
  const _pct = k.lv>=5 ? 100 : Math.min(100, Math.round(k.trust/_need*100));
  const _hintOn = _trustHintOpen.has(i);
  const _trustBar = (k.lv>=5)
    ? `<div class="ck-trust"><div class="ckt-track"><div class="ckt-fill" style="width:100%"></div><span class="ckt-txt">已满级</span></div><span class="ckt-lv">Lv5</span></div>`
    : `<div class="ck-trust" onclick="toggleTrustHint(${i})" style="cursor:pointer" title="点我查看升级说明"><div class="ckt-track"><div class="ckt-fill" style="width:${_pct}%"></div><span class="ckt-heart" style="left:${_pct}%">💙</span><span class="ckt-txt">${k.trust} / ${_need} → 升到 Lv${k.lv+1}</span></div><span class="ckt-lv">Lv${k.lv}</span></div>`;
  const _trustHint = (k.lv<5 && _hintOn)
    ? `<div style="font-size:10px;color:#7F8C9A;line-height:1.5;margin-top:3px">💡 把孩子的<b>饱腹</b>和<b>情绪</b>都顾好，信任涨更快；灌滿这格就会升级${_hintOn?' · 再点收起':''}</div>`
    : '';
  return `<div class="ck-card">
    <div class="ck-head">
      <b>${d.emoji}${d.name}</b>
      <span class="ck-meta">${stateTag}</span>
    </div>
    ${tantrumHint}
    ${_trustBar}
    ${_trustHint}
    ${skillsHtml}
    ${ckStatRow('健康',k.hp,'#27AE60')}
    ${ckStatRow('饱腹',k.fed,'#F5A623')}
    ${ckStatRow('情绪',k.mood,'#F06292')}
    ${actionBtns}
  </div>`;
}
// 水的库存平铺在 inv.water（其余食物在 inv.food 层），喂食/吃饭链路统一走这两个 helper
function foodCount(k){ return k==='water' ? (state.inv.water||0) : (state.inv.food[k]||0); }
function foodConsume(k){ if(k==='water') state.inv.water = Math.max(0,(state.inv.water||0)-1); else state.inv.food[k]--; }
// 浮层内的食物按钮（点一下立即生效，无持久化选中态）
function foodBtns(){
  const list = Object.entries(state.inv.food).filter(([k,c])=>c>0 && FOODS[k]);
  if((state.inv.water||0)>0) list.push(['water', state.inv.water]); // 水在顶层库存，单独拼入
  return list.map(([k,c])=>
    `<button data-food="${k}">${FOODS[k].e}${FOODS[k].n}×${c}<br><small>饱腹+${FOODS[k].v} 体力+${FOODS[k].sta||0}${FOODS[k].mood?' 心情+'+FOODS[k].mood:''}</small></button>`
  ).join('');
}
// 浮层内的药品按钮（medList 由 teacherMedList 生成）
function medBtns(list){
  return list.map(m=>
    `<button data-med="${m.k}" class="med">${m.e}${m.n}×${state.inv[m.k]}<br><small>${m.cure?'对症治愈':m.energy?'⚡体力+10 ❤️健康-5':'健康+'+m.v}</small></button>`
  ).join('');
}
// 浮层内的项链按钮：列出该孩子可直接佩戴的所有项链等级（高于当前觉醒、且有库存）
function pendantBtns(i){
  const k = state.kids[i];
  const cl = k.coreLv||0;
  const cap = maxPendantLv(k);
  const rows = [];
  for(let lv=cl+1; lv<=4; lv++){
    if(lv>cap) continue;                       // 成长等级不够，戴不动更高阶
    if((state.corePendants[lv]||0)<=0) continue;
    const p = CORE_PENDANTS[lv];
    rows.push(`<button data-pendantlv="${i}:${lv}">${p.e}${p.n}×${state.corePendants[lv]}<br><small>直接觉醒到 Lv.${lv}${lv>cl+1?'（少1技能）':''}</small></button>`);
  }
  return rows.join('');
}
// 通用浮层：在 #popup 内注入半透明遮罩 + 居中面板；点物品 → 回调 → 关闭 → refreshCare
function showPickOverlay(title, buttonsHtml, onPick, opts){
  opts = opts||{};
  const emptyHint = opts.emptyHint || '没有了';
  const closeBtn = opts.showClose!==false ? '<button class="ck-close">取消</button>' : '';
  const inner = buttonsHtml
    ? `<div class="op-grid">${buttonsHtml}</div>${closeBtn}`
    : `<div class="op-empty">${emptyHint}</div>${closeBtn}`;
  const overlay = document.createElement('div');
  overlay.className = 'ck-overlay';
  overlay.innerHTML = `<div class="ck-overlay-panel">${title?`<h4>${title}</h4>`:''}${inner}</div>`;
  document.getElementById('popup').appendChild(overlay);
  // 点物品按钮 → 回调 → 关闭
  // 先关浮层再执行回调（onPick 内会 refreshCare 重渲 #popup，此时 overlay 已移除）
  overlay.querySelectorAll('[data-food]').forEach(b=>b.onclick=()=>{ const k=b.dataset.food; closeOverlay(); onPick('food',k); });
  overlay.querySelectorAll('[data-med]').forEach(b=>b.onclick=()=>{ const k=b.dataset.med; closeOverlay(); onPick('med',k); });
  overlay.querySelectorAll('[data-pendantlv]').forEach(b=>b.onclick=()=>{ const v=b.dataset.pendantlv; closeOverlay(); onPick('pendant',v); });
  overlay.querySelectorAll('.ck-close').forEach(b=>b.onclick=closeOverlay);
  // 点遮罩（非面板）→ 关闭不执行
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeOverlay(); });
  // 阻止按钮冒泡触发遮罩关闭的 bug（面板内按钮都在 panel 内，target!==overlay）
  function closeOverlay(){ if(overlay.parentNode) overlay.parentNode.removeChild(overlay); }
  return closeOverlay;
}
function wireCare(){
  // 点击老师卡的 pick-box：空框(＋) → 弹浮层选物；已有选中 → 直接清空（取消选中）
  document.querySelectorAll('.pick-box').forEach(box=>{
    box.addEventListener('click', e=>{
      e.stopPropagation();
      const type = box.dataset.open;
      // 已有选中：直接清空，不再弹浮层
      if(type==='food' && fedFoodPick){ fedFoodPick = null; saveState(); refreshCare(); return; }
      if(type==='med' && medPick){ medPick = null; saveState(); refreshCare(); return; }
      // 空框：弹浮层选物
      if(type==='food'){
        showPickOverlay('🍚 选择食物', foodBtns(), (t,k)=>{
          fedFoodPick = k;
          saveState(); refreshCare();
        }, {emptyHint:'没有食物了，先去搜集吧'});
      }else if(type==='med'){
        showPickOverlay('💊 选择药品', medBtns(teacherMedList()), (t,k)=>{
          medPick = k;
          saveState(); refreshCare();
        }, {emptyHint:'没有可用的药了'});
      }
    });
  });
  // 老师「吃饭」：消耗当前选中的食物
  const eatBtn = $('pp-eat'); if(eatBtn) eatBtn.onclick = ()=>{
    if(!fedFoodPick || foodCount(fedFoodPick)<=0){ toast('先点左边 ＋ 选一种食物'); return; }
    const f = FOODS[fedFoodPick], fKey = fedFoodPick;
    foodConsume(fKey);
    state.teacher.fed = clamp(state.teacher.fed + f.v, 0, 100);
    state.teacher.sta = clamp(state.teacher.sta + (f.sta||0), 0, 100); // 吃东西同时补体力
    fedFoodPick = null;
    toast(`你${fKey==='water'?'喝了':'吃了'}${f.e}${f.n}，饱腹+${f.v} 体力+${f.sta||0}`);
    saveState(); refreshCare();
  };
  // 老师「服用」：消耗当前选中的药（通用药/草药回血，生病时对症药额外治愈）
  const medUseBtn = $('pp-meduse'); if(medUseBtn) medUseBtn.onclick = ()=>{
    if(!medPick || (state.inv[medPick]||0)<=0){ toast('先点左边 ＋ 选一种药'); return; }
    const t = state.teacher, sk = t.sick ? SICKNESSES[t.sick] : null;
    if(sk && medPick===sk.med){
      state.inv[medPick]--; t.san = clamp(t.san+sk.hpDmg,0,100); t.sick=null;
      toast(`你的${sk.n}好了！健康+${sk.hpDmg}`);
    }else if(medPick==='herb'){
      state.inv.herb--; t.san = clamp(t.san+10,0,100);
      toast('嚼了🌿草药，健康+10');
    }else if(medPick==='energy'){
      // 💉体力液（医院搜刮）：应急兴奋剂，体力+10 但健康-5
      state.inv.energy--;
      t.sta = clamp(t.sta+10,0,100);
      t.san = clamp(t.san-5,0,100);
      toast('注射💉体力液，体力+10 健康-5');
    }else{
      state.inv[medPick]--; t.san = clamp(t.san+20,0,100);
      toast(`用了${ITEM_INFO[medPick].e}${ITEM_INFO[medPick].n}，健康+20`);
    }
    medPick = null;
    saveState(); refreshCare();
  };
  // 孩子食物 pick-box：空框(＋) → 弹浮层选物；已有选中 → 点一下取消
  document.querySelectorAll('.pick-box[data-kidfood]').forEach(box=>{
    box.addEventListener('click', e=>{
      e.stopPropagation();
      const i = +box.dataset.kidfood;
      // 已有选中：直接清空
      if(kidFoodPicks[i]){ kidFoodPicks[i] = null; saveState(); refreshCare(); return; }
      // 空框：弹浮层选物
      showPickOverlay('🍚 给'+KIDS_DEF[i].name+'选食物', foodBtns(), (t,k)=>{
        kidFoodPicks[i] = k;
        saveState(); refreshCare();
      }, {emptyHint:'没有食物了，先去搜集吧'});
    });
  });
  // 孩子项链 pick-box：空框(＋) → 弹浮层选要戴的项链等级；已有选中 → 点一下取消
  document.querySelectorAll('.pick-box[data-kidpendant]').forEach(box=>{
    box.addEventListener('click', e=>{
      e.stopPropagation();
      const i = +box.dataset.kidpendant;
      if(kidPendantPicks[i]){ kidPendantPicks[i] = null; saveState(); refreshCare(); return; }
      // 判断空浮层提示：有库存但都超过成长等级 → 等级不够；否则 → 没库存
      const kk = state.kids[i], cap = maxPendantLv(kk), cl = kk.coreLv||0;
      let stockAny=false, stockInCap=false;
      for(let lv=cl+1;lv<=4;lv++){ if((state.corePendants[lv]||0)>0){ stockAny=true; if(lv<=cap) stockInCap=true; } }
      const pHint = (stockAny && !stockInCap) ? '信任等级不够，无法佩戴高级项链' : '没有可用的项链，先去制作晶核项链吧';
      showPickOverlay('📿 给'+KIDS_DEF[i].name+'选项链', pendantBtns(i), (t,v)=>{
        const lv = +(v.split(':')[1]);
        kidPendantPicks[i] = lv;
        saveState(); refreshCare();
      }, {emptyHint:pHint});
    });
  });
  // 技能胶囊：点一下展开说明行；再点同技能或点说明行收起
  document.querySelectorAll('[data-skilltip]').forEach(el=>{
    el.addEventListener('click', e=>{
      e.stopPropagation();
      const parts = el.dataset.skilltip.split('|');
      const i = +parts[0], n = parts.slice(1).join('|');
      careSkillTip[i] = (careSkillTip[i]===n) ? null : n;
      refreshCare();
    });
  });
  document.querySelectorAll('[data-skilltipclose]').forEach(el=>{
    el.addEventListener('click', e=>{
      e.stopPropagation();
      delete careSkillTip[+el.dataset.skilltipclose];
      refreshCare();
    });
  });
  // 孩子「喂食」：消耗该孩子当前选中的食物
  document.querySelectorAll('.ck-feed').forEach(b=>{
    b.onclick = ()=>{
      const i = +b.dataset.i, kid = state.kids[i];
      const pick = kidFoodPicks[i];
      if(!pick || foodCount(pick)<=0){ toast('先点左边 ＋ 选一种食物'); return; }
      const f = FOODS[pick];
      foodConsume(pick);
      kid.fed = clamp(kid.fed + f.v, 0, 100);
      kid.mood = clamp(kid.mood + (f.mood||0), 0, 100);
      kid.fedMeal++;
      // 餵食即时涨信任：每次+2，每孩每天上限+6（防刷）
      const oldLv = kid.lv, fedGain = kid.down ? 0 : Math.min(2, 6 - (kid.fedTrustGain||0));
      if(fedGain>0){ kid.trust += fedGain; kid.fedTrustGain = (kid.fedTrustGain||0) + fedGain; applyKidLevel(kid); if(kid.trust>0) kid.tantrum=false; }
      kidFoodPicks[i] = null;
      let fmsg = `${KIDS_DEF[i].name}${pick==='water'?'喝了':'吃了'}${f.e}${f.n}，饱腹+${f.v}${f.mood?' 心情+'+f.mood:''}`;
      if(fedGain>0) fmsg += ` 信任+${fedGain}`;
      if(kid.lv>oldLv) fmsg += ` 🌟升到Lv${kid.lv}！`;
      toast(fmsg);
      saveState(); refreshCare();
    };
  });
  // 安抚（每天一次；每次信任+2，闹脾气时也能把孩子哄回来）
  document.querySelectorAll('[data-comfort]').forEach(b=>{
    b.onclick = ()=>{
      const i = +b.dataset.comfort, k = state.kids[i];
      const wasTantrum = !!k.tantrum, oldLv = k.lv;
      if(!k.down){ k.trust += 2; applyKidLevel(k); if(k.trust>0) k.tantrum=false; }
      k.comforted = true;
      k.mood = clamp(k.mood+8, 0, 100);
      state.teacher.san = clamp(state.teacher.san+2, 0, 100);
      let cmsg = wasTantrum ? `${KIDS_DEF[i].name}被你哄好了，原谅你了` : `${KIDS_DEF[i].name}被你哄睡了，情绪+8`;
      if(!k.down) cmsg += ' 信任+2';
      if(k.lv>oldLv) cmsg += ` 🌟升到Lv${k.lv}！`;
      toast(cmsg);
      saveState(); refreshCare();
    };
  });
  // 倒下救治：💊药品 HP+10/15，🌿草药 HP+5/8（医疗助手加成）；两种药各耗各的库存
  document.querySelectorAll('[data-heal]').forEach(b=>{
    b.onclick = ()=>{
      const parts = b.dataset.heal.split(':'), i = +parts[0], type = parts[1], k = state.kids[i];
      if(!k.down){ return; }
      const useMed = type!=='herb';
      if(useMed){
        if((state.inv.med||0)<=0){ toast('没有🩺急救包了'); return; }
        state.inv.med--;
      }else{
        if((state.inv.herb||0)<=0){ toast('没有🌿草药了'); return; }
        state.inv.herb--;
      }
      let healAmt = useMed ? (anySkill('医疗助手')?15:10) : (anySkill('医疗助手')?8:5);
      const medAssist = anySkill('医疗助手'), warmHug = anySkill('温暖抱抱');
      if(warmHug) healAmt += 10;
      k.hp = clamp(k.hp + healAmt, 0, 100);
      const healTag = (medAssist?'🩺'+skillTag('医疗助手')+'  ':'') + (warmHug?'💖'+skillTag('温暖抱抱')+'  ':'');
      if(k.hp >= 50){
        k.down = false; k.downDays = 0;
        toast(`${KIDS_DEF[i].name}被救醒了！健康+${healAmt}${healTag?'｜'+healTag:''}`);
      }else{
        toast(`${KIDS_DEF[i].name}暂时脱离危险，还需继续救治${healTag?'｜'+healTag:''}`);
      }
      saveState(); refreshCare();
    };
  });
  // 对症下药：用对应药品治愈病症 + 回血
  document.querySelectorAll('[data-cure]').forEach(b=>{
    b.onclick = ()=>{
      const parts = b.dataset.cure.split(':'), i = +parts[0], type = parts[1], k = state.kids[i];
      if(!k.sick){ return; }
      const sk = SICKNESSES[k.sick];
      if(type==='med'){ if((state.inv[sk.med]||0)<=0){toast(`没有${sk.medN}`);return;} state.inv[sk.med]--; }
      else { if(!sk.herb||(state.inv.herb||0)<=0){toast('草药不能治这个病');return;} state.inv.herb--; }
      k.hp = clamp(k.hp + sk.hpDmg, 0, 100);
      k.sick = null;
      toast(`${KIDS_DEF[i].name}的${sk.n}好了！健康+${sk.hpDmg}`);
      saveState(); refreshCare();
    };
  });
  // 维生素：预防3天不生病
  document.querySelectorAll('[data-vitamin]').forEach(b=>{
    b.onclick = ()=>{
      const i = +b.dataset.vitamin, k = state.kids[i];
      if((state.inv.vitamin||0) <= 0){ toast('没有维生素了'); return; }
      state.inv.vitamin--;
      k.immuneDays = 3;
      toast(`${KIDS_DEF[i].name}服用了维生素，3天内不会生病！`);
      saveState(); refreshCare();
    };
  });
  // 佩戴晶核项链 → 觉醒/选择技能（可戴玩家在选项框里选的高阶项链；wakeKidSkill 定义在全局）
  document.querySelectorAll('[data-wear]').forEach(b=>{
    b.onclick = ()=>{
      const i = +b.dataset.wear;
      wakeKidSkill(i, kidPendantPicks[i] || undefined);
    };
  });
  document.querySelectorAll('[data-fort]').forEach(b=>{
    b.onclick = ()=>{
      const k = b.dataset.fort, lv = state.fort[k];
      if(lv < 0) return; // 破损点位走 data-repair，不允许当升级处理
      const cost = FORT_COST[k][lv];
      if(!cost) return;
      if(!canAfford(cost)){ toast('材料不足：缺 '+lackText(cost)); return; }
      payCost(cost);
      state.fort[k] = lv+1;
      if(anySkill('灵感') && Math.random()<0.25){ toast('💡 '+skillTag('灵感')+'：灵感迸发，升级没耗体力！'); }
      else { state.teacher.sta = clamp(state.teacher.sta-8, 0, 100); }
      saveState();
      toast(`${SPOTS.find(x=>x.k===k).n}升级到 ${lvText(lv+1)}！`);
      actFortify(); // 刷新界面
    };
  });
  // 修复点位（不占时段）：一次点击恢复至破损前等级，缺料给出明细
  document.querySelectorAll('[data-repair]').forEach(b=>{
    b.onclick = ()=>{
      const k = b.dataset.repair, lv = state.fort[k];
      if(lv >= 0) return;
      const baseLv = Math.max(0, Math.min(5, (state.fortBase && typeof state.fortBase[k]==='number') ? state.fortBase[k] : 0));
      const cost = repairCost(k, lv, baseLv);
      if(!canAfford(cost)){ toast('材料不足：缺 '+lackText(cost)); return; }
      payCost(cost);
      state.fort[k] = baseLv;
      if(anySkill('灵感') && Math.random()<0.25){ toast('💡 '+skillTag('灵感')+'：灵感迸发，修复没耗体力！'); }
      else { state.teacher.sta = clamp(state.teacher.sta-8, 0, 100); }
      saveState();
      toast(`${SPOTS.find(x=>x.k===k).n}修复至 ${lvText(baseLv)}！`);
      actFortify();
    };
  });
  // 布防：打开设备选择子界面
  document.querySelectorAll('[data-place]').forEach(b=>{
    b.onclick = ()=>openPlaceMenu(b.dataset.place);
  });
  // 移除已放置设备（回库存）
  document.querySelectorAll('[data-unplace]').forEach(b=>{
    b.onclick = ()=>{
      const [spot, dev] = b.dataset.unplace.split(':');
      state.placed[spot][dev]--;
      state.devices[dev] = (state.devices[dev]||0)+1;
      saveState();
      toast(`已移除 ${EQUIPMENT[dev].e}${EQUIPMENT[dev].n}，回到库存`);
      actFortify();
    };
  });
  const cancelBtn = $('pp-cancel'); if(cancelBtn) cancelBtn.onclick = closePopup;
  // 完成照顾
  const doneBtn = $('pp-done');
  if(doneBtn) doneBtn.onclick = ()=>{ closePopup(); };
}

// 布防子界面：选择要放置的设备
function openPlaceMenu(spotKey){
  const sp = SPOTS.find(x=>x.k===spotKey);
  const placed = state.placed[spotKey]||{};
  const placedCount = Object.values(placed).reduce((a,b)=>a+b,0);

  const devBtns = Object.entries(EQUIPMENT).filter(([k,e])=> (!e.spot || e.spot===spotKey) && (state.devices[k]||0) > 0).map(([k,e])=>{ // 没做出来（库存0）的设备不显示
    const have = state.devices[k] || 0;
    return `<div data-pdev="${k}" style="display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;background:#F2F7FD;border:1px solid #E3EEF9;border-radius:12px;padding:10px 12px;margin-bottom:6px;cursor:pointer">
      <div style="flex:1;min-width:0">
        <div><span style="font-size:16px">${e.e}</span> <b style="font-size:15px">${e.n}</b> <small style="color:var(--warm);font-weight:600;margin-left:6px;font-size:12px">库存×${have}</small></div>
        <div style="font-size:11px;color:var(--soft);margin-top:3px">${e.desc}</div>
      </div>
      <span style="flex:none;font-size:12px;color:var(--accent);font-weight:600;white-space:nowrap">放置</span>
    </div>`;
  }).join('');

  showPopup(`
    <h3>⚙️ 在${sp.n}放置设备</h3>
    <div style="font-size:12px;color:var(--soft);text-align:center;margin-bottom:8px">
      已放置 ${placedCount}/2 件，选择要放置的设备：
    </div>
    <div style="display:grid;gap:6px">${devBtns || '<div class="hint" style="margin:14px 0">还没有做好的设备，先去「制作防御设备」</div>'}</div>
    <div class="hint">放置不消耗体力和时段，仅从库存扣除</div>
    <div class="btns"><button id="pp-back">返回</button></div>
  `);

  document.querySelectorAll('[data-pdev]').forEach(b=>{
    b.onclick = ()=>{
      if(b.dataset.disabled){ toast('这个设备还没有库存，先去制作'); return; }
      const dk = b.dataset.pdev;
      state.devices[dk]--;
      state.placed[spotKey][dk]++;
      saveState();
      toast(`已在${sp.n}放置 ${EQUIPMENT[dk].e}${EQUIPMENT[dk].n}`);
      actFortify();
    };
  });
  $('pp-back').onclick = actFortify;
}

// 今夜来袭丧尸数掷骰（失败引尸 + 每7天尸潮 + 零星游荡 + 天气修正 + 技能）
function rollNightCount(){
  const day = state.day;
  let count = 0;
  // 每天首次失败不引尸（手滑保护）：引尸数按「超出首次的失败数」计算
  // 2次失败+1只，3次+3只，4次+5只
  const fails = Math.max(0, (state.failedToday||0) - 1);
  if(fails >= 3) count += 5;
  else if(fails === 2) count += 3;
  else if(fails === 1) count += 1;
  // 后期失败加码（原每晚保底改为与失败挂钩）：60天起当日失败超首次才额外引尸
  // 60-69天+1 / 70-79天+2 / 80-89天+3 / 90-99天+4；零失败则无保底来袭
  if(day >= 60 && fails > 0) count += 1 + Math.floor((day - 60) / 10);
  // 定期尸潮（每7天一波）；后期尸潮更猛烈
  if(day % 7 === 0 && day > 0){
    let horde = Math.max(2, Math.floor(day/10));
    if(day >= 60) horde += 2;
    count += horde;
  }
  // 无失败时小概率零星丧尸（当天有过1次失败则不再叠加随机游荡者）
  else if(state.failedToday === 0 && Math.random() < 0.2) count += Math.max(1, Math.floor(day/20));
  // 天气：雾夜掩护-1 / 雷暴躁动+1
  count += (weatherFX().nightZ||0);
  // 小念Lv3 记忆力：夜间丧尸数量-1（最少0，不会凭空刷出丧尸）
  if(anySkill('记忆力')){ count = count - 1; }
  return Math.max(0, count);
}
// 预警与夜袭共用结果：当晚只掷一次，缓存到次日清晨
function peekNightAttack(){
  if(typeof state._nightPeek === 'number') return state._nightPeek;
  state._nightPeek = rollNightCount();
  return state._nightPeek;
}

// 丧尸夜袭结算：计算来袭 -> 分配点位 -> 设备触发 -> 造成伤害 -> 返回日志
function zombieNightAttack(){
  const day = state.day;
  const tier = zombieTier(day);
  const zt = ZOMBIE_TYPES[tier];

  // 后期破防：61天起出现能无视部分防御的变异丧尸，满防不再绝对安全
  // pierce = 被防御挡住的伤害中，仍会穿透造成伤害的比例
  let pierce = 0;
  if(day >= 81) pierce = 0.5;
  else if(day >= 61) pierce = 0.3;

  // 1) 计算来袭数量（与「入夜观察」预警共用同一次掷骰，缓存于 state._nightPeek）
  let count = peekNightAttack();

  if(count <= 0){ state._nightPeek = 0; return null; } // 今夜平安

  // 2) 分配丧尸到点位
  const spotZombies = {}; // {spotKey: zombieCount}
  SPOTS.forEach(sp=> spotZombies[sp.k] = 0);

  // 小安Lv4 夜间守护：10%概率提前发现丧尸，给所有点位+2防御（仅本夜）
  let guardBonus = 0;
  if(anySkill('夜间守护') && Math.random() < 0.10){
    guardBonus = 2;
  }

  const doorSpots = ['door','win','back']; // T2疾跑优先攻击的点位
  for(let i=0; i<count; i++){
    let target;
    if(zt.target === 'door'){
      target = doorSpots[rnd(0, doorSpots.length-1)];
    }else if(zt.target === 'weak'){
      // 猎手丧尸：在防御最低的2个点位间随机分配（而非全部堆同一个点）
      // 先洗牌再排序：sort 是稳定排序，各点位防御相同（平局）时若不洗牌，
      // 「最弱2个」会永远锁定数组前两位（窗户+大门），其余点位后期永不挨打
      const pool = SPOTS.slice();
      for(let j=pool.length-1; j>0; j--){ const r = rnd(0, j); const tmp = pool[j]; pool[j] = pool[r]; pool[r] = tmp; }
      const sorted = pool.sort((a,b)=> spotDefense(a.k) - spotDefense(b.k));
      const weakSpots = sorted.slice(0, 2).map(sp=>sp.k);
      target = weakSpots[rnd(0, weakSpots.length-1)];
    }else{
      target = SPOTS[rnd(0, SPOTS.length-1)].k;
    }
    spotZombies[target]++;
  }

  // 3) 逐点位结算
  const spotLogs = [];
  if(anySkill('记忆力')){ spotLogs.push('🧠 '+skillTag('记忆力')+'：劝退 1 只丧尸'); }
  let totalKilled = 0;
  let totalLured = 0;
  let spotsDamaged = 0;
  const damagedSpots = []; // 新增：记录受损点位 key

  SPOTS.forEach(sp=>{
    const k = sp.k;
    let zombies = spotZombies[k];
    if(zombies <= 0) return;
    const placed = state.placed[k]||{};
    const line = [`${sp.e}${sp.n}：${zt.e}×${zombies}`];

    // 设备触发
    // 声音诱饵：每个诱走2只（小乐Lv3 诱饵帮手 → 每个诱走3只）
    if(placed.decoy > 0 && weatherFX().decoyBlock){
      // 雷暴夜：雷声盖过诱饵声，今夜不生效（设备保留，不消耗）
      line.push('📢雷声盖过诱饵，未生效');
    }
    else {
      const decoyBase = anySkill('诱饵帮手') ? 3 : 2;
      let decoyCount = 0;
      while(placed.decoy > 0 && zombies > 0){
        const lure = Math.min(decoyBase, zombies);
        zombies -= lure;
        placed.decoy--;
        totalLured += lure;
        decoyCount += lure;
      }
      if(decoyCount > 0){
        line.push('📢诱饵诱走'+decoyCount+'只'+(anySkill('诱饵帮手')?'（'+skillTag('诱饵帮手')+'）':''));
      }
    }
    if(zombies <= 0){ line.push(`✅全灭`); spotLogs.push(line.join('，')); return; }

    // 腐蚀瓶：每个削弱攻击-1，叠加
    let dmgMod = 0;
    let acidCount = 0;
    while(placed.acid > 0){
      dmgMod -= 1;
      placed.acid--;
      acidCount++;
    }
    if(acidCount > 0){
      line.push(`🧪腐蚀削弱${acidCount>1?'×'+acidCount:''}`);
    }

    // 击杀类设备（每个设备各自触发）
    while(placed.flame > 0 && zombies > 0){
      const kill = Math.min(3, zombies);
      zombies -= kill; totalKilled += kill;
      placed.flame--;
      line.push(`🔥击杀${kill}只`);
    }
    while(zombies > 0 && placed.shock > 0){
      // 电击网：永久，需电池
      if(state.inv.bat > 0){
        state.inv.bat--;
        const kill = Math.min(2, zombies);
        zombies -= kill; totalKilled += kill;
        line.push(`⚡电击击杀${kill}只(耗电池)`);
      }else{
        line.push(`⚡电击网缺电池失效`);
        break; // 缺电池，后续也不会触发
      }
    }
    while(zombies > 0 && placed.trap > 0){
      const kill = Math.min(1, zombies);
      zombies -= kill; totalKilled += kill;
      placed.trap--;
      line.push(`🪤夹杀${kill}只`);
    }

    if(zombies <= 0){ line.push(`✅全灭`); spotLogs.push(line.join('，')); return; }

    // 剩余丧尸攻击点位（含夜间守护+敏捷闪避）
    const rawDmg = zombies * Math.max(1, zt.dmg + dmgMod);
    const defWithBonus = spotDefense(k) + guardBonus;
    const blocked = Math.min(defWithBonus, rawDmg);
    let actualDmg = rawDmg - blocked;
    // 破防：被防御挡住的伤害中，按 pierce 比例穿透（后期满防也会掉血）
    let pierceDmg = 0;
    if(pierce > 0 && blocked > 0){ pierceDmg = Math.ceil(blocked * pierce); actualDmg += pierceDmg; }
    if(actualDmg > 0 && anySkill('敏捷闪避')){ actualDmg = Math.ceil(actualDmg / 2); line.push('💨'+skillTag('敏捷闪避')+'：损伤减半'); }
    if(guardBonus > 0){ line.push('🛡️'+skillTag('夜间守护')+'：全员防御+2'); }
    if(pierceDmg > 0){ line.push(`⚠️破防穿透+${pierceDmg}`); }
    if(actualDmg > 0){
      const lvDown = Math.ceil(actualDmg / 2); // 每2点伤害降1级
      const oldLv = state.fort[k];
      if(oldLv >= 0){ if(!state.fortBase) state.fortBase = {}; state.fortBase[k] = oldLv; } // 记住破损前等级
      state.fort[k] = Math.max(-2, state.fort[k] - lvDown);
      spotsDamaged++;
      damagedSpots.push(k);
      line.push(`💥${oldLv>=0?lvText(oldLv):lvText(oldLv)}→${lvText(state.fort[k])}(-${lvDown}级)`);
    }else{
      line.push(`🛡️防御挡住了`);
    }
    spotLogs.push(line.join('，'));
  });

  // 4) 生成日志条目
  const log = {
    day: day,
    tier: tier,
    zombieName: zt.n,
    zombieEmoji: zt.e,
    count: count,
    killed: totalKilled,
    lured: totalLured,
    spotsDamaged: spotsDamaged,
    damagedSpots: damagedSpots,
    details: spotLogs,
    pierce: pierce,
  };

  // 存入最近5条日志
  state.defenseLog.unshift(log);
  if(state.defenseLog.length > 5) state.defenseLog.pop();

  return log;
}

// --- 孩子养成辅助 ---
// 技能是否生效：信任=0 或倒下时技能不生效（闹脾气/没状态）
function skillsActive(k){ return !k.down && k.trust > 0 && k.skills.length > 0; }
// 项链佩戴上限：由孩子成长等级决定（Lv1→1阶 … Lv4+/5→4阶满）。养大孩子（靠信任升级）才能戴更强项链
function maxPendantLv(k){ return Math.min(k.lv||1, 4); }
// 查询任意活跃孩子是否拥有指定技能
function anySkill(name){ return state && state.kids && state.kids.some(k=>skillsActive(k) && k.skills.includes(name)); }
// 查询某个特定孩子是否拥有指定活跃技能
function kidSkill(k, name){ return skillsActive(k) && k.skills.includes(name); }
// 找到拥有某技能的孩子（用于显示「谁·Lv几·什么技能」）
function skillOwner(name){
  if(!state || !state.kids) return null;
  for(let i=0;i<state.kids.length;i++){ if(skillsActive(state.kids[i]) && state.kids[i].skills.includes(name)) return state.kids[i]; }
  return null;
}
// 生成技能触发标注：「小安 Lv2「医疗助手」」
function skillTag(name){
  const o = skillOwner(name);
  if(!o) return name;
  const d = KIDS_DEF[state.kids.indexOf(o)];
  return `${d.name} Lv${o.coreLv||1}「${name}」`;
}
// 觉醒结果弹窗
function showSkillPickResult(d, pick, drop){
  const wearStory = (WEAR_STORIES[d.id]||{})[state.kids[KIDS_DEF.indexOf(d)].coreLv] || '';
  const storyHtml = wearStory ? `<div style="background:#F3E5F5;border:1px solid #CE93D8;border-radius:10px;padding:10px;margin:8px 0;font-size:13px;line-height:1.7;white-space:pre-line;color:#4A148C">📿 ${wearStory}</div>` : '';
  const dropHtml = drop ? `<div class="hint">替换掉了：${SKILL_INFO[drop]?SKILL_INFO[drop].e:''} ${drop}</div>` : '';
  const info = SKILL_INFO[pick] || {e:'',d:''};
  showPopup(`<h3>📿 ${d.name}学会了「${pick}」</h3>${storyHtml}
    <div style="text-align:center;font-size:15px;margin:8px 0">${info.e} <b>${pick}</b></div>
    <div class="hint">${info.d}</div>${dropHtml}
    <div class="btns"><button class="primary" id="pp-cancel">太好了</button></div>`);
  const cb = $('pp-cancel'); if(cb) cb.onclick = ()=>{ closePopup(); if(typeof refreshCare==='function') refreshCare(); };
}
// 佩戴晶核项链 → 觉醒/选择技能（每孩子封顶2个技能；2/3/4阶2选1，3/4阶为替换）
function wakeKidSkill(i, targetLv){
  const k = state.kids[i], d = KIDS_DEF[i];
  const cl = k.coreLv || 0;
  if(cl >= 4){ toast(`${d.name}的潜能已全部觉醒`); return; }
  // 目标等级：玩家可在选项框里选高阶项链直接佩戴（跳过中间阶）；非法则退回下一阶
  if(!targetLv || targetLv<=cl || targetLv>4) targetLv = cl+1;
  const p = CORE_PENDANTS[targetLv];
  if((state.corePendants[targetLv]||0) <= 0){ toast(`需要 ${p.e}${p.n}`); return; }
  const cap = maxPendantLv(k);
  if(targetLv > cap){ toast(`${d.name}成长 Lv${k.lv||1} 还戴不动 ${p.n}，先多照顾 TA 攒信任、养到 Lv${targetLv} 再戴`); return; }
  // 重戴还原：之前因闹脾气脱落过、且戴回同一阶 → 直接还原原技能，不重新挑选（仍消耗一条项链）
  if(k.pendantSave && k.pendantSave.lv===targetLv && Array.isArray(k.pendantSave.skills) && k.pendantSave.skills.length){
    state.corePendants[targetLv]--;
    k.coreLv = targetLv;
    k.skills = k.pendantSave.skills.filter(n=>SKILL_INFO[n]);
    delete k.pendantSave;
    saveState();
    toast(`📿 ${d.name}重新戴上 ${p.n}，技能「${k.skills.join('、')}」恢复了`);
    return;
  }
  const pool = KID_SKILL_POOL[d.id];
  // 跳级惩罚：直接戴高阶不补发低阶技能——戴哪阶就只拿哪阶的技能。
  // （例如跳级直接戴 lv2 只拿 1 个 weak 技能；先戴 lv1 再戴 lv2 才有 base+weak 两个）
  if(targetLv === 1){
    state.corePendants[1]--; k.coreLv = 1; k.skills = [pool.base]; saveState();
    showSkillPickResult(d, pool.base, null); return;
  }
  const tier = targetLv===2 ? 'weak' : targetLv===3 ? 'mid' : 'strong';
  const cands = pool[tier].filter(n => !k.skills.includes(n) && SKILL_INFO[n]);
  if(!cands.length){ toast('没有可学的新技能了'); return; }
  const isReplace = k.skills.length >= 2;
  const itemBtn = (n, ds)=>`<button data-${ds}="${n}" class="${ds}-item" style="display:block;width:100%;margin-top:8px;padding:9px 10px;border-radius:10px;border:1px solid var(--line);background:#fff;cursor:pointer;text-align:left">
    <div style="font-size:14px">${SKILL_INFO[n].e} <b>${n}</b></div><div style="font-size:11px;color:var(--soft);margin-top:2px">${SKILL_INFO[n].d}</div></button>`;
  const renderReplace = (pick)=>{
    showPopup(`<h3>替换掉哪个技能？</h3>
      <div class="hint" style="text-align:center;margin-bottom:4px">将学会：${SKILL_INFO[pick].e} ${pick}</div>
      <div>${k.skills.map(n=>itemBtn(n,'sr')).join('')}</div>
      <div class="btns" style="margin-top:10px"><button id="sr-back">返回</button></div>`);
    document.querySelectorAll('.sr-item').forEach(b=>{
      b.onclick = ()=>{
        const drop = b.dataset.sr;
        state.corePendants[targetLv]--; k.coreLv = targetLv;
        k.skills = k.skills.filter(x=>x!==drop); k.skills.push(pick);
        saveState(); showSkillPickResult(d, pick, drop);
      };
    });
    const sb = $('sr-back'); if(sb) sb.onclick = renderCand;
  };
  function renderCand(){
    showPopup(`<h3>📿 ${d.name} — 选择要学会的技能</h3>
      <div class="hint" style="text-align:center;margin-bottom:4px">${isReplace?'技能位已满（2/2），新技能会替换掉一个旧技能':'选 1 个加入（当前 '+k.skills.length+'/2）'}</div>
      <div>${cands.map(n=>itemBtn(n,'sc')).join('')}</div>
      <div class="btns" style="margin-top:10px"><button id="sc-cancel">先不佩戴</button></div>`);
    document.querySelectorAll('.sc-item').forEach(b=>{
      b.onclick = ()=>{
        const pick = b.dataset.sc;
        if(!isReplace){ state.corePendants[targetLv]--; k.coreLv = targetLv; k.skills.push(pick); saveState(); showSkillPickResult(d, pick, null); }
        else { renderReplace(pick); }
      };
    });
    const cc = $('sc-cancel'); if(cc) cc.onclick = closePopup;
  }
  renderCand();
}

// 夜晚结算时：信任只在白天「餵食/安撫」动作即时上涨，晚上只做倒扣；满阈值自动升级
// 信任直接升級：Lv N→N+1 所需信任（灌滿自動升級、保留溢出；信任歸零不降級）
const TRUST_LV = [135,115,150,185];
// 信任达到阈值即时升级（白天动作涨信任后调用，避免进度条溢出）
function applyKidLevel(k){
  while(k.lv<5 && k.trust >= TRUST_LV[k.lv-1]){ k.trust -= TRUST_LV[k.lv-1]; k.lv++; }
  if(k.lv>=5 && k.trust>TRUST_LV[3]){ k.trust = TRUST_LV[3]; }
}
function checkKidGrowth(kids, logs){
  KIDS_DEF.forEach((d,i)=>{
    const k = kids[i];
    const wasTantrum = !!k.tantrum;
    const trustBefore = k.trust;
    // 1) 信任只在白天「餵食/安撫」动作即时上涨；晚上只做倒扣
    if(!k.down){
      if(k.fed < 40){ k.trust -= 2; }
      if(k.mood < 40){ k.trust -= 2; }
    }else{
      k.trust -= 8;
    }
    if(k.trust < 0) k.trust = 0;
    // 1.2) 闹脾气判定：只有「被倒扣到 0」才算；白天升级刚好溢出到 0 不算（用 k.tantrum 旗标，避免误显示/误掉项链）
    if(k.down){ k.tantrum = false; }
    else if(k.trust === 0 && trustBefore > 0){ k.tantrum = true; } // 今晚被扣到 0 → 进入闹脾气
    else if(k.trust > 0){ k.tantrum = false; }                     // 信任回正 → 解除
    // 1.5) 闹脾气惩罚：第一次进入时额外扣 HP+情绪
    if(k.tantrum && !wasTantrum){
      k.hp = Math.max(0, k.hp - 10);
      k.mood = 0;
      if(k.hp <= 0){ k.hp = 0; k.down = true; }
      const distrustStories = DISTRUST_STORIES[d.id] || [];
      const ds = distrustStories[rnd(0, distrustStories.length-1)] || '';
      logs.push(`💔 ${d.name} 信任归零，闹脾气摔了东西，HP-10 情绪清零！`);
      if(ds) logs.push(`📖 ${ds}`);
    }else if(k.tantrum){
      logs.push(`💔 ${d.name} 还在闹脾气，技能暂时不生效`);
    }
    // 1.6) 闹脾气：晶核项链脱落，技能失效；信任哄回来才能重戴
    if(k.tantrum && (k.coreLv||0)>0){
      const lv = k.coreLv, lost = k.skills.slice();
      k.pendantSave = {lv, skills: lost};   // 记住原技能，重戴时直接还原（不重选）
      state.corePendants[lv] = (state.corePendants[lv]||0)+1;
      k.coreLv = 0; k.skills = [];
      logs.push(`📿 ${d.name} 闹脾气，${lost.length? '「'+lost.join('、')+'」随':''}晶核项链 Lv${lv} 脱落退回晶核箱，技能失效！把信任哄回来才能重新佩戴。`);
    }
    // 2) 信任达阈值 → 直接升级（保留溢出；信任归零只清当前累积，不降级）
    while(k.lv<5 && k.trust >= TRUST_LV[k.lv-1]){
      k.trust -= TRUST_LV[k.lv-1];
      k.lv++;
      logs.push(`🌟 ${d.name} 升到 Lv${k.lv}！${(k.coreLv||0) < 4 ? '（用💎晶核可解锁技能）' : ''}`);
    }
    // 2.5) 满级后不再升级，信任封顶显示
    if(k.lv>=5 && k.trust>TRUST_LV[3]){ k.trust = TRUST_LV[3]; }
  });
}

// --- 每日事件：早上有概率触发一次 ---
function triggerDailyEvent(){
  const day = state.day;
  const pool = DAILY_EVENTS.filter(e=> day>=e.days[0] && day<=e.days[1]);
  if(!pool.length) return null;
  // 两段随机：先按总概率决定「今天有没有事件」，命中后再按各事件 p 加权独立抽取。
  // 旧实现用单 roll 顺序累加，池内 p 合计>1 时排在后面的事件被截断（早期池后3个事件实际几乎0%触发）
  const totalP = pool.reduce((a,e)=>a+e.p,0);
  if(Math.random() > Math.min(1,totalP)) return null;
  let roll = Math.random()*totalP;
  for(const ev of pool){
    roll -= ev.p;
    if(roll < 0){
      const logs = [];
      if(ev.choices){
        // 有选择分支 → 不自动执行，让玩家选
        return { ev, choices: ev.choices, logs };
      }
      // 无选择 → 自动执行 effect
      try{ ev.eff(state.kids, state, logs); }catch(err){}
      return { ev, logs };
    }
  }
  return null;
}

// 天台菜园夜间结算：标记成熟 + 乌鸦袭击
function settleGardenNight(){
  const logs = [];
  if(!state.garden) return logs;
  const plots = state.garden.plots, growing = [];
  let hasPlant = false;
  plots.forEach((p,i)=>{ if(!p) return; hasPlant=true; const need=CROP_NEED[p.c]||CROP_NEED.herb; if(state.day+1>=p.d+need){p.ready=true; logs.push('🌱 第'+(i+1)+'块地的作物成熟了，可以收获！');} else growing.push(i); });
  if(growing.length && Math.random() < 0.2){
    if(((state.placed.top && state.placed.top.birdnet)||0) > 0){ state.placed.top.birdnet--; logs.push('🕸️ 乌鸦来袭，防鸟网立功了（消耗1张）'); }
    else { const i=growing[Math.floor(Math.random()*growing.length)]; plots[i].d++; logs.push('🐦 乌鸦啄食了第'+(i+1)+'块地，作物生长变慢'); }
  }
  // 有作物时，30%概率触发菜园小故事
  if(hasPlant && Math.random() < 0.3){
    logs.push('📖 ' + pick(GARDEN_STORIES));
  }
  return logs;
}

// 度过夜晚：结算 -> 次日
function actNight(){
  // 进入夜结算：保持夜晚压暗氛围直到清晨弹窗关闭
  document.body.classList.add('night');
  const kidLogs = [], growthLogs = [], teacherLogs = [], skillLogs = [];
  let _nightGuardLogged = false, _sickHandled = false;
  const wfx = weatherFX(); // 今夜天气效果
  // 1) 孩子结算（跳过已永久死亡的孩子）
  state.kids.forEach((k,i)=>{
    if(k.dead){ return; } // 永久死亡的孩子不参与后续任何结算
    const d = KIDS_DEF[i];
    // 病症惩罚：生病不治疗每天扣血扣情绪
    if(k.sick && SICKNESSES[k.sick]){
      const s = SICKNESSES[k.sick];
      k.hp = Math.max(0, k.hp - s.hpDmg);
      k.mood = Math.max(0, k.mood - s.moodDmg);
      kidLogs.push(`${s.e} ${d.name}${s.n}没治好，健康-${s.hpDmg} 情绪-${s.moodDmg}`);
    }
    // 维生素免疫天数递减
    if((k.immuneDays||0) > 0){ k.immuneDays--; }
    k.fed -= 15;
    if(k.fed <= 0){
      k.fed = 0; k.hp -= 15; k.mood -= 10;
      kidLogs.push(`${d.name}饿着入睡，健康 -15`);
      if(k.hp <= 0 && !k.down){ k.hp = 0; k.down = true; k.downDays = 0; kidLogs.push(`💔 ${d.name}虚弱倒下！需要救治`); }
    }else if(k.fed < 30){
      k.mood -= 5; kidLogs.push(`${d.name}有点饿，情绪 -5`);
    }else{
      let mn = wfx.moodNight||0;
      if(mn < 0 && anySkill('守夜小卫士')){ mn = Math.ceil(mn/2); if(!_nightGuardLogged){ skillLogs.push('🛏️'+skillTag('守夜小卫士')+'：夜里情绪惩罚减半'); _nightGuardLogged=true; } }
      k.mood = clamp(k.mood+3+mn, 0, 100); // 天气：晴+2/阴-3/大风-2
    }
    if(!k.down && k.mood <= 0){ k.mood = 0; kidLogs.push(`${d.name}情绪很低，一直小声哭`); }
    // 倒下的孩子：每天没被救 → downDays+1，满3天永久死亡
    if(k.down){
      k.downDays++;
      kidLogs.push(`💔 ${d.name}倒下 ${k.downDays}/3 天`);
      if(k.downDays >= 3){
        k.dead = true; k.down = false;
        kidLogs.push(`💀 ${d.name} 撑了三天，还是没能活下来...`);
      }
    }
    k.comforted = false; // 每日安抚重置
    k.fedTrustGain = 0; // 每日餵食信任上限重置
    // 随机生病：每天2%概率（≈10天20%），免疫期不生病，已生病不重复
    if(!k.sick && !k.down && (k.immuneDays||0) <= 0 && Math.random() < (k.fed < 30 ? 0.04 : 0.02)){
      if(!_sickHandled && anySkill('应急处理') && Math.random() < 0.4){
        _sickHandled = true;
        skillLogs.push('🩹'+skillTag('应急处理')+'：及时处理了'+d.name+'的不适，今天没有病倒');
      } else {
        k.sick = SICK_KEYS[Math.floor(Math.random()*SICK_KEYS.length)];
        kidLogs.push(`${SICKNESSES[k.sick].e} ${d.name}${SICKNESSES[k.sick].n}了！需要${SICKNESSES[k.sick].medN}`);
      }
    }
  });
  // 1.2) 耐心倾听
  if(anySkill('耐心倾听')){
    const tgt = state.kids.find(k=>skillsActive(k) && !k.comforted);
    if(tgt){ tgt.mood = clamp(tgt.mood + 8, 0, 100); skillLogs.push('✨ '+skillTag('耐心倾听')+'：自动安抚了'+KIDS_DEF[state.kids.indexOf(tgt)].name+'（情绪+8）'); }
  }
  // 1.5) 孩子养成结算
  checkKidGrowth(state.kids, growthLogs);
  // 1.6) Lv5 每日被动
  if(anySkill('希望之心')){
    state.kids.forEach(k=>{ k.mood = clamp(k.mood + 3, 0, 100); });
    skillLogs.push('✨ '+skillTag('希望之心')+'：全队情绪 +3');
  }
  if(anySkill('天使之光')){
    state.kids.forEach(k=>{ k.hp = clamp(k.hp + 5, 0, 100); });
    skillLogs.push('✨ '+skillTag('天使之光')+'：全队 HP +5');
  }
  // 1.7) 知识之光：每日 35% 触发额外温情事件
  if(anySkill('知识之光') && Math.random() < 0.35){
    const cand = state.kids.filter(k=>skillsActive(k));
    if(cand.length){
      const k = cand[Math.floor(Math.random()*cand.length)];
      const nm = KIDS_DEF[state.kids.indexOf(k)].name;
      k.mood = clamp(k.mood+6,0,100); k.trust = clamp(k.trust+3,0,100);
      skillLogs.push('📖 '+skillTag('知识之光')+'：'+nm+'讲了个温暖的小故事（情绪+6 信任+3）');
    }
  }
  // 2) 老师结算
  const t = state.teacher;
  // 老师病症惩罚：生病时体力下降更厉害
  if(t.sick && SICKNESSES[t.sick]){
    const s = SICKNESSES[t.sick];
    t.san = Math.max(0, t.san - s.hpDmg);
    t.sta = Math.max(0, t.sta - 10);
    teacherLogs.push(`${s.e} 你${s.n}没治好，健康-${s.hpDmg} 体力-10`);
  }
  t.fed -= 20;
  if(t.fed <= 0){ t.fed = 0; t.sta -= 10; t.san -= 5; teacherLogs.push('你饿着入睡，体力 -10 健康 -5'); }
  t.sta = clamp(t.sta + 60 + (wfx.staRest||0), 0, 100); // 夜间恢复+60；雨夜助眠+8；白天还可吃东西/打体力液应急
  t.san = clamp(t.san + 3 + (wfx.sanNight||0), 0, 100); // 雷暴-2
  if(wfx.fxText && wfx.fxText!=='一切平常') teacherLogs.push(`${weatherInfo(state.weather).e} ${weatherInfo(state.weather).n}：${wfx.fxText}`);
  // 老师随机生病：每天2%，饱腹<30翻倍到4%
  if(!t.sick && Math.random() < (t.fed < 30 ? 0.04 : 0.02)){
    t.sick = SICK_KEYS[Math.floor(Math.random()*SICK_KEYS.length)];
    teacherLogs.push(`${SICKNESSES[t.sick].e} 你${SICKNESSES[t.sick].n}了！需要${SICKNESSES[t.sick].medN}`);
  }

  // 3) 丧尸夜袭
  const attackLog = zombieNightAttack();
  // 有夜袭：暗红警报光 + 弹窗震动 + 低频嘶吼鸣响
  if(attackLog){
    document.body.classList.add('raid');
    sfx('raid');
  }
  // 3.1) 夜袭情绪联动：防线被冲破孩子们受惊（每处-3，单夜最多-9）；2只以上来袭且零破损则安心+3
  if(attackLog){
    const scared = Math.min(9, attackLog.spotsDamaged*3);
    state.kids.forEach(k=>{
      if(k.dead || k.down) return;
      if(scared > 0){ k.mood = clamp(k.mood-scared, 0, 100); }
      else if(attackLog.count >= 2){ k.mood = clamp(k.mood+3, 0, 100); }
    });
    if(scared > 0){ kidLogs.push(`丧尸冲破了 ${attackLog.spotsDamaged} 处防线，孩子们吓得缩成一团，情绪-${scared}`); }
    else if(attackLog.count >= 2){ kidLogs.push('今晚有惊无险，防线守住了，孩子们安心了些 情绪+3'); }
    // 守夜耗神：每只来袭丧尸让老师少睡，体力-5（在夜间+60恢复之后结算）
    const staLost = attackLog.count*5;
    t.sta = clamp(t.sta - staLost, 0, 100);
    teacherLogs.push(`守了一夜（丧尸×${attackLog.count}），体力 -${staLost}`);
  }
  let attackHtml;
  if(attackLog){
    // 点位受损可视化：受损点位变红色
    const damagedSpots = attackLog.damagedSpots || []; // ['win','door',...]
    const spotStatus = SPOTS.map(s=>{
      const lv = state.fort[s.k];
      const isDamaged = damagedSpots.includes(s.k);
      const icon = isDamaged ? '🩸' : (lv<=0?'⚠️':'✅');
      const color = isDamaged ? '#E85C4B' : (lv<=0?'#E6A94B':'#4D7A2C');
      return `<span style="color:${color};font-size:12px">${icon}${s.e}</span>`;
    }).join(' ');
    attackHtml = `<div style="background:#FDF2F0;border:1px solid #E8C5BE;border-radius:10px;padding:10px;margin:8px 0">
      <div style="font-weight:bold;color:var(--alert);margin-bottom:4px">🧟 丧尸来袭！${attackLog.zombieEmoji}${attackLog.zombieName}×${attackLog.count}${attackLog.pierce>0?' <span style="font-size:11px">（⚠ 破防，满防也会受损）</span>':''}</div>
      ${zombieTraitText(state.day) ? `<div style="font-size:11px;color:#8B6914;background:#FFF8E1;border-radius:6px;padding:4px 8px;margin-bottom:6px">⚠️ ${zombieTraitText(state.day)}</div>` : ''}
      <div style="font-size:12px;color:var(--soft);margin-bottom:4px">建筑状态：${spotStatus}</div>
      <div style="font-size:10px;color:var(--soft);margin-bottom:4px">✅已加固　⚠️尚未加固　🩸今夜被打坏</div>
      <div style="font-size:12px">击杀 ${attackLog.killed} 只，诱走 ${attackLog.lured} 只，${attackLog.spotsDamaged} 个点位受损</div>
      <div style="font-size:11px;color:var(--soft);margin-top:4px;white-space:pre-line">${attackLog.details.map(d=>'├─ '+d).join('\n')}</div>
    </div>`;
  }else{
    attackHtml = `<div style="font-size:12px;color:var(--soft);text-align:center;padding:8px 0">🌙 今夜平安无事 —— 没有丧尸来</div>`;
  }

  // 3.5) 天台菜园结算
  const gardenLogs = settleGardenNight();

  // 4) 夜间小故事
  const story = NIGHT_STORIES[rnd(0, NIGHT_STORIES.length-1)];
  // 4.5) game-over 检查
  const deadKids = state.kids.filter(k=>k.dead).length;
  if(deadKids === 3 || state.teacher.san <= 0){
    document.body.classList.remove('raid');
    saveState(); showEnding('bad'); return;
  }
  // 5) 日期推进（清空今夜预警缓存，并刷新天气）
  state.day++; state.slot = 0; state.outCount = 0; state.failedToday = 0; state.fdSkillUsed = 0; state.weather = rollWeather(); state._nightPeek = null;
  saveState();

  // —— 分段卡片化渲染 ——
  function card(title, emoji, lines, color){
    if(!lines.length) return '';
    return `<div style="background:var(--bg,#F2F4F7);border-radius:10px;padding:8px 10px;margin-top:6px;line-height:1.5">
      <div style="font-size:12px;color:${color||'var(--soft,#666)'};font-weight:bold;margin-bottom:3px">${emoji||''} ${title}</div>
      <div style="font-size:12px;color:var(--ink,#333)">${lines.map(l=>'· '+l).join('<br>')}</div>
    </div>`;
  }

  showPopup(`
    <h3>🌙 第 ${state.day-1} 天 · 夜晚</h3>
    <div style="background:linear-gradient(135deg,#1F2937,#374151);color:#E5E7EB;border-radius:10px;padding:12px;margin:8px 0;font-size:13px;line-height:1.6;white-space:pre-line">🌑 ${story}</div>
    ${attackHtml}
    ${kidLogs.length ? card('孩子们', '🧒', kidLogs, '#6B8EAE') : ''}
    ${growthLogs.length ? card('成长', '🌟', growthLogs, '#C0842A') : ''}
    ${skillLogs.length ? card('技能触发', '✨', skillLogs, '#D8A576') : ''}
    ${teacherLogs.length ? card('老师', '👨‍🏫', teacherLogs, '#888') : ''}
    ${gardenLogs.length ? card('天台菜园', '🌱', gardenLogs, '#4D7A2C') : ''}
    <div class="btns"><button class="primary" id="pp-morning">🌅 迎来清晨</button></div>`);
  $('pp-morning').onclick = ()=>{
    // 清晨到来：撤去夜袭警报红光（夜晚压暗由 render 按 slot 自动撤去）
    document.body.classList.remove('raid');
    // 第 100 天 → 最终 BOSS 战
    if(state.day >= 100){ actFinalBoss(); return; }
    // 早上触发每日事件
    const ev = triggerDailyEvent();
    saveState();
    closePopup();
    if(ev){
      const isChoice = !!ev.choices;
      const logsRef = ev.logs;
      const evHtml = `<div style="font-size:11px;color:var(--soft);text-align:center;margin-bottom:6px">第 ${state.day} 天 · ${(()=>{const w=weatherInfo(state.weather);return w.e+' '+w.n+' — '+(weatherFX().fxText||w.flavor);})()}</div>
      <div style="background:${isChoice?'#FFF8E7':'#EAF4FC'};border:1px solid ${isChoice?'#E6C76D':'#B5D8EB'};border-radius:10px;padding:10px;margin:8px 0">
        <div style="font-weight:bold;color:${isChoice?'#99742A':'var(--accent)'};margin-bottom:4px">🌅 清晨事件${isChoice?'（你来决定）':''}</div>
        <div style="font-size:13px;white-space:pre-line;line-height:1.6">${ev.ev.t}</div>
        ${isChoice ? ev.choices.map((c,i)=>`<button id="ev-c${i}" style="display:block;width:100%;margin-top:8px;padding:8px;border-radius:8px;border:1px solid var(--line);background:#fff;color:var(--ink);border-color:var(--line);cursor:pointer;font-size:13px;text-align:left">${c.label}</button>`).join('') : `<div style="font-size:11px;color:var(--soft);margin-top:6px;white-space:pre-line">${logsRef.join('\n')}</div><div class="btns" style="margin-top:10px"><button class="primary" id="ev-close">知道了</button></div>`}
      </div>`;
      showPopup(evHtml);
      if(isChoice){
        ev.choices.forEach((c,i)=>{
          $('ev-c'+i).onclick = ()=>{
            const lgs = [];
            try{ c.eff(state.kids, state, lgs); }catch(err){}
            // 点击后跳转到全新的「结果页」：清空原事件与按钮，只显示后果 + 继续
            const resultHtml = `<div style="font-size:11px;color:var(--soft);text-align:center;margin-bottom:6px">第 ${state.day} 天</div>
              <div style="background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:10px;margin:8px 0">
                <div style="font-weight:bold;color:var(--accent);margin-bottom:6px">📜 你的选择带来了…</div>
                <div style="font-size:13px;color:var(--ink);white-space:pre-line;line-height:1.6">${lgs.map(l=>'· '+l).join('<br>')||'没什么变化...'}</div>
              </div>
              <div class="btns" style="margin-top:10px"><button class="primary" id="ev-close">继续</button></div>`;
            showPopup(resultHtml);
            $('ev-close').onclick = closePopup;
            saveState();
          };
        });
      }else{
        $('ev-close').onclick = closePopup;
      }
    }else{
      const w = weatherInfo(state.weather);
      toast(`第 ${state.day} 天的早晨来了 · ${w.e}${w.n}`);
    }
  };
}

// 时段推进：上午3节 -> 下午3节 -> 晚上（晚上由"度过夜晚"手动结束）
function nextSlot(){
  if(state.slot < NIGHT_SLOT){ state.slot++; }
  saveState(); render();
  // 进入晚上（第6节外出回家）：若今夜有尸潮，给出氛围化预警
  if(state.slot===NIGHT_SLOT) showNightWarning();
}

// 入夜观察：预警今晚是否有丧尸上门（只报氛围不报数量；2只以上才出现）
function showNightWarning(){
  const count = peekNightAttack();
  saveState();
  if(count < 2) return; // 平安夜或零星一只，不打扰玩家
  const w = weatherInfo(state.weather);
  let line;
  if(count >= 7) line = '地平线上挤满了摇晃的影子，黑压压一片……<br>数量多到你不敢数。死守到天亮！';
  else if(count >= 4) line = '远处的脚步声密得像雨点，还夹着低哑的嘶吼……<br>今晚会有一场恶战。';
  else line = '窗外的巷子里传来拖拽声和粗重的呼吸……<br>有东西盯上这里了，它们今晚会来。';
  const extra = state.weather==='storm'
    ? '<br><span style="color:var(--alert)">⛈️ 雷暴夜里丧尸格外躁动，声音诱饵也会失效。</span>'
    : state.weather==='fog' ? '<br>🌫️ 大雾或许能帮你藏住一些动静。'
    : state.weather==='rain' ? '<br>🌧️ 雨声也许能盖住你们的声响。' : '';
  const trait = zombieTraitText(state.day);
  const traitHtml = trait ? `<div style="background:#FFF8E1;border:1px solid #E0C97F;border-radius:8px;padding:8px 10px;margin:6px 0;font-size:12px;color:#8B6914;text-align:left">⚠️ ${trait}</div>` : '';
  showPopup(`<h3>🌆 入夜观察</h3>
    <div style="background:linear-gradient(135deg,#2C3E50,#4A5A6A);color:#EAF0F6;border-radius:10px;padding:12px;margin:8px 0;font-size:13px;line-height:1.7;text-align:center">你站在窗边，最后看了一眼楼下。<br>${line}</div>
    ${traitHtml}
    <div class="hint">${w.e} ${w.n} · ${wfx_safe()}${extra}</div>
    <div class="btns"><button class="primary" id="nw-ok">守好门窗</button></div>
    <div class="btns" style="margin-top:6px"><button id="nw-fortify">🔧 趁还有时间去加固/布防</button></div>`);
  function wfx_safe(){ return (weatherFX().fxText||''); }
  $('nw-ok').onclick = closePopup;
  $('nw-fortify').onclick = ()=>{ closePopup(); actFortify(); };
}

/* ---------- 第 6 阶段：最终 BOSS 战 + 多结局 ---------- */

// 第 100 天 BOSS 战：3 波攻击，击败后进入结局
function actFinalBoss(){
  const logs = [];
  const liveKids = state.kids.filter(k=>!k.down).length;

  // 小安Lv4 夜间守护必定触发（BOSS战）
  let guardBonus = anySkill('夜间守护') ? 2 : 0;

  // ---- 第 1 波：常规尸潮增强版 ----
  let wave1 = 6 + Math.floor(state.day/10); // 约 16 只
  const wave1Html = simulateBossWave('第1波·尸潮', wave1, 'random', guardBonus, logs);

  // ---- 第 2 波：尸王 BOSS ----
  let bossHp = 8; // BOSS HP：每被有效攻击一次-1
  const BOSS_DMG = 3; // BOSS 伤害：每只3点（是T4猎手的1.5倍）
  let bossLogs = [`👑 尸王带着它的王冠走来了...`];

  // BOSS 攻击：优先攻击防御**最高**的点位（想拆掉你最强的防线）
  for(let hit=0; hit<2; hit++){ // BOSS 每回合 2 次攻击
    const target = SPOTS.reduce((max,sp)=> spotDefense(sp.k) > spotDefense(max.k) ? sp : max, SPOTS[0]).k;
    let dmg = Math.max(0, BOSS_DMG + hit - spotDefense(target) - guardBonus);
    if(dmg > 0 && anySkill('敏捷闪避')){ dmg = Math.ceil(dmg/2); }
    if(dmg > 0){
      const lvDown = Math.ceil(dmg / 2);
      const oldLv = state.fort[target];
      if(oldLv >= 0){ if(!state.fortBase) state.fortBase = {}; state.fortBase[target] = oldLv; } // 记住破损前等级
      state.fort[target] = Math.max(-2, state.fort[target] - lvDown);
      bossLogs.push(`💥 ${SPOTS.find(s=>s.k===target).e}${SPOTS.find(s=>s.k===target).n} 被尸王重击！${lvText(oldLv)}→${lvText(state.fort[target])}(-${lvDown}级)`);
    }else{
      bossLogs.push(`🛡️ ${SPOTS.find(s=>s.k===target).e}防御挡住了尸王的${hit===0?'左爪':'右爪'}`);
    }
  }
  if(guardBonus > 0){ bossLogs.push(`🛡️夜间守护+2防御`); }

  // 设备合力攻击 BOSS：检查每个点位的设备是否能对 BOSS 造成伤害
  SPOTS.forEach(sp=>{
    const placed = state.placed[sp.k]||{};
    const line = [];
    if(bossHp <= 0) return;
    while(placed.shock > 0 && state.inv.bat > 0 && bossHp > 0){
      state.inv.bat--; bossHp -= 2; line.push(`⚡电击网轰向尸王(-2)`);
    }
    while(bossHp > 0 && placed.flame > 0){
      bossHp -= 1; placed.flame--; line.push(`🔥火焰桶烧中尸王(-1)`);
    }
    while(bossHp > 0 && placed.trap > 0){
      bossHp -= 1; placed.trap--; line.push(`🪤捕兽夹夹住尸王(-1)`);
    }
    while(bossHp > 0 && placed.acid > 0){
      bossHp -= 1; placed.acid--; line.push(`🧪腐蚀瓶泼中尸王(-1)`);
    }
    if(line.length){ bossLogs.push(`📌 ${sp.e}${sp.n}：${line.join('，')}`); }
  });

  let bossHtml = '';
  if(bossHp <= 0){
    bossHtml = `<div style="background:#F2FAEC;border:1px solid #B3D78A;border-radius:10px;padding:10px;margin:8px 0">
      <div style="font-weight:bold;color:#4D7A2C;margin-bottom:4px">👑 尸王倒下了！</div>
      <div style="font-size:12px;white-space:pre-line">${bossLogs.join('\n')}</div></div>`;
    logs.push('👑 你击败了尸王！');
  }else{
    bossHtml = `<div style="background:#FDF2F0;border:1px solid #E8C5BE;border-radius:10px;padding:10px;margin:8px 0">
      <div style="font-weight:bold;color:var(--alert);margin-bottom:4px">👑 尸王还在！剩余HP ${bossHp}</div>
      <div style="font-size:12px;white-space:pre-line">${bossLogs.join('\n')}</div></div>`;
    logs.push(`👑 尸王还在，剩余HP ${bossHp}，但它开始撤退了`);
  }

  // ---- 第 3 波：BOSS 残兵（只在 BOSS 未被击败时）----
  let wave3Html = '';
  if(bossHp > 0){
    const wave3 = Math.max(3, wave1 / 2 | 0);
    wave3Html = simulateBossWave('第3波·残兵', wave3, 'random', guardBonus, logs);
  }

  // 玩家状态最终结算（BOSS战之后）
  // 倒下/HP归零的孩子在 BOSS 战中没有时间救治 → 直接永久死亡
  state.kids.forEach((k,i)=>{
    if(k.dead){ return; }
    if(k.hp <= 0){
      k.hp = 0; k.down = false; k.dead = true;
      // 判断死因：如果 downDays 已经 ≥ 3，是之前就没救满；否则是 BOSS 战新倒下
      if(k.downDays >= 3){ k._deathReason = 'downDays'; }
      else { k._deathReason = 'boss'; }
      k._deathDay = state.day;
      logs.push(`💀 ${KIDS_DEF[i].name} ${k._deathReason==='downDays'?`倒下了${k.downDays}天没能撑到最后`:`在尸王的攻势中倒下`}，没能撑到黎明...`);
    }else if(k.down){
      k._deathReason = 'boss'; k._deathDay = state.day;
      k.downDays = 3; k.down = false; k.dead = true;
      logs.push(`💀 ${KIDS_DEF[i].name} 倒下没来得及救治，在最终决战中没能撑住...`);
    }
  });
  const deadCount = state.kids.filter(k=>k.dead).length;
  if(deadCount === 3 || state.teacher.san <= 0){
    saveState(); showEnding('bad'); return;
  }

  saveState();
  showPopup(`
    <h3>👑 第 100 天 · 最终决战</h3>
    ${wave1Html}
    ${bossHtml}
    ${wave3Html}
    <div class="story" style="font-size:12px">${logs.join('\n')}</div>
    <div class="btns"><button class="primary" id="boss-end">迎接黎明</button></div>`);
  $('boss-end').onclick = ()=>{ saveState(); showEnding(); };
}

// BOSS 战里的小波次复用函数
function simulateBossWave(name, count, targetMode, guardBonus, logs){
  const spotLogs = [];
  SPOTS.forEach(sp=>{ spotLogs.push(0); });
  const doorSpots = ['door','win','back'];
  for(let i=0; i<count; i++){
    let target;
    if(targetMode==='weak'){
      // 与夜袭同一套逻辑：先洗牌再排序，避免平局时永远锁定窗户+大门
      const pool = SPOTS.slice();
      for(let j=pool.length-1; j>0; j--){ const r = rnd(0, j); const tmp = pool[j]; pool[j] = pool[r]; pool[r] = tmp; }
      const sorted = pool.sort((a,b)=> spotDefense(a.k) - spotDefense(b.k));
      const weakSpots = sorted.slice(0, 2).map(sp=>sp.k);
      target = weakSpots[rnd(0, weakSpots.length-1)];
    }else if(targetMode==='door'){
      target = doorSpots[rnd(0, doorSpots.length-1)];
    }else{
      target = SPOTS[rnd(0, SPOTS.length-1)].k;
    }
    const idx = SPOTS.findIndex(s=>s.k===target);
    spotLogs[idx]++;
  }
  // 简化结算：直接伤害
  const details = [];
  let totalDmg = 0;
  SPOTS.forEach((sp, idx)=>{
    let zombies = spotLogs[idx];
    if(zombies <= 0) return;
    let dmg = Math.max(0, zombies - spotDefense(sp.k) - guardBonus);
    if(anySkill('敏捷闪避')){ dmg = Math.ceil(dmg/2); }
    if(dmg > 0){
      const lvDown = Math.ceil(dmg / 2);
      const oldLv = state.fort[sp.k];
      if(oldLv >= 0){ if(!state.fortBase) state.fortBase = {}; state.fortBase[sp.k] = oldLv; } // 记住破损前等级
      state.fort[sp.k] = Math.max(-2, state.fort[sp.k] - lvDown);
      details.push(`${sp.e}${sp.n}(${zombies}只)：${lvText(oldLv)}→${lvText(state.fort[sp.k])}`);
      totalDmg += zombies;
    }else{
      details.push(`${sp.e}${sp.n}(${zombies}只)：防御挡住了`);
    }
  });
  logs.push(`> ${name}：来${count}只，共伤害${totalDmg}次`);
  return `<div style="background:#FDF2F0;border:1px solid #E8C5BE;border-radius:10px;padding:10px;margin:8px 0">
    <div style="font-weight:bold;color:var(--alert);margin-bottom:4px">🟣 ${name} 来袭！</div>
    <div style="font-size:12px;white-space:pre-line">${details.map(d=>'├─ '+d).join('\n')}</div></div>`;
}

// 结局判定 + 渲染（按 dead 状态分 8 路分支）
function showEnding(forcedType){
  // 活 = 没 dead 且没 down。down 的孩子在结局按"存活但重伤不能动"处理
  const alive = state.kids.map((k,i)=>k.dead ? -1 : i); // -1 代表死了
  const deadIdxs = state.kids.map((k,i)=>k.dead ? i : -1).filter(i=>i>=0);
  const liveIdxs = state.kids.map((k,i)=>!k.dead ? i : -1).filter(i=>i>=0);
  const defTotal = SPOTS.reduce((s,sp)=> s + Math.max(0, spotDefense(sp.k)), 0);
  const san = state.teacher.san;
  const totalLv = state.kids.reduce((s,k)=> k.dead ? 0 : s + k.lv, 0);
  const maxLvPerKid = state.kids.reduce((m,k)=> k.dead ? m : Math.max(m,k.lv), 1);

  // 活着的孩子名字简写
  const nameOf = i => KIDS_DEF[i].name;
  const aliveNames = liveIdxs.map(nameOf);
  const deadNames = deadIdxs.map(nameOf);

  // 强制类型优先（game-over 时）
  let type = forcedType;

  // 坏结局：老师健康崩了 或 全部孩子都死了
  if(!type){
    if(liveIdxs.length === 0 || san <= 0) type = 'bad';
    // 好/隐藏：按活着的孩子数量和等级
    else if(liveIdxs.length === 3){
      if(totalLv >= 10 && defTotal >= 50) type = 'hidden';
      else type = 'true';
    }else if(liveIdxs.length === 2){ type = 'good'; }
    else if(liveIdxs.length === 1){ type = 'normal'; }
    else type = 'bad';
  }

  // 辅助：根据 _deathReason 生成每个死者的具体描述（必须在 endingStories 之前定义）
  // 不同孩子用不同的伤势描述，避免重复
  const downDaysLines = [
    `${nameOf(0)}高烧不退，你用湿毛巾一遍遍敷他/她的额头，可是体温怎么也降不下来。`,
    `${nameOf(1)}的伤口感染发黑，你把能想到的办法都试了，可是还是没能控制住。`,
    `${nameOf(2)}一直昏迷着，你守在床边一勺一勺喂水，可是他/她再也没有醒过来。`,
  ];
  const bossLines = [
    `最后的尸王攻势里，${nameOf(0)}没能躲开那一下重击，小小的身体飞了出去。`,
    `尸王撞破防线的瞬间，${nameOf(1)}被掀飞出去，再也没能站起来。`,
    `尸王的利爪扫过，${nameOf(2)}被推到了墙角，等你冲过去已经晚了。`,
  ];
  const deadDetails = deadIdxs.map(i=>{
    const k = state.kids[i];
    if(k._deathReason === 'downDays'){
      return downDaysLines[i] || `${nameOf(i)}没能撑过去，你想尽了办法，可是还是没能留住他/她。`;
    }else if(k._deathReason === 'boss'){
      return bossLines[i] || `最后的尸王攻势里，${nameOf(i)}没能撑住。`;
    }else if(k.down){
      return `${nameOf(i)}一直倒着，你没来得及给他/她足够的治疗。`;
    }else{
      return `${nameOf(i)}没能撑过去。`;
    }
  });
  // 坏结局的开篇根据死因动态变化
  const badCause =
    deadIdxs.length === 3 ? '三个孩子，一个接一个，没能撑过去。' :
    (deadIdxs.length > 0 ? `第 100 天之前，事情就开始变坏了。` :
    (san <= 0 ? '你撑不住了。' : '一切在某个平凡的夜晚结束了。'));

  const endingStories = {
    hidden: {
      title:'👑 孩子们的未来', bg:'#FDF7E8', border:'#E6C76D', color:'#99742A',
      banner:'👑✨🌟✨👑', grad:'linear-gradient(160deg,#FDF7E8 0%,#F5E6A8 45%,#E8C84A 75%,#D4A830 100%)',
      story:`第 100 天的太阳升起来了。\n
你推开幼儿园的大门——门外的世界变了，但这扇门，还在为你们开着。\n
没人的父母来接他们了。第 100 天，你终于明白——他们的父母，或许已经在丧尸的队伍里了。窗外偶尔有身影蹒跚走过，其中一个的姿态……你不敢细看。\n
没关系。你们三个，就是彼此的家人。这所幼儿园，就是家。\n
${nameOf(0)}跟着你学包扎，小手举着棉签递过来，认真得像在做一件天大的事；\n${nameOf(1)}帮你扶着木板、递钉子，小锤子敲得有模有样，说要把家守得牢牢的；\n${nameOf(2)}翻着缺了半本的教科书，拉着你的衣角问："老师，这个字念什么？"\n
你把黑板擦干净，用半截粉笔写下今天的课。\n
课本已经残缺不全，但你知道该教他们什么——\n
不是怎么打丧尸，而是和平的日子里，一个孩子该学会的东西：\n
认字、数数、分享、对人说"你好"和"谢谢"。\n
他们还小，但总会长大。\n
只要幼儿园还在，课就还会上下去。`,
    },
    true: {
      title:'🌟 黎明曙光', bg:'#EAF4FC', border:'#B5D8EB', color:'#2C6E9C',
      banner:'🌅🕊️☁️🕊️🌅', grad:'linear-gradient(160deg,#EAF4FC 0%,#CDE7F7 60%,#A9D4EF 100%)',
      story:`第 100 天结束了。你们三个，都活下来了。\n
没有人来接。${aliveNames[0]}拉着你的衣角问："老师，爸爸妈妈是不是忘了我们住哪儿？"\n
你张了张嘴，不知道该怎么回答。\n
${aliveNames[1]}把头埋进你怀里，${aliveNames[2]}紧紧攥着你的另一只手。\n
远处有烟升起，有直升机的声音从云层里传来——不确定是好事还是坏事。但至少，这是第一次听到除了嘶吼以外的声音。\n
"走吧"，你说。\n
你帮三个孩子背上小背包，一手牵着一个，第三个拉着前一个的衣角，走出了幼儿园的铁门。\n
身后是你守了一百天的家。前方是未知的世界。`,
    },
    // 好结局：活 2 人。每个死去的孩子写具体死因
    good: {
      title:'🌅 还剩两个人', bg:'#F2FAEC', border:'#B3D78A', color:'#4D7A2C',
      banner:'🌿🌻🌱🌻🌿', grad:'linear-gradient(160deg,#F2FAEC 0%,#DCEEC4 60%,#C4E29E 100%)',
      story:`第 100 天的最后一夜，你失去了${deadNames.join('')}。\n
${deadDetails.join('\n')}\n
天亮的时候，${aliveNames[0]}牵着你的手，走过空无一人的走廊。\n
路过${deadNames.join('')}的小床时，${aliveNames[1]}仰起小脸问："老师，他/她是睡着了吗？什么时候醒过来跟我们玩？"\n
你在后院给${deadNames.join('')}种下了一棵小苗。\n
"等它长高了，他/她就回来跟你们玩了"，你说。\n
两个孩子都认真地点了点头。\n
幼儿园的围墙还在，大门还锁着。\n
${aliveNames[0]}帮你把松动的木板重新钉好，${aliveNames[1]}蹲在地上，把碎玻璃一片一片扫进簸箕。\n
他们还小，但已经知道，这个家需要一起守。\n
你摸了摸两个孩子的头。\n
只要还有人在，幼儿园就还在。`,
    },
    normal: {
      title:'😢 守住这扇门', bg:'#F5F5F0', border:'#C8C8C0', color:'#666',
      banner:'🏚️🌱🚶🌱🏚️', grad:'linear-gradient(160deg,#F5F5F0 0%,#E8E8E0 60%,#D8D8D0 100%)',
      story:`${deadNames.join('、')}都没能撑过那一夜。\n
${deadDetails.join('\n')}\n
你在后院的草地上，给他们种下了两棵小苗。\n
"等它们长成大树，你们就在树荫下凉快"，你轻声说。\n
风一吹，小苗晃了晃，好像听懂了。\n
只有${aliveNames[0]}一个人还活着。\n
你打来水，给他/她擦干净脸上的血渍，涂上药膏。他/她一直盯着后院的方向，一句话也不说。\n
幼儿园的围墙还在，大门还锁着。\n
外面是丧尸的世界，但这里，还是你们的家。\n
你牵起他/她的小手，走回教室。\n
黑板上还留着昨天没写完的字。\n
只要还有人在，幼儿园就还在。`,
    },
    bad: {
      title:'💀 最后的夜晚', bg:'#2A2A2A', border:'#555', color:'#DDD',
      banner:'💀🌑🩸🌑💀', grad:'linear-gradient(160deg,#2A2A2A 0%,#1F1F28 60%,#15151C 100%)',
      story:`${badCause}\n
${deadNames.length > 0 ? `${deadNames.join('、')}离开了你。\n${deadDetails.join('\n')}` : ''}\n
${san <= 0 ? '你也在某个瞬间崩溃了，抱着孩子们坐在天台上，直到天亮。\n' : ''}\n
你把他们放在天台上，排得整整齐齐，像他们平时午睡的样子。\n
幼儿园的灯光亮到了最后一刻，然后——`,
    },
  };

  const ed = endingStories[type] || endingStories.bad;

  state.ending = { type, day: state.day, totalLv, defTotal, deadCount: deadIdxs.length };
  // 写入结局收集图鉴（独立存档、跨周目累计）
  recordEnding(type, {
    type, day: state.day, totalLv, defTotal,
    kids: state.kids.map((k,i)=>({ name: KIDS_DEF[i].name, dead: k.dead, lv: k.dead ? 0 : k.lv })),
  });
  saveState();
  // 结局落盘后再静默上报排行榜（不阻塞结算流程）
  rankMaybeSubmit();

  const kidsDesc = state.kids.map((k,i)=>{
    if(k.dead) return `${nameOf(i)}💀`;
    if(k.down) return `${nameOf(i)}🏥`;
    return `${nameOf(i)}(Lv${k.lv})✨`;
  }).join('　');

  // 隐藏结局专属视觉强化
  const isHidden = type==='hidden';
  const wrapStyle = isHidden
    ? 'background:#FEFCF5;border-radius:16px;margin:-16px;padding:16px;animation:edGlowPulse 3s ease-in-out infinite;'
    : '';
  const statColor = isHidden ? '#8B7B5A' : (type==='bad' ? '#AAA' : '#888');

  showPopup(`
    <div style="${wrapStyle}">
    <div style="background:${ed.grad};border-radius:14px 14px 0 0;padding:14px;margin:${isHidden?'0':'-16px -16px 0 -16px'}">
      ${endingCG(type)}
      <h3 style="color:${ed.color};text-align:center;font-size:19px;margin:4px 0 10px;text-shadow:0 1px 2px rgba(255,255,255,.5)">${ed.title}</h3>
      <div style="background:${ed.bg};border:1px solid ${ed.border};border-radius:12px;padding:14px 12px;margin:8px 0;color:${ed.color};white-space:pre-line;font-size:13.5px;line-height:1.75;box-shadow:inset 0 1px 3px rgba(0,0,0,.06)">${ed.story}</div>
    </div>
    <div style="background:${type==='bad'?'#3A3A3A':(isHidden?'#FDF9EE':'#F8F8F2')};border-radius:10px;padding:10px 12px;margin:10px 0 4px;font-size:12px;color:${statColor};border:1px dashed ${ed.border}">
      <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>📅 存活天数</span><b style="color:${ed.color}">${state.day} 天</b></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>🛡️ 总防御 / ❤️ 健康</span><b style="color:${ed.color}">${defTotal}/96 · ${san}</b></div>
      <div style="display:flex;justify-content:space-between"><span>👨‍👧‍👦 孩子状态</span><b style="color:${ed.color};font-size:11px">${kidsDesc}</b></div>
    </div>
    <div class="btns" style="margin-top:12px;gap:8px">
      <button class="primary" id="ed-restart" style="flex:1;min-height:48px;background:${ed.color};color:${type==='bad'?'#1A1A1A':'#fff'};border:none;border-radius:10px;font-size:14px;cursor:pointer">🔄 重新开始</button>
      <button id="ed-close" style="flex:1;min-height:48px;background:${type==='bad'?'#444':'#fff'};color:${ed.color};border:1.5px solid ${ed.border};border-radius:10px;font-size:14px;cursor:pointer">关闭</button>
    </div>
    ${posterAvailable()? `<div class="btns" style="margin-top:8px"><button id="ed-poster" style="flex:1;min-height:44px;background:#fff;color:${ed.color};border:1.5px solid ${ed.border};border-radius:10px;font-size:13px;cursor:pointer">🖼 生成海报</button></div>`:''}
    ${rankAvailable()? `<div class="btns" style="margin-top:8px"><button id="ed-rank" style="flex:1;min-height:44px;background:#fff;color:${ed.color};border:1.5px solid ${ed.border};border-radius:10px;font-size:13px;cursor:pointer">🏆 看看大家打出几个结局</button></div>`:''}
    </div>`);

  setTimeout(()=>{
    document.querySelectorAll('.actions button').forEach(b=>{ b.disabled = true; b.style.opacity='.4'; });
  }, 50);

  $('ed-restart').onclick = ()=>{
    clearSave(); state = null; location.reload(); // 重开同时清备份，避免残留旧档
  };
  $('ed-close').onclick = ()=>{ closePopup(); render(); };
  const edRank = $('ed-rank');
  if(edRank) edRank.onclick = ()=>showRankBoard(()=>showEnding(type));
  const edPoster = $('ed-poster');
  if(edPoster) edPoster.onclick = ()=>showPoster(type);
}

/* ================= 结局海报：canvas 1080×1440 → writeTempFile → postNote =================
   仅新增：不改结局判定、存档结构、其它界面。
   能力按小工具文档（js-api.md）：postNote({title,content,pageType,mediaInfo.image_resources[{url}]})、
   writeTempFile({data}) 返回 {filePath}；图片字段接受 data URI 或本地路径。 */
const POSTER_ENDINGS = {
  hidden:{ banner:'👑 ✨ 🌟 ✨ 👑', name:'孩子们的未来', line:'一百天后，我决定不教他们打丧尸，教他们做孩子。',
           bg:['#FDF7E8','#F5E6A8','#E0BE55'], ink:'#5E4713', soft:'#8C6F2E', accent:'#B98D2A' },
  true:{ banner:'🌅 🕊 ☁ 🕊 🌅', name:'黎明曙光', line:'一百天。三个人都活着。门外第一次传来不是嘶吼的声音。',
         bg:['#F2F9FE','#D7EBF9','#B4D8EF'], ink:'#1E4F72', soft:'#4B7E9E', accent:'#3C87B8' },
  good:{ banner:'🌿 🌻 🌱 🌻 🌿', name:'还剩两个人', line:'我带走了两个孩子，把另一个种在了后院。',
         bg:['#F7FCF2','#E3F1D2','#CBE5AA'], ink:'#3F6626', soft:'#63874A', accent:'#5B8C34' },
  normal:{ banner:'🏚 🌱 🚶 🌱 🏚', name:'守住这扇门', line:'只剩一个人了。门还锁着，幼儿园还在。',
           bg:['#FAFAF6','#EDEDE6','#DCDCD2'], ink:'#4A4A44', soft:'#7A7A72', accent:'#6E6E66' },
  bad:{ banner:'💀 🌑 🩸 🌑 💀', name:'最后的夜晚', line:'灯亮到最后一刻，然后就没有然后了。',
        bg:['#2E2E36','#212129','#141419'], ink:'#E8E4DA', soft:'#A9A49A', accent:'#C98A6A' }
};

// 配文：A 为默认版本，切换只改下面这一个常量（'A' / 'B' / 'C'）
const POSTER_COPY_DEFAULT = 'A';
const POSTER_COPY = {
  A:{ title:'100天里，我每天都在放弃点什么', content: p=>
`末日第 1 天，我捡了三罐奶粉，没拿那盒饼干。
第 20 天，我把最后一支退烧药给了发烧的孩子，自己硬扛了一夜。
第 60 天，我放弃了去更远的地方找物资，因为回来晚了，孩子会哭。
第 ${p.day} 天，我走到了「${p.name}」。
这个游戏从来不问你能不能赢，只问你愿意拿什么去换：一个老师，三个孩子，一所守了一百天的幼儿园。每天只有几段体力，物资永远不够分，墙永远修不完，孩子永远在生病和饿之间来回。
没有正确答案，每一次选择都是把另一样东西放进"以后再说"的名单，而末日里，"以后"常常不会来。
五个结局，我解锁了 ${p.unlocked}/5。剩下那些，大概要换一种活法才能走到。
#末日生存 #多结局 #文字游戏 #带娃日常 #剧情游戏` },
  B:{ title:'末日里最难的不是打丧尸，是哄睡', content: p=>
`都说末日生存游戏是打怪、囤物资、修围墙。
我玩到的版本是：早上六点爬起来排队接水，上午带娃去超市，中午回来做饭，下午修窗户，晚上一边听丧尸撞门，一边给三个小孩讲故事哄睡。
最紧张的时刻不是丧尸破门，是发现小念发烧了，而我手里只剩一支退烧药，另外两个孩子也在咳嗽。
他们会因为一颗糖开心一整天，也会因为你三天没陪他们而闹脾气、信任归零。孩子不是数值，是这个游戏里最贵的资源。
一百天，我在第 ${p.day} 天走到了「${p.name}」，已经解锁 ${p.unlocked}/5 个结局。
#末日生存 #模拟经营 #带娃 #治愈系游戏 #独立游戏` },
  C:{ title:'同一道选择题，五个不同的结局', content: p=>
`第一次通关，我只剩一个人活着出来，结局是「守住这扇门」。
第二次改策略：放弃扩建天台，把资源全砸在医疗和孩子情绪上，活下来两个。
后来才知道还有隐藏结局——不是打赢多少次夜袭，而是你有没有在第一百天，还记得教他们认字、数数、说谢谢。
这游戏的狠劲在于：它不给你最优解。修墙的木头和做饭的柴是同一批，陪孩子的时间和出门找药的时间是同一段体力。你永远在拆东墙补西墙。
这次我走到的是「${p.name}」，五个结局收集到 ${p.unlocked}/5。
#多结局 #剧情向游戏 #末日生存 #文字冒险 #游戏安利` }
};

function posterApi(){ const x = window.xhs; return (x && x.miniTool) || null; }
// 能力探测：缺 postNote / writeTempFile 就整块不渲染（低版本打开不报错）
function posterAvailable(){
  const mt = posterApi();
  return !!(mt && typeof mt.postNote === 'function' && typeof mt.writeTempFile === 'function');
}
// 回调 / Promise 双通道调用，12s 兜底，失败不崩
function posterCall(name, args){
  return new Promise((resolve,reject)=>{
    const mt = posterApi();
    if(!mt || typeof mt[name] !== 'function'){ reject({ errMsg:name + ':missing' }); return; }
    let done = false;
    const ok = r=>{ if(!done){ done = true; resolve(r || {}); } };
    const no = e=>{ if(!done){ done = true; reject(e || { errMsg:name + ':fail' }); } };
    try{
      const maybe = mt[name](Object.assign({}, args, { success:ok, fail:no }));
      if(maybe && typeof maybe.then === 'function') maybe.then(ok, no);
      setTimeout(()=>{ if(!done){ done = true; reject({ errMsg:name + ':timeout' }); } }, 12000);
    }catch(e){ no(e); }
  });
}

function posterCopy(type){
  const p = { day: state.day, name: (POSTER_ENDINGS[type] || POSTER_ENDINGS.normal).name, unlocked: totalEndings() };
  const src = POSTER_COPY[POSTER_COPY_DEFAULT] || POSTER_COPY.A;
  return { title: src.title, content: (typeof src.content === 'function') ? src.content(p) : String(src.content || '') };
}

// 绘制 1080×1440 海报
function buildPosterCanvas(type){
  const e = POSTER_ENDINGS[type] || POSTER_ENDINGS.normal;
  const dark = (type === 'bad');
  const W = 1080, H = 1440;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');

  function rr(x,y,w,h,r){
    if(ctx.roundRect){ ctx.beginPath(); ctx.roundRect(x,y,w,h,r); return; }
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
  }
  function textAt(cx,y,text,font,color,shadow){
    ctx.font = font; ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if(shadow){ ctx.shadowColor = shadow; ctx.shadowBlur = 26; }
    ctx.fillText(text, cx, y);
    ctx.shadowBlur = 0;
  }
  function wrap(text, maxW, font){
    ctx.font = font;
    const out = []; let line = '';
    for(const ch of text){
      if(ctx.measureText(line + ch).width > maxW){ out.push(line); line = ch; } else line += ch;
    }
    if(line) out.push(line);
    return out;
  }

  // 背景
  const g = ctx.createLinearGradient(0,0,W*0.7,H);
  g.addColorStop(0,e.bg[0]); g.addColorStop(.55,e.bg[1]); g.addColorStop(1,e.bg[2]);
  ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
  const rg = ctx.createRadialGradient(W*0.82,H*0.16,20,W*0.82,H*0.16,520);
  rg.addColorStop(0, dark ? 'rgba(200,120,90,.22)' : 'rgba(255,255,255,.75)');
  rg.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle = rg; ctx.fillRect(0,0,W,H);

  // 细边框
  ctx.strokeStyle = dark ? 'rgba(255,255,255,.16)' : 'rgba(90,70,30,.16)';
  ctx.lineWidth = 2; rr(36,36,W-72,H-72,26); ctx.stroke();

  // 顶部游戏名 + 天数
  const day = state.day;
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.font = '600 38px "PingFang SC","Noto Sans SC",sans-serif';
  ctx.fillStyle = e.ink;
  ctx.fillText('末 日 带 娃 1 0 0 天', 84, 128);
  ctx.font = '400 26px "PingFang SC","Noto Sans SC",sans-serif';
  ctx.fillStyle = e.soft; ctx.textAlign = 'right';
  ctx.fillText('KINDERGARTEN · DAY ' + day, W-84, 128);
  ctx.textAlign = 'left';
  ctx.strokeStyle = dark ? 'rgba(255,255,255,.18)' : 'rgba(90,70,30,.18)';
  ctx.beginPath(); ctx.moveTo(84,176); ctx.lineTo(W-84,176); ctx.stroke();

  // 结局 banner / 结局名 / 一句话
  textAt(W/2, 300, e.banner, '76px "Apple Color Emoji","Segoe UI Emoji",sans-serif', e.ink);
  textAt(W/2, 424, e.name, '700 92px "Kaiti SC","STKaiti","PingFang SC",serif', e.ink,
         dark ? 'rgba(255,180,120,.35)' : 'rgba(255,255,255,.8)');
  const lines = wrap(e.line, 780, '400 40px "PingFang SC","Noto Sans SC",sans-serif');
  lines.slice(0,2).forEach((ln,i)=>textAt(W/2, 528 + i*58, ln, '400 40px "PingFang SC","Noto Sans SC",sans-serif', e.soft));

  // 三张孩子卡
  const cardW = 268, cardH = 208, gap = 34;
  const startX = (W - (cardW*3 + gap*2)) / 2;
  state.kids.slice(0,3).forEach((k,i)=>{
    const x = startX + i*(cardW+gap), y = 690;
    const alive = !k.dead, down = !!(k.down && !k.dead);
    const nm = (typeof KIDS_DEF !== 'undefined' && KIDS_DEF[i]) ? KIDS_DEF[i].name : ('孩子' + (i+1));
    ctx.fillStyle = dark ? 'rgba(255,255,255,.07)' : 'rgba(255,255,255,.62)';
    rr(x,y,cardW,cardH,22); ctx.fill();
    ctx.strokeStyle = dark ? 'rgba(255,255,255,.14)' : 'rgba(90,70,30,.14)';
    ctx.lineWidth = 1.5; rr(x,y,cardW,cardH,22); ctx.stroke();
    const cx = x + cardW/2;
    textAt(cx, y+62, nm, '600 44px "PingFang SC","Noto Sans SC",sans-serif', e.ink);
    textAt(cx, y+122, alive ? ('Lv.' + k.lv) : '💀',
           alive ? '700 40px "PingFang SC","Noto Sans SC",sans-serif' : '44px "Apple Color Emoji",sans-serif',
           alive ? e.accent : e.soft);
    textAt(cx, y+172, alive ? (down ? '受伤' : '平安') : '离开了', '400 28px "PingFang SC","Noto Sans SC",sans-serif', e.soft);
  });

  // 三格数据：存活天数 / 活下来几个 / 已收集 x/5
  const aliveCnt = state.kids.filter(k=>!k.dead).length;
  const stats = [['存活天数','第 ' + day + ' 天'], ['活下来的孩子', aliveCnt + ' / 3'], ['已解锁结局', totalEndings() + ' / 5']];
  const sw = 288, sx = (W - (sw*3 + 24*2)) / 2;
  stats.forEach((s,i)=>{
    const x = sx + i*(sw+24), y = 972;
    ctx.fillStyle = dark ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.55)';
    rr(x,y,sw,120,18); ctx.fill();
    textAt(x + sw/2, y+42, s[0], '400 26px "PingFang SC","Noto Sans SC",sans-serif', e.soft);
    textAt(x + sw/2, y+85, s[1], '700 40px "PingFang SC","Noto Sans SC",sans-serif', e.ink);
  });

  // 底部：左侧署名，右下角留空（无二维码、无导流）
  ctx.textAlign = 'left';
  ctx.font = '400 26px "PingFang SC","Noto Sans SC",sans-serif';
  ctx.fillStyle = e.soft;
  ctx.fillText('末日带娃100天 · 结局收集 ' + totalEndings() + '/5', 84, H-92);
  ctx.textAlign = 'right';
  ctx.fillText('第 ' + day + ' 天', W-84, H-92);
  ctx.textAlign = 'left';
  return cv;
}

// 降级：全屏大图长按保存 + 纯文本长按复制（容器无剪贴板 API）
function posterFallback(dataUrl, type){
  const copy = posterCopy(type);
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(20,25,22,.95);display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:14px 12px 20px;box-sizing:border-box;overflow-y:auto';
  ov.innerHTML = `<div style="color:#fff;font-size:13px;text-align:center;margin:2px 0 8px">长按海报保存到相册</div>
    <img src="${dataUrl}" alt="结局海报" style="width:86vw;max-width:420px;border-radius:12px;background:#fff;-webkit-touch-callout:default;touch-callout:default">
    <div style="width:86vw;max-width:420px;margin-top:10px;background:#fff;border-radius:12px;padding:10px 12px;color:#2C3E50;font-size:12px;line-height:1.7;-webkit-user-select:text;user-select:text;-webkit-touch-callout:default;touch-callout:default">
      <div style="font-weight:bold;margin-bottom:4px">${copy.title}</div>
      <div style="white-space:pre-line">${copy.content}</div>
      <div style="color:#7F8C9A;font-size:10.5px;margin-top:6px">长按上面文字可选择并复制</div>
    </div>
    <button id="pst-close" style="margin-top:12px;padding:10px 26px;border:none;border-radius:20px;background:#4A90D9;color:#fff;font-size:13px;font-family:inherit">关闭</button>`;
  document.body.appendChild(ov);
  const btn = ov.querySelector('#pst-close');
  if(btn) btn.onclick = ()=>{ try{ document.body.removeChild(ov); }catch(e){} };
}

// 入口：出图 → writeTempFile 拿路径 → postNote 唤起发布页
function showPoster(type){
  let dataUrl = '';
  try{ dataUrl = buildPosterCanvas(type).toDataURL('image/png'); }
  catch(e){ toast('海报生成失败，请重试'); return; }
  if(!posterAvailable()){ posterFallback(dataUrl, type); return; }
  toast('正在生成海报…');
  posterCall('writeTempFile', { data: dataUrl }).then(res=>{
    const path = (res && (res.filePath || (res.data && res.data.filePath))) || '';
    if(!path) throw new Error('no filePath');
    const copy = posterCopy(type);
    return posterCall('postNote', {
      title: String(copy.title).slice(0,20),
      content: String(copy.content).slice(0,1000),
      pageType: 'photo_publish',
      mediaInfo: { image_resources: [{ url: path }] }
    });
  }).then(()=>{ toast('已打开发布页，请确认发布'); })
    .catch(()=>{ posterFallback(dataUrl, type); });
}

/* ---------- 结局 CG 舞台：渐变天空+剪影emoji+逐句字幕（占位美术，之后可换成AI整图） ---------- */
// 元素字段：e=emoji，x=left，y=bottom，s=字号，c=动画类
const ENDING_CG = {
  hidden:{
    sky:'linear-gradient(180deg,#7FB0E4 0%,#C9DFF3 34%,#F6E3AE 66%,#E8C84A 100%)',
    ground:'linear-gradient(180deg,#8A6230,#5F421E)',
    scene:[
      {e:'☀️', x:'72%', y:'118px', s:32, c:'cg-float'},
      {e:'☁️', x:'10%', y:'128px', s:20, c:'cg-drift'},
      {e:'☁️', x:'44%', y:'140px', s:15, c:'cg-drift2'},
      {e:'🏫', x:'30%', y:'30px', s:44, c:'cg-rise d1'},
      {e:'🧑‍🏫', x:'9%', y:'6px', s:19, c:'cg-rise d2 sil'},
      {e:'🧒', x:'25%', y:'6px', s:15, c:'cg-rise d3 sil'},
      {e:'🧒', x:'36%', y:'6px', s:15, c:'cg-rise d4 sil'},
      {e:'🧒', x:'47%', y:'6px', s:15, c:'cg-rise d5 sil'},
      {e:'👑', x:'76%', y:'120px', s:22, c:'cg-glow'},
    ],
    subs:['第一百天的太阳，升起来了。','幼儿园的门，还在为你们开着。','课，还会一直上下去。'],
  },
  true:{
    sky:'linear-gradient(180deg,#A9CDEB 0%,#D6E7F6 45%,#F2E4C4 100%)',
    ground:'linear-gradient(180deg,#8FA47C,#6B7F5B)',
    scene:[
      {e:'🚁', x:'0%', y:'128px', s:22, c:'cg-fly'},
      {e:'☁️', x:'12%', y:'142px', s:16, c:'cg-drift'},
      {e:'☁️', x:'58%', y:'132px', s:19, c:'cg-drift2'},
      {e:'🌤️', x:'74%', y:'120px', s:26, c:'cg-float'},
      {e:'🚪', x:'66%', y:'28px', s:40, c:'cg-rise d1'},
      {e:'🧑‍🏫', x:'9%', y:'6px', s:18, c:'cg-rise d2 sil'},
      {e:'🧒', x:'23%', y:'6px', s:14, c:'cg-rise d3 sil'},
      {e:'🧒', x:'33%', y:'6px', s:14, c:'cg-rise d4 sil'},
      {e:'🧒', x:'43%', y:'6px', s:14, c:'cg-rise d5 sil'},
    ],
    subs:['第一百天结束了，你们都活了下来。','云层里，第一次传来别的声音。','「走吧。」你们牵着手，走出了铁门。'],
  },
  good:{
    sky:'linear-gradient(180deg,#BFE3B4 0%,#DFF0D2 50%,#F4FAEC 100%)',
    ground:'linear-gradient(180deg,#9CBE7E,#77955C)',
    scene:[
      {e:'🌻', x:'8%', y:'118px', s:22, c:'cg-float'},
      {e:'🌻', x:'82%', y:'122px', s:20, c:'cg-float'},
      {e:'☁️', x:'52%', y:'140px', s:15, c:'cg-drift'},
      {e:'🌱', x:'44%', y:'30px', s:30, c:'cg-rise d1'},
      {e:'🧑‍🏫', x:'12%', y:'6px', s:19, c:'cg-rise d3 sil'},
      {e:'🧒', x:'28%', y:'6px', s:15, c:'cg-rise d4 sil'},
      {e:'🐦', x:'66%', y:'132px', s:15, c:'cg-drift2'},
    ],
    subs:['最后一夜，你失去了一个孩子。','天亮后，你在后院种下一棵小苗。','「等它长高了，他就回来了。」'],
  },
  normal:{
    sky:'linear-gradient(180deg,#C6C9C4 0%,#DEE0DA 55%,#F1F1EA 100%)',
    ground:'linear-gradient(180deg,#A6AAA2,#83887F)',
    scene:[
      {e:'☁️', x:'16%', y:'138px', s:18, c:'cg-drift'},
      {e:'🏚️', x:'60%', y:'26px', s:42, c:'cg-rise d1'},
      {e:'🌱', x:'36%', y:'34px', s:17, c:'cg-rise d2'},
      {e:'🌱', x:'47%', y:'34px', s:17, c:'cg-rise d3'},
      {e:'🧒', x:'11%', y:'6px', s:16, c:'cg-rise d4 sil'},
      {e:'🍂', x:'70%', y:'120px', s:14, c:'cg-drift2'},
    ],
    subs:['后院多了两棵小苗。','只剩一只小手，还被你紧紧牵着。','只要还有人在，幼儿园就还在。'],
  },
  bad:{
    sky:'linear-gradient(180deg,#10131A 0%,#1B1C25 60%,#23202B 100%)',
    ground:'linear-gradient(180deg,#1B1D24,#0C0E13)',
    scene:[
      {e:'🌑', x:'70%', y:'122px', s:28, c:'cg-float'},
      {e:'🩸', x:'14%', y:'132px', s:13, c:'cg-float'},
      {e:'🏚️', x:'52%', y:'24px', s:44, c:'cg-rise d1'},
      {e:'🕯️', x:'36%', y:'40px', s:17, c:'cg-out d1'},
      {e:'🕯️', x:'50%', y:'40px', s:17, c:'cg-out d2'},
    ],
    subs:['孩子们，一个接一个地离开了。','幼儿园的灯光，亮到了最后一刻。','然后——'],
  },
};
function endingCG(type){
  const cg = ENDING_CG[type] || ENDING_CG.bad;
  const els = cg.scene.map(o=>`<span class="e ${o.c||''}" style="left:${o.x};bottom:${o.y};font-size:${o.s}px">${o.e}</span>`).join('');
  const subs = cg.subs.map(s=>`<span class="ed-sub">${s}</span>`).join('');
  return `<div class="ed-cg">
    <div class="cg-sky" style="background:${cg.sky}"></div>
    <div class="cg-ground" style="background:${cg.ground}"></div>
    <div class="cg-layer">${els}</div>
  </div>
  <div class="ed-subs">${subs}</div>`;
}

// --- 结局静态模板（图鉴复用 + 动态填充）---
const ENDING_TEMPLATES = {
  hidden: {
    title:'🌅 第 100 天的黎明',
    subtitle:'三个人，都活下来了',
    excerpt:'第 100 天的太阳升起来了。\n你把黑板擦干净，用半截粉笔写下今天的课。',
  },
  true: {
    title:'🌤️ 有直升机声传来',
    subtitle:'三个人，一起离开',
    excerpt:'第 100 天结束了。你们三个，都活下来了。\n没有人来接。孩子拉着你的衣角问："老师，爸爸妈妈是不是忘了我们住哪儿？"',
  },
  good: {
    title:'🌿 两个人，守着家',
    subtitle:'有人没能撑过那三天',
    excerpt:'第 100 天的最后一夜，你失去了一个孩子。\n你在后院种下了一棵小苗。"等它长高了，他就回来跟你们玩了"。\n幼儿园的围墙还在，大门还锁着。',
  },
  normal: {
    title:'🏚️ 守住这扇门',
    subtitle:'两个都没能撑住',
    excerpt:'你在后院种下了两棵小苗。\n"等它们长成大树，你们就在树荫下凉快"。\n幼儿园的围墙还在，大门还锁着。',
  },
  bad: {
    title:'🌑 灯光熄灭了',
    subtitle:'一切，在第 100 天之前就结束了',
    excerpt:'第 100 天没到，一切就结束了。\n幼儿园的灯光亮到了最后一刻，然后——',
  },
};

// --- 结局收集图鉴弹窗（神秘化，不剧透条件）---
const ALL_ENDING_TYPES = ['hidden','true','good','normal','bad'];
function showEndingsGallery(){
  const unlocked = loadEndings();
  const colors = { hidden:'#8A7A5A', true:'#4B635E', good:'#4B635E', normal:'#666', bad:'#444' };

  const cards = ALL_ENDING_TYPES.map(t=>{
    const meta = unlocked[t];
    if(meta){
      const dateStr = new Date(meta.unlockedAt).toLocaleString('zh-CN',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});
      const tmpl = ENDING_TEMPLATES[t];
      return `<div style="background:var(--bg,#F2F4F7);border-radius:12px;padding:10px 12px;margin-bottom:6px;line-height:1.3;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:4px;height:100%;background:${colors[t]}"></div>
        <div style="font-size:13px;color:${colors[t]};font-weight:bold;padding-left:6px">${tmpl.title}</div>
        <div style="font-size:11px;color:var(--ink,#333);margin-top:4px;padding-left:6px;line-height:1.5;white-space:pre-line">${tmpl.excerpt}</div>
        <div style="font-size:10px;color:var(--soft,#999);margin-top:4px;padding-left:6px">📖 解锁于 ${dateStr}</div>
      </div>`;
    }else{
      return `<div style="background:transparent;border:1.5px dashed #D8D8D8;border-radius:12px;padding:10px 12px;margin-bottom:6px">
        <div style="font-size:13px;color:#BBB;font-weight:bold">❔ 未解锁的结局</div>
        <div style="font-size:10px;color:#CCC;margin-top:3px">继续活下去……或者，活下去吗？</div>
      </div>`;
    }
  }).join('');

  const unlockCount = Object.keys(unlocked).length;
  showPopup(`
    <h3 style="margin-bottom:4px">📖 结局图鉴　<small style="color:var(--soft);font-size:12px">已解锁 ${unlockCount}/5</small></h3>
    <div style="font-size:11px;color:var(--soft);margin-bottom:8px;line-height:1.6">你的选择，会带来完全不同的结局。<br>每通关一次会自动记录一段回忆。</div>
    ${cards}
    <div class="btns" style="margin-top:12px;gap:6px">
      ${unlockCount === 5 ? `<button class="primary" id="eg-reset-all" style="flex:1">🎮 清空图鉴</button>` : ''}
      <button class="primary" id="eg-back" style="flex:1">返回</button>
    </div>`);

  $('eg-back').onclick = ()=>$('btn-setting').onclick();
  const raf = $('eg-reset-all');
  if(raf) raf.onclick = ()=>{
    showPopup(`<h3>确认清空结局图鉴？</h3>
      <div class="story" style="font-size:12px">这会删除本机所有已解锁结局记录，\n游戏主存档不会受影响。\n确定要重新开始收集吗？</div>
      <div class="btns"><button class="danger" id="rr-yes">确定清空</button><button id="rr-no">取消</button></div>`);
    $('rr-yes').onclick = ()=>{ localStorage.removeItem(SAVE_ENDINGS); showEndingsGallery(); };
    $('rr-no').onclick = showEndingsGallery;
  };
}

/* ---------- 🏆 结局收集排行榜（board=1，分数=已解锁结局数，仅本机上报） ---------- */
const RANK_BOARD = 1;
const SAVE_RANK = 'kg_rank_board1_v1'; // 上报水位：{score,ts}
let _rankHidden = false;   // 1005 / 版本过低 / 接口缺失 → 本次会话不再露出入口
let _rankRetry = 0;

function rankEsc(s){
  return String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function rankApi(){
  const x = window.xhs;
  return (x && x.miniTool) ? x.miniTool : null;
}
function rankClientVer(){
  const mt = rankApi(); if(!mt) return '';
  try{
    if(typeof mt.getSystemInfoSync === 'function'){
      const s = mt.getSystemInfoSync() || {};
      return s.appVersion || s.xhsVersion || s.appVersionName || s.version || '';
    }
    if(typeof mt.getAppVersion === 'function'){
      const v = mt.getAppVersion();
      return (v && v.version) || v || '';
    }
  }catch(e){}
  return '';
}
function rankAvailable(){
  if(_rankHidden) return false;
  const mt = rankApi();
  if(!mt) return false;
  if(typeof mt.submitScore!=='function' || typeof mt.getRankList!=='function' || typeof mt.getMyRank!=='function') return false;
  const v = rankClientVer();
  if(v){
    const n = parseFloat(v);
    if(!isNaN(n) && n < 9.51) return false; // 低于 9.51 直接不展示入口
  }
  return true;
}
function rankCode(r){
  if(!r) return '';
  const c = (r.code!==undefined ? r.code : (r.errCode!==undefined ? r.errCode : (r.errorCode!==undefined ? r.errorCode : '')));
  return String(c==null?'':c).toUpperCase();
}
function rankMsg(r){ return String((r && (r.msg||r.errMsg||r.message||r.errorMsg)) || ''); }
function rankData(r){ return (r && r.data!==undefined) ? r.data : r; }
function rankCall(name, args){
  return new Promise(resolve=>{
    const mt = rankApi();
    if(!mt || typeof mt[name]!=='function'){ resolve({code:'NO_API'}); return; }
    let finished = false;
    const done = v=>{ if(finished) return; finished = true; resolve(v); };
    try{
      const opts = Object.assign({}, args, {success:done, fail:done});
      const ret = mt[name](opts);
      if(ret && typeof ret.then === 'function'){
        ret.then(done, e=>done({code:'FAIL', err:e}));
      }else{
        setTimeout(()=>done({code:'NO_RET'}), 8000);
      }
    }catch(e){ done({code:'FAIL', err:e}); }
  });
}
function rankParseList(r){
  const d = rankData(r);
  if(Array.isArray(d)) return d;
  if(!d || typeof d!=='object') return [];
  const arr = d.list || d.rankList || d.ranks || d.items || d.records || d.rows || [];
  return Array.isArray(arr) ? arr : [];
}
function rankParseMy(r){
  const d = rankData(r);
  if(!d || typeof d!=='object') return null;
  const o = d.myRank || d.self || d.rankInfo || d;
  const rank = (o.rank!=null ? o.rank : (o.rankNum!=null ? o.rankNum : (o.position!=null ? o.position : null)));
  const score = (o.score!=null ? o.score : (o.bestScore!=null ? o.bestScore : null));
  if(rank==null && score==null) return null;
  return { rank: rank==null?null:Number(rank), score: score==null?null:Number(score) };
}
function rankItemRank(it, i){
  const v = (it && (it.rank!=null ? it.rank : (it.rankNum!=null ? it.rankNum : (it.position!=null ? it.position : null))));
  return v==null ? i+1 : Number(v);
}
function rankItemName(it){
  const n = (it && (it.nickname || it.nickName || it.userName || it.user_name || it.name || '')) || '';
  return String(n).trim() || '匿名玩家';
}
function rankItemScore(it){
  const v = (it && (it.score!=null ? it.score : (it.bestScore!=null ? it.bestScore : (it.value!=null ? it.value : 0))));
  return Number(v) || 0;
}
function rankLastScore(){
  try{ const o = JSON.parse(localStorage.getItem(SAVE_RANK) || '{}'); return Number(o.score) || 0; }catch(e){ return 0; }
}
function rankWater(score){
  try{ localStorage.setItem(SAVE_RANK, JSON.stringify({score, ts:Date.now()})); }catch(e){}
}
// 结局落盘后与进榜前各调用一次：同分不重复请求；失败不重试，等下次补报
function rankMaybeSubmit(){
  if(!rankAvailable()) return;
  const score = Math.max(0, Math.min(5, totalEndings()));
  if(score <= 0 || score <= rankLastScore()) return;
  const mt = rankApi(); if(!mt) return;
  let done = false;
  const ok = ()=>{ if(done) return; done = true; rankWater(score); };
  const bad = r=>{
    if(done) return; done = true;
    if(rankCode(r)==='1005') _rankHidden = true;
  };
  try{
    const ret = mt.submitScore({ board:RANK_BOARD, score, success:ok, fail:bad });
    if(ret && typeof ret.then === 'function'){
      ret.then(r=>{ const c = rankCode(r); if(!c || c==='0' || c==='200') ok(); else bad(r); }, r=>bad(r));
    }
  }catch(e){}
}
function rankHint(txt){
  return `<div style="text-align:center;color:var(--soft);font-size:12px;padding:26px 0">${txt}</div>`;
}
function showRankBoard(onBack){
  if(!rankAvailable()) return;
  rankMaybeSubmit();
  _rankRetry = 0;
  const back = (typeof onBack === 'function') ? onBack : ()=>{ $('btn-setting').onclick(); };
  showPopup(`
    <h3>🏆 结局收集排行榜</h3>
    <div style="font-size:11px;color:var(--soft);line-height:1.6;margin-bottom:8px;text-align:center">分数 = 已解锁结局数（满分 5）<br>同分时，先达成的人排前面。</div>
    <div id="rk-mine" style="display:none;position:sticky;top:0;z-index:3;background:#FFF8E7;border:1px solid #F0D9A8;border-radius:10px;padding:7px 10px;margin-bottom:8px;text-align:center;font-size:12px;line-height:1.5"></div>
    <div id="rk-body" style="min-height:90px;max-height:42vh;overflow-y:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--line);border-radius:10px"></div>
    <div class="btns" style="margin-top:12px;gap:6px">
      <button id="rk-refresh">刷新</button>
      <button class="primary" id="rk-back">返回</button>
    </div>`);
  $('rk-back').onclick = back;
  $('rk-refresh').onclick = ()=>{ _rankRetry = 0; loadRankBoard(); };
  loadRankBoard();
}
function loadRankBoard(){
  const box = $('rk-body'); if(!box) return;
  const bar = $('rk-mine'); if(bar){ bar.innerHTML = ''; bar.style.display = 'none'; }
  box.scrollTop = 0;
  box.innerHTML = `<div style="text-align:center;color:var(--soft);font-size:12px;padding:26px 0">榜单加载中…</div>`;
  rankCall('getRankList', { board:RANK_BOARD, period:'all' }).then(r=>{
    if(!document.body.contains(box)) return;
    const code = rankCode(r);
    if(code==='1005'){ _rankHidden = true; closePopup(); return; }
    if(code==='2002' && _rankRetry < 2){ _rankRetry++; setTimeout(loadRankBoard, 700 * _rankRetry); return; }
    if(code && code!=='0' && code!=='200'){ box.innerHTML = rankHint('榜单暂时打不开，稍后再试'); return; }
    const items = rankParseList(r);
    rankCall('getMyRank', { board:RANK_BOARD, period:'all' }).then(mr=>{
      if(!document.body.contains(box)) return;
      if(rankCode(mr)==='1005'){ _rankHidden = true; closePopup(); return; }
      renderRankBoard(box, items, mr);
    }, ()=>renderRankBoard(box, items, null));
  }, ()=>{ if(document.body.contains(box)) box.innerHTML = rankHint('榜单暂时打不开，稍后再试'); });
}
function renderRankBoard(box, items, myRaw){
  const code = rankCode(myRaw);
  const over = code==='OVER_LIMIT' || /OVER_LIMIT/i.test(rankMsg(myRaw));
  const my = over ? null : rankParseMy(myRaw);
  // 我的名次固定条：与列表分离，列表滚动时始终可见，且不压住最后一行
  const bar = $('rk-mine');
  if(bar){
    let main = '我的名次：暂未上榜', sub = '打出一个结局就能上榜';
    if(over){
      main = '我的名次：500+';
    }else if(my && my.rank!=null){
      main = `我的名次：第 ${my.rank} 名` + (my.score!=null ? ` · 已解锁 ${my.score} / 5` : '');
      sub = Number(my.rank) > 100 ? '你的名次在前 100 名之外' : '';
    }
    bar.innerHTML = `<div style="font-weight:bold;color:var(--ink)">${main}</div>${sub ? `<div style="font-size:10.5px;color:var(--soft);margin-top:1px">${sub}</div>` : ''}`;
    bar.style.display = 'block';
  }
  if(!items.length){ box.innerHTML = rankHint('还没有人上榜'); return; }
  const mineRank = (my && my.rank!=null) ? Number(my.rank) : null;
  const rows = items.slice(0,100).map((it,i)=>{
    const rk = rankItemRank(it, i);
    const nm = rankEsc(rankItemName(it));
    const sc = rankItemScore(it);
    const mine = mineRank!=null && mineRank===Number(rk);
    const medal = rk===1 ? '🥇' : (rk===2 ? '🥈' : (rk===3 ? '🥉' : ''));
    const bg = mine ? 'background:#FFF8E7;' : (i%2 ? 'background:#FAFBFC;' : 'background:#fff;');
    return `<div${mine ? ' data-me="1"' : ''} style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-bottom:1px solid #EEF2F6;${bg}">
      <div style="width:42px;flex:0 0 42px;text-align:center;font-size:12px;font-weight:bold;color:${mine?'var(--accent2)':'var(--soft)'}">${medal || ('#'+rk)}</div>
      <div style="flex:1;min-width:0;font-size:12.5px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${nm}${mine?' <span style="font-size:10px;color:var(--accent2)">（我）</span>':''}</div>
      <div style="flex:0 0 auto;font-size:12px;font-weight:bold;color:var(--accent)">${sc} / 5</div>
    </div>`;
  }).join('');
  box.innerHTML = rows;
  // 自己在榜内：进入榜单/刷新后滚动一次，把自己那行放到列表可视区中部（用户之后手动滚动不再干预）
  const meRow = mineRank!=null ? box.querySelector('[data-me="1"]') : null;
  if(meRow){
    const r = meRow.getBoundingClientRect(), br = box.getBoundingClientRect();
    const top = Math.max(0, box.scrollTop + (r.top - br.top) - box.clientHeight/2 + r.height/2);
    if(typeof box.scrollTo === 'function') box.scrollTo({ top, behavior:'smooth' });
    else box.scrollTop = top;
  }
}

/* ---------- 📒 指导手册（只讲首页怎么用，机制留白让玩家自己发现） ---------- */
function showManual(){
  const sec = (icon,title,lines)=>`<div style="background:var(--card);border:1px solid var(--line);border-radius:10px;padding:9px 11px;margin-top:7px;text-align:left">
    <div style="font-size:13px;font-weight:bold;color:var(--ink-dark);margin-bottom:3px">${icon} ${title}</div>
    <div style="font-size:11.5px;color:var(--soft);line-height:1.65">${lines}</div></div>`;
  showPopup(`<h3>📒 指导手册</h3>
    <div style="font-size:11.5px;color:var(--soft);text-align:center;line-height:1.7">这是你接下来要生活的地方。<br>下面只告诉你「家里有什么」，剩下的路要你自己走。</div>
    ${sec('🗓️','顶部一行','左边是设置，进度导出、声音开关都在里面；右边是今天的日子、时段和天气。天气不只是看看而已，出门前记得留意。')}
    ${sec('🛡️','防御度条','它告诉你这间幼儿园现在有多结实。点右侧 📜 能回看每一夜发生了什么，点 🏫 能看到整栋楼的样子。')}
    ${sec('🏫','六个点位徽章','窗户、大门、围墙、后门、屋顶、天台——点任意一个，能看到它现在的模样和加固需要的材料。')}
    ${sec('🧑‍🏧','你和孩子们','照片下面的三条状态是你们活下去的本钱。孩子们不会说话，但你看得出谁饿了、谁害怕、谁病了。')}
    ${sec('📦','物资箱','食物、工具、药品、种子，带回来的东西都收在这里。点进去能看每样还剩多少。架子上的小格子，是外出时偶尔捡回的小玩意儿。')}
    ${sec('🚶','白天能做的事','一天可以外出六节（上午三节、下午三节），每趟成功带回两件物资。前四趟还算安稳，从第五趟起天色渐晚，出了门未必回得来。也可以随时点「回家」提前收工守夜。')}
    ${sec('🤱🔧🌱','在家能做的事','照顾孩子们、加固房屋、打理天台菜园——这些不占用白天的时间，想做几次都可以。')}
    ${sec('🌙','夜晚','晚上不能外出。你可以再陪陪孩子、修修房子，然后点「度过夜晚」。夜里会发生什么，手册里不写——第一次听到窗外的声音时，你就懂了。')}
    <div style="background:#FFF8E7;border:1px solid #E6C76D;border-radius:10px;padding:9px 11px;margin-top:7px;font-size:11.5px;line-height:1.65;color:#99742A">
    ✨ 还有很多事，这本册子不会告诉你：孩子们会成长成什么样、废墟深处藏着什么、第一百天会迎来什么。<br>带着他们，活到那一天就好。</div>
    <div class="btns" style="margin-top:10px"><button class="primary" id="mn-close">我知道了</button></div>`);
  $('mn-close').onclick = ()=>$('btn-setting').onclick();
}

/* ---------- 设置 ---------- */
$('btn-setting').onclick = ()=>{
  const unlocked = totalEndings();
  const sfxBtn = sfxOn() ? '🔊 音效：开' : '🔇 音效：关';
  const bgmBtn = bgmOn() ? '🎵 音乐：开' : '🎵 音乐：关';
  showPopup(`
    <h3>⚙️ 设置</h3>
    <div class="story" style="font-size:12px">进度已自动保存在本机。\n离开游戏前，建议点「备份存档」导出二维码图片或存储码，\n换设备或清缓存后可凭它们恢复进度。</div>
    <div class="btns">
      <button id="st-manual">📒 指导手册</button>
      <button id="st-endings">📖 结局图鉴（${unlocked}/5）</button>
    </div>
    ${rankAvailable()? '<div class="btns" style="margin-top:8px"><button id="st-rank">🏆 排行榜</button></div>' : ''}
    <div class="btns" style="margin-top:8px">
      <button id="st-sfx">${sfxBtn}</button>
      <button id="st-bgm">${bgmBtn}</button>
    </div>
    <div class="btns" style="margin-top:8px">
      <button id="st-export">📤 备份存档</button>
      <button id="st-import">📥 导入存档</button>
    </div>
    <div class="btns" style="margin-top:8px">
      <button class="danger" id="st-reset">重新开始（清空存档）</button>
    </div>
    <div class="btns" style="margin-top:8px"><button class="primary" id="st-close">关闭</button></div>`);
  $('st-close').onclick = closePopup;
  $('st-endings').onclick = showEndingsGallery;
  const stRank = $('st-rank');
  if(stRank) stRank.onclick = ()=>showRankBoard();
  $('st-manual').onclick = showManual;
  // 声音开关：切换后重绘设置弹窗上的按钮文字
  $('st-sfx').onclick = ()=>{ toggleSfx(); $('btn-setting').onclick(); };
  $('st-bgm').onclick = ()=>{ toggleBgm(); $('btn-setting').onclick(); };
  $('st-export').onclick = ()=>{
    const raw = JSON.stringify(state);
    // 文字存储码：纯 base64(JSON) —— 明文可读、局部损坏可人工修复，便于日后救档；
    // 二维码：另用 LZString 压缩（更小、更易扫）。两者并存，导入时都兼容。
    let code;
    try{ code = btoa(unescape(encodeURIComponent(raw))); }
    catch(e){ code = (typeof LZString!=='undefined') ? LZString.compressToBase64(raw) : ''; }
    showPopup(`
      <h3>📤 备份存档</h3>
      <div class="story" style="font-size:12px;margin-bottom:4px">换设备或清缓存后可凭备份恢复进度。<br>推荐保存二维码图片，丢档后可凭图片恢复。</div>
      <div id="qr-box" style="text-align:center;margin:6px 0"></div>
      <div class="btns" style="margin-top:2px"><button id="ex-toggle">📋 查看文字存储码</button></div>
      <div id="ex-code-wrap" style="display:none">
        <div class="story save-code" id="ex-code" style="font-size:11px;word-break:break-all;-webkit-user-select:text;user-select:text;-webkit-touch-callout:default">${code}</div>
        <div class="hint" style="margin:6px 0 0">长按文字可选择并拷贝存储码</div>
        <div class="btns"><button class="primary" id="ex-copy">全选文字</button></div>
      </div>
      <div class="btns" style="margin-top:8px"><button id="ex-back">返回</button></div>`);
    // 文字存储码默认收起，点击展开/收起，画面更清爽
    $('ex-toggle').onclick = ()=>{
      const wrap = $('ex-code-wrap');
      const open = wrap.style.display !== 'none';
      wrap.style.display = open ? 'none' : 'block';
      $('ex-toggle').textContent = open ? '📋 查看文字存储码' : '📋 收起文字存储码';
    };
    // 生成二维码：LZString 压缩后写入二维码（比文字码小、更易扫），玩家长按图片保存；生成失败（存档过大等）则只显示文字码
    try{
      if(typeof qrcode==='function' && typeof LZString!=='undefined'){
        const comp = LZString.compressToBase64(raw);
        const q = qrcode(0,'L'); q.addData(comp); q.make();
        const img = document.createElement('img');
        img.src = q.createDataURL(6,3);
        img.style.cssText='width:180px;height:180px;background:#fff;padding:6px;border-radius:6px;-webkit-touch-callout:default;touch-callout:default';
        img.alt='存档二维码';
        $('qr-box').appendChild(img);
        const tip=document.createElement('div');
        tip.style.cssText='font-size:11px;color:var(--soft);margin-top:4px';
        tip.textContent='📷 点下方按钮打开大图，长按即可保存到相册';
        $('qr-box').appendChild(tip);
        // 按钮：把二维码渲染成 PNG 后打开全屏大图（直接保存动图兼容性差，改为长按 PNG 大图保存到相册最稳）
        const dl=document.createElement('button');
        dl.textContent='⬇️ 保存二维码图片';
        let qrPngUrl=null;
        dl.onclick=()=>{
          try{
            if(!qrPngUrl){
              const cell=6, margin=4*cell, size=q.getModuleCount()*cell+2*margin;
              const cv=document.createElement('canvas'); cv.width=size; cv.height=size;
              const ctx=cv.getContext('2d');
              ctx.fillStyle='#fff'; ctx.fillRect(0,0,size,size);
              ctx.translate(margin,margin);
              q.renderTo2dContext(ctx, cell);
              qrPngUrl = cv.toDataURL('image/png');
            }
            const ov=document.createElement('div');
            ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;box-sizing:border-box';
            ov.innerHTML='<img src="'+qrPngUrl+'" style="max-width:80vw;max-height:70vh;background:#fff;padding:14px;border-radius:10px;-webkit-touch-callout:default;touch-callout:default" alt="存档二维码"><div style="color:#fff;margin-top:18px;font-size:15px;text-align:center;line-height:1.7">长按二维码图片<br>选择「添加到照片」保存到相册</div><div style="color:#bbb;margin-top:10px;font-size:12px">点击任意处关闭</div>';
            ov.onclick=()=>{ try{document.body.removeChild(ov);}catch(e){} };
            document.body.appendChild(ov);
          }catch(e){ toast('打开失败，请直接长按上方二维码保存'); }
        };
        // 与「查看文字存储码」按钮同款：包进 .btns 走统一样式（整行宽、等高、同圆角边框）
        const dlRow=document.createElement('div');
        dlRow.className='btns';
        dlRow.style.marginTop='6px';
        dlRow.appendChild(dl);
        $('qr-box').appendChild(dlRow);
      }
    }catch(qe){ /* 二维码生成失败不影响文字码导出 */ }
    // 容器内无剪贴板 API：改为帮用户选中存储码文本，再由长按/系统菜单拷贝
    $('ex-copy').onclick = ()=>{
      const node = $('ex-code');
      const sel = window.getSelection && window.getSelection();
      if(sel && document.createRange){
        const r = document.createRange();
        r.selectNodeContents(node);
        sel.removeAllRanges();
        sel.addRange(r);
      }
      toast('已全选，长按选区点「拷贝」');
    };
    $('ex-back').onclick = ()=>$('btn-setting').onclick();
  };
  $('st-import').onclick = ()=>{
    showPopup(`
      <h3>📥 导入存档</h3>
      <div class="story" style="font-size:12px;margin-bottom:4px">粘贴文字存储码，或从相册选之前保存的二维码图片。<br>⚠️ 导入将覆盖当前进度。</div>
      <div class="story"><textarea id="im-text" style="width:100%;height:78px;font-size:16px;border:1px solid var(--line);border-radius:8px;padding:6px" placeholder="粘贴存储码..."></textarea></div>
      <div class="btns" style="margin-bottom:6px"><button id="im-pic">📷 从相册选二维码图片</button></div>
      <input type="file" id="im-file" accept="image/*" style="display:none">
      <div class="btns"><button id="im-ok" class="primary">导入</button><button id="im-back">返回</button></div>`);
    $('im-back').onclick = ()=>$('btn-setting').onclick();
    // 解码并导入：兼容 ① 新版压缩码(LZString) ② 旧版纯 base64，两条入口共用
    function doImport(srcCode){
      if(!srcCode || !String(srcCode).trim()){ toast('请粘贴存储码或选择图片'); return; }
      // 生成多种「去污」后的候选码，提高手机粘贴的救回率
      const candidates = [];
      const addC = (c)=>{ const x=(c||'').replace(/\s+/g,''); if(x && candidates.indexOf(x)===-1) candidates.push(x); };
      const base = String(srcCode);
      addC(base);                                  // 原始（去空白）
      try{ const d=decodeURIComponent(base); if(d!==base) addC(d); }catch(e){} // 被转义成 %xx
      addC(base.replace(/ /g,'+'));                // 粘贴时 base64 的 + 被变空格
      addC(base.replace(/^[\s"'`<>（）【】\[\]「」『』“”‘’]+|[\s"'`<>（）【】\[\]「」『』“”‘’]+$/g,'')); // 去包裹符号（含中文引号「」『』“”‘’）
      // 逐个候选尝试：① LZString 压缩码（旧版文字码/二维码）② 纯 base64(JSON)（新版文字码），先解出有效结构者胜
      let s=null;
      for(const code of candidates){
        if(typeof LZString!=='undefined'){
          try{ const t=LZString.decompressFromBase64(code); if(t){ const o=JSON.parse(t); if(o&&o.day&&o.kids){ s=o; break; } } }catch(e){}
        }
        try{ const o=JSON.parse(decodeURIComponent(escape(atob(code)))); if(o&&o.day&&o.kids){ s=o; break; } }catch(e){}
      }
      if(!s){ toast('存储码无法读取，请确认完整复制、没有漏字；也可改用二维码图片导入'); return; }
      // 先确认：显示当前天数与导入天数，避免误覆盖
      const curDay = (state && state.day) || '?';
      showPopup(`
        <h3>⚠️ 确认导入</h3>
        <div class="story" style="font-size:13px">导入存档将覆盖当前进度，确定继续吗？<br><br>当前进度：第 <b>${curDay}</b> 天<br>导入进度：第 <b>${s.day}</b> 天</div>
        <div class="btns"><button class="danger" id="im-yes">确认导入</button><button id="im-no">取消</button></div>`);
      $('im-no').onclick = ()=>$('btn-setting').onclick();
      $('im-yes').onclick = ()=>{
        state = migrateState(s); saveState(); closePopup();
        enterHome(); toast('导入成功，欢迎回来');
      };
    }
    $('im-ok').onclick = ()=>doImport($('im-text').value);
    $('im-pic').onclick = ()=>$('im-file').click();
    // 选相册二维码图 → 读像素 → jsQR 解码 → 复用 doImport
    $('im-file').onchange = ()=>{
      const f=$('im-file').files&&$('im-file').files[0]; if(!f){$('im-file').value='';return;}
      const reader=new FileReader();
      reader.onload=()=>{
        const img=new Image();
        img.onload=()=>{
          // 限制最大边长，兼顾识别率与性能（相册原图可能很大）
          let w=img.width,h=img.height,max=1280;
          if(Math.max(w,h)>max){const r=max/Math.max(w,h);w=Math.max(1,Math.round(w*r));h=Math.max(1,Math.round(h*r));}
          const cv=document.createElement('canvas');cv.width=w;cv.height=h;
          const ctx=cv.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,w,h);
          let decoded=null;
          try{ if(typeof jsQR!=='undefined'){ const id=ctx.getImageData(0,0,w,h); const res=jsQR(id.data,id.width,id.height,{inversionAttempts:'attemptBoth'}); if(res&&res.data)decoded=res.data; } }catch(de){decoded=null;}
          $('im-file').value='';
          if(decoded){ $('im-text').value=decoded; doImport(decoded); }
          else toast('没识别到二维码，请换清晰图片或粘贴文字码');
        };
        img.onerror=()=>{ $('im-file').value=''; toast('图片加载失败，请重试'); };
        img.src=reader.result;
      };
      reader.onerror=()=>{ $('im-file').value=''; toast('图片读取失败，请重试'); };
      reader.readAsDataURL(f);
    };
  };
  $('st-reset').onclick = ()=>{
    showPopup(`
      <h3>⚠️ 重新开始</h3>
      <div class="story">确定要清空当前进度吗？\n此操作无法撤销！</div>
      <div class="btns"><button class="danger" id="rs-yes">清空重来</button><button id="rs-no">再想想</button></div>`);
    $('rs-no').onclick = ()=>$('btn-setting').onclick();
    $('rs-yes').onclick = ()=>{ clearSave(); location.reload(); };
  };
};

// 防御日志查看
function showDefenseLog(){
  const logs = state.defenseLog || [];
  if(logs.length === 0){
    showPopup(`<h3>📜 防御日志</h3>
      <div class="story" style="text-align:center;color:var(--soft)">还没有夜袭记录<br>丧尸还没找上门来</div>
      <div class="btns"><button id="dl-close">关闭</button></div>`);
    $('dl-close').onclick = closePopup;
    return;
  }
  const html = logs.map(log=>`
    <div style="background:var(--bg);border-radius:10px;padding:8px;margin-bottom:6px">
      <div style="font-weight:bold;font-size:13px;margin-bottom:3px">🌙 第 ${log.day} 天 · ${log.zombieEmoji}${log.zombieName}×${log.count}</div>
      <div style="font-size:11px;color:var(--soft)">击杀 ${log.killed} / 诱走 ${log.lured} / ${log.spotsDamaged} 点位受损</div>
      <div style="font-size:11px;margin-top:3px;white-space:pre-line">${log.details.map(d=>'├ '+d).join('\n')}</div>
    </div>
  `).join('');
  showPopup(`<h3>📜 防御日志（最近5次）</h3>${html}
    <div class="btns"><button id="dl-close">关闭</button></div>`);
  $('dl-close').onclick = closePopup;
}

/* ---------- 🏫 幼儿园全景展示（温暖绘本风城堡，加固等级实时变化） ---------- */
function showPanorama(){
  const f = state.fort;
  const p = state.placed;
  const eq = {trap:'🪤',shock:'⚡',flame:'🔥',acid:'🧪',decoy:'📢',birdnet:'🕸️'};
  const placedList = (spot) => Object.entries(p[spot]||{}).filter(([k,v])=>v>0).map(([k,v])=>eq[k]+(v>1?`×${v}`:'')).join(' ');

  // 整体加固等级→天空色调
  const lvAvg = (f.win+f.door+f.wall+f.back+f.roof+f.top)/6;
  const warm = lvAvg>=3.5;
  const mid = lvAvg>=1.5 && !warm;

  // 颜色系（随围墙/整体等级渐变）
  const sky1 = warm?'#bfeaff':mid?'#c8d0d8':'#a8aeb5';
  const sky2 = warm?'#fdf3dc':mid?'#d8d0c0':'#dcd5c5';
  const grass1 = warm?'#b7df98':mid?'#a8b888':'#8f9783';
  const grass2 = warm?'#8ccb66':mid?'#98a878':'#a8986c';
  const bldgC = f.wall>=4?'#fff4da':f.wall>=2?'#e8dcc8':'#8f8273';
  const bldgSk = f.wall>=4?'#6b4f35':'#57483a';
  const roofC = f.roof>=4?'#e87a5d':f.roof>=3?'#9a6a4a':f.roof>=1?'#754a42':'#6f4640';
  const roofSk = f.roof>=4?'#6b4f35':'#57483a';

  let s = `<svg viewBox="0 0 1200 760" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:440px;display:block;margin:0 auto;border-radius:12px">`;

  // —— defs：渐变 ——
  s += `<defs>`;
  s += `<linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky1}"/><stop offset="1" stop-color="${sky2}"/></linearGradient>`;
  s += `<linearGradient id="winG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="#ffc94f"/></linearGradient>`;
  if(warm) s += `<radialGradient id="sunG" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#fff3c0"/><stop offset="1" stop-color="#ffd45e"/></radialGradient>`;
  s += `</defs>`;

  // —— 天空 ——
  s += `<rect width="1200" height="760" fill="url(#skyG)"/>`;
  if(warm){
    s += `<g transform="translate(1010 132)"><g stroke="#ffd45e" stroke-width="7" stroke-linecap="round"><line x1="0" y1="-78" x2="0" y2="-100"/><line x1="0" y1="78" x2="0" y2="100"/><line x1="-78" y1="0" x2="-100" y2="0"/><line x1="78" y1="0" x2="100" y2="0"/></g><circle r="52" fill="url(#sunG)"/></g>`;
    s += `<g fill="#fff" opacity=".9"><ellipse cx="210" cy="120" rx="60" ry="26"/><ellipse cx="258" cy="108" rx="46" ry="22"/><ellipse cx="168" cy="106" rx="36" ry="16"/></g>`;
  } else {
    s += `<g fill="#848a92"><ellipse cx="180" cy="118" rx="78" ry="30"/><ellipse cx="238" cy="104" rx="58" ry="26"/><ellipse cx="132" cy="102" rx="44" ry="20"/></g>`;
    s += `<circle cx="600" cy="130" r="40" fill="#e6dfcc" opacity=".5"/>`;
  }

  // —— 远丘+地面 ——
  s += `<path d="M0,560 Q260,462 520,540 T1200,528 V760 H0 Z" fill="${grass1}"/>`;
  s += `<path d="M0,608 Q320,566 640,596 T1200,588 V760 H0 Z" fill="${grass2}"/>`;
  if(warm) s += `<path d="M0,608 Q320,566 640,596 T1200,588" fill="none" stroke="#6fae4d" stroke-width="5"/>`;

  // ============ 围墙 ============
  const wlv = f.wall;
  const drawWall = (wx, ww) => {
    let w = '';
    const wc = wlv>=4?'#f3ddab':wlv>=2?'#d8c8a4':'#857969';
    const ws = wlv>=4?'#6b4f35':'#57483a';
    if(wlv<2){
      // 破墙：不齐的顶+暗洞
      w += `<path d="M${wx},560 L${wx},498 L${wx+32},498 L${wx+42},476 L${wx+76},486 L${wx+104},470 L${wx+136},486 L${wx+170},474 L${wx+ww-22},490 L${wx+ww-2},486 L${wx+ww-2},560 Z" fill="${wc}" stroke="${ws}" stroke-width="5" stroke-linejoin="round"/>`;
      w += `<ellipse cx="${wx+ww*0.5}" cy="524" rx="34" ry="25" fill="#2f2922"/>`;
    } else {
      w += `<rect x="${wx}" y="478" width="${ww}" height="82" rx="4" fill="${wc}" stroke="${ws}" stroke-width="5"/>`;
      if(wlv>=3){
        const n = Math.floor(ww/46);
        for(let i=0;i<n;i++) w += `<rect x="${wx+8+i*46}" y="442" width="26" height="30" rx="3" fill="${wlv>=4?'#f9e9c6':'#d8c8a4'}" stroke="${ws}" stroke-width="4"/>`;
        w += `<rect x="${wx}" y="470" width="${ww}" height="12" rx="5" fill="${wlv>=4?'#ef9b82':'#8a7a6a'}"/>`;
      }
      if(wlv>=4) w += `<path d="M${wx},518 H${wx+ww} M${wx},544 H${wx+ww}" stroke="#e0c490" stroke-width="3"/>`;
      if(wlv>=5){ w += `<rect x="${wx+10}" y="540" width="16" height="20" fill="#5fae4d"/>`; w += `<rect x="${wx+ww-26}" y="540" width="16" height="20" fill="#5fae4d"/>`; }
    }
    return w;
  };
  s += drawWall(96, 226);
  s += drawWall(878, 226);

  // —— 后门（右围墙内）——
  const blv = f.back;
  if(blv<1){
    s += `<ellipse cx="996" cy="530" rx="26" ry="18" fill="#2f2922"/>`;
  } else {
    const bc = blv>=4?'#5e8f6b':blv>=3?'#6a6a6a':blv>=2?'#7a5a3a':'#6a4a2a';
    s += `<path d="M950,560 V514 A23,23 0 0 1 996,514 V560 Z" fill="${bc}" stroke="#6b4f35" stroke-width="4"/>`;
    if(blv>=3){ s += `<circle cx="964" cy="535" r="3.4" fill="#f4cf6d"/>`; s += `<circle cx="984" cy="535" r="3.4" fill="#f4cf6d"/>`; }
    if(blv>=5){ s += `<circle cx="964" cy="552" r="3.4" fill="#f4cf6d"/>`; s += `<circle cx="984" cy="552" r="3.4" fill="#f4cf6d"/>`; }
  }

  // ============ 主楼 ============
  s += `<rect x="380" y="386" width="440" height="174" rx="6" fill="${bldgC}" stroke="${bldgSk}" stroke-width="5"/>`;
  s += `<rect x="380" y="528" width="440" height="32" fill="${warm?'#ddc594':'#7b6f60'}"/>`;
  s += `<path d="M380,530 H820" stroke="${bldgSk}" stroke-width="4"/>`;
  if(f.wall>=2) s += `<path d="M470,560 V528 M560,560 V528 M650,560 V528 M740,560 V528" stroke="${warm?'#c9af7d':'#635849'}" stroke-width="3"/>`;

  // ============ 中央阁楼 ============
  s += `<rect x="522" y="302" width="156" height="88" fill="${bldgC}" stroke="${bldgSk}" stroke-width="5"/>`;
  const roofPeak = f.roof>=4?222:(f.roof>=1?232:236);
  s += `<path d="M472,308 L600,${roofPeak} L728,308 Z" fill="${roofC}" stroke="${roofSk}" stroke-width="5" stroke-linejoin="round"/>`;
  if(f.roof>=4){
    s += `<g fill="none" stroke="#c85d44" stroke-width="3"><path d="M505,292 Q600,318 695,292"/><path d="M526,276 Q600,296 674,276"/></g>`;
    s += `<rect x="472" y="304" width="256" height="9" rx="4" fill="#fff" stroke="#6b4f35" stroke-width="3"/>`;
  }
  // 旗杆
  if(f.roof<2){
    s += `<line x1="600" y1="${roofPeak}" x2="614" y2="176" stroke="#5e5648" stroke-width="6" stroke-linecap="round"/>`;
    s += `<path d="M614,180 l34,8 l-12,10 l10,10 l-32,4 Z" fill="#7d7468" stroke="#5e5648" stroke-width="2"/>`;
  } else if(f.roof<4){
    s += `<line x1="600" y1="${roofPeak}" x2="600" y2="174" stroke="#5e5648" stroke-width="6" stroke-linecap="round"/>`;
    s += `<path d="M600,178 l28,6 l-10,8 l8,8 l-26,3 Z" fill="#8a7a6a"/>`;
  } else {
    s += `<line x1="600" y1="222" x2="600" y2="164" stroke="#9a7148" stroke-width="6" stroke-linecap="round"/>`;
    s += `<polygon points="600,150 614,162 600,174 586,162" fill="#ffd45e" stroke="#c9942a" stroke-width="2"/>`;
    s += `<path d="M602,176 q34,4 40,18 q-22,4 -40,-6 Z" fill="#e85d75" stroke="#b3445a" stroke-width="2"/>`;
  }

  // ============ 左塔 ============
  s += `<rect x="252" y="330" width="172" height="230" rx="20" fill="${bldgC}" stroke="${bldgSk}" stroke-width="5"/>`;
  s += `<ellipse cx="338" cy="332" rx="92" ry="16" fill="${warm?'#f3e2c2':'#877a68'}" stroke="${bldgSk}" stroke-width="4"/>`;
  s += `<path d="M240,338 L338,${roofPeak} L436,338 Z" fill="${roofC}" stroke="${roofSk}" stroke-width="5" stroke-linejoin="round"/>`;
  if(f.roof>=4){
    s += `<g fill="none" stroke="#c85d44" stroke-width="2.6"><path d="M338,208 L338,338"/><path d="M338,214 Q300,282 258,332"/><path d="M338,214 Q376,282 418,332"/></g>`;
    s += `<circle cx="338" cy="200" r="11" fill="#ffd45e" stroke="#c9942a" stroke-width="3"/>`;
  } else if(f.roof<1){
    s += `<line x1="338" y1="236" x2="330" y2="190" stroke="#5e5648" stroke-width="6" stroke-linecap="round"/>`;
    s += `<path d="M330,194 l26,6 l-10,9 l8,8 l-24,3 Z" fill="#766d60"/>`;
  }

  // ============ 右塔 ============
  s += `<rect x="776" y="330" width="172" height="230" rx="20" fill="${bldgC}" stroke="${bldgSk}" stroke-width="5"/>`;
  s += `<ellipse cx="862" cy="332" rx="92" ry="16" fill="${warm?'#f3e2c2':'#827564'}" stroke="${bldgSk}" stroke-width="4"/>`;
  s += `<path d="M760,336 L862,${roofPeak} L964,336 Z" fill="${roofC}" stroke="${roofSk}" stroke-width="5" stroke-linejoin="round"/>`;
  if(f.roof>=4){
    s += `<g fill="none" stroke="#c85d44" stroke-width="2.6"><path d="M862,208 L862,338"/><path d="M862,214 Q824,286 782,332"/><path d="M862,214 Q900,286 942,332"/></g>`;
    s += `<circle cx="862" cy="200" r="11" fill="#ffd45e" stroke="#c9942a" stroke-width="3"/>`;
  } else if(f.roof<1){
    s += `<line x1="862" y1="236" x2="856" y2="198" stroke="#5e5648" stroke-width="6" stroke-linecap="round"/>`;
    s += `<path d="M856,202 l20,8 l-6,6" fill="none" stroke="#766d60" stroke-width="4"/>`;
  }

  // 彩旗串（roof>=3）
  if(f.roof>=3){
    const fy = f.roof>=4?'214':'228';
    s += `<path d="M338,${fy} Q600,272 862,${fy}" fill="none" stroke="#9a7148" stroke-width="3"/>`;
    const flags = [['392','224','#e85d75'],['444','231','#f2a93b'],['496','237','#4fb0e8'],['548','240','#7bc96f'],['593','254','#e85d75'],['638','240','#f2a93b'],['690','237','#4fb0e8'],['742','231','#7bc96f'],['794','224','#e85d75']];
    flags.forEach(([fx,fyy,fc])=>{ s += `<polygon points="${fx},${fyy} ${parseInt(fx)+14},${fyy} ${parseInt(fx)+7},${parseInt(fyy)+18}" fill="${fc}"/>`; });
  }

  // ============ 窗户 ============
  const winLv = f.win;
  const drawWin = (cx, cy) => {
    let w = '';
    if(winLv<1){
      // 钉死的窗
      w += `<path d="M${cx-17},${cy+28} V${cy} A17,17 0 0 1 ${cx+17},${cy} V${cy+28} Z" fill="#2b251f" stroke="${bldgSk}" stroke-width="4"/>`;
      w += `<rect x="${cx-16}" y="${cy-4}" width="34" height="8" rx="2" fill="#7a5a3c" transform="rotate(-18 ${cx} ${cy+12})"/>`;
      w += `<rect x="${cx-16}" y="${cy+8}" width="34" height="8" rx="2" fill="#705236" transform="rotate(14 ${cx} ${cy+16})"/>`;
    } else if(winLv<3){
      w += `<path d="M${cx-17},${cy+28} V${cy} A17,17 0 0 1 ${cx+17},${cy} V${cy+28} Z" fill="#87CEEB" stroke="${bldgSk}" stroke-width="3"/>`;
      w += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy+28}" stroke="${bldgSk}" stroke-width="2"/>`;
      if(winLv===1) w += `<path d="M${cx-10},${cy+4} L${cx+10},${cy+20}" stroke="#fff" stroke-width="1" opacity=".5"/>`;
    } else if(winLv<4){
      w += `<path d="M${cx-17},${cy+28} V${cy} A17,17 0 0 1 ${cx+17},${cy} V${cy+28} Z" fill="#87CEEB" stroke="${bldgSk}" stroke-width="3"/>`;
      for(let i=0;i<5;i++) w += `<rect x="${cx-15+i*7}" y="${cy}" width="2" height="28" fill="#4a4a4a"/>`;
    } else {
      // 暖光花窗
      w += `<path d="M${cx-21},${cy+32} V${cy} A21,21 0 0 1 ${cx+21},${cy} V${cy+32} Z" fill="#f3e4c8" stroke="${bldgSk}" stroke-width="3"/>`;
      w += `<path d="M${cx-15},${cy+32} V${cy+2} A15,15 0 0 1 ${cx+15},${cy+2} V${cy+32} Z" fill="url(#winG)"/>`;
      w += `<line x1="${cx}" y1="${cy+2}" x2="${cx}" y2="${cy+32}" stroke="#fff" stroke-width="3"/>`;
      w += `<line x1="${cx-15}" y1="${cy+16}" x2="${cx+15}" y2="${cy+16}" stroke="#fff" stroke-width="3"/>`;
      w += `<rect x="${cx-23}" y="${cy+32}" width="46" height="8" rx="3" fill="#b5793f"/>`;
      w += `<circle cx="${cx-10}" cy="${cy+29}" r="4.5" fill="#5fae4d"/><circle cx="${cx}" cy="${cy+27}" r="5" fill="#6fbf57"/><circle cx="${cx+10}" cy="${cy+29}" r="4.5" fill="#5fae4d"/>`;
      if(winLv>=5){ w += `<circle cx="${cx-7}" cy="${cy+25}" r="2.4" fill="#f06292"/>`; w += `<circle cx="${cx+8}" cy="${cy+25}" r="2.4" fill="#ffd54f"/>`; }
    }
    return w;
  };
  s += drawWin(441, 442);
  s += drawWin(517, 442);
  s += drawWin(683, 442);
  s += drawWin(759, 442);

  // 塔圆窗
  const drawTowerWin = (cx, cy) => {
    let w = '';
    if(winLv<1){
      w += `<circle cx="${cx}" cy="${cy}" r="22" fill="#2b251f" stroke="${bldgSk}" stroke-width="4"/>`;
      w += `<rect x="${cx-17}" y="${cy-4}" width="34" height="8" fill="#7a5a3c" transform="rotate(-20 ${cx} ${cy})"/>`;
    } else if(winLv<3){
      w += `<circle cx="${cx}" cy="${cy}" r="22" fill="#87CEEB" stroke="${bldgSk}" stroke-width="4"/>`;
      w += `<line x1="${cx}" y1="${cy-22}" x2="${cx}" y2="${cy+22}" stroke="${bldgSk}" stroke-width="2"/>`;
      w += `<line x1="${cx-22}" y1="${cy}" x2="${cx+22}" y2="${cy}" stroke="${bldgSk}" stroke-width="2"/>`;
    } else if(winLv<4){
      w += `<circle cx="${cx}" cy="${cy}" r="22" fill="#87CEEB" stroke="${bldgSk}" stroke-width="4"/>`;
      for(let i=0;i<5;i++) w += `<rect x="${cx-20+i*8}" y="${cy-22}" width="2" height="44" fill="#4a4a4a"/>`;
    } else {
      w += `<circle cx="${cx}" cy="${cy}" r="24" fill="#f3e4c8" stroke="${bldgSk}" stroke-width="4"/>`;
      w += `<circle cx="${cx}" cy="${cy}" r="17" fill="url(#winG)"/>`;
      w += `<line x1="${cx}" y1="${cy-17}" x2="${cx}" y2="${cy+17}" stroke="#fff" stroke-width="3.5"/>`;
      w += `<line x1="${cx-17}" y1="${cy}" x2="${cx+17}" y2="${cy}" stroke="#fff" stroke-width="3.5"/>`;
    }
    return w;
  };
  s += drawTowerWin(338, 404);
  s += drawTowerWin(862, 404);

  // ============ 大门 ============
  const dlv = f.door;
  if(dlv<1){
    s += `<path d="M552,560 V478 A48,48 0 0 1 648,478 V560 Z" fill="#27221c" stroke="${bldgSk}" stroke-width="5"/>`;
    s += `<rect x="560" y="486" width="20" height="74" fill="#76563a"/>`;
    s += `<rect x="584" y="498" width="18" height="62" fill="#6a4d34"/>`;
    s += `<rect x="606" y="488" width="22" height="72" fill="#7a5a3c"/>`;
  } else {
    const dc = dlv>=4?'#b5693f':dlv>=3?'#6a6a6a':dlv>=2?'#7a5a3a':'#6a4a2a';
    s += `<path d="M548,560 V476 A52,52 0 0 1 652,476 V560 Z" fill="${dc}" stroke="${bldgSk}" stroke-width="5"/>`;
    if(dlv>=2) s += `<line x1="600" y1="452" x2="600" y2="560" stroke="#7a4326" stroke-width="4"/>`;
    if(dlv>=3) for(let i=0;i<4;i++) s += `<rect x="${554+i*24}" y="476" width="3" height="84" fill="#4a4a4a"/>`;
    if(dlv>=4){
      s += `<path d="M568,486 A32,32 0 0 1 632,486 V512 A32,32 0 0 1 568,512 Z" fill="url(#winG)" opacity=".9"/>`;
      s += `<line x1="600" y1="458" x2="600" y2="512" stroke="#fff" stroke-width="3"/>`;
      s += `<g fill="#f4cf6d" stroke="#b98a2e" stroke-width="1.2"><circle cx="580" cy="528" r="4"/><circle cx="620" cy="528" r="4"/></g>`;
    }
    if(dlv>=5){
      s += `<circle cx="580" cy="548" r="4" fill="#f4cf6d"/><circle cx="620" cy="548" r="4" fill="#f4cf6d"/>`;
      s += `<circle cx="592" cy="536" r="4.5" fill="none" stroke="#f4cf6d" stroke-width="3"/><circle cx="608" cy="536" r="4.5" fill="none" stroke="#f4cf6d" stroke-width="3"/>`;
      s += `<rect x="540" y="556" width="120" height="9" rx="3" fill="#cfc4ad"/>`;
    }
  }

  // ============ 天台 ============
  const tlv = f.top;
  if(tlv>=1){
    const railC = tlv>=4?'#f2c14e':tlv>=3?'#8a8a8a':'#6b5f4c';
    s += `<line x1="398" y1="386" x2="514" y2="386" stroke="${railC}" stroke-width="5" stroke-linecap="round"/>`;
    s += `<line x1="686" y1="386" x2="802" y2="386" stroke="${railC}" stroke-width="5" stroke-linecap="round"/>`;
    if(tlv>=2){
      [406,432,458,484,510,690,716,742,768,794].forEach(px=>{ s += `<rect x="${px}" y="${tlv>=4?372:376}" width="7" height="${tlv>=4?16:12}" fill="${railC}"/>`; });
    }
    if(tlv>=4){
      s += `<rect x="420" y="386" width="82" height="16" rx="3" fill="#b5793f" stroke="#8a5a2c" stroke-width="2"/>`;
      s += `<circle cx="438" cy="382" r="8" fill="#5fae4d"/><circle cx="456" cy="378" r="9" fill="#6fbf57"/><circle cx="476" cy="382" r="8" fill="#5fae4d"/>`;
      s += `<rect x="700" y="386" width="82" height="16" rx="3" fill="#b5793f" stroke="#8a5a2c" stroke-width="2"/>`;
      s += `<circle cx="718" cy="382" r="8" fill="#5fae4d"/><circle cx="738" cy="378" r="9" fill="#6fbf57"/><circle cx="758" cy="382" r="8" fill="#5fae4d"/>`;
    }
    if(tlv>=5){
      s += `<circle cx="442" cy="376" r="3.4" fill="#f06292"/><circle cx="466" cy="374" r="3.4" fill="#ffd54f"/>`;
      s += `<circle cx="726" cy="375" r="3.4" fill="#7e9bff"/><circle cx="748" cy="374" r="3.4" fill="#f06292"/>`;
      s += `<g fill="#f2c14e"><circle cx="406" cy="370" r="3.5"/><circle cx="458" cy="370" r="3.5"/><circle cx="716" cy="370" r="3.5"/><circle cx="768" cy="370" r="3.5"/></g>`;
    }
  }

  // ============ 草地装饰 ============
  if(warm){
    s += `<g><circle cx="150" cy="556" r="22" fill="#5fae4d"/><circle cx="182" cy="552" r="26" fill="#6fbf57"/><circle cx="212" cy="558" r="20" fill="#57a347"/></g>`;
    s += `<g><circle cx="1000" cy="556" r="22" fill="#5fae4d"/><circle cx="1032" cy="552" r="26" fill="#6fbf57"/><circle cx="1062" cy="558" r="20" fill="#57a347"/></g>`;
    s += `<g stroke="#4e9c3e" stroke-width="3" stroke-linecap="bottom"><line x1="120" y1="640" x2="120" y2="658"/><line x1="250" y1="660" x2="250" y2="678"/><line x1="880" y1="632" x2="880" y2="650"/><line x1="1090" y1="640" x2="1090" y2="658"/></g>`;
    s += `<circle cx="120" cy="636" r="6" fill="#f06292"/><circle cx="250" cy="656" r="6" fill="#ffd54f"/><circle cx="880" cy="628" r="6" fill="#7e9bff"/><circle cx="1090" cy="636" r="6" fill="#f06292"/>`;
  } else {
    s += `<g fill="#7b7060"><polygon points="250,600 268,596 262,612"/><polygon points="700,610 716,604 718,620"/><polygon points="880,598 894,592 898,608"/></g>`;
    s += `<g stroke="#8a7a4e" stroke-width="4" stroke-linecap="round" fill="none"><path d="M120,610 l-6,-22 M128,612 l4,-24 M360,614 l-6,-20 M820,612 l-8,-20"/></g>`;
  }

  // ============ 设备标签 ============
  const spotLabels = [
    {spot:'win',  x:600, y:430},
    {spot:'door', x:600, y:470},
    {spot:'wall', x:209, y:460},
    {spot:'back', x:973, y:508},
    {spot:'roof', x:600, y:200},
    {spot:'top',  x:600, y:378},
  ];
  spotLabels.forEach(({spot, x, y})=>{
    const list = placedList(spot);
    if(list){ s += `<text x="${x}" y="${y}" text-anchor="middle" font-size="22">${list}</text>`; }
  });

  s += `</svg>`;

  // 点位等级说明
  const spotInfo = SPOTS.map(sp=>{
    const lv = f[sp.k];
    const color = lv>=3?'#2E7D32':lv>=1?'#F5A623':'#E74C3C';
    return `<span style="display:inline-block;margin:2px 6px 2px 0;font-size:12px">${sp.e}${sp.n} <b style="color:${color}">${lvText(lv)}</b>${placedList(sp.k)?' '+placedList(sp.k):''}</span>`;
  }).join('');

  showPopup(`<h3>🏫 幼儿园全景</h3>
    <div style="text-align:center;font-size:11px;color:var(--soft);margin-bottom:6px">加固等级越高，防御越强 · 点击右上角📜查看夜袭记录</div>
    ${s}
    <div style="margin-top:8px;padding:6px;background:var(--bg);border-radius:8px;font-size:11px;line-height:1.6">
      ${spotInfo}
    </div>
    <div class="btns"><button id="pa-close">关闭</button></div>`);
  $('pa-close').onclick = closePopup;
}

/* ---------- 🔍 加固点位局部升级详情（当前等级 vs 下一级对比） ---------- */
function showSpotDetail(spotKey){
  const spot = SPOTS.find(s=>s.k===spotKey);
  if(!spot) return;
  const lv = state.fort[spotKey];
  const isMax = lv >= 5;
  const isBroken = lv < 0;
  
  // 绘制单个点位的局部 SVG（按等级）
  function drawSpot(lv, w, h){
    let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:linear-gradient(to bottom,#fff4da 0%,#f3d8a4 100%);border-radius:8px">`;
    const k = spotKey;
    if(k==='win'){
      // 窗户（绘本风拱形）
      const cx=w/2;
      if(lv<1){
        s += `<path d="M${cx-22},${h-10} V${15} A22,22 0 0 1 ${cx+22},${15} V${h-10} Z" fill="#2b251f" stroke="#6b4f35" stroke-width="2"/>`;
        s += `<rect x="${cx-20}" y="${10}" width="40" height="8" rx="2" fill="#7a5a3c" transform="rotate(-18 ${cx} ${h/2})"/>`;
        s += `<rect x="${cx-20}" y="${h/2+2}" width="40" height="8" rx="2" fill="#705236" transform="rotate(14 ${cx} ${h/2+6})"/>`;
      } else if(lv<3){
        s += `<path d="M${cx-22},${h-10} V${15} A22,22 0 0 1 ${cx+22},${15} V${h-10} Z" fill="#87CEEB" stroke="#6b4f35" stroke-width="2"/>`;
        s += `<line x1="${cx}" y1="15" x2="${cx}" y2="${h-10}" stroke="#6b4f35" stroke-width="1.5"/>`;
        if(lv===1) s += `<path d="M${cx-12},${20} L${cx+12},${h-15}" stroke="#fff" stroke-width="1" opacity=".5"/>`;
      } else if(lv<4){
        s += `<path d="M${cx-22},${h-10} V${15} A22,22 0 0 1 ${cx+22},${15} V${h-10} Z" fill="#87CEEB" stroke="#6b4f35" stroke-width="2"/>`;
        for(let i=0;i<5;i++) s += `<rect x="${cx-20+i*9}" y="15" width="2.5" height="${h-25}" fill="#4a4a4a"/>`;
      } else {
        s += `<path d="M${cx-25},${h-8} V${12} A25,25 0 0 1 ${cx+25},${12} V${h-8} Z" fill="#f3e4c8" stroke="#6b4f35" stroke-width="2"/>`;
        s += `<path d="M${cx-18},${h-8} V${14} A18,18 0 0 1 ${cx+18},${14} V${h-8} Z" fill="#ffe9a8"/>`;
        s += `<line x1="${cx}" y1="14" x2="${cx}" y2="${h-8}" stroke="#fff" stroke-width="2"/>`;
        s += `<line x1="${cx-18}" y1="${h/2}" x2="${cx+18}" y2="${h/2}" stroke="#fff" stroke-width="2"/>`;
        s += `<rect x="${cx-28}" y="${h-14}" width="56" height="8" rx="3" fill="#b5793f"/>`;
        s += `<circle cx="${cx-10}" cy="${h-16}" r="5" fill="#5fae4d"/><circle cx="${cx}" cy="${h-18}" r="6" fill="#6fbf57"/><circle cx="${cx+10}" cy="${h-16}" r="5" fill="#5fae4d"/>`;
        if(lv>=5){ s += `<circle cx="${cx-8}" cy="${h-20}" r="3" fill="#f06292"/>`; s += `<circle cx="${cx+8}" cy="${h-20}" r="3" fill="#ffd54f"/>`; }
      }
    } else if(k==='door' || k==='back'){
      const dw = k==='back'?w*0.7:w;
      const dx = (w-dw)/2;
      if(lv<1){
        s += `<path d="M${dx},${h-8} V${12} A${dw/2},${dw/2} 0 0 1 ${dx+dw},${12} V${h-8} Z" fill="#27221c" stroke="#6b4f35" stroke-width="2"/>`;
        s += `<rect x="${dx+4}" y="${16}" width="${dw*0.3}" height="${h-24}" fill="#76563a"/>`;
        s += `<rect x="${dx+dw*0.5}" y="${20}" width="${dw*0.3}" height="${h-28}" fill="#6a4d34"/>`;
      } else {
        const dc = lv>=4?(k==='back'?'#5e8f6b':'#b5693f'):lv>=3?'#6a6a6a':lv>=2?'#7a5a3a':'#6a4a2a';
        s += `<path d="M${dx},${h-8} V${12} A${dw/2},${dw/2} 0 0 1 ${dx+dw},${12} V${h-8} Z" fill="${dc}" stroke="#6b4f35" stroke-width="2"/>`;
        if(lv>=2) s += `<line x1="${dx+dw/2}" y1="14" x2="${dx+dw/2}" y2="${h-8}" stroke="${k==='back'?'#4a6b3a':'#7a4326'}" stroke-width="2"/>`;
        if(lv>=3) for(let i=0;i<4;i++) s += `<rect x="${dx+4+i*(dw-8)/3}" y="12" width="2.5" height="${h-20}" fill="#4a4a4a"/>`;
        if(lv>=4){
          s += `<path d="M${dx+dw*0.15},${h*0.3} A${dw*0.35},${dw*0.35} 0 0 1 ${dx+dw*0.85},${h*0.3} V${h*0.55} A${dw*0.35},${dw*0.35} 0 0 1 ${dx+dw*0.15},${h*0.55} Z" fill="#ffe9a8" opacity=".85"/>`;
          s += `<g fill="#f4cf6d" stroke="#b98a2e" stroke-width="0.8"><circle cx="${dx+dw*0.25}" cy="${h*0.7}" r="3"/><circle cx="${dx+dw*0.75}" cy="${h*0.7}" r="3"/></g>`;
        }
        if(lv>=5){ s += `<circle cx="${dx+dw*0.25}" cy="${h*0.85}" r="3" fill="#f4cf6d"/>`; s += `<circle cx="${dx+dw*0.75}" cy="${h*0.85}" r="3" fill="#f4cf6d"/>`; }
      }
    } else if(k==='wall'){
      const wc = lv>=4?'#f3ddab':lv>=2?'#d8c8a4':'#857969';
      const ws = lv>=4?'#6b4f35':'#57483a';
      if(lv<2){
        s += `<path d="M0,${h*0.25} L10,${h*0.18} L25,${h*0.25} L30,${h*0.15} L50,${h*0.22} L${w*0.6},${h*0.12} L${w*0.7},${h*0.25} L${w*0.85},${h*0.15} L${w},${h*0.22} L${w},${h} L0,${h} Z" fill="${wc}" stroke="${ws}" stroke-width="2"/>`;
        s += `<ellipse cx="${w*0.5}" cy="${h*0.6}" rx="${w*0.12}" ry="${h*0.12}" fill="#2f2922"/>`;
      } else {
        s += `<rect x="0" y="${h*0.22}" width="${w}" height="${h*0.78}" fill="${wc}" stroke="${ws}" stroke-width="2"/>`;
        if(lv>=3){
          for(let i=0;i<3;i++) s += `<rect x="${10+i*30}" y="${h*0.12}" width="18" height="14" rx="2" fill="${lv>=4?'#f9e9c6':'#d8c8a4'}" stroke="${ws}" stroke-width="1.5"/>`;
          s += `<rect x="0" y="${h*0.18}" width="${w}" height="8" rx="3" fill="${lv>=4?'#ef9b82':'#8a7a6a'}"/>`;
        }
        if(lv>=4) s += `<path d="M0,${h*0.5} H${w} M0,${h*0.75} H${w}" stroke="#e0c490" stroke-width="2"/>`;
        if(lv>=5){ s += `<rect x="8" y="${h*0.82}" width="14" height="16" fill="#5fae4d"/>`; s += `<rect x="${w-22}" y="${h*0.82}" width="14" height="16" fill="#5fae4d"/>`; }
      }
    } else if(k==='roof'){
      const rc = lv>=4?'#e87a5d':lv>=3?'#9a6a4a':lv>=1?'#754a42':'#6f4640';
      const rs = lv>=4?'#6b4f35':'#57483a';
      s += `<path d="M0,${h*0.65} L${w/2},${h*0.1} L${w},${h*0.65} Z" fill="${rc}" stroke="${rs}" stroke-width="2"/>`;
      if(lv<1){ s += `<ellipse cx="${w*0.35}" cy="${h*0.4}" rx="${w*0.1}" ry="${h*0.08}" fill="#2c221e"/>`; s += `<ellipse cx="${w*0.65}" cy="${h*0.45}" rx="${w*0.08}" ry="${h*0.06}" fill="#2c221e"/>`; }
      if(lv>=2) s += `<path d="M0,${h*0.65} L${w/2},${h*0.1} L${w},${h*0.65}" fill="none" stroke="${lv>=4?'#c85d44':'#5A3A2A'}" stroke-width="${lv>=4?3:1.5}"/>`;
      if(lv>=3){
        s += `<g fill="none" stroke="#c85d44" stroke-width="1.5"><path d="M${w/2},${h*0.1} L${w/2},${h*0.65}"/><path d="M${w/2},${h*0.18} Q${w*0.3},${h*0.4} ${w*0.1},${h*0.6}"/><path d="M${w/2},${h*0.18} Q${w*0.7},${h*0.4} ${w*0.9},${h*0.6}"/></g>`;
      }
      if(lv>=4){
        s += `<circle cx="${w/2}" cy="${h*0.08}" r="5" fill="#ffd45e" stroke="#c9942a" stroke-width="1.5"/>`;
        s += `<polygon points="${w/2},${h*0.02} ${w/2+6},${h*0.08} ${w/2},${h*0.14} ${w/2-6},${h*0.08}" fill="#ffd45e" stroke="#c9942a" stroke-width="1"/>`;
      }
      if(lv>=5){ s += `<polygon points="${w*0.3},${h*0.3} ${w*0.34},${h*0.22} ${w*0.38},${h*0.3}" fill="#e85d75"/>`; s += `<polygon points="${w*0.6},${h*0.25} ${w*0.64},${h*0.17} ${w*0.68},${h*0.25}" fill="#4fb0e8"/>`; }
    } else if(k==='top'){
      if(lv<1){
        s += `<rect x="0" y="${h*0.55}" width="${w}" height="${h*0.45}" fill="#857969"/>`;
        s += `<rect x="0" y="${h*0.52}" width="${w}" height="4" fill="#57483a"/>`;
      } else {
        const rc = lv>=4?'#f2c14e':lv>=3?'#8a8a8a':'#6b5f4c';
        s += `<rect x="0" y="${h*0.55}" width="${w}" height="${h*0.45}" fill="${lv>=4?'#fff4da':'#d8c8a4'}" stroke="${lv>=4?'#6b4f35':'#57483a'}" stroke-width="1.5"/>`;
        s += `<line x1="0" y1="${h*0.5}" x2="${w}" y2="${h*0.5}" stroke="${rc}" stroke-width="3" stroke-linecap="round"/>`;
        if(lv>=2){ for(let i=0;i<=5;i++) s += `<rect x="${i*w/5}" y="${h*0.35}" width="3" height="${h*0.16}" fill="${rc}"/>`; }
        if(lv>=3) for(let i=0;i<8;i++) s += `<line x1="${i*w/8}" y1="${h*0.35}" x2="${i*w/8}" y2="${h*0.55}" stroke="${rc}" stroke-width="1" opacity=".5"/>`;
        if(lv>=4){
          s += `<rect x="${w*0.15}" y="${h*0.55}" width="${w*0.25}" height="${h*0.12}" rx="2" fill="#b5793f"/>`;
          s += `<circle cx="${w*0.22}" cy="${h*0.52}" r="5" fill="#5fae4d"/><circle cx="${w*0.3}" cy="${h*0.5}" r="6" fill="#6fbf57"/>`;
          s += `<rect x="${w*0.6}" y="${h*0.55}" width="${w*0.25}" height="${h*0.12}" rx="2" fill="#b5793f"/>`;
          s += `<circle cx="${w*0.67}" cy="${h*0.52}" r="5" fill="#5fae4d"/><circle cx="${w*0.75}" cy="${h*0.5}" r="6" fill="#6fbf57"/>`;
        }
        if(lv>=5){
          s += `<circle cx="${w*0.25}" cy="${h*0.48}" r="3" fill="#f06292"/><circle cx="${w*0.35}" cy="${h*0.47}" r="3" fill="#ffd54f"/>`;
          s += `<circle cx="${w*0.7}" cy="${h*0.48}" r="3" fill="#7e9bff"/><circle cx="${w*0.8}" cy="${h*0.47}" r="3" fill="#f06292"/>`;
        }
      }
    }
    s += `</svg>`;
    return s;
  }
  
  const curSvg = drawSpot(lv, 120, 100);
  // 破损修复目标：回到破损前等级（旧档无记录兜底 Lv0）
  const baseLv = Math.max(0, Math.min(5, (state.fortBase && typeof state.fortBase[spotKey]==='number') ? state.fortBase[spotKey] : 0));
  const nextLv = isBroken ? baseLv : (isMax ? lv : lv+1);
  const nextSvg = drawSpot(nextLv, 120, 100);
  
  // 升级消耗
  let costHtml = '';
  if(isBroken){
    const cost = repairCost(spotKey, lv, baseLv);
    costHtml = Object.entries(cost).map(([k,v])=>{
      const have = state.inv[k]||0;
      const ok = have>=v;
      const haveColor = have>=1 ? '#2E7D32' : '#999';
      const e = (ITEM_INFO[k]&&ITEM_INFO[k].e)||'?';
      return `<span style="color:${ok?'#2E7D32':'#E74C3C'}">${e}${v}</span><span style="color:${haveColor}">(${have})</span>`;
    }).join(' ');
    costHtml = `<div style="margin-top:6px;font-size:12px">修复消耗：${costHtml}</div>`;
  } else if(!isMax){
    const cost = FORT_COST[spotKey][lv];
    costHtml = Object.entries(cost).map(([k,v])=>{
      const have = state.inv[k]||0;
      const ok = have>=v;
      const haveColor = have>=1 ? '#2E7D32' : '#999';
      const e = (ITEM_INFO[k]&&ITEM_INFO[k].e)||'?';
      return `<span style="color:${ok?'#2E7D32':'#E74C3C'}">${e}${v}</span><span style="color:${haveColor}">(${have})</span>`;
    }).join(' ');
    costHtml = `<div style="margin-top:6px;font-size:12px">升级消耗：${costHtml}</div>`;
  } else {
    costHtml = `<div style="margin-top:6px;font-size:12px;color:var(--accent)">✨ 已达最高等级，无需升级</div>`;
  }
  
  // 已放置设备
  const eq = {trap:'🪤',shock:'⚡',flame:'🔥',acid:'🧪',decoy:'📢',birdnet:'🕸️'};
  const placedHere = Object.entries(state.placed[spotKey]||{}).filter(([k,v])=>v>0).map(([k,v])=>eq[k]+(v>1?`×${v}`:'')).join(' ');
  
  showPopup(`<h3>${spot.e} ${spot.n} · 升级详情</h3>
    <div class="fg" style="--g:12px;justify-content:center;align-items:flex-end;margin:8px 0">
      <div style="text-align:center">
        <div style="font-size:11px;color:var(--soft);margin-bottom:4px">当前 ${lvText(lv)}</div>
        ${curSvg}
      </div>
      <div style="font-size:24px;color:var(--accent);align-self:center">${isMax?'':'→'}</div>
      <div style="text-align:center">
        <div style="font-size:11px;color:var(--soft);margin-bottom:4px">${isMax?'已满级':isBroken?'修复至 Lv'+nextLv:lvText(nextLv)}</div>
        ${nextSvg}
      </div>
    </div>
    ${costHtml}
    ${placedHere?`<div style="margin-top:6px;font-size:12px">已布防：${placedHere}</div>`:''}
    <div class="btns" style="margin-top:10px">
      <button id="sd-fortify">${isBroken?'🔧 修复':'⬆️ 去加固'}</button>
      <button id="sd-close">关闭</button>
    </div>`);
  const fb = $('sd-fortify'); if(fb) fb.onclick = ()=>{ closePopup(); doAction('fortify'); };
  const cb = $('sd-close'); if(cb) cb.onclick = closePopup;
}

/* ---------- 🧸 装饰架管理 ---------- */
function showDecorShelf(){
  const decors = state.decor||[];
  // 图鉴始终展示全部格子：已获得显示实物+描述，未获得只显示一个❓，地点与阶段留给玩家自行探索
  const allItems = Object.entries(DECOR_ITEMS);
  const grid = allItems.map(([k,v])=>{
    const have = decors.includes(k);
    if(have){
      return `<div style="background:#E8F5E9;border:1.5px solid #81C784;border-radius:10px;padding:10px;text-align:center">
        <div style="font-size:28px">${v.e}</div>
        <div style="font-size:11px;font-weight:bold;margin-top:4px">${v.n}</div>
        <div style="font-size:10px;color:var(--soft);margin-top:2px">${v.desc}</div>
      </div>`;
    }
    // 未获得：纯神秘格子，不透露任何线索
    return `<div style="background:#F5F5F5;border:1.5px dashed #CCC;border-radius:10px;padding:10px;text-align:center;opacity:0.6">
      <div style="font-size:28px">❓</div>
      <div style="font-size:11px;margin-top:4px;color:var(--soft)">未发现</div>
    </div>`;
  }).join('');
  showPopup(`<h3>🧸 教室装饰架（${decors.length}/${allItems.length}）</h3>
    <div style="font-size:11px;color:var(--soft);text-align:center;margin-bottom:8px">外出搜刮时，也许会遇到孩子们喜欢的小玩意儿</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;grid-gap:8px;gap:8px">${grid}</div>
    <div class="btns" style="margin-top:10px"><button id="ds-close">关闭</button></div>`);
  $('ds-close').onclick = ()=>{ state.decorSeen = decors.length; saveState(); closePopup(); };
}



// 存档兼容：补全新版本新增字段
function migrateState(s){
  if(!s.placed){
    s.placed = {};
  }
  SPOTS.forEach(sp=>{ if(!s.placed[sp.k]) s.placed[sp.k] = {trap:0,shock:0,flame:0,acid:0,decoy:0}; });
  if(!s.defenseLog) s.defenseLog = [];
  if(!s.weather) s.weather = rollWeather();
  // slot 迁移到7时段模型（白天6节+晚上=6）：
  // 两代老存档的「晚上」（旧3时段模型=2 / 5时段模型=4）统一映射到新晚上 slot 6
  if(s.slot===2 || s.slot===4){ s.slot = 6; }
  else if(typeof s.slot==='number' && s.slot>=0 && s.slot<6){
    s.slot = Math.min(s.outCount||0, 6); // 白天时段与今日已外出次数保持同步
  }else{ s.slot = 0; }
  if(!Array.isArray(s.decor)) s.decor = [];
  if(s.decorSeen===undefined) s.decorSeen = 0;
  // 孩子养成+死亡字段（老存档 backfill）
  if(s.kids){
    s.kids.forEach(k=>{
      if(k.mood===undefined) k.mood = 70;
      if(k.comforted===undefined) k.comforted = false;
      if(k.fedTrustGain===undefined) k.fedTrustGain = 0;
      if(k.tantrum===undefined) k.tantrum = (k.trust===0);
      if(k.fedMeal===undefined) k.fedMeal = 0;
      if(k.trust===undefined) k.trust = 30;
      if(k.exp===undefined) k.exp = 0;
      if(k.lv===undefined) k.lv = 1;
      if(!Array.isArray(k.skills)) k.skills = [];
      if(k.downDays===undefined) k.downDays = k.down ? 1 : 0;
      if(k.dead===undefined) k.dead = false;
      if(k.sick===undefined) k.sick = null;
      if(k.immuneDays===undefined) k.immuneDays = 0;
      if(k.coreLv===undefined){
        // 老存档兼容：coreLv = 已拥有技能数（封顶4）
        const _oldCount = Array.isArray(k.skills)?k.skills.length:0;
        k.coreLv = Math.min(4, _oldCount);
        // 惊喜：旧版本已觉醒到 Lv2-4 的玩家，按新版本随机重抽技能（基础技能必带 + 随机 1 个），显示与新版本一致
        if(k.coreLv >= 2){
          const _idx = (s.kids||[]).indexOf(k);
          const _pool = _idx>=0 ? KID_SKILL_POOL[KIDS_DEF[_idx].id] : null;
          if(_pool){
            const _rest = [..._pool.weak, ..._pool.mid, ..._pool.strong];
            for(let a=_rest.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));const _t=_rest[a];_rest[a]=_rest[b];_rest[b]=_t;}
            k.skills = [_pool.base, _rest[0]];
          }
        } else if(k.coreLv === 1){
          const _idx = (s.kids||[]).indexOf(k);
          const _pool = _idx>=0 ? KID_SKILL_POOL[KIDS_DEF[_idx].id] : null;
          if(_pool) k.skills = [_pool.base];
        }
      }
      // 技能封顶 2：保留基础技能（若有）+ 其余按顺序补齐
      if(Array.isArray(k.skills) && k.skills.length > 2){
        const _idx = (s.kids||[]).indexOf(k);
        const _pool = _idx>=0 ? KID_SKILL_POOL[KIDS_DEF[_idx].id] : null;
        const keep = [];
        if(_pool && k.skills.includes(_pool.base)) keep.push(_pool.base);
        for(const _n of k.skills){ if(keep.length<2 && !keep.includes(_n) && SKILL_INFO[_n]) keep.push(_n); }
        k.skills = keep;
      }
    });
  }
  if(!s.corePendants) s.corePendants = {1:0,2:0,3:0,4:0};
  if(!s.garden) s.garden = {plots:[null,null,null,null,null,null], unlocked:1};
  if(s.gardenTries===undefined) s.gardenTries = 0;
  if(s.gardenManual===undefined) s.gardenManual = false;
  if(!Array.isArray(s.blueprints)) s.blueprints = []; // 老存档：设备图纸功能上线前的存档补空数组，否则 .includes 会抛错
  // 破损前等级：老存档无记录时补 0（修复后回到 Lv0），保证修复按钮有明确目标等级
  if(!s.fortBase || typeof s.fortBase!=='object') s.fortBase = {};
  SPOTS.forEach(sp=>{ if(typeof s.fortBase[sp.k]!=='number') s.fortBase[sp.k] = 0; });
  if(s.inv){
    if(!s.inv.food) s.inv.food = {};
    ['veg','noodle','candy','soda','cake','pudding'].forEach(k=>{ if(s.inv.food[k]===undefined) s.inv.food[k]=0; });
    ['feverMed','coughMed','bandage','vitamin','energy','water'].forEach(k=>{ if(s.inv[k]===undefined) s.inv[k]=0; });
    // 高级材料独立库存 key backfill（老存档此前没有这4个键）
    ['steel','chip','glass','alloy'].forEach(k=>{ if(s.inv[k]===undefined) s.inv[k]=0; });
  }
  if(s.devices && s.devices.birdnet===undefined) s.devices.birdnet = 0;
  if(s.placed && s.placed.top && s.placed.top.birdnet===undefined) s.placed.top.birdnet = 0;
  // 晶核项链入口：老存档若已持有晶核或已做过项链，视为早已解锁
  if(s.foundCore===undefined){
    s.foundCore = !!((s.inv && (s.inv.core||0)>0) ||
      (s.corePendants && Object.values(s.corePendants).some(v=>(v||0)>0)));
  }
  if(s.teacher && s.teacher.sick===undefined) s.teacher.sick = null;
  if(!Array.isArray(s.logicRecent)) s.logicRecent = [];
  if(!Array.isArray(s.mathRecent)) s.mathRecent = [];
  if(typeof s.fdSkillUsed!=='number') s.fdSkillUsed = 0;
  // 老存档：按已达到的项链阶数（孩子已觉醒阶 / 已拥有的项链）推导解锁可见阶，不惩罚老玩家
  if(typeof s.pendantUnlock!=='number'){
    let reached = 0;
    if(Array.isArray(s.kids)) s.kids.forEach(k=>{ if(k && k.coreLv>reached) reached=k.coreLv; });
    if(s.corePendants) Object.keys(s.corePendants).forEach(k=>{ const lv=+k; if((s.corePendants[lv]||0)>0 && lv>reached) reached=lv; });
    s.pendantUnlock = Math.min(4, Math.max(1, reached+1));
  }
  return s;
}

/* ---------- 开场流程 ---------- */
function enterHome(){
  $('intro').classList.remove('active');
  $('home').classList.add('active');
  document.body.classList.add('home-active'); // 替代 body:has(#home.active)，兼容旧内核
  render();
}
$('pick-male').onclick = ()=>pickGender('male');
$('pick-female').onclick = ()=>pickGender('female');
function pickGender(g){
  pendingGender = g;
  $('pick-male').classList.toggle('active', g==='male');
  $('pick-female').classList.toggle('active', g==='female');
  $('btn-start').disabled = false;
}
$('btn-start').onclick = ()=>{
  state = newState(pendingGender);
  saveState();
  enterHome();
  toast('第一天开始了，照顾好孩子们');
};
$('btn-continue').onclick = ()=>{
  const saved = loadState();
  if(!saved || !saved.day){ toast('存档读取失败'); return; }
  state = migrateState(saved);
  saveState(); // 迁移后立即落盘，避免切后台时迁移结果丢失
  enterHome();
  toast(`欢迎回来，第 ${state.day} 天`);
};
// 防御日志按钮
$('btn-defense-log').onclick = ()=>{ if(state) showDefenseLog(); };
$('btn-panorama').onclick = ()=>{ if(state) showPanorama(); };

/* ---------- 启动 ---------- */
(function(){
  // 开场主视觉复用教室场景图（读取页内已内嵌的 base64，不产生任何外部请求）
  const ci=$('classroom-img');
  if(ci && ci.src) document.documentElement.style.setProperty('--roomImg','url("'+ci.src+'")');
  const saved = loadState();
  if(saved && saved.day){ $('btn-continue').style.display='block'; }
})();
