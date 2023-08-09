import axios from "axios";
import { useState } from "react";
export async function banksData() {
  const data = axios.get('/api/banks.json')
    .then(res => { return (res.data) },
    )
    .catch(error => { return (error); });
  return data
}

export async function deleteBank(id: number) {
  const data = await axios.delete('/api/banks/' + id)
  if (data.status === 200) { return data.data; }
  else { throw new Error(data.statusText); }
}

export async function updateBank(id: number,value:any){
  const response = await axios.patch('/api/banks/edit/'+id,value);
  console.log(value);
  
  if(response.status === 200){return response.data}
  else{throw new Error(response.statusText);}
}



export async function addBank(data:any){
  const res = await axios.post('/api/banks/add',{
    data:data
  });
  if(res.status === 200){return res.data}
  else{ throw new Error(res.statusText)}
}