import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BankModel } from './Models'
import { deleteBank, updateBank } from './banksData';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useState } from 'react';

interface Props {
  bank: BankModel,
}

export default function BankRow({ bank }: Props) {

  const queryClient=useQueryClient();
  const { isLoading:isDeleting, mutate } = useMutation({
    mutationFn: (id: number) => deleteBank(id), 
    onSuccess: ()=>{queryClient.invalidateQueries({queryKey:['banks']})},
    onError: (error:AxiosError ) => {toast(error.message)},
    })
  
  const { id, DisplayName, BankName, BankAddress, AccountNumber, IFSCode, SWIFTCode, Branch, gstID, OpeningBalance, companyId } = bank;
  
  const [form,setForm]= useState({
    DisplayName,
    BankName,
    BankAddress,
    AccountNumber,
    IFSCode,
    SWIFTCode,
    Branch,
    gstID,
    OpeningBalance,
    companyId
  })

  // console.log(form);
  


  const handleChange= async(event:any)=>{
    const value = event.target.value;
    const name = event.target.name;
    setForm((prevData)=>({
      ...prevData,
      [name]:value
    }));
    await updateBank(id,form).then(()=>{
      console.log("Succesfully modified");
    }).catch((error:any)=>{
      console.log(error);
    })
  }


  return (
  
  <tr key={id}>
    <td><input name="Display Name" defaultValue={DisplayName} onChange={(e)=>handleChange(e)}/></td>
    <td><input name="BankName" defaultValue={BankName} onChange={(e)=>handleChange(e)}/></td>
    <td><input name="BankAddress" defaultValue={BankAddress} onChange={(e)=>handleChange(e)}/></td>
    <td><input name="AccountNumber" defaultValue={AccountNumber} onChange={(e)=>handleChange(e)}/></td>
    <td><button onClick={() => mutate(id)} disabled={isDeleting}>Delete</button></td>
  </tr>
  )
}