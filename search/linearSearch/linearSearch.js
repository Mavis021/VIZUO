let container= document.getElementById("bar_container");
let positionContainer=document.getElementById("bar_pos_container");
let numOfBars=20;
const maxValue=100;
const minValue=5;
let unsortedArray=[];
let delay=300;
let search_btn=document.getElementById("search_btn");

function deleteChild(){
  container.innerHTML='';
}

function generateRandomNum(min,max)
{
  return(Math.floor(Math.random()*(max-min)+min));
}
function generateArray(num)
{
  for(i=0;i<num;i++)
  {
    let randomNum=generateRandomNum(minValue,maxValue);
    unsortedArray[i]=randomNum;
  }
}

function generateBar(array)
{
  deleteChild();
  for(let i=0;i<array.length;i++)
  {
    let bars=document.createElement("div");
    bars.classList.add("bar");

    bars.style.height=`${array[i]*4}px`;
    bars.style.transform=`translate(${i*33}px)`;

    let barsLabel=document.createElement("label");
    barsLabel.classList.add("bar_size");
    barsLabel.innerText=array[i];

    bars.appendChild(barsLabel);
    container.appendChild(bars);
  }
}

function displayBarPosition(array)
{
  for (let i=0;i<array.length;i++)
  {
    let positions=document.createElement("div");
    positions.classList.add("position");

    positions.style.height=`${20}px`;
    positions.style.transform=`translate(${i*33}px)`;

    let barsPosition=document.createElement("label");
    barsPosition.classList.add("bar_position");
    barsPosition.innerText=i;

    positions.appendChild(barsPosition);
    positionContainer.appendChild(positions);
  }
}

function timeDelay(ms){
  return new Promise((resolve)=>setTimeout(resolve,ms));
}

async function linearSearch(array)
{
  let bars=document.querySelectorAll(".bar");
  let output=document.getElementById("output_text");
  let output2=document.getElementById("output_text2");
  let dataOutput=document.getElementById("data_text");

  let num=document.getElementById("inputedData").value;

  for(let i=0;i<bars.length;i++)
  {
    bars[i].style.backgroundColor="green";
  }
  await timeDelay(delay);
  output.innerText="";
  output2.innerText="";
  dataOutput.innerText="";

  let pos=-1;
  let value;
  //algorithm
  for(i=0;i<bars.length;i++)
  {
    await timeDelay(delay);
    bars[i].style.backgroundColor="yellow";
    await timeDelay(delay);
     value=array[i];
     if(value==num)
     {
      pos=i;
      output.innerText="Element Found.";
      output2.innerText="The Position Of element In array is:";
      dataOutput.innerText=pos;
      await timeDelay(delay);
      bars[i].style.backgroundColor="red";
      await timeDelay(delay);
      for(let j=i+1;j<bars.length;j++)
      {
        bars[j].style.backgroundColor="grey";
      }
      break;
    }
    await timeDelay(delay);
    bars[i].style.backgroundColor="grey";
  }
  if(pos==-1)
  {
    output.innerHTML="Element Not Found";
  }
}
search_btn.addEventListener("click",function(){
  linearSearch(unsortedArray);
});
generateArray(numOfBars);
generateBar(unsortedArray);
displayBarPosition(unsortedArray);