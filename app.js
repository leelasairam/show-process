let url='https://zllsclwpbcfqxrcqfscr.supabase.co';
let key='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsbHNjbHdwYmNmcXhyY3Fmc2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIyMjE0NTEsImV4cCI6MTk4Nzc5NzQ1MX0.FpnYKoBNV58sjAq1fPQzQdp2CjgLSIX6eQwUpMVinpA';
var supabase  = supabase.createClient(url,key);

let UpdateId;
let UserId;
let UserEmail;
let MainList;
const GetData = async() => {
  const { data, error } = await supabase.from('dos').select().eq('created_by', UserEmail).limit(20);
  //console.log(data);
  MainList = data;
  Display();
}

function Display(){
  document.querySelector("#app").innerHTML='';
  for(let i=MainList.length-1;i>=0;i--){
    document.querySelector("#app").innerHTML += `
    <div class="card" id="card">
    <div class="card-body">
      <div style="float:right">
        <a onclick="UpdateValues(${MainList[i].id},'${MainList[i].title}',\`${MainList[i].description}\`,'${MainList[i].category}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-pencil-square"></i></a>
        <a style="margin-left:0.5rem" onclick="DeleteTask(${MainList[i].id})"><i class="bi bi-trash3-fill"></i></a>
      </div><br/>
      <h5 class="card-title"><a href='view.html?${MainList[i].id}' style="text-decoration:none">${MainList[i].title}<a></h5>
      <p class="card-text" id="desc">${MainList[i].description}</p>
    </div>
    </div>
    `;
  }
  if(MainList.length==0){
    document.querySelector("#app").innerHTML += `
    <div class="card" id="card">
    <div class="card-body" style="text-align:center">
      <h5><i class="bi bi-card-list"></i> No Data</h5>
    </div>
    </div>
    `;
  }
}

function IntialLoad(){
  let LoginDetails = JSON.parse(sessionStorage.getItem("todouser"));
  if(!LoginDetails){
    window.location.href = "index.html";
  }
  else{
    UserId=LoginDetails[0];
    UserEmail=LoginDetails[1];
    console.log(UserEmail,UserId);
    GetData();
  }
}

window.onload=IntialLoad();

const CreateTask = async() => {
  //ClearValues();
  let title = document.querySelector("#title").value;
  let description = document.querySelector("#description").value;
  let category = document.querySelector("#category").value;
  const res = await supabase.from('dos').insert({ title:title,description:description.replace(/<|>/gi, ' '),category: category,created_by:UserEmail});
  alert("Task created successfully");
  GetData();
  ClearValues();
}


async function DeleteTask(id){
  const { error } = await supabase.from('dos').delete().eq('id', id);
  alert("Task deleted succesfully");
}

const UpdateTask = async() => {
    let title = document.querySelector("#title").value;
    let description = document.querySelector("#description").value;
    let category = document.querySelector("#category").value;
    const { error } = await supabase.from('dos').update({ title:title,description:description,category: category }).eq('id', UpdateId);
    GetData();
    ClearValues();
}

function UpdateValues(id,title,description,category){
    //console.log(title);
    //alert(title);
    console.log(typeof(description));
    document.querySelector("#title").value=title;
    document.querySelector("#description").value=description;
    document.querySelector("#category").value=category;
    document.querySelector("#modal-footer").innerHTML=`
    <button type="button" class="btn btn-secondary" onclick="ClearValues()" data-bs-dismiss="modal">Close</button>
    <button type="button" onclick="UpdateTask()" id="submit" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
    `;
    UpdateId=id;
}

function AddFooter(){
    document.querySelector("#modal-footer").innerHTML=`
    <button type="button" class="btn btn-secondary" onclick="ClearValues()" data-bs-dismiss="modal">Close</button>
    <button type="button" onclick="CreateTask()" id="submit" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
    `;
}

const ClearValues = () => {
    document.querySelector("#title").value='';
    document.querySelector("#description").value='';
    document.querySelector("#category").value='';
}

const Search = async() => {
  let term = document.querySelector("#term").value;
  const { data, error } = await supabase.from('dos').select().ilike('title', `%${term}%`);
  MainList = data;
  Display();
}

const Filters = async() => {
  let CheckedInputs=``;
  let Inputs = document.querySelectorAll(".filter");
  for(let i=0;i<Inputs.length;i++){
    if(Inputs[i].checked){
     CheckedInputs+=`"${Inputs[i].value}",`;
    }
  }
  CheckedInputs=CheckedInputs.slice(0,-1);
  console.log(CheckedInputs);
  const { data, error } = await supabase.from('dos').select().eq('created_by', UserEmail).filter('category', 'in', `(${CheckedInputs})`).limit(200);
  MainList=data;
  Display();
}



/*
<a href="filename.html?data1|data2|data3">Go to filename</a>
When Go to filename is clicked, filename.html is loaded with the query string "?data1|data2|data3" appended to the filename in the address bar. To get the query string into variables,
use: var queryString = location.search.substring(1);

The variable queryString now has the value "data1|data2|data3".

To break these out into individual variables use split:

var a = queryString.split("|"); // which creates an array

Then get the values out of the array and put them into variables:

var value1 = a[0];
var value2 = a[1];
var value3 = a[2];

Now:
value1 == "data1", value2 == "data2", value3 == "data3"*/




