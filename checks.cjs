const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const nodes=new Map(),listeners=new Map();
function el(key){if(!nodes.has(key))nodes.set(key,{innerHTML:'',textContent:'',value:'',dataset:{},style:{},open:false,files:[],classList:{add(){},remove(){},toggle(){}},querySelector:s=>el(key+' '+s),querySelectorAll(){return[]},addEventListener:(n,f)=>listeners.set(key+':'+n,f),showModal(){this.open=true},close(){this.open=false},setAttribute(){},scrollIntoView(){},insertAdjacentHTML(position,text){this.innerHTML+=text}});return nodes.get(key)}
const root=el('app');root.querySelector=s=>el(s);
const context={document:{getElementById:()=>root,createElement:()=>el('new')},structuredClone,URL,Date,Math,Object,Array,Number,String,console,setTimeout(){},clearTimeout(){},confirm:()=>true,localStorage:{getItem(){return null}}};
vm.createContext(context);let code=fs.readFileSync(__dirname+'/app.js','utf8').replace(/\ninit\(\);/,'\n');vm.runInContext(code,context);
(async()=>{await vm.runInContext(`(async()=>{
if(!validate(seed))throw Error('Seed schema');
if(wordCount('你 好\\nhello!')!==8)throw Error('Unicode character count');
if(validDate('2025-02-29')||!validDate('2024-02-29'))throw Error('Calendar validation');
if(safeURL('javascript:alert(1)')||imageURL('data:image/svg+xml;base64,AAAA'))throw Error('URL filtering');
if(escapeHTML('<script>')!=='&lt;script&gt;')throw Error('Escaping');
if(validate({...seed,couples:[{...seed.couples[0],selfDetails:4}]}))throw Error('Invalid profile accepted');
const old={version:1,active:'a',couples:[{id:'a',name:'a',self:'me',partner:'you'}],records:[{id:'r',couple:'a',type:'gallery',title:'art',body:'caption',date:'2025-01-01'},{id:'hidden',type:'wishes'}]};
const m=migrate(old);if(m.records.length!==1||m.records[0].type!=='art'||m.legacy.length!==1)throw Error('Legacy migration');
page='home';render();if(root.dataset.theme!=='huaian')throw Error('Huaian theme');state.active='peter-parker';render();if(root.dataset.theme!=='parker')throw Error('Parker theme');state.active='li-huaian';render();if(!$('#profile').innerHTML.includes('duo-dossier')||!$('#profile').innerHTML.includes('duo-conversation'))throw Error('Dual profile');
for(const k of Object.keys(kinds)){page=k;resetFilters();render();for(const r of allRecords()){openReader(r.id)}openEditor();}
page='story';state.records.push(...Array.from({length:1000},(_,i)=>({id:'stress'+i,couple:current().id,type:'story',title:'Chapter '+i,date:(2000+i%25)+'-01-01',body:'text',images:[{id:'im'+i,src:'https://example.com/a.jpg',text:'可搜索文字'}],order:i+10})));resetFilters();render();
if((/story-row/g.exec($('#collection').innerHTML)||[]).length===0)throw Error('Story render');
if(($('#collection').innerHTML.match(/<article /g)||[]).length!==12)throw Error('Pagination is not bounded');
jumpTo(999);if(pageNo!==83||!$('#jumpInfo').textContent.includes('1000 / 1003'))throw Error('Scrub to page');
search='可搜索文字';pageNo=0;renderCollection();if(filtered().length!==1000)throw Error('OCR search');
search='';year='2024';renderCollection();if(!filtered().every(r=>r.date.startsWith('2024')))throw Error('Year filter');
year='';sort='asc';const first=ordered(allRecords('story'))[0].id,target=ordered(allRecords('story'))[2].id;db={};putDB=async()=>{};if(!await commit(s=>{s.couples[0].name='Saved'}))throw Error('Commit rejected');
await reorderStory(first,target);if(sort!=='custom'||ordered(allRecords('story'))[2].id!==first)throw Error('Reorder failed');
const name=state.couples[0].name;putDB=async()=>{throw Error('quota')};if(await commit(s=>s.couples[0].name='Lost')||state.couples[0].name!==name)throw Error('Failed save did not roll back');
})()`,context);console.log('PASS: home + 4 collections; readers and editors; 1,003-story pagination, scrubber, OCR text search, year filter, custom ordering, legacy migration and failed-save rollback.');})().catch(e=>{console.error(e);process.exit(1)});
