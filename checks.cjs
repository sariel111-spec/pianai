const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const nodes=new Map();const el=s=>{if(!nodes.has(s))nodes.set(s,{style:{setProperty(){}},classList:{add(){},remove(){}},addEventListener(){},value:'',innerHTML:'',textContent:''});return nodes.get(s)};
const context={document:{querySelector:el,documentElement:el('root'),addEventListener(){}},localStorage:{getItem(){return null}},structuredClone,Date,Math,URL,console,setTimeout(){}};
vm.createContext(context);vm.runInContext(fs.readFileSync(__dirname+'/app.js','utf8'),context);
vm.runInContext(`
if(!valid(seed))throw Error('Seed rejected');
if(valid({...seed,couples:[]}))throw Error('Empty couples accepted');
if(valid({...seed,records:[{id:'x',couple:'missing',type:'diary',title:'bad'}]}))throw Error('Orphan accepted');
if(valid({...seed,records:[{id:'x',couple:'first',type:'bad',title:'bad'}]}))throw Error('Unknown type accepted');
if(safeURL('javascript:alert(1)')!=='')throw Error('Unsafe URL accepted');
if(imageURL('data:image/svg+xml;base64,abc')!=='')throw Error('SVG accepted');
if(esc('<script>')!=='&lt;script&gt;')throw Error('Text escaping failed');
if(days(today())!==0)throw Error('Same date failed');
if(until({date:today(),repeat:'每年'})!==0)throw Error('Today anniversary failed');
if(until({date:'2000-01-01',repeat:'每年'})<0)throw Error('Yearly rollover failed');
if(!document.querySelector('#view').innerHTML.includes('每一份喜欢'))throw Error('Home did not render');
for(const k of Object.keys(sections)){page=k;render()}
`,context);console.log('PASS: all 10 views render; date, backup validation, text and URL safety checks pass.');
