(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[956],{2429:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/property",function(){return n(3854)}])},4090:function(e,t,n){"use strict";n.d(t,{i:function(){return a}});let a=e=>{let t=new Date(e),n=t.toLocaleString("en-US",{day:"2-digit",month:"2-digit",year:"numeric",hour12:!0});return n}},3854:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var a=n(5893),r=n(5049),l=n(7294),i=n(9473),o=n(3023),s=n(4090),d=n(6704),u=n(5379),c=n(8711),p=n(7435),v=n(5292),m=n(4779),_=n(1192),y=n(9471),h=n(1163),x=e=>{let{data:t}=e,n=(0,i.I0)(),r=(0,h.useRouter)(),l=async e=>{try{let a=await m.Z.put("property/update",{...t,admin_status:e},t._id,!0);200==a.status?(n((0,v.N)(!1)),n((0,_.d)(!0))):401===a.data.status&&(n((0,y.gy)()),null==r||r.push("/login"))}catch(e){n((0,v.N)(!1))}finally{n((0,v.N)(!1))}};return(0,a.jsx)("div",{className:"dataTables_filter mb-1",children:(0,a.jsx)("select",{className:"form-select ",onChange:e=>{l(e.target.value)},"aria-label":"Default select example",children:u.wh.map((e,n)=>(0,a.jsx)("option",{value:u.XQ[e],selected:(null==t?void 0:t.admin_status)===u.XQ[e],children:e},n))})})},f=n(9332),b=n(9583),j=()=>{var e;let t="property";p.Z.path=t;let n=(0,i.I0)(),v=(0,f.useRouter)(),m=(0,i.v9)(e=>{var t;return null===(t=e.login.userToken)||void 0===t?void 0:t.token}),_=(0,i.v9)(e=>e.recallApi.recallApi),[y,h]=(0,l.useState)(1),[j,g]=(0,l.useState)(u.Wh),[N,k]=(0,l.useState)({list:[],pagination:{total:0}}),[w,S]=(0,l.useState)({}),[C,E]=(0,l.useState)(""),[F,P]=(0,l.useState)(!1),[T,Z]=(0,l.useState)({post_id:0});(0,l.useEffect)(()=>(p.Z.get(y,j,k),()=>{}),[j,m,n,y,_]);let A=[{value:"S.No",index:!0},{value:"Id",component:e=>{let{data:t}=e;return(0,a.jsx)("div",{children:((null==t?void 0:t.unique_id)||"").slice(-6).toUpperCase()})}},{value:"user",key:"name"},{value:"Number",component:e=>{var t,n;let{data:r}=e;return(0,a.jsx)("div",{style:{width:"135px"},children:(0,a.jsx)("a",{href:"tel:+91".concat(null==r?void 0:null===(t=r.user)||void 0===t?void 0:t.contact_number),children:null==r?void 0:null===(n=r.user)||void 0===n?void 0:n.contact_number})})}},{value:"Address",component:e=>{let{data:t}=e;return(0,a.jsx)(a.Fragment,{children:"".concat(t.city||""," ").concat(t.state||""," ").concat(t.zip_code||"")})}},{value:"For",key:"property_for"},{value:"Type",key:"property_type"},{value:"user Type",key:"added_by_type"},{value:"Price",component:e=>{let{data:t}=e;return(0,a.jsx)(a.Fragment,{children:(null==t?void 0:t.property_for)=="sell"?null==t?void 0:t.expected_price:"".concat(null==t?void 0:t.monthly_rent,"/M")})}},{value:"user Type",key:"added_by_type"},{value:"status",component:x},{key:"created_at",value:"Created At",component:e=>{let{data:t}=e;return(0,a.jsx)(a.Fragment,{children:(0,s.i)(t.createdAt)})}},{value:"Status",component:e=>{let{data:t}=e;return(0,a.jsx)(o.OF,{data:t})}},{value:"Action",component:e=>{let{data:t}=e;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("button",{onClick:()=>{v.push("/property/edit?id=".concat(t._id))},className:"btn btn-warning","data-tooltip":"Edit",children:(0,a.jsx)(b.fmQ,{size:16})}),"\xa0"]}),(0,a.jsx)(o.EY,{data:t,setSelected:S,setEdit:E,id:t._id,disable:[o.dm]})]})},className:"d-flex justify-content-center"}];return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"card bg-white",children:(0,a.jsx)("div",{className:"card-datatable",children:(0,a.jsxs)("div",{className:"dataTables_wrapper dt-bootstrap5",children:[(0,a.jsx)(c.ZP,{title:"List of ".concat(t),onAddClick:()=>v.push("/property/edit?id=10"),onExportClick:()=>{p.Z.download()},disable:[c.bi,c.aO]}),(0,a.jsx)(r.ZP,{filter:j,disable:[],setFilter:g,orderBy:["name","location","admin_status","added_by_type","property_type","property_for","monthly_rent","expected_price","contact_number","name"],unable:(null==j?void 0:j.property_for)=="rent"||(null==j?void 0:j.property_for)=="sell"?[r.k2,r.KX]:[]}),(0,a.jsx)(o.ZP,{tableCustomize:A,data:N&&(null==N?void 0:N.list),StartIndex:+j.limit*(+y-1)+1||1}),(0,a.jsx)(d.Z,{currentPage:y||0,limit:j.limit,setCurrentPage:h,total:N&&(null===(e=N.pagination)||void 0===e?void 0:e.total)||0})]})})})})}}},function(e){e.O(0,[86,752,291,774,888,179],function(){return e(e.s=2429)}),_N_E=e.O()}]);