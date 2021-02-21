
async function fetchData(variable,pageNo,pageSize){
  try{
let url = "https://www.anapioficeandfire.com/api/"+variable+"?page="+pageNo+"&pageSize="+pageSize;
let response = await fetch(url);
let data = await response.json();
console.log(data)
return data;
  }
  catch(error){
    console.log(error);
  }
}

console.log(fetchData("houses",1,30));
//global page no to track page number for next and prev
let globalPageNo = 1;
// click event listener to select books
document.getElementById('button1').addEventListener('click',(e)=>{
  document.getElementById('dropdownMenuButton').innerText = "books";
  active(e.target.id);
  let pageSize=document.getElementById('pages').innerText;
  pageSize = parseInt(pageSize.slice(5));
  selector("books",1,pageSize);
});
// click event listener to select characters
document.getElementById('button2').addEventListener('click',(e)=>{
    document.getElementById('dropdownMenuButton').innerText = "characters";
    active(e.target.id);
    let pageSize=document.getElementById('pages').innerText;
    pageSize = parseInt(pageSize.slice(5));
    selector("characters",1,pageSize);
  });
// click event listener to select houses
  document.getElementById('button3').addEventListener('click',(e)=>{
    document.getElementById('dropdownMenuButton').innerText = "houses";
    active(e.target.id); 
    let pageSize=document.getElementById('pages').innerText;
  pageSize = parseInt(pageSize.slice(5));
  selector("houses",1,pageSize);
  });

  // function to change the active states in dropdown of books,character and houses
  function active(id) {
    for(let i=1;i<=3;i++){
        document.getElementById(id).classList.add("active");
        if(id!==`button${i}`){
            document.getElementById(`button${i}`).classList.remove("active");
        }
    }  
  }


  // click event listener for page size 10
document.getElementById('1').addEventListener('click',(e)=>{
    document.getElementById('pages').innerText = "pages 10";
    active2(e.target.id);
    globalPageNo = 1;
    selector(document.getElementById('dropdownMenuButton').innerText,1,10);
  });
  // click event listener for page size 20
  document.getElementById('2').addEventListener('click',(e)=>{
      document.getElementById('pages').innerText = "pages 20";
      active2(e.target.id);
      globalPageNo = 1;
    selector(document.getElementById('dropdownMenuButton').innerText,1,20);
    });
  // click event listener for page size 30
    document.getElementById('3').addEventListener('click',(e)=>{
      document.getElementById('pages').innerText = "pages 30";
      active2(e.target.id); 
      let page=document.getElementById('dropdownMenuButton').innerText
      console.log(page);
      globalPageNo = 1;
      selector(page,1,30);
    });
// function to change the active states in dropdown of pagesize
    function active2(id) {
      for(let i=1;i<=3;i++){
          document.getElementById(`${i}`).classList.add("active");
          if(id!==`${i}`){
              document.getElementById(`${i}`).classList.remove("active");
          }
      }  
    }
// function to select proper function to call after dropdown selection
    function selector(pages,pageNo,pageSize) {
      document.getElementById('thead').remove();
      document.getElementById('tbody').remove();
      if(pages==="books"){
       
      books(pages,pageNo,pageSize);

    }
      else if(pages==="characters"){
      characters(pages,pageNo,pageSize);
      }
      else{
        houses(pages,pageNo,pageSize);
      }
    }

   
// click event listener for next button
document.getElementById('next').addEventListener('click',()=>{
  let variable = document.getElementById('dropdownMenuButton').innerText;
  let pageSize = document.getElementById('pages').innerText;
 pageSize= parseInt(pageSize.slice(5));
  globalPageNo++;
  console.log('next pressed',pageSize)
  selector(variable,globalPageNo,pageSize)
})

