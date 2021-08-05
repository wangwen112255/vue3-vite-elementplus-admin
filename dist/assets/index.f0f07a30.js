import{d as e,v as l,a as o,b as a,e as t,f as n,g as s,A as i,y as u,q as r,u as d,r as m,c,I as p,h as g,G as f,L as C,m as v}from"./vendor.9437a1ef.js";import{h as b}from"./index.ffebf55c.js";import{c as y}from"./index.ed4dbe6b.js";const h=e({name:"CountDownBtn",props:{defaultTime:{type:Number,default:10},defaultText:{type:String,default:"获取验证码"}},setup(e,a){let t=l(0);t.value=e.defaultTime;let n=l(!1),s=l("");s.value=e.defaultText;let i=null;return o((()=>{i&&clearInterval(i)})),{onGetCodeClick:()=>{a.emit("getCode"),n.value=!0,s.value=t.value+"s后获取",i=setInterval((()=>{--t.value,s.value=t.value+"s后获取",0==t.value&&(s.value=e.defaultText,t.value=e.defaultTime,n.value=!1,clearInterval(i))}),1e3)},waitingCodeTips:s,disableBtn:n}}});h.render=function(e,l,o,r,d,m){const c=a("el-button");return t(),n(c,{type:"primary",disabled:e.disableBtn,onClick:e.onGetCodeClick},{default:s((()=>[i(u(e.waitingCodeTips),1)])),_:1},8,["disabled","onClick"])};const k={name:"login",components:{CountDownBtn:h},setup(){const e=r(),o=d(),a=l(!0),t=m({account:"",password:""});let n=l(!1);const s=m({phone:"",password:"",code:""});return{loginForm:t,loginImg:"/assets/login.a35c9f52.svg",loginStatus:a,loginBtnLoading:n,registerForm:s,onRegisterClick:()=>{},onLoginClick:async()=>{n.value=!0;let l=await b.user.login({username:t.account,password:t.password}).catch((()=>{n.value=!1}));n.value=!1,l?(l.menu.unshift({name:"首页",icon:"el-icon-s-home",type:"page",url:"/home",children:null,path:[],tagsViewAffix:!0,breadcrumb:["首页"]}),localStorage.setItem("userInfo",JSON.stringify(l.userInfo)),localStorage.setItem("menu",JSON.stringify(l.menu)),y(l.menu),p.success("登录成功！"),e.push("/home")):p.error("登录失败！")},onGetCodeClick:()=>{},onTogglePanelStatus:()=>{a.value=!a.value},appName:c((()=>o.state.app.appName)),device:c((()=>o.state.app.device))}}},w={class:"login-page"},_={class:"panel-container"},V={class:"login-intro"},F={class:"intro-title"},S=g("p",{class:"intro-subtitle"},"欢迎登录！",-1),x={class:"login-panel"},T={key:0,style:{"margin-bottom":"10px"}},I=i(" 登录 "),B={class:"form-bottom"},G=i(" 注册 "),N=i(" 第三方登录 "),L=i(" 注册 "),U={class:"form-bottom"},j=i(" 密码登录 "),D=i(" 第三方登录 "),O=g("span",{class:"code-by"},"Code By FEZIRO",-1);k.render=function(e,l,o,i,r,d){const m=a("el-input"),c=a("el-form-item"),p=a("el-button"),b=a("el-form"),y=a("el-col"),h=a("CountDownBtn"),k=a("el-row");return t(),n("div",w,[g("div",_,[f(g("section",V,[g("h1",F,u(i.appName),1),S,g("img",{src:i.loginImg,alt:"login"},null,8,["src"])],512),[[C,i.loginStatus]]),g("section",x,["mobile"==i.device?(t(),n("h1",T,u(i.appName),1)):v("",!0),g("h1",null,u(i.loginStatus?"登录":"注册"),1),f(g(b,{model:i.loginForm,class:"login-form","label-position":"top"},{default:s((()=>[g(c,{label:"账号"},{default:s((()=>[g(m,{placeholder:"请输入账号",modelValue:i.loginForm.account,"onUpdate:modelValue":l[1]||(l[1]=e=>i.loginForm.account=e)},null,8,["modelValue"])])),_:1}),g(c,{label:"密码"},{default:s((()=>[g(m,{type:"password",placeholder:"请输入密码",modelValue:i.loginForm.password,"onUpdate:modelValue":l[2]||(l[2]=e=>i.loginForm.password=e)},null,8,["modelValue"])])),_:1}),g(c,null,{default:s((()=>[g(p,{type:"primary",class:"login-btn",onClick:i.onLoginClick,loading:i.loginBtnLoading},{default:s((()=>[I])),_:1},8,["onClick","loading"]),g("div",B,[g(p,{type:"text",onClick:i.onTogglePanelStatus},{default:s((()=>[G])),_:1},8,["onClick"]),g(p,{type:"text"},{default:s((()=>[N])),_:1})])])),_:1})])),_:1},8,["model"]),[[C,i.loginStatus]]),f(g(b,{model:i.registerForm,class:"login-form","label-position":"top"},{default:s((()=>[g(c,{label:"手机号码",name:"phone"},{default:s((()=>[g(m,{placeholder:"请输入手机号码",modelValue:i.registerForm.phone,"onUpdate:modelValue":l[3]||(l[3]=e=>i.registerForm.phone=e)},null,8,["modelValue"])])),_:1}),g(c,{label:"密码"},{default:s((()=>[g(m,{type:"password",placeholder:"请设置密码",modelValue:i.registerForm.password,"onUpdate:modelValue":l[4]||(l[4]=e=>i.registerForm.password=e)},null,8,["modelValue"])])),_:1}),g(c,{label:"验证码"},{default:s((()=>[g(k,{style:{width:"100%"}},{default:s((()=>[g(y,{span:14},{default:s((()=>[g(m,{placeholder:"请输入验证码",modelValue:i.registerForm.code,"onUpdate:modelValue":l[5]||(l[5]=e=>i.registerForm.code=e)},null,8,["modelValue"])])),_:1}),g(y,{span:10},{default:s((()=>[g(h,{defaultTime:4,onGetCode:i.onGetCodeClick},null,8,["onGetCode"])])),_:1})])),_:1})])),_:1}),g(c,null,{default:s((()=>[g(p,{type:"primary",class:"login-btn",onClick:i.onRegisterClick},{default:s((()=>[L])),_:1},8,["onClick"]),g("div",U,[g(p,{type:"text",onClick:i.onTogglePanelStatus},{default:s((()=>[j])),_:1},8,["onClick"]),g(p,{type:"text"},{default:s((()=>[D])),_:1})])])),_:1})])),_:1},8,["model"]),[[C,!i.loginStatus]])]),O])])};export default k;
