"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[291],{8711:function(e,a,l){l.d(a,{aO:function(){return c},bi:function(){return i}});var t=l(5893),s=l(1192),n=l(1873),r=l(9473);let i="FIRST_BUTTON",c="SECOND_BUTTON";a.ZP=e=>{let{onAddClick:a,onExportClick:l,title:d="List of users",AddButtonText:o="Add New Record",ExportButtonText:m="Export CSV",disable:x=[]}=e,u=(0,r.I0)();return(0,t.jsx)("div",{children:(0,t.jsxs)("div",{className:"card-header flex-column flex-md-row d-flex justify-content-between align-items-center",children:[(0,t.jsx)("h4",{className:"col-md-6 mb-2 mb-md-0",children:d}),(0,t.jsx)("div",{className:"dt-action-buttons",children:(0,t.jsxs)("div",{className:"dt-buttons",children:[-1==x.indexOf(i)?(0,t.jsxs)("button",{className:"dt-button buttons-collection dropdown-toggle btn btn-label-primary me-2",type:"button","aria-haspopup":"dialog","aria-expanded":"false",onClick:l,children:[(0,t.jsxs)("span",{children:[(0,t.jsx)("i",{className:"bx bx-export me-sm-1"}),(0,t.jsx)("span",{className:" d-sm-inline-block",children:m})]}),(0,t.jsx)("span",{className:"dt-down-arrow"})]}):null,-1==x.indexOf(c)?(0,t.jsx)("button",{className:"dt-button create-new btn btn-primary","aria-controls":"DataTables_Table_0",type:"button",onClick:a,children:(0,t.jsxs)("span",{children:[(0,t.jsx)("i",{className:"bx bx-plus me-sm-1"}),(0,t.jsx)("span",{className:" d-sm-inline-block",children:o})]})}):null,-1==x.indexOf("RELOAD_BUTTON")?(0,t.jsx)("button",{className:"ms-1 dt-button  btn btn-light","aria-controls":"DataTables_Table_0",type:"button",onClick:()=>{u((0,s.d)(!0))},children:(0,t.jsxs)("span",{children:[(0,t.jsx)("i",{className:"bx bx-plus me-sm-1"}),(0,t.jsx)("span",{className:"d-sm-inline-block",children:(0,t.jsx)(n.jq8,{})})]})}):null]})})]})})}},3023:function(e,a,l){l.d(a,{EY:function(){return o},OF:function(){return d},dm:function(){return c}});var t=l(5893),s=l(7435);l(7294);var n=l(5810),r=l(9583),i=l(5379);let c="Edit",d=e=>{let{data:a,url:l,keyData:r}=e;return(0,t.jsx)(n.Z,{onChange:()=>s.Z.toggle((null==a?void 0:a._id)||0,a,l,r),checked:(null==a?void 0:a[r||"is_active"])||!1,uncheckedIcon:!1,checkedIcon:!1,onColor:"#009EFB",offColor:"#dcdcdc",className:"status-switch"})},o=e=>{let{data:a,setSelected:l,setEdit:n,id:d,disable:o=[]}=e;return(0,t.jsxs)(t.Fragment,{children:[-1==o.indexOf(c)?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{onClick:()=>{l(a),n(i.bk)},className:"btn btn-warning","data-tooltip":"Edit",children:(0,t.jsx)(r.fmQ,{size:16})}),"\xa0"]}):null,-1==o.indexOf("Delete")?(0,t.jsx)("button",{onClick:()=>s.Z.delete(d),className:"btn btn-danger","data-tooltip":"Delete",children:(0,t.jsx)(r.Xm5,{size:16})}):null]})};a.ZP=e=>{let{tableCustomize:a=[],data:l=[],StartIndex:s=1}=e;return(0,t.jsx)("div",{className:"table-responsive text-nowrap overflow-auto table__main__container",children:(0,t.jsxs)("table",{className:"table bg-glass",children:[(0,t.jsx)("thead",{className:"table-light",children:(0,t.jsx)("tr",{children:a.map((e,a)=>{let l="table__text";return e.component&&(l=""),"created_at"===e.key&&(l="table__text"),console.log(l),(0,t.jsx)("th",{className:"".concat(l),scope:"col",children:e.value},a)})},Math.random())}),(0,t.jsx)("tbody",{className:"table-border-bottom-0",children:l&&l.length>0?l.map((e,l)=>(0,t.jsx)("tr",{children:a.map((a,n)=>{if(a.key&&!a.component)return(0,t.jsx)("td",{className:"table__text ".concat(a.className),children:e[a.key]?e[a.key]:"NA"},n);if(a.index)return(0,t.jsx)("td",{className:"table__text ".concat(a.className),children:l+s},l);if(a.component){let l="";return"created_at"===a.key&&(l="table__text"),(0,t.jsx)("td",{className:"".concat(l," ").concat(a.className," table__text_com"),children:a.component?a.component({data:e}):"null"},n)}})},l+Math.random())):(0,t.jsx)("tr",{children:(0,t.jsx)("td",{colSpan:a.length||1,rowSpan:5,style:{textAlign:"center",verticalAlign:"middle",fontSize:"larger",marginBottom:"20px"},children:(0,t.jsx)("h4",{className:"pb-5",style:{marginTop:"150px"},children:"No record found!"})})},Math.random())})]})})}},5049:function(e,a,l){l.d(a,{gU:function(){return c},k2:function(){return x},KX:function(){return m},dd:function(){return o},e_:function(){return d},ZP:function(){return u}});var t=l(5893),s=l(7294),n=l(9583);let r=(e,a,l,t)=>function(){for(var s=arguments.length,n=Array(s),r=0;r<s;r++)n[r]=arguments[r];clearTimeout(l),t(setTimeout(()=>e(...n),a))};var i=l(5379);let c="FILTER",d="PROPERTY_TYPE",o="PROPERTY_FOR",m="MIN",x="MAX";var u=e=>{let{filter:a,setFilter:l,disable:u=[],orderBy:h,unable:p=[]}=e,[b,j]=(0,s.useState)(""),[f,g]=(0,s.useState)(),[N,v]=(0,s.useState)(),[_,y]=(0,s.useState)(),T=h||i.y9;return(0,t.jsxs)("div",{className:"row mt-2 ms-2 me-2 d-flex justify-content-sm-start",children:[(0,t.jsx)("div",{className:"col-12 col-md-2 col-lg-3 mt-1 d-flex  justify-content-center  justify-content-md-start",children:-1==u.indexOf("SHOW_ENTRIES")?(0,t.jsxs)("label",{children:["Show entries",(0,t.jsx)("div",{className:"dataTables_length ",children:(0,t.jsx)("select",{className:"form-select",onChange:e=>l(a=>({...a,limit:e.target.value})),defaultValue:a.limit,"aria-label":"Default select example",children:i.oI.map((e,l)=>(0,t.jsx)("option",{selected:a.limit===e,value:e,children:e},l))})})]}):null}),(0,t.jsxs)("div",{className:"col-12 pr-3 col-md-10 col-lg-9 mb-1 d-flex flex-wrap justify-content-center justify-content-md-end",children:[-1==u.indexOf("START_DATE")?(0,t.jsx)("div",{className:"dataTables_filter mb-1",children:(0,t.jsxs)("label",{children:["Start Date",(0,t.jsx)("input",{type:"date",name:"startDate",id:"startDate",className:"form-control",onChange:e=>l(a=>({...a,startDate:e.target.value}))})]})}):null,-1==u.indexOf("END_DATE")?(0,t.jsx)("div",{className:"dataTables_filter mb-1",children:(0,t.jsxs)("label",{className:"form-label",children:["End Date",(0,t.jsx)("input",{type:"date",className:"form-control",onChange:e=>l(a=>({...a,endDate:e.target.value}))})]})}):null,-1!==p.indexOf(m)?(0,t.jsx)("div",{className:"dataTables_filter mb-1 ",children:(0,t.jsxs)("label",{children:[(0,t.jsx)(n.U41,{style:{marginRight:"5px"}}),"Min",(0,t.jsx)("input",{type:"number",onChange:e=>{let{value:a}=e.target;g(+a),r(()=>{l(e=>({...e,min_price:+a}))},i.tV,_,y)()},value:f,placeholder:"Search...",className:"form-control"})]})}):null,-1!==p.indexOf(x)?(0,t.jsx)("div",{className:"dataTables_filter mb-1 ",children:(0,t.jsxs)("label",{children:[(0,t.jsx)(n.U41,{style:{marginRight:"5px"}}),"Max",(0,t.jsx)("input",{type:"number",onChange:e=>{let{value:a}=e.target;v(+a),r(()=>{l(e=>({...e,max_price:+a}))},i.tV,_,y)()},value:N,placeholder:"Search...",className:"form-control"})]})}):null,-1==u.indexOf("SEARCH")?(0,t.jsx)("div",{className:"dataTables_filter mb-1 ",children:(0,t.jsxs)("label",{children:[(0,t.jsx)(n.U41,{style:{marginRight:"5px"}}),"Search",(0,t.jsx)("input",{type:"search",onChange:e=>{let{value:a}=e.target;j(a),r(()=>{l(e=>({...e,search:a}))},i.tV,_,y)()},value:b,placeholder:"Search...",className:"form-control"})]})}):null,-1==u.indexOf(o)?(0,t.jsx)("div",{className:"dataTables_filter mb-1",children:(0,t.jsxs)("label",{children:[(0,t.jsx)(n.roE,{style:{marginRight:"5px"}}),"property for",(0,t.jsxs)("select",{className:"form-select ",onChange:e=>l(a=>({...a,property_for:e.target.value})),"aria-label":"Default select example",children:[(0,t.jsx)("option",{value:"",children:"select"}),i.vL.map((e,l)=>(0,t.jsx)("option",{value:i.ld[e],selected:a.property_for===i.ld[e],children:e},l))]})]})}):null,-1==u.indexOf(d)?(0,t.jsx)("div",{className:"dataTables_filter mb-1",children:(0,t.jsxs)("label",{children:[(0,t.jsx)(n.roE,{style:{marginRight:"5px"}}),"property type",(0,t.jsxs)("select",{className:"form-select ",onChange:e=>l(a=>({...a,property_type:e.target.value})),"aria-label":"Default select example",children:[(0,t.jsx)("option",{value:"",children:"select"}),i.Av.map((e,l)=>(0,t.jsx)("option",{value:i.Yq[e],selected:a.property_type===i.Yq[e],children:e},l))]})]})}):null,-1==u.indexOf(c)?(0,t.jsx)("div",{className:"dataTables_filter mb-1",children:(0,t.jsxs)("label",{children:[(0,t.jsx)(n.ulB,{style:{marginRight:"5px"}})," Filter",(0,t.jsxs)("select",{className:"form-select ",onChange:e=>l(a=>({...a,orderBy:e.target.value})),"aria-label":"Default select example",defaultValue:"createdAt",children:[T.map((e,l)=>{var s;return(0,t.jsx)("option",{value:T[e]||e,selected:a.orderBy===T[e],children:null==e?void 0:null===(s=e.replace("_"," "))||void 0===s?void 0:s.toUpperCase()},l)}),(0,t.jsx)("option",{value:"is_active",selected:"is_active"===a.orderBy,children:"ACTIVE"}),(0,t.jsx)("option",{value:"createdAt",selected:"createdAt"===a.orderBy,children:"TIME"})]})]})}):null,-1==u.indexOf("SHORT_BY")?(0,t.jsx)("div",{className:"dataTables_filter mb-1",children:(0,t.jsxs)("label",{children:[(0,t.jsx)(n.roE,{style:{marginRight:"5px"}}),"Sort by",(0,t.jsx)("select",{className:"form-select ",onChange:e=>l(a=>({...a,order:e.target.value})),"aria-label":"Default select example",children:i.TO.map((e,l)=>(0,t.jsx)("option",{value:i.KU[e],selected:a.order===i.KU[e],children:e},l))})]})}):null]})]})}},6704:function(e,a,l){var t=l(5893),s=l(1358),n=l.n(s);a.Z=e=>{let{currentPage:a,setCurrentPage:l,limit:s,total:r}=e,i=Math.min(a*s,r);return(0,t.jsx)("div",{className:"row mt-2",children:(0,t.jsx)("div",{className:"col-md-12",children:(0,t.jsxs)("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[(0,t.jsxs)("div",{className:"dataTables_info",id:"example_info",role:"status","aria-live":"polite",children:["Showing ",(a-1)*s+1," to ",i," of ",r," entries"]}),(0,t.jsx)("div",{className:" Pcontainer",style:{marginRight:"5px"},children:(0,t.jsx)(n(),{pageCount:Math.ceil((r||0)/s),onPageChange:e=>l(e.selected+1),initialPage:a-1,previousLabel:"Previous",nextLabel:"Next",forcePage:a-1,pageClassName:"page-item",pageLinkClassName:"page-link",previousClassName:"page-item",previousLinkClassName:"page-link",nextClassName:"page-item",nextLinkClassName:"page-link",breakLabel:"...",breakClassName:"page-item",breakLinkClassName:"page-link",marginPagesDisplayed:3,pageRangeDisplayed:5,containerClassName:"pagination",activeClassName:"active"})})]})})})}}}]);