// click event listener for prev button
document.getElementById('prev').addEventListener('click',()=>{
  let variable = document.getElementById('dropdownMenuButton').innerText;
  let pageSize = document.getElementById('pages').innerText;
 pageSize= parseInt(pageSize.slice(5));
 if(globalPageNo>1)
  globalPageNo--;
  console.log('prev pressed',pageSize)
  selector(variable,globalPageNo,pageSize)
})

 // function to display books 
 function books(books,pageNo,pageSize) {
  let thead = document.createElement('thead');
  thead.setAttribute('class','thead thead-dark');
  thead.setAttribute('id','thead');
  let tbody = document.createElement('tbody');
  tbody.setAttribute('class','tbody');
  tbody.setAttribute('id','tbody');
let tr = document.createElement('tr');
let th1 = document.createElement('th');
th1.setAttribute('scope','col');
th1.innerText = "Sr.No"

let th2 = document.createElement('th');
th2.setAttribute('scope','col');
th2.innerText = "character Name"
let th3 = document.createElement('th');
th3.setAttribute('scope','col');
th3.innerText = "played By"

let th4 = document.createElement('th');
th4.setAttribute('scope','col');
th4.innerText = "No of books"

tr.append(th1,th2,th3,th4);
thead.append(tr);
document.getElementById('table').append(thead,tbody);
fetchData(books,pageNo,pageSize).then((data)=>{
console.log(data);

for(let i=0;i<pageSize;i++){
let tr = document.createElement('tr');
let td1 = document.createElement('td');
td1.innerText = `${pageNo*pageSize-pageSize+i+1}`;

let td2 = document.createElement('td');
td2.innerText = data[i].name;


let td3 = document.createElement('td');
td3.innerText = data[i].playedBy;
if(td3.innerText===""){

  td3.innerText = "- -"
}



let td4 = document.createElement('td');
td4.innerText = data[i].books.length;
tr.append(td1,td2,td3,td4);
tbody.append(tr);

}
})

}

// funnction to display characters 
function characters(characters,pageNo,pageSize) {
      let thead = document.createElement('thead');
      thead.setAttribute('class','thead thead-dark');
      thead.setAttribute('id','thead');
      let tbody = document.createElement('tbody');
      tbody.setAttribute('class','tbody');
      tbody.setAttribute('id','tbody');
  let tr = document.createElement('tr');
  let th1 = document.createElement('th');
  th1.setAttribute('scope','col');
    th1.innerText = "Sr.No"

  let th2 = document.createElement('th');
  th2.setAttribute('scope','col');
  th2.innerText = "character Name"
  let th3 = document.createElement('th');
  th3.setAttribute('scope','col');
  th3.innerText = "played By"

  let th4 = document.createElement('th');
  th4.setAttribute('scope','col');
  th4.innerText = "No of books"

  tr.append(th1,th2,th3,th4);
   thead.append(tr);
   document.getElementById('table').append(thead,tbody);
  fetchData(characters,pageNo,pageSize).then((data)=>{
    console.log(data);

    for(let i=0;i<pageSize;i++){
    let tr = document.createElement('tr');
  let td1 = document.createElement('td');
  td1.innerText = `${pageNo*pageSize-pageSize+i+1}`;

  let td2 = document.createElement('td');
  td2.innerText = data[i].name;
    

  let td3 = document.createElement('td');
  td3.innerText = data[i].playedBy;
  if(td3.innerText===""){
  
      td3.innerText = "- -"
    }

  
   
  let td4 = document.createElement('td');
  td4.innerText = data[i].books.length;
  tr.append(td1,td2,td3,td4);
  tbody.append(tr);
  
  }
  })

  }
characters("characters",1,10);


//function to display houses
function houses(houses,pageNo,pageSize) {
  let thead = document.createElement('thead');
  thead.setAttribute('class','thead thead-dark');
  thead.setAttribute('id','thead');
  let tbody = document.createElement('tbody');
  tbody.setAttribute('class','tbody');
  tbody.setAttribute('id','tbody');
let tr = document.createElement('tr');
let th1 = document.createElement('th');
th1.setAttribute('scope','col');
th1.innerText = "Sr.No"

let th2 = document.createElement('th');
th2.setAttribute('scope','col');
th2.innerText = "house Name"
let th3 = document.createElement('th');
th3.setAttribute('scope','col');
th3.innerText = "region"

let th4 = document.createElement('th');
th4.setAttribute('scope','col');
th4.innerText = "coat of arms"

tr.append(th1,th2,th3,th4);
thead.append(tr);
document.getElementById('table').append(thead,tbody);
fetchData(houses,pageNo,pageSize).then((data)=>{
console.log(data);

for(let i=0;i<pageSize;i++){
  let tr = document.createElement('tr');
let td1 = document.createElement('td');

td1.innerText = `${pageNo*pageSize-pageSize+i+1}`;

let td2 = document.createElement('td');

td2.innerText = data[i].name;


let td3 = document.createElement('td');
td3.innerText = data[i].region;
if(td3.innerText===""){

  td3.innerText = "- -"
}



let td4 = document.createElement('td');
td4.innerText = data[i].coatOfArms;
tr.append(td1,td2,td3,td4);
tbody.append(tr);

}
})

}

