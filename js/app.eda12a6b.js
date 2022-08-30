(function(){"use strict";var t={9787:function(t,e,i){var s=i(6369),a=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"main"},[e("div",{staticClass:"App"},[e("div",{staticClass:"cog-mg",on:{click:t.toggleModal}},[t.modalOpen?e("img",{attrs:{width:"20px",src:i(8281)}}):e("img",{attrs:{width:"20px",src:i(9622),alt:""}})]),t.isLoading?e("div",[t._v("Loading...")]):e("div",[t.modalOpen?e("Modal",{attrs:{cities:t.cities,weathers:t.weathers,APIKey:t.APIKey},on:{"add-city":t.addCity,"delete-city":t.deleteCity,"update-cities":t.updateCities}}):e("CityList",{attrs:{weathers:t.weathers},on:{"open-modal":t.toggleModal}})],1),e("router-view",{attrs:{cities:t.cities}})],1)])},r=[],n=i(6265),o=i.n(n),c=function(){var t=this,e=t._self._c;return e("div",[t.weathers?e("div",t._l(t.weathers,(function(t){return e("div",{key:t.id},[e("CityCard",{staticClass:"card",attrs:{weather:t}})],1)})),0):t._e(),0==this.weathers.length?e("NoCities",{on:{"open-modal":t.openModal}}):t._e()],1)},l=[],d=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"Card"},[e("header",{staticClass:"header"},[t._v(" "+t._s(t.name)+", "+t._s(t.country)+" ")]),e("body",{staticClass:"body"},[e("div",{staticClass:"img-temp"},[e("img",{staticClass:"img",attrs:{src:t.icon_url}}),e("div",{staticClass:"temperature"},[t._v(t._s(t.temperature)+"°C")])]),e("div",{staticClass:"description"},[t._v("Feels like "+t._s(t.feels_like)+"°C. "+t._s(t.description[0].toUpperCase())+t._s(t.description.slice(1))+" ")]),e("div",{staticClass:"parameters"},t._l(t.parameters,(function(i,s,a){return e("div",{key:s,staticClass:"parameter"},[t.parametersTitle[a].title.includes("http")?e("div",[e("img",{attrs:{src:t.parametersTitle[a].title,alt:"",width:"18px"}})]):e("div",[e("span",[t._v(t._s(t.parametersTitle[a].title)+":")])]),t._v(" "+t._s(i)+" "),t.parametersTitle[a].measure.includes("deg")?e("span",[t._v("°C")]):e("span",[t._v(t._s(t.parametersTitle[a].measure))])])})),0)])])},h=[],A=(0,s.aZ)({name:"CityCard",props:{weather:{required:!0,type:Object}},data(){const t=this.weather.weather[0].icon,e=`http://openweathermap.org/img/wn/${t}@2x.png`,i=[{title:"https://cdn2.iconfinder.com/data/icons/mobile-web-app-vol-2/32/Direction_arrow_paper_plane_move-512.png",measure:"m/s SSE"},{title:"https://www.shareicon.net/data/2015/08/18/87061_reading_512x512.png",measure:"hPa"},{title:"Humidity",measure:"%"},{title:"Dew point",measure:"deg"},{title:"Visibility",measure:"km"}];return{name:this.weather.name,country:this.weather.sys.country,temperature:Math.round(5*(this.weather.main.temp-32)/9),feels_like:Math.round(5*(this.weather.main.feels_like-32)/9),description:`${this.weather.weather[0].description}. ${this.weather.weather[0].main}`,icon_url:e,parameters:{wind:Math.round(10*this.weather.wind.speed)/10,pressure:this.weather.main.pressure,humidity:this.weather.main.humidity,dew_point:null,visibility:Math.round(this.weather.visibility)/1e3},parametersTitle:i}},created(){this.calculateDewPoint()},methods:{calculateDewPoint(){if(this.parameters.humidity){const t=Math.log(this.parameters.humidity/100)+17.625*this.temperature/(243.04+this.temperature),e=17.625*t/(17.625-t);this.parameters.dew_point=Math.round(10*e)/10}}}}),u=A,p=i(1001),m=(0,p.Z)(u,d,h,!1,null,null,null),g=m.exports,y=function(){var t=this,e=t._self._c;return e("div",{staticClass:"card"},[e("div",{staticClass:"title"},[t._v(" No cities in list, add a new one? ")]),e("button",{staticClass:"button",on:{click:t.goToModal}},[t._v("Add city!")])])},f=[],w={methods:{goToModal(){this.$emit("open-modal")}}},v=w,C=(0,p.Z)(v,y,f,!1,null,null,null),_=C.exports,b={components:{CityCard:g,NoCities:_},props:["weathers"],methods:{openModal(){this.$emit("open-modal")}}},x=b,O=(0,p.Z)(x,c,l,!1,null,null,null),S=O.exports,P=function(){var t=this,e=t._self._c;return e("div",{ref:"modal",staticClass:"modal-wrapper"},[e("span",{staticClass:"header"},[t._v("Settings")]),e("draggable",{staticClass:"cities-list",attrs:{animation:"300",handle:".drag-img"},on:{start:function(e){t.drag=!0},end:function(e){t.drag=!1}},model:{value:t.myList,callback:function(e){t.myList=e},expression:"myList"}},t._l(t.cities,(function(s){return e("div",{key:s.id,staticClass:"city"},[e("img",{staticClass:"drag-img",attrs:{width:"20px",alt:"draggable object",src:i(8820)}}),t._v(" "+t._s(s.name)+", "+t._s(s.country)+" "),e("img",{staticClass:"delete-button",attrs:{width:"20px",alt:"trash bin",src:i(9266)},on:{click:function(e){return t.deleteCity(s)}}})])})),0),e("div",{staticClass:"add-location"},[e("label",{attrs:{for:"city-name"}},[t._v("Add Location: ")]),e("div",{staticClass:"add-location__input-enter"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchQuery,expression:"searchQuery"}],attrs:{type:"text",name:"city-name",placeholder:"search by city name"},domProps:{value:t.searchQuery},on:{input:[function(e){e.target.composing||(t.searchQuery=e.target.value)},t.getSearchResults]}}),e("img",{attrs:{src:i(2321),alt:"",width:"30px"},on:{click:t.addCity}})]),this.mapboxSearchResults?e("ul",t._l(this.mapboxSearchResults,(function(i){return e("li",{key:i.id,staticClass:"search-result",on:{click:function(e){return t.previewCity(i)}}},[t._v(" "+t._s(i.place_name)+" ")])})),0):t._e(),this.searchError?e("p",[t._v('"Something went wrong"')]):t._e()])],1)},T=[],I=i(6983),k=i.n(I),L={name:"modalSettings",props:["cities","APIKey"],data(){return{city:"",mapboxAPIKey:"pk.eyJ1IjoiYmVsb2RpbiIsImEiOiJjbDZ4dTBoYWEwNDcwM2NtcGNxeXNtNTh4In0.vOOy5sQ1z79Dc1tQV-6tRA",searchQuery:"",queryTimeout:null,mapboxSearchResults:"",searchError:null}},components:{draggable:k()},computed:{myList:{get(){return this.cities},set(t){this.$emit("update-cities",t)}}},methods:{async addCity(){if(this.cities.find((t=>t.name.toLowerCase()===this.city.toLowerCase())))alert("This city is alredy in list");else if(""===this.city)alert("Enter city and select from the list");else try{const t=await o().get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIKey}`),e=await t.data;this.$emit("add-city",this.city,e.id,e.sys.country,e),this.searchQuery=""}catch{alert("This city doesn't exist, try another one")}},deleteCity(t){this.$emit("delete-city",t)},getSearchResults(){clearTimeout(this.queryTimeout),this.queryTimeout=setTimeout((async()=>{if(""===this.searchQuery)this.mapboxSearchResults=null;else try{o().get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchQuery}.json?limit=5&access_token=${this.mapboxAPIKey}&types=place`).then((t=>t.data)).then((t=>this.mapboxSearchResults=t.features))}catch{this.searchError=!0}}),1)},previewCity(t){this.searchQuery=t.text,this.city=t.text.replace(/\u0301/g,""),this.mapboxSearchResults=""}}},M=L,W=(0,p.Z)(M,P,T,!1,null,null,null),D=W.exports,Q=(0,s.aZ)({name:"App",components:{CityList:S,Modal:D},setup(){const t=(0,s.iH)([]),e=(0,s.qj)({weathers:[],modalOpen:!1,isLoading:!0,order:0});return{...(0,s.BK)(e),cities:t}},data(){return{APIKey:"9f326ee9b09aee5a00b633ce569dad61",mapboxAPIKey:"pk.eyJ1IjoiYmVsb2RpbiIsImEiOiJjbDZ4dTBoYWEwNDcwM2NtcGNxeXNtNTh4In0.vOOy5sQ1z79Dc1tQV-6tRA"}},created(){this.loadLocalStorage(),console.log("Welcome to weather app!")},mounted(){this.loadWeather(),0===this.cities.length&&(this.isLoading=!1)},methods:{toggleModal(){this.modalOpen=!this.modalOpen},addCity(t,e,i,s){void 0==s&&window.location.reload();const a={name:t,id:e,country:i,order:++this.order,weather:s};this.cities.push(a),this.weathers.push(s),this.setLocalStorage()},deleteCity(t){this.cities=this.cities.filter((e=>e.id!==t.id)),this.weathers=this.weathers.filter((e=>e.id!==t.id)),this.setLocalStorage()},updateCities(t){this.cities=t,this.cities.forEach(((t,e)=>{t.order=e})),this.weathers=[],this.loadWeather(),this.setLocalStorage()},loadWeather(){this.cities.forEach((t=>this.getCurrentWeather(t)))},async getCurrentWeather(t){const{name:e,id:i}=t;o().get(`https://api.openweathermap.org/data/2.5/weather?q=${e}&units=imperial&appid=${this.APIKey}`).then((t=>{const e=t.data;this.weathers.push({...e,id:i}),this.isLoading=!1}))},getUserGeoPosition(t){const{latitude:e,longitude:i}=t.coords;fetch(`https://api.opencagedata.com/geocode/v1/json?q=${e}+${i}&key=c1ef089d475b4ed185a97c2195435845`).then((t=>t.json())).then((t=>t.results[0].components)).then((t=>{this.setLocalCity(t)}))},setLocalCity(t){const{state:e,country_code:i}=t;this.addCity(e,Date.now(),i.toUpperCase()),this.setLocalStorage()},setLocalStorage(){localStorage.setItem("cities",JSON.stringify(this.cities))},loadLocalStorage(){if(localStorage.getItem("cities"))try{this.cities=JSON.parse(localStorage.getItem("cities"))}catch(t){localStorage.removeItem("cities")}else{if(window.navigator.geolocation)return void navigator.geolocation.getCurrentPosition(this.getUserGeoPosition,console.log);alert("Geolocation is not supported by this browser.")}}}}),R=Q,j=(0,p.Z)(R,a,r,!1,null,null,null),q=j.exports;function N(t){N.installed||(N.installed=!0,t.component("WeatherWidgetApp",q))}const E={install:N};let J=null;"undefined"!==typeof window?J=window.Vue:"undefined"!==typeof i.g&&(J=i.g.Vue),J&&J.use(E);var V,Z,U=q,X=U,$=(0,p.Z)(X,V,Z,!1,null,null,null),H=$.exports,K=i(2631),Y=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home"})},B=[],G={name:"AddCity",props:["cities"],components:{}},z=G,F=(0,p.Z)(z,Y,B,!1,null,null,null),tt=F.exports;s.ZP.use(K.Z);const et=[{path:"/",name:"AddCity",component:tt}],it=new K.Z({mode:"history",base:"/weather-widget/",routes:et});var st=it;s.ZP.config.productionTip=!1,new s.ZP({router:st,render:t=>t(H)}).$mount("#app")},2321:function(t,e,i){t.exports=i.p+"img/icon_enter.665f0c0c.svg"},9266:function(t,e,i){t.exports=i.p+"img/icon_trash.85d91d68.svg"},8281:function(t,e,i){t.exports=i.p+"img/icon_cross.c4116d56.png"},8820:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAqBJREFUeJzt3b3PX2MYwPFvSXRAJU0tXpIy1WYwEQ0DsWgiEiwW/UssJn8Bi4GESSRixSA6dJUudCHeE03DUuUxPG0q9ifXlfh8knv/5uS+zvmd33CfAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmHRsOuA/TlYvVKfb18bROqguVx9WV4ZbVnqm+q3DC2X9f9ev1dMtseUu/WB1qbpzOoQVrlZnqh+mQ26bDrjhfIaDW05Ur01H1J4BeWQ6gHVW7IktA/LzdADrrNgTWwbk/ekA1lmxJ26fDrjh2+p49eR0CCu8Xr03HVF7/sW66VyHL+wPt6+No3VQfV29XX0y3AIAAAAAAAAAAAAAAAAAAAAAAACrbDyc7Z7qgXa2cXQOOjxh8+p0yFanqg+qv5r/iIs1s653eOToyZbYcpc+Xl2oHp0OYYWL1RPVtemQLae7v5rh4JbHqlemI2rPgJydDmCdp6YDas+AHEwHsM7f0wG1Z0A+mw5gnU+nA2rPS/od1Rcd/vaECx1+TOn6dMiWJ8i16tnq3RZcFMb8Wb1TPdeSfbDlCfJvd1X3t7ONo3NQfVf9MR0CAAAAAAAAAAAAAAAAAAAAAAAA22w6nO1Y9WJ1vjrdrjaO3kF1uXqr+mi4ZaU3m//CkbVjvdESW+7SZ6vPpyNY5fHqy+mILYdXvzwdwDovTQfUngE5NR3AOvdOB9SeAflqOoB1VuyJLe8g91WXqhPTIaxwpTpT/TQdsuUJ8n11rvplOoRxP1bPt2A4as8T5Ka7O7w4D7WvjaN1UH1TfVz9PtwCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwxD/K8cHImQhxJQAAAABJRU5ErkJggg=="},9622:function(t,e,i){t.exports=i.p+"img/icon_settingscog.067e5c35.png"}},e={};function i(s){var a=e[s];if(void 0!==a)return a.exports;var r=e[s]={exports:{}};return t[s].call(r.exports,r,r.exports,i),r.exports}i.m=t,function(){var t=[];i.O=function(e,s,a,r){if(!s){var n=1/0;for(d=0;d<t.length;d++){s=t[d][0],a=t[d][1],r=t[d][2];for(var o=!0,c=0;c<s.length;c++)(!1&r||n>=r)&&Object.keys(i.O).every((function(t){return i.O[t](s[c])}))?s.splice(c--,1):(o=!1,r<n&&(n=r));if(o){t.splice(d--,1);var l=a();void 0!==l&&(e=l)}}return e}r=r||0;for(var d=t.length;d>0&&t[d-1][2]>r;d--)t[d]=t[d-1];t[d]=[s,a,r]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){i.p="/weather-widget/"}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,s){var a,r,n=s[0],o=s[1],c=s[2],l=0;if(n.some((function(e){return 0!==t[e]}))){for(a in o)i.o(o,a)&&(i.m[a]=o[a]);if(c)var d=c(i)}for(e&&e(s);l<n.length;l++)r=n[l],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(d)},s=self["webpackChunkweather_widget001"]=self["webpackChunkweather_widget001"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(9787)}));s=i.O(s)})();
//# sourceMappingURL=app.eda12a6b.js.